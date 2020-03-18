import React, {Component} from 'react' 
import Diary from '../../../components/Diary/Diary'
import classes from './Diaries.module.css'
import axios from 'axios'
import {Link} from 'react-router-dom'
 
class Diaries extends Component{

    state = {
        diaries:[],
        currentView: 0,
        error: false
    }

    componentDidMount(){
        
        axios.get('https://programming-project-f81c1.firebaseio.com/diaries.json')
            .then(response=>{

                let newData = Object.entries(response.data);
                let updatedDiaries = []
                newData.map((diary)=>{
                    return updatedDiaries.push(diary[1])
                })

                this.setState({diaries:updatedDiaries})
            })
            .catch(error=> {
                console.log(error);
                this.setState({error:true})
            })
    }

    selectorHandler = (id) =>{
            this.props.history.push('/'+id)
            this.setState({currentPost:id})        
    }

    deleteDiaryHandler = () =>{
        window.confirm("delete?");
    }

    render(){
        let diaries = <p>OOOPS... something went wrong!!</p>
        if(this.state.posts === []){
            diaries = <p>ok</p>
        }
        if(!this.state.error){
            diaries = this.state.diaries.map(diary=>{
                return(
                    <Link key={diary.id} to={this.props.match.url+'/' + diary.id}>
                        <Diary
                            title={diary.title}
                            author={diary.author}
                            description={diary.description}
                            clicked={()=>this.selectorHandler(diary.id)}
                            delete={this.deleteDiaryHandler}
                        />
                    </Link>
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