//Create data from form into CouchDB function call
$('#submit').on('click', function (key){
    storeData();
});

//Function to save data into CouchDb
var storeData = function (){
    var userData = {};
    	userData._id = "assignment" + $('#_id').val();
        userData.fname = $('#fname').val();
        userData.lname = $('#lname').val();
        userData.email = $('#email').val();
        userData.subject = $('#subject').val();
        userData.datedue = $('#datedue').val();
        userData.notes = $('#notes').val();

    $.couch.db("asd1305project").saveDoc(userData, {
    	success: function(){
    		alert("Homework Added!");
    	}
    });
    
    console.log(userData);
};


//Display data from CouchDB as a listview with links to individual pages
$('#view').on('pageinit', function(){
	$.couch.db("asd1305project").view("asd1305app/assignments", {
		success: function(data){
			//console.log(data); //Logs out the entire DB
			$('#savedList').empty();
			$.each(data.rows, function(index, assignments){
				//console.log(assignments);
				var fname = assignments.value.fname;
				var lname = assignments.value.lname;
				var email = assignments.value.email;
				var subject = assignments.value.subject;
				var datedue = assignments.value.date;
				var notes = assignments.value.notes;
				//console.log(datedue);
				//console.log(assignments);
				$('#savedList').append(
					$('<li id="assignData">').append(
						$('<a id="assignLink" >').attr("href", "assignments.html?assignments=" + assignments.value.subject)
							.text("Due on " + datedue)                		
						)
					)
			});
			$('#savedList').listview('refresh');
		}
	});
});		


$(document).on('pageinit', '#assignments', function(){
	$.couch.db("asd1305project").view("asd1305app/assignments", {
		success: function(data){
			console.log(data); //Logs out the entire DB
			$('#assignmentDetails').empty();
			$.each(data.rows, function(index, assignments){
				//console.log(assignments);
				var userData = 
				{
				   "fname": assignments.value.fname,
				   "lname": assignments.value.lname,
				   "email": assignments.value.email,
				   "subject": assignments.value.subject,
				   "datedue": assignments.value.date,
				   "notes": assignments.value.notes
				}
				console.log(userData);
				$('#assignmentDetails').append(
					$('<li id="assignData">').append(
						$('<a id="assignLink" >').attr("href", "")
							.text("Due on " + datedue)                		
						)
					)
			});
			$('#assignmentDetails').listview('refresh');
		}
	});
});


//Display data from CouchDB as a listview with links to individual pages
$(document).on('pageinit', '#assignments', function(){
	var urlData = $(this).data("url");
	console.log(urlData);
	var urlParts = urlData.split('?');
	var urlPairs = urlParts[1].split('&');
	var urlValues = {};
	for (var pair in urlPairs){
		var keyValue = urlPairs[pair].split('=');
		var key = decodeURIComponent(keyValue[0]);
		var value = decodeURIComponent(keyValue[1]);
		urlValues[key] = value;
		}
		urlValues;
		console.log(urlValues);
	
});

/*

//Destroy data from form in CouchDB function call
$('#deleteAll').on('click', function (key){
    clearAll();
});

//Destroy function to remove ALL items from the DB
var clearAll = function(){
	$.couch.db("asd1305project").removeDoc({
		_id		:	id,
		_rev 	:	rev
		},{
			success: function(data){
			alert("Assignment was deleted!");
			}
	});
};
*/