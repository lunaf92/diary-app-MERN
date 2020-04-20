import * as actions from './actionTypes';
import axios from 'axios';


// fetch just the selected diary
export const fetchDiaryInit = () =>{
    return{
        type: actions.FETCH_DIARY_INIT
    }
}

export const fetchDiarySuccess = (data, diary) =>{
    const today = getTodayDate()
    return{
        type: actions.FETCH_DIARY_SUCCESS,
        title: data.title,
        today: today,
        currentDiary: diary
    }
}

export const fetchDiaryFail = (error) =>{
    return{
        type: actions.FETCH_DIARY_FAIL,
        error: error
    }
}

export const checkIfToday = () =>{
    return{
        type: actions.IS_TODAY_PAGE
    }
}

export const fetchDiary = (id) =>{
    return dispatch=>{
        dispatch(fetchDiaryInit());
        axios.get('/api/diaries/'+id)
            .then(response=>{
                if(response.config.url === '/diaries/.json'){
                    dispatch(fetchDiaryFail('404'));
                    return false;
                }
                dispatch(fetchDiarySuccess(response.data, id));
                dispatch(getPages(id));
                // dispatch(checkIfTodayHasAnEntry(response.data));
            })
            .catch(error => {
                dispatch(fetchDiaryFail(error))
            })
    }
}

// get all the pages from a given diary

export const getPagesSuccess = (pages)=>{
    return{
        type: actions.GET_PAGES_SUCCESS,
        pages: pages
    }
}

export const getPagesFail = (error) =>{
    return{
        type: actions.GET_PAGES_FAIL,
        error: error
    }
}

export const getPages = (diary)=>{
    return dispatch=>{
        axios.get('/api/diaries/'+ diary +'/pages/')
            .then(res=>{
                dispatch(getPagesSuccess(res.data))
                dispatch(checkIfTodayHasAnEntry(res.data));
            })
            .catch(err=>{
                dispatch(getPagesFail(err))
            })
    }
}

//get data from the diary, just a single page
export const getTodayDate = () => {
    let today = [];
    today.push(new Date().getFullYear());
    today.push(new Date().getMonth() + 1);
    today.push(new Date().getDate());
    return (today = today.join("-"));
};

export const todayHasAnEntry = (entry) =>{
    return{
        type: actions.TODAY_HAS_AN_ENTRY,
        page: entry,
        body: entry[0][1].body,
        date: entry[0][1].date
    }
}

export const todayhasNoEntry = () =>{
    return{
        type: actions.TODAY_HAS_NO_ENTRY
    }
}

export const checkIfTodayHasAnEntry = (pages) =>{
    return dispatch=> {
        const today = getTodayDate();
        const getTodayPage = Object.entries(pages).filter(page=> page[1].date === today);
        if(getTodayPage.length > 0){
            return dispatch(todayHasAnEntry(getTodayPage))
        }else{
            return dispatch(todayhasNoEntry())
        }
    }
}

// if today is not in the diary, handle body
export const dailyBody = (data) =>{
    return{
        type: actions.DAILY_BODY,
        body: data
    }
}

// submit new day
export const postDailyDiaryInit = () =>{
    return{
        type: actions.SUBMIT_NEW_DAY_INIT
    }
}

export const postDailyDiarySuccess = () =>{
    return{
        type: actions.SUBMIT_NEW_DAY_SUCCESS
    }
}

export const postDailyDiaryFail = (error) =>{
    return{
        type: actions.SUBMIT_NEW_DIARY_FAIL,
        error: error
    }
}

export const postDailyDiary = (data, currentDiary) =>{
    return dispatch=>{
        dispatch(postDailyDiaryInit())
        axios.post('/api/diaries/'+currentDiary+'/pages', data)
          .then(response=>{
              dispatch(postDailyDiarySuccess())
          })
          .catch(error=>{
              dispatch(postDailyDiaryFail(error))              
          })
    }
}

export const afterSuccessulPost = () =>{
    return{
        type: actions.AFTER_SUBMISSION
    }
}

//check if next page exist

export const getNextBiggest = (ref, arrayofNumbers) =>{
    let resNum = null;
    let storedDiff = Number.MAX_SAFE_INTEGER;
    let checkDiff = 0;
    for(let i=0; i<arrayofNumbers.length; i++){
        if(arrayofNumbers[i] > ref){
            checkDiff = arrayofNumbers[i] - ref;
            if(checkDiff < storedDiff){
                storedDiff = checkDiff;
                resNum = arrayofNumbers[i];
            }
        }
    }
    return resNum;
}

export const nextPageSuccess = () =>{
    return{
        type: actions.NEXT_PAGE_SUCCESS
    }
}

export const nextPageFail = () =>{
    return{
        type: actions.NEXT_PAGE_FAIL
    }
}

export const getDataOfNextPage = ( page, body, date ) =>{
    return {
        type: actions.GET_DATA_OF_NEXT_PAGE,
        body: body,
        date: date,
        page: page
    }
}

