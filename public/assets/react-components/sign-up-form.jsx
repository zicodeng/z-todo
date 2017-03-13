import React from "react";

class SignUpForm extends React.Component {
	constructor(props) {
		super(props);

		this.state = ({

		});
	}

	render() {
		return (
			<section className="sign-up" onSubmit={(e) => this.handleSubmitForm(e)}>
				<form className="material-design">
					<h1>SIGN UP</h1>
					<div className="form-group">
						<input type="text" ref="username" required />
						<label for="username">Username</label>
					</div>
					<div className="form-group">
						<input type="password" ref="password" required />
						<label for="password">Password</label>
					</div>
					<div className="form-group">
						<input type="text" ref="firstName" required />
						<label for="firstName">First Name</label>
					</div>
					<div className="form-group">
						<input type="text" ref="lastName" required />
						<label for="lastName">Last Name</label>
					</div>
					<button>SUBMIT</button>
				</form>
				<p onClick={(e) => this.handleClickLogIn(e)}>Already have an account? Log in here!</p>
				<footer>Created with <span></span> by Zico Deng</footer>
			</section>
		)
	}

	handleSubmitForm(e) {
		e.preventDefault();

		// Get user input value
		var username = this.refs.username.value;
		var password = this.refs.password.value;
		var firstName = this.refs.firstName.value;
		var lastName = this.refs.lastName.value;

		var newUser = {
			username: username,
			password: password,
			firstName: firstName,
			lastName: lastName
		}

		// Clear user field
		this.refs.username.value = "";
		this.refs.password.value = "";
		this.refs.firstName.value = "";
		this.refs.lastName.value = "";

		// Validate user input value
		if(username !== "" && password !== "" && firstName !== "" && lastName !== "") {
			this.props.signUp(newUser);
		}
	}

	handleClickLogIn(e) {
		e.preventDefault();
		var isSignUp = false;
		this.props.switchState(isSignUp);
	}
}

export default SignUpForm;
