export interface Shift {
  "shiftID": string,
  "shiftName": string,
  "startTime": string,
  "endTime": string,
  "createdOn": string,
  "createdBy": string,
  "updatedOn": string,
  "updatedBy": string,
  "isDelete": boolean
};

// export class OBConstructor implements OccurenceBook {    
//   constructor(           
//      ) { 

//      }}
export const initialShift: Array<Shift> = []