window.addEventListener("DOMContentLoaded", function(){

	//Save Data Function
	function sData(x){
		var userElements = document.getElementById(x);
		return userElements;
	}
	
	//Create Select Field Option
	function makeCourses(){
		var courseTag = document.getElementsByTagName("form"),
			selectLi = sData('select'),
			makeSelect = document.createElement('select');
			makeSelect.setAttribute("id", "course");
		for(var i=0, j=selectCourses.length; i<j; i++){
			var makeOption = document.createElement('option');
			var optText = selectCourses[i];
			makeOption.setAttribute("value", optText);
			makeOption.innerHTML = optText;
			makeSelect.appendChild(makeOption);
		}
		selectLi.appendChild(makeSelect);	
	}
	

	//Get Radio Button Value Function

	function getRadioButton(){
		var findRadios = document.forms[0].due;
		for (var i=0; i<findRadios.length; i++){
			if(findRadios[i].checked){
				dueValue = findRadios[i].value;
			}
		}
	}

	
	function dataControls(n){
		switch(n){
		case "on":
			sData('form').style.display = "none";
			sData('boom').style.display = "inline";
			sData('displayDataLink').style.display = "none";
			sData('addAssignment').style.display = "inline";
			break;
		case "off":
			sData('form').style.display = "block";
			sData('boom').style.display = "inline";
			sData('displayDataLink').style.display = "inline";
			sData('userItem').style.display = "none";
			break;
		default:
			return false;
		}
	}
	
	function storeData(key){
		if(!key){
			var userValues		= Math.floor(Math.random()*100000001);
		}else{
			userValues = key;
		}
		getRadioButton();
		
		var userItem			= {};
			userItem.fname		= ["First Name:", sData('fname').value];
			userItem.lname		= ["Last Name:", sData('lname').value];
			userItem.email		= ["Email:", sData('email').value];
			userItem.course		= ["Course:", sData('course').value];
			userItem.answer		= ["Project Due:", dueValue];
			userItem.date		= ["Date:", sData('date').value];
			userItem.notes		= ["Notes:", sData('notes').value];
			userItem.complete	= ["Hours To Complete:", sData('complete').value];
		localStorage.setItem(userValues, JSON.stringify(userItem));
		alert("Homework Added!");
	}	
		
	function getData(){
		dataControls("on");
		if(localStorage.length === 0){
			alert("There are no assignments in Local Storage so default data has been added.");
			defaultData();
		}
		//Write Data from Local Storage
		var makeDiv = document.createElement('div');
		makeDiv.setAttribute("id", "userItem");
		var newList = document.createElement('ul');
		makeDiv.appendChild(newList);
		document.body.appendChild(makeDiv);
		sData('userItem').style.display = "block";
		for(var i=0, j=localStorage.length; i<j; i++){
			var newli = document.createElement('li');
			var newLinksLi = document.createElement('li');
			newList.appendChild(newli);
			var key = localStorage.key(i);
			var value = localStorage.getItem(key);
			//Convert string back to object from JSON 
			var newObj = JSON.parse(value);
			var newSubList = document.createElement('ul');
			newli.appendChild(newSubList);
			getCourseImage(newObj.course[1], newSubList);
			for(var n in newObj){
				var makeNewSubli = document.createElement('li');
				newSubList.appendChild(makeNewSubli);
				var optSubText = newObj[n][0]+" "+newObj[n][1];
				makeNewSubli.innerHTML = optSubText;
				newSubList.appendChild(newLinksLi);
			}
			newItemLinks(localStorage.key(i), newLinksLi); //Create "delete" and "edit" buttons for items in local storage
		}
	}
	
	//Get image for correct course
	function getCourseImage(courseName, newSubList){
		var imageLi = document.createElement('li');
		newSubList.appendChild(imageLi);
		var newImg = document.createElement('img');
		var setSrc = newImg.setAttribute("src", "images/"+ courseName + ".png");
		imageLi.appendChild(newImg);
	}
	
	//Add default JSON data function
	function defaultData(){
		for (var n in json){
			var id = Math.floor(Math.random()*100000001);
			localStorage.setItem(id, JSON.stringify(json[n]))
		}
	
	}
	//Make Item Links
	function newItemLinks(key, newLinksLi){
		//Edit single item link
		var editLink = document.createElement('a');
		editLink.href = "#";
		editLink.key = key;
		var editHWork = "Edit Assignment";
		editLink.addEventListener("click", editAssignment);
		editLink.innerHTML = editHWork;
		newLinksLi.appendChild(editLink);
		
		//add break tag
		var lineBreak = document.createElement('br');
		newLinksLi.appendChild(lineBreak);
		
		//Delete single item link
		var deleteLink = document.createElement('a');
		deleteLink.href = "#";
		deleteLink.key = key;
		var deleteHWork = "Delete Assignment";
		deleteLink.addEventListener("click", deleteAssignment);
		deleteLink.innerHTML = deleteHWork;
		newLinksLi.appendChild(deleteLink);
	}
	
	function editAssignment(){
		var value = localStorage.getItem(this.key);
		var userItem = JSON.parse(value);
		
		//Show form
		dataControls("off");
		
		//populate form 
		sData('fname').value = userItem.fname[1];
		sData('lname').value = userItem.lname[1];
		sData('email').value = userItem.email[1];
		sData('course').value = userItem.course[1];
		var radioValue = document.forms[0].answer;
		for(var i=0; i<radioValue.length; i++){
			if(radioValue[i].value == "Yes" && userItem.answer[1] == "Yes"){
				radioValue[i].setAttribute("checked", "checked");
			} else if(radioValue[i].value == "No" && userItem.answer[1] == "No"){
				radioValue[i].setAttribute("checked", "checked");
			} else if(radioValue[i].value == "Unknown" && userItem.answer[1] == "Unknown"){
				radioValue[i].setAttribute("checked", "checked");
			}	
		}		
		sData('date').value = userItem.date[1];
		sData('notes').value = userItem.notes[1];
		sData('complete').value = userItem.complete[1];
		
		//Remove first listener from input "save assignment"
		save.removeEventListener("click", storeData);
		
		//Change save button to edit
		sData('save').value = "Edit Assignment";
		var editSave = sData('save');
		
		//Save the key value established as a property as a function of the editSave event
		//so we can use that value when we save the data we edited.
		editSave.addEventListener("click", validate);
		editSave.key = this.key;
		
	}
		
	function deleteAssignment(){
		var confirmDelete = confirm("Are you sure you want to delete the assignment?");
		if(confirmDelete){
			localStorage.removeItem(this.key);
			alert("Assignment was deleted!");
			window.location.reload();
		}else{
			alert("Assignment was NOT deleted!");
		}
	}
	
	//Clear Data
	function boomData(){
		if(localStorage.length === 0){
			alert("There are no assignments.")
		}else{
			localStorage.clear();
			alert("All homework has been deleted!");
			window.location.reload();
			return false;	
		}
	}
	
	//Form Validation Function
	function validate(e){
		//Define elements to check
		var getFname = sData('fname');
		var getLname = sData('lname');
		var getEmail = sData('email');
		var getCourse = sData('course');
		
		//Reset Error Message
		errValue.innerHTML = "";
		getFname.style.border = "1px solid black";
		getLname.style.border = "1px solid black";
		getEmail.style.border = "1px solid black";
		getCourse.style.border = "1px solid black";
		
		//Error messages
		var errorMessage = [];

		//First name
		if(getFname.value=== ""){
			var fNameError = "Please enter a first name."
			getFname.style.border = "1px solid red";
			errorMessage.push(fNameError);
		}
		
		//Last Name
		if(getLname.value=== ""){
			var lNameError = "Please enter a last name."
			getLname.style.border = "1px solid red";
			errorMessage.push(lNameError);
		}
		
		//Email
		var regEx = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
		if(!(regEx.exec(getEmail.value))){
			var emailError = "Please enter a valid email address.";
			getEmail.style.border = "1px solid red";
			errorMessage.push(emailError);
		}
		
		
		//Course
		if(getCourse.value=== "-- Current Courses --"){
			var chooseCourseError = "Please choose a course."
			getCourse.style.border = "1px solid red";
			errorMessage.push(chooseCourseError);
		}
		
		//If errors, display on screen
		if(errorMessage.length >= 1){
			for(var i=0, j=errorMessage.length; i < j; i++){
				var err = document.createElement('li');
				err.innerHTML = errorMessage[i];
				errValue.appendChild(err);
			}
			e.preventDefault();
			return false;
		}else{
			//If OK, store information. 
			storeData(this.key)
			window.location.reload();
		}
	}

	//Variable Defaults
	var selectCourses = ["-- Current Courses --", "MMD", "MMD2", "SDI", "VFW", "PMA", "PMA2"],
		dueValue;
		errValue = sData('errors'); 
	
	makeCourses();
	
	//Button Links
	var displayLink = sData('displayDataLink');
	displayLink.addEventListener("click", getData);
	var clearLink = sData('boom');
	clearLink.addEventListener("click", boomData);
	var save = sData('save');
	save.addEventListener("click", validate);
});