import { useEffect, useState } from "react";

import { IoTrashOutline } from "react-icons/io5";
import { FaRegCopy, FaCheck } from "react-icons/fa";

import axios from "axios";
import { useUserStore } from "../../store/store";

import Modal from "../Modal";

function Projects() {
  const { user } = useUserStore();
  const [projects, setProjects] = useState([]);
  const [projectName, setProjectName] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [apiKey, setApiKey] = useState("");
  const [isCopied, setIsCopied] = useState(false);

  useEffect(() => {
    async function getProjects() {
      if (!user._id) return;

      try {
        const response = await axios.get(
          `${import.meta.env.VITE_SERVER_URL}/users/${user._id}/projects`,
          {
            withCredentials: true,
          },
        );

        setProjects(response.data);
      } catch (error) {
        console.error(error);
      }
    }

    getProjects();
  }, [user._id]);

  async function handleSubmitProject(e) {
    e.preventDefault();

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/users/${user._id}/projects`,
        { projectName },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        },
      );

      setProjects([...projects, response.data]);
      setProjectName("");
      setApiKey(response.data.apiKey);
    } catch (error) {
      console.error(error);
    }
  }

  async function handleDeleteProject(projectId) {
    try {
      await axios.delete(
        `${import.meta.env.VITE_SERVER_URL}/users/${user._id}/projects/${projectId}`,
        {
          withCredentials: true,
        },
      );

      setProjects(projects.filter((project) => project._id !== projectId));
    } catch (error) {
      console.log(error);
    }
  }

  function formatDate(dateString) {
    const options = { year: "numeric", month: "long", day: "numeric" };
    const date = new Date(dateString);
    const koreanTimeZoneDate = new Date(
      date.getTime() + (date.getTimezoneOffset() + 540) * 60000,
    );

    return new Intl.DateTimeFormat("ko-KR", options).format(koreanTimeZoneDate);
  }

  function handleOpenModal() {
    setIsModalOpen(true);
  }

  function handleCloseModal() {
    setApiKey("");
    setIsModalOpen(false);
  }

  async function handleCopyApiKey() {
    try {
      await navigator.clipboard.writeText(apiKey);

      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 3000);
    } catch (error) {
      console.error("Failed to copy API key:", error);
    }
  }

  return (
    <div className="p-10">
      <h1 className="text-lg font-semibold mb-4">프로젝트 별 Api key 발급</h1>
      <div className="mt-30 text-center">
        <table>
          <thead>
            <tr>
              <th className="uppercase">project name</th>
              <th className="uppercase">api key</th>
              <th className="uppercase">created</th>
              <th className="uppercase">delete</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((project) => (
              <tr key={project._id}>
                <td className="text-center">{project.projectName}</td>
                <td className="text-center">{project.apiKey}</td>
                <td className="text-center">{formatDate(project.createdAt)}</td>
                <td className="text-center">
                  <button
                    onClick={() => handleDeleteProject(project._id)}
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
        {!apiKey && (
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
              onChange={(e) => setProjectName(e.target.value)}
              className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm"
              placeholder="프로젝트 이름을 입력하세요"
              required
            />
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
            >
              Api key 생성
            </button>
          </form>
        )}
        {apiKey && (
          <>
            <h1 className="text-center text-lg font-semibold mb-4">
              API Key generated
            </h1>
            <div className="mb-15">
              이 비밀 키를 안전하고 접근하기 쉬운 곳에 보관하세요. 보안상의
              이유로 FlowCathcer 계정을 통해서는 다시 볼 수 없습니다. 이 비밀
              키를 분실하신 경우 새 키를 생성하셔야 합니다.
            </div>
            <div className="flex items-center space-x-3">
              <p className="font-mono text-sm bg-gray-300 p-1 ml-10 mr-10 rounded">
                {apiKey}
              </p>
              <button
                onClick={handleCopyApiKey}
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
          </>
        )}
      </Modal>
    </div>
  );
}

export default Projects;
