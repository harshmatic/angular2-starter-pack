export const CONTEXT: string = 'EMPLOYEE';

/**
 * COUNTERAction  Interface
 */
interface IEMPLOYEEActions {
    INIT: string;
    INITIALIZED: string;
    INIT_FAILED: string;
    GET_LIST: string;
    GET_LIST_SUCCESS: string;
    GET_LIST_BY_DEPT: string;
    GET_LIST_BY_DEPT_SUCCESS: string;
    ON_FAILED: string;
    ADD_SUCCESS:string;
    ADD:string;
    DELETE_SUCCESS:string;
    DELETE:string;
    UPDATE_SUCCESS:string;
    UPDATE:string;
    GET_LIST_BY_PAGE:string;
    GET_LIST_BY_PAGE_SUCCESS:string;
}

/**
 * COUNTER Actions List
 */
export const EMPLOYEE_ACTIONS: IEMPLOYEEActions = {
    INIT: `${CONTEXT}_INIT`,
    INITIALIZED: `${CONTEXT}_INITIALIZED`,
    INIT_FAILED: `${CONTEXT}_INIT_FAILED`,
    GET_LIST: `${CONTEXT}GET_LIST`,
    GET_LIST_SUCCESS: `${CONTEXT}GET_LIST_SUCCESS`,
    GET_LIST_BY_DEPT: `${CONTEXT}GET_LIST_BY_DEPT`,
    GET_LIST_BY_DEPT_SUCCESS: `${CONTEXT}GET_LIST_BY_DEPT_SUCCESS`,
    ADD_SUCCESS: `${CONTEXT}ADD_SUCCESS`,
    ADD: `${CONTEXT}ADD`,
    DELETE_SUCCESS: `${CONTEXT} DELETE_SUCCESS`,
    DELETE: `${CONTEXT} DELETE`,
    UPDATE_SUCCESS: `${CONTEXT}UPDATE_SUCCESS`,
    UPDATE: `${CONTEXT}UPDATE`,
    ON_FAILED: `${CONTEXT}_ON_FAILED`,
    GET_LIST_BY_PAGE_SUCCESS: `${CONTEXT}_GET_LIST_BY_PAGE_SUCCESS`,
    GET_LIST_BY_PAGE: `${CONTEXT}_GET_LIST_BY_PAGE`,
};