import { useEffect, useState } from "react";
import { IoTrashOutline } from "react-icons/io5";
import { FaRegCopy, FaCheck } from "react-icons/fa";
import axios from "axios";

import { User } from "src/types/auth";
import { Project } from "src/types/projects";
import { useUserStore } from "../../store/store";
import useProjects from "../../apis/useProjects";
import useProjectActions from "../../hooks/useProjectActions";

import Modal from "../Shared/Modal";
import DeleteConfirmationModal from "../Shared/DeleteConfirmationModal";
import convertDateForm from "../../utils/converDateForm";

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
  const [domain, setDomain] = useState("");
  const [isDomainValid, setIsDomainValid] = useState<boolean | null>(null);

  useEffect(() => {
    if (userId) {
      fetchProjects();
    }
  }, [fetchProjects, userId]);

  function handleOpenModal() {
    setIsModalOpen(true);
  }

  function handleCloseModal() {
    setResponseData(null);
    setScriptCode("");
    setIsModalOpen(false);
    setDomain("");
    setIsDomainValid(null);
  }

  async function checkDomainValidity() {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_SERVER_URL}/users/domains/validate?domain=${domain}`,
      );

      setIsDomainValid(response.data.isValid);
    } catch (error) {
      setIsDomainValid(false);
    }
  }

  async function handleSubmitProjectWithDomain(
    e: React.FormEvent<HTMLFormElement>,
  ) {
    e.preventDefault();

    if (isDomainValid) {
      await handleSubmitProject(e);
    }
  }

  return (
    <div className="p-10">
      <h1 className="text-lg font-semibold mb-4">
        프로젝트별 페이지 이동 흐름 추적코드 발급 리스트
      </h1>
      <button
        className="px-4 py-2 mb-4 bg-blue-500 text-white rounded hover:bg-blue-700"
        onClick={handleOpenModal}
      >
        + 프로젝트 생성하기
      </button>
      {errorMessage && (
        <p className="text-red-500">
          데이터를 가져오는 중 오류가 발생했습니다. 다시 시도해 주세요.
        </p>
      )}
      <div className="overflow-x-auto mt-30">
        <table className="table-auto w-full sm:w-3/4 lg:w-2/3 xl:w-1/2">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="px-4 py-2 border text-left">프로젝트명</th>
              <th className="px-4 py-2 border text-left">생성일</th>
              <th className="px-4 py-2 border text-cente hover:bg-red-500">
                삭제
              </th>
            </tr>
          </thead>
          <tbody>
            {projects.map((project: Project, index) => (
              <tr
                key={project._id}
                className={index % 2 === 0 ? "bg-white" : "bg-gray-100"}
              >
                <td className="px-4 py-2 border text-left">
                  {project.projectName}
                </td>
                <td className="px-4 py-2 border text-left">
                  {convertDateForm(project.createdAt)}
                </td>
                <td className="px-4 py-2 border text-center hover:bg-red-200">
                  <button
                    onClick={() => handleDeleteModal(project._id)}
                    aria-label="delete"
                    className="text-red-500 hover:text-red-700"
                  >
                    <IoTrashOutline />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        {!responseData?.createdAt && (
          <form onSubmit={handleSubmitProjectWithDomain} className="space-y-5">
            <label
              htmlFor="domain"
              className="block text-sm font-medium text-gray-700 uppercase"
            >
              웹사이트 url
            </label>
            <input
              type="text"
              id="domain"
              name="domain"
              value={domain}
              onChange={(e) => setDomain(e.target.value)}
              className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm"
              placeholder="웹사이트 URL을 입력하세요 (예: example.com)"
              required
            />
            <button
              type="button"
              onClick={checkDomainValidity}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 uppercase"
            >
              url 유효성 검사
            </button>
            {isDomainValid === true && (
              <p className="text-green-500 text-xs italic">
                유효한 도메인입니다.
              </p>
            )}
            {isDomainValid === false && (
              <p className="text-red-500 text-xs italic">
                유효하지 않은 도메인입니다.
              </p>
            )}
            <label
              htmlFor="projectName"
              className="block text-sm font-medium text-gray-700"
              style={{ marginTop: "24px" }}
            >
              프로젝트명
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
              disabled={isDomainValid !== true}
            />
            {projectErrorMessage && (
              <p className="text-red-500 text-xs italic">
                {projectErrorMessage}
              </p>
            )}
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 mt-4"
              disabled={isDomainValid !== true}
            >
              추적 코드 생성
            </button>
          </form>
        )}
        {responseData?.createdAt && (
          <>
            <h1 className="text-center text-lg font-semibold mb-4">
              추적코드 생성 완료
            </h1>
            <div className="mb-15">
              해당 추적코드를 저장하시고 잘 보관해주세요. 분실 시에는 새로운
              프로젝트를 생성해주셔야 합니다!
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
