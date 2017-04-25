export interface Department {
  "departmentID": string,
  "departmentName": string,
  "departmentDespcription": string,
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
export const initialDepartment: Array<Department> = []