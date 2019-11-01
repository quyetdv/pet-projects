$(function() {
// CSS
	$(".txtb input").on("focus",function(){
		$(this).addClass("focus");
	});

	$(".txtb input").on("blur",function(){
		if($(this).val() == "")
			$(this).removeClass("focus");
	});

// Show n Hide Password
	$(".hide-show-pwd").click(function() {
		$(this).toggleClass("fa-eye fa-eye-slash");
		var input = $($(this).attr("toggle"));
		if (input.attr("type") == "password") {
			input.attr("type", "text");
		} else {
			input.attr("type", "password");
		}
	});

 //Validate Form
  	
	$('.form-control').on('input', function() {
		if (this.id === 'email') {
			if (!/^.+@[^\.].*\.[a-z]{2,}$/.test($('#email').val())) {
				$('#email_error').addClass('error').removeClass('correct').html('Email is invalid');
				event.preventDefault();
			}
			else {
				$('#email_error').addClass('correct').removeClass('error').html('Email is Valid');
				event.preventDefault();
			}
		} else if (this.id === "password-field") {
			if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d.*)(?=.*\W.*)[a-zA-Z0-9\S]{8,15}$/.test($('#password-field').val())) {
				$('#pwd_error').addClass('error').removeClass('correct').html('Password length 8 - 15 characters, at least one uppercase letter, one lowercase letter, one&nbsp;number, one special character, space is not&nbsp;allowed');
				event.preventDefault();
			}
			else {
				$('#pwd_error').addClass('correct').removeClass('error').html('Password is invalid');
				event.preventDefault();
			}
		} else if (this.id === "repassword-field") {
			if ($('#repassword-field').val() != $('#password-field').val()) {
				$('#repwd_error').addClass('error').removeClass('correct').html('Confirm Password is invalid');
				event.preventDefault();
			}
			else {
				$('#repwd_error').addClass('correct').removeClass('error').html('Confirm Password is Valid');
				event.preventDefault();
			}
		} else if (this.id === "phone") {
			if (!/((09|03|07|08|05)+([0-9]{8})\b)/g.test($('#phone').val())) {
				$('#phone_error').addClass('error').removeClass('correct').html('Phone Number is invalid');
				event.preventDefault();
			}
			else {
				$('#phone_error').addClass('correct').removeClass('error').html('Phone Number is invalid');
				event.preventDefault();
			}
		} else if (this.id === "newPassword") {
			if ($('#newPassword').val() == $('#password-field').val()) {
				$('#newPwd_error').addClass('error').removeClass('correct').html('Password must differ from old password.');
				event.preventDefault();
			} else if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d.*)(?=.*\W.*)[a-zA-Z0-9\S]{8,15}$/.test($('#newPassword').val())) {
				$('#newPwd_error').addClass('error').removeClass('correct').html('Password is invalid');
			} else {
				$('#newPwd_error').addClass('correct').removeClass('error').html('Password is Valid');
			}
		} else if (this.id === "reNewPassword") {
			if ($('#reNewPassword').val() != $('#newPassword').val()) {
				$('#reNewPwd_error').addClass('error').removeClass('correct').html('Confirm New Password is invalid');
				event.preventDefault();
			} else {
				$('#reNewPwd_error').addClass('correct').removeClass('error').html('Confirm New Password is Valid');
			}
		}
	});

  	$('.form-control').on('blur click', function() {
		$(this).parent().parent().next().removeClass('error correct').html('');
	});
// Index.html
	$('.login-form').on('submit', function(event) {				
		if (!$('#email').val() || !/^.+@[^\.].*\.[a-z]{2,}$/.test($('#email').val())) {
			$('#email_error').addClass('error').removeClass('correct').html('Email is invalid');
  			event.preventDefault();
		}
		if (!$('#password-field').val() || !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d.*)(?=.*\W.*)[a-zA-Z0-9\S]{8,15}$/.test($('#password-field').val())) {
			$('#pwd_error').addClass('error').removeClass('correct').html('Password length 8 - 15 characters, at least one uppercase letter, one lowercase letter, one&nbsp;number, one special character, space is not&nbsp;allowed');;
  			event.preventDefault();
		}
	});
