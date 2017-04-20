export const CONTEXT: string = 'EMPLOYEE';

/**
 * COUNTERAction  Interface
 */
interface IEmployeeActions {
    INIT: string;
    INITIALIZED: string;
    INIT_FAILED: string;
    GET_EMPLOYEE_LIST: string;
    GET_EMPLOYEE_SUCCESS: string;
    ADD_EMPLOYEE: string;
    ADD_EMPLOYEE_SUCCESS: string;
    ON_FAILED: string;
}

/**
 * COUNTER Actions List
 */
export const EMPLOYEE_ACTIONS: IEmployeeActions = {
    INIT: `${CONTEXT}_INIT`,
    INITIALIZED: `${CONTEXT}_INITIALIZED`,
    INIT_FAILED: `${CONTEXT}_INIT_FAILED`,
    GET_EMPLOYEE_LIST: `${CONTEXT}_GET_EMPLOYEE_LIST`,
    GET_EMPLOYEE_SUCCESS: `${CONTEXT}_GET_EMPLOYEE_SUCCESS`,
    ADD_EMPLOYEE: `${CONTEXT}_ADD_EMPLOYEE`,
    ADD_EMPLOYEE_SUCCESS: `${CONTEXT}_ADD_EMPLOYEE_SUCCESS`,
    ON_FAILED: `${CONTEXT}_ON_FAILED`,
};