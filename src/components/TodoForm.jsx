import { Component } from "react";
import {taskUrl}
class Todolist extends Component {
	state = {
		taskName: [],
	};
	render() {
		return (
			<div>
				<h1>To do List</h1>

				<form>
					<input type="text" placeholder="Enter task to be done" />
					<br></br>
					<button type="submit">Add Task</button>
				</form>
			</div>
		);
	}
}
export default TodoForm;
