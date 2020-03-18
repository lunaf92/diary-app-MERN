import './App.css';
import React, {Component} from 'react' 
import Layout from './containers/Layout/Layout';
import Diaries from './containers/Diaries/Diaries/Diaries';
import FullDiary from './containers/Diaries/FullDiary/FullDiary'
import { Route, Switch, Redirect } from 'react-router-dom';
import NotFound from './components/NotFound/NotFound'
import NewDiary from './containers/Diaries/NewDiary/NewDiary'
 
class App extends Component{
    render(){
        return(
          <React.Fragment>
            <Layout>
              <Switch>
                  <Route path="/new-diary" exact component={NewDiary} />
                  <Route path="/diaries/:id" exact component={FullDiary} />
                  <Route path="/diaries" component={Diaries} />
                  <Redirect from='/' to='/diaries'/>
                  <Route component={NotFound}/>
              </Switch>
            </Layout>
          </React.Fragment>
        )
    } 
}

export default App;
