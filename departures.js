  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyBxYjZJ9rup9ACdK09WSbyMJnGUYfJxJS4",
    authDomain: "traindepartures-71921.firebaseapp.com",
    databaseURL: "https://traindepartures-71921.firebaseio.com",
    projectId: "traindepartures-71921",
    storageBucket: "traindepartures-71921.appspot.com",
    messagingSenderId: "135698645109"
  };
  firebase.initializeApp(config);

  // Get a reference to the database service
  var database = firebase.database();

            // button to add trains
  $("#add-train-btn").on("click", function(event) {
    event.preventDefault();
    
    // Grabs user input
    var trainName = $("#train-name-input").val().trim();
    var trainDestination = $("#destination-input").val().trim();
    var firstTime = $("#start-input").val().trim();
    console.log(firstTime);
    var trainFrequency = $("#frequency-input").val().trim();
    
    // Creates local "temporary" object for holding train data
    var newTrain = {
      name: trainName,
      destination: trainDestination,
      start: firstTime,
      frequency: trainFrequency,
         
    }
    // Uploads train data to the database
    database.ref().push(newTrain);
  
    alert("Train successfully added");
  
    // Clears all of the text-boxes
    $("#train-name-input").val("");
    $("#destination-input").val("");
    $("#start-input").val("");
    $("#frequency-input").val("");
  });

            // Create Firebase event for adding trains to the database and
            //...a row in the html when a user adds an entry
   database.ref().on("child_added", function(childSnapshot) {
      console.log(childSnapshot.val());
 
      // Store everything into variables.
      var trainName = childSnapshot.val().name;
      var trainDestination = childSnapshot.val().destination;
      var firstTime = childSnapshot.val().start;
      var trainFrequency = childSnapshot.val().frequency;
   
            // Calculate the Next Arrival and Minutes Away
      
      // First Time (pushed back 1 hour to make sure it comes before current time)
      var firstTimeConverted = moment(firstTime, "HH:mm").subtract(60, "minutes");
      console.log(firstTimeConverted);

      // Current Time
      var currentTime = moment();
      console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

      // Difference between the times
      var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
      console.log("DIFFERENCE IN TIME: " + diffTime);

      // Time apart (remainder)
      var tRemainder = diffTime % trainFrequency;
      console.log(tRemainder);

      // Minutes Away
      var tMinutesTillTrain = trainFrequency - tRemainder;
      console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

      // minutes to Next Arrival
      var nextTrain = moment().add(tMinutesTillTrain, "minutes");
      console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));

      // Create the new row
      var newRow = $("<tr>").append(
      $("<td>").text(trainName),
      console.log(trainName),
      $("<td>").text(trainDestination),
      console.log(trainDestination),
      $("<td>").text(trainFrequency),
      console.log(trainFrequency),
      $("<td>").text(moment(nextTrain).format("hh:mm")), //next arrival
      console.log(moment(nextTrain).format("hh:mm")), 
      $("<td>").text(tMinutesTillTrain),                 //minutes away
      console.log(tMinutesTillTrain)     
      );
 
   // Append the new row to the table
   $("#train-table > tbody").append(newRow);
   console.log(newRow);
 });


    
   
  