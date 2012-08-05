/* Michael Bruchal
   03AUG2012
   VFW 1208
   Project 2
*/

//Wait until the DOM is ready.
window.addEventListener("DOMContentLoaded", function() {
	//alert(localStorage.value(0));

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

	function saveData() {
		var id 					= Math.floor(Math.random()*10000001);
		getSelectedRadio();
		var item                = {};
			item.date           = ["Date Added", $("dateAdded").value];
			item.group          = ["Workout Type:", $("groups").value];
			item.intensity      = ["Intensity:", $("intensity").value];
			item.NumOfDays      = ["Day#", $("NumOfDays").value];
			item.mins           = ["Mins:", minValue];
			item.notes          = ["Notes:", $("notes").value];
			item.bmi            = ["BMI:", $("bmi").value];
			item.BodyFat        = ["Body Fat%", $("BodyFat").value];
			item.CurrentWeight  = ["Current Weight:", $("CurrentWeight").value];
			item.TargetWeight   = ["Target Weight:", $("TargetWeight").value];
		localStorage.setItem(id, JSON.stringify(item));
		alert("Info Saved!");
	}

	function getData() {
		var makeDiv = document.createElement("div");
		makeDiv.setAttribute("id", "items");
		var makeList = document.createElement("ul");
		makeDiv.appendChild(makeList);
		document.body.appendChild(makeDiv);
		for (var i=0, len=localStorage.length; i<len; i++) {
			var makeLi = document.createElement("li");
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
			}
		}
	}

	var workOutType = ["--Choose a Workout--", "Chest", "Legs", "Shoulders", "Back", "Arms", "Cardio", "BattleRopes", "JumpRope", "StationaryBike"],
		minValue;
	makeWorkoutTypes();

	//Set Link and Submit Click Events.
	var displayLink = $("displayData");
	displayLink.addEventListener("click", getData);
	//var clearLink = $("clearData");
	//clearLink.addEventListener("click", clearLocal);*/
	var save = $("submit");
	save.addEventListener("click", saveData);






});