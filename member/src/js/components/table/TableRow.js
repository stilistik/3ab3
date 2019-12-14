import React from 'react';
import classnames from 'classnames';
import TableCell from './TableCell';

import styles from './TableRow.less';

export const TableRow = ({ entry, columns, onRow }) => {
  let rowProps = onRow(entry) || {};
  const cls = classnames(styles.row, {
    [rowProps.className]: rowProps.className && true,
  });

  return (
    <div {...rowProps} className={cls}>
      {columns.map((col) => {
        return (
          <TableCell
            key={entry.key + col.dataIndex}
            value={entry[col.dataIndex]}
            col={col}
          />
        );
      })}
    </div>
  );
};

TableRow.defaultProps = {
  entry: {},
  columns: [],
  onRow: () => {},
};

export default TableRow;
