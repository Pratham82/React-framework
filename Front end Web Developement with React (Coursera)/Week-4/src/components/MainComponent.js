import React, { Component } from "react";
import "bootstrap-social/bootstrap-social.css";
import "font-awesome/css/font-awesome.css";
import Home from "./HomeComponent";
import Menu from "./MenuComponent";
import Contact from "./ContactComponent";
import DishDetail from "./DishDetailComponent";
import About from "./AboutComponent";
import Header from "./HeaderComponent";
import Footer from "./FooterComponent";
import { Switch, Route, Redirect, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { addComment, fetchDishes } from "../redux/ActionCreators";

const mapStateToProps = (state) => {
	return {
		dishes: state.dishes,
		comments: state.comments,
		leaders: state.leaders,
		promotions: state.promotions,
	};
};

const mapDispatchToProps = (dispatch) => ({
	addComment: (dishId, rating, author, comment) =>
		dispatch(addComment(dishId, rating, author, comment)),
	fetchDishes: () => {
		dispatch(fetchDishes());
	},
});

class Main extends Component {
	constructor(props) {
		super(props);
	}

	componentDidMount() {
		this.props.fetchDishes();
	}

	render() {
		const HomePage = () => (
			<Home
				dish={
					this.props.dishes.dishes.filter((dish) => dish.featured)[0]
				}
				dishesLoading={this.props.dishes.isLoading}
				dishesErrMess={this.props.dishes.errMess}
				leader={
					this.props.leaders.filter((leader) => leader.featured)[0]
				}
				promotion={
					this.props.promotions.filter((promo) => promo.featured)[0]
				}
			/>
		);

		const DishWithId = ({ match }) => {
			return (
				<DishDetail
					dish={
						this.props.dishes.dishes.filter(
							(dish) =>
								dish.id === parseInt(match.params.dishId, 10)
						)[0]
					}
					comments={this.props.comments.filter(
						(comment) =>
							comment.dishId === parseInt(match.params.dishId, 10)
					)}
					addComments={this.props.addComment}
					isLoading={this.props.dishes.isLoading}
					errMess={this.props.dishes.errMess}
				/>
			);
		};

		return (
			<div>
				<Header />
				<Switch>
					<Route exact path="/home" component={HomePage} />

					<Route
						exact
						path="/menu"
						component={() => <Menu dishes={this.props.dishes} />}
					/>
					<Route path="/menu/:dishId" component={DishWithId} />
					<Route path="/contact" component={Contact} />
					<Route
						path="/about"
						component={() => <About leaders={this.props.leaders} />}
					/>
					<Redirect to="/home" />
				</Switch>
				<Footer />
			</div>
		);
	}
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));
