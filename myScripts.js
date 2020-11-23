//"use strict";
var fruits = ["Banana", "Orange", "Lemon", "Apple", "Mango"];
var nums = [40, 100, 1, 5, 25, 10];
var txt ="";
var hello;
var myCars = [];
var myPeople = [];

function changeBackground(){
    document.getElementById("intro").style.background = "black";

}
function calc(x){
    var input = document.getElementById("num1").value;
    var input2 = document.getElementById("num2").value;
    if(x==='exp'){
    document.getElementById("calc").innerHTML = exponential(input,input2);
    }
    if(x==='add'){
    document.getElementById("calc").innerHTML = addNums(input,input2);
    }
}
function addNums(x,y){
    return +x + +y;
}

function exponential(x, y){
    return x**y;
    //Math.Pow(x,y);
}

function makePerson(){
    var fname = document.getElementById("name1").value;
    fname.trim();
    var lname = document.getElementById("name2").value;
    lname.trim();
    var phone = document.getElementById("phone").value;
    phone.trim();
    var person ={
        firstName: fname,
        lastName: lname,
        phoneNumber: phone,
        fullName: function(){ return this.firstName + " " + this.lastName;}
    };
    myPeople.push(person);

    document.getElementById("name1").value = "";
    document.getElementById("name2").value = "";
    document.getElementById("phone").value = "";
    document.getElementById("person").innerHTML = "";
    var x = myPeople.length;
    var q;
    for(q = 0; q< x; q++){
        document.getElementById("person").innerHTML += myPeople[q].firstName.toString() + " "  + myPeople[q].lastName.toString();
    }
}

function slice2(){
    var first = document.getElementById("sliceA").value;
    var second = document.getElementById("sliceB").value;
    if(first !=null && second != null){
    document.getElementById("arrayStuff").innerHTML = "Slice(A,B): " + fruits.slice(first,second);
    }
}

function slice(){
        var first = document.getElementById("slice1").value;
        if(first!=null){
            document.getElementById("arrayStuff").innerHTML = "Slice: " + fruits.slice(first);
        }
}

function popIt(){
        document.getElementById("arrayStuff").innerHTML = "Popped: " + fruits.pop();
}
function pushIt(){
        //var fruits = ["Banana", "Orange", "Lemon", "Apple", "Mango"];
        fruits.push(document.getElementById("pushed").value);
        document.getElementById("arrayStuff").innerHTML = "Pushed: " + fruits.toString();
}
function sortIt(){
        document.getElementById("arrayStuff").innerHTML = "Sorted: "+ fruits.sort();
}
function reverseIt(){
        document.getElementById("arrayStuff").innerText = "Reversed: " + fruits.reverse();
}
function remakeArray(){
        fruits = ["Banana", "Orange", "Lemon", "Apple", "Mango"];
}
function sortNums(){
        nums.sort(function(a, b){return a - b});
        document.getElementById("arrayStuff").innerText = "nums ASC: " + nums;
        nums.sort(function(a, b){return b - a});
        document.getElementById("arrayStuff").innerText += "   nums DESC: " + nums;
}
function randomSort(){
        nums.sort(function(a, b){return 0.5 - Math.random()});
        document.getElementById("arrayStuff").innerHTML = "Random Sort: " + nums;
}
function genRandomNum(){
        var min = document.getElementById("rand1").value;
        var max = document.getElementById("rand2").value;
        var rand1 = max - min;
        var rand2 = Math.random()*rand1;
        var rand3 = Math.floor(rand2);
        var rand4 = parseInt(rand3) + parseInt(min);
        document.getElementById("arrayStuff").innerHTML ="Random Number between: " +min +" and "+ max +" is " + rand4;
}
function checkAge(){
        var age = document.getElementById("age").value;
        var over18 = (age<18) ? "Too Young":"Old Enough";
        document.getElementById("loopStuff").innerHTML= over18 + " to vote";
}
function loopArray(){
        var x;

        for(x of fruits ){
            document.getElementById("loopStuff").innerHTML += x + "<br/>";
        }
}

