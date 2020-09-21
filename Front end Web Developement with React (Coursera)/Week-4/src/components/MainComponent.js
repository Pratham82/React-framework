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
import {
	postComment,
	fetchDishes,
	fetchComments,
	fetchPromos,
} from "../redux/ActionCreators";
import { actions } from "react-redux-form";
import { TransitionGroup, CSSTransition } from "react-transition-group";

const mapStateToProps = (state) => {
	return {
		dishes: state.dishes,
		comments: state.comments,
		leaders: state.leaders,
		promotions: state.promotions,
	};
};

const mapDispatchToProps = (dispatch) => ({
	postComment: (dishId, rating, author, comment) =>
		dispatch(postComment(dishId, rating, author, comment)),
	fetchDishes: () => {
		dispatch(fetchDishes());
	},
	resetFeedbackFrom: () => {
		dispatch(actions.reset("feedback"));
	},
	fetchComments: () => {
		dispatch(fetchComments());
	},
	fetchPromos: () => {
		dispatch(fetchPromos());
	},
});

class Main extends Component {
	constructor(props) {
		super(props);
	}

	componentDidMount() {
		this.props.fetchDishes();
		this.props.fetchComments();
		this.props.fetchPromos();
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
					this.props.promotions.promotions.filter(
						(promo) => promo.featured
					)[0]
				}
				promosLoading={this.props.promotions.isLoading}
				promosErrMess={this.props.promotions.errMess}
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
					comments={this.props.comments.comments.filter(
						(comment) =>
							comment.dishId === parseInt(match.params.dishId, 10)
					)}
					postComments={this.props.postComment}
					isLoading={this.props.dishes.isLoading}
					errMess={this.props.dishes.errMess}
					commentsErrMess={this.props.comments.errMess}
				/>
			);
		};

		return (
			<div>
				<Header />
				<TransitionGroup>
					<CSSTransition
						key={this.props.location.key}
						classNames="page"
						timeout={300}
					>
						<Switch>
							<Route exact path="/home" component={HomePage} />

							<Route
								exact
								path="/menu"
								component={() => (
									<Menu dishes={this.props.dishes} />
								)}
							/>
							<Route
								path="/menu/:dishId"
								component={DishWithId}
							/>
							<Route
								path="/contact"
								component={() => (
									<Contact
										resetFeedbackFrom={
											this.props.resetFeedbackFrom
										}
									/>
								)}
							/>
							<Route
								path="/about"
								component={() => (
									<About leaders={this.props.leaders} />
								)}
							/>
							<Redirect to="/home" />
						</Switch>
					</CSSTransition>
				</TransitionGroup>
				<Footer />
			</div>
		);
	}
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));
