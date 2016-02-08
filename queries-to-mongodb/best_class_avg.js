/*

Your task is to calculate the class with the best average student performance. This involves calculating an average for each student in each class of all non-quiz assessments and then averaging those numbers to get a class average. To be clear, each student's average includes only exams and homework grades. Don't include their quiz scores in the calculation.

 */

db.grades.aggregate([
	{ $unwind: '$scores'},
	{
		$match: {
			'scores.type': 'exam',
			'scores.type': 'homework'
		}
	},
	{
		$group: {
			_id: '$class_id',
			avg_grade: { $avg: '$scores.score' }
		}
	}, { $sort: { avg_grade: -1 } },
	{ $limit: 1}
]);
