//Store data into local storage function
var storeData = function (key){
    if(!key){
            var userValues      = Math.floor(Math.random()*100000001);
        }else{
            userValues = key;
        }
      
    var key    = Math.floor(Math.random()*100000001);

    var userData = {};
        userData.fname = $('#fname').val();
        userData.lname = $('#lname').val();
        userData.email = $('#email').val();
        userData.subject = $('#subject').val();
        userData.datedue = $('#datedue').val();
        userData.notes = $('#notes').val();

    localStorage.setItem(key, JSON.stringify(userData));
    alert("Homework Added!");
    console.log(userData);
};

//Save data from form into local storage function
$('#submit').on('click', function (key){
    storeData();
});

//Display data from local storage
$('#view').on('pageinit', function(){
        displayData();
    });

//Display data funciton
var displayData = function(){
    $("#savedList").empty();
        for (var i= 0, j=localStorage.length; i<j ; i++){
            var key = localStorage.key(i);
            var item = JSON.parse(localStorage.getItem(key));
            console.log(item);
            var makeSubList = $("<li></li>");
            var makeSubLi = $( "<h3>"+item.datedue+"</h3>"+
                "<p>"+item.fname+"</p>" +
                "<p>"+item.lname+"</p>"+
                "<p>"+item.email+"</p>" +
                "<p>"+item.subject+"</p>" +
                "<p>"+item.notes+"</p>");
            var makeLink = $("<a id='"+key+"'>Edit</a>");
            makeLink.on('click', function(){
               console.log(item);
            });
            makeLink.html(makeSubLi);
            makeSubList.append(makeLink).appendTo("#savedList");
            $("#savedList").listview("refresh");
        };
};

$('#view').on('click', function(){
    $("#savedList").listview("refresh");
});

//Function to add json data 
$('#loadjson').on('click', function(){
    if(localStorage.length === 0){
        $.ajax({
                url      : "data.json",
                type     : "GET",
                dataType : "json",
                success  : function(data, status) {
                    console.log(status, data);
                    displayData(data);
                },
                error   : function(error, parseerror) { 
                    console.log(error, parseerror);
                }
            });
        alert("Data has been added");
    }
});

//Function to edit assignment
var editAssignment = function(){
        var value = localStorage.getItem(this.key);
        var userData = JSON.parse(value);
        
        //populate form 
        $('fname').val([1]);
        $('lname').val([1]);
        $('email').val([1]);
        $('subject').val([1]);
        $('datedue').val([1]);
        $('notes').val([1]);   
        
        //Remove first listener from input "save assignment"
        $('#submit').unbind("click", storeData);
        
        //Change save button to edit
        $('#submit').val("Edit Assignment");
        var editSave = $('#submit').bind();
        
        //Save the key value established as a property as a function of the editSave event
        //so we can use that value when we save the data we edited.
        editSave.on("click", storeData);
        editSave.key = this.key;
        
    }


//Clear data from local storage function
$('#clear').on('click', function(){
  localStorage.clear();
  var confirmDelete = confirm("Are you sure you want to delete the assignment?");
    if(confirmDelete){
      localStorage.removeItem(this.key);
      alert("All assignments have been deleted!");
      window.location.reload();
    }else{
      alert("Assignment was NOT deleted!");
    }
});