import React from "react";

class AddItemForm extends React.Component {
	constructor(props) {
		super(props);

		this.state = ({

		});
	}

	render() {
		return (
			<section className="add-item">
				<form className="material-design" onSubmit={(e) => this.handleSubmitForm(e)}>
					<h1>Hi, {this.props.firstName}!</h1>
					<div className="form-group">
						<input type="text" ref="item" required />
						<label for="new-item">What's the plan for today?</label>
					</div>
					<button type="submit">ADD</button>
				</form>
				<button className="log-out-btn" type="submit" onClick={(e) => this.handleClickLogOut(e)}>LOG OUT</button>
				<footer>Created with <span></span> by Zico Deng</footer>
			</section>
		)
	}

	handleSubmitForm(e) {
		e.preventDefault();

		// Store user input value
		var item = this.refs.item.value;

		// Clear input field
		this.refs.item.value = "";

		if(item !== "") {
			// Pass user input value
			this.props.addItem(item);
		}
	}

	handleClickLogOut(e) {
		e.preventDefault();

		// Use jQuery AJAX
		$.ajax({
			type: "GET",
			url: "/log-out"
		})
		.done((response) => {
			if(typeof response.redirect === "string") {
				window.location = response.redirect;
			}
		})
		.fail((error) => {
			console.log(error);
		});
	}
}

export default AddItemForm;
