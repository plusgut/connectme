import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './App';
import './index.css';

const header = document.getElementsByTagName('header')[0];
header.addEventListener('click', () => {
  header.style.width = '0%';

  const insertBody = () => {
    ReactDOM.render(
      <App />,
      document.body,
    );
    const app = document.getElementsByClassName('App')[0] as HTMLElement;
    console.log(app.offsetWidth);
    app.style.right = '0px';
  };
  setTimeout(insertBody, 1500);
});
