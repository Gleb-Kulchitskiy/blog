import {Router, Switch, Route, Link, Redirect} from 'react-router-dom';
import Article from "./Components/Article";
import ArticleList from "./Components/ArticleList";
import {createBrowserHistory} from 'history';
import './App.css';

function App() {
  return (
    <Router history={createBrowserHistory()}>
      <div className="App">
        <header className="App-header">
          Awesome Blog!
        </header>
      </div>
      <Switch>
        <Route exact path='/' render={({history}) => (<ArticleList history={history}/>)}/>
        <Route exact path='/articles' component={ArticleList}/>
        <Route path='/article/:id' render={({history}) => (<Article history={history}/>)}/>
      </Switch>
    </Router>
  );
}

export default App;
