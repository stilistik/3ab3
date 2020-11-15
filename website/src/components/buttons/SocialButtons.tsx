import React from 'react';
import { Event } from 'App/prisma';
import { Icon } from '@iconify/react';
import styles from './SocialButtons.module.css';
import spotifyIcon from '@iconify/icons-mdi/spotify';
import instagramIcon from '@iconify/icons-mdi/instagram';
import facebookIcon from '@iconify/icons-mdi/facebook';
import youtubeIcon from '@iconify/icons-mdi/youtube';
import soundCloudIcon from '@iconify/icons-mdi/soundcloud';
import clx from 'classnames';

interface SocialLinkProps {
  icon: object;
  url?: string;
}

const SocialLink: React.FC<SocialLinkProps> = ({ icon, url }) => {
  if (!url) return null;

  const http_pattern = /^https?:\/{2}\w/i;
  let linkUrl = url;
  if (!url.match(http_pattern)) {
    linkUrl = 'http://' + url;
  }

  return (
    <a
      className={styles.link}
      href={linkUrl}
      target="_blank"
      onClick={(e) => e.stopPropagation()}
    >
      <Icon icon={icon} />
    </a>
  );
};

interface SocialButtonsProps {
  event: Event;
  size: string;
  className?: string;
}

export const SocialButtons: React.FC<SocialButtonsProps> = ({
  event,
  size,
  className,
}) => {
  const cls = clx(styles.social, styles[size], className);
  return (
    <div className={cls}>
      <SocialLink url={event.spotify} icon={spotifyIcon} />
      <SocialLink url={event.soundcloud} icon={soundCloudIcon} />
      <SocialLink url={event.youtube} icon={youtubeIcon} />
      <SocialLink url={event.facebook} icon={facebookIcon} />
      <SocialLink url={event.instagram} icon={instagramIcon} />
    </div>
  );
};
