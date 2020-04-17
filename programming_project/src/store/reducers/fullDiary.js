import * as actions from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
    title: '',
    pages: null,
    error: null,
    loading: false,
    todayHasAnEntry: null,
    currentPage: null,
    currentBody: '',
    currentDate: '',
    posted: false,
    previous: true,
    next: true,
    today: '',
    editing: false,
    currentDiary: null
};

const reducer = (state = initialState, action) =>{
    switch (action.type) {
        case actions.FETCH_DIARY_INIT:
            return updateObject(state, {loading: true, error: null, currentBody: '', previous: true});
        case actions.FETCH_DIARY_SUCCESS:
            return updateObject(state, {loading: false, title: action.title, pages: action.pages, today:action.today, currentDate: action.today, currentDiary: action.currentDiary});
        case actions.FETCH_DIARY_FAIL:
            return updateObject(state, {loading: false, error: action.error});
        case actions.TODAY_HAS_AN_ENTRY:
            return updateObject(state, {todayHasAnEntry: true, currentPage: action.page, currentBody: action.body, currentDate: action.date, next: false});
        case actions.TODAY_HAS_NO_ENTRY:
            return updateObject(state, {todayHasAnEntry: false, next: false});
        case actions.DAILY_BODY:
            return updateObject(state, {currentBody: action.body});
        case actions.SUBMIT_NEW_DAY_INIT:
            return updateObject(state, {loading: true});
        case actions.SUBMIT_NEW_DAY_SUCCESS:
            return updateObject(state, {loading: false, posted: true});
        case actions.SUBMIT_NEW_DAY_FAIL:
            return updateObject(state, {loading: false, posted:false, error: action.error});
        case actions.AFTER_SUBMISSION:
            return updateObject(state, {posted: false});
        case actions.NEXT_PAGE_SUCCESS:
            return updateObject(state, {next: true});
        case actions.NEXT_PAGE_FAIL:
            return updateObject(state, {next: false});
        case actions.GET_DATA_OF_NEXT_PAGE:
            return updateObject(state, {currentPage:action.page, currentBody: action.body, currentDate: action.date});
        case actions.GET_DATA_OF_PREV_PAGE:
            return updateObject(state, {currentPage:action.page, currentBody: action.body, currentDate: action.date});
        case actions.PREVIOUS_PAGE_PRESENT:
            return updateObject(state, {previous: true});
        case actions.NO_PREVIOUS_PAGE:
            return updateObject(state, {previous: false});
        case actions.EDIT_PAGE:
            return updateObject(state, {editing: true})
        case actions.SUBMIT_EDIT_INIT:
            return updateObject(state, {loading: true});
        case actions.SUBMIT_EDIT_SUCCESS:
            return updateObject(state, {loading: false, editing: false});
        case actions.SUBMIT_EDIT_FAIL:
            return updateObject(state, {loading: false, error: action.error, editing: false});
        default:
            return state;
    }
}

export default reducer