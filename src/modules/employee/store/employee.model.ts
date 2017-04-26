export interface Employee {
  "employeeID": string,
  "firstName": string,
  "lastName": string,
  "employeeCode": string,
  "dateofBirth": string,
  "gender": string,
  "mobile": string,
  "email": string,
  "residencePhone1": string,
  "organizationJoiningDate": string,
  "serviceJoiningDate": string,
  "address1": string,
  "address2": string,
  "areaID": string,
  "departmentID": string,
  "designationID": string,
  "shiftID": string,
  "userID": string,
  "createdOn": string,
  "createdBy": string,
  "updatedOn": string,
  "updatedBy": string,
  "isDelete": boolean
};

// export class OBConstructor implements OccurenceBook {    
//   constructor(           npm 
//      ) { 

//      }}
export const initialEmployee: Array<Employee> = []