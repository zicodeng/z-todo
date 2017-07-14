import React from "react";
import ReactDOM from "react-dom";

import AddItemForm from "./add-item-form";
import DisplayList from "./display-list";

class Todo extends React.Component {
	constructor(props) {
        super(props);

		this.loadPage();

        this.state = ({
			todoList: [],
        });
    }

	render() {
		return (
			<div>
				<AddItemForm
					addItem={(item) => this.addItem(item)}
					firstName={this.state.firstName}
					lastName={this.state.lastName}
				/>
				<DisplayList
					todoList={this.state.todoList}
					deleteItem={(item) => this.deleteItem(item)}
				/>
			</div>
		)
	}

	loadPage() {
		$.ajax({
			type: "GET",
			url: "/todo/user"
		})
		.done((response) => {
			this.setState({
				username: response.username
			});
			this.loadList();
		})
		.fail((error) => {
			console.log(error);
		});
	}

	loadList() {
		var username = this.state.username;
		$.ajax({
			type: "GET",
			url: "/todo/user/" + username + "/api",
			dataType: "json"
		})
		.done((response) => {
			console.log(response.json);
			this.setState({
				todoList: response.json.todoList,
				firstName: response.json.firstName,
				lastName: response.json.lastName
			});
		})
		.fail((error) => {
			console.log(error);
		});
    }

	addItem(item) {
		// Use timestamp as unique id
		var date = new Date();
		var uid = date.getTime()

		var newItem = {
			item: item,
			uid: uid
		}

		$.ajax({
			type: "POST",
			url: "/todo/user/" + this.state.username + "/api",
			data: newItem
		})
		.done((data) => {
			// Load page again
			// update todoList and re-render the page
			this.loadList();
		})
		.fail((error) => {
			console.log(error);
		});
	}

	deleteItem(itemId) {
		$.ajax({
            type: "POST",
            url: "/todo/user/" + this.state.username + "/api/" + itemId
        })
		.done((data) => {
			// Load page again
			// update todoList and re-render the page
			this.loadList();
		})
		.fail((error) => {
			console.log(error);
		});
	}
}

ReactDOM.render(<Todo />, document.getElementById("todo"));

export default Todo;
