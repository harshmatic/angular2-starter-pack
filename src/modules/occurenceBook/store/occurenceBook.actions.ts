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
    ADD_SUCCESS:string;
    ADD:string;
    DELETE_SUCCESS:string;
    DELETE:string;
    UPDATE_SUCCESS:string;
    UPDATE:string;
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
    ADD_SUCCESS: `${CONTEXT}ADD_SUCCESS`,
    ADD: `${CONTEXT}ADD`,
    DELETE_SUCCESS: `${CONTEXT} DELETE_SUCCESS`,
    DELETE: `${CONTEXT} DELETE`,
    UPDATE_SUCCESS: `${CONTEXT}UPDATE_SUCCESS`,
    UPDATE: `${CONTEXT}UPDATE`,
    ON_FAILED: `${CONTEXT}_ON_FAILED`
};