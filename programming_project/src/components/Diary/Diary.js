import React from 'react'; 
import classes from './Diary.module.css'
 
const Diary = (props) => (
    <article className={classes.Diary} onClick={props.clicked}>
        <h1>{props.title}</h1>
        <p>{props.description}</p>
        <div className="Info">
            <div className={classes.Author}>
                <p>{props.author}</p>
            </div>
        </div>
        <div className={classes.Instructions}>
            <button className={classes.Delete} onClick={props.delete}>Delete full Diary</button>
        </div>
        
    </article>
)
 
export default Diary