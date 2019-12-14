import React from 'react';
import { Icon } from '../icon';
import classnames from 'classnames';

import styles from './TableHeader.less';

export const SortingIcon = ({ sorter, column }) => {
  if (!sorter || sorter.dataIndex !== column.dataIndex)
    return <Icon type="remove" />;
  switch (sorter.order) {
    case 'NONE':
      return <Icon type="remove" />;
    case 'ASC':
      return <Icon type="up" />;
    case 'DESC':
      return <Icon type="down" />;
    default:
      return null;
  }
};

SortingIcon.defaultProps = {
  sorter: null,
  column: {},
};

export const DefaultHeaderCell = ({ column, style }) => {
  return (
    <div className={styles.headercell} style={style}>
      <span>{column.title}</span>
    </div>
  );
};

DefaultHeaderCell.defaultProps = {
  column: {},
};

export const SortableHeaderCell = ({ column, sorter, setSorter, style }) => {
  const MODES = ['ASC', 'DESC', 'NONE'];
  const cls = classnames(styles.headercell, styles.sortable);

  function onClick() {
    let order;
    if (!sorter || sorter.dataIndex !== column.dataIndex) {
      // previously this column was not sorting
      order = MODES[0];
    } else {
      // change of sort mode within same column
      let idx = MODES.indexOf(sorter.order) + 1;
      if (idx >= MODES.length) idx = 0;
      order = MODES[idx];
    }
    setSorter({
      sort: column.sorter,
      order: order,
      dataIndex: column.dataIndex,
    });
  }

  return (
    <div className={cls} style={style} onClick={onClick}>
      <span>{column.title}</span>
      <SortingIcon sorter={sorter} column={column} />
    </div>
  );
};

SortableHeaderCell.defaultProps = {
  column: {},
  sorter: null,
  setSorter: () => {},
};

export const HeaderCell = ({ column, ...rest }) => {
  const style = {};
  if (column.width) {
    style['width'] = column.width;
  } else {
    style['flexBasis'] = 100;
    style['flexGrow'] = 10;
  }

  if (column.sorter) {
    return <SortableHeaderCell column={column} style={style} {...rest} />;
  } else {
    return <DefaultHeaderCell column={column} style={style} {...rest} />;
  }
};

HeaderCell.defaultProps = {
  column: {},
};

export const TableHeader = ({ columns, ...rest }) => {
  return (
    <div className={styles.header}>
      {columns.map((column) => {
        return <HeaderCell key={column.dataIndex} column={column} {...rest} />;
      })}
    </div>
  );
};

TableHeader.defaultProps = {
  columns: [],
};

export default TableHeader;
