import React from 'react';
import { Event } from 'App/prisma';
import { LazyLoadingImageDiv } from 'Components/image/LazyLoadingImageDiv';
import { CloseButton } from 'Components/buttons';
import { DynamicGrid } from './DynamicGrid';
import { Icon } from '@iconify/react';
import spotifyIcon from '@iconify/icons-mdi/spotify';
import instagramIcon from '@iconify/icons-mdi/instagram';
import facebookIcon from '@iconify/icons-mdi/facebook';
import youtubeIcon from '@iconify/icons-mdi/youtube';
import soundCloudIcon from '@iconify/icons-mdi/soundcloud';
import clx from 'classnames';

import styles from './Archive.module.css';
import { Container, useMedia } from 'Components/utility';

interface SocialLinkProps {
  icon: object;
  url?: string;
}

const SocialLink: React.FC<SocialLinkProps> = ({ icon, url }) => {
  if (!url) return null;
  return (
    <a href={url} target="_blank">
      <Icon icon={icon} />
    </a>
  );
};

interface ArchiveItemDetailsProps {
  event: Event;
  onClick: (eventId: string) => void;
}

const ArchiveItemDetails: React.FC<ArchiveItemDetailsProps> = ({
  event,
  onClick,
}) => {
  const handleClose = () => onClick(null);

  return (
    <div className={styles.details}>
      <div className="absolute top-0 right-0 mt-1 mr-1">
        <CloseButton onClick={handleClose} />
      </div>
      <h1 className={styles.title}>{event.title}</h1>
      <p className={styles.description}>{event.description}</p>
      <div className={styles.social}>
        <SocialLink url={event.spotify} icon={spotifyIcon} />
        <SocialLink url={event.soundcloud} icon={soundCloudIcon} />
        <SocialLink url={event.youtube} icon={youtubeIcon} />
        <SocialLink url={event.facebook} icon={facebookIcon} />
        <SocialLink url={event.instagram} icon={instagramIcon} />
      </div>
    </div>
  );
};

interface ArchiveItemProps {
  event: Event;
  onClick: (eventId: string) => void;
  expanded: boolean;
}

const ArchiveItem: React.FC<ArchiveItemProps> = ({
  event,
  onClick,
  expanded,
}) => {
  const handleClick = () => onClick(event.id);

  const cls = clx(styles.archiveItem, 'shadow-2xl', {
    [styles.expanded]: expanded,
  });

  return (
    <div className={cls}>
      <div className="overflow-hidden w-full h-full">
        <LazyLoadingImageDiv
          src={event.image}
          className="w-full h-full"
          onClick={handleClick}
          width={1200}
        />
      </div>
      {expanded && <ArchiveItemDetails event={event} onClick={onClick} />}
    </div>
  );
};

interface ArchiveProps {
  events: Event[];
}

export const Archive: React.FC<ArchiveProps> = ({ events }) => {
  const [selected, setSelected] = React.useState<string>(null);
  const handleClick = (eventId: string) => setSelected(eventId);
  const columns = useMedia(['(max-width: 960px)', '(max-width: 1280px)'], [1, 2], 3);

  const items = React.useMemo(() => {
    return events.map((event) => {
      const isSelected = selected === event.id;
      return {
        id: event.id,
        height: isSelected ? 800 : 500,
        fullWidth: isSelected,
        component: (
          <ArchiveItem
            event={event}
            onClick={handleClick}
            expanded={isSelected}
          />
        ),
      };
    });
  }, [selected]);

  return (
    <Container>
      <DynamicGrid columnCount={columns} items={items} />
    </Container>
  );
};