export const nextPage = (pages, currentDate) =>{
    return dispatch=>{
        dispatch(previousPagePresent())
        const arrayWithDates = [];
        Object.entries(pages).map((page)=>(
            arrayWithDates.push(Date.parse(page[1].date))
        ))
        const currDate = Date.parse(currentDate)
        const getDateOfNextPage = getNextBiggest(currDate, arrayWithDates);
        let dateOfNextPage = [];
            dateOfNextPage.push(new Date(getDateOfNextPage).getFullYear());
            dateOfNextPage.push(new Date(getDateOfNextPage).getMonth() + 1);
            dateOfNextPage.push(new Date(getDateOfNextPage).getDate());
            dateOfNextPage = dateOfNextPage.join("-");
        let next = Object.entries(pages).filter(page=>(page[1].date === dateOfNextPage))
        dispatch(getDataOfNextPage(next, next[0][1].body, next[0][1].date))
        dispatch(checkIfNext(pages, next[0][1].date))
    }
}

export const checkIfNext = (pages, currentDate)=>{
    return dispatch=>{
        const arrayWithDates = [];
        Object.entries(pages).map((page)=>(
            arrayWithDates.push(Date.parse(page[1].date))
        ))
        const currDate = Date.parse(currentDate)
        const getDateOfNextPage = getNextBiggest(currDate, arrayWithDates);
        let dateOfNextPage = [];
            dateOfNextPage.push(new Date(getDateOfNextPage).getFullYear());
            dateOfNextPage.push(new Date(getDateOfNextPage).getMonth() + 1);
            dateOfNextPage.push(new Date(getDateOfNextPage).getDate());
            dateOfNextPage = dateOfNextPage.join("-");
        let next = Object.entries(pages).filter(page=>(page[1].date === dateOfNextPage))
        if(next.length !== 0){
            dispatch(nextPageSuccess());
        }else{
            dispatch(nextPageFail())
        }
    }
}

// check if previous page exist

export const getNextSmallest = (ref, arrayofNumbers) =>{
    let resNum = null;
    let storedDiff = Number.MAX_SAFE_INTEGER;
    let checkDiff = 0;
    for(let i=0; i<arrayofNumbers.length; i++){
        if(arrayofNumbers[i] < ref){
            checkDiff = ref-arrayofNumbers[i];
            if(checkDiff < storedDiff){
                storedDiff = checkDiff;
                resNum = arrayofNumbers[i];
            }
        }
    }
    return resNum;
}

export const getDataOfPrevPage = ( page, body, date ) =>{
    return {
        type: actions.GET_DATA_OF_PREV_PAGE,
        body: body,
        date: date,
        page: page
    }
}

export const previousPagePresent = () =>{
    return{
        type: actions.PREVIOUS_PAGE_PRESENT
    }
}

export const noPreviousPage = () =>{
    return {
        type: actions.NO_PREVIOUS_PAGE
    }
}

export const prevPage = (pages, currentDate) =>{
    return dispatch=>{
        const arrayWithDates = [];
        Object.entries(pages).map((page, k)=>(
            arrayWithDates.push(Date.parse(page[1].date))
        ))
        const currDate = Date.parse(currentDate)
        const getDateOfPrevPage = getNextSmallest(currDate, arrayWithDates);
        let dateOfPrevPage = [];
            dateOfPrevPage.push(new Date(getDateOfPrevPage).getFullYear());
            dateOfPrevPage.push(new Date(getDateOfPrevPage).getMonth() + 1);
            dateOfPrevPage.push(new Date(getDateOfPrevPage).getDate());
            dateOfPrevPage = dateOfPrevPage.join("-");
        let previous = Object.entries(pages).filter(page=>(page[1].date === dateOfPrevPage))
        dispatch(getDataOfPrevPage(previous, previous[0][1].body, previous[0][1].date))
    
        dispatch(checkIfNext(pages, previous[0][1].date))

        const check = getNextSmallest(Date.parse(previous[0][1].date), arrayWithDates)
        if(new Date(check).getFullYear() >= 2020){
            return dispatch(previousPagePresent())
        }else{
            return dispatch(noPreviousPage())
        }
    }
}

// Edit diary entry
 export const editEntryInit = () =>{
     return{
         type: actions.EDIT_PAGE
     }   
 }

 export const submitEditInit = () =>{
     return{
         type: actions.SUBMIT_EDIT_INIT
     }
 }

 export const submitEditSuccess = (data) =>{
     return{
        type: actions.SUBMIT_EDIT_SUCCESS,
        body: data.body,
        date: data.date
     }
 }

 export const submitEditFail = () =>{
     return{
         type: actions.SUBMIT_EDIT_FAIL
     }
 }

 export const submitEdit = (data, diary, page) =>{
     return dispatch=>{
        dispatch(submitEditInit())
        const date = data.date
        const newData = {...data, id: page}
        axios.put('/api/diaries/'+ diary +'/pages/' + date, newData)
            .then(res => {
                dispatch(submitEditSuccess(newData))
            })
            .catch(err=>{
                dispatch(submitEditFail(err))
            })
     }
 }