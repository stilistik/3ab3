import React from 'react';
import { ResponsiveCalendar } from '@nivo/calendar';

export const GridChart = ({ data }) => (
  <ResponsiveCalendar
    data={data}
    from="2016-01-01"
    to="2016-07-12"
    emptyColor="#eeeeee"
    colors={['#61cdbb', '#97e3d5', '#e8c1a0', '#f47560']}
    margin={{ top: 40, right: 40, bottom: 40, left: 40 }}
    monthBorderColor="#ffffff"
    dayBorderWidth={2}
    dayBorderColor="#ffffff"
  />
);