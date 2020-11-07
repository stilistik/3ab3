import React from 'react';
import {
  Hidden,
  IconButton,
  MenuItem,
  Select,
  TableRow,
  Typography,
} from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';

interface TablePaginationProps {
  page: number;
  count: number;
  pageSize: number;
  rowsPerPageOptions: number[];
  onChangePage: (page: number) => void;
  onChangePageSize: (page: number) => void;
  colSpan: number;
}

export const TablePagination: React.FC<TablePaginationProps> = ({
  page,
  count,
  pageSize,
  ...rest
}) => {
  const { t } = useTranslation();

  const handleFirstPageButtonClick = () => {
    rest.onChangePage(0);
  };

  const handleBackButtonClick = () => {
    rest.onChangePage(page - 1);
  };

  const handleNextButtonClick = () => {
    rest.onChangePage(page + 1);
  };

  const handleLastPageButtonClick = () => {
    rest.onChangePage(Math.max(0, Math.ceil(count / pageSize) - 1));
  };

  const handlePageSizeChange = (e: any) => {
    rest.onChangePageSize(e.target.value);
  };

  const pageCount = Math.ceil(count / pageSize) - 1;

  return (
    <TableRow>
      <td colSpan={rest.colSpan}>
        <div
          style={{
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <IconButton
            onClick={handleFirstPageButtonClick}
            disabled={page === 0}
            aria-label="First Page"
          >
            <FirstPageIcon />
          </IconButton>
          <IconButton
            onClick={handleBackButtonClick}
            disabled={page === 0}
            aria-label="Previous Page"
          >
            <KeyboardArrowLeft />
          </IconButton>
          <Typography style={{ margin: '0px 15px' }}>
            {page} | {pageCount}
          </Typography>
          <IconButton
            onClick={handleNextButtonClick}
            disabled={page >= pageCount}
            aria-label="Next Page"
          >
            <KeyboardArrowRight />
          </IconButton>
          <IconButton
            onClick={handleLastPageButtonClick}
            disabled={page >= pageCount}
            aria-label="Last Page"
          >
            <LastPageIcon />
          </IconButton>
          <Hidden xsDown>
            <Typography style={{ marginRight: 10 }}>
              {t('Per page')}:
            </Typography>
            <Select onChange={handlePageSizeChange} value={pageSize}>
              {rest.rowsPerPageOptions.map((value: number) => (
                <MenuItem key={value} value={value}>
                  {value}
                </MenuItem>
              ))}
            </Select>
          </Hidden>
        </div>
      </td>
    </TableRow>
  );
};
