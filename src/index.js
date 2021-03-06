import React, { createContext } from "react";
import ReactDOM from "react-dom";
import { ApolloProvider } from "react-apollo";
import ApolloClient from "apollo-boost";
import { BrowserRouter as Router } from "react-router-dom";
import "./index.css";
import App from "./components/App";
import * as serviceWorker from "./serviceWorker";
import "semantic-ui-css/semantic.min.css";
import withSession from "./components/withSession";

export const UserContext = createContext();

const client = new ApolloClient({
	uri: "https://manehabi.herokuapp.com/graphql",
	fetchOptions: {
		credentials: "includes"
	},
	request: operation => {
		const token = localStorage.getItem("token");
		operation.setContext({
			headers: {
				authorization: token
			}
		});
	},
	onError: ({ networkError }) => {
		if (networkError) {
			console.log("network Error", networkError);
		}
	}
});

const Root = ({ refetch, currentUser }) => (
	<Router>
		<UserContext.Provider value={currentUser}>
			<App refetch={refetch} />
		</UserContext.Provider>
	</Router>
);

const RootWithSession = withSession(Root);

ReactDOM.render(
	<ApolloProvider client={client}>
		<RootWithSession />
	</ApolloProvider>,

	document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
