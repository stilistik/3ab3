import validator from 'validator';

export class LinkValidator {
  static findLinks = (input) => {
    const urls = input.split(/\s+/).filter((el) => validator.isURL(el));
    const links = [];
    for (let url of urls) {
      if (this.isImageLink(url)) links.push({ type: 'IMAGE', url });
      else if (this.isVideoLink(url)) links.push({ type: 'VIDEO', url });
      else if (this.isYoutubeLink(url)) links.push({ type: 'YOUTUBE', url });
    }
    return links;
  };

  static validateLink = (url) => {
    if (!url) return null;
    if (this.isImageLink(url)) return { type: 'IMAGE', url };
    else if (this.isVideoLink(url)) return { type: 'VIDEO', url };
    else if (this.isYoutubeLink(url)) return { type: 'YOUTUBE', url };
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
}

export default LinkValidator;
