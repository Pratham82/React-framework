import React from "react";
import ReactDOM from "react-dom";
class Avatar extends React.Component {
	render() {
		return <img src={this.props.img} />;
	}
}

class Label extends React.Component {
	render() {
		return <h1>Name:{this.props.name} </h1>;
	}
}

class ScreenName extends React.Component {
	render() {
		return <h3>Username:{this.props.username} </h3>;
	}
}

class Badge extends React.Component {
	render() {
		console.log(this.props.user);
		return (
			<div>
				<Avatar img={this.props.user.img} />
				<Label name={this.props.user.name} />
				<ScreenName username={this.props.user.username} />
			</div>
		);
	}
}

ReactDOM.render(
	<Badge
		// {{}} double curly braces will indicate that we are passing an object
		user={{
			name: "Tyler McGinnis",
			img: "https://avatars0.githubusercontent.com/u/2933430?v=3&s=460",
			username: "tylermcginnis",
		}}
	/>,
	document.getElementById("root")
);
