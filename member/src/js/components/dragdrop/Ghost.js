import React from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import styles from './Ghost.less';

const TRANSITION_CLASSES = {
  drag: {
    enter: styles['drag-enter'],
    enterActive: styles['drag-enter-active'],
  },
  drop: {
    exit: styles['drop-exit'],
    exitActive: styles['drop-exit-active'],
  },
  lose: {
    exit: styles['lose-exit'],
    exitActive: styles['lose-exit-active'],
  },
};

export const GhostContent = ({ count, draggable }) => {
  let content = null;
  if (draggable && draggable.props.getGhost)
    content = draggable.props.getGhost();
  else if (draggable) content = draggable.props.children;

  return (
    <div className={styles.inner}>
      <div className={styles.badge}>
        <span>{count}</span>
      </div>
      {content}
    </div>
  );
};

export class Ghost extends React.Component {
  render() {
    let { position, transition, draggingClass, ...rest } = this.props;
    return (
      <div
        className={styles.ghost}
        style={{
          transform: `translate3d(${position.x}px, ${position.y}px, 0px)`,
        }}
      >
        <div className={draggingClass}>
          <TransitionGroup>
            {this.props.draggable ? (
              <CSSTransition
                classNames={TRANSITION_CLASSES[transition]}
                timeout={{ enter: 200, exit: 200 }}
              >
                <GhostContent {...rest} />
              </CSSTransition>
            ) : null}
          </TransitionGroup>
        </div>
      </div>
    );
  }
}

Ghost.defaultProps = {
  draggingClass: styles['inner-additional'],
  position: { x: 0, y: 0 },
  transition: 'drag',
};

export default Ghost;
