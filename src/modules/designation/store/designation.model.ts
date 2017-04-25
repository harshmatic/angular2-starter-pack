export interface Designation {
  "designationID": string,
  "designationName": string,
  "designationCode": string,
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
export const initialDesignation: Array<Designation> = []