function loopArrayEach(){ 
    
    fruits.forEach(forEachMethod);
    document.getElementById("loopStuff").innerHTML = txt;
    }
    function forEachMethod(value, index, array){
    txt = txt + value + "<br/>";
    }
    function changeType(){
        var ogType = document.getElementById("typeOut").value;
        var newType = document.getElementById("dropdownTypeList").value;
        switch(newType){
            case "string":
                ogType = String(ogType);
                //ogType = JSON.stringify(ogType)
                break;
            case "boolean":
                ogType = false;
                break;
            case "number":
                ogType = Number(ogType);
                break;
        }
        document.getElementById("typeOut").innerHTML = "Type: "+ typeof(ogType);
}
    
function regExpression(){
        var mySelection = fruits.toString();
        var myChoice = document.getElementById("chosenFruit").value;
        var n;
        switch(myChoice)
        {
            case "Banana":
                n = mySelection.search(/bAnANa/i);
                break;
        }
        var found = false;
        if(n>=0){
            found = true;
        }
        document.getElementById("afterType").innerHTML = "Finding: " + myChoice.toString() +" Found? :" + found;
}

    //LAMBDA AKA ARROW FUNCTION var hello is a global var
    hello = val => "Hello " + val;

    
function makeCars(){
        var make = document.getElementById('Make').value;
        var model=  document.getElementById('Model').value;
        var newCar = new Cars(make, model);
        //debugger;
        //console.log(newCar.make);
        myCars.push(newCar);
        document.getElementById("carCreations").innerHTML = " ";
        for(var x = 0; x < myCars.length; x++){
        document.getElementById("carCreations").innerHTML += myCars[x].make + " " + myCars[x].model+" <br/>";
        }
}

class Cars{
        constructor(make, model){
            this.make = make;
            this.model = model;
            this.year = Date.now();
            this.country = "";
        }
        getYear(){
            return this.year.toString();
        }
        setYear(age){
            this.year = age;
        }
        getCountry(){
            return this.country.toString();
        }
        setCountry(place){
            this.country = place;
        }
        /* IF "YEAR" WAS An ATTRIBUTE
        age() {
            let date = new Date();
            return date.getFullYear() - this.year;
          }*/
    }
    function getYears(){
        var x;
        var myLength = myCars.length;
        for(x = 0; x < myLength; x++){
        document.getElementById("carCreations").innerHTML += myCars[x].getYear() + "Found last '1' @ index -->   ";
        document.getElementById("carCreations").innerHTML += myCars[x].getYear().lastIndexOf("1") + " <br/>";
    }
}
function loadFile() {
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
          if (this.readyState == 4 && this.status == 200) {
            document.getElementById("firstAjax").innerHTML =
            this.responseText;
          }
        };
        xhttp.open("GET", "qfi.txt", true);
        xhttp.send();
}

function myDisplayer(some){
        //technically just for async/CallBack annd beyond stuff
        document.getElementById("async").innerHTML = some;
    
}

function playDOM(){
        var x = document.images;
        document.getElementById("async").innerHTML = document.images.length +" " + x[0].src + " & " + x[1].src;
        var y = document.getElementsByTagName("p");
        document.getElementById("async").innerHTML += "\n" + y[0].innerHTML;
        var z = document.querySelectorAll("p.c");
        document.getElementById("async").innerHTML += "\n" + z[0].innerHTML + z[1].innerHTML;
}
    var id;
function myMove() {
        var elem = document.getElementById("animate");   
        var pos = 0;
        var right = true;
         id = setInterval(frame, 5);
        function frame() {
          if (right == false) {
            pos--; 
            elem.style.top = pos + "px"; 
            elem.style.left = pos + "px"; 
              if(pos == 0){
                right = true;
                }
          } else {
                pos++; 
                elem.style.top = pos + "px"; 
                elem.style.left = pos + "px"; 
                if(pos == 350){
                right = false;
                }
          }
        }
}
      
