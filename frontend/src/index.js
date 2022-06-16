import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Provider } from "react-redux";
import store from "./store";
import {BrowserRouter as Router} from 'react-router-dom'
import { positions, transitions, Provider as AlertProvider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";


//fonts
import './fonts/Gotham/GothamBold.ttf'
import './fonts/Gotham/GothamBoldItalic.ttf'
import './fonts/Gotham/GothamBook.ttf'
import './fonts/Gotham/GothamBookItalic.ttf'
import './fonts/Gotham/GothamLight.ttf'
import './fonts/Gotham/GothamLightItalic.ttf'
import './fonts/Gotham/GothamMedium_1.ttf'
import './fonts/Gotham/GothamMedium.ttf'
import './fonts/Gotham/GothamMediumItalic.ttf'
window.process = {};

const options = {
  timeout: 5000,
  position: positions.BOTTOM_CENTER,
  transition: transitions.SCALE,
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Router>
  <Provider store={store}>
   <AlertProvider template={AlertTemplate} {...options}>

    <App />
  </AlertProvider>
 </Provider>
 </Router>
);
