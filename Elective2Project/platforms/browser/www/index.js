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
		console.log("Start_up");

		//SET THE CURRENT DATE
		var date = new Date; 
		var year = date.getFullYear();
		var month = date.getMonth()+1;
		var day = date.getDate();

		if (month.toString().length == 1)
			month = "0" + month;
		if (day.toString().length == 1)
			day = "0" + day;

		date = year + "-" + month + "-" + day;
		
		document.getElementById("date").value = date;
		
		//SETUP ARRAY COMPANY DISPLAYS
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
				var parentdiv = document.getElementById("list_companies");
				var y;
				document.getElementById("list_companies").innerHTML = '';
				x.options.length = 0;
				
				for (y = 0; y < arraylength; y++)
				{
					var option = document.createElement("option");
					option.text = myObj.array[y].innerHTML;
					x.add(option);
					
					var newdiv = document.createElement("div");
					var newlabel1 = document.createElement("label");
					var newlabel2 = document.createElement("label");
					var newicon = document.createElement("i");
					
					newlabel1.innerHTML = myObj.array[y].innerHTML;
					newlabel2.innerHTML = "P" + myObj.array[y].CompanyRate;
					
					newdiv.style = "width:100%;border-width: 0px 0px 1px 0px;border-style:solid;border-color: #DCDCDC;";
					newlabel1.style = "display:inline-block;padding-top:3px;width:30%;font-Family: Times New Roman;margin-left: 20px;color: #6C79A3";
					newlabel2.style = "display:inline-block;padding-top:3px;width:52%;color:#010513;";
					newicon.style = "display:inline-block;padding-top: 3px;width:10%;";
					newicon.className = "glyphicon glyphicon-remove";
					//newicon.innerHTML = myObj.array[y].innerHTML;
					newicon.id = myObj.array[y].innerHTML;
					newicon.onclick = remove_company;
					newdiv.appendChild(newlabel1);
					newdiv.appendChild(newlabel2);
					newdiv.appendChild(newicon);
					
					parentdiv.appendChild(newdiv);
				}
				
			}
		}
		
		
	}
	
	function remove_company()
	{
		console.log("Remove_company");
		var test = window.localStorage.getItem("arraycompany");
		var companyarray = JSON.parse(test);
		var sourcename = event.target || event.srcElement;
		var arraylength = companyarray.array.length;
		var y;
		var parentdiv = document.getElementById("list_companies");
		var x = document.getElementById("selcompany");
		
		for (y = 0; y < arraylength; y++)
		{
			if (companyarray.array[y].innerHTML == sourcename.id)
			{
				companyarray.array.splice(y,1);
				break;
			}
		}
		
		document.getElementById("list_companies").innerHTML = '';
		x.options.length = 0;
		
		for (y = 0; y < arraylength-1; y++)
		{
			var option = document.createElement("option");
			option.text = companyarray.array[y].innerHTML;
			x.add(option);
			
			var newdiv = document.createElement("div");
			var newlabel1 = document.createElement("label");
			var newlabel2 = document.createElement("label");
			var newicon = document.createElement("i");
			
			newlabel1.innerHTML = companyarray.array[y].innerHTML;
			newlabel2.innerHTML = "P" + companyarray.array[y].CompanyRate;
			
			newdiv.style = "width:100%;border-width: 0px 0px 1px 0px;border-style:solid;border-color: #DCDCDC;";
			newlabel1.style = "display:inline-block;padding-top:3px;width:30%;font-Family: Times New Roman;margin-left: 20px;color: #6C79A3";
			newlabel2.style = "display:inline-block;padding-top:3px;width:52%;color:#010513;";
			newicon.style = "display:inline-block;padding-top: 3px;width:10%;";
			newicon.className = "glyphicon glyphicon-remove";
			//newicon.innerHTML = companyarray.array[y].innerHTML;
			newicon.id = companyarray.array[y].innerHTML;
			newicon.onclick = remove_company;
			newdiv.appendChild(newlabel1);
			newdiv.appendChild(newlabel2);
			newdiv.appendChild(newicon);
			
			parentdiv.appendChild(newdiv);
		}
		
		var myJSON = JSON.stringify(companyarray);
		window.localStorage.setItem("arraycompany",myJSON);
	}
	
	function open_home()
	{
		document.getElementById("home").style.display = "block";
		document.getElementById("company").style.display = "none";
		document.getElementById("sources").style.display = "none";
		document.getElementById("prog_header").innerHTML = "Home";	
	}
	
	function open_company()
	{
		document.getElementById("home").style.display = "none";
		document.getElementById("company").style.display = "block";
		document.getElementById("sources").style.display = "none";
		document.getElementById("prog_header").innerHTML = "Companies";
	}
	
	function open_sources()
	{
		document.getElementById("home").style.display = "none";
		document.getElementById("company").style.display = "none";
		document.getElementById("sources").style.display = "block";
		document.getElementById("prog_header").innerHTML = "Sources";	
	}
	
	function show_add_form()
	{
		document.getElementById("add_form").style.display = "block";
		document.getElementById("show_form_link").style.display = "none";
	}
	
	function add_company()
	{
		var newcompany = {"CompanyName":document.getElementById("company_name").value, "CompanyRate":document.getElementById("company_rate").value};
		newcompany.innerHTML = document.getElementById("company_name").value;
		
		var listcompany = window.localStorage.getItem("arraycompany");
		var obj = JSON.parse(listcompany);
		obj.array.push(newcompany);
		var myJSON = JSON.stringify(obj);
		window.localStorage.setItem("arraycompany", myJSON);
		
		var arraylength = obj.array.length
		var x = document.getElementById("selcompany");
		var option = document.createElement("option");
		option.text = obj.array[arraylength - 1].innerHTML;
		x.add(option);
		
		var parentdiv = document.getElementById("list_companies");
		
		var newdiv = document.createElement("div");
		var newlabel1 = document.createElement("label");
		var newlabel2 = document.createElement("label");
		var newicon = document.createElement("i");
		
		newlabel1.innerHTML = obj.array[arraylength - 1].innerHTML;
		newlabel2.innerHTML = "P" + obj.array[arraylength - 1].CompanyRate;
		
		newdiv.style = "width:100%;border-width: 0px 0px 1px 0px;border-style:solid;border-color: #DCDCDC;";
		newlabel1.style = "display:inline-block;padding-top:3px;width:30%;font-Family: Times New Roman;margin-left: 20px;color: #6C79A3";
		newlabel2.style = "display:inline-block;padding-top:3px;width:52%;color:#010513;";
		newicon.style = "display:inline-block;padding-top: 3px;width:10%;";
		newicon.className = "glyphicon glyphicon-remove";
		//newicon.innerHTML = obj.array[arraylength - 1].innerHTML;
		newicon.id = obj.array[arraylength - 1].innerHTML;
		newicon.onclick = remove_company;
		newdiv.appendChild(newlabel1);
		newdiv.appendChild(newlabel2);
		newdiv.appendChild(newicon);
		
		parentdiv.appendChild(newdiv);
		
		document.getElementById("add_form").style.display = "none";
		document.getElementById("show_form_link").style.display = "block";
	}
