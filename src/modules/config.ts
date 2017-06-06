import { RouterModule, Routes } from '@angular/router';
import { OccurenceBookReducer } from './occurenceBook/store/occurenceBook.reducer';
import { DashboardReducer } from './dashboard/store/dashboard.reducer';

import { DepartmentReducer } from './department/store/department.reducer';
import { DesignationReducer } from './designation/store/designation.reducer';
import { ShiftReducer } from './shift/store/shift.reducer';
import { AreaReducer } from './area/store/area.reducer';
import { OccurenceTypeReducer } from './occurenceType/store/occurenceType.reducer';
import { StatusReducer } from './status/store/status.reducer';
import { EmployeeReducer } from './employee/store/employee.reducer';
import { ReportsReducer } from './reports/store/reports.reducer';
import { ActivityReducer } from './activity/store/activity.reducer';


export const routing = [


  { path: 'ob', loadChildren: 'modules/occurenceBook/occurenceBook.module' },
  { path: 'area', loadChildren: 'modules/area/area.module' },
  { path: 'ot', loadChildren: 'modules/occurenceType/occurenceType.module' },
  { path: 'status', loadChildren: 'modules/status/status.module' },
  { path: 'dashboard', loadChildren: 'modules/dashboard/dashboard.module' },
  { path: 'department', loadChildren: 'modules/department/department.module' },
  { path: 'shift', loadChildren: 'modules/shift/shift.module' },
  { path: 'designation', loadChildren: 'modules/designation/designation.module' },
  { path: 'employee', loadChildren: 'modules/employee/employee.module' },
  { path: 'officers', loadChildren: 'modules/officers/officer.module' },
  { path: 'jobs', loadChildren: 'modules/job/job.module' },
  { path: 'reports', loadChildren: 'modules/reports/reports.module' },
  { path: 'map', loadChildren: 'modules/maps/maps.module' },
  { path: 'activity', loadChildren: 'modules/activity/activity.module' },
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: '**', redirectTo: '/not-found', pathMatch: 'full' }

];

export const ApiBase = "http://192.168.101.21:6059/api/";
export const ApiBaseAuthUrl = "auth/token";

export interface RootState {
}
export const Priority = { Critical: "red", Major: "orange", Minor: "blue" };
export const Status = {
  "Open": "statusOpen",
  "Assigned": "statusAssigned",
  "Reviewed": "statusReviewed",
  "In Progress": "statusProgress",
  "In Court": "statusCourt",
  "Completed": "statusClose"
};

export const moduleReducers = {
  occurenceBook: OccurenceBookReducer,
  dashboard: DashboardReducer,

  department: DepartmentReducer,
  designation: DesignationReducer,
  shift: ShiftReducer,
  area: AreaReducer,
  occurenceType: OccurenceTypeReducer,
  status: StatusReducer,
  employee: EmployeeReducer,
  reports: ReportsReducer,
  activity: ActivityReducer


}
