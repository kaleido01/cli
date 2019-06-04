import React from "react";
import { Query } from "react-apollo";
import { GET_ALL_HABITS } from "./../../queries";
import HabitList from "./HabitList";

import { InitialLoader } from "../shered/Loader";
import { Grid, Header, Comment, Segment } from "semantic-ui-react";

const Habits = () => {
	const onLoadMore = (habits, fetchMore) => {
		fetchMore({
			variables: {
				offset: habits.length
			},
			updateQuery: (prev, { fetchMoreResult }) => {
				if (!fetchMoreResult) return prev;
				const prevHabits = prev.getAllHabits.habits;
				const currentHabits = fetchMoreResult.getAllHabits.habits;
				return {
					...prev,
					getAllHabits: {
						...prev.getAllHabits,
						habits: [...prevHabits, ...currentHabits],
						pageInfo: fetchMoreResult.getAllHabits.pageInfo
					}
				};
			}
		});
	};
	return (
		<Grid textAlign="center" centered>
			<Grid.Column style={{ minWidth: "350px" }} width={12}>
				<Query query={GET_ALL_HABITS} variables={{ offset: 0, limit: 5 }}>
					{({ data, fetchMore, loading, error }) => {
						if (loading) return <InitialLoader />;
						if (error) return console.log(error);
						const { habits, pageInfo } = data.getAllHabits;
						return (
							<Segment>
								<Comment.Group>
									<Header as="h3" dividing textAlign="center">
										新着習慣一覧
									</Header>
									<HabitList
										habits={habits}
										pageInfo={pageInfo}
										onLoadMore={() => onLoadMore(habits, fetchMore)}
									/>
								</Comment.Group>
							</Segment>
						);
					}}
				</Query>
			</Grid.Column>
		</Grid>
	);
};

export default Habits;
