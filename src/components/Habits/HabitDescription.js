import React, { useState } from "react";
import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts";
import { withRouter } from "react-router-dom";
import { Query } from "react-apollo";
import {
	GET_HABIT,
	GET_HABIT_RECORDS,
	GET_HABIT_TIMERECORDS
} from "../../queries";
import {
	Segment,
	Dropdown,
	Button,
	Grid,
	Label,
	Card,
	Image,
	Icon,
	Item,
	Divider
} from "semantic-ui-react";
import Loader from "./../shered/Loader";
import HighchartsTheme from "./Highcharts/HighchartsTheme";
import options from "./Highcharts/options";
import moment from "moment";
import StarButton from "./StarButton";

Highcharts.setOptions(HighchartsTheme);

const Options = [
	{
		key: 1,
		text: "過去7日間",
		value: 7
	},
	{
		key: 2,
		text: "過去28日間",
		value: 28
	},
	{
		key: 3,
		text: "過去3か月間",
		value: 90
	}
];

// const fromDateObjectToMoment = value => {
// 	return moment(value).format("MM月DD日");
// };

const createGraphData = (habitRecords, maxDays, unit = "分") => {
	const data = {};
	const categories = [];
	const firstData = [];
	const secondData = [];

	data.yTitle = unit;

	let count = 0;
	for (let j = 0; j < maxDays; j++) {
		const recordDay = moment(+habitRecords[count].date).format("YYYY-MM-DD");
		const today = habitRecords[count].today;
		const total = habitRecords[count].total;
		const day = moment()
			.add(-maxDays + j + 1, "days")
			.format("YYYY-MM-DD");
		categories.push(day);
		if (String(recordDay) === String(day)) {
			firstData.push(today);
			secondData.push(total - today);
			count++;
		} else {
			firstData.push(0);
			secondData.push(total - today);
		}
	}

	data.categories = categories;
	data.firstData = firstData;
	data.secondData = secondData;

	// data.categories = habitRecords.map(record => {
	// 	return fromDateObjectToMoment(+record.date);
	// });

	// data.firstData = habitRecords.map(record => {
	// 	return record.today;
	// });
	// data.secondData = habitRecords.map(record => {
	// 	return record.total - record.today;
	// });

	return data;
};

const HabitDescription = ({ match }) => {
	const { _id } = match.params;
	const [days, setDays] = useState(7);

	return (
		<Query query={GET_HABIT} variables={{ _id }}>
			{({ data, loading, error }) => {
				if (loading) return <Loader />;
				const { getHabit } = data;
				// createDate(getHabit);
				return (
					<Grid textAlign="center" centered stackable container>
						<Grid.Row>
							<Grid.Column computer={4} mobile={6}>
								<Card style={{ margin: "0 auto" }}>
									<Card.Content>
										<Image
											floated="right"
											size="mini"
											src={getHabit.creator.imageUrl}
										/>
										<Card.Header>
											作成者 : {getHabit.creator.username}
										</Card.Header>
										<Card.Meta>参加日 : {getHabit.creator.joinDate}</Card.Meta>
										<Card.Description>TODO:一言 </Card.Description>
									</Card.Content>
									<Card.Content extra>
										<Button
											color="green"
											icon="right arrow"
											content="もっと詳しく"
											labelPosition="right"
											fluid
										/>
									</Card.Content>
								</Card>
							</Grid.Column>
							<Grid.Column computer={12} mobile={16}>
								<Segment.Group>
									<Segment attached="top">
										<Item.Group>
											<Item>
												<Item.Content>
													<Item.Header>タイトル : {getHabit.title}</Item.Header>
													<Item.Description>
														説明 : {getHabit.description}
													</Item.Description>
												</Item.Content>
												<Label
													style={{ marginTop: "1.5em" }}
													ribbon="right"
													color="orange"
													content={`${getHabit.countDate} 日間継続中`}
												/>
											</Item>
										</Item.Group>
									</Segment>
									<Segment>
										<Icon name="clock" />
										習慣が登録された日 :{" "}
										{moment(+getHabit.createdAt).format("YYYY-MM-DD")}
										<Divider />
										<Icon name="play" />
										習慣を新しく始めた日 :{" "}
										{moment(+getHabit.startDate).format("YYYY-MM-DD")}
										<Divider />
										<Icon name="redo" />
										挫折した回数 : {getHabit.numberOfFailure}
										<Divider />
										<Grid>
											<Grid.Column width={6} floated="left">
												<Icon name="star" color="yellow" />
												応援の星 : {getHabit.starUser.length}
											</Grid.Column>
											<Grid.Column computer={5} floated="right" mobile={9}>
												<StarButton habit={getHabit} />
											</Grid.Column>
										</Grid>
										<Divider />
										<Button
											as="a"
											color="twitter"
											href="https://twitter.com/share?ref_src=twsrc%5Etfw">
											<script
												async
												src="https://platform.twitter.com/widgets.js"
												charSet="utf-8"
											/>
											<Icon name="twitter" />
											Twitterでシェア
										</Button>
									</Segment>
								</Segment.Group>
							</Grid.Column>
						</Grid.Row>

						<Grid.Row>
							{getHabit.isTimeRecord ? (
								<Grid.Column computer={8} mobile={16}>
									<Dropdown
										selection
										onChange={(event, { value }) => setDays(value)}
										options={Options}
										value={days}
										style={{ margin: "1em 0" }}
									/>
									<Query
										query={GET_HABIT_TIMERECORDS}
										variables={{ _id, limit: days }}>
										{({ data, loading }) => {
											if (loading) return <div>loading</div>;
											const { getHabitTimeRecords } = data;
											const optionData = createGraphData(
												getHabitTimeRecords,
												days
											);
											optionData.title = getHabit.title;
											return (
												<HighchartsReact
													highcharts={Highcharts}
													options={options(optionData)}
												/>
											);
										}}
									</Query>
								</Grid.Column>
							) : null}
							<Grid.Column computer={8} mobile={16}>
								<Dropdown
									selection
									onChange={(event, { value }) => setDays(value)}
									options={Options}
									value={days}
									style={{ margin: "1em 0" }}
								/>
								<Query
									query={GET_HABIT_RECORDS}
									variables={{ _id, limit: days }}>
									{({ data, loading }) => {
										if (loading) return <div>loading</div>;
										const { getHabitRecords } = data;
										const optionData = createGraphData(
											getHabitRecords,
											days,
											getHabit.unit
										);
										optionData.title = getHabit.title;

										return (
											<HighchartsReact
												highcharts={Highcharts}
												options={options(optionData)}
											/>
										);
									}}
								</Query>
							</Grid.Column>
						</Grid.Row>
					</Grid>
					//TODO:userCommentsの実装
				);
			}}
		</Query>
	);
};

export default withRouter(HabitDescription);
