import React from 'react';
import PropTypes from 'prop-types';
import { isEqual } from 'lodash';
import * as d3 from 'd3';

import styles from './Tooltip.css';

class Tooltip extends React.Component {
  componentDidUpdate = (prevProps) => {
    if (!isEqual(prevProps.datum, this.props.datum)) {
      if (this.props.datum) this.draw();
      else this.hide();
    }
  };

  hide = () => {
    d3.select(this.tooltip).style('opacity', 0);
  };

  draw = () => {
    if (!this.tooltip || !this.props.config || !this.props.datum) return;

    const { config } = this.props;

    d3.select(this.tooltip)
      .selectAll('*')
      .remove();

    d3.select(this.tooltip).style('opacity', 1);

    d3.select(this.tooltip)
      .style('width', config.tooltip.width)
      .style('height', config.tooltip.height)
      .style('transform', () => {
        const x = config.xScale(this.props.datum.date) - config.tooltip.xOffset;
        const y =
          config.yScale(this.props.datum.balance) - config.tooltip.yOffset;
        return `translate(${x}px, ${y}px)`;
      });

    const date = new Date(this.props.datum.date).toDateString();
    const balance = `Balance: ${this.props.datum.balance} CHF`;
    d3.select(this.tooltip)
      .append('div')
      .attr('class', styles.date)
      .append('text')
      .text(date);

    d3.select(this.tooltip)
      .append('div')
      .attr('class', styles.balance)
      .append('text')
      .text(balance);
  };

  render() {
    return (
      <div
        className={styles.tooltip}
        ref={(ref) => (this.tooltip = ref)}
        {...this.props}
      />
    );
  }
}

export default Tooltip;
