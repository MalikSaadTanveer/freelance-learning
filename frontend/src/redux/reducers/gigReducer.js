import {
    LOAD_GIG_REQUEST,
    LOAD_GIG_SUCCESS,
    LOAD_GIG_FAIL,
    CREATE_GIG_REQUEST,
    CREATE_GIG_SUCCESS,
    CREATE_GIG_FAIL,
    CREATE_GIG_RESET,
    UPDATE_GIG_REQUEST,
    UPDATE_GIG_SUCCESS,
    UPDATE_GIG_FAIL,
    UPDATE_GIG_RESET,

    CLEAR_ERRORS
} from '../constants/gigConstants'


export const gigReducer = (state = { gigs: [] }, action) => {

    switch (action.type) {
        case LOAD_GIG_REQUEST:
        case CREATE_GIG_REQUEST:
            return {
                loading: true,
                gigs: [],
            }
        case LOAD_GIG_SUCCESS:
            return {
                loading: false,
                gigs: action.payload,
            }
        case LOAD_GIG_FAIL:
        case CREATE_GIG_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null,
            };
        default:
            return state;
    }
}


export const createGigReducer = (state = {}, action) => {

    switch (action.type) {

        case CREATE_GIG_SUCCESS:
            return {
                ...state,
                loading: false,
                isCreated: action.payload,
                gigId: action.id,
            }
        // case CREATE_GIG_FAIL:
        //     return{
        //         ...state,
        //         loading:false,
        //         error:action.payload,
        //     }
        case CREATE_GIG_RESET:
            return {
                ...state,
                isCreated: false,
            }
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null,
            };
        default:
            return state;
    }
}


export const updateGigReducer = (state = {}, action) => {
    switch (action.type) {
        case UPDATE_GIG_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case UPDATE_GIG_SUCCESS:
            return {
                ...state,
                loading: false,
                isUpdated: action.payload,
            }
        case UPDATE_GIG_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
            }
        case UPDATE_GIG_RESET:
            return {
                ...state,
                isUpdated: false,
            }
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null,
            };

        default:
            return state;
    }
}
