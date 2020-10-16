import React from 'react';
import Comment from './Comment';
import { Button } from '@material-ui/core';
import { useTranslation } from 'react-i18next';

import styles from './CommentList.css';

const CommentList = ({ comments, hasNext, more, cursor }) => {
  const { t } = useTranslation();
  if (!comments) return null;
  return (
    <div className={styles.list}>
      {comments.map((comment) => {
        return <Comment key={comment.id} comment={comment} />;
      })}
      {hasNext ? (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Button size="small" onClick={() => more(cursor)}>
            {t('More')}
          </Button>
        </div>
      ) : null}
    </div>
  );
};

export default CommentList;
