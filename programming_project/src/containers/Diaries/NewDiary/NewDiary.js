import React, {Component} from 'react' 
import axios from 'axios'
import classes from './NewDiary.module.css'
import Spinner from '../../../UI/Spinner/Spinner'
 
class NewDiary extends Component{

    state = {
        id: null,
        title: '',
        description: '',
        author: '',
        posting: false
    }

    componentDidMount(){
        this.checkId()
    }

    checkId(){
        let newId = null;
        axios.get('https://programming-project-f81c1.firebaseio.com/diaries.json')
            .then(response=>{                
                if(response.data){
                    newId = (Object.keys(response.data).length)
                }else{
                    newId = 0
                }
                this.setState({id:newId})
            });
    }

    postDataHandler = () =>{
        this.setState({posting:true})

        let post = {
            id: this.state.id,
            title: this.state.title,
            description: this.state.description,
            author: this.state.author
        }

        axios.post('https://programming-project-f81c1.firebaseio.com/diaries.json', post)
                .then(response=>{
                    this.setState({posting:false})
                    alert('diary saved!')
                    this.props.history.replace('/')
                })
    }

    render(){

        let NewDiary = <Spinner/>
        if(!this.state.posting){
            NewDiary = (
                <div className={classes.NewDiary}>
                    <h1>Create a new Diary</h1>
                    <label>Title</label>
                    <input type="text" value={this.state.title} onChange={(event) => this.setState({title: event.target.value})} />
                    <label>Description</label>
                    <textarea rows="4" value={this.state.description} onChange={(event) => this.setState({description: event.target.value})} />
                    <label>Author</label>
                    <input type="text"  value={this.state.author} onChange={(event) => this.setState({author: event.target.value})} />
                    <button onClick={this.postDataHandler}>Add Post</button>
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
 
export default NewDiary