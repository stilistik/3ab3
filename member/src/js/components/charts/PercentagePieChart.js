import React from 'react';
import { ResponsivePie } from '@nivo/pie';
import { useTheme } from '@material-ui/core';

export const PercentagePieChart = ({ data }) => {
  const theme = useTheme();
  return (
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
      radialLabelsTextColor={theme.palette.text.primary}
      radialLabelsLinkOffset={0}
      radialLabelsLinkDiagonalLength={8}
      radialLabelsLinkHorizontalLength={12}
      radialLabelsLinkStrokeWidth={1}
      radialLabelsLinkColor={{ from: 'color' }}
      slicesLabelsSkipAngle={10}
      slicesLabelsTextColor={theme.palette.text.primary}
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
};

export default PercentagePieChart;
