console.log('hello');

$(document).ready( function() {

	$('#signup-form').on('submit', function(e) {
		e.preventDefault();
		var signupData = $("#signup-form").serialize();
			console.log(signupData);
		$.post('/users', signupData, function(response){
			console.log(response);
		})
	});
	$('#login-form').on('submit', function(e) {
		e.preventDefault();
		var formData = {
			email: $('#email-id').val(),
			password: $('#password-id').val()
		}
		$.ajax({
			url: '/sessions',
			method: "POST",
			data: formData,
			success: function (response) {
				window.location = '/editProfile'
			}
		})
	});

	$('#signup-form').on('submit', function (e) {
		window.location = '/login';
	});

	// $('#deleteBtn').on('click', function () {
	// 	console.log("delete button clicked");
	// 	$.ajax({
	// 		method: 'DELETE',
	// 		url: '/user/delete/' + $(this).attr('data-id'),
	// 		success: function (response) {
	// 			window.location.href = '/'
	// 		},
	// 	});
	// 	console.log($(this).attr('data-id'));
	// });
//--------------------------------------------------------

	var $placesFutureList = $('#placesFuture');
	var futureArray = [];

	var $placesPastList = $('#placesPast');
	var pastArray = [];

	$.ajax({
  		method: "GET",
  		url: '/profile/user',
  		success: userPlacesSuccess,
  		error: userPlacesError
	});

	$('#futurePlaceForm').on('submit', function(e) {
		e.preventDefault();

		let city = $('#inputCity').val();

		var formData = {
			city: $('#inputCity').val(),
			country: $('#inputCountry').val()
		}
		$.ajax({
			method: "PUT",
			url: '/profile',
			data: formData,
			success: newFuturePlaceSuccess,
			error: newFuturePlaceError
		});
	});

	$placesFutureList.on('click', '.removeBtn', function () {
		$.ajax({
			method: 'PUT',
			url: '/userRemovePlace',
			data:{removedPlace: $(this).attr('data-id')},
			success: removeFutureSuccess,
			error: removeFutureError
		});
	});

//THIS WILL BRING YOU TO THE MAP PAGE OF THE CITY CLICKED ON
//-----------------------------------------------------------
	$placesFutureList.on('click', '.mapButton', function (e) {
		e.preventDefault();
		let city = $(this).attr('data-id');

		$.ajax({
		method: "GET",
		url: "/tripMap/" + city,
		success: function () {
			window.location.href = '/tripMap/' + city;
		},
		error: tripMapError
		});
	});

	function tripMapError() {
		console.log("get map page error!!");
	}
//-----------------------------------------------------------



	function getPlaceHtml(placeDoc) {

			return `<div class="masterRow"
						<div class="row">
	  						<div class="col-sm-6 col-md-4 column">
	    						<div class="thumbnail">
	      							<img src="http://via.placeholder.com/300x250" alt="...">
	      							<div class="caption">
	        							<h3>${placeDoc.city}</h3>
	        							<p><a class="btn btn-primary mapButton" type="submit" role="button" data-id=${placeDoc.city}>See Map</a>
	        							<a class="btn btn-primary removeBtn" type="submit" role="button" data-id=${placeDoc._id}>Remove</a></p>
										<p>Have Fun!</p>
	      							</div>
	    						</div>
	  						</div>
						</div>
					</div>`; 
	}

	function getUserPlacesHtml(places) {
		return places.map(getPlaceHtml).join("");
	}

	function render () {
		$placesFutureList.empty();
		var placesHtml = getUserPlacesHtml(futureArray);
		$placesFutureList.append(placesHtml);
	}

	function userPlacesSuccess(json) {
		futureArray = json.place.placeDoc;
		console.log(futureArray);
		render();
	}

	function userPlacesError(e) {
		console.log('userPlacesError');
		$('#placesFuture').text('Failed to load future places, is the server working?')
	}



	function newFuturePlaceSuccess(json) {
		$('#inputCity').val('');
		futureArray = json.place.placeDoc;
		console.log(futureArray);
		render();
	}

	function newFuturePlaceError() {
		console.log('newFuturePlaceError');
	}



	function removeFutureSuccess(json) {
		futureArray = json.place.placeDoc;
		console.log(futureArray);
		render();
	}

	function removeFutureError () {
		console.log("couldn't delete ITEM!!!");
	}


//----------------------------------------------------


	// if (top.location.pathname === '/tripMap/:id') {




   
});



