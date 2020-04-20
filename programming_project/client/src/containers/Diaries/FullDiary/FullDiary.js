import React, { Component } from "react";
import { connect } from 'react-redux'

import classes from "./FullDiary.module.css";
import Spinner from "../../../UI/Spinner/Spinner";
import DailyDiarySkeleton from "../../../components/DailyDiary/DailyDiarySkeleton"
import * as actions from '../../../store/actions/index'
import { getTodayDate } from "../../../store/actions/fullDiary";
import { Redirect } from "react-router-dom";


class FullDiary extends Component {

  editEntryHandler = (page) => {
    this.props.history.push(this.props.match.url + '/pages/' + page)
  };

  componentDidMount() {
    let selected = ''
    if(this.props.selected !== ''){
      selected = this.props.selected;
    }else{
      selected = this.props.match.url.split('/')[2]
    }
    this.props.onFetchDiary(selected);
  }

  getTodayDate = () => {
    let today = [];
    today.push(new Date().getFullYear());
    today.push(new Date().getMonth() + 1);
    today.push(new Date().getDate());
    return (today = today.join("-"));
  };

  postDataHandler = () =>{
    const data = {
      body: this.props.body,
      date: getTodayDate()
    };
    const diaryEntry = this.props.match.url.split('/')[2];
    this.props.onDailySubmit(data, diaryEntry);
  }

  onEditEntryHandler = () =>{
    this.props.onEditEntry()
  }

  submitEditHandler = () =>{
    const data = {
      body: this.props.body,
      date: this.props.currentDate
    }
    const diary = this.props.currentDiary;
    const page = this.props.currentPage[0][1]._id;
    this.props.onSubmitEdit(data, diary, page);
  }

  onNextHandler = () =>{
    this.props.onNextPage(this.props.pages, this.props.currentDate);
  }

  onBackHandler = () =>{
    this.props.onPrevPage(this.props.pages, this.props.currentDate)
  }

  render() {
    //setup of the buttons to browse the pages
    let nextPage = null;
    let prevPage = null;

    // redirect if new entry has just been posted
    if(this.props.posted){
      this.props.afterSuccess()
      return(
        <Redirect to="/" />
      )
    }
    let diary = <Spinner/>;
    let body = null;
    let buttonName = ''
    // if there is no entry for today, display a textbox to fill the day's entry
    // else assign the body of today's post
    if((!this.props.todayHasAnEntry && (this.props.currentDate===this.props.today)) ){
      body = <textarea
            rows="4"
            value={this.props.body}
            onChange={this.props.onBodyChanging}
          />
      buttonName = 'submit'
    }else if(this.props.editing){
        body = <textarea
              rows="4"
              value={this.props.body.replace(/\n/ig, '\n')}
              onChange={this.props.onBodyChanging}
            />
        buttonName = 'submit edit'
    }else{
      body = this.props.body.replace(/\n/ig, '\n');
      buttonName = 'Edit';
    }
    // check if title is loaded, this will exist even if diary is empty, 
    // which means that the diary has indeed loaded
    if(this.props.currentTitle){
      if(this.props.pages){
        if((this.props.currentDate !== this.props.today) && this.props.next){
          nextPage = <i className={classes.ArrowRight} onClick={this.onNextHandler} />
        }
        if(Object.keys(this.props.pages).length >1 && this.props.previous){
          prevPage = <i className={classes.ArrowLeft} onClick={this.onBackHandler} />
        }
      }
      
      diary = 
      <div className={classes.FullDiary}>
        <h1>{this.props.currentTitle}</h1>
        <DailyDiarySkeleton
                            date={this.props.currentDate}
                            buttonname={buttonName}
                            buttonaction={buttonName === 'submit' ? this.postDataHandler : buttonName === 'Edit' ? this.onEditEntryHandler : this.submitEditHandler}
                            body={body} />
        <div className={classes.ChangePage}>
          {prevPage}
          {nextPage}
        </div>
      </div>
    }

    return <div>{diary}</div>;
  }
}

const mapDispatchToProps = dispatch =>{
  return{
    onFetchDiary: (id) => dispatch(actions.fetchDiary(id)),
    onTodayCheck: (diary)=>dispatch(actions.checkIfTodayHasAnEntry(diary)),
    onBodyChanging: (event)=>dispatch(actions.dailyBody(event.target.value)),
    onDailySubmit: (body, diary)=>dispatch(actions.postDailyDiary(body, diary)),
    afterSuccess: ()=>dispatch(actions.afterSuccessulPost()),
    onNextPage: (pages, currentPage)=>dispatch(actions.nextPage(pages, currentPage)),
    onPrevPage: (pages, currentDate)=>dispatch(actions.prevPage(pages, currentDate)),
    onSubmitEdit: (data, diary, page)=>dispatch(actions.submitEdit(data, diary, page)),
    onEditEntry: ()=>dispatch(actions.editEntryInit())
  }
}

const mapStateToProps = state =>{
  return{
    selected: state.diaries.selected,
    error: state.fullDiary.error,
    todayHasAnEntry: state.fullDiary.todayHasAnEntry,
    currentPage: state.fullDiary.currentPage,
    currentTitle: state.fullDiary.title,
    pages: state.fullDiary.pages,
    body: state.fullDiary.currentBody,
    posted: state.fullDiary.posted,
    today: state.fullDiary.today,
    currentDate: state.fullDiary.currentDate,
    previous: state.fullDiary.previous,
    next: state.fullDiary.next,
    editing: state.fullDiary.editing,
    currentDiary: state.fullDiary.currentDiary
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FullDiary);
