import React from 'react';
import { Secret } from 'Graphql/types';
import { useTranslation } from 'react-i18next';
import { Card, CardActions, CardContent, Typography } from '@material-ui/core';
import { EditSecret } from './EditSecret';
import { DeleteSecret } from './DeleteSecret';

interface SecretItemProps {
  secret: Secret;
}

export const SecretItem: React.FC<SecretItemProps> = ({ secret }) => {
  const { t } = useTranslation();
  return (
    <Card>
      <CardContent>
        <Typography gutterBottom variant="h5">
          {secret.title}
        </Typography>
        <Typography variant="body2">{t('Front')}:</Typography>
        <div dangerouslySetInnerHTML={{ __html: secret.front }} />
        <Typography variant="body2">{t('Back')}:</Typography>
        <div dangerouslySetInnerHTML={{ __html: secret.back }} />
      </CardContent>
      <CardActions>
        <EditSecret secret={secret} />
        <DeleteSecret secret={secret} />
      </CardActions>
    </Card>
  );
};
