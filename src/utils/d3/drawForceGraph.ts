/* eslint-disable */

import * as d3 from "d3";
import { linkArc, selfLoopArc } from "./drawArcUtils";
import { GraphNode, GraphLink } from "src/types/utils";

interface ProcessedData {
  nodes: GraphNode[];
  links: GraphLink[];
}

function drawForceGraph(
  { nodes, links }: ProcessedData,
  svgRef: React.RefObject<SVGSVGElement>,
): void {
  const svg = d3.select(svgRef.current);
  const width = +svg.attr("width");
  const height = +svg.attr("height");

  svg.selectAll("*").remove();

  if (nodes.length === 0 && links.length === 0) {
    return;
  }

  const group = svg.append("g");
  const zoom = d3.zoom<SVGSVGElement, unknown>().on("zoom", (event) => {
    group.attr("transform", event.transform);
  });
  const tooltip = d3.select("#tooltip");

  function dragstarted(
    event: d3.D3DragEvent<SVGRectElement, GraphNode, GraphNode>,
    d: GraphNode,
  ) {
    if (!event.active) simulation.alphaTarget(0.3).restart();

    d.fx = d.x;
    d.fy = d.y;
  }

  function dragged(
    event: d3.D3DragEvent<SVGRectElement, GraphNode, GraphNode>,
    d: GraphNode,
  ) {
    d.fx = event.x;
    d.fy = event.y;
  }

  function dragended(
    event: d3.D3DragEvent<SVGRectElement, GraphNode, GraphNode>,
    d: GraphNode,
  ) {
    if (!event.active) simulation.alphaTarget(0);

    d.fx = null;
    d.fy = null;
  }

  svg.call(zoom as any);

  const link = group
    .selectAll<SVGPathElement, GraphLink>(".link")
    .data(links)
    .enter()
    .append("path")
    .datum(function (d) {
      return d;
    })
    .style("stroke", function (d) {
      return (d as GraphLink).isSelfLoop ? "#0059ff" : "#aaa";
    })
    .attr("stroke-width", 4)
    .attr("fill", "none")
    .attr("marker-end", function (d) {
      return (d as GraphLink).isSelfLoop
        ? "url(#refresh-arrow)"
        : "url(#arrow)";
    })
    .on("mouseover", function (event, d) {
      const sourceNode = (d as GraphLink).source as GraphNode;
      const targetNode = (d as GraphLink).target as GraphNode;

      tooltip
        .style("left", event.pageX + 10 + "px")
        .style("top", event.pageY + 10 + "px")
        .style("display", "inline-block")
        .html(
          `출발페이지: ${sourceNode.pageTitle}<br>도착페이지: ${targetNode.pageTitle}`,
        );

      d3.select(this as SVGPathElement)
        .style("stroke", "red")
        .style("stroke-width", 6);
    })
    .on("mouseout", function () {
      tooltip.style("display", "none");

      d3.select(this as SVGPathElement)
        .style("stroke", function (d) {
          return (d as GraphLink).isSelfLoop ? "#0059ff" : "#aaa";
        })
        .style("stroke-width", 4);
    });

  const linkText = group
    .selectAll<SVGTextElement, GraphLink>(".link-text")
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
    .selectAll<SVGRectElement, GraphNode>(".node")
    .data(nodes)
    .enter()
    .append("rect")
    .attr("height", 135)
    .attr("rx", 15)
    .attr("ry", 15)
    .style("fill", "#dddee1")
    .call(
      d3
        .drag<SVGRectElement, GraphNode>()
        .on("start", dragstarted)
        .on("drag", dragged)
        .on("end", dragended),
    );

  const text = group
    .selectAll<SVGTextElement, GraphNode>(".text")
    .data(nodes)
    .enter()
    .append("text")
    .attr("class", "text")
    .attr("dx", 10)
    .attr("dy", 25)
    .each(function (d) {
      const textElement = d3.select(this);
      if (d.pageTitle === "/") {
        textElement
          .append("tspan")
          .attr("style", "font-weight: bold;")
          .text("\u{1F3E0} Home");
      } else {
        textElement
          .append("tspan")
          .attr("style", "font-weight: bold;")
          .text("홈 이하 URL: ");
        textElement.append("tspan").text(d.pageTitle);
      }
    });

  node.attr("width", function (d, i) {
    const textElement = text.nodes()[i] as SVGTextElement;
    const textWidth = textElement.getBBox().width;

    return Math.max(300, textWidth + 25);
  });

  const exitCountText = group
    .selectAll<SVGTextElement, GraphNode>(".exit-count-text")
    .data(nodes)
    .enter()
    .append("text")
    .attr("class", "exit-count-text")
    .text((d) => `페이지 이탈 횟수: ${d.exitCounts}`)
    .attr("dx", 10)
    .attr("dy", 70)
    .attr("fill", "red")
    .attr("font-size", "18px");

  const visitCountText = group
    .selectAll<SVGTextElement, GraphNode>(".visit-count-text")
    .data(nodes)
    .enter()
    .append("text")
    .attr("class", "visit-count-text")
    .attr("dx", 10)
    .attr("dy", 95)
    .text((d) => `페이지 방문 횟수: ${d.visitCount}`)
    .attr("fill", "green")
    .attr("font-size", "18px");

  const refreshCountText = group
    .selectAll<SVGTextElement, GraphNode>(".refresh-count-text")
    .data(nodes)
    .enter()
    .append("text")
    .attr("class", "refresh-count-text")
    .attr("dx", 10)
    .attr("dy", 120)
    .text((d) => `페이지 새로고침 횟수: ${d.refreshCount || 0}`)
    .attr("fill", "blue")
    .attr("font-size", "18px");

  svg
    .append("defs")
    .selectAll<SVGMarkerElement, string>("marker")
    .data(["arrow", "refresh-arrow", "hover-arrow"])
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
        .forceLink<GraphNode, GraphLink>(links)
        .id((d: GraphNode) => d.id)
        .distance(800),
    )
    .force("charge", d3.forceManyBody().strength(-2000))
    .force("center", d3.forceCenter(width / 2, height / 2));

  simulation.on("tick", () => {
    link.attr("d", (d) => (d.isSelfLoop ? selfLoopArc(d) : linkArc(d)));

    linkText.each(function (linkData, i) {
      const self = d3.select(this);
      const path = d3.select(link.nodes()[i]);
      const pathNode = path.node();

      if (pathNode) {
        const midPoint = pathNode.getPointAtLength(
          pathNode.getTotalLength() / 2,
        );

        d3.select(this).attr("x", midPoint.x).attr("y", midPoint.y);

        const bbox = self.node()!.getBBox();
        let rect = group.select<SVGRectElement>(`#rect${i}`);

        node.attr(
          "transform",
          (d: GraphNode) => `translate(${d.x || 0}, ${d.y || 0})`,
        );
        text
          .attr("x", (d: GraphNode) => d.x || 0)
          .attr("y", (d: GraphNode) => d.y || 0);

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
      }
    });

    visitCountText.attr("x", (d) => d.x || 0).attr("y", (d) => d.y || 0);
    exitCountText.attr("x", (d) => d.x || 0).attr("y", (d) => d.y || 0);
    refreshCountText.attr("x", (d) => d.x || 0).attr("y", (d) => d.y || 0);
  });
}

export default drawForceGraph;
