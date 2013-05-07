var $ = function(Id) {
		return document.getElementById(Id);
	}
var validate_name = function() {
	$('name_msg').style.visibility = 'hidden';
		var name = $('name_in');
		if (name.value.length == 0) {
			$('name_msg').style.visibility = 'visible';
			return false;
		}

		return true;
	}

var validate_email = function() {
		return true;
	}

var validate = function() {
		var summary = $('errorSummary');
		summary.style.visible = 'hidden';

		if (validate_name() && validate_email()) return true;
		else return false;

	}

var domReady = function() {
		$('submit_button').onclick = submitClick;
	}

var submitClick = function() {
		if (validate()) 
		{
			$('regForm').submit();
		}
		else alert('error');
	}

jsLib.dom.ready(domReady);
