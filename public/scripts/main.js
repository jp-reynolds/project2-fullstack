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
				window.location = '/profile'
			}
		})
	});


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
//-----------------------------------------------------------
	$placesFutureList.on('click', '.mapButton', function (e) {
		e.preventDefault();
		$.ajax({
		method: "GET",
		url: "/tripMap",
		data: $('.mapButton').attr('data-id'),
		success: tripMapSuccess,
		error: tripMapError
		});
		console.log("data from button " + $('.mapButton').attr('data-id'));
	});
//-----------------------------------------------------------

	function getPlaceHtml(placeDoc) {
		console.log(placeDoc._id + " this is the _id");
		console.log(placeDoc + " this is just placeDoc");
		return `
		<div class="masterRow"
			<div class="row">
  				<div class="col-sm-6 col-md-4 column">
    				<div class="thumbnail">
      					<img src="http://via.placeholder.com/300x250" alt="...">
      					<div class="caption">
        					<h3>${placeDoc.city}</h3>
        					<p>...</p>
        					<p><a class="btn btn-primary mapButton" type="submit" role="button" data-id=${placeDoc._id}>See Map</a></p>
      					</div>
    				</div>
  				</div>
			</div>
		</div>`;
	}


	function getUserPlacesHtml(places) {
		return places.map(getPlaceHtml).join("");
		console.log("places is " + places)
	}

	function render () {
		$placesFutureList.empty();
		var placesHtml = getUserPlacesHtml(futureArray);
		$placesFutureList.append(placesHtml);
	};

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

	function tripMapSuccess() {
		window.location.href = '/tripMap';
	}

	function tripMapError() {
		console.log("get map page error!!");
	}


    function initMap() {

        var location = new google.maps.LatLng(50.0875726, 14.4189987);

        var mapCanvas = document.getElementById('map');
        var mapOptions = {
            center: location,
            zoom: 5,
            panControl: false,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        }
        var map = new google.maps.Map(mapCanvas, mapOptions);

    }

    google.maps.event.addDomListener(window, 'load', initMap);
});



