export interface OccurenceBook {
  "obid": string,
  "areaID": string,
  "obTypeID": string,
  "departmentID": string,
  "mstStatus": string,
  "statusID": string,
  "obNumber": string,
  "obTime": string,
  "caseFileNumber": string,
  "natureOfOccurrence": string,
  "remark": string,
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
export const initialOccurenceBook: Array<OccurenceBook> = []