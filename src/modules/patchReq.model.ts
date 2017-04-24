export interface Patch {
  op:string;
  path:string;
  value:string;
};

export const initialCounter: Array<Patch> = []