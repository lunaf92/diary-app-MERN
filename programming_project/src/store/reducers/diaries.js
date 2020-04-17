import * as actions from '../actions/actionTypes';
import {updateObject} from '../utility';

const initialState = {
    diaries:null,
    error: false,
    loading: false,
    deleted: false,
    selected: ''
};

const reducer = (state = initialState, action) =>{
    switch (action.type) {
        case actions.FETCH_DIARIES_INIT:
            return updateObject(state, {loading: true, selected: ''})            
        case actions.FETCH_DIARIES_FAIL:
            return updateObject(state, {error: true, loading: false})                
        case actions.FETCH_DIARIES_SUCCESS:
            return updateObject(state, {loading: false, diaries: action.diaries})
        case actions.DELETE_DIARY_INIT:
            return updateObject(state, {loading: true})
        case actions.DELETE_DIARY_FAIL:
            return updateObject(state, {error: true, loading: false})
        case actions.DELETE_DIARY_SUCCESS:
            return updateObject(state, {loading: false})
        case actions.STORE_DIARY_ENTRY:
            return updateObject(state, {selected: action.entry})
        default:
            return state
    }
};

export default reducer;