import React from 'react';
import ReactDOM from 'react-dom';
import App from '../src/App'; 
import { weatherStore } from './WeatherStore'; 
import { observer } from 'mobx-react-lite'; 

const ObservedApp = observer(App); 

ReactDOM.render(
  <ObservedApp weatherStore={weatherStore} />, 
  document.getElementById('root')
);
