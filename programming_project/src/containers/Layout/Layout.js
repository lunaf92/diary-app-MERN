import React, {Component} from 'react' 
import Toolbar from '../../components/Toolbar/Toolbar'
import classes from './Layout.module.css'
 
class Layout extends Component{
    render(){
        return(
            <React.Fragment > 
                <Toolbar/>
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </React.Fragment>
        )
    } 
}
 
export default Layout