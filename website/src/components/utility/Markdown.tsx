import React from 'react';
import { MarkdownParser } from './MarkdownParser';

import styles from './Markdown.module.css';

interface MarkdownProps {
  text: string;
}

export const Markdown: React.FC<MarkdownProps> = ({ text }) => {
  const html = MarkdownParser.parse(text);
  return (
    <div className={styles.md} dangerouslySetInnerHTML={{ __html: html }} />
  );
};
