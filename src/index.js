import React from 'react';
import { render } from 'react-dom';
import LandingView from './views/LandingView';

render( <LandingView />, document.getElementById('app'));

if(process.env.NODE_ENV === 'development' && module.hot) {
  module.hot.accept();
}
