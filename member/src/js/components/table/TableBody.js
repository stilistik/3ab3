import React from 'react';
import { Loading } from '../state';
import TableRow from './TableRow';

import styles from './TableBody.less';

export const TableBody = ({ data, fetching, ...rest }) => {
  if (fetching) return <Loading />;
  else
    return (
      <div className={styles.body}>
        {data.map((entry) => {
          return <TableRow key={entry.key} entry={entry} {...rest} />;
        })}
      </div>
    );
};

TableBody.defaultProps = {
  data: [],
  fetching: false,
};

export default TableBody;
