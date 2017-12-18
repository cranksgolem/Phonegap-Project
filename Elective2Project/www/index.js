document.addEventListener('deviceready', onDeviceReady, false);
	function onDeviceReady()
	{

	}
	
	function on_save()
	{
		console.log("Save_work_hour");
		var company = document.getElementById("selcompany").value;
		var hour = document.getElementById("hour").value;
		var minute = document.getElementById("minute").value;
		var second = document.getElementById("second").value;
		
		hour = parseInt(hour);
		minute = parseInt(minute);
		second = parseInt(second);
		
		var totalhours = hour + (minute/60) + (second/3600);
		
		var myJson = window.localStorage.getItem("arraycompany");
		var myObj = JSON.parse(myJson);
		var selectedcompany;
		var y;
		
		for (y = 0; y < myObj.array.length; y++)
		{
			if (company == myObj.array[y].innerHTML)
			{
				selectedcompany = myObj.array[y];
			}
		}
		
		var rate = selectedcompany.CompanyRate;
		var amount = rate * totalhours;
		
		var newworkhour = {"Company":company, "Hours":totalhours, "Datee": document.getElementById("date").value, "Amount":amount};
		selectedcompany.WorkHours.push(newworkhour);
		var newJson = JSON.stringify(myObj);
		window.localStorage.setItem("arraycompany", newJson);
		
		document.getElementById("hour").value = "";
		document.getElementById("minute").value = "";
		document.getElementById("second").value = "";
	}
	
	function set_current_date() 
	{
		console.log("Start_up");
		
		//window.localStorage.removeItem("arraycompany");

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
	
	function set_company_screen()
	{
		var listworkhours = document.getElementById("list_work_hours");
		var companyarrayjson = window.localStorage.getItem("arraycompany");
		var companyarray = JSON.parse(companyarrayjson);
		var companiestotalamount = 0;
		var y;
		var x;
		
		listworkhours.innerHTML = '';
		
		if (companyarray.array.length != 0)
		{	
			for (y = 0; y < companyarray.array.length; y++)
			{
				currentcompany = companyarray.array[y];
				
				var newmaindiv = document.createElement("div");
				var newdivheader = document.createElement("div");
				var newdivlistworkhours = document.createElement("div");
				var totalhours = 0;
				var totalamount = 0;
				
				if (currentcompany.WorkHours.length != 0)
				{
					for (x = 0; x < currentcompany.WorkHours.length; x++)
					{
						var newdivworkhour = document.createElement("div");
						var hourslabel = document.createElement("label");
						var date = document.createElement("label");
						var amount = document.createElement("amount");
						var deleteicon = document.createElement("i");
						var brk = document.createElement("br");
						
						hourslabel.innerHTML = currency(currentcompany.WorkHours[x].Hours) + " hours";
						amount.innerHTML = "P" + currency(currentcompany.WorkHours[x].Amount);
						date.innerHTML = currentcompany.WorkHours[x].Datee;
						
						newdivworkhour.style = "display:block;padding: 10px;background: #D1D6E4;border-radius: 8px;margin-left: 10px;margin-right: 10px;margin-top: 10px;";
						hourslabel.style = "display:inline-block;text-align: left;padding: 4px;color: black;font-size:large;width:95%;";
						date.style = "display:inline-block;text-align: left;padding: 4px;color: grey;width:50%;";
						amount.style = "display:inline-block;text-align: right;padding: 4px;color: black;width:50%";
						
						deleteicon.style = "display:inline-block;padding-top: 3px;width:5%;";
						deleteicon.className = "glyphicon glyphicon-remove";
						deleteicon.id = currency(currentcompany.WorkHours[x].Hours) + currency(currentcompany.WorkHours[x].Amount) + currentcompany.WorkHours[x].Datee;
						deleteicon.onclick = remove_work_hour;
						
						newdivworkhour.appendChild(hourslabel);
						newdivworkhour.appendChild(deleteicon);
						newdivworkhour.appendChild(brk);
						newdivworkhour.appendChild(date);
						newdivworkhour.appendChild(amount);
						
						newdivlistworkhours.appendChild(newdivworkhour);
						
						totalhours = totalhours + currentcompany.WorkHours[x].Hours;
						totalamount = totalamount + currentcompany.WorkHours[x].Amount;
					}
				}
				
				var companyheader = document.createElement("div");
				var totalhoursheader = document.createElement("div");
				var totalamountheader = document.createElement("div");
				
				companyheader.innerHTML = currentcompany.innerHTML;
				totalhoursheader.innerHTML = "Total Hours: "+ currency(totalhours);
				totalamountheader.innerHTML = "Amount: P" + currency(totalamount);
				
				companyheader.style = "display:inline-block;padding:4px;margin:4px;font-size:x-large;width:30%;font-Family: Times New Roman;";
				totalhoursheader.style = "display:inline-block;padding:4px;margin:4px;font-size:small;width:30%;text-align:right;";
				totalamountheader.style = "display:inline-block;padding:4px;margin:4px;font-size:small;width:30%;text-align:right;";
				
				newdivheader.appendChild(companyheader);
				newdivheader.appendChild(totalhoursheader);
				newdivheader.appendChild(totalamountheader);
				
				newmaindiv.appendChild(newdivheader);
				newmaindiv.appendChild(newdivlistworkhours);
				listworkhours.appendChild(newmaindiv);
				
				companiestotalamount = companiestotalamount + totalamount;
			}
		}
		
		var comptotalamountdisplay = document.getElementById("companies_total_amount_display");
		comptotalamountdisplay.innerHTML = "P" + currency(companiestotalamount);
	}
	
	function remove_work_hour()
	{
		console.log("Remove_work_hour");
		var sourcename = event.target || event.srcElement;
		var companyarrayjson = window.localStorage.getItem("arraycompany");
		var companyarray = JSON.parse(companyarrayjson);
		var x;
		var y;
		
		for (y=0 ; y < companyarray.array.length; y++)
		{
			var currentcompany = companyarray.array[y];
			
			for (x = 0; x < currentcompany.WorkHours.length; x++)
			{
				var comparestring = currency(currentcompany.WorkHours[x].Hours) + currency(currentcompany.WorkHours[x].Amount) + currentcompany.WorkHours[x].Datee;
				if (sourcename.id == comparestring)
				{
					currentcompany.WorkHours.splice(x,1);
					break;
				}
			}
		}
		
		var newcompanyarrayjson = JSON.stringify(companyarray);
		window.localStorage.setItem("arraycompany", newcompanyarrayjson);
		
		set_company_screen();
	}
	
	function display_company_screen()
	{
		set_company_screen();
		open_company();
	}
	
	function currency(n){n=parseFloat(n);return isNaN(n)?false:n.toFixed(2);}
	
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
		var newcompany = {"CompanyName":document.getElementById("company_name").value, "CompanyRate":document.getElementById("company_rate").value, "WorkHours":new Array()};
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
		
		document.getElementById("company_name").value = "";
		document.getElementById("company_rate").value = "";
	}
