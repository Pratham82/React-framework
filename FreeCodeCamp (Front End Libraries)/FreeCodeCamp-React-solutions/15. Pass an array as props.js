//React: Pass an Array as Props

/*
* To pass an array to a JSX element, it must be treated as JavaScript and wrapped in curly braces.
<ParentComponent>
  <ChildComponent colors={["green", "blue", "red"]} />
</ParentComponent>

*he child component then has access to the array property colors. Array methods such as join() can be used when accessing the property. const ChildComponent = (props) => <p>{props.colors.join(', ')}</p> 
*/

/*
There are List and ToDo components in the code editor. When rendering each List from the ToDo component, pass in a tasks property assigned to an array of to-do tasks, for example ["walk dog", "workout"]. Then access this tasks array in the List component, showing its value within the p element. Use join(", ") to display the props.tasksarray in the p element as a comma separated list. Today's list should have at least 2 tasks and tomorrow's should have at least 3 tasks.


*/

const List = (props) => {
	{
		/* change code below this line */
	}
	return <p>{props.tasks.join(", ")}</p>;
	{
		/* change code above this line */
	}
};

class ToDo extends React.Component {
	constructor(props) {
		super(props);
	}
	render() {
		return (
			<div>
				<h1>To Do Lists</h1>
				<h2>Today</h2>
				{/* change code below this line */}
				<List tasks={["walk dog", "workout"]} />
				<h2>Tomorrow</h2>
				<List tasks={["walk dog", "workout", "solve freeCodeCamp"]} />
				{/* change code above this line */}
			</div>
		);
	}
}
