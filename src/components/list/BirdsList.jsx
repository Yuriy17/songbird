/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable react/no-access-state-in-setstate */
/* eslint-disable react/no-unused-state */
/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable max-classes-per-file */
import React, {Component} from 'react';
import 'react-h5-audio-player/lib/styles.css';
import './style.css';
import AudioPlayer from 'react-h5-audio-player';
import correctAnswerSound from './answerTrue.mp3';
import incorrectAnswerSound from './answerFalse.mp3';
import finishSound from './finish.mp3';


class BirdList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isCorrectAnswer: false,
      birdInfo: null,
      score: 5,
    }
    this.nextLvlRef = React.createRef();
    this.congratsAudio = new Audio(finishSound);
  }

  isCorrectBird = (birdInfo, e) => {
    if (e.target.tagName !== 'LI') return;
    this.setState({
      birdInfo,
    });
    if (document.querySelector('.correct-answer')) {
      this.setState({
        isCorrectBirdName: true,
      });
      return;
    };
    if (birdInfo.name === this.props.birdsData[this.props.currentRound][this.props.randomNumber].name) {
       const correctAnswerAudio = new Audio(correctAnswerSound);
       correctAnswerAudio.play();
       e.target.firstChild.classList.add("correct-answer");
       this.nextLvlRef.current.classList.add("correct-answer-next-lvl");
       this.props.correctBirdName(birdInfo);
       this.props.changeScore(this.state.score);
       this.setState({
         isCorrectAnswer: true,
         score: 5,
       });
     } else {
       if (e.target.firstChild.classList.contains("incorrect-answer")) return;
       const incorrectAnswerAudio = new Audio(incorrectAnswerSound);
       incorrectAnswerAudio.play();
       e.target.firstChild.classList.add("incorrect-answer");
       this.setState({
         score: this.state.score - 1,
       });
   }
  }

  nextRound = () => {
    if (!this.state.isCorrectAnswer) return;
    this.nextLvlRef.current.classList.remove("correct-answer-next-lvl");
    const questionListLength = document.querySelector('.question-items').childNodes.length - 1;
    if (this.props.currentRound === questionListLength - 1) {
      this.nextLvlRef.current.firstChild.innerHTML = 'Finish the game'
    }
    if (this.props.currentRound < questionListLength) {
      document.querySelector('.active').nextElementSibling.classList.add("active");
      document.querySelector('.active').classList.remove("active");
      this.setState({
        isCorrectAnswer: false,
        birdInfo: null,
      });
      this.props.nextCurrentRound();
      this.props.correctBirdName();
      document.querySelectorAll('.bird-element').forEach((e) => {
        e.firstChild.classList.remove("correct-answer");
        e.firstChild.classList.remove("incorrect-answer");
      });
    } else {
      [document.querySelector('.bird-question'), document.querySelector('.birds-content-wrapper'), this.nextLvlRef.current].forEach((e) => {
        e.classList.add('hide');
      });
      document.querySelector('.congrats-container').classList.remove('hide');
      this.congratsAudio.play();
      setTimeout(() => this.congratsAudio.pause(), 5000);
    }
  }

  render() {
    const {birdsData} = this.props;
    const birdsList = birdsData[this.props.currentRound].map((birdInfo) => {
      return <li className="bird-element" key={birdInfo.id} onClick={this.isCorrectBird.bind(this, birdInfo)}><div className="point" />{birdInfo.name}</li>
    });
    return (
      <div>
      <div className="birds-content-wrapper">
        <div className="jumbotron bird-list">
          <ul>{birdsList}</ul>
        </div>
        <BirdInfo birdInfo={this.state.birdInfo} key={this.state.birdInfo === null ? this.state.birdInfo : this.state.birdInfo.name} />
      </div>
      <div className="next-lvl" ref={this.nextLvlRef} onClick={this.nextRound}><p>Next Level</p></div>
      </div>
    );
  }
}



class BirdInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      birdInfoBlock: !this.props.birdInfo || (!document.querySelector('.correct-answer') && !document.querySelector('.incorrect-answer')) ? <div className="bird-description-container"><p>Listen to player and choose a bird</p></div> :
               <div>
                <div className="bird-description">
                  <img src={this.props.birdInfo.image} alt="bird"/>
                  <ul className="bird-body">
                    <li>{this.props.birdInfo.name}</li>
                    <li>{this.props.birdInfo.species}</li>
                    <li><AudioPlayer
                      src={this.props.birdInfo.audio}
                    /></li>
                  </ul>
                </div>
                <p className="bird-description-info">{this.props.birdInfo.description}</p>
              </div>
    }
  }

  render() {
    return (
      <div className="jumbotron bird-info">{this.state.birdInfoBlock}</div>
    );
  }
}


export default BirdList;
