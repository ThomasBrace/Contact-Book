import React from 'react';
import ReactDOM from 'react-dom';
import AppContainer from './components/appContainer';

ReactDOM.render(
  <AppContainer />, document.getElementById('app'), function(){console.timeEnd("Load")}
);
