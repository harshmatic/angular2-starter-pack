export const CONTEXT: string = 'ROLE';

/**
 * USERAction  Interface
 */
interface IRoleActions {
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
    GET: string;
    GET_SUCCESS: string;
}

/**
 * User Actions List
 */
export const ROLE_ACTIONS: IRoleActions = {
    INIT: `${CONTEXT}_INIT`,
    INITIALIZED: `${CONTEXT}_INITIALIZED`,
    INIT_FAILED: `${CONTEXT}_INIT_FAILED`,
    GET_LIST: `${CONTEXT}GET_LIST`,
    GET_LIST_SUCCESS: `${CONTEXT}GET_LIST_SUCCESS`,
    ADD_SUCCESS: `${CONTEXT}ADD_SUCCESS`,
    ADD: `${CONTEXT}ADD`,
    DELETE_SUCCESS: `${CONTEXT}DELETE_SUCCESS`,
    DELETE: `${CONTEXT}DELETE`,
    UPDATE_SUCCESS: `${CONTEXT}UPDATE_SUCCESS`,
    UPDATE: `${CONTEXT}UPDATE`,
    ON_FAILED: `${CONTEXT}_ON_FAILED`,
    GET: `${CONTEXT}_GET`,
    GET_SUCCESS: `${CONTEXT}_GET_SUCCESS`,
};