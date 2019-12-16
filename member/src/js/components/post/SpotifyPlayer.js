import React from 'react';

export const SpotifyPlayer = ({ url }) => {
  const token = url.split('/');
  const trackId = token.pop();
  const type = token.pop();

  return (
    <iframe
      src={`https://open.spotify.com/embed/${type}/${trackId}`}
      width="100%"
      height="380"
      frameBorder="0"
      allowtransparency="true"
      allow="encrypted-media"
    />
  );
};

export default SpotifyPlayer;
