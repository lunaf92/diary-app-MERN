import React from 'react'; 
import classes from './DailyDiary.module.css'
 
const DailyDiarySkeleton = (props) => {
    let isBodyString = false;
    let newBody = []
    if(typeof props.body === 'string'){
        newBody = props.body.split('\n');
        isBodyString = true;
    }
    return(
        <article className={classes.DailyDiary}>
            <h3>{props.date}</h3>
                <div>
                {isBodyString ? newBody.map((b,i)=>(<p key={i}>{b}</p>)) : props.body }
                </div>
            <div className={classes.Instructions}>
            <button className={classes.EditEntry} onClick={props.buttonaction}>{props.buttonname}</button>
            </div>
        </article>
    )
}
 
export default DailyDiarySkeleton