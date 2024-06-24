import * as d3 from "d3";

interface BarData {
  pageTitle: string;
  visitCount: number;
  isPlaceholder?: boolean;
}

function drawBarGraph(
  data: BarData[],
  barChartRef: React.RefObject<SVGSVGElement>,
): void {
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
    .domain([0, d3.max(data, (d) => d.visitCount) || 0])
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
    .attr("y", (d) => yScale(d.pageTitle) || 0)
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
    .attr("y", (d) => yScale(d.pageTitle) || 0)
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
    .attr("y", (d) => (yScale(d.pageTitle) || 0) + yScale.bandwidth() / 2 - 25)
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
    .attr("y", (d) => (yScale(d.pageTitle) || 0) + yScale.bandwidth() / 2 - 19)
    .attr("text-anchor", "start")
    .text((d) => d.pageTitle);
}

export default drawBarGraph;
