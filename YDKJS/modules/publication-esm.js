function printDetails(title, author, pubDate) {
	console.log(`
		Title: ${ title }
		Author: ${ author }
		${ pubDate }
	`);
}

export function create(title, author, pubDate) {
	var publicAPI = {
		print() {
			printDetails(title, author, pubDate);
		}
	};

	return publicAPI;
}