// sgup.html
	$('.sgupbtn').on('click', function(event) {
		if (!$('#firstName').val()) {
			$('#name1_error').addClass('error').removeClass('correct').html('First Name is invalid');
  			event.preventDefault();
		}
		if (!$('#lastName').val()) {
			$('#name2_error').addClass('error').removeClass('correct').html('Last Name is invalid');
  			event.preventDefault();
		}
		if (!$('#phone').val() || !/((09|03|07|08|05)+([0-9]{8})\b)/g.test($('#phone').val())) {
			$('#phone_error').addClass('error').removeClass('correct').html('Phone Number is invalid');
  			event.preventDefault();
		}
				
		if (!$('#email').val() || !/^.+@[^\.].*\.[a-z]{2,}$/.test($('#email').val())) {
			$('#email_error').addClass('error').removeClass('correct').html('Email is invalid');
  			event.preventDefault();
		}
		if (!$('#password-field').val() || !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d.*)(?=.*\W.*)[a-zA-Z0-9\S]{8,15}$/.test($('#password-field').val())) {
			$('#pwd_error').addClass('error').removeClass('correct').html('Password is Valid');;
  			event.preventDefault();
		}
		if (!$('#repassword-field').val() || ($('#repassword-field').val() != $('#password-field').val())) {
			$('#repwd_error').addClass('error').removeClass('correct').html('Confirm Password is invalid');;
  			event.preventDefault();
		}
		if ($('#firstName').val() && $('#lastName').val() && (/((09|03|07|08|05)+([0-9]{8})\b)/g.test($('#phone').val())) && (/^.+@[^\.].*\.[a-z]{2,}$/.test($('#email').val())) && (/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d.*)(?=.*\W.*)[a-zA-Z0-9\S]{8,15}$/.test($('#password-field').val())) && ($('#repassword-field').val() == $('#password-field').val())) {
			$('#msg').addClass('show');
			setTimeout(function() {
				$('#msg').removeClass('show');
			},3000)
		}
	});
// resetpwd.html
	$('.resetbtn').on('click', function(event) {
		if (!$('#password-field').val() || !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d.*)(?=.*\W.*)[a-zA-Z0-9\S]{8,15}$/.test($('#password-field').val())) {
			$('#pwd_error').addClass('error').removeClass('correct').html('Password is Valid');;
  			event.preventDefault();
		}
		if (!$('#newPassword').val() || ($('#newPassword').val() == $('#password-field').val())) {
			$('#newPwd_error').addClass('error').removeClass('correct').html('New Password is invalid');;
  			event.preventDefault();
		}
		if (!$('#reNewPassword').val() || ($('#reNewPassword').val() != $('#newPassword').val())) {
			$('#reNewPwd_error').addClass('error').removeClass('correct').html('Confirm New Password is invalid');;
  			event.preventDefault();
		}
		
		if ((/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d.*)(?=.*\W.*)[a-zA-Z0-9\S]{8,15}$/.test($('#password-field').val())) && ($('#newPassword').val() != $('#password-field').val()) && (/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d.*)(?=.*\W.*)[a-zA-Z0-9\S]{8,15}$/.test($('#newPassword').val())) && ($('#reNewPassword').val() == $('#newPassword').val()) ) {
			$('#msg').addClass('show');
			setTimeout(function() {
				$('#msg').removeClass('show');
			},3000)
		}
	}); 
// forgetpwd.html
	 $('.fgtbtn').on('click', function(event) {
		if (!$('#email').val() || !/^.+@[^\.].*\.[a-z]{2,}$/.test($('#email').val())) {
			$('#email_error').addClass('error').removeClass('correct').html('Email is invalid');
  			event.preventDefault();
		}
		
		if ((/^.+@[^\.].*\.[a-z]{2,}$/.test($('#email').val()))) {
			$('#msg').addClass('show');
			setTimeout(function() {
				$('#msg').removeClass('show');
			},3000)
		}
	}); 
});