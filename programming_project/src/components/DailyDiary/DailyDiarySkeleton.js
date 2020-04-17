import React from 'react'; 
import classes from './DailyDiary.module.css'
 
const DailyDiary = (props) => {
    return(
        <article className={classes.DailyDiary}>
            <h3>{props.date}</h3>
                <div>
                    {props.children}
                </div>
            <div className={classes.Instructions}>
            <button className={classes.EditEntry} onClick={props.buttonaction}>{props.buttonname}</button>
                {/* <div className={classes.TurningPage}>
                    <i  className={classes.ArrowLeft} onClick={props.back} />
                    <i style={{display: props.showForward ? '' : 'none'}} className={classes.ArrowRight} onClick={props.forward}/>
                </div> */}
            </div>
        </article>
    )
}
 
export default DailyDiary