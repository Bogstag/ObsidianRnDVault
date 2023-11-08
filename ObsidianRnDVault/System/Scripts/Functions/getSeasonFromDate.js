module.exports = (dateString) => {
	const d = moment(dateString, "YYYY-MM-DD");

	const seasonArray = [
		{
			name: "Spring",
			date: moment([d.year(), 2, d.isLeapYear() ? 19 : 20]).valueOf(),
		},
		{
			name: "Summer",
			date: moment([d.year(), 5, d.isLeapYear() ? 20 : 21]).valueOf(),
		},
		{
			name: "Autumn",
			date: moment([d.year(), 8, d.isLeapYear() ? 22 : 23]).valueOf(),
		},
		{
			name: "Winter",
			date: moment([d.year(), 11, d.isLeapYear() ? 20 : 21]).valueOf(),
		},
	];

	const season = seasonArray
		.filter(({ date }) => date <= d.valueOf())
		.slice(-1)[0] || { name: "Winter" };
	//return { date: d.format("YYYY-MM-DD"), season: season.name };
	return season.name;
};
