import React from 'react';
import { useTransition, animated } from 'react-spring';
import ResizeObserver from 'resize-observer-polyfill';

import styles from './DynamicGrid.module.css';

interface Bounds {
  left: number;
  top: number;
  width: number;
  height: number;
}

const useMeasure = (): [React.MutableRefObject<HTMLDivElement>, Bounds] => {
  const ref = React.useRef<HTMLDivElement>(null);
  const [bounds, set] = React.useState({
    left: 0,
    top: 0,
    width: 0,
    height: 0,
  });
  const [ro] = React.useState(
    () => new ResizeObserver(([entry]) => set(entry.contentRect))
  );
  React.useEffect(() => {
    ro.observe(ref.current);
    return () => ro.disconnect();
  }, []);
  return [ref, bounds];
};

function swapElements<T>(arr: T[], a: number, b: number): T[] {
  if (a === -1 || b === -1) return arr;
  const cpy = arr.slice();
  cpy[a] = arr[b];
  cpy[b] = arr[a];
  return cpy;
}

interface DynamicGridItem {
  id: string;
  height: number;
  fullWidth: boolean;
  component: React.ReactNode;
}

interface DynamicGridProps {
  items: DynamicGridItem[];
  columnCount: number;
}

export const DynamicGrid: React.FC<DynamicGridProps> = ({
  items,
  columnCount,
}) => {
  const [ref, { width }] = useMeasure();

  const { gridItems, containerHeight } = React.useMemo(() => {
    const hasFullWidth = items.some((el) => el.fullWidth);
    const fullWidthIndex = items.findIndex((el) => el.fullWidth);

    const normalHeightIndex = items.findIndex((el) => !el.fullWidth);
    const rowCount = Math.ceil(items.length / columnCount);
    const containerHeight = hasFullWidth
      ? rowCount * items[normalHeightIndex].height +
        items[fullWidthIndex].height +
        50
      : rowCount * items[normalHeightIndex].height + 50;

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

        const columnWidth = item.fullWidth ? width : width / columnCount;
        const xy = [columnWidth * column, currentY];

        // at the end of each row, increment the current y position
        if (hasFullWidth && i === swapIndex) currentY += item.height;
        if (index % columnCount === columnCount - 1) currentY += item.height;

        return { ...item, xy, width: columnWidth };
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
