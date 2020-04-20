import React from 'react'; 
import classes from './Delete.module.css'
 
const Delete = (props) => {
    return(
        <div className={classes.Instructions}>
            <button className={classes.Delete} onClick={props.delete}>Delete full Diary</button>
        </div>
    )
    
} 
 
export default Delete