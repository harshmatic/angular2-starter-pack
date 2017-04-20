export const CONTEXT: string = 'COUNTER';

/**
 * COUNTERAction  Interface
 */
interface ICounterActions {
    INIT: string;
    INITIALIZED: string;
    INIT_FAILED: string;
    INCREMENT: string;
    DECREMENT: string;
}

/**
 * COUNTER Actions List
 */
export const COUNTER_ACTIONS: ICounterActions = {
    INIT: `${CONTEXT}_INIT`,
    INITIALIZED: `${CONTEXT}_INITIALIZED`,
    INIT_FAILED: `${CONTEXT}_INIT_FAILED`,
    INCREMENT: `${CONTEXT}_INCREMENT`,
    DECREMENT: `${CONTEXT}_DECREMENT`
};