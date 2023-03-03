import { create as newBlogPost } from './blogpost-esm.js';

var forAgainstLet = newBlogPost(
	'For and against let',
	'Kyle Simpson',
	'July 14 2028',
	'https://davidwalsh.name/for-and-against-let'
);

forAgainstLet.print();
