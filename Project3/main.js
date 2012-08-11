/* Michael Bruchal
   03AUG2012
   VFW 1208
   Project 3
*/

//Wait until the DOM is ready.
window.addEventListener("DOMContentLoaded", function() {

	//getElementById function
	function $(x) {
		var theElement = document.getElementById(x);
		return theElement;
	}

	//Create set field element and populate with options
	function makeWorkoutTypes() {
		var formTag = document.getElementsByTagName("form"),	//Form tag is an array of all the form tags
			selectLi = $("select"),
			makeSelect = document.createElement("select");
			makeSelect.setAttribute("id", "groups");
		for (var i=0, j=workOutType.length; i<j; i++) {
			var makeOption = document.createElement("option");
			var optText = workOutType[i];
			makeOption.setAttribute("value", optText);
			makeOption.innerHTML = optText;
			makeSelect.appendChild(makeOption);
		}
		selectLi.appendChild(makeSelect);
	}

	//Find value of selected radio
	function getSelectedRadio() {
		var radios = document.forms[0].mins;
		for (var i=0; i<radios.length; i++) {
			if(radios[i].checked) {
				minValue = radios[i].value;
			}
		}
	}

	function toggleControls(n) {
		switch(n) {
			case "on":
				$("workoutForm").style.display = "none";
				$("clearData").style.display = "inline";
				$("displayData").style.display = "none";
				$("addNew").style.display = "inline";
				break;
			case "off":
				$("workoutForm").style.display = "block";
				$("clearData").style.display = "inline";
				$("displayData").style.display = "inline";
				$("addNew").style.display = "none";
				$("items").style.display = "none";
				break;
			default:
				return false;
		}
	}

	function saveData() {
		var id 					= Math.floor(Math.random()*10000001);
		getSelectedRadio();
		var item                = {};
			item.date           = ["Date Added: ", $("dateAdded").value];
			item.group          = ["Workout Type: ", $("groups").value];
			item.intensity      = ["Intensity: ", $("intensity").value];
			item.NumOfDays      = ["Day# ", $("NumOfDays").value];
			item.mins           = ["Duration of Exercise=", minValue];
			item.notes          = ["Notes: ", $("notes").value];
			item.bmi            = ["BMI: ", $("bmi").value];
			item.BodyFat        = ["Body Fat ", $("BodyFat").value + "%"];
			item.CurrentWeight  = ["Current Weight ", $("CurrentWeight").value + " Ibs."];
			item.TargetWeight   = ["Target Weight ", $("TargetWeight").value + " Ibs."];
		localStorage.setItem(id, JSON.stringify(item));
		alert("Info Saved!");
	}

	function getData() {
		toggleControls("on");
		if(localStorage.length === 0) {
			alert("There are no Workouts to display");
		}
		var makeDiv = document.createElement("div");
		makeDiv.setAttribute("id", "items");
		var makeList = document.createElement("ul");
		makeDiv.appendChild(makeList);
		document.body.appendChild(makeDiv);
		$("items").style.display = "display";
		for (var i=0, len=localStorage.length; i<len; i++) {
			var makeLi = document.createElement("li");
			var linksLi = document.createElement("li");
			makeList.appendChild(makeLi);
			var key = localStorage.key(i);
			var value = localStorage.getItem(key);
			//Convert the string from local storage value back to an object by using JSON
			var obj = JSON.parse(value);
			var makeSubList = document.createElement("ul");
			makeLi.appendChild(makeSubList);
			for (var n in obj) {
				var makeSubli = document.createElement("li");
				makeSubList.appendChild(makeSubli);
				var optSubText = obj[n][0]+ " "+obj[n][1];
				makeSubli.innerHTML = optSubText;
				makeSubList.appendChild(linksLi);
			}
			makeItemLinks(localStorage.key(i), linksLi); //create our edit/delete buttons for each item in local storage
		}
	}

	//make item links
	//create the edit and delete links for each stored item when displayed
	function makeItemLinks(key, linksLi) {
		//add edit single item link
		var editLink = document.createElement("a");
		editLink.href = "#";
		editLink.key = key;
		var editText = "Edit Workout";
		editLink.addEventListener("click", editItem);
		editLink.innerHTML = editText;
		linksLi.appendChild(editLink);

		//add line break
		var breakTag = document.createElement("br");
		linksLi.appendChild(breakTag);

		//add delete single item link
		var deleteLink = document.createElement("a");
		deleteLink.href = "#";
		deleteLink.key = key;
		var deleteText = "Delete Workout";
		//deleteLink.addEventListener("click", deleteItem);
		deleteLink.innerHTML = deleteText;
		linksLi.appendChild(deleteLink);
	}

	function editItem () {
		//Grab the data from our item from Local Storage
		var value = localStorage.getItem(this.key);
		var item = JSON.parse(value);

		//show the form
		toggleControls("off");

		//populate the form fields with current localStorage values.
		$("groups").value = item.group[1];
		$("notes").value = item.notes[1];
		$("BodyFat").value = item.BodyFat[1];
		$("CurrentWeight").value = item.CurrentWeight[1];
		$("TargetWeight").value = item.TargetWeight[1];
		var radios = document.forms[0].mins;
		for(var i=0; i<radios.length; i++) {
			if(radios[i].value == "15mins" && item.mins[1] == "15mins") {
				radios[i].setAttribute("checked", "checked");
			} else if(radios[i].value == "30mins" && item.mins[1] == "30mins") {
				radios[i].setAttribute("checked", "checked");
			  } else if(radios[i].value == "45mins" && item.mins[1] == "45mins") {
			  	radios[i].setAttribute("checked", "checked");
			    }
		}
		$("dateAdded").value = item.date[1];
	}

	function clearLocal() {
		if (localStorage.length === 0) {
			alert("There is no data to clear!")
		} else {
			localStorage.clear();
			alert("All Workouts are deleted!");
			window.location.reload();
			return false;
		}
	}
	
	//Variable Defaults
	var workOutType = ["--Choose a Workout--", "Chest", "Legs", "Shoulders", "Back", "Arms", "Cardio", "BattleRopes", "JumpRope", "StationaryBike"],
		minValue;
	makeWorkoutTypes();

	//Set Link and Submit Click Events.
	var displayLink = $("displayData");
	displayLink.addEventListener("click", getData);
	var clearLink = $("clearData");
	clearLink.addEventListener("click", clearLocal);
	var save = $("submit");
	save.addEventListener("click", saveData);






});