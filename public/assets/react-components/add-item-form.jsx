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
					<h1>Z-TODO</h1>
					<div className="form-group">
						<input type="text" ref="item" required />
						<label for="new-item">What's the plan for today?</label>
					</div>
					<button type="submit">ADD</button>
				</form>
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
}

export default AddItemForm;
