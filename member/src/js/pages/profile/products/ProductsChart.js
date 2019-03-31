import React from 'react';
import { Chart, Geom, Axis, Tooltip, Coord, Label } from 'bizcharts';
import { Paper } from '@material-ui/core';
import DataSet from '@antv/data-set';

import styles from './ProductsChart.css';

const HEIGHT = 300;

class ProductsChart extends React.Component {
  render() {
    const { DataView } = DataSet;
    const dv = new DataView();
    dv.source(this.props.data).transform({
      type: 'percent',
      field: 'count',
      dimension: 'product',
      as: 'percent',
    });
    const cols = {
      percent: {
        formatter: (val) => {
          val = val * 100 + '%';
          return val;
        },
      },
    };
    return (
      <Paper className={styles.chart} style={{ height: HEIGHT }}>
        <Chart
          height={HEIGHT}
          data={dv}
          scale={cols}
          padding={[30, 40, 40, 40]}
          forceFit
        >
          <Coord type="theta" radius={0.75} />
          <Axis name="percent" />
          <Tooltip
            showTitle={false}
            itemTpl='<li><span style="background-color:{color};" class="g2-tooltip-marker"></span>{name}: {value}</li>'
          />
          <Geom
            type="intervalStack"
            position="percent"
            color="product"
            tooltip={[
              'product*percent',
              (item, percent) => {
                percent = (percent * 100).toFixed(2) + '%';
                return {
                  name: item,
                  value: percent,
                };
              },
            ]}
            style={{
              lineWidth: 1,
              stroke: '#fff',
            }}
          >
            <Label
              content="percent"
              formatter={(val, item) => {
                return (
                  item.point.product + ': ' + parseInt(val).toFixed(2) + '%'
                );
              }}
            />
          </Geom>
        </Chart>
      </Paper>
    );
  }
}

export default ProductsChart;
