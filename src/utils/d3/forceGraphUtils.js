/* eslint-disable */

import * as d3 from "d3";
import { linkArc, selfLoopArc } from "./graphShapeUtils";

function drawForceGraph({ nodes, links }, svgRef) {
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

export default drawForceGraph;
