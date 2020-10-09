import React from 'react';
import { useLayout } from './LayoutContext';
import { Box } from './Box';
import { LayoutBox } from './LayoutBox';

interface LayoutGridProps {
  items: React.ReactNode[];
}

export const LayoutGrid: React.FC<LayoutGridProps> = ({ items }) => {
  const layout = useLayout();
  if (!layout) return null;

  const createRows = () => {
    const rows = [];
    const boxes = items.map((item, index) => <LayoutBox key={index}>{item}</LayoutBox>);
    const rowCount = Math.ceil(boxes.length / layout.boxesPerRow);
    for (let i = 0; i < rowCount; ++i) {
      const set = boxes.slice(i * layout.boxesPerRow, i * layout.boxesPerRow + layout.boxesPerRow);
      rows.push(
        <Box d="flex" fw="nowrap" key={i}>
          {set}
        </Box>
      );
    }
    return rows;
  };

  return <React.Fragment>{createRows()}</React.Fragment>;
};
