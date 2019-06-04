import React from "react";
import InfiniteScroll from "react-infinite-scroller";
import Loader from "./../shered/Loader";
import Habit from "./Habit";

const HabitList = ({ habits, pageInfo, onLoadMore }) => {
	return (
		<InfiniteScroll
			loadMore={onLoadMore}
			hasMore={pageInfo.hasNextPage}
			loader={<Loader key={pageInfo} />}>
			{habits.map((habit, index) => (
				<Habit key={index} habit={habit} />
			))}
		</InfiniteScroll>
	);
};

export default HabitList;
