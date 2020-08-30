/* eslint-disable react/no-array-index-key */
/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prefer-stateless-function */
/* eslint-disable max-classes-per-file */
import React, {Component} from 'react'
import './style.css';
import logo from './songbird.svg';

class Header extends Component {
  render() {
    return (
      <header>
        <div className="text-primary">
          <div className="logo">
            <img src={logo} width="50" alt="songbird_logo" />
          </div>
          <p className="score">Score: {this.props.score}</p>
        </div>
        <QuestionsList />
      </header>
    );
  }
}

class QuestionsList extends Component {
  render() {
    const questionArr = ['Разминка', 'Воробьиные', 'Лесные', 'Певчие', 'Хищные', 'Морские'];
    const questionItems = questionArr.map((question, index) =>
      <li className={index?"question-item":"question-item active"} key={index}>{question}</li>
    );
    return (
      <ul className="question-items">{questionItems}</ul>
    )
  }
}

export default Header
