function Publication(title, author, pubDate) {
	var publicAPI = {
		print() {
			console.log(`
				Title: ${ title }
				By: ${ author }
				${ pubDate }
			`);
		}
	};

	return publicAPI;
}

function Book(bookDetails) {
	var pub = Publication(
		bookDetails.title,
		bookDetails.author,
		bookDetails.publishedOn
	);

	var publicAPI = {
		print() {
			pub.print();
			console.log(`
				Publisher: ${ bookDetails.publisher }
				ISBN: ${ bookDetails.ISBN }
			`);
		}
	};

	return publicAPI;
}

	
function BlogPost(title, author, pubDate, URL) {
	var pub = Publication(title, author, pubDate);

	var publicAPI = {
		print() {
			pub.print();
			console.log(`URL: ${ URL }`);
		}
	};

	return publicAPI;
}

var YDKJS = Book({
	title: "You don't know Javascript",
	author: 'Kyle Simpson',
	publishedOn: 'June 2014',
	publisher: "O'Reilly",
	ISBN: '1234567-890',
});

YDKJS.print();

var forAgainstLet = BlogPost(
	'For and against let',
	'Kyle Simpson',
	'Jun 24 2014',
	'https://davidwalsh.name/for-and-against-let'
);

forAgainstLet.print();
