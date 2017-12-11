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
		
		test = window.localStorage.getItem("arraycompany");
		
		if (test == null)
		{
			var myObj = { "array": new Array()};
			var myJSON = JSON.stringify(myObj);
			window.localStorage.setItem("arraycompany", myJSON);		
		} else
		{
			var myObj = JSON.parse(test);
			
			if (myObj.array.length != 0)
			{
				var arraylength = myObj.array.length;
				var x = document.getElementById("selcompany");
				var option = document.createElement("option");
				var y;
				
				for (y = 0; y < arraylength; y++)
				{
					option.text = myObj.array[x].CompanyName;
					x.add(option);
				}
			}
		}
	}
	
	function open_home()
	{
		document.getElementById("home").style.display = "block";
		document.getElementById("company").style.display = "none";
		document.getElementById("sources").style.display = "none";
		
	}
	
	function open_company()
	{
		document.getElementById("home").style.display = "none";
		document.getElementById("company").style.display = "block";
		document.getElementById("sources").style.display = "none";
	}
	
	function open_sources()
	{
		document.getElementById("home").style.display = "none";
		document.getElementById("company").style.display = "none";
		document.getElementById("sources").style.display = "block";
	}
	
	function add_company()
	{
		var newcompany = {"CompanyName":document.getElementById("company_name").value, "CompanyRate":document.getElementById("company_rate").value};
		
		var listcompany = window.localStorage.getItem("arraycompany");
		var obj = JSON.parse(listcompany);
		obj.array.push(newcompany);
		var myJSON = JSON.stringify(obj);
		window.localStorage.setItem("arraycompany", myJSON);
		
		var listcompany2 = window.localStorage.getItem("arraycompany");
		var obj2 = JSON.parse(listcompany2);
		
		var arraylength = obj2.array.length
		var x = document.getElementById("selcompany");
		var option = document.createElement("option");
		option.text = obj2.array[arraylength - 1].CompanyName;
		x.add(option);
	}
