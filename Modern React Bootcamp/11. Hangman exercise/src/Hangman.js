import React, { Component } from "react";
import "./Hangman.css";
import { randomWord } from "./words";
import img0 from "./img/0.jpg";
import img1 from "./img/1.jpg";
import img2 from "./img/2.jpg";
import img3 from "./img/3.jpg";
import img4 from "./img/4.jpg";
import img5 from "./img/5.jpg";
import img6 from "./img/6.jpg";

class Hangman extends Component {
	/** by default, allow 6 guesses and use provided gallows images. */
	static defaultProps = {
		maxWrong: 6,
		images: [img0, img1, img2, img3, img4, img5, img6],
	};

	constructor(props) {
		super(props);
		this.state = { nWrong: 0, guessed: new Set(), answer: randomWord() };
		this.handleGuess = this.handleGuess.bind(this);
	}

	/** guessedWord: show current-state of word:
    if guessed letters are {a,p,e}, show "app_e" for "apple"
  */
	guessedWord() {
		return this.state.answer
			.split("")
			.map((ltr) => (this.state.guessed.has(ltr) ? ltr : "_"));
	}

	/** handleGuest: handle a guessed letter:
    - add to guessed letters
    - if not in answer, increase number-wrong guesses
  */
	handleGuess(evt) {
		let ltr = evt.target.value;
		this.setState((st) => ({
			guessed: st.guessed.add(ltr),
			nWrong: st.nWrong + (st.answer.includes(ltr) ? 0 : 1),
		}));
	}

	/** generateButtons: return array of letter buttons to render */
	generateButtons() {
		return "abcdefghijklmnopqrstuvwxyz".split("").map((ltr, i) => (
			<button
				key={i}
				value={ltr}
				onClick={this.handleGuess}
				disabled={this.state.guessed.has(ltr)}
			>
				{ltr}
			</button>
		));
	}

	handleReset = () => {
		this.setState({
			nWrong: 0,
			guessed: new Set(),
			answer: randomWord(),
		});
	};

	/** render: render game */
	render() {
		const altText = `${this.state.nWrong}/${this.props.maxWrong} guesses`;
		return (
			<div className="Hangman">
				<h1>Hangman</h1>
				<img src={this.props.images[this.state.nWrong]} alt={altText} />
				<p>
					<b>Incorrect Guess: </b> {this.state.nWrong}
				</p>
				{this.state.nWrong === 6 ? (
					<div>
						<h4>You lose</h4>
						<h4>
							Answer was <b>"{this.state.answer}"</b>
						</h4>
						<button
							onClick={this.handleReset}
							style={{ width: "100px" }}
						>
							Reset
						</button>
					</div>
				) : (
					<div>
						{this.guessedWord().join("") === this.state.answer ? (
							<div>
								<p className="Hangman-word">
									{this.guessedWord()}
								</p>
								<h4>You won 🥳</h4>
								<button
									onClick={this.handleReset}
									style={{ width: "100px" }}
								>
									Reset
								</button>
							</div>
						) : (
							<div>
								<p className="Hangman-word">
									{this.guessedWord()}
								</p>
								<p className="Hangman-btns">
									{this.generateButtons()}
								</p>
							</div>
						)}
					</div>
				)}
			</div>
		);
	}
}

export default Hangman;
