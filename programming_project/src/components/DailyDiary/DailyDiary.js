import React from 'react'; 
import classes from './DailyDiary.module.css'
 
const DailyDiary = (props) => {
    let arrBody = props.body.split('\n')
    return(
        <article className={classes.DailyDiary}>
            <h3>{props.date}</h3>
                {arrBody.map((b,i) => {
                    return <p key={i}> {b} </p>
                })}
            <div className={classes.Instructions}>
                <button className={classes.EditEntry} onClick={props.edit}>Edit entry</button>
            </div>
        </article>
    )
}
 
export default DailyDiary