/* helper function for getting elements by Id */
var $ = function(Id) {
		return document.getElementById(Id);
	}
/*********************************************************
* field validators
*********************************************************/	
/* validate the name field */	
var validate_name = function() {
	$('name_msg').style.visibility = 'hidden';
	var name = $('name_in');
	if (name.value.length == 0) {
		$('name_msg').innerHTML = "Name is a required field"
		$('name_msg').style.visibility = 'visible';
		return false;
		}

	return true;
	}

/* validate the email field */
var validate_email = function() {
	var text = $('email_in').value;
	var msg = $('email_msg');
	msg.style.visibility = "visible";
	
    if (text.length == 0) 
	{
		msg.innerHTML = "Email is a required field";
		return false;
	}
	
    var parts = text.split("@");
    if (parts.length != 2  || parts[0].length > 64 || parts[1].length > 255) 
	{
		msg.innerHTML = "Email length is invalid";
		return false;
	}

    var address =
        "(^[\\w!#$%&'*+/=?^`{|}~-]+(\\.[\\w!#$%&'*+/=?^`{|}~-]+)*$)";
    var quotedText = "(^\"(([^\\\\\"])|(\\\\[\\\\\"]))+\"$)";
    var localPart = new RegExp( address + "|" + quotedText );
    if ( !parts[0].match(localPart) ) 
{
		msg.innerHTML = "Email address format is invalid";
		return false;
}

    var hostnames =
        "(([a-zA-Z0-9]\\.)|([a-zA-Z0-9][-a-zA-Z0-9]{0,62}[a-zA-Z0-9]\\.))+";
    var tld = "[a-zA-Z0-9]{2,6}";
    var domainPart = new RegExp("^" + hostnames + tld + "$");

    if ( !parts[1].match(domainPart) ) 
	{
			msg.innerHTML = "Email host format is invalid";
			return false;
	}

	msg.style.visibility = "hidden"; // no errors, hide the message
    return true;
	}
	
/* validate the telephone field */
var validate_phone = function(){
	var text = $('phone_in').value;
	var msg = $('phone_msg');
	msg.style.visibility = "visible";
	
    if (text.length == 0) 
	{
		msg.innerHTML = "Phone is a required field";
		return false;
	}
	
	if (!/^\d{3}-\d{3}-\d{4}$/.test(text))
	{
		msg.innerHTML = "Phone format is invalid. use aaa-ppp-ssss";
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
		summary.style.visible = 'hidden';
		
		var ok = true // if any of the validators fail, ok will be false
		ok = validate_name() ? ok : false;
		ok = validate_email() ? ok : false; 
		ok = validate_phone() ? ok : false;
		
		return ok;
	}

/* initialize stuff when DOM is ready */
var domReady = function() {
		$('submit_button').onclick = submitClick;
	}

/* user clicked the Submit button */
var submitClick = function() {
		if (validate()) 
		{
			$('regForm').submit();
		}
		else 
		{
			var summary = $('errorSummary');
			summary.style.visibility = 'visible';
		}
	}

jsLib.dom.ready(domReady); 	// set up function to run when DOM is ready
