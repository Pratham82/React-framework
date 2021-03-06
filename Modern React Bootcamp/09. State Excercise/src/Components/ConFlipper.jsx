import React, { Component } from "react";
import Coin from "./Coin";
import { choice } from "./helpers";

class CoinContainer extends Component {
	static defaultProps = {
		coins: [
			{
				side: "head",
				imgSrc:
					"https://upload.wikimedia.org/wikipedia/commons/0/07/US_Half_Dollar_Obverse_2015.png",
			},

			{
				side: "tail",
				imgSrc:
					"https://upload.wikimedia.org/wikipedia/commons/2/2d/US_50_Cent_Rev.png",
			},
		],
	};
	constructor(props) {
		super(props);
		this.state = {
			currCoin: null,
			nFlips: 0,
			nHeads: 0,
			nTails: 0,
		};
		this.handleClick = this.handleClick.bind(this);
	}
	flipCoin() {
		const newCoin = choice(this.props.coins);

		this.setState((st) => {
			let newState = {
				...st,
				currCoin: newCoin,
				nFlips: st.nFlips + 1,
			};
			if (newCoin.side === "head") {
				nHeads: st.nHeads += 1;
			} else {
				nTails: st.nTails += 1;
			}
			return newState;
		});
	}
	handleClick(e) {
		this.flipCoin();
	}
	render() {
		return (
			<div className="CoinContainer">
				<h2>Let's Flip A Coin!</h2>
				{this.state.currCoin && <Coin info={this.state.currCoin} />}
				<button onClick={this.handleClick}>Flip Me!</button>
				<p>
					Out of {this.state.nFlips} flips, there have been{" "}
					{this.state.nHeads} heads and {this.state.nTails} tails.
				</p>
			</div>
		);
	}
}

export default CoinContainer;
