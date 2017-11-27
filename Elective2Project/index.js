document.addEventListener('deviceready', onDeviceReady, false);
	function onDeviceReady()
	{
		
	}
	
	function on_save()
	{
		var company = document.getElementById("company").value;
		var hour = document.getElementById("hour").value;
		var minute = document.getElementById("minute").value;
		var second = document.getElementById("second").value;
		
		alert("Company: " + company + " " + hour + ":" + minute + ":" + second);
	}