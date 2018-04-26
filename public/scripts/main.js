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

//-----------------------------------------------------------

	function getPlaceHtml(placeDoc) {
		return `
		    <div class="row album">

		      <div class="col-md-10 col-md-offset-1">
		        <div class="panel panel-default">
		          <div class="panel-body">

		            <div class='row map1 map2 map3 map4'>

		              <div id='map'class="col-md-3 col-xs-12 thumbnail">
		               
		              </div>

		              <div class="col-md-9 col-xs-12">
		                <ul class="list-group">
		                  <li class="list-group-item">
		                    <h4 class='inline-header'>City Name:</h4>
		                    <span class='city-name'>${placeDoc.city}</span>
		                  </li>

		                  <li class="list-group-item">
		                    <h4 class='inline-header'>Country Name:</h4>
		                    <span class='country-name'>${placeDoc.country}</span>
		                  </li>
		                </ul>
		              </div>
					  
		            </div>
		          </div>
		        </div>
		      </div>
		    </div>`;
		 console.log(user);
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



