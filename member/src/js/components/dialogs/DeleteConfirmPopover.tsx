import React from 'react';
import { Button, makeStyles, Popover, Typography } from '@material-ui/core';
import { Box } from 'Components/index';
import { Trans, useTranslation } from 'react-i18next';

const useStyles = makeStyles((theme) => ({
  content: {
    padding: theme.spacing(2),
    maxWidth: '360px',
  },
}));

export const DeleteConfirmPopover: React.FC = ({ children }) => {
  const childClickHandlerRef = React.useRef(null);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const styles = useStyles();
  const { t } = useTranslation();

  const handleClick = (e: React.MouseEvent) => {
    setAnchorEl(e.currentTarget);
  };

  const handleCancel = () => setAnchorEl(null);

  const handleConfirm = () => {
    if (childClickHandlerRef.current) {
      childClickHandlerRef.current();
    }
    setAnchorEl(null);
  };

  return (
    <React.Fragment>
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          childClickHandlerRef.current = child.props.onClick;
          return React.cloneElement(child, {
            onClick: handleClick,
          });
        }
      })}
      <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={handleCancel}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        <Box className={styles.content}>
          <Typography>
            <Trans i18nKey="deleteConfirmPopoverText">
              Do you really want to delete this?
            </Trans>
          </Typography>
          <Box.Row mt={1}>
            <Button variant="contained" color="primary" onClick={handleConfirm}>
              {t('Delete')}
            </Button>
            <Button onClick={handleCancel}>{t('Cancel')}</Button>
          </Box.Row>
        </Box>
      </Popover>
    </React.Fragment>
  );
};
