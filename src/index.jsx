import "bootswatch/dist/darkly/bootstrap.min.css";
import 'core-js/stable';
// import { hot } from 'react-hot-loader/root';
import React from 'react';
import ReactDOM from 'react-dom';
import 'regenerator-runtime/runtime';
import Header from './components/layouts/Header/index';
import Main from './components/layouts/Main';
import './index.scss';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { active: false };
  }

  toggleActive = () => {
    this.setState(prevState => ({ active: !prevState.active }));
  };

  render() {
    return (
      <>
        <Header />
        <Main />
      </>
    );
  }
}

// const AppWithHot = hot(App);
const mountNode = document.getElementById('app');
console.log(mountNode);
ReactDOM.render(<App />, mountNode);
