import React from 'react';
import TableHeader from './TableHeader';
import TableBody from './TableBody';
import { Pagination } from '../pagination';

import styles from './Table.less';

export class Table extends React.Component {
  constructor(props) {
    super(props);
    this.state = { sorter: null };
  }

  setSorter = (sorter) => {
    this.setState({ sorter });
  };

  render() {
    const { pagination, data, ...rest } = this.props;
    const { sorter } = this.state;

    let dataSource;
    if (sorter) {
      dataSource = data.sort((a, b) => {
        if (sorter.order === 'ASC') return sorter.sort(a, b);
        if (sorter.order === 'DESC') return -sorter.sort(a, b);
        else return 0;
      });
    } else dataSource = data;

    return (
      <div className={styles.table}>
        <div className={styles.header}>
          <TableHeader sorter={sorter} setSorter={this.setSorter} {...rest} />
        </div>
        <div className={styles.body}>
          <TableBody data={dataSource} {...rest} />
        </div>
        {pagination && pagination.totalPages > 1 ? (
          <div className={styles.footer}>
            <Pagination {...pagination} quickButtonCount={2} />
          </div>
        ) : null}
      </div>
    );
  }
}

export default Table;
