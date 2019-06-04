import React from "react";
import { Modal, Button, Icon } from "semantic-ui-react";
import { Mutation } from "react-apollo";
import { RESET_COUNT } from "../../queries";
import Loader from "./../shered/Loader";

const ResetCountModal = ({ closeModal, habit, open }) => {
	const handleResetCount = (resetCount, closeModal) => {
		resetCount()
			.then(data => {
				closeModal();
			})
			.catch(err => {
				console.log(err);
				closeModal();
			});
	};

	// const handleUpdateCache = (cache, { data: { deleteHabit } }) => {
	// 	const data = cache.readQuery({
	// 		query: GET_USER_HABITS,
	// 		variables: { offset: 0, limit: 5 }
	// 	});
	// 	console.log(data);
	// 	console.log(deleteHabit);
	// 	const newHabits = data.getUserHabits.habits.filter(
	// 		habit => habit._id !== deleteHabit._id
	// 	);
	// 	console.log(newHabits);
	// 	cache.writeQuery({
	// 		query: GET_USER_HABITS,
	// 		variables: { offset: 0, limit: 5 },
	// 		data: {
	// 			...data,
	// 			getUserHabits: {
	// 				...data.getUserHabits,
	// 				habits: newHabits,
	// 				pageInfo: data.getUserHabits.pageInfo
	// 			}
	// 		}
	// 	});
	// };

	return (
		<Mutation
			mutation={RESET_COUNT}
			variables={{ _id: habit._id }}
			// update={handleUpdateCache}
		>
			{(resetCount, { data, loading, error }) => {
				if (loading) return <Loader />;
				return (
					<Modal basic open={open} onClose={closeModal}>
						<Modal.Header>継続日数リセットの確認</Modal.Header>
						<Modal.Content>
							{habit.title}の継続日数をリセットしてよろしいですか？
						</Modal.Content>
						<Modal.Actions>
							<Button
								color="red"
								inverted
								onClick={() => handleResetCount(resetCount, closeModal)}>
								<Icon name="checkmark" />
								リセット
							</Button>
							<Button color="orange" inverted onClick={closeModal}>
								<Icon name="remove" />
								キャンセル
							</Button>
						</Modal.Actions>
					</Modal>
				);
			}}
		</Mutation>
	);
};

export default ResetCountModal;
