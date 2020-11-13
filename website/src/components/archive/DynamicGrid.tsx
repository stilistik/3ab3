import React from 'react';
import { useTransition, animated } from 'react-spring';
import { useMeasure } from 'Components/utility';

import styles from './DynamicGrid.module.css';

function swapElements<T>(arr: T[], a: number, b: number): T[] {
  if (a === -1 || b === -1) return arr;
  const cpy = arr.slice();
  cpy[a] = arr[b];
  cpy[b] = arr[a];
  return cpy;
}

interface DynamicGridItem {
  id: string;
  selected: boolean;
  component: React.ReactNode;
}

interface DynamicGridProps {
  items: DynamicGridItem[];
  columnCount: number;
  rowHeight: number;
  expandedRowHeight: number;
}

export const DynamicGrid: React.FC<DynamicGridProps> = ({
  items,
  columnCount,
  rowHeight,
  expandedRowHeight,
}) => {
  const [ref, { width }] = useMeasure();

  const { gridItems, containerHeight } = React.useMemo(() => {
    const hasFullWidth = items.some((el) => el.selected);
    const fullWidthIndex = items.findIndex((el) => el.selected);

    const rowCount = Math.ceil(items.length / columnCount);
    const containerHeight = (rowCount - 1) * rowHeight + expandedRowHeight + 50;

    const swapIndex = Math.max(
      0,
      fullWidthIndex - (fullWidthIndex % columnCount)
    );

    const sortedItems = swapElements(items, swapIndex, fullWidthIndex);

    let currentY = 0;
    return {
      gridItems: sortedItems.map((item, i) => {
        const index = hasFullWidth
          ? i > swapIndex
            ? i + columnCount - 1
            : i
          : i;

        const column = index % columnCount;

        const columnWidth = item.selected ? width : width / columnCount;
        const xy = [columnWidth * column, currentY];

        // at the end of each row, increment the current y position
        if (hasFullWidth && item.selected) currentY += expandedRowHeight;
        else if (index % columnCount === columnCount - 1) currentY += rowHeight;

        return {
          ...item,
          xy,
          height: item.selected ? expandedRowHeight : rowHeight,
          width: columnWidth,
        };
      }),
      containerHeight,
    };
  }, [columnCount, items, width]);

  const transitions = useTransition(gridItems, (item) => item.id, {
    from: ({ xy, width, height }) => ({ xy, width, height, opacity: 0 }),
    enter: ({ xy, width, height }) => ({ xy, width, height, opacity: 1 }),
    update: ({ xy, width, height }) => ({ xy, width, height }),
    leave: { height: 0, opacity: 0 },
    config: { mass: 5, tension: 500, friction: 100 },
    trail: 25,
  });

  return (
    <div ref={ref} className={styles.list} style={{ height: containerHeight }}>
      {transitions.map(({ item, props, key }) => {
        const { xy, ...rest } = props as any;
        return (
          <animated.div
            key={key}
            style={{
              transform: xy.interpolate(
                (x: number, y: number) => `translate3d(${x}px,${y}px,0)`
              ),
              ...rest,
            }}
          >
            {item.component}
          </animated.div>
        );
      })}
    </div>
  );
};
