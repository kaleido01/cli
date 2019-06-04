import React, { useEffect, useState, useContext } from "react";
import { UserContext } from "../../";

import { Button, Icon } from "semantic-ui-react";
import "./Habits.css";
import { Mutation } from "react-apollo";
import { STAR_HABIT, UNSTAR_HABIT } from "./../../queries/index";

const StarButton = ({ habit }) => {
	const [stared, setStar] = useState(false);
	const [starLength, setStarLength] = useState(habit.starUser.length);
	const currentUser = useContext(UserContext);
	useEffect(() => {
		if (currentUser) {
			currentUser.favorites.forEach(({ _id }) => {
				if (habit._id === _id) setStar(true);
			});
		}
	}, []);

	const handleClick = (starHabit, unStarHabit) => {
		if (stared) {
			unStarHabit().then(({ data }) => {
				setStar(!stared);
				setStarLength(data.unStarHabit.starUser.length);
			});
		} else {
			starHabit().then(({ data }) => {
				setStar(!stared);
				setStarLength(data.starHabit.starUser.length);
			});
		}
	};

	return (
		<Mutation mutation={UNSTAR_HABIT} variables={{ _id: habit._id }}>
			{(unStarHabit, { data, loading, error }) => {
				let message = null;
				if (loading) {
					message = " 取り消し中...";
				}
				return (
					<Mutation mutation={STAR_HABIT} variables={{ _id: habit._id }}>
						{(starHabit, { data, loading, error }) => {
							if (loading) {
								message = "追加中";
							}
							return (
								<Button
									as="a"
									onClick={() => handleClick(starHabit, unStarHabit)}
									color={stared ? "grey" : "orange"}
									style={{ whiteSpace: "nowrap" }}>
									<Icon
										name={stared ? "star" : "star outline"}
										color={stared ? "yellow" : null}
										loading={message && true}
									/>{" "}
									{starLength}
									{message
										? message
										: stared
										? " お気に入りの解除"
										: " お気に入りに追加"}
								</Button>
							);
						}}
					</Mutation>
				);
			}}
		</Mutation>
	);
};

export default StarButton;
