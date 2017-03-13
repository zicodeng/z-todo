import React from "react";

class LogInForm extends React.Component {
	constructor(props) {
		super(props);

		this.state = ({

		});
	}

	render() {
		return (
			<section className="log-in" onSubmit={(e) => this.handleSubmitForm(e)}>
				<form className="material-design">
					<h1>LOG IN</h1>
					<div className="form-group">
						<input type="text" ref="username" required />
						<label for="username">Username</label>
					</div>
					<div className="form-group">
						<input type="password" ref="password" required />
						<label for="password">Password</label>
					</div>
					<button>SUBMIT</button>
				</form>
				<p onClick={(e) => this.handleClickSignUp(e)}>Don't have an account yet? Sign up here!</p>
				<footer>Created with <span></span> by Zico Deng</footer>
			</section>
		)
	}

	handleSubmitForm(e) {
		e.preventDefault();

		// Get user input value
		var username = this.refs.username.value;
		var password = this.refs.password.value;

		var user = {
			username: username,
			password: password
		}

		// Clear user field
		this.refs.username.value = "";
		this.refs.password.value = "";

		// Validate user input value
		if(username !== "" && password !== "") {
			this.props.logIn(user);
		}
	}

	handleClickSignUp(e) {
		e.preventDefault();
		var isSignUp = true;
		this.props.switchState(isSignUp);
	}
}

export default LogInForm;
