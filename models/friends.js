var db = require('../db');

exports.insert = function InsertHandler(birthDate, firstName, lastName, gender, phone, done){
    //var values = [new Date(birthDate).toISOString(), firstName, lastName, gender, phone];
    var values = [new Date(birthDate).toISOString().slice(0, 19).replace('T', ' '), firstName, lastName, gender, phone];
    //var values = [birthDate, firstName, lastName, gender, phone];
    db.get().query(
        'INSERT INTO friends (birth_date, first_name, last_name, gender, phone) ' +
        'VALUES (?,?,?,?,?)', values, function InsertQueryHandler(err, result){
            if (err)
                return done(err);
						console.log("Friend "+firstName+" added to DB");
            done(null, result.insertId);
        });
}

exports.getAll = function GetAllHandler(done){
    db.get().query(
        'SELECT * FROM friends LIMIT 100', function SelectQueryHandler(err, result, fields){
            if (err)
                return done(err);
						console.log("All friends found in DB");
            done(null, result, fields);
        });
}

exports.findById = function FindByIdHandler(id, done){
    db.get().query(
        'SELECT * FROM friends WHERE friend_id = ?', id,
        function SelectQueryHandler(err, result, fields){
            if (err)
                return done(err);
						console.log("Friend "+id+" found in DB");
        		done(null, result, fields);
        });
}

exports.findByName = function FindByNameHandler(name, done){
    db.get().query(
        'SELECT * FROM friends WHERE first_name = ?', name,
        function SelectQueryHandler(err, result, fields){
            if (err)
                return done(err);
						console.log("Friend "+name+" found in DB");
            done(null, result, fields);
        });
}

exports.updateById = function UpdateByIdHandler(id, birthDate, firstName, lastName, gender, phone, done){
	db.get().query('UPDATE friends SET birth_date = ?, first_name = ?, last_name = ?, gender = ?, phone = ? WHERE friend_id = ?',
		[birthDate, firstName, lastName, gender, phone, id],
		function UpdateQueryHandler(err, result){
			if (err)
				return done(err);
			console.log("Friend "+id+" updated in DB");
			done(null, result.affectedRows);
		}
	);
}

exports.deleteById = function DeleteByIdHandler(id, done){
	db.get().query(
	  'DELETE FROM friends WHERE friend_id = ?', id,
	  function DeleteQueryHandler(err, result){
	    if (err)
	    	return done(err);
			console.log("Friend "+id+" deleted from DB");
	    done(null, result.affectedRows);
	  });
}
