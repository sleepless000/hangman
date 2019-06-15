import React, { Component } from 'react';
import './Hangman.css';
import images from './images';
import { randomWord } from './words';

class Hangman extends Component {
  static defaultProps = {
    maxWrong: 6,
    images
  };

  constructor(props) {
    super(props);
    this.state = { nWrong: 0, guessed: new Set(), answer: randomWord() };
    this.handleGuess = this.handleGuess.bind(this);
    this.reset = this.reset.bind(this);
  }

  guessedWord() {
    return this.state.answer
      .split('')
      .map(ltr => (this.state.guessed.has(ltr) ? ltr : '_'));
  }

  handleGuess(evt) {
    let ltr = evt.target.value;
    this.setState(st => ({
      guessed: st.guessed.add(ltr),
      nWrong: st.nWrong + (st.answer.includes(ltr) ? 0 : 1)
    }));
  }

  generateButtons() {
    return 'abcdefghijklmnopqrstuvwxyz'.split('').map(ltr => (
      <button
        key={ltr}
        value={ltr}
        onClick={this.handleGuess}
        disabled={this.state.guessed.has(ltr)}
      >
        {ltr}
      </button>
    ));
  }

  reset() {
    this.setState({
      nWrong: 0,
      guessed: new Set(),
      answer: randomWord()
    });
  }

  render() {
    const { answer, nWrong } = this.state;
    const { images, maxWrong } = this.props;
    const youLose = this.state.nWrong >= this.props.maxWrong;
    const youWin = this.guessedWord().join('') === answer;
    let gameState = this.generateButtons();
    if (youLose) gameState = 'You lose';
    if (youWin) gameState = 'You win';

    return (
      <div className="Hangman">
        <h1>Hangman</h1>
        <img
          alt={`${nWrong} out of ${maxWrong} guesses`}
          src={images[nWrong]}
        />
        <p>Guessed Wrong: {nWrong}</p>
        <p className="Hangman-word">{!youLose ? this.guessedWord() : answer}</p>
        <p className="Hangman-btns">{gameState}</p>
        <button id="reset" onClick={this.reset}>
          Restart
        </button>
      </div>
    );
  }
}

export default Hangman;
