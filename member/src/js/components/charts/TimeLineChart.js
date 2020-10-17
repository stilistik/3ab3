import React from 'react';
import { ResponsiveLine } from '@nivo/line';
import { useTheme } from '@material-ui/core';

const CustomSymbol = ({ size, color, borderWidth, borderColor }) => {
  const theme = useTheme();
  return (
    <g>
      <circle
        fill={theme.palette.background.paper}
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
};

export const TimeLineChart = ({ data }) => {
  const theme = useTheme();
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
      colors={{ datum: 'color' }}
      margin={{ top: 30, right: 50, bottom: 40, left: 60 }}
      xScale={{
        type: 'linear',
        min: 'auto',
        max: 'auto',
        stacked: false,
        reverse: false,
      }}
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
        format: (value) => {
          const datum = data[0].data.find((el) => el.x === value);
          if (datum)
            return new Date(datum.date).toLocaleDateString('de-DE', {
              dateStyle: 'medium',
            });
        },
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
      }}
      axisLeft={{
        orient: 'left',
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: 'CHF',
        legendOffset: 10,
        legendPosition: 'end',
        legendOrientation: 'horizontal',
      }}
      theme={{
        textColor: theme.palette.text.primary,
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
              const date = new Date(point.data.date);
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
                  <div style={{ color: '#333' }}>{date.toDateString()}</div>
                  <div style={{ color: '#555', fontSize: 12 }}>
                    {date.toLocaleTimeString('de-DE', {
                      timeStyle: 'medium',
                    })}
                  </div>
                  <strong>{serieId}:</strong> {point.data.yFormatted.toFixed(2)}{' '}
                  CHF
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
