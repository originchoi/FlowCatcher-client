import { useEffect, useState } from "react";
import { IoTrashOutline } from "react-icons/io5";
import { FaRegCopy, FaCheck } from "react-icons/fa";

import { useUserStore } from "../../store/store";
import useProjects from "../../apis/useProjects";
import useProjectActions from "../../hooks/useProjectActions";

import Modal from "../Shared/Modal";
import DeleteConfirmationModal from "../Shared/DeleteConfirmationModal";

import {
  convertDateForm,
  convertFormatApiKey,
} from "../../utils/convertFormUtils";

import { User } from "src/types/auth";
import { Project } from "src/types/projects";

function Projects() {
  const { user } = useUserStore();
  const userId = (user as User)?._id || "";
  const { projects, errorMessage, fetchProjects, addProject, deleteProject } =
    useProjects(userId);
  const {
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
  } = useProjectActions({
    addProject,
    deleteProject,
    fetchProjects,
  });
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (userId) {
      fetchProjects();
    }
  }, [fetchProjects, userId]);

  function handleOpenModal() {
    setIsModalOpen(true);
  }

  function handleCloseModal() {
    setResponseData({});
    setScriptCode("");
    setIsModalOpen(false);
  }

  return (
    <div className="p-10">
      <h1 className="text-lg font-semibold mb-4">
        프로젝트별 유저 페이지 흐름 추적 서비스 코드 발급
      </h1>
      {errorMessage && (
        <p className="text-red-500">
          데이터를 가져오는 중 오류가 발생했습니다. 다시 시도해 주세요.
        </p>
      )}
      <div className="mt-30 text-center">
        <table className="min-w-full table-auto">
          <thead className="bg-gray-200">
            <tr>
              <th className="px-4 py-2 border uppercase">project name</th>
              <th className="px-4 py-2 border uppercase">api key</th>
              <th className="px-4 py-2 border uppercase">created</th>
              <th className="px-4 py-2 border uppercase">delete</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((project: Project) => (
              <tr key={project._id} className="hover:bg-gray-100">
                <td className="px-4 py-2 border text-center">
                  {project.projectName}
                </td>
                <td className="px-4 py-2 border text-center">
                  {convertFormatApiKey(project.apiKey)}
                </td>
                <td className="px-4 py-2 border text-center">
                  {convertDateForm(project.createdAt)}
                </td>
                <td className="px-4 py-2 border text-center">
                  <button
                    onClick={() => handleDeleteModal(project._id)}
                    aria-label="delete"
                  >
                    <IoTrashOutline />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <button
        className="px-4 py-2 mt-25 bg-blue-500 text-white rounded hover:bg-blue-700"
        onClick={handleOpenModal}
      >
        + Create new project
      </button>
      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        {!responseData.apiKey && (
          <form onSubmit={handleSubmitProject} className="space-y-4">
            <label
              htmlFor="projectName"
              className="block text-sm font-medium text-gray-700"
            >
              프로젝트 이름
            </label>
            <input
              type="text"
              id="projectName"
              name="projectName"
              value={projectName}
              onChange={handleProjectNameChange}
              className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm"
              placeholder="프로젝트 이름을 입력하세요"
              required
            />
            {projectErrorMessage && (
              <p className="text-red-500 text-xs italic">
                {projectErrorMessage}
              </p>
            )}
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
            >
              Api key & Service Code 생성
            </button>
          </form>
        )}
        {responseData.apiKey && (
          <>
            <h1 className="text-center text-lg font-semibold mb-4">
              API Key generated & Service Code
            </h1>
            <div className="mb-15">
              이 비밀 키를 안전하고 접근하기 쉬운 곳에 보관하세요. 보안상의
              이유로 FlowCathcer 계정을 통해서는 다시 볼 수 없습니다. 이 비밀
              키를 분실하신 경우 새 키를 생성하셔야 합니다.
            </div>
            <div className="mb-15">
              userId, apiKey, projectId 는 모두 안전하게 보호해 주셔야 합니다.
            </div>
            <h2 className="text-center text-lg font-semibold mb-4">
              프로젝트명: {responseData.projectName}
            </h2>
            <div className="flex items-center space-x-3">
              <div className="w-full">
                <textarea
                  readOnly
                  value={scriptCode}
                  className="font-mono text-sm bg-gray-100 p-2 w-full h-150 border border-gray-300 rounded-md"
                />
                <button
                  onClick={handleCopyCode}
                  className="p-2 bg-green-500 hover:bg-green-600 active:bg-green-700 text-white rounded-md shadow focus:outline-none focus:ring flex items-center justify-center"
                >
                  {isCopied ? (
                    <>
                      <FaCheck />
                      <span className="ml-2 text-white text-sm">Copied</span>
                    </>
                  ) : (
                    <>
                      <FaRegCopy />
                      <span className="ml-2 text-sm">Copy code</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </>
        )}
      </Modal>
      <DeleteConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDeleteProject}
      />
    </div>
  );
}

export default Projects;
