import React from "react";
import ReactDOM from "react-dom";

import SignUpForm from "./sign-up-form";
import LogInForm from "./log-in-form";

class Index extends React.Component {
	constructor(props) {
		super(props);

		this.state = ({
			isSignUp: true
		});
	}

	render() {
		return(
			<main className="home-page">
				<section className="app-title">
					<h1>Z</h1>
					<h2>TODO</h2>
				</section>
				{
					this.state.isSignUp ? (
						<SignUpForm
							switchState = {(isSignUp) => this.switchState(isSignUp)}
							signUp = {(newUser) => this.signUp(newUser)}
						/>
					) : (
						<LogInForm
							switchState = {(isSignUp) => this.switchState(isSignUp)}
							logIn = {(user) => this.logIn(user)}
						/>
					)
				}
			</main>
		)
	}

	signUp(newUser) {
		$.ajax({
			type: "POST",
			url: "/sign-up",
			data: newUser
		})
		.done((response) => {
			// If sign up successfully, redirect to what server wants us to go (todo page)
			if (typeof response.redirect === "string") {
				window.location = response.redirect;
			} else if(response.error.code === 11000) {
				// Handle error sent by server
				window.alert("Username already exists");
			} else {
				console.log(response.error);
			}
		})
		.fail((error) => {
			console.log(error);
		});
	}

	logIn(user) {
		$.ajax({
			type: "POST",
			url: "/log-in",
			data: user
		})
		.done((response) => {
			console.log(response);
			// If log in successfully, redirect to what server wants us to go (todo page)
			if (typeof response.redirect === "string") {
				window.location = response.redirect;
			} else {
				window.alert(response.error);
			}
		})
		.fail((error) => {
			console.log(error);
		});
	}

	switchState(isSignUp) {
		this.setState({
			isSignUp: isSignUp
		});
	}
}

ReactDOM.render(<Index />, document.getElementById("index"));

export default Index;
