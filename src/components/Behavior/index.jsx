/* eslint-disable */

import { useEffect, useRef, useState } from "react";

import { FiChevronDown, FiChevronRight } from "react-icons/fi";

import axios from "axios";
import * as d3 from "d3";
import { useUserStore } from "../../store/store";

import checkObjectEmpty from "../../utils/checkObjectEmptyUtils";
import { selfLoopArc, linkArc } from "../../utils/drawGraphUtils";

function Behavior() {
  const { user } = useUserStore();
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState({});
  const [isDropdown, setIsDropdown] = useState(false);
  const [topPagePath, setTopPagePath] = useState("");
  const [sessionCount, setSessionCount] = useState(0);
  const [totalVisitCount, setTotalVisitCount] = useState(0);
  const [totalRefreshCount, setTotalRefreshCount] = useState(0);
  const [totalExitCount, setTotalExitCount] = useState(0);
  const svgRef = useRef();
  const barChartRef = useRef();

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

  useEffect(() => {
    if (selectedProject._id) {
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

  function processPageViewData(sessions) {
    const nodes = [];
    const links = [];
    const linkCounts = {};
    const visitCounts = {};
    const exitCounts = {};

    sessions.forEach((session) => {
      session.pageViews.forEach((pageView, index) => {
        if (!visitCounts[pageView.url]) {
          visitCounts[pageView.url] = 1;
        } else {
          visitCounts[pageView.url] += 1;
        }

        let node = nodes.find((n) => n.id === pageView.url);

        if (!node) {
          node = {
            id: pageView.url,
            pageTitle: pageView.pageTitle,
            referrer: pageView.referrer,
            timestamp: pageView.timestamp,
            visitCounts: visitCounts[pageView.url],
            exitCounts: 0,
          };
          nodes.push(node);
        }

        if (!session.isActive && index === session.pageViews.length - 1) {
          if (!exitCounts[pageView.url]) {
            exitCounts[pageView.url] = 1;
          } else {
            exitCounts[pageView.url] += 1;
          }
          node.exitCounts = exitCounts[pageView.url];
        }

        if (index < session.pageViews.length - 1) {
          const source = pageView.url;
          const target = session.pageViews[index + 1].url;
          const linkKey = `${source}-${target}`;

          if (!linkCounts[linkKey]) {
            linkCounts[linkKey] = 1;
            links.push({
              source,
              target,
              isSelfLoop: source === target,
              count: 1,
            });
          } else {
            linkCounts[linkKey] += 1;

            const linkIndex = links.findIndex(
              (link) => link.source === source && link.target === target,
            );

            if (linkIndex !== -1) {
              links[linkIndex].count = linkCounts[linkKey];
            }
          }
        }
      });
    });

    nodes.forEach((node) => {
      node.visitCount = visitCounts[node.id];
    });

    return { nodes, links };
  }

  function drawForceGraph({ nodes, links }) {
    const svg = d3.select(svgRef.current);
    const width = +svg.attr("width");
    const height = +svg.attr("height");

    svg.selectAll("*").remove();

    const group = svg.append("g");
    const zoom = d3.zoom().on("zoom", (event) => {
      group.attr("transform", event.transform);
    });
    const tooltip = d3.select("#tooltip");

    function dragstarted(event, d) {
      if (!event.active) simulation.alphaTarget(0.3).restart();
      d.fx = d.x;
      d.fy = d.y;
    }

    function dragged(event, d) {
      d.fx = event.x;
      d.fy = event.y;
    }

    function dragended(event, d) {
      if (!event.active) simulation.alphaTarget(0);
      d.fx = null;
      d.fy = null;
    }

    svg.call(zoom);

    const link = group
      .selectAll(".link")
      .data(links)
      .enter()
      .append("path")
      .style("stroke", (d) => (d.isSelfLoop ? "#0059ff" : "#aaa"))
      .attr("stroke-width", 4)
      .attr("fill", "none")
      .attr("marker-end", (d) =>
        d.isSelfLoop ? "url(#refresh-arrow)" : "url(#arrow)",
      )
      .on("mouseover", function (event, d) {
        tooltip
          .style("left", event.pageX + 10 + "px")
          .style("top", event.pageY + 10 + "px")
          .style("display", "inline-block")
          .html(
            `Source: ${d.source.pageTitle}<br><br>Target: ${d.target.pageTitle}`,
          );

        d3.select(this).style("stroke", "red").style("stroke-width", 6);
      })
      .on("mouseout", function () {
        tooltip.style("display", "none");

        d3.select(this)
          .style("stroke", (d) => (d.isSelfLoop ? "#0059ff" : "#aaa"))
          .style("stroke-width", 4);
      });

    const linkText = group
      .selectAll(".link-text")
      .data(links)
      .enter()
      .append("text")
      .attr("dy", "-5")
      .attr("text-anchor", "middle")
      .text((d) => d.count)
      .style("fill", (d) => (d.isSelfLoop ? "#0059ff" : "black"))
      .style("font-weight", "bold")
      .attr("font-size", "25px");

    const node = group
      .selectAll(".node")
      .data(nodes)
      .enter()
      .append("rect")
      .attr("width", 300)
      .attr("height", 80)
      .attr("rx", 15)
      .attr("ry", 15)
      .style("fill", "#dddee1")
      .call(
        d3
          .drag()
          .on("start", dragstarted)
          .on("drag", dragged)
          .on("end", dragended),
      );

    const text = group
      .selectAll(".text")
      .data(nodes)
      .enter()
      .append("text")
      .attr("class", "text")
      .attr("dx", 10)
      .attr("dy", 20)
      .text((d) => (d.pageTitle === "/" ? "\u{1F3E0} Home" : d.pageTitle));

    const visitCountText = group
      .selectAll(".visit-count-text")
      .data(nodes)
      .enter()
      .append("text")
      .attr("class", "visit-count-text")
      .attr("dx", 10)
      .attr("dy", 70)
      .text((d) => `방문 횟수: ${d.visitCount}`)
      .attr("fill", "black")
      .attr("font-size", "18px");

    const exitCountText = group
      .selectAll(".exit-count-text")
      .data(nodes)
      .enter()
      .append("text")
      .attr("class", "exit-count-text")
      .text((d) => `이탈 횟수: ${d.exitCounts}`)
      .attr("dx", 10)
      .attr("dy", 46)
      .attr("fill", "red")
      .attr("font-size", "18px");

    svg
      .append("defs")
      .selectAll("marker")
      .data(["arrow", "refresh-arrow, hover-arrow"])
      .enter()
      .append("marker")
      .attr("id", (d) => d)
      .attr("viewBox", "0 -5 10 10")
      .attr("refX", (d) => (d === "refresh-arrow" ? 4 : 7))
      .attr("refY", 0)
      .attr("markerWidth", 10)
      .attr("markerHeight", 10)
      .attr("orient", "auto")
      .append("path")
      .attr("d", "M0,-5L10,0L0,5")
      .attr("fill", (d) => (d === "refresh-arrow" ? "#0059ff" : "#999"));

    const simulation = d3
      .forceSimulation(nodes)
      .force(
        "link",
        d3
          .forceLink(links)
          .id((d) => d.id)
          .distance(800),
      )
      .force("charge", d3.forceManyBody().strength(-2000))
      .force("center", d3.forceCenter(width / 2, height / 2));

    simulation.on("tick", () => {
      link.attr("d", function (d) {
        return d.isSelfLoop ? selfLoopArc(d) : linkArc(d);
      });

      linkText.each(function (linkData, i) {
        const self = d3.select(this);
        const path = d3.select(link.nodes()[i]);
        const midPoint = path
          .node()
          .getPointAtLength(path.node().getTotalLength() / 2);
        d3.select(this).attr("x", midPoint.x).attr("y", midPoint.y);

        const bbox = self.node().getBBox();
        let rect = d3.select(`#rect${i}`);

        node.attr("transform", (d) => `translate(${d.x}, ${d.y})`);
        text.attr("x", (d) => d.x).attr("y", (d) => d.y);

        if (rect.empty()) {
          rect = group
            .insert("rect", "text")
            .attr("id", `rect${i}`)
            .attr("x", midPoint.x - bbox.width / 2 - 4)
            .attr("y", midPoint.y - bbox.height / 2 - 4)
            .attr("width", bbox.width + 8)
            .attr("height", bbox.height + 4)
            .attr("fill", "white")
            .attr("fill-opacity", 0.5);
        } else {
          rect
            .attr("x", midPoint.x - bbox.width / 2 - 4)
            .attr("y", midPoint.y - bbox.height - 4)
            .attr("width", bbox.width + 8)
            .attr("height", bbox.height + 4);
        }

        self.attr("x", midPoint.x).attr("y", midPoint.y);
      });

      visitCountText.attr("x", (d) => d.x).attr("y", (d) => d.y);
      exitCountText.attr("x", (d) => d.x).attr("y", (d) => d.y);
    });
  }

  function drawBarGraph(data) {
    const svg = d3.select(barChartRef.current);
    const maxBarWidth = 600;
    const requiredItems = 5;

    svg.selectAll("*").remove();

    if (data.length > 0 && data.length < requiredItems) {
      while (data.length < requiredItems) {
        data.push({
          pageTitle: `접속 페이지 대기 중...(${data.length + 1})`,
          visitCount: 0,
          isPlaceholder: true,
        });
      }
    } else if (data.length === 0) {
      return;
    }

    const xScale = d3
      .scaleLinear()
      .domain([0, d3.max(data, (d) => d.visitCount)])
      .range([0, maxBarWidth]);

    const yScale = d3
      .scaleBand()
      .domain(data.map((d) => d.pageTitle))
      .range([0, 300])
      .padding(0.5);

    svg.append("g").call(d3.axisLeft(yScale));

    svg
      .selectAll(".bar")
      .data(data)
      .enter()
      .append("rect")
      .classed("background-bar", true)
      .attr("x", 0)
      .attr("y", (d) => yScale(d.pageTitle))
      .attr("width", maxBarWidth)
      .attr("height", yScale.bandwidth())
      .attr("fill", "#ccc")
      .attr("rx", 10)
      .attr("ry", 10);

    svg
      .selectAll(".bar")
      .data(data)
      .enter()
      .append("rect")
      .classed("bar", true)
      .attr("x", 0)
      .attr("y", (d) => yScale(d.pageTitle))
      .attr("width", (d) => xScale(d.visitCount))
      .attr("height", yScale.bandwidth())
      .attr("fill", "steelblue")
      .attr("rx", 10)
      .attr("ry", 10);

    svg
      .selectAll(".label")
      .data(data)
      .enter()
      .append("text")
      .classed("label", true)
      .attr("x", maxBarWidth - 10)
      .attr("y", (d) => yScale(d.pageTitle) + yScale.bandwidth() / 2 - 25)
      .attr("dy", ".3em")
      .attr("text-anchor", "end")
      .text((d) => d.visitCount);

    svg
      .selectAll(".pageTitle-label")
      .data(data)
      .enter()
      .append("text")
      .attr("class", "pageTitle-label")
      .attr("x", 5)
      .attr("y", (d) => yScale(d.pageTitle) + yScale.bandwidth() / 2 - 19)
      .attr("text-anchor", "start")
      .text((d) => d.pageTitle);
  }

  useEffect(() => {
    async function getSessions() {
      if (checkObjectEmpty(selectedProject)) return;

      try {
        const response = await axios.get(
          `${import.meta.env.VITE_SERVER_URL}/analytics/${selectedProject._id}/behavior`,
          {
            withCredentials: true,
          },
        );

        const pageViewData = processPageViewData(response.data);

        if (pageViewData.nodes.length > 0) {
          drawForceGraph(pageViewData);
        }

        const sortedData = pageViewData.nodes.sort(
          (a, b) => b.visitCount - a.visitCount,
        );

        const topPageViews = sortedData.slice(0, 5);

        drawBarGraph(topPageViews);

        if (topPageViews.length > 0) {
          setTopPagePath(topPageViews[0].pageTitle);
        } else {
          setTopPagePath("");
        }

        const totalVisits = sortedData.reduce(
          (acc, node) => acc + node.visitCount,
          0,
        );
        const totalExits = sortedData.reduce(
          (acc, node) => acc + node.exitCounts,
          0,
        );

        const totalRefreshes = pageViewData.links.reduce((acc, link) => {
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
            tabIndex="0"
          >
            {isDropdown ? <FiChevronDown /> : <FiChevronRight />}
            {`내 프로젝트 (${projects.length})`}
          </button>
          <div
            className={`px-4 py-2 flex flex-col max-h-150 overflow-y-auto bg-gray-100 w-full  ${
              isDropdown ? "border border-gray-300 rounded-lg" : ""
            }`}
          >
            {isDropdown &&
              projects.map((project) => (
                <button
                  key={project._id}
                  onClick={() => setSelectedProject(project)}
                  className={`py-2 px-4 w-full cursor-pointer
                  ${selectedProject._id === project._id ? "bg-indigo-500 text-white" : "hover:bg-indigo-400 hover:text-white"}
                  transition duration-500 ease-in-out`}
                  tabIndex="0"
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
                User flow analysis
              </div>
              <div className="block mt-1 text-lg leading-tight font-medium text-black hover:underline">
                Path to the most accessed page
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
                User flow analysis
              </div>
              <div className="block mt-1 text-lg leading-tight font-medium text-black hover:underline">
                Page flow for sessions by path
              </div>
              {selectedProject._id && totalVisitCount > 0 ? (
                <div className="mt-4 p-4 bg-white shadow rounded-md">
                  <h2 className="text-lg font-semibold text-gray-800">
                    분석 요약
                  </h2>
                  <div className="grid grid-cols-2 gap-4 mt-4">
                    <div className="flex items-center p-4 bg-yellow-100 rounded-md">
                      <span className="text-yellow-600">총 세션 수:</span>
                      <span className="ml-auto text-yellow-800 font-bold">
                        {sessionCount}
                      </span>
                    </div>
                    <div className="flex items-center p-4 bg-green-100 rounded-md">
                      <span className="text-green-600">총 방문 횟수:</span>
                      <span className="ml-auto text-green-800 font-bold">
                        {totalVisitCount}
                      </span>
                    </div>
                    <div className="flex items-center p-4 bg-blue-100 rounded-md">
                      <span className="text-blue-600">총 새로고침 횟수:</span>
                      <span className="ml-auto text-blue-800 font-bold">
                        {totalRefreshCount}
                      </span>
                    </div>
                    <div className="flex items-center p-4 bg-red-100 rounded-lg">
                      <span className="text-red-600">총 이탈 횟수:</span>
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
