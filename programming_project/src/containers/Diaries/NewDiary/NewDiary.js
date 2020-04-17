import React, {Component} from 'react';
import { connect } from 'react-redux';

import classes from './NewDiary.module.css';
import Spinner from '../../../UI/Spinner/Spinner';
import * as actions from '../../../store/actions/index';
import { Redirect } from 'react-router-dom';
 
class NewDiary extends Component{

    postDataHandler = () =>{
        let data = {
            title: this.props.title,
            description: this.props.description,
            author: this.props.author
        }
        this.props.onPostData(data)
    }

    render(){
        if(this.props.posted){
            this.props.onReset();
            return <Redirect to="/" />;
        }
        let NewDiary = <Spinner/>
        if(!this.props.posting){
            NewDiary = (
                <div className={classes.NewDiary}>
                    <h1>Create a new Diary</h1>
                    <label>Title</label>
                    <input type="text" value={this.props.title} onChange={this.props.onTitleSetting} />
                    <label>Description</label>
                    <textarea rows="4" value={this.props.description} onChange={this.props.onDescriptionSetting} />
                    <label>Author</label>
                    <input type="text"  value={this.props.author} onChange={this.props.onAuthorSetting} />
                    <button onClick={this.postDataHandler}>Add Diary</button>
                </div>
            )
        }

        return(
            <React.Fragment>
                {NewDiary}
            </React.Fragment>
            
        )
    } 
}

const mapDispatchToProps = dispatch =>{
    return{
        onAuthorSetting: (event)=>dispatch(actions.newAuthor(event.target.value)),
        onTitleSetting: (event)=>dispatch(actions.newTitle(event.target.value)),
        onDescriptionSetting: (event)=>dispatch(actions.newDescription(event.target.value)),
        onPostData: (postData)=>dispatch(actions.postData(postData)),
        onReset: ()=>dispatch(actions.reset())
    }
}

const mapStateToProps = state =>{
    return{
        author: state.newDiary.author,
        description: state.newDiary.description,
        title: state.newDiary.title,
        posting: state.newDiary.posting,
        posted: state.newDiary.posted
    }
}
 
export default connect(mapStateToProps, mapDispatchToProps)(NewDiary)