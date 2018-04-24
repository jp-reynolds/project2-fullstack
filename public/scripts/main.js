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
});