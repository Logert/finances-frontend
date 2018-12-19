import { HashRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PT from 'prop-types';

import App from 'containers/App';
import Public from 'containers/Public';
import Journal from 'containers/Journal';
import Settings from 'containers/Settings';
import Calendar from 'containers/Calendar';
import Statement from 'containers/Statement';
import Home from 'containers/Home';
import Budget from 'containers/Budget';

class MyRouter extends Component {
  static propTypes = {
    isLogin: PT.bool,
  };

  render() {
    const { isLogin } = this.props;

    return (
      <Router>
        <Switch>
          <Route exact path="/" component={Public}/>
          <App>
            {
              isLogin ? (
                  <Switch>
                    <Route path="/home" component={Home}/>
                    <Route path="/journal" component={Journal}/>
                    <Route path="/budget" component={Budget}/>
                    <Route path="/calendar" component={Calendar}/>
                    <Route exact path="/settings" component={Settings}/>
                    <Route path="/settings/:type" component={Settings}/>
                    <Route path="/statement" component={Statement}/>

                    <Route render={() => <h1>404 Not found</h1>}/>
                  </Switch>
                )
                : <Redirect to="/"/>
            }
          </App>
          <Route render={() => <h1>404 Not found</h1>}/>
        </Switch>
      </Router>
    );
  }
}

const mapStateToProps = state => ({
  isLogin: state.auth.get('isLogin'),
});

export default connect(mapStateToProps)(MyRouter);
