import { useState } from "react";
import { ProjectActionsProps, Project } from "src/types/projects";
import { validateProjectName } from "../utils/validateUtils";

function useProjectActions({
  addProject,
  deleteProject,
  fetchProjects,
}: ProjectActionsProps) {
  const [projectName, setProjectName] = useState<string>("");
  const [projectErrorMessage, setProjectErrorMessage] = useState<string>("");
  const [responseData, setResponseData] = useState<Project | null>(null);
  const [isCopied, setIsCopied] = useState<boolean>(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
  const [projectToDelete, setProjectToDelete] = useState<string | null>(null);
  const [scriptCode, setScriptCode] = useState<string>("");

  async function handleSubmitProject(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const invalidProjectName = validateProjectName(projectName);

    if (invalidProjectName) {
      setProjectErrorMessage(invalidProjectName);
      return;
    }

    try {
      const projectData = await addProject(projectName);

      if (projectData) {
        setProjectName("");
        setResponseData(projectData.project);
        setScriptCode(projectData.scriptCode);
        setIsCopied(false);
      }
    } catch (error) {
      setProjectErrorMessage(
        "프로젝트 생성 중 오류가 발생했습니다. 다시 시도해 주세요.",
      );
    }
  }

  async function handleDeleteProject() {
    if (!projectToDelete) return;

    try {
      await deleteProject(projectToDelete);

      setIsDeleteModalOpen(false);
      setProjectToDelete(null);
      fetchProjects();
    } catch (error) {
      setProjectErrorMessage(
        "프로젝트 삭제 중 오류가 발생했습니다. 다시 시도해 주세요.",
      );
    }
  }

  function handleDeleteModal(projectId: string) {
    setIsDeleteModalOpen(true);
    setProjectToDelete(projectId);
  }

  async function handleCopyCode() {
    try {
      await navigator.clipboard.writeText(scriptCode);

      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 3000);
    } catch (error) {
      setProjectErrorMessage(
        "코드 복사 중 오류가 발생했습니다. 다시 시도해 주세요.",
      );
    }
  }

  function handleProjectNameChange(e: React.ChangeEvent<HTMLInputElement>) {
    const newName = e.target.value;

    setProjectName(newName);

    if (projectErrorMessage) {
      setProjectErrorMessage("");
    }
  }

  return {
    projectName,
    projectErrorMessage,
    responseData,
    isCopied,
    isDeleteModalOpen,
    scriptCode,
    setResponseData,
    setScriptCode,
    setIsDeleteModalOpen,
    handleSubmitProject,
    handleDeleteProject,
    handleDeleteModal,
    handleCopyCode,
    handleProjectNameChange,
  };
}

export default useProjectActions;
