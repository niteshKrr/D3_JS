import React from "react";
import { useEffect } from "react";
import * as d3 from "d3";

const LineChart = (props: { data: any; width: any; height: any }) => {
  const { data, width, height } = props;

  useEffect(() => {
    drawChart();
  }, [data]);

  function drawChart() {
    // Add logic to draw the chart here

    const margin = { top: 50, right: 50, bottom: 50, left: 50 };
    const yMinValue = d3.min(data, (d: any) => d.value);
    const yMaxValue = d3.max(data, (d: any) => d.value);
    const xMinValue = d3.min(data, (d: any) => d.label);
    const xMaxValue = d3.max(data, (d: any) => d.label);

    const svg = d3
      .select("#container")
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);
    // const tooltip = d3
    //   .select("#container")
    //   .append("div")
    //   .attr("class", "tooltip");

    const xScale = d3
      .scaleLinear()
      .domain([xMinValue, xMaxValue])
      .range([0, width]);
    const yScale = d3.scaleLinear().range([height, 0]).domain([0, yMaxValue]);
    const line = d3
      .line()
      .x((d:any) => xScale(d.label))
      .y((d:any) => yScale(d.value))
      .curve(d3.curveMonotoneX);

    // svg
    //   .append("g")
    //   .attr("class", "grid")
    //   .attr("transform", `translate(0,${height})`)
    //   .call(d3.axisBottom(xScale).tickSize(-height).tickFormat(""));
    // svg
    //   .append("g")
    //   .attr("class", "grid")
    //   .call(d3.axisLeft(yScale).tickSize(-width).tickFormat(""));
    svg
      .append("g")
      .attr("class", "x-axis")
      .attr("transform", `translate(0,${height})`)
      .call(d3.axisBottom().scale(xScale).tickSize(15));
    svg.append("g").attr("class", "y-axis").call(d3.axisLeft(yScale));
    svg
      .append("path")
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", "#f6c3d0")
      .attr("stroke-width", 4)
      .attr("class", "line")
      .attr("d", line);

   
  }
  return <div id="container" />;
};

export default LineChart;
