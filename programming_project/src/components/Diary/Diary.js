import React from 'react'; 
import classes from './Diary.module.css'
 
const Diary = (props) => (
    <article onClick={props.clicked}>
        <h1>{props.title}</h1>
        <p>{props.description}</p>
        <div className="Info">
            <div className={classes.Author}>
                <p>{props.author}</p>
            </div>
        </div>
    </article>
)
 
export default Diary