export const CONTEXT: string = 'ACTIVITY';

/**
 * COUNTERAction  Interface
 */
interface IActivityActions {
    INIT: string;
    INITIALIZED: string;
    INIT_FAILED: string;
    GET_LIST: string;
    GET_LIST_SUCCESS: string;
    ON_FAILED: string;
    CLEAR:string;
}

/**
 * COUNTER Actions List
 */
export const ACTIVITY_ACTIONS: IActivityActions = {
    INIT: `${CONTEXT}_INIT`,
    INITIALIZED: `${CONTEXT}_INITIALIZED`,
    INIT_FAILED: `${CONTEXT}_INIT_FAILED`,
    GET_LIST: `${CONTEXT}GET_LIST`,
    GET_LIST_SUCCESS: `${CONTEXT}GET_LIST_SUCCESS`,
    CLEAR: `${CONTEXT}CLEAR`,
    ON_FAILED: `${CONTEXT}_ON_FAILED`
};