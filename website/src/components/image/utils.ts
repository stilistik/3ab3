import { getBackendUrl } from 'App/network';

export function getResponsiveSrc(src: string, containerWidth: number) {
  function getImageSizeString(src: string, containerWidth: number) {
    if (src.includes('.gif')) return '';
    else {
      const desiredImgWidth = Math.ceil(containerWidth / 100) * 100;
      return `@${desiredImgWidth}`;
    }
  }

  return getBackendUrl() + src + getImageSizeString(src, containerWidth);
}
