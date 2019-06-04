const options = data => {
	return {
		chart: {
			type: "column"
		},

		title: {
			text: `${data.title} (${data.yTitle})`
		},
		// subtitle: {
		// 	text: "aaaa"
		// },
		xAxis: {
			categories: data.categories
		},
		yAxis: {
			min: 0,
			title: {
				text: `積み上げ${data.yTitle}数`
			},
			stackLabels: {
				enabled: true
			}
		},
		legend: {
			align: "right",
			x: -30,
			verticalAlign: "top",
			y: 25
		},
		tooltip: {
			headerFormat: "<b>{point.x}</b><br/>",
			pointFormat: "{series.name}: {point.y}<br/>Total: {point.stackTotal}"
		},
		plotOptions: {
			column: {
				stacking: "normal",
				dataLabels: {
					enabled: true
					// color: (Highcharts.theme && Highcharts.theme.dataLabelsColor) || "white"
				}
			}
		},
		series: [
			{
				name: "今日",
				data: data.firstData
			},
			{
				name: "合計",
				data: data.secondData
			}
		]
	};
};

export default options;
