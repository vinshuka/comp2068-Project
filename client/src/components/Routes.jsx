import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Home from './pages/Home';

import Register from './users/Register';
import Login from './sessions/Login';
import Logout from './sessions/Logout';

import Characters from './characters/Index';
import NewCharacter from './characters/New';
import EditCharacter from  './characters/Edit';


function Routes ({user, setUser}) {
    return (
        <Switch>
            <Route exact path="/" component={Home}/>
            <Route exact path='/register' render={
                renderProps => <Register
                {...renderProps}
                setUser={setUser}
                />
            }/>
            <Route exact path="/login" render={
                renderProps => <Login
                    {...renderProps}
                    setUser={setUser}
                />
            }/>
            <Route exact path="/logout" render={
                renderProps => <Logout
                    {...renderProps}
                    setUser={setUser}
                />
            }/>
            <Route exact path='/characters' render={
                renderProps => <Characters
                    {...renderProps}
                    user={user}
                    />
            }/>
            <Route exact path='/characters/new' component={NewCharacter}/>
            <Route exact path='/characters/edit' component={EditCharacter}/>
        </Switch>
    );
}

export default Routes;