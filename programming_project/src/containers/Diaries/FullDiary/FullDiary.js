import React, { Component } from "react";
import classes from "./FullDiary.module.css";
import axios from "axios";
import { Redirect } from "react-router-dom";
import Spinner from "../../../UI/Spinner/Spinner";
import DailyDiary from "../../../components/DailyDiary/DailyDiary";

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

  constructor(props) {
    super(props);
    this.reqInterceptor = axios.interceptors.request.use(req => {
      this.setState({ error: null });
      return req;
    });
    this.resInterceptor = axios.interceptors.response.use(
      res => res,
      error => {
        this.setState({ error: error });
      }
    );
  }

  componentWillUnmount() {
    axios.interceptors.request.eject(this.reqInterceptor);
    axios.interceptors.response.eject(this.resInterceptor);
  }

  editEntryHandler = () => {
    alert("Edit diary entry page......");
  };

  componentDidMount() {
    
    this.loadData();
  }

  backHandler = () => {
    const previousIndex = this.state.currentIndex;
    const newIndex = previousIndex - 1;
    this.setState({ currentIndex: newIndex });
    const dayBefore = this.getDayBeforeDate(this.state.today);
    const currentPages = Object.entries(this.state.loadedDiary.pages);
    currentPages.forEach(page=>{
      if(page[1].date === dayBefore){
        this.setState({currentKey: page[0], currentDay: dayBefore})
      }
    })
  };

  forwardHandler = () => {
    const previousIndex = this.state.currentIndex;
    const newIndex = previousIndex + 1;
    this.setState({ currentIndex: newIndex });
    const dayAfter = this.getDayAfterDate(this.state.currentDay)
    const currentPages = Object.entries(this.state.loadedDiary.pages);
    currentPages.forEach(page=>{
      if(page[1].date === dayAfter){
        this.setState({currentKey: page[0], currentDay: dayAfter})
      }
    })
  };

  getTodayDate(){
    let today = [];
    today.push(new Date().getFullYear());
    today.push(new Date().getMonth() + 1);
    today.push(new Date().getDate());
    return today = today.join("-");
  }

  getDayBeforeDate(day){

    let getDayBefore = new Date(day)
    getDayBefore.setDate(getDayBefore.getDate() -1)
    
    let dayBefore = [];
    dayBefore.push(new Date(getDayBefore).getFullYear());
    dayBefore.push(new Date(getDayBefore).getMonth() + 1);
    dayBefore.push(new Date(getDayBefore).getDate());
    return dayBefore = dayBefore.join('-')

  }

  getDayAfterDate(day){
    let getDayAfter = new Date(day)
    getDayAfter.setDate(getDayAfter.getDate() + 1)
    
    let dayAfter = [];
    dayAfter.push(new Date(getDayAfter).getFullYear());
    dayAfter.push(new Date(getDayAfter).getMonth() + 1);
    dayAfter.push(new Date(getDayAfter).getDate());
    return dayAfter = dayAfter.join('-')
  }

  loadData = () => {
    if (this.props.match.params.id) {
      if (
        !this.state.loadedDiary ||
        (this.state.loadedDiary &&
          this.state.loadedDiary.id !== +this.props.match.params.id)
      ) {
        axios
          .get(
            "https://programming-project-f81c1.firebaseio.com/diaries/" +
              this.props.match.params.id +
              ".json"
          )
          .then(response => {
            
            
            const today = this.getTodayDate();
            if(response.data.pages){
              this.setState({noEntries:false})
              //check if there is a page for the current day
              let newState = {
                loadedDiary: response.data,
                currentBody: '',
                currentIndex: null,
                today: today,
                isTodayFilled: false,
                pageKey: null,
                currentDay: today
              }

              Object.entries(response.data.pages).map((page, index)=>{
                if(page[1].date === today){
                  
                  return newState = {
                    loadedDiary: response.data,
                    currentIndex: index,
                    currentBody: response.data.pages[page[0]].body,
                    today: today,
                    isTodayFilled: true,
                    pageKey: page[0],
                    currentDay: today
                  }
                }
                return newState;
              })
              
              
              if(newState.isTodayFilled){
                this.setState({
                  loadedDiary: newState.loadedDiary,
                  currentBody: newState.currentBody,
                  currentIndex: newState.currentIndex,
                  today: newState.today,
                  isTodayFilled: newState.isTodayFilled,
                  currentKey: newState.pageKey,
                  currentDay: today
                })
              }
              else{
                this.setState({
                  loadedDiary: newState.loadedDiary,
                  currentBody: newState.currentBody,
                  currentIndex: newState.currentIndex,
                  today: newState.today,
                  isTodayFilled: newState.isTodayFilled,
                  currentKey: newState.pageKey,
                  currentDay: today
                })
              }
            }else{
              //this is the first time user write in diary, set noEntries to true
              this.setState({noEntries:true})
            }

            
          });
      }
    }
  };

  render() {
    let moveForward = null;
    let moveBackward = null;

    let diary = null;

    if (this.props.match.params.id) {
      diary = <Spinner />;
    }

    if(this.state.noEntries){
      return (
        <Redirect
          from={this.props.match.url}
          to={this.props.match.url + "/" + this.state.today}
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
          // <p>new post?</p>
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
              body={this.state.loadedDiary.pages[this.state.currentKey].body}
              edit={this.editEntryHandler}
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

export default FullDiary;
