export const CONTEXT: string = 'REPORTS';

/**
 * COUNTERAction  Interface
 */
interface IReportsActions {
    INIT: string;
    INITIALIZED: string;
    INIT_FAILED: string;
    GET_CASE_LIST: string;
    GET_CASE_LIST_SUCCESS: string;
    GET_OFFICER_LIST: string;
    GET_OFFICERS_LIST_SUCCESS: string;
    ON_FAILED: string;

}

/**
 * COUNTER Actions List
 */
export const REPORTS_ACTIONS: IReportsActions = {
    INIT: `${CONTEXT}_INIT`,
    INITIALIZED: `${CONTEXT}_INITIALIZED`,
    INIT_FAILED: `${CONTEXT}_INIT_FAILED`,
    GET_CASE_LIST: `${CONTEXT}GET_LIST`,
    GET_CASE_LIST_SUCCESS: `${CONTEXT}GET_LIST_SUCCESS`,
    GET_OFFICER_LIST: `${CONTEXT}GET_LIST`,
    GET_OFFICERS_LIST_SUCCESS: `${CONTEXT}GET_LIST_SUCCESS`,
    ON_FAILED: `${CONTEXT}_ON_FAILED`
    
};