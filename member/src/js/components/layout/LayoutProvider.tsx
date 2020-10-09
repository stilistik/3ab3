import React from 'react';
import { useObserveResize } from '../utility/Hooks';
import { LayoutContext } from './LayoutContext';
import { Box } from './Box';

interface LayoutProviderProps {
  size?: { min: number; max: number };
  padding?: number;
  margin?: number;
}

export const LayoutProvider: React.FC<LayoutProviderProps> = ({
  size = { max: 300, min: 200 },
  padding = 8,
  margin = 8,
  children,
  ...rest
}) => {
  const container = React.useRef(null);
  const [layout, setLayout] = React.useState(null);

  const computeLayout = () => {
    const { clientWidth: width } = container.current;

    // get maximum box count per row according to minimum size prop
    const maxBoxCountPerRow = Math.max(Math.floor(width / (size.min + 2 * margin)), 1);

    // compute box size, maximum according to size prop
    const s = Math.min((width - 2 * padding) / maxBoxCountPerRow - 2 * margin, size.max);

    // compute actual box count per row
    const bpr = Math.floor(width / (s + 2 * margin));

    setLayout({
      boxSize: s,
      margin: margin,
      boxesPerRow: bpr,
      containerWidth: width,
    });
  };

  const onResize = () => computeLayout();
  useObserveResize(container, onResize);

  React.useLayoutEffect(() => {
    computeLayout();
  }, []);

  return (
    <Box.Fill ref={container} p={padding + 'px'} {...rest}>
      <LayoutContext.Provider value={layout}>{children}</LayoutContext.Provider>
    </Box.Fill>
  );
};

export default LayoutProvider;
