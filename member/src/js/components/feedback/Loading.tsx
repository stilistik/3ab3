import React from 'react';
import { useTimeout } from 'Components/utility/Hooks';
import { Box } from '../layout';
import { Icon } from '../icon';
import { RingSpinner } from './Spinners';

interface LoadingProps {
  type: 'absolute' | 'relative';
  size: 'large' | 'small';
  delay: number;
  color?: string;
}

const RelativeLoading: React.FC<LoadingProps> = ({ size, color }) => {
  return (
    <Box.Center role="alert" aria-busy={true} aria-label="loading">
      {size === 'large' ? (
        <RingSpinner color={color} />
      ) : (
        <Icon type="loading" style={{ color: color }} />
      )}
    </Box.Center>
  );
};

const AbsoluteLoading: React.FC<LoadingProps> = ({ size, color }) => {
  return (
    <Box.Center
      h="100vh"
      w="100vw"
      pos="fixed"
      top="0px"
      left="0px"
      role="alert"
      aria-label="loading"
      aria-busy={true}
    >
      {size === 'large' ? (
        <RingSpinner color={color} />
      ) : (
        <Icon type="loading" style={{ color: color }} />
      )}
    </Box.Center>
  );
};

const Loading: React.FC<LoadingProps> & {
  defaultProps: Partial<LoadingProps>;
} = (props) => {
  const [show, setShow] = React.useState(false);

  useTimeout(() => {
    setShow(true);
  }, props.delay);

  if (!show) return null;

  if (props.type === 'absolute') return <AbsoluteLoading {...props} />;
  else return <RelativeLoading {...props} />;
};

Loading.defaultProps = {
  type: 'relative',
  size: 'large',
  delay: 300,
};

export default Loading;
