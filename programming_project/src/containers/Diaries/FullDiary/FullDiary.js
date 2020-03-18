import React, {Component} from 'react' 
import classes from './FullDiary.module.css'
import axios from 'axios'
import Spinner from '../../../UI/Spinner/Spinner'
import DailyDiary from '../../../components/DailyDiary/DailyDiary'
 
class FullDiary extends Component{

    state = {
        loadedDiary: null,
        currentBody: '',
        currentIndex: null,
        today: null
    }

    editEntryHandler = () =>{
        alert('Edit diary entry page......')
    }

    componentDidMount(){
        // console.log(this.props)
        this.loadData()
    }

    componentDidUpdate(){
        this.loadData()
    }

    backHandler = () => {
        const previousIndex = this.state.currentIndex;
        const newIndex = previousIndex - 1;
        this.setState({currentIndex:newIndex})
    }

    forwardHandler = () => {
        const previousIndex = this.state.currentIndex;
        const newIndex = previousIndex + 1;
        this.setState({currentIndex:newIndex})
    }

    loadData = () =>{
        if(this.props.match.params.id){
            if(!this.state.loadedDiary || (this.state.loadedDiary && this.state.loadedDiary.id !== +this.props.match.params.id) ) {
                axios.get( 'https://programming-project-f81c1.firebaseio.com/diaries/' + this.props.match.params.id + '.json' )
                    .then( response => {
                        let today = [];
                        today.push(new Date().getFullYear());
                        today.push(new Date().getMonth() + 1);
                        today.push(new Date().getDate());
                        today = today.join('-');
                        let newData = response.data.pages;
                        let newBody = '';
                        let newIndex = null;
                        newData.map((day, index)=>{
                            if(day.date === today){
                                newBody = day.body
                                newIndex = index
                            }
                            return newBody
                        })
                        this.setState( { loadedDiary: response.data, currentBody: newBody, currentIndex: newIndex, today: today} );
                    } );
            }
        }
    }

    render(){
        let moveForward = null;
        let moveBackward = null;

        if(this.state.loadedDiary){
            if(this.state.today !== this.state.loadedDiary.pages[this.state.currentIndex].date){
                moveForward = <i className={classes.ArrowRight} onClick={this.forwardHandler}/>
            }

            if(this.state.currentIndex !== 0){
                moveBackward = <i className={classes.ArrowLeft} onClick={this.backHandler}/>
            }
        }

        let diary = null;

        if(this.props.match.params.id){
            diary = <Spinner/>
        }
        if(this.state.loadedDiary){
            diary = (
                    <div className={classes.FullDiary}>
                        <h1>{this.state.loadedDiary.title}</h1>
                        <DailyDiary 
                            date={this.state.loadedDiary.pages[this.state.currentIndex].date}
                            body={this.state.loadedDiary.pages[this.state.currentIndex].body.split('\\n')}
                            edit={this.editEntryHandler}
                            />
                        <div className={classes.ChangePage}>
                            {/* <input type="button" className={classes.Back} value="back" />
                            <input type="button" className={classes.Forward} value="forward"/> */}
                            {moveBackward}
                            {moveForward}
                        </div>
                    </div>)
        }

        return(
            <div>
                {diary}
            </div>
        )
    } 
}
 
export default FullDiary