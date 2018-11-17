// Initialize Firebase

var config = {
    apiKey: "AIzaSyC-9Dtl98NxepwTBFRtVWG5O29CcS_pO04",
    authDomain: "traintravel-ef844.firebaseapp.com",
    databaseURL: "https://traintravel-ef844.firebaseio.com",
    projectId: "traintravel-ef844",
    storageBucket: "",
    messagingSenderId: "306713955188"
};
firebase.initializeApp(config);

// Assign the reference to the database to a variable named 'database'
var database = firebase.database();

$("#submitBtn").on("click", function () {
    var trainName = $("#trainName").val().trim();
    var destination = $("#destination").val().trim();
    var firstTrainTime = $("#firstTrainTime").val().trim();
    var frequency = $("#frequency").val().trim();
    // console.log(typeof (frequency));
    // var firstTrainTimeMoment = moment(firstTrainTime, "HH:mm");
    // console.log("firstTrainTimeMoment", firstTrainTimeMoment);

    // var currentTime = moment();
    // var minuteArrival = currentTime.diff(firstTrainTimeMoment, "minutes");
    // var minuteLast = minuteArrival % frequency;
    // var minutesAway = frequency - minuteLast;
    // var nextArrival = currentTime.add(minutesAway, "minutes");
    // // var arrivaltime = nextArrival.format("HH:mm");
    // var arrivaltime = nextArrival.format('LT');
    database.ref().push({
        trainName: trainName,
        destination: destination,
        firstTrainTime: firstTrainTime,
        frequency: frequency,
        // arrivaltime: arrivaltime,
        // minutesAway: minutesAway
    });
});
function display(){
    $("tbody").empty();
    database.ref().on("child_added", function (childSnapshot) {
        // console.log("key", childSnapshot.key);
        // console.log(childSnapshot.val());
        // console.log(childSnapshot);
        var frequency = childSnapshot.val().frequency;
        var firstTrainTime = childSnapshot.val().firstTrainTime;
        var firstTrainTimeMoment = moment(firstTrainTime, "HH:mm");
        // console.log("firstTrainTimeMoment", firstTrainTimeMoment);
        var currentTime= moment();
    
        // setInterval(setTime, 1000);//10 s per time
    
    
        var minuteArrival = currentTime.diff(firstTrainTimeMoment, "minutes");
        var minuteLast = minuteArrival % frequency;
        var minutesAway = frequency - minuteLast;
        var nextArrival = currentTime.add(minutesAway, "minutes");
        // var arrivaltime = nextArrival.format("HH:mm");
        var arrivaltime = nextArrival.format('LT');
    
          var tableString = "<tr id='" + childSnapshot.key + "'>  <td>" +
            childSnapshot.val().trainName + "</td> <td>" +
            childSnapshot.val().destination + "</td> <td>" +
            childSnapshot.val().frequency + "</td> <td>" +
            arrivaltime + "</td> <td>" +
            minutesAway + "</td> <td>" +
            "<input type='submit' value='remove train' style='background-color:rgb(22, 119, 199)' class='remove-train btn btn-primary btn-sm'></td> </tr>";
        $("tbody").append(tableString);
    });
}
display();
setInterval(display,1000);
// function setTime() {
//     var xhr = new XMLHttpRequest();
//     xhr.onreadystatechange = function () {
//         if (this.readyState == 4 && this.status == 200) {
//             console.log("++++++++++time " + moment().format('MMMM Do YYYY, h:mm:ss a'));

//         }
//     };
//     xhr.open("GET", "https://learnwebcode.github.io/json-example/animals-1.json", true);
//     xhr.send();
//     // console.log("++++++++++time"+moment());
// }
// database.ref().on("child_changed", function (childSnapshot) {
//     console.log("child_changed", childSnapshot.key);
//     console.log(childSnapshot.val());
//     // $.ajax({
//     //     type: "",
//     //     url: "",
//     //     data: "",
//     //     dataType: "",
//     //     success: function (response) {

//     //     }
//     // });
//     setInterval(setTime, 1000);
//     function setTime() {
//         $("tbody").empty();
//         var firstTrainTimeMoment = childSnapshot.val().firstTrainTime;
//         var currentTime = moment();
//         var minuteArrival = currentTime.diff(firstTrainTimeMoment, "minutes");
//         var minuteLast = minuteArrival % frequency;
//         var minutesAway = frequency - minuteLast;
//         var nextArrival = currentTime.add(minutesAway, "minutes");
//         // var arrivaltime = nextArrival.format("HH:mm");
//         var arrivaltime = nextArrival.format('LT');
//         // childSnapshot.val().arrivaltime = arrivaltime;
//         // childSnapshot.val().minutesAway = minutesAway;
//         database.ref().update({
//             trainName: trainName,
//             destination: destination,
//             firstTrainTime: firstTrainTime,
//             frequency: frequency,
//             arrivaltime: arrivaltime,
//             minutesAway: minutesAway
//         });
//         var tableString = "<tr id='" + childSnapshot.key + "'>  <td>" +
//             childSnapshot.val().trainName + "</td> <td>" +
//             childSnapshot.val().destination + "</td> <td>" +
//             childSnapshot.val().frequency + "</td> <td>" +
//             childSnapshot.val().arrivaltime + "</td> <td>" +
//             childSnapshot.val().minutesAway + "</td> <td>" +
//             "<input type='submit' value='remove train' style='background-color:rgb(22, 119, 199)' class='remove-train btn btn-primary btn-sm'></td> </tr>";
//         $("tbody").append(tableString);
//     }

