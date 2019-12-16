import validator from 'validator';

export class LinkValidator {
  static findLinks = (input) => {
    const urls = input.split(/\s+/).filter((el) => validator.isURL(el));
    const links = [];
    for (let url of urls) {
      const link = this.validateLink(url);
      links.push(link);
    }
    return links;
  };

  static validateLink = (url) => {
    if (!url) return null;
    if (this.isImageLink(url)) return { type: 'IMAGE', url };
    else if (this.isVideoLink(url)) return { type: 'VIDEO', url };
    else if (this.isYoutubeLink(url)) return { type: 'YOUTUBE', url };
    else if (this.isSpotifySong(url)) return { type: 'SPOTIFY', url };
    else return { type: 'UNKNOWN', url };
  };

  static isImageLink = (url) => {
    const img = new Image();
    img.src = url;
    return img.height != 0;
  };

  static isVideoLink = (url) => {
    return url.match(/\.(mp4|mpeg4|avi|wma)$/) != null;
  };

  static isYoutubeLink = (url) => {
    return (
      url.match(/^(http(s)?:\/\/)?((w){3}.)?youtu(be|.be)?(\.com)?\/.+/) != null
    );
  };

  static isSpotifySong = (url) => {
    return (
      url.match(/^(http(s)?:\/\/)?((w){3}.)?open.spotify?(\.com)?\/.+/) != null
    );
  };
}

export default LinkValidator;