function myStop(){
          clearInterval(id);
}
var adPar = 0;
function addChild(){
    adPar++;
    var para = document.createElement("p");
    var node = document.createTextNode("Number "+ adPar + " paragraph added");
    para.appendChild(node);

    var elem = document.getElementById("Append");
    elem.appendChild(para);
}
function addChildBefore(){
    adPar++;
    var para = document.createElement("p");
    var node = document.createTextNode("Number "+ adPar + " paragraph added");
    para.appendChild(node);

    var elem = document.getElementById("Append");
    var child = document.getElementById("p1Child");
    elem.insertBefore(para,child);
}

function deleteChild(){
    var elemnt  = document.getElementById("Append").lastChild;
    elemnt.remove();
}

function findHeaders(){
    var num = document.getElementById("nNumber").value;
    var myNodelist = document.querySelectorAll("h"+num);
    var i;
    for (i = 0; i < myNodelist.length; i++) {
        myNodelist[i].style.color = "red";
  }
}

function confirmBox(){
    var txt;
    if (confirm("Go To Google?")) {
        window.location.replace("http://www.google.com");
    } 
}
function promptBox(){
    var person = prompt("Please enter your name", "Harry Potter");

    if (person == null || person == "") {
    txt = "User cancelled the prompt.";
    } else {
    txt = "Hello " + person + "! How are you today?";
    } 
}

function readTextFile(input){
    if(input!=null){
        let file = input.files[0];

        let reader = new FileReader();

        reader.readAsText(file);
    
        reader.onload = function() {
            document.getElementById("firstAjax").innerHTML = reader.result;
            //console.log(reader.result);
        };
    
        reader.onerror = function() {
            document.getElementById("firstAjax").innerHTML = reader.result;
            //console.log(reader.error);
        };
    }
}
var myObjec, myJSON, text, objec;

function JSONstore(){
    var tName = document.getElementById("jsonName").value;
    var tAge = document.getElementById("jsonAge").value;
    var tCity = document.getElementById("jsonCity").value;
    var jName = document.getElementById("jsonKey").value;
    if(tName || tAge || tCity || jName != null){
    myObjec = {name: tName, age: tAge, city: tCity};
    //JSON ARRAY --> {"employees":[ "John", "Anna", "Peter" ]}
    myJSON = JSON.stringify(myObjec);
    localStorage.setItem(jName, myJSON);
    document.getElementById("jsonTest").innerHTML = "Stored Person from:  " + myObjec.city.toString();
    }else{
        alert("All inputs must be filled");
    }
}

function JSONget(){
    var xy;
    jName = document.getElementById("jsonKey").value;
    text = localStorage.getItem(jName);
    obj = JSON.parse(text);
    for(xy in obj){
    document.getElementById("jsonTest").innerHTML += " - " + obj[xy] ; 

    }
}

function storeSesh(){
    var tName = document.getElementById("jsonName").value;
    var tAge = document.getElementById("jsonAge").value;
    var tCity = document.getElementById("jsonCity").value;
    var jName = document.getElementById("jsonKey").value;
    if(tName || tAge || tCity || jName != null){
    myObjec = {name: tName, age: tAge, city: tCity};
    //JSON ARRAY --> {"employees":[ "John", "Anna", "Peter" ]}
    myJSON = JSON.stringify(myObjec);
    sessionStorage.setItem(jName, myJSON);
    document.getElementById("jsonTest").innerHTML = "Stored Person from:  " + myObjec.city.toString();
    }else{
        alert("All inputs must be filled");
    }
}

function seshGet(){
    var xy;
    jName = document.getElementById("jsonKey").value;
    text = sessionStorage.getItem(jName);
    obj = JSON.parse(text);
    for(xy in obj){
    document.getElementById("jsonTest").innerHTML += " - " + obj[xy] ; 
    }
}