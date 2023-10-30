module.exports = (str) => {
	const lastIndex = str.lastIndexOf("/"); // If no slash is found, return the whole string as the second part
	if (lastIndex === -1) {
		return [null, str];
	}
	const firstPart = str.substring(0, lastIndex);
	const secondPart = str.substring(lastIndex + 1);
	return [firstPart, secondPart];
};
