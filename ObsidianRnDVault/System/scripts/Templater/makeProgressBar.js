module.exports = (
	numerator,
	denominator,
	size = 50,
	filledChar = "█",
	unFilledChar = "◽",
	label = "",
) => {
	const percentage = numerator / denominator;
	const maxBlocks = size;
	const numFilled = Math.floor(percentage * maxBlocks);
	return `${label}: [${filledChar.repeat(numFilled)}${unFilledChar.repeat(
		maxBlocks - numFilled,
	)}] ${Math.floor(percentage * 100)}% ( ${numerator}/${denominator} )`;
};
