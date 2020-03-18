import React from 'react'; 
import classes from './DailyDiary.module.css'
 
const DailyDiary = (props) => {
    return(
        <article className={classes.DailyDiary}>
            <h3>{props.date}</h3>
                {props.body.map((b, index)=>{
                return <p key={index}>{b}</p>
            })}
            
            <div className={classes.Instructions}>
                <button className={classes.EditEntry} onClick={props.edit}>Edit entry</button>
            </div>
        </article>
    )
}
 
export default DailyDiary