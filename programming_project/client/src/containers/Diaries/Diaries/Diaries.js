import React, {Component} from 'react'; 
import { connect } from 'react-redux';

import Diary from '../../../components/Diary/Diary';
import classes from './Diaries.module.css';
import Spinner from '../../../UI/Spinner/Spinner';
import Delete from '../../../components/Delete/Delete';
import * as actions from '../../../store/actions/index';
 
class Diaries extends Component{

    componentDidMount(){
        this.props.onFetchDiaries();
    }

    selectorHandler = (id) =>{
        this.props.onSelectDiary(id)
        this.props.history.push(this.props.match.url + '/' + id);
    }

    deleteDiaryHandler = (id) =>{
        if(window.confirm("Are you sure you want to delete the full diary? you can't come back after this action")){
            this.props.onDeleteDiary(id);
        }
    }

    render(){
        let diaries = null;
        if(this.props.loading){
            diaries = <Spinner/>
        }
        if(this.props.diaries &&  this.props.diaries.length === 0){
            diaries = <p>looks like you're the first one! start a diary now!</p>
        }
        if(this.props.error){
            diaries = <p>something went wrong, please try again later</p>
        }
        if(this.props.diaries){
            diaries = this.props.diaries.map((diary, index)=>{
                let diaryKey = diary[1]._id;
                let singleDiary = diary[1];
                return(
                    <div key={index} className={classes.SingleDiary}>
                        <Diary
                            title={singleDiary.title}
                            author={singleDiary.author}
                            description={singleDiary.description}
                            clicked={()=>this.selectorHandler(diaryKey, true)}
                        />
                        <Delete 
                            delete={()=>this.deleteDiaryHandler(diaryKey, false)}
                            />
                    </div>
                );
            })
        }

        return(
            <div className={classes.Diaries}>
                {diaries}
            </div>
        )
    } 
}

const mapDispatchToProps = dispatch =>{
    return{
        onFetchDiaries: () => dispatch(actions.fetchDiaries()),
        onDeleteDiary: (id) => dispatch(actions.deleteDiary(id)),
        onSelectDiary: (id) => dispatch(actions.storeEntry(id))
    }
};

const mapStateToProps = state =>{
    return {
        diaries: state.diaries.diaries,
        error: state.diaries.error,
        loading: state.diaries.loading
    }
};
 
export default connect(mapStateToProps, mapDispatchToProps)(Diaries);