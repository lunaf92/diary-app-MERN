import React, {Component} from 'react' 
import Diary from '../../../components/Diary/Diary'
import classes from './Diaries.module.css'
import axios from 'axios'
import {Link} from 'react-router-dom'
import Spinner from '../../../UI/Spinner/Spinner'
import Delete from '../../../components/Delete/Delete'
 
class Diaries extends Component{

    state = {
        diaries:null,
        currentView: 0,
        error: false,
        deleting: false
    }

    componentDidMount(){
        
        axios.get('https://programming-project-f81c1.firebaseio.com/diaries.json')
            .then(response=>{
                
                let newData = Object.entries(response.data);
                let updatedDiaries = []
                newData.map((diary)=>{
                    
                    return updatedDiaries.push(diary)
                })

                this.setState({diaries:updatedDiaries})
                
            })
            .catch(error=> {
                console.log(error);
                this.setState({error:true})
            })
    }

    selectorHandler = (id) =>{
            this.props.history.push(this.props.match.url + '/' + id)
    }

    deleteDiaryHandler = (id) =>{
        if(window.confirm("delete?" + id)){
            axios.delete('https://programming-project-f81c1.firebaseio.com/diaries/'+ id + '.json')
                .then(response=>{
                    console.log(response)
                    alert('Diary successfully deleted')
                    this.props.history.push('/')
                })
        }
    }

    render(){
        let diaries = <p>OOOPS... something went wrong!!</p>
        if(!this.state.diaries){
            diaries = <p>looks like you're the first one! start a diary now!</p>
        }
        if(this.state.deleting){
            diaries = <Spinner/>
        }
        if(!this.state.error && this.state.diaries){
            diaries = this.state.diaries.map((diary, index)=>{
                let diaryKey = diary[0]
                let singleDiary = diary[1]

                return(
                    //<Link key={index} to={this.state.deleting ? this.props.match.url : this.props.match.url+'/' + diaryKey}>
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
                    //</Link>
                );
            })
        }

        return(
            <div className={classes.Diaries}>
                {/* {this.state.currentPost ? null : diaries} */}
                {diaries}
            </div>
        )
    } 
}
 
export default Diaries