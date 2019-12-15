import React from 'react';
import { ResponsiveLine } from '@nivo/line';

const CustomSymbol = ({ size, color, borderWidth, borderColor }) => (
  <g>
    <circle
      fill="#fff"
      r={size / 2}
      strokeWidth={borderWidth}
      stroke={borderColor}
    />
    <circle
      r={size / 5}
      strokeWidth={borderWidth}
      stroke={borderColor}
      fill={color}
      fillOpacity={0.35}
    />
  </g>
);

export const TimeLineChart = ({ data }) => {
  const colors = data.map((serie) => serie.color);

  const computeAreaBaseline = (data) => {
    const globalMin = Math.min(
      ...data.map((serie) => Math.min(...serie.data.map((datum) => datum.y)))
    );
    const globalMax = Math.max(
      ...data.map((serie) => Math.max(...serie.data.map((datum) => datum.y)))
    );
    if (globalMin < 0 && globalMax > 0) return 0;
    else if (globalMin < 0 && globalMax < 0) return globalMax;
    else return globalMin;
  };

  return (
    <ResponsiveLine
      data={data}
      colors={colors}
      margin={{ top: 30, right: 30, bottom: 40, left: 60 }}
      xScale={{
        type: 'time',
        format: '%Y-%m-%dT%H:%M:%S.%LZ',
        precision: 'millisecond',
      }}
      xFormat="time:%Y-%m-%d"
      yScale={{
        type: 'linear',
        min: 'auto',
        max: 'auto',
        stacked: false,
        reverse: false,
      }}
      curve="catmullRom"
      axisTop={null}
      axisRight={null}
      axisBottom={{
        format: '%b %d',
        tickValues: 'every 2 minutes',
        legend: 'date',
        legendOffset: -12,
      }}
      axisLeft={{
        orient: 'left',
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: 'count',
        legendOffset: -40,
        legendPosition: 'middle',
      }}
      enableSlices="x"
      sliceTooltip={({ slice }) => {
        return (
          <div
            style={{
              background: 'white',
              padding: '9px 12px',
              borderRadius: 3,
              boxShadow:
                '0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)',
            }}
          >
            {slice.points.map((point) => {
              const serieId =
                point.serieId.charAt(0).toUpperCase() + point.serieId.slice(1);
              return (
                <div
                  key={point.id}
                  style={{
                    color: point.serieColor,
                    padding: '3px 0',
                  }}
                >
                  <div style={{ color: '#333' }}>
                    {point.data.x.toDateString()}
                  </div>
                  <div style={{ color: '#555', fontSize: 12 }}>
                    {point.data.x.toLocaleTimeString('de-DE', {
                      timeStyle: 'medium',
                    })}
                  </div>
                  <strong>{serieId}:</strong> {point.data.yFormatted} CHF
                </div>
              );
            })}
          </div>
        );
      }}
      crosshairType="cross"
      enableArea={true}
      areaBaselineValue={computeAreaBaseline(data)}
      pointSize={10}
      pointBorderWidth={2}
      pointLabel="y"
      pointLabelYOffset={-12}
      lineWidth={4}
      useMesh={true}
      pointSymbol={CustomSymbol}
      pointSize={16}
      pointBorderWidth={1}
      pointBorderColor={{
        from: 'color',
        modifiers: [['darker', 0.3]],
      }}
    />
  );
};

export default TimeLineChart;
