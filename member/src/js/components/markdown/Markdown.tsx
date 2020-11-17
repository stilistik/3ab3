import { makeStyles } from '@material-ui/core';
import React from 'react';
import { MarkdownParser } from './MarkdownParser';

const useStyles = makeStyles((theme) => ({
  md: {
    '& p': { marginBottom: theme.spacing(2) },
    '& h1': { marginBottom: theme.spacing(2) },
    '& h2': { marginBottom: theme.spacing(2) },
    '& h3': { marginBottom: theme.spacing(2) },
    '& h4': { marginBottom: theme.spacing(2) },
    '& h5': { marginBottom: theme.spacing(2) },
    '& h6': { marginBottom: theme.spacing(2) },
    '& a': {
      color: theme.palette.primary.main,
      textDecoration: 'none',
      '&:hover': { textDecoration: 'underline' },
    },
  },
}));

interface MarkdownProps {
  text: string;
}

export const Markdown: React.FC<MarkdownProps> = ({ text }) => {
  const styles = useStyles();
  const html = MarkdownParser.parse(text);
  return (
    <div className={styles.md} dangerouslySetInnerHTML={{ __html: html }} />
  );
};
