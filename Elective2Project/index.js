document.addEventListener('deviceready', onDeviceReady, false);
	function onDeviceReady()
	{
		
	}
	
	function on_save()
	{
		var company = document.getElementById("selcompany").value;
		var hour = document.getElementById("hour").value;
		var minute = document.getElementById("minute").value;
		var second = document.getElementById("second").value;
		
		alert("Company: " + company + " " + hour + ":" + minute + ":" + second);
	}
	
	function set_current_date() 
	{
		console.log("set_current_date()");

		var date = new Date; //set the current date
		var year = date.getFullYear();
		var month = date.getMonth()+1;
		var day = date.getDate();

		if (month.toString().length == 1)
			month = "0" + month;
		if (day.toString().length == 1)
			day = "0" + day;

		date = year + "-" + month + "-" + day;
		
		document.getElementById("date").value = date;
	}
	
	function open_home()
	{
		document.getElementById("home").style.display = "block";
		document.getElementById("company").style.display = "none";
		
	}
	
	function open_company()
	{
		document.getElementById("home").style.display = "none";
		document.getElementById("company").style.display = "block";
	}