import React from 'react';
import clx from 'classnames';
import styles from './Container.module.css';

interface ContainerProps {
  className?: string;
}

export const Container: React.FC<ContainerProps> = ({
  className,
  children,
}) => {
  return <div className={clx(styles.container, className)}>{children}</div>;
};
