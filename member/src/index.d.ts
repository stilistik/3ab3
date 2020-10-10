/*********************************
 * Webpack DefinePlugin Constants
 *********************************/
declare const __CERTIFIED__: boolean;
declare const __DEPLOYMENT_TARGET__: 'on-prem' | 'cloud';
declare const __USE_COGNITO__: boolean;

/**********
 * Modules
 **********/
declare module 'redux-query-sync' {
  const _a: any;
  export = _a;
}

declare module 'perspective-transform' {
  function PerspT(src: number[], dst: number[]): { coeffs: number[] }
  export = PerspT;
}

declare module 'normalize-wheel' {
  function normalizeWheel(e: WheelEvent): { spinX: number, spinY: number }
  export = normalizeWheel;
}

/****************
 * Utility Types
 ****************/
type PartialRecord<K extends keyof any, T> = {
  [P in K]?: T;
};

type NestedRecord<T> = Record<string, T | { [key: string]: T | NestedRecord<T> }>;

type DeepPartial<T> = {
  [P in keyof T]?: DeepPartial<T[P]>;
};

type Maybe<T> = T | null;

type Opaque<K, T> = T & { __TYPE__: K };

type Uuid = Opaque<"uuid", string>;
type DateISOString = Opaque<"dateISO", string>;
type ColorString = Opaque<'color', string>;