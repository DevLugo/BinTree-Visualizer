import * as React from 'react';
import Header from './Header';
import Body from './Views/MainPage';
import { Provider } from 'react-redux';
import "antd/dist/antd.css";
import './App.scss';
import { store } from './store';

const App = () => {
  return (
    <Provider store={store}>
      <div className="App">
        <Header />
        <Body />
      </div>
    </Provider>
  );
}


export default App;
