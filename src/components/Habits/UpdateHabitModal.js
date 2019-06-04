import React, { useState } from "react";
import { Modal, Button, Icon, Input } from "semantic-ui-react";
import { Mutation } from "react-apollo";
import { UPDATE_HABIT } from "../../queries";
import { Pacman } from "./../shered/Loader";

const UpdateHabitModal = ({ closeModal, habit, open }) => {
	const [time, setTime] = useState(0);
	const [item, setItem] = useState(0);

	const handleUpdateHabit = (updateHabit, closeModal) => {
		updateHabit()
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
			mutation={UPDATE_HABIT}
			variables={{ _id: habit._id, today: +item, todayTime: +time }}
			// update={handleUpdateCache}
		>
			{(updateHabit, { data, loading, error }) => {
				if (loading) return <Pacman />;
				return (
					<Modal basic open={open} onClose={closeModal}>
						<Modal.Header>{habit.title}の更新</Modal.Header>
						<Modal.Content>
							{habit.title}の積み上げを更新しましょう！
							{habit.isTimeRecord ? (
								<Input
									fluid
									name="time"
									label="今日の積み上げ分数"
									iconPosition="left"
									placeholder="今日の積み上げ分数"
									onChange={event => setTime(event.target.value)}
									value={time}
									type="number"
									min={0}
									style={{ margin: "1em 0" }}
								/>
							) : null}
							<Input
								fluid
								name="item"
								iconPosition="left"
								label={`今日の積み上げ${habit.unit}数`}
								placeholder={`今日の積み上げ${habit.unit}数`}
								onChange={event => setItem(event.target.value)}
								value={item}
								type="number"
								min={0}
							/>
						</Modal.Content>
						<Modal.Actions>
							<Button
								disabled={loading}
								loading={loading}
								icon
								className={loading ? "loading" : ""}
								color="orange"
								size="large"
								onClick={() => handleUpdateHabit(updateHabit, closeModal)}
								inverted>
								<Icon name="external alternate" />
								積み上げ!
							</Button>
							<Button
								disabled={loading}
								className={loading ? "loading" : ""}
								color="red"
								icon
								size="large"
								onClick={closeModal}
								inverted>
								<Icon name="cancel" />
								キャンセル
							</Button>
						</Modal.Actions>
					</Modal>
				);
			}}
		</Mutation>
	);
};

export default UpdateHabitModal;
