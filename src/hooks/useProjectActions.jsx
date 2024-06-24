import { useState } from "react";
import validateProjectName from "../utils/validateProjectName";

function useProjectActions({ addProject, deleteProject, fetchProjects }) {
  const [projectName, setProjectName] = useState("");
  const [projectErrorMessage, setProjectErrorMessage] = useState("");
  const [responseData, setResponseData] = useState({});
  const [isCopied, setIsCopied] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [projectToDelete, setProjectToDelete] = useState(null);
  const [scriptCode, setScriptCode] = useState("");

  async function handleSubmitProject(e) {
    e.preventDefault();

    const invalidProjectName = validateProjectName(projectName);

    if (invalidProjectName) {
      setProjectErrorMessage(invalidProjectName);
      return;
    }

    try {
      const projectData = await addProject(projectName);

      setProjectName("");
      setResponseData(projectData.project);
      setScriptCode(projectData.scriptCode);
      setIsCopied(false);
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

  function handleDeleteModal(projectId) {
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

  function handleProjectNameChange(e) {
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
