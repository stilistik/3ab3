import React from 'react';
import PropTypes from 'prop-types';
import * as d3 from 'd3';

import styles from './TrendPlot.css';

export class TrendPlot extends React.Component {
  componentDidMount = () => this.renderPlot();

  renderPlot = () => {
    if (!this.svg) return;
    this.data = this.props.data;
    this.color = '#fff';
    this.interactorRadius = 20;
    this.animDuration = 1000;
    this.radius = 8;
    this.margin = { top: 20, right: 20, bottom: 50, left: 50 };
    this.width = this.svg.clientWidth - this.margin.left - this.margin.right;
    this.height = this.svg.clientHeight - this.margin.top - this.margin.bottom;

    this.xScale = d3
      .scaleTime()
      .rangeRound([0, this.width])
      .domain(
        d3.extent(this.data, function(d) {
          return d.date;
        })
      );

    this.yScale = d3
      .scaleLinear()
      .rangeRound([this.height, 0])
      .domain(
        d3.extent(this.data, function(d) {
          return d.balance;
        })
      );

    this.buildContainer();
    this.drawAxes();
    const path = this.drawLine();
    this.animateDraw(path);
  };

  buildContainer = () => {
    const svg = d3.select(this.svg).style('cursor', 'pointer');

    svg
      .append('g')
      .attr('id', 'container')
      .attr('transform', `translate(${this.margin.left},${this.margin.top})`);
  };

  drawLine = () => {
    const graph = d3
      .select(this.svg)
      .selectAll('#container')
      .append('g');

    const line = d3
      .line()
      .y((d) => {
        return this.yScale(d.balance);
      })
      .x((d) => {
        return this.xScale(d.date);
      })
      .curve(d3.curveMonotoneX);

    const path = graph
      .append('path')
      .datum(this.data)
      .attr('fill', 'none')
      .attr('stroke', this.color)
      .attr('stroke-linejoin', 'round')
      .attr('stroke-linecap', 'round')
      .attr('stroke-width', 5)
      .attr('d', line);

    const nodes = graph
      .selectAll('.node')
      .data(this.data)
      .enter()
      .append('g')
      .attr('class', 'node')
      .attr('transform', (d) => {
        return (
          'translate(' +
          this.xScale(d.date) +
          ', ' +
          this.yScale(d.balance) +
          ')'
        );
      });

    nodes
      .append('circle')
      .on('click', this.onClick)
      .attr('class', styles.interactor)
      .attr('r', this.interactorRadius)
      .style('opacity', 0);

    nodes
      .append('circle')
      .attr('class', styles.point)
      .attr('fill', this.color)
      .attr('r', 0)
      .transition()
      .duration(this.animDuration)
      .attr('r', this.radius)
      .style('pointer-events', 'none');

    return path;
  };

  drawAxes = () => {
    const container = d3.select(this.svg).selectAll('#container');
    const xAxis = d3
      .axisBottom(this.xScale)
      .ticks(d3.timeMonth)
      .tickFormat((d) => {
        return d.toString().split(' ')[1];
      })
      .tickSizeInner(-this.height);
    const yAxis = d3.axisLeft(this.yScale).tickSizeInner(-this.width);

    const x = container
      .append('g')
      .attr('class', 'xaxis')
      .attr('transform', `translate(0, ${this.height})`)
      .call(xAxis);

    x.selectAll('.domain').style('opacity', 0);

    x.selectAll('.tick')
      .selectAll('line')
      .attr('stroke-dasharray', [2, 3])
      .style('opacity', 0.4);

    x.selectAll('.tick')
      .selectAll('text')
      .attr('transform', 'translate(0, 10)');

    const y = container
      .append('g')
      .attr('class', 'yaxis')
      .call(yAxis);

    y.selectAll('.domain').style('opacity', 0);

    y.selectAll('.tick')
      .selectAll('line')
      .attr('stroke-dasharray', [2, 3])
      .style('opacity', 0.4);

    y.selectAll('.tick')
      .selectAll('text')
      .attr('transform', 'translate(-10, 0)');
  };

  animateDraw = (path) => {
    var totalLength = path.node().getTotalLength();

    path
      .attr('stroke-dasharray', totalLength + ' ' + totalLength)
      .attr('stroke-dashoffset', totalLength)
      .transition()
      .duration(1000)
      .attr('stroke-dashoffset', 0);
  };

  onClick = (e) => {
    this.props.onClick(e);
  };

  render() {
    return <svg ref={(ref) => (this.svg = ref)} width="100%" height="100%" />;
  }
}

TrendPlot.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      date: PropTypes.instanceOf(Date).isRequired,
      balance: PropTypes.number.isRequired,
    })
  ).isRequired,
  onClick: PropTypes.func.isRequired,
};
