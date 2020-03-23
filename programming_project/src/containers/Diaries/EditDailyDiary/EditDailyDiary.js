import React, {Component} from 'react' 
import axios from 'axios'
import Spinner from '../../../UI/Spinner/Spinner'
import classes from './EditDailyDiary.module.css'
 
class EditDailyDiary extends Component{

    state = {
        title: null,
        content: '',
        date: '',
        loading: false
    }

    componentDidMount(){
        this.getData()
        this.setTitle()
    }

    componentDidUpdate(){
        console.log(this.state.content)
    }
        
    setTitle(){
        axios.get('https://programming-project-f81c1.firebaseio.com/diaries/' + this.props.match.params.diary + '.json')
            .then(response =>{
                this.setState({title: response.data.title})
            })
    }

    getData(){        
        axios.get('https://programming-project-f81c1.firebaseio.com/' + this.props.match.url + '.json')
            .then(response =>{
                this.setState({content: response.data.body, date: response.data.date})
            })
    }

    updateDataHandler = () => {
        this.setState({loading:true})
        const newState = {
            date: this.state.date,
            body: this.state.content
        }

        axios.put('https://programming-project-f81c1.firebaseio.com/' + this.props.match.url + '.json', newState)
            .then(response=>{
                console.log(this.props)
                this.setState({loading: false})
                this.props.history.goBack()
            })
    }

    render(){

        let diary = null;

        if (this.props.match.params.diary) {
            diary = <Spinner />;
        }

        if(this.state.title && !this.state.loading){
            console.log('hello')
            diary = (<  div className={classes.EditDailyDiary}>
                        <h1>Create a new Diary Entry</h1>
                        <h3>{this.state.title}</h3>
                        <label>Content</label>
                        <textarea
                            rows="4"
                            value={this.state.content}
                            onChange={event => this.setState({ content: event.target.value })}
                        />
                        <p>{this.state.date}</p>
                        <button onClick={this.updateDataHandler}>Edit entry</button>
                        </div>)
        }

        return(
            <React.Fragment>
                {diary}
            </React.Fragment>
        )
    } 
}
 
export default EditDailyDiary