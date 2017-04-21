export const CONTEXT: string = 'OCCURENCEBOOK';

/**
 * COUNTERAction  Interface
 */
interface IOBActions {
    INIT: string;
    INITIALIZED: string;
    INIT_FAILED: string;
    GET_LIST: string;
    GET_LIST_SUCCESS: string;
    ON_FAILED: string;
}

/**
 * COUNTER Actions List
 */
export const OB_ACTIONS: IOBActions = {
    INIT: `${CONTEXT}_INIT`,
    INITIALIZED: `${CONTEXT}_INITIALIZED`,
    INIT_FAILED: `${CONTEXT}_INIT_FAILED`,
    GET_LIST: `${CONTEXT}GET_LIST`,
    GET_LIST_SUCCESS: `${CONTEXT}GET_LIST_SUCCESS`,
    ON_FAILED: `${CONTEXT}_ON_FAILED`,
};