import React from "react";
import { Mutation } from "react-apollo";
import { CREATE_USER } from "../../queries";
import { Link, withRouter } from "react-router-dom";
import {
	Grid,
	Form,
	Segment,
	Button,
	Header,
	Message,
	Icon
} from "semantic-ui-react";
import "./Auth.css";

class Signup extends React.Component {
	state = {
		username: "",
		email: "",
		password: "",
		passwordConfirmation: "",
		errors: [],
		loading: false
	};

	isFormValid = () => {
		const errors = [];
		let error;
		let valid = true;
		if (this.isFormEmpty(this.state)) {
			error = { message: "全てのフィールドを埋めてください" };
			this.setState({ errors: errors.concat(error) });
			valid = false;
		}
		if (!this.isPasswordValid(this.state)) {
			error = { message: "パスワードが不正です" };
			this.setState({ errors: errors.concat(error) });
			valid = false;
		}
		return valid;
	};

	isFormEmpty = ({ username, email, password, passwordConfirmation }) => {
		return (
			!username.length ||
			!email.length ||
			!password.length ||
			!passwordConfirmation.length
		);
	};

	isPasswordValid = ({ password, passwordConfirmation }) => {
		if (password < 6) {
			return false;
		} else if (password !== passwordConfirmation) {
			return false;
		} else {
			return true;
		}
	};

	displayErrors = errors => {
		return errors.map((error, i) => <p key={i}>{error.message}</p>);
	};

	handleChange = event => {
		const { name, value } = event.target;
		this.setState({ [name]: value });
	};

	handleSubmit = (event, createUser) => {
		event.preventDefault();
		if (this.isFormValid()) {
			createUser().then(async ({ data }) => {
				localStorage.setItem("token", data.createUser.token);
				await this.props.refetch();

				this.props.history.push("/habits");
			});
		}
	};

	handleInputError = (errors, inputName) => {
		return errors.some(error => error.message.includes(inputName))
			? "error"
			: "";
	};

	render() {
		const {
			username,
			email,
			password,
			passwordConfirmation,
			errors
		} = this.state;
		return (
			<Mutation
				mutation={CREATE_USER}
				variables={{ username, email, password }}>
				{(createUser, { data, loading, error }) => {
					if (error) {
						console.log(error, data);
					}
					return (
						<Grid className="Auth" textAlign="center" verticalAlign="middle">
							<Grid.Column style={{ maxWidth: 367 }}>
								<Header as="h2" icon color="purple" textAlign="center">
									<Icon name="new pied piper" color="purple" /> Manehabi
									会員登録
								</Header>
								<Form
									size="large"
									onSubmit={event => this.handleSubmit(event, createUser)}>
									<Segment stacked>
										<Form.Input
											fluid
											name="username"
											icon="user"
											iconPosition="left"
											placeholder="ユーザ名"
											onChange={this.handleChange}
											value={username}
											className={this.handleInputError(errors, "ユーザー")}
											type="text"
										/>
										<Form.Input
											fluid
											name="email"
											icon="mail"
											iconPosition="left"
											placeholder="Eメールアドレス"
											onChange={this.handleChange}
											value={email}
											className={this.handleInputError(errors, "Eメール")}
											type="email"
										/>
										<Form.Input
											fluid
											name="password"
											icon="lock"
											iconPosition="left"
											placeholder="パスワード"
											onChange={this.handleChange}
											value={password}
											className={this.handleInputError(errors, "パスワード")}
											type="password"
										/>
										<Form.Input
											fluid
											name="passwordConfirmation"
											icon="repeat"
											iconPosition="left"
											placeholder="パスワードの確認"
											onChange={this.handleChange}
											value={passwordConfirmation}
											className={this.handleInputError(errors, "パスワード")}
											type="password"
										/>
										<Button
											disabled={loading}
											className={loading ? "loading" : ""}
											color="orange"
											size="large"
											fluid>
											会員登録
										</Button>
									</Segment>
								</Form>
								{errors.length > 0 && (
									<Message error>
										<h3>エラー</h3>
										{console.log(errors)}
										{this.displayErrors(errors)}
									</Message>
								)}
								<Message>
									既に会員登録済みの方は
									<Link to="signin"> こちらからログイン</Link>
								</Message>
							</Grid.Column>
						</Grid>
					);
				}}
			</Mutation>
		);
	}
}

export default withRouter(Signup);
