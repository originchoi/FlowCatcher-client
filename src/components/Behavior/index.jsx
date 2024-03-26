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

    sessions.forEach((session) => {
      session.pageViews.forEach((pageView, index) => {
        const sourceIndex = nodes.findIndex((node) => node.id === pageView.url);

        if (!visitCounts[pageView.url]) {
          visitCounts[pageView.url] = 1;
        } else {
          visitCounts[pageView.url] += 1;
        }

        if (sourceIndex === -1) {
          nodes.push({
            id: pageView.url,
            pageTitle: pageView.pageTitle,
            referrer: pageView.referrer,
            timestamp: pageView.timestamp,
            visitCounts: visitCounts[pageView.url],
          });
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

    svg.call(zoom);

    const link = group
      .selectAll(".link")
      .data(links)
      .enter()
      .append("path")
      .style("stroke", (d) => (d.isSelfLoop ? "#0059ff" : "#aaa"))
      .attr("stroke-width", 2)
      .attr("fill", "none")
      .attr("marker-end", (d) =>
        d.isSelfLoop ? "url(#refresh-arrow)" : "url(#arrow)",
      );

    const linkText = group
      .selectAll(".link-text")
      .data(links)
      .enter()
      .append("text")
      .attr("dy", "-5")
      .attr("text-anchor", "middle")
      .text((d) => d.count)
      .style("fill", (d) => (d.isSelfLoop ? "#0059ff" : "black"));

    const node = group
      .selectAll(".node")
      .data(nodes)
      .enter()
      .append("rect")
      .attr("width", 300)
      .attr("height", 80)
      .attr("rx", 15)
      .attr("ry", 15)
      .style("fill", "#69b3a2");

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
      .text((d) => `방문횟수: ${d.visitCount}`)
      .attr("fill", "black")
      .attr("font-size", "14px");

    svg
      .append("defs")
      .selectAll("marker")
      .data(["arrow", "refresh-arrow"])
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
      .force("charge", d3.forceManyBody().strength(-1000))
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
            .attr("fill", "#d9ebf3");
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
      .attr("rx", 15)
      .attr("ry", 15);

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
      .attr("rx", 15)
      .attr("ry", 15);

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
      } catch (error) {
        console.error(error);
      }
    }

    getSessions();
  }, [selectedProject]);

  return (
    <div className="flex flex-row flex-1 min-h-screen">
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
                Analysis Preview
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
          <div className="md:flex">
            <div className="p-8">
              <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
                Analysis Preview
              </div>
              <div className="block mt-1 text-lg leading-tight font-medium text-black hover:underline">
                Submit Signup Form grouped by Path
              </div>
              <p className="mt-2 text-gray-500">
                이곳에 당신의 분석 내용이 들어갑니다...
              </p>
              <div className="mt-4">
                <svg ref={svgRef} width="1200" height="900"></svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Behavior;