// });

// database.ref().on("value", function (snapshot) {
//     // $("tbody").empty();
//     // // console.log(snapshot.val());
//     // var keyArray = [];
//     // var n = 0;
//     // //get object key
//     // for (var key in snapshot.val()) {
//     //     // console.log("key",key);
//     //     keyArray.push(key);
//     //     // console.log("keyArray",keyArray);
//     // }
//     if (snapshot.val() == null) {
//         return;
//     }
//     snapshot.forEach(function (childSnapshot) {
//         var childKey = childSnapshot.key;
//         var childData = childSnapshot.val();
//         console.log("childKey",childKey);
//         console.log("childData",childData);
//         // ...
//         var tableString = "<tr id='" + childKey + "'>  <td>" +
//             childData.trainName + "</td> <td>" +
//             childData.destination + "</td> <td>" +
//             childData.frequency + "</td> <td>" +
//             childData.arrivaltime + "</td> <td>" +
//             childData.minutesAway + "</td> <td>" +
//             "<input type='submit' value='remove train' style='background-color:rgb(22, 119, 199)' class='remove-train btn btn-primary btn-sm'></td> </tr>";
//         $("tbody").append(tableString);
//     });
//     // $.each(snapshot.val(), function (indexInArray, valueOfElement) {
//     //     // console.log("valueOfElement",valueOfElement);
//     //     // for(var key in valueOfElement){
//     //     //     console.log("key",key);
//     //     // }
//     //     console.log("keyArray[n]", keyArray[n]);
//     //     var tableString = "<tr id='" + keyArray[n] + "'>  <td>" +
//     //         valueOfElement.trainName + "</td> <td>" +
//     //         valueOfElement.destination + "</td> <td>" +
//     //         valueOfElement.frequency + "</td> <td>" +
//     //         valueOfElement.arrivaltime + "</td> <td>" +
//     //         valueOfElement.minutesAway + "</td> <td>" +
//     //         "<input type='submit' value='remove train' style='background-color:rgb(22, 119, 199)' class='remove-train btn btn-primary btn-sm'></td> </tr>";
//     //     n++;
//     //     $("tbody").append(tableString);
//     // });
// });
// setInterval(modifiedTime, 1000);
// function modifiedTime() {
//     database.ref().on("value", function (snapshot) {

//         $("tbody").empty();
//         // console.log(snapshot.val());
//         var keyArray=[];
//         var n=0;
//         //get object key
//         for(var key in snapshot.val()){
//             // console.log("key",key);
//             keyArray.push(key);
//             // console.log("keyArray",keyArray);
//         }
//         if (snapshot.val() == null) {
//             return;
//         }
//         $.each(snapshot.val(), function (indexInArray, valueOfElement) {
//             // console.log(indexInArray);
//             var frequency = valueOfElement.frequency;
//             var firstTrainTime = valueOfElement.firstTrainTime;
//             var firstTrainTimeMoment = moment(firstTrainTime, "HH:mm");
//             console.log("firstTrainTimeMoment", firstTrainTimeMoment);
//             var currentTime = moment();
//             var minuteArrival = currentTime.diff(firstTrainTimeMoment, "minutes");
//             var minuteLast = minuteArrival % frequency;
//             var minutesAway = frequency - minuteLast;
//             var nextArrival = currentTime.add(minutesAway, "minutes");
//             // var arrivaltime = nextArrival.format("HH:mm");
//             var arrivaltime = nextArrival.format('LT');
//             //show
//                 console.log("keyArray[n]",keyArray[n]);
//                 var tableString = "<tr id='"+ keyArray[n]+"'>  <td>" +
//                     valueOfElement.trainName + "</td> <td>" +
//                     valueOfElement.destination + "</td> <td>" +
//                     valueOfElement.frequency + "</td> <td>" +
//                     valueOfElement.arrivaltime + "</td> <td>" +
//                     valueOfElement.minutesAway + "</td> <td>"+
//                     "<input type='submit' value='remove train' style='background-color:rgb(22, 119, 199)' class='remove-train btn btn-primary btn-sm'></td> </tr>";
//                 n++;    
//                 $("tbody").append(tableString);
//         });
//     });
// }
$(document).on("click", ".remove-train", function () {
    $(this).closest('tr').remove();
    var getKey = $(this).parent().parent().attr('id');
    console.log("getKey", getKey);
    database.ref().child(getKey).remove();
});
// database.ref().on('child_removed',".remove-train", function(data) {
//     deleteComment(postElement, data.key);
//   });
// database.ref().on('child_changed', function(snapshot) {
//     setCommentValues(postElement, snapshot.key, snapshot.val().text, snapshot.val().author);
//   });
// $("#testBtn").on("click", function () {
//     //ajax
//     var xhr = new XMLHttpRequest();
//     var url = "https://learnwebcode.github.io/json-example/animals-1.json";
//     xhr.onreadystatechange=function(){
//         if(this.readyState==4&&this.status==200){
//             console.log(this.responseText);
//         }
//     };
//     xhr.open("GET",url,true);
//     // request.open('GET', url);
//     // request.onload = function () {
//     //     if (request.status >= 200 && request.status < 400) {
//     //         var myData = JSON.parse(request.responseText);
//     //         console.log("myData+++++++++++++", myData);
//     //     } else {
//     //         console.log("fail log data");

//     //     }

//     // };
//     xhr.send();
// });
