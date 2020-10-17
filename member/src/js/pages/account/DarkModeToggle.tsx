import React from 'react';
import { Box } from 'Components/index';
import { Typography, makeStyles } from '@material-ui/core';
import { useThemeContext } from '../../app/theme';
import clx from 'classnames';
import { useTranslation } from 'react-i18next';

const useStyles = makeStyles((theme) => ({
  switch: {
    position: 'relative',
    width: '60px',
    height: '30px',
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: '15px',
    backgroundColor: theme.palette.action.selected,
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
  },
  knob: {
    width: '28px',
    height: '28px',
    borderRadius: '14px',
    backgroundColor: theme.palette.action.active,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '20px',
    transition: 'all 0.4s ease',
  },
  checked: {
    transform: 'translate(30px, 0px)',
  },
  sun: {
    position: 'absolute',
    right: 0,
    padding: '0px 7px',
  },
  moon: {
    position: 'absolute',
    left: 0,
    padding: '0px 7px',
  },
}));

export const DarkModeToggle: React.FC = () => {
  const styles = useStyles();
  const { dark, setDark } = useThemeContext();
  const { t } = useTranslation();

  const handleClick = () => {
    setDark((dark: boolean) => !dark);
  };

  return (
    <Box.Row mb={1} cmrnl={2}>
      <Typography variant="body1">{t('Dark Mode')}</Typography>
      <div className={styles.switch} onClick={handleClick}>
        {dark && <span className={styles.moon}>🌙</span>}
        <div className={clx(styles.knob, { [styles.checked]: dark })} />
        {!dark && <span className={styles.sun}>🌞</span>}
      </div>
    </Box.Row>
  );
};
