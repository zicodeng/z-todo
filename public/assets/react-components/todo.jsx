import React from 'react';

import DisplayList from "./display-list";
import AddItemForm from "./add-item-form";

class Todo extends React.Component {
	constructor(props) {
        super(props);

		this.loadList();

        this.state = ({
			todoList: [],
        });
    }

	render() {
		return (
			<div>
				<AddItemForm addItem={(item) => this.addItem(item)} />
				<DisplayList
					todoList={this.state.todoList}
					deleteItem={(item) => this.deleteItem(item)}
				/>
			</div>
		)
	}

	loadList() {
		var url = "/todo/api";
        fetch(url)
        .then((response) => {
            return response.json();
        })
        .then((json) => {
			this.setState({
				todoList: json.todoList,
			});
        })
        .catch((error) => {
			console.log(error);
        });
    }

	addItem(item) {
		var newItem = {
			item: item
		};

		var todoList = this.state.todoList;
		todoList.push(newItem);

		// Use jQuery AJAX
		$.ajax({
			type: 'POST',
			url: '/todo',
			data: newItem
		})
		.done((data) => {
			// update todoList and re-render the page
			this.loadList();
		})
		.fail((error) => {
			console.log(error);
		});
	}

	deleteItem(item) {
		$.ajax({
            type: "DELETE",
            url: "/todo/" + item
        })
		.done((data) => {
			// update todoList and re-render the page
			this.loadList();
		})
		.fail((error) => {
			console.log(error);
		});
	}
}

export default Todo;
