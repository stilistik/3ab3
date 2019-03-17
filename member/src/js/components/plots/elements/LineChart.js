import React from 'react';
import PropTypes from 'prop-types';
import { isEqual } from 'lodash';
import * as d3 from 'd3';

import styles from './LineChart.css';

class LineChart extends React.Component {
  componentDidUpdate = (prevProps) => {
    if (!isEqual(prevProps, this.props)) {
      this.clear();
      this.draw();
    }
  };

  clear = () => {
    d3.select(this.svg)
      .selectAll('*')
      .remove();
  };

  draw = () => {
    if (!this.svg || !this.props.config) return;
    this.buildContainer();
    this.drawAxes();
    const path = this.drawLine();
    this.animateDraw(path);
  };

  buildContainer = () => {
    const svg = d3.select(this.svg).style('cursor', 'pointer');
    const { config } = this.props;

    svg
      .append('g')
      .attr('id', 'container')
      .attr(
        'transform',
        `translate(${config.margin.left},${config.margin.top})`
      );
  };

  drawLine = () => {
    const { config } = this.props;
    const graph = d3
      .select(this.svg)
      .selectAll('#container')
      .append('g');

    const line = d3
      .line()
      .y((d) => {
        return config.yScale(d.balance);
      })
      .x((d) => {
        return config.xScale(d.date);
      })
      .curve(d3.curveMonotoneX);

    const path = graph
      .append('path')
      .datum(this.props.data)
      .attr('fill', 'none')
      .attr('stroke', config.color)
      .attr('stroke-linejoin', 'round')
      .attr('stroke-linecap', 'round')
      .attr('stroke-width', 5)
      .attr('d', line);

    const nodes = graph
      .selectAll('.node')
      .data(this.props.data)
      .enter()
      .append('g')
      .attr('class', 'node')
      .attr('transform', (d) => {
        return (
          'translate(' +
          config.xScale(d.date) +
          ', ' +
          config.yScale(d.balance) +
          ')'
        );
      });

    nodes
      .append('circle')
      .on('click', this.props.onClick)
      .on('mouseover', this.props.onMouseOver)
      .on('mouseout', this.props.onMouseOut)
      .attr('class', styles.interactor)
      .attr('r', config.interactorRadius)
      .style('opacity', 0);

    nodes
      .append('circle')
      .attr('class', styles.point)
      .attr('fill', config.color)
      .attr('r', 0)
      .transition()
      .duration(config.animDuration)
      .attr('r', config.nodeRadius)
      .style('pointer-events', 'none');

    return path;
  };

  drawAxes = () => {
    const { config } = this.props;
    const container = d3.select(this.svg).selectAll('#container');
    const xAxis = d3
      .axisBottom(config.xScale)
      .ticks(d3.timeMonth)
      .tickFormat((d) => {
        return d.toString().split(' ')[1];
      })
      .tickSizeInner(-config.height);
    const yAxis = d3.axisLeft(config.yScale).tickSizeInner(-config.width);

    const x = container
      .append('g')
      .attr('class', 'xaxis')
      .attr('transform', `translate(0, ${config.height})`)
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

  render() {
    return <svg ref={(ref) => (this.svg = ref)} width="100%" height="100%" />;
  }
}

LineChart.propTypes = {
  onClick: PropTypes.func.isRequired,
  onMouseOver: PropTypes.func.isRequired,
  onMouseOut: PropTypes.func.isRequired,
  data: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      date: PropTypes.instanceOf(Date).isRequired,
      balance: PropTypes.number.isRequired,
    })
  ),
  config: PropTypes.shape({
    color: PropTypes.string.isRequired,
    interactorRadius: PropTypes.number.isRequired,
    nodeRadius: PropTypes.number.isRequired,
    animDuration: PropTypes.number.isRequired,
    margin: PropTypes.shape({
      top: PropTypes.number.isRequired,
      left: PropTypes.number.isRequired,
      right: PropTypes.number.isRequired,
      bottom: PropTypes.number.isRequired,
    }).isRequired,
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    xScale: PropTypes.func.isRequired,
    yScale: PropTypes.func.isRequired,
    tooltip: PropTypes.shape({
      width: PropTypes.number.isRequired,
      height: PropTypes.number.isRequired,
      xOffset: PropTypes.number.isRequired,
      yOffset: PropTypes.number.isRequired,
    }).isRequired,
  }),
};

export default LineChart;
