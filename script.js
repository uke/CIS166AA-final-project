/* CIS166AA 43172 Robert Bartlett 2013-05-07 Final Project */

/* helper function for getting elements by Id */
var $ = function(Id) {
		return document.getElementById(Id);
	}
	/*********************************************************
	 * field validators
	 * lots of validation logic lifted from Javascript
	 * textbook, with slight rearrangement.
	 *********************************************************/
	/* validate the name field */
var validate_name = function() {
		$('name_msg').style.visibility = 'hidden';	// hide the error message
		var name = $('name_in');					// get the name value
		if (name.value.length == 0) {				// gotta be > 0
			$('name_msg').innerHTML = "Name is a required field"	// fill in error
			$('name_msg').style.visibility = 'visible';				// make it visible
			return false;											// false tells caller a validation has failed
		}

		return true;	// no error on name field
	}

	/* validate the email field */
var validate_email = function() {
		var text = $('email_in').value;
		var msg = $('email_msg');
		msg.style.visibility = "visible";

		if (text.length == 0) {								// email is required
			msg.innerHTML = "Email is a required field";
			return false;
		}

		var parts = text.split("@");						// make sure length is not totally wacky
		if (parts.length != 2 || parts[0].length > 64 || parts[1].length > 255) {
			msg.innerHTML = "Email length is invalid";
			return false;
		}
		
		// verify email format is correct, e.g. foo.bar@sample.com
		var address = "(^[\\w!#$%&'*+/=?^`{|}~-]+(\\.[\\w!#$%&'*+/=?^`{|}~-]+)*$)"; // crazy regex. wheeee!
		var quotedText = "(^\"(([^\\\\\"])|(\\\\[\\\\\"]))+\"$)";
		var localPart = new RegExp(address + "|" + quotedText);
		if (!parts[0].match(localPart)) {
			msg.innerHTML = "Email address format is invalid";
			return false;
		}
		
		// verify domain
		var hostnames = "(([a-zA-Z0-9]\\.)|([a-zA-Z0-9][-a-zA-Z0-9]{0,62}[a-zA-Z0-9]\\.))+";
		var tld = "[a-zA-Z0-9]{2,6}";
		var domainPart = new RegExp("^" + hostnames + tld + "$");

		if (!parts[1].match(domainPart)) {
			msg.innerHTML = "Email host format is invalid";
			return false;
		}

		msg.style.visibility = "hidden"; // no errors, hide the message
		return true;
	}

	/* validate the telephone field */
var validate_phone = function() {
		var text = $('phone_in').value;
		var msg = $('phone_msg');
		msg.style.visibility = "visible";

		if (text.length == 0) {
			msg.innerHTML = "Phone is a required field";
			return false;
		}

		if (!/^\d{3}-\d{3}-\d{4}$/.test(text)) {		// I love regular expressions
			msg.innerHTML = "Phone format is invalid. use aaa-ppp-ssss";
			return false;
		}

		msg.style.visibility = "hidden"; // no errors, hide the message
		return true;
	}

	/* validate the birthday field */
var validate_birthday = function() {
		var text = $('birthday_in').value;
		var msg = $('birthday_msg');
		msg.style.visibility = "visible";

		// validate date format
		if (!/^[01]?\d\/\d{1,2}\/\d{4}$/.test(text)) {
			msg.innerHTML = "Birthday format is invalid. use mm/dd/yyyy";
			return false;
		}

		// validate values of date parts are in reasonable range
		var dateParts = text.split("/");
		var month = parseInt(dateParts[0]);
		var day = parseInt(dateParts[1]);
		var year = parseInt(dateParts[2]);
		if (month < 1 || month > 12) {
			msg.innerHTML = "Month invalid. Use 1-12";
			return false;
		}
		// rudimentary day validation, ignoring leap years & short months. Bad code monkey. 
		// if I have time I'll do this properly
		if (day < 1 || day > 31) {
			msg.innerHTML = "Day invalid. Use 1-31";
			return false;
		}

		msg.style.visibility = "hidden"; // no errors, hide the message	
		return true;
	}
	/*********************************************************
	 * Misc functions
	 *********************************************************/
	/* drive validation of all fields */
var validate = function() {
		var summary = $('errorSummary');
		summary.style.visible = 'hidden';		// hide the summary pending validation

		var ok = true // if any of the validators fail, ok will be false
		ok = validate_name() ? ok : false;
		ok = validate_email() ? ok : false;
		ok = validate_phone() ? ok : false;
		ok = validate_birthday() ? ok : false;
		return ok;
	}

	/* initialize stuff when DOM is ready */
var domReady = function() {
		$('submit_button').onclick = submitClick;
	}

	/* user clicked the Submit button */
var submitClick = function() {
		if (validate()) {					// if any test fails, returned value is false.  Otherwise, returns true
			$('regForm').submit();			// passed all validation, submit
		} else {
			var summary = $('errorSummary');	
			summary.style.visibility = 'visible';	// make error summary visible
		}
	}

jsLib.dom.ready(domReady); // set up function to run when DOM is ready
