export const ACTION = {
    CHANGE_LNG: 'CHANGE_LNG',
    CHANGE_MENU: 'CHANGE_MENU',
    CHANGE_TAB: 'CHANGE_TAB',
    ADD_BACK_TAB: 'ADD_BACK_TAB',
    REMOVE_BACK_TAB: 'REMOVE_BACK_TAB',
    CHANGE_NETWORK: 'CHANGE_NETWORK',
    CHANGE_LOCK: 'CHANGE_LOCK',
    ADD_ACCOUNT: 'ADD_ACCOUNT',
    REMOVE_ACCOUNT: 'REMOVE_ACCOUNT',
    SET_PASSWORD: 'SET_PASSWORD',
    SET_PASSWORD_PENDING: 'SET_PASSWORD_PENDING',
    SET_PASSWORD_UPDATE: 'SET_PASSWORD_UPDATE',
    SET_SELECTED_ACCOUNT: 'SET_SELECTED_ACCOUNT',
    SET_ACTIVE_ACCOUNT: 'SET_ACTIVE_ACCOUNT',
    CLEAR_MESSAGES: 'CLEAR_MESSAGES',
    APPROVE: 'CONFIRM',
    REJECT: 'REJECT',
    REJECT_OK: 'REJECT_OK',
    APPROVE_PENDING: 'APPROVE_PENDING',
    APPROVE_OK: 'APPROVE_OK',
    APPROVE_ERROR: 'APPROVE_ERROR',
    APPROVE_REJECT_CLEAR: 'APPROVE_REJECT_CLEAR',
    UNLOCK: 'UNLOCK',
    LOCK: 'LOCK',
    LOGIN: 'LOGIN',
    LOGIN_PENDING: 'LOGIN_PENDING',
    LOGIN_UPDATE: 'LOGIN_UPDATE',
    NEW_ACCOUNT_SELECT: 'NEW_ACCOUNT_SELECT',
    NEW_ACCOUNT_NAME: 'NEW_ACCOUNT_NAME',
    NEW_ACCOUNT_CLEAR_ERRORS: 'NEW_ACCOUNT_CLEAR_ERRORS',
    SAVE_NEW_ACCOUNT: 'SAVE_NEW_ACCOUNT',
    SAVE_NEW_ACCOUNT_SEND: 'SAVE_NEW_ACCOUNT_SEND',
    SAVE_NEW_ACCOUNT_RECEIVE: 'SAVE_NEW_ACCOUNT_RECEIVE',
    GET_BALANCES: 'GET_BALANCES',
    SELECT_ACCOUNT: 'SELECT_ACCOUNT',
    DELETE_ACTIVE_ACCOUNT: 'DELETE_ACTIVE_ACCOUNT',
    CHANGE_NODE: 'CHANGE_NODE',
    CHANGE_MATCHER: 'CHANGE_MATCHER',

    UPDATE_FROM_LNG: 'UPDATE_FROM_LNG',
    UPDATE_APP_STATE: 'UPDATE_APP_STATE',
    UPDATE_UI_STATE: 'UPDATE_UI_STATE',
    SET_UI_STATE: 'SET_UI_STATE',
    SET_UI_STATE_AND_TAB: 'SET_UI_STATE_AND_TAB',
    UPDATE_ACCOUNTS: 'UPDATE_ACCOUNTS',
    UPDATE_SELECTED_ACCOUNT: 'UPDATE_SELECTED_ACCOUNT',
    UPDATE_MESSAGES: 'UPDATE_MESSAGES',
    UPDATE_ACTIVE_MESSAGE: 'UPDATE_ACTIVE_MESSAGE',
    UPDATE_BALANCES: 'UPDATE_BALANCES',
    UPDATE_CURRENT_NETWORK: 'UPDATE_CURRENT_NETWORK',
    UPDATE_NETWORKS: 'UPDATE_NETWORKS',
    UPDATE_ASSET: 'UPDATE_ASSET',
    UPDATE_NODES: 'UPDATE_NODES',
    UPDATE_MATCHER: 'UPDATE_MATCHER',
    UPDATE_LANGS: 'UPDATE_LANGS',
    GET_ASSETS: 'GET_ASSETS',
    CHANGE_ACCOUNT_NAME: 'CHANGE_ACCOUNT_NAME',
    CHANGE_PASSWORD: 'CHANGE_PASSWORD',
    DELETE_ACCOUNT: 'DELETE_ACCOUNT',
    LOADING: 'LOADING',
    CLOSE_WINDOW: 'CLOSE_WINDOW',
    NOTIFICATION_DELETE: 'DELETE_ACCOUNT_NOTIFY',
    NOTIFICATION_SELECT: 'SELECT_ACCOUNT_NOTIFY',
    NOTIFICATION_NAME_CHANGED: 'NOTIFICATION_NAME_CHANGED',
};

export const createAction = type => payload => ({ type, payload });
