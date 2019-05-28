var express = require('express');       // imports the express library
var router = express.Router();          // Router object for routes

var friendModel = require('./models/friends');

var pageGlobal = `
	<head>
		<!-- Required meta tags -->
		<meta charset="utf-8">
		<metahttp-equiv="X-UA-Compatible"content="IE=edge">
		<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
		<!-- Descriptor meta tags -->
		<title>Friend Information</title>
		<meta name="author" content="Chandler Stevens">
		<meta name="description" content="Displays info about friends.">
		<!-- Bootstrap CSS -->
		<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
	</head>
	<body>
			<table class="table table-striped" id="dbTable" name="dbTable">
				<thead>
					<tr>
	`

var segmentGlobal = `
					</tr>
				</thead>
			<tbody>`;

var footerGlobal = `
			</tbody>
		</table>
		<!-- Optional JavaScript -->
		<!-- jQuery first, then Popper.js, then Bootstrap JS -->
		<script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script>
		<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js" integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1" crossorigin="anonymous"></script>
		<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js" integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM" crossorigin="anonymous"></script>
	</body>`

// Need to figure out why is loading when site home page is requested
router.get('/api', function HomePageHandler(request, response) {
	response.sendFile("/" + "index.html");
	//response.sendFile(__dirname + "/" + "index.html");
});

router.post('/friends', function FriendsPostHandler(request, response) {
  friendModel.insert(
    request.body.birthDate,
    request.body.firstName,
    request.body.lastName,
    request.body.gender,
    request.body.phone,
    function DoneInserting(err, result) {
      if (err) {
        console.log("Some error inserting");
        console.log(err);
        response.write("Error Inserting");
      } else {
				console.log("Successfully inserted friend");
				let page = pageGlobal;
				let segment = segmentGlobal;
				let footer = footerGlobal;
				page += `
					<th scope="col">ID</th>
					<th scope="col">Birthday</th>
					<th scope="col">First Name</th>
					<th scope="col">Last Name</th>
					<th scope="col">Gender</th>
					<th scope="col">Phone Number</th>
					`
				page += segment;
				page += "<tr>";
				page += "<td>" + result + "</td>";
				page += "<td>" + request.body.birthDate + "</td>";
				page += "<td>" + request.body.firstName + "</td>";
				page += "<td>" + request.body.lastName + "</td>";
				page += "<td>" + request.body.gender + "</td>";
				page += "<td>" + request.body.phone + "</td>";
				page += "</tr>";
				page += footer
				response.send(page);
      }
	});
});

router.get('/friends', function FriendsGetHandler(request, response){
  friendModel.getAll(function DoneGettingAll(err, result, fields){
    if (err) {
      console.log("Some error selecting all");
      console.log(err);
      response.write("Error Getting All");
    } else {
      console.log("Successfully retrieved all records (100)");
			let page = pageGlobal;
			let segment = segmentGlobal;
			let footer = footerGlobal;
			page += `
				<th scope="col">ID</th>
				<th scope="col">Birthday</th>
				<th scope="col">First Name</th>
				<th scope="col">Last Name</th>
				<th scope="col">Gender</th>
				<th scope="col">Phone Number</th>
				`
			page += segment;
			for (var i = 0; i < result.length; i++) {
				var friend = result[i];
				page += "<tr>";
				for (var field in friend) {
					page += "<td>" + friend[field] + "</td>";
				}
				page += "</tr>";
			}
			page += footer
			response.send(page);
    }
  });
});

router.get('/:id', function FriendsGetByIdHandler(request, response){
  friendModel.findById(request.params.id, function DoneGettingById(err, result, fields){
    if (err) {
      console.log("Some error finding by id");
      console.log(err);
      response.write("Error finding by id");
    } else {
			console.log("Successfully found friend by ID");
			let page = pageGlobal;
			let segment = segmentGlobal;
			let footer = footerGlobal;
			page += `
				<th scope="col">ID</th>
				<th scope="col">Birthday</th>
				<th scope="col">First Name</th>
				<th scope="col">Last Name</th>
				<th scope="col">Gender</th>
				<th scope="col">Phone Number</th>
				`
			page += segment;
			for (var i = 0; i < result.length; i++) {
				var friend = result[i];
				page += "<tr>";
				for (var field in friend) {
					page += "<td>" + friend[field] + "</td>";
				}
				page += "</tr>";
			}
			page += footer
			response.send(page);
    }
  });
});

router.get('/friends/:name', function FriendsGetByNameHandler(request, response){
  friendModel.findByName(request.params.name, function DoneGettingByName(err, result, fields){
		if (err) {
	    console.log("Some error finding by name");
	    console.log(err);
	    response.write("Error finding by name");
		} else {
			console.log("Successfully found friend by name");
			let page = pageGlobal;
			let segment = segmentGlobal;
			let footer = footerGlobal;
			page += `
				<th scope="col">ID</th>
				<th scope="col">Birthday</th>
				<th scope="col">First Name</th>
				<th scope="col">Last Name</th>
				<th scope="col">Gender</th>
				<th scope="col">Phone Number</th>
				`
			page += segment;
			for (var i = 0; i < result.length; i++) {
				var friend = result[i];
				page += "<tr>";
				for (var field in friend) {
					page += "<td>" + friend[field] + "</td>";
				}
				page += "</tr>";
			}
			page += footer
			response.send(page);
		}
  });
});

router.put('/:id', function FriendsUpdateByIdHandler(request, response) {
  friendModel.updateById(
		request.body.friendID,
		request.body.birthDate,
    request.body.firstName,
    request.body.lastName,
    request.body.gender,
    request.body.phone,
    function DoneUpdatingById(err, result) {
      if (err) {
        console.log("Some error updating");
        console.log(err);
        response.write("Error Updating");
      } else {
				console.log("Successfully updated friend");
				let page = pageGlobal;
				let segment = segmentGlobal;
				let footer = footerGlobal;
				page += `
					<th scope="col">ID</th>
					<th scope="col">Birthday</th>
					<th scope="col">First Name</th>
					<th scope="col">Last Name</th>
					<th scope="col">Gender</th>
					<th scope="col">Phone Number</th>
					`
					page += segment;
					page += "<tr>";
					page += "<td>" + request.body.friendID + "</td>";
					page += "<td>" + request.body.birthDate + "</td>";
					page += "<td>" + request.body.firstName + "</td>";
					page += "<td>" + request.body.lastName + "</td>";
					page += "<td>" + request.body.gender + "</td>";
					page += "<td>" + request.body.phone + "</td>";
					page += "</tr>";
					page += footer
					response.send(page);
      }
    });
});

router.delete('/:id', function FriendsDeleteByIdHandler(request, response) {
	friendModel.deleteById(
		request.params.id,
		function DoneDeletingById(err, result, fields) {
	    if (err){
	      console.log("Some error deleting by id");
	      console.log(err);
	      response.write("Error deleting by id");
	    } else {
				console.log("Successfully deleted friend");
				response.send(`
					<head>
						<!-- Required meta tags -->
						<meta charset="utf-8">
						<metahttp-equiv="X-UA-Compatible"content="IE=edge">
						<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
						<!-- Descriptor meta tags -->
						<title>Friend Information</title>
						<meta name="author" content="Chandler Stevens">
						<meta name="description" content="Displays info about friends.">
						<!-- Bootstrap CSS -->
						<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
					</head>
					<body>
						<h2>Successfully deleted friend with ID = `+request.params.id+`</h2>
					</body>
				`);
	    }
  });
});

module.exports = router;
