import React from 'react';
import { Box } from './Box';
import { useObserveResize } from 'General/Hooks';

export const LayoutContext = React.createContext({});

export const useLayout = () => React.useContext(LayoutContext);

export function withLayout(WrappedComponent) {
  return class LayoutConsumer extends React.Component {
    render() {
      return (
        <LayoutContext.Consumer>
          {(value) => {
            if (!value) return null;
            return <WrappedComponent {...this.props} layout={value} />;
          }}
        </LayoutContext.Consumer>
      );
    }
  };
}

export const LayoutBox = ({ children, ...rest }) => {
  const layout = useLayout();
  if (!layout) return null;
  const size = layout.boxSize + 'px';
  const margin = layout.margin + 'px';
  return (
    <Box width={size} height={size} m={margin} {...rest}>
      {children}
    </Box>
  );
};

export const LayoutProvider = ({
  size,
  padding,
  margin,
  children,
  ...rest
}) => {
  const container = React.useRef(null);
  const [layout, setLayout] = React.useState(null);

  const computeLayout = () => {
    const { clientWidth: width, clientHeight: height } = container.current;

    // get maximum box count per row according to minimum size prop
    let maxc = Math.max(Math.floor(width / (size.min + 2 * margin)), 1);

    // compute box size, maximum according to size prop
    let s = Math.min((width - 2 * padding) / maxc - 2 * margin, size.max);

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

LayoutProvider.defaultProps = {
  size: {
    max: 300,
    min: 200,
  },
  margin: 8,
  padding: 8,
};

export default LayoutProvider;
