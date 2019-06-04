import React from "react";

import { Query } from "react-apollo";

import { GET_CURRENT_USER } from "../queries";
import Loader from "./shered/Loader";

const withSession = Component => props => (
	<Query query={GET_CURRENT_USER}>
		{({ data, loading, refetch }) => {
			if (loading) return <Loader />;
			const currentUser = data && data.getCurrentUser;
			return (
				<Component {...props} refetch={refetch} currentUser={currentUser} />
			);
		}}
	</Query>
);

export default withSession;
