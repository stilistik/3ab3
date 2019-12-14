import React from 'react';
import { Button, ButtonGroup } from '@material-ui/core';
import { Icon } from '../icon';

import styles from './Pagination.less';

const CurrentPage = ({ page }) => {
  return <div className={styles.currentPage}>{page}</div>;
};

const HasMoreAfter = ({ show }) => {
  if (!show) return null;
  else return <div className={styles.hasMoreAfter}>. . .</div>;
};

export const Pagination = ({
  page,
  onChangePage,
  totalPages,
  quickButtonCount,
}) => {
  const onPrev = () => {
    const newPage = clamp(page - 1);
    onChangePage(newPage);
  };

  const onNext = () => {
    const newPage = clamp(page + 1);
    onChangePage(newPage);
  };

  const onFirst = () => {
    onChangePage(0);
  };

  const onLast = () => {
    onChangePage(totalPages - 1);
  };

  const clamp = (newPage) => {
    if (!totalPages) return 0;
    else if (newPage >= totalPages - 1) return totalPages - 1;
    else if (newPage < 0) return 0;
    else return newPage;
  };

  const generateQuickButtons = () => {
    const nextPages = [];
    const prevPages = [];
    for (let i = page + 1; i < page + quickButtonCount + 1; ++i)
      if (i < totalPages) nextPages.push(i);
    for (let i = page - quickButtonCount; i < page; ++i)
      if (i >= 0) prevPages.push(i);
    const hasMoreAfter = totalPages > page + quickButtonCount + 1;
    return { prevPages, nextPages, hasMoreAfter };
  };

  if (totalPages <= 1) return null;
  const hasNext = page < totalPages - 1;
  const hasPrev = page > 0;
  const { prevPages, nextPages, hasMoreAfter } = generateQuickButtons();

  return (
    <div className={styles.pagination}>
      <ButtonGroup
        classes={{ grouped: styles.grouped, disabled: styles.disabled }}
      >
        <Button
          variant="outlined"
          data-testid="first"
          classes={{ disabled: styles.disabled }}
          className={styles.btn}
          onClick={onFirst}
          disabled={!hasPrev}
        >
          <Icon type="firstPage" /> First
        </Button>
        <Button
          variant="outlined"
          data-testid="prev"
          classes={{ disabled: styles.disabled }}
          className={styles.btn}
          onClick={onPrev}
          disabled={!hasPrev}
        >
          <Icon type="left" />
        </Button>
        {prevPages.map((page) => {
          return (
            <Button
              key={'prev-' + page}
              data-testid={'prev-' + page}
              variant="outlined"
              className={styles.btn}
              onClick={() => onChangePage(page)}
            >
              {page + 1}
            </Button>
          );
        })}
        <CurrentPage page={page + 1} />
        {nextPages.map((page) => {
          return (
            <Button
              key={'next-' + page}
              data-testid={'next-' + page}
              variant="outlined"
              className={styles.btn}
              onClick={() => onChangePage(page)}
            >
              {page + 1}
            </Button>
          );
        })}
        <HasMoreAfter show={hasMoreAfter} />
        <Button
          variant="outlined"
          data-testid="next"
          classes={{ disabled: styles.disabled }}
          className={styles.btn}
          onClick={onNext}
          disabled={!hasNext}
        >
          <Icon type="right" />
        </Button>
        <Button
          variant="outlined"
          data-testid="last"
          classes={{ disabled: styles.disabled }}
          className={styles.btn}
          onClick={onLast}
          disabled={!hasNext}
        >
          <Icon type="lastPage" /> Last
        </Button>
      </ButtonGroup>
    </div>
  );
};

Pagination.defaultProps = {
  quickButtonCount: 5,
};

export default Pagination;
