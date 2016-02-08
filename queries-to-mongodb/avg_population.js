/*

Please calculate the average population of cities in California (abbreviation CA) and New York (NY) (taken together) with populations over 25,000

 */

db.zips.aggregate([
	{ $match:
		{
			state: 'CA', state: 'NY',
			pop: { $gt: 25000 }
		}
	},
	{ $group:
		{
			_id: null,
			population: { $avg: '$pop' }
		}
	},
	{ $limit: 1 }
]);
