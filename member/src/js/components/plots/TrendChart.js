import React from 'react';
import * as d3 from 'd3';
import PropTypes from 'prop-types';
import LineChart from './elements/LineChart';
import Tooltip from './elements/Tooltip';

import styles from './TrendChart.css';

export class TrendChart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      datum: null,
      config: null,
    };
  }

  componentDidMount = () => {
    window.addEventListener('resize', this.resize);
    this.setupConfig();
  };

  componentWillUnmount = () => {
    window.removeEventListener('resize', this.resize);
  };

  setupConfig = () => {
    const margin = { top: 20, right: 20, bottom: 50, left: 50 };
    const cWidth = this.container.clientWidth;
    const cHeight = this.container.clientHeight;
    const width = cWidth - margin.left - margin.right;
    const height = cHeight - margin.top - margin.bottom;

    const xScale = d3
      .scaleTime()
      .rangeRound([0, width])
      .domain(
        d3.extent(this.props.data, function(d) {
          return d.date;
        })
      );

    const yScale = d3
      .scaleLinear()
      .rangeRound([height, 0])
      .domain(
        d3.extent(this.props.data, function(d) {
          return d.balance;
        })
      );

    let config = {
      color: '#fff',
      interactorRadius: 20,
      nodeRadius: 8,
      animDuration: 1000,
      margin: margin,
      width: width,
      height: height,
      xScale: xScale,
      yScale: yScale,
      tooltip: { width: 120, height: 60, xOffset: 0, yOffset: 55 },
    };

    this.setState({ config });
  };

  createScales = () => {};

  resize = () => {
    this.setupConfig();
  };

  onMouseOver = (e) => {
    this.setState({ datum: e });
  };

  onMouseOut = () => {
    this.setState({ datum: null });
  };

  render() {
    return (
      <div ref={(ref) => (this.container = ref)} className={styles.container}>
        <Tooltip config={this.state.config} datum={this.state.datum} />
        <LineChart
          data={this.props.data}
          config={this.state.config}
          onMouseOut={this.onMouseOut}
          onMouseOver={this.onMouseOver}
          onClick={this.props.onClick}
        />
      </div>
    );
  }
}

TrendChart.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      date: PropTypes.instanceOf(Date).isRequired,
      balance: PropTypes.number.isRequired,
    }).isRequired
  ).isRequired,
  onClick: PropTypes.func.isRequired,
};
