import React from 'react';
import { Event } from 'App/prisma';
import { LazyLoadingImageDiv } from 'Components/image/LazyLoadingImageDiv';
import clx from 'classnames';
import { DynamicGrid } from './DynamicGrid';

import styles from './Archive.module.css';

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
      <button className={styles.closeButton} onClick={handleClose}>
        +
      </button>
      <h1 className={styles.title}>{event.title}</h1>
      <p className={styles.description}>{event.description}</p>
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
    <div className={styles.wrapper}>
      <DynamicGrid columnCount={3} items={items} />
    </div>
  );
};
