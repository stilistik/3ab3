import React from 'react';

import styles from './DragSelect.less';

export const DragSelect = ({ select }) => {
  if (!select) return null;
  return (
    <div
      className={styles.select}
      style={{
        transform: `translate3d(${select.x}px, ${select.y}px, 0px)`,
        width: select.width + 'px',
        height: select.height + 'px',
      }}
    >
      <div className={styles.inner} />
    </div>
  );
};

export default DragSelect;
