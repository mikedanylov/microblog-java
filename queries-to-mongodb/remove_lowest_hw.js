/*

Write a program in the language of your choice that will remove the lowest homework score for each student. Since there is a single document for each student containing an array of scores, you will need to update the scores array and remove the homework.

 */

conn = new Mongo();
db = conn.getDB("school");

var students = db.students.find(),
		current, min, rm_record, index, to_remove = false;

while (students.hasNext()) {
	
	current = students.next();
	min = 100;

	for (var i = 0; i < current.scores.length; i++) {
		if (current.scores[i].type === 'homework' && current.scores[i].score < min) {
			min = current.scores[i].score;
			rm_record = current.scores[i];
			index = current.scores.indexOf(rm_record);
			to_remove = true;
		}
	}

	printjson( { id : current._id, index: index, record : rm_record } );
	if (to_remove) {
		db.students.update( {_id : current._id }, { $pull: { scores: rm_record } } );
		to_remove = false;
	}

}
