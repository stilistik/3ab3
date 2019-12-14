import React from 'react';

import styles from './TableCell.less';

export const TableCell = ({ value, col }) => {
  const style = {};
  if (col.width) {
    style['width'] = col.width;
  } else {
    style['flexBasis'] = 100;
    style['flexGrow'] = 10;
  }

  return (
    <div className={styles.cell} style={style}>
      {col.render ? col.render(value) : value}
    </div>
  );
};

TableCell.defaultProps = {
  col: { width: 'auto ' },
  value: '',
};

export default TableCell;
