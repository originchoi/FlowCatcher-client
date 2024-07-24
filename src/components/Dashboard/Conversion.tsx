import { useEffect, useState } from "react";
import axios from "axios";
import { FiChevronDown, FiChevronRight } from "react-icons/fi";

import { ConversionData } from "src/types/utils";
import { useUserStore } from "../../store/store";
import useProjects from "../../apis/useProjects";
import { isValidPagePath } from "../../utils/validateUtils";

import { Project } from "../../types/projects";

function Conversion() {
  const { user } = useUserStore();
  const userId = user?._id || "";
  const { projects, fetchProjects } = useProjects(userId);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isDropdown, setIsDropdown] = useState(false);
  const [goalPage, setGoalPage] = useState("");
  const [conversionData, setConversionData] = useState<ConversionData | null>(
    null,
  );
  const [errorMessage, setErrorMessage] = useState("");
  const [hasData, setHasData] = useState(true);

  useEffect(() => {
    if (userId) {
      fetchProjects();
    }
  }, [fetchProjects, userId]);

  useEffect(() => {
    if (selectedProject?._id) {
      sessionStorage.setItem("selectedProjectId", selectedProject._id);
    }
  }, [selectedProject]);

  useEffect(() => {
    const savedProjectId = sessionStorage.getItem("selectedProjectId");

    if (savedProjectId && projects.length > 0) {
      const savedProject = projects.find(
        (project) => project._id === savedProjectId,
      );

      if (savedProject) setSelectedProject(savedProject);
    }
  }, [projects]);

  useEffect(() => {
    setErrorMessage("");
    setConversionData(null);
    setHasData(true);
  }, [selectedProject]);

  const handleGoalPageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setGoalPage(e.target.value);
    setErrorMessage("");
    setConversionData(null);
    setHasData(true);
  };

  async function fetchConversionData() {
    if (!selectedProject || !goalPage) {
      setErrorMessage("프로젝트와 목표 페이지를 모두 선택하세요.");
      return;
    }

    if (!isValidPagePath(goalPage)) {
      setErrorMessage("유효한 페이지 경로를 입력하세요.");
      return;
    }

    try {
      const response = await axios.get(
        `${import.meta.env.VITE_SERVER_URL}/analytics/${selectedProject._id}/conversion`,
        {
          params: { goalPage },
          withCredentials: true,
        },
      );

      if (response.data.totalSessions === 0) {
        setHasData(false);
        setConversionData(null);
      } else {
        setConversionData(response.data);
        setHasData(true);
      }
      setErrorMessage("");
    } catch (error) {
      setErrorMessage("전환율 데이터를 가져오는 데 실패했습니다.");
    }
  }

  return (
    <div className="flex flex-row flex-1 min-h-screen">
      <div
        id="tooltip"
        className="hidden absolute z-50 px-5 bg-gray-300 text-lg rounded-lg shadow-lg max-w-4xl"
      />
      <div className="w-200 bg-gray-100">
        <div className="flex flex-col items-start justify-start py-4 text-blue-500">
          <button
            className="px-4 py-2 flex justify-between items-center cursor-pointer font-bold"
            onClick={() => setIsDropdown(!isDropdown)}
            tabIndex={0}
          >
            {isDropdown ? <FiChevronDown /> : <FiChevronRight />}
            {`내 프로젝트 (${projects.length})`}
          </button>
          <div
            className={`px-4 py-2 flex flex-col max-h-150 overflow-y-auto bg-gray-100 w-full ${
              isDropdown ? "border border-gray-300 rounded-lg" : ""
            }`}
          >
            {isDropdown &&
              projects.map((project) => (
                <button
                  key={project._id}
                  onClick={() => setSelectedProject(project)}
                  className={`py-2 px-4 w-full cursor-pointer ${
                    selectedProject?._id === project._id
                      ? "bg-indigo-500 text-white"
                      : "hover:bg-indigo-400 hover:text-white"
                  } transition duration-500 ease-in-out`}
                  tabIndex={0}
                >
                  {project.projectName}
                </button>
              ))}
          </div>
        </div>
      </div>
      <div className="ml-10">
        <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-6xl">
          <div className="md:flex">
            <div className="p-8">
              <div className="flex flex-col flex-1 space-y-6">
                <div className="tracking-wide text-sm text-indigo-500 font-bold">
                  목표경로 전환율 분석
                </div>
                <div className="bg-gray-100 p-6 rounded-lg shadow-md space-y-4 ">
                  <label
                    htmlFor="goalPage"
                    className="block text-sm font-medium text-gray-700"
                  >
                    전환 목표 페이지 경로 (입력 예시: /dashboard)
                  </label>
                  <input
                    type="text"
                    id="goalPage"
                    value={goalPage}
                    onChange={handleGoalPageChange}
                    placeholder="/dashboard"
                    className="mt-1 block w-full p-3 shadow-sm sm:text-sm border border-gray-300 rounded-md"
                  />
                </div>
                <button
                  onClick={fetchConversionData}
                  className="bg-blue-600 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-700 transition duration-300"
                >
                  전환율 데이터 가져오기
                </button>
                {errorMessage && (
                  <div className="text-red-500">{errorMessage}</div>
                )}
                {!hasData && (
                  <div className="text-gray-500">데이터가 없습니다.</div>
                )}
                {conversionData && hasData && (
                  <div className="bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-lg font-semibold text-gray-800">
                      전환율 분석 결과
                    </h2>
                    <p className="mt-2 text-gray-700">
                      전체 세션 수: {conversionData.totalSessions}
                    </p>
                    <p className="mt-1 text-gray-700">
                      전환 수: {conversionData.conversionCount}
                    </p>
                    <p className="mt-1 text-gray-700">
                      전환율: {conversionData.conversionRate.toFixed(2)}%
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Conversion;
