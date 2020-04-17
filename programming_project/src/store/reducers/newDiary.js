import * as actions from '../actions/actionTypes';
import {updateObject} from '../utility';

const initialState = {
    title: '',
    description: '',
    author: '',
    id: null,
    posting: false,
    posted: false,
    error: null
}

const reducer = (state = initialState, action) =>{
    switch (action.type) {
        case actions.NEW_TITLE:
            return updateObject(state, {title: action.title});
        case actions.NEW_DESCRIPTION:
            return updateObject(state, {description: action.description});
        case actions.NEW_AUTHOR:
            return updateObject(state, {author: action.author});
        case actions.SUBMIT_NEW_DIARY_INIT:
            return updateObject(state, {posting: true});
        case actions.SUBMIT_NEW_DIARY_SUCCESS:
            return updateObject(state, {posting: false, posted: true});
        case actions.SUBMIT_NEW_DIARY_FAIL:
            return updateObject(state, {posting: false, error: action.error});
        case actions.RESET:
            return updateObject(state, {posted: false, title: '', description: '', author: ''})
        default:
            return state;
    }
}

export default reducer