import * as actions from './actionTypes';
import axios from '../../axios-instance';

export const fetchDiariesSuccess = (diaries) =>{
    return{
        type: actions.FETCH_DIARIES_SUCCESS,
        diaries: diaries
    }
};

export const fetchDiariesFail = (error) =>{
    return{
        type: actions.FETCH_DIARIES_FAIL,
        error: error
    }
};

export const fetchDiariesInit = () =>{
    return{
        type: actions.FETCH_DIARIES_INIT
    }
};

export const fetchDiaries = () =>{
    return dispatch => {
        dispatch(fetchDiariesInit())
        axios.get('/diaries.json')
            .then(response=>{
                let newData = Object.entries(response.data);
                let updatedDiaries = []
                newData.map((diary)=>{
                    return updatedDiaries.push(diary)
                })
                dispatch(fetchDiariesSuccess(updatedDiaries))
            })
            .catch(error=> {
                dispatch(fetchDiariesFail(error))
            })
    }
};

export const deleteDiaryInit = () =>{
    return{
        type: actions.DELETE_DIARY_INIT
    }
};

export const deleteDiarySuccess = () =>{
    return{
        type: actions.DELETE_DIARY_SUCCESS
    }
};

export const deleteDiaryFail = (error) =>{
    return{
        type: actions.DELETE_DIARY_FAIL,
        error: error
    }
};

export const deleteDiary = (id) =>{
    return dispatch => {
        axios.delete('/diaries/'+ id + '.json')
                .then(response=>{
                    dispatch(deleteDiarySuccess())
                    dispatch(fetchDiaries())
                })
                .catch(err=>{
                    dispatch(deleteDiaryFail(err))
                })
    }
};

export const storeEntry = (id) =>{
    return{
        type: actions.STORE_DIARY_ENTRY,
        entry: id
    }
}