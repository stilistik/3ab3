import React from 'react';
import { Event } from 'App/prisma';
import { LazyLoadingImageDiv } from 'Components/image/LazyLoadingImageDiv';
import { CloseButton } from 'Components/buttons';
import { SocialButtons } from 'Components/buttons';
import { DynamicGrid } from './DynamicGrid';
import clx from 'classnames';

import styles from './Archive.module.css';
import { Container, useMedia } from 'Components/utility';


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
      <h2 className={styles.title}>{event.title}</h2>
      <p className={styles.description}>{event.description}</p>
      <SocialButtons event={event} />
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
      <div className={styles.image}>
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
  const columns = useMedia(
    ['(max-width: 960px)', '(max-width: 1280px)'],
    [1, 2],
    3
  );

  const expandedHeight = columns > 2 ? 800 : 1000;

  const items = React.useMemo(() => {
    return events.map((event) => {
      const isSelected = selected === event.id;
      return {
        id: event.id,
        selected: isSelected,
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
      <DynamicGrid
        columnCount={columns}
        items={items}
        rowHeight={500}
        expandedRowHeight={expandedHeight}
      />
    </Container>
  );
};
