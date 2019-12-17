import React from 'react';
import { ResponsivePie } from '@nivo/pie';

export const PercentagePieChart = ({ data }) => (
  <ResponsivePie
    data={data}
    margin={{ top: 50, right: 50, bottom: 50, left: 50 }}
    innerRadius={0.5}
    padAngle={1}
    cornerRadius={3}
    colors={{ scheme: 'spectral' }}
    borderWidth={1}
    borderColor={{ from: 'color', modifiers: [['darker', 0.2]] }}
    radialLabelsSkipAngle={10}
    radialLabelsTextXOffset={6}
    radialLabelsTextColor="#333333"
    radialLabelsLinkOffset={0}
    radialLabelsLinkDiagonalLength={8}
    radialLabelsLinkHorizontalLength={12}
    radialLabelsLinkStrokeWidth={1}
    radialLabelsLinkColor={{ from: 'color' }}
    slicesLabelsSkipAngle={10}
    slicesLabelsTextColor="#333333"
    animate={true}
    motionStiffness={90}
    motionDamping={15}
    tooltip={({ label, value, color }) => {
      return (
        <div style={{ color: color }}>
          <strong>{label}:</strong> {value}
        </div>
      );
    }}
  />
);

export default PercentagePieChart;
