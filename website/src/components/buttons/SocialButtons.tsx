import React from 'react';
import { Event } from 'App/prisma';
import { Icon } from '@iconify/react';
import styles from './SocialButtons.module.css';
import spotifyIcon from '@iconify/icons-mdi/spotify';
import instagramIcon from '@iconify/icons-mdi/instagram';
import facebookIcon from '@iconify/icons-mdi/facebook';
import youtubeIcon from '@iconify/icons-mdi/youtube';
import soundCloudIcon from '@iconify/icons-mdi/soundcloud';

interface SocialLinkProps {
    icon: object;
    url?: string;
  };

  const SocialLink: React.FC<SocialLinkProps> = ({ icon, url }) => {
    if (!url) return null;
    return (
      <a href={url} target="_blank">
        <Icon icon={icon} />
      </a>
    );
  };

  interface SocialButtonsProps {
    event: Event;
  };

  export const SocialButtons: React.FC<SocialButtonsProps> = ({
    event
  }) => {

    return (
        <div className={styles.social}>
          <SocialLink url={event.spotify} icon={spotifyIcon} />
          <SocialLink url={event.soundcloud} icon={soundCloudIcon} />
          <SocialLink url={event.youtube} icon={youtubeIcon} />
          <SocialLink url={event.facebook} icon={facebookIcon} />
          <SocialLink url={event.instagram} icon={instagramIcon} />
        </div>
    );
  };