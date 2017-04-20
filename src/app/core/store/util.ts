import { Action } from '@ngrx/store';

let typeCache: { [label: string]: boolean } = {};

export function type<T>(label: T | ''): T {
  if (typeCache[<string>label]) {
    throw new Error(`Action type "${label}" is not unique"`);
  }

  typeCache[<string>label] = true;

  return <T>label;
}

let typeForCache: { [slice: string]: { [action: string]: string } } = {};

export function typeFor(slice, action) {
  if (typeForCache[slice] && typeForCache[slice][action]) {
    return typeForCache[slice][action];
  } else {
    typeForCache[slice] = typeForCache[slice] || {};
    typeForCache[slice][action] = `[${slice}] ${action}`;
    type(typeForCache[slice][action]);
    return typeForCache[slice][action]
  }
}


export const slices = {
  SESSION: 'session'
}
