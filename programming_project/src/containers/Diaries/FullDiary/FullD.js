import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from 'react-redux'

import classes from "./FullDiary.module.css";
import axios from '../../../axios-instance';
import Spinner from "../../../UI/Spinner/Spinner";
import DailyDiary from "../../../components/DailyDiary/DailyDiary";
import * as actions from '../../../store/actions/index'


class FullDiary extends Component {
  state = {
    loadedDiary: null,
    currentBody: "",
    currentIndex: null,
    today: null,
    isTodayFilled: true,
    error: null,
    noEntries: false,
    currentKey: null,
    currentDay: null
  };

  editEntryHandler = (page) => {
    this.props.history.push(this.props.match.url + '/pages/' + page)
  };

  componentDidMount() {
    this.props.onFetchDiary(this.props.selected);
    // this.loadData()
  }

  backHandler = () => {
    const previousIndex = this.state.currentIndex;
    const newIndex = previousIndex - 1;
    this.setState({ currentIndex: newIndex });
    const currentPages = Object.entries(this.state.loadedDiary.pages);
    currentPages.map((page, index)=>{
      if(this.state.currentIndex - 1 === index){
        return this.setState({currentKey: page[0], currentDay: page[1].date})
      }
      else{
        return null
      }
  })
  };

  forwardHandler = () => {
    console.log(this.state.loadedDiary.pages)
    const previousIndex = this.state.currentIndex;
    const newIndex = previousIndex + 1;
    this.setState({ currentIndex: newIndex });
    const currentPages = Object.entries(this.state.loadedDiary.pages);
    currentPages.map((page, index)=>{
      if(this.state.currentIndex + 1 === index){
        return this.setState({currentKey: page[0], currentDay: page[1].date})
      }
      else{
        return null
      }
  })
}

  getTodayDate(){
    let today = [];
    today.push(new Date().getFullYear());
    today.push(new Date().getMonth() + 1);
    today.push(new Date().getDate());
    return today = today.join("-");
  }

  // loadData = () => {
  //   if (this.props.match.params.diary) {
  //     if (
  //       !this.state.loadedDiary ||
  //       (this.state.loadedDiary &&
  //         this.state.loadedDiary.id !== +this.props.match.params.diary)
  //     ) {
  //       axios
  //         .get(
  //           "/diaries/" +
  //             this.props.match.params.diary +
  //             ".json"
  //         )
  //         .then(response => {
            
            
  //           const today = this.getTodayDate();
  //           if(response.data.pages){
  //             this.setState({noEntries:false})
  //             //check if there is a page for the current day
  //             let newState = {
  //               loadedDiary: response.data,
  //               currentBody: '',
  //               currentIndex: null,
  //               today: today,
  //               isTodayFilled: false,
  //               pageKey: null,
  //               currentDay: today
  //             }

  //             Object.entries(response.data.pages).map((page, index)=>{
  //               if(page[1].date === today){
                  
  //                 return newState = {
  //                   loadedDiary: response.data,
  //                   currentIndex: index,
  //                   currentBody: response.data.pages[page[0]].body,
  //                   today: today,
  //                   isTodayFilled: true,
  //                   pageKey: page[0],
  //                   currentDay: today
  //                 }
  //               }
  //               return newState;
  //             })
              
              
  //             if(newState.isTodayFilled){
  //               this.setState({
  //                 loadedDiary: newState.loadedDiary,
  //                 currentBody: newState.currentBody,
  //                 currentIndex: newState.currentIndex,
  //                 today: newState.today,
  //                 isTodayFilled: newState.isTodayFilled,
  //                 currentKey: newState.pageKey,
  //                 currentDay: today
  //               })
  //               console.log('state', this.state)
  //             }
  //             else{
  //               this.setState({
  //                 loadedDiary: newState.loadedDiary,
  //                 currentBody: newState.currentBody,
  //                 currentIndex: newState.currentIndex,
  //                 today: newState.today,
  //                 isTodayFilled: newState.isTodayFilled,
  //                 currentKey: newState.pageKey,
  //                 currentDay: today
  //               })
  //             }
  //           }else{
  //             //this is the first time user write in diary, set noEntries to true
  //             this.setState({noEntries:true})
  //           }
  //         });
  //     }
  //   }
  // };

  render() {
    let moveForward = null;
    let moveBackward = null;
    let today = this.getTodayDate()
    let diary = null;
    // console.log('state')
    // console.log(this.state)

    if (this.props.match.params.diary) {
      diary = <Spinner />;
    }

    if(this.state.noEntries){
      return (
        <Redirect
          from={this.props.match.url}
          to={this.props.match.url + "/" + today}
        />
        // <p>new post?</p>
      );
    }

    if (this.state.loadedDiary) {
      
      if (!this.state.isTodayFilled) {
        return (
          <Redirect
            from={this.props.match.url}
            to={this.props.match.url + "/" + this.state.today}
          />
        );
      } else {
        if (
          this.state.today !==
          this.state.currentDay
        ) {
          moveForward = (
            <i className={classes.ArrowRight} onClick={this.forwardHandler} />
          );
        }

        if (this.state.currentIndex !== 0) {
          moveBackward = (
            <i className={classes.ArrowLeft} onClick={this.backHandler} />
          );
        }
        diary = (
          <div className={classes.FullDiary}>
            <h1>{this.state.loadedDiary.title}</h1>
            <DailyDiary
              date={this.state.loadedDiary.pages[this.state.currentKey].date}
              body={this.state.loadedDiary.pages[this.state.currentKey].body.replace(/\n/ig, '\n')}
              edit={() => this.editEntryHandler(this.state.currentKey)}
            />
            <div className={classes.ChangePage}>
              {/* <input type="button" className={classes.Back} value="back" />
                            <input type="button" className={classes.Forward} value="forward"/> */}
              {moveBackward}
              {moveForward}
            </div>
          </div>
        );
      }
    }

    return <div>{diary}</div>;
  }
}

const mapDispatchToProps = dispatch =>{
  return{
    onFetchDiary: (id) => dispatch(actions.fetchDiary(id)),
    onTodayCheck: (diary)=>dispatch(actions.checkIfTodayHasAnEntry(diary))
  }
}

const mapStateToProps = state =>{
  return{
    selected: state.diaries.selected,
    error: state.fullDiary.error,
    todayHasAnEntry: state.fullDiary.todayHasAnEntry,
    currentPage: state.fullDiary.currentPage,
    currentTitle: state.fullDiary.title,
    pages: state.fullDiary.pages
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FullDiary);
