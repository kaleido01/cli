import { gql } from "apollo-boost";

export const CREATE_HABIT = gql`
	mutation createHabit(
		$title: String!
		$description: String!
		$unit: String!
		$isTime: Boolean!
	) {
		createHabit(
			title: $title
			description: $description
			unit: $unit
			isTime: $isTime
		) {
			title
			description
		}
	}
`;
export const DELETE_HABIT = gql`
	mutation deleteHabit($_id: ID!) {
		deleteHabit(_id: $_id) {
			_id
		}
	}
`;

export const UPDATE_HABIT = gql`
	mutation updateHabit($_id: ID!, $today: Int!, $todayTime: Int) {
		updateHabit(_id: $_id, today: $today, todayTime: $todayTime) {
			today
			total
		}
	}
`;
export const RESET_COUNT = gql`
	mutation resetCount($_id: ID!) {
		resetCount(_id: $_id) {
			_id
		}
	}
`;

export const STAR_HABIT = gql`
	mutation starHabit($_id: ID!) {
		starHabit(_id: $_id) {
			_id
			starUser {
				_id
			}
		}
	}
`;
export const UNSTAR_HABIT = gql`
	mutation unStarHabit($_id: ID!) {
		unStarHabit(_id: $_id) {
			_id
			starUser {
				_id
			}
		}
	}
`;
export const GET_CURRENT_USER = gql`
	query getCurrentUser {
		getCurrentUser {
			_id
			username
			email
			favorites {
				_id
			}
		}
	}
`;

export const GET_ALL_HABITS = gql`
	query getAllHabits($offset: Int, $limit: Int) {
		getAllHabits(offset: $offset, limit: $limit) {
			habits {
				_id
				title
				description
				countDate
				startDate
				limitDate
				starUser {
					_id
				}
				creator {
					_id
					username
					imageUrl
				}
			}
			pageInfo {
				startCursor
				endCursor
				hasNextPage
			}
		}
	}
`;
export const GET_USER_HABITS = gql`
	query getUserHabits($offset: Int, $limit: Int) {
		getUserHabits(offset: $offset, limit: $limit) {
			habits {
				_id
				title
				description
				countDate
				startDate
				limitDate
				unit
				isTimeRecord
				updateDate
				starUser {
					_id
				}
				creator {
					_id
					username
					imageUrl
				}
			}
			pageInfo {
				startCursor
				endCursor
				hasNextPage
			}
		}
	}
`;
export const GET_HABIT = gql`
	query getHabit($_id: ID!) {
		getHabit(_id: $_id) {
			_id
			title
			description
			countDate
			startDate
			limitDate
			createdAt
			numberOfFailure
			unit
			isTimeRecord
			updateDate
			starUser {
				_id
			}
			creator {
				_id
				username
				imageUrl
				joinDate
			}
		}
	}
`;

export const GET_HABIT_RECORDS = gql`
	query getHabitRecords($_id: ID!, $limit: Int!) {
		getHabitRecords(_id: $_id, limit: $limit) {
			_id
			date
			total
			habitId
			today
		}
	}
`;
export const GET_HABIT_TIMERECORDS = gql`
	query getHabitTimeRecords($_id: ID!, $limit: Int!) {
		getHabitTimeRecords(_id: $_id, limit: $limit) {
			_id
			date
			total
			habitId
			today
		}
	}
`;

export const CREATE_USER = gql`
	mutation createUser($username: String!, $email: String!, $password: String!) {
		createUser(username: $username, email: $email, password: $password) {
			token
		}
	}
`;

export const LOGIN = gql`
	mutation login($email: String!, $password: String!) {
		login(email: $email, password: $password) {
			token
		}
	}
`;
