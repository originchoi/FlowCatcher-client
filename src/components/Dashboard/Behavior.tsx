import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { FiChevronDown, FiChevronRight } from "react-icons/fi";

import { useUserStore } from "../../store/store";
import useProjects from "../../apis/useProjects";

import processPageViewData from "../../utils/d3/processPageViewData";
import checkObjectEmpty from "../../utils/checkObjectEmpty";
import drawBarGraph from "../../utils/d3/drawBarGraph";
import drawForceGraph from "../../utils/d3/drawForceGraph";

import { Project } from "../../types/projects";
import {
  ProcessedData,
  GraphNode,
  GraphLink,
  BarData,
} from "../../types/utils";

function Behavior() {
  const { user } = useUserStore();
  const userId = user?._id || "";
  const { projects, fetchProjects } = useProjects(userId);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isDropdown, setIsDropdown] = useState(false);
  const [topPagePath, setTopPagePath] = useState("");
  const [sessionCount, setSessionCount] = useState(0);
  const [totalVisitCount, setTotalVisitCount] = useState(0);
  const [totalRefreshCount, setTotalRefreshCount] = useState(0);
  const [totalExitCount, setTotalExitCount] = useState(0);
  const svgRef = useRef<SVGSVGElement | null>(null);
  const barChartRef = useRef<SVGSVGElement | null>(null);

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
    async function getSessions() {
      if (
        !selectedProject ||
        !selectedProject._id ||
        checkObjectEmpty(selectedProject)
      )
        return;

      try {
        const response = await axios.get(
          `${import.meta.env.VITE_SERVER_URL}/analytics/${selectedProject._id}/behavior`,
          {
            withCredentials: true,
          },
        );

        const pageViewData: ProcessedData = processPageViewData(response.data);

        const graphNodes: GraphNode[] = pageViewData.nodes.map((node) => ({
          ...node,
          x: 0,
          y: 0,
        }));

        const graphLinks: GraphLink[] = pageViewData.links.map((link) => ({
          ...link,
          source: graphNodes.find(
            (node) => node.id === link.source,
          ) as GraphNode,
          target: graphNodes.find(
            (node) => node.id === link.target,
          ) as GraphNode,
        }));

        const graphData = {
          nodes: graphNodes,
          links: graphLinks,
        };

        drawForceGraph(graphData, svgRef);

        const sortedData = graphData.nodes.sort(
          (a, b) => b.visitCounts - a.visitCounts,
        );

        const topPageViews: BarData[] = sortedData.slice(0, 5).map((node) => ({
          pageTitle: node.pageTitle,
          visitCount: node.visitCounts,
        }));

        drawBarGraph(topPageViews, barChartRef);

        if (topPageViews.length > 0) {
          setTopPagePath(topPageViews[0].pageTitle);
        } else {
          setTopPagePath("");
        }

        const totalVisits = sortedData.reduce(
          (acc, node) => acc + node.visitCounts,
          0,
        );
        const totalExits = sortedData.reduce(
          (acc, node) => acc + node.exitCounts,
          0,
        );

        const totalRefreshes = graphData.links.reduce((acc, link) => {
          return link.isSelfLoop ? acc + link.count : acc;
        }, 0);

        setSessionCount(response.data.length);
        setTotalVisitCount(totalVisits);
        setTotalExitCount(totalExits);
        setTotalRefreshCount(totalRefreshes);
      } catch (error) {
        console.error(error);
      }
    }

    getSessions();
  }, [selectedProject]);

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
      <div>
        <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-6xl">
          <div className="md:flex">
            <div className="p-8">
              <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
                가장 많이 접속한 페이지 경로
              </div>
              {topPagePath ? (
                <p className="mt-2 text-gray-500">
                  가장 많이 접속한 페이지는 {`${topPagePath}`} 입니다.
                </p>
              ) : (
                <p className="mt-2 text-gray-500">
                  프로젝트를 선택하시면 이곳에 당신의 분석 내용이 들어갑니다.
                </p>
              )}
              <div className="mt-4">
                <svg ref={barChartRef} width="600" height="300"></svg>
              </div>
            </div>
          </div>
        </div>
        <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-6xl my-20">
          <div className="md:flex md:max-w-6xl">
            <div className="p-8">
              <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
                페이지 경로별 세션 흐름
              </div>
              {selectedProject?._id && totalVisitCount > 0 ? (
                <div className="mt-4 p-4 bg-white shadow rounded-md">
                  <h2 className="text-lg font-semibold text-gray-800">
                    분석 요약
                  </h2>
                  <div className="grid grid-cols-2 gap-4 mt-4">
                    <div className="flex items-center p-4 bg-yellow-100 rounded-md">
                      <span className="text-yellow-600">
                        총 세션 수(방문자 수):
                      </span>
                      <span className="ml-auto text-yellow-800 font-bold">
                        {sessionCount}
                      </span>
                    </div>
                    <div className="flex items-center p-4 bg-green-100 rounded-md">
                      <span className="text-green-600">
                        총 페이지 방문 횟수:
                      </span>
                      <span className="ml-auto text-green-800 font-bold">
                        {totalVisitCount}
                      </span>
                    </div>
                    <div className="flex items-center p-4 bg-blue-100 rounded-md">
                      <span className="text-blue-600">
                        총 페이지 새로고침 횟수:
                      </span>
                      <span className="ml-auto text-blue-800 font-bold">
                        {totalRefreshCount}
                      </span>
                    </div>
                    <div className="flex items-center p-4 bg-red-100 rounded-lg">
                      <span className="text-red-600">총 페이지 이탈 횟수:</span>
                      <span className="ml-auto text-red-800 font-bold">
                        {totalExitCount}
                      </span>
                    </div>
                  </div>
                </div>
              ) : (
                "프로젝트를 선택하시면 이곳에 당신의 분석 내용이 들어갑니다."
              )}
              <div className="mt-4">
                <svg ref={svgRef} width="1100" height="900"></svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Behavior;
