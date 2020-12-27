import * as React from 'react';
import { Route, Switch } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import NotFoundPage from '../pages/NotFoundPage';
import * as paths from './paths';


export default function AppRoutes(){
  return (
    <Switch>
      <Route exact path={paths.baseUrl} component={HomePage} />
      <Route component={NotFoundPage} />
    </Switch>
  );
} 
