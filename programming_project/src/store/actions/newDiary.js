import * as actions from './actionTypes';
import axios from '../../axios-instance';

export const newTitle = (title) =>{
    return{
        type: actions.NEW_TITLE,
        title: title
    }
}

export const newDescription = (desc) =>{
    return{
        type: actions.NEW_DESCRIPTION,
        description: desc
    }
}

export const newAuthor = (auth) =>{
    return{
        type:actions.NEW_AUTHOR,
        author: auth
    }
}

export const postDataInit = () =>{
    return{
        type: actions.SUBMIT_NEW_DIARY_INIT
    }
}

export const postDataSuccess = () =>{
    return{
        type: actions.SUBMIT_NEW_DIARY_SUCCESS
    }
}

export const postDataFail = (error) =>{
    return{
        type: actions.SUBMIT_NEW_DIARY_FAIL,
        error: error
    }
}

export const postData = (data) =>{
    return dispatch=>{
        dispatch(postDataInit());
        let post = { ...data }
        axios.post('/diaries.json', post)
                .then(response=>{
                    alert('diary saved!')
                    dispatch(postDataSuccess())
                })
                .catch(err=>{
                    dispatch(postDataFail(err))
                })
    }
}

export const reset = () =>{
    return{
        type: actions.RESET
    }
}