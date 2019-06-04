import React, { Component, Fragment } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Homepage from "./Homepage/Homepage";
import Signin from "./Auth/Signin";
import Signup from "./Auth/Signup";
import Habits from "./Habits/Habits";
import Profile from "./Profile/Profile";
import HabitDescription from "./Habits/HabitDescription";
import Layout from "./Layout/Layout";
import { CreateHabit } from "./Habits/CreateHabit";
import MyHabits from "./Habits/MyHabits";

export class App extends Component {
	render() {
		const { refetch } = this.props;
		return (
			<Fragment>
				<Switch>
					<Route exact path="/" component={Homepage} />
				</Switch>
				<Route
					path="/(.+)"
					render={() => (
						<div>
							<Layout>
								<Switch>
									<Route
										path="/signup"
										render={() => <Signup refetch={refetch} />}
									/>
									<Route
										path="/signin"
										render={() => <Signin refetch={refetch} />}
									/>
									<Route path="/habit/:_id" component={HabitDescription} />
									<Route path="/newhabit" component={CreateHabit} />
									<Route path="/myhabits" component={MyHabits} />
									<Route path="/habits" component={Habits} />
									<Route path="/profile" component={Profile} />
									<Redirect to="/habits" />
								</Switch>
							</Layout>
						</div>
					)}
				/>
			</Fragment>
		);
	}
}

export default App;
