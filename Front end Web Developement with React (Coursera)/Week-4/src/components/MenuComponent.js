import React from "react";
import {
	Card,
	CardImg,
	CardImgOverlay,
	CardBody,
	CardTitle,
	Breadcrumb,
	BreadcrumbItem,
} from "reactstrap";
import { Link } from "react-router-dom";
import Loading from "./LoadingComponent";
import { baseUrl } from "../shared/baseUrl";

//* Functional component
const RenderMenuItem = ({ dish }) => (
	<Card>
		<Link to={`/menu/${dish.id}`}>
			<CardImg
				object
				src={baseUrl + dish.image}
				alt={dish.name}
				width="100%"
			/>
			<CardImgOverlay>
				<CardBody>
					<CardTitle>{dish.name}</CardTitle>
				</CardBody>
			</CardImgOverlay>
		</Link>
	</Card>
);
const Menu = (props) => {
	const menu = props.dishes.dishes.map((item) => (
		<div key={item.id} className="col-12 col-md-5 m-1">
			<RenderMenuItem dish={item} />
		</div>
	));
	if (props.dishes.isLoading) {
		return (
			<div className="container">
				<div className="row">
					<Loading />
				</div>
			</div>
		);
	} else if (props.dishes.errMess) {
		return (
			<div className="container">
				<div className="row">
					<div className="col-12">
						<h4>{props.dishes.errMess}</h4>
					</div>
				</div>
			</div>
		);
	} else
		return (
			<div className="container">
				<div className="row">
					<Breadcrumb>
						<BreadcrumbItem>
							<Link to="/home">Home</Link>
						</BreadcrumbItem>
						<BreadcrumbItem>Menu</BreadcrumbItem>
					</Breadcrumb>
				</div>
				<div className="row p-3">{menu}</div>
			</div>
		);
};

export default Menu;
