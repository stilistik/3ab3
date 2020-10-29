declare module "*.css" {
  interface IClassNames {
    [className: string]: string;
  }
  const classNames: IClassNames;
  export = classNames;
}

declare const __GOOGLE_MAPS_API_KEY__: string;
declare const __API_HOST__: string;
declare const __API_PORT__: string;
declare const __RECAPTCHA_PUBLIC_KEY__: string;