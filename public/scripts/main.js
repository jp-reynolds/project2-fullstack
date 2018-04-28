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


//-----------------------------------------------------------
	$placesFutureList.on('click', '.mapButton', function (e) {
		e.preventDefault();
		let city = $(this).attr('data-id');
		$.ajax({
		method: "GET",
		url: "/tripMap/" + city,
		success: function () {
			window.location = '/tripMap/' + city;
		},
		error: tripMapError
		});
	});


	// $placesFutureList.on('click', '.mapButton', function (e) {
	// 	e.preventDefault();
	// 	$.ajax({
	// 	method: "POST",
	// 	url: "/tripMap",
	// 	data: {placeOnMap: $(this).attr('data-id')},
	// 	success: placeMapSuccess,
	// 	error: placeMapError
	// 	});
	// 	console.log("data from button " + $(this).attr('data-id'));
	// });


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
		$('#futurePlaceForm').val('');
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
	var $mapCityName = $('#mapCityName');



	function tripMapError() {
		console.log("get map page error!!");
	}

	// function placeMapSuccess(json) {
	// 	// window.location.href = '/tripMap';
	// 	console.log(json);
	// }

	// function placeMapError() {
	// 	console.log("get cityName error!!");
	// }



	if (top.location.pathname === '/tripMap') {
		

	

	function geocode(city){
		let cityName = Prague;

		$.ajax({
			method: "GET",
			url: 'https://maps.googleapis.com/maps/api/geocode/json',
			data: {
				address: cityName,
				key: "AIzaSyDKzL9i_mBzOIhycihjJQ15j7Z4UakLa6o"
		},
	 		 success: geocodeSuccess,
	 		 error: geocodeError
		});

		function geocodeSuccess (response) {
	  		console.log(response);
		}
		function geocodeError (error) {
	  		console.log(error);
		}
	}

    // function initMap() {

    //     var location = new google.maps.LatLng(50.0875726, 14.4189987);

    //     var mapCanvas = document.getElementById('map');
    //     var mapOptions = {
    //         center: location,
    //         zoom: 5,
    //         panControl: false,
    //         mapTypeId: google.maps.MapTypeId.ROADMAP
    //     }
    //     var map = new google.maps.Map(mapCanvas, mapOptions);

    // }



    // google.maps.event.addDomListener(window, 'load', initMap);
   }
});



