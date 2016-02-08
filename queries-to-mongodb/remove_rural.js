/*

Removing Rural Residents
In this problem you will calculate the number of people who live in a zip code in the US where the city starts with a digit.

 */

db.zips.aggregate([
	{ 
		$project: {
			first_char: { $substr: ['$city', 0, 1] },
			pop: 1
		}
	},
	{ $match: { first_char: { $lt: 'A' } } },
	{ $sort: { first_char: 1} },
	{ $group: {
			_id: null,
			population: { $sum: '$pop' }
		}
	}
]);
