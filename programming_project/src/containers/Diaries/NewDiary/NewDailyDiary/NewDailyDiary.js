import React, { Component } from "react";
import Spinner from "../../../../UI/Spinner/Spinner";
import classes from "./NewDailyDiary.module.css";
import axios from "axios";

class NewDailyDiary extends Component {
  state = {
    title: "",
    content: "",
    date: "",
    diaryKey: null,
    loadedDiary: null,
    loading: false,
    currentPage: null
  };

  componentDidMount() {
    this.loadData();
  }

  componentDidUpdate() {
    
  }

  getTodayDate() {
    let today = [];
    today.push(new Date().getFullYear());
    today.push(new Date().getMonth() + 1);
    today.push(new Date().getDate());
    return (today = today.join("-"));
  }

  loadData = () => {
      
    if (this.props.match.params.diary) {
      if (
        !this.state.loadedDiary ||
        (this.state.loadedDiary &&
          this.state.loadedDiary.id !== +this.props.match.params.diary)
      ) {
        axios
          .get(
            "https://programming-project-f81c1.firebaseio.com/diaries/.json"
          )
          .then(response => {
              let entries = Object.entries(response.data);
              let today = this.getTodayDate();
              let diaryEntry = null
              entries.map((sDiary)=>{
                  
                 if(this.props.match.params.diary === ''+sDiary[0]){
                    diaryEntry = {
                        loadedDiary: sDiary[1],
                        date: today,
                        diaryKey: sDiary[0]
                    }
                 }
                 return diaryEntry
              })
              
            this.setState({
                loadedDiary: diaryEntry.loadedDiary,
                date: diaryEntry.date,
                diaryKey: diaryEntry.diaryKey
            });
            
          });
      }
    }
  };

  postDataHandler = () =>{
  //     
      
      this.setState({
          loading: true
      })
      const data = {
          body: this.state.content,
          date: this.state.date
      }

      axios.post('https://programming-project-f81c1.firebaseio.com/diaries/' + this.state.diaryKey + '/pages.json', data)
          .then(response=>{
              this.setState({loading:false})
              
              this.props.history.replace('/')
          })
          .catch(error=>{
              this.setState({loading:false})
              
          })
  }

  render() {
    let diary = null;
    if (this.props.match.params.diary) {
      diary = <Spinner />;
    }
    if (this.state.loadedDiary && this.state.loading===false) {
      diary = (
        <div className={classes.NewDailyDiary}>
          <h1>Create a new Diary Entry</h1>
          <h3>{this.state.loadedDiary.title}</h3>
          <label>Content</label>
          <textarea
            rows="4"
            value={this.state.content}
            onChange={event => this.setState({ content: event.target.value })}
          />
          <p>{this.state.date}</p>
          <button onClick={this.postDataHandler}>Add Post</button>
        </div>
      );
    }

    return <React.Fragment>{diary}</React.Fragment>;
  }
}

export default NewDailyDiary;
