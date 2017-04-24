export interface Status {
  "statusID": string,
  "statusName": string,
  "createdOn": string,
  "createdBy": string,
  "updatedOn": string,
  "updatedBy": string,
  "isDelete": boolean
};

export const initialStatus: Array<Status> = []