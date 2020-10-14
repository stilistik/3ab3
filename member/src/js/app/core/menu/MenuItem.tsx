import React from 'react';
import {
  ListItem,
  ListItemIcon,
  ListItemText,
  makeStyles,
} from '@material-ui/core';
import { Icon } from 'Components/index';

const useStyles = makeStyles({
  text: {
    color: '#eee',
  },
});

interface MenuItemProps {
  text: string;
  icon: string;
  onClick: (event: React.MouseEvent) => void;
}

export const MenuItem: React.FC<MenuItemProps> = ({ text, icon, onClick }) => {
  const styles = useStyles();
  return (
    <ListItem button key={text} onClick={onClick}>
      <ListItemIcon classes={{ root: styles.text }}>
        <Icon type={icon} />
      </ListItemIcon>
      <ListItemText classes={{ primary: styles.text }} primary={text} />
    </ListItem>
  );
};
