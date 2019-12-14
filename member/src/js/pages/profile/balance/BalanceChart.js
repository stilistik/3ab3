import React from 'react';
import { Chart, Geom, Axis, Tooltip } from 'bizcharts';
import { Paper } from '@material-ui/core';

import styles from './BalanceChart.css';

const BalanceChart = ({ data, height, color }) => {
  console.log(data);

  const scale = {
    date: {
      type: 'timeCat',
      formatter: (text) => {
        let date = new Date(parseInt(text));
        let tokens = date.toString().split(' ');
        return `${tokens[2]} ${tokens[1]} ${tokens[3]}`;
      },
    },
  };
  return (
    <Paper className={styles.chart} style={{ height: height }}>
      <Chart
        height={height}
        padding={[30, 40, 40, 40]}
        scale={scale}
        forceFit
        data={data}
      >
        <Axis name="date" />
        <Tooltip inPlot={false} crosshairs={{ type: 'line' }} />
        <Geom
          type="area"
          position="date*balance"
          color={color}
          shape="smooth"
          animate={{
            appear: {
              animation: 'fadeIn',
              duration: 1000,
            },
          }}
        />
        <Geom
          type="line"
          position="date*balance"
          color={color}
          shape="smooth"
          size={3}
          animate={{
            appear: {
              animation: 'clipIn',
              duration: 1000,
            },
          }}
        />
        <Geom
          type="point"
          position="date*balance"
          color={color}
          size={5}
          shape="circle"
        />
      </Chart>
    </Paper>
  );
};

export default BalanceChart;
