'use strict';

var hours = ['6am', '7am', '8am', '9am', '10am', '11am', '12pm', '1pm', '2pm', '3pm', '4pm', '5pm', '6pm', '7pm', '8pm'];

//HELPER FUNCTIONS
function calcRandomCustomersHourly(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min; // The maximum is inclusive and the minimum is inclusive
}
function calcAvgCookiesHourly(customers, avgCookies) {
  return Math.round(customers * avgCookies);
}
function sumArray(arrName) { // Sums an array of numbers
  function sum(a, b) {
    return a + b;
  }
  return arrName.reduce(sum);
}

/*
NOTE:
  Instead of doing the following to select individual element nodes:
    var ulElement = document.getElementById('store-zero');
  I used .querySelectorAll(), which selects multiple elements (a nodelist) by a CSS selector.
  Page 188 in the Duckett Javascript book explains some of these terms and DOM query methods.
  The rest of the expression -- Array.prototype.slice.call() -- stores the nodelist into an JS array I can loop through and use;
  just like the ulElement variable above. There's some great explainations at the links below.
https://www.w3schools.com/jsref/met_document_queryselectorall.asp
https://davidwalsh.name/nodelist-array
https://stackoverflow.com/questions/2125714/explanation-of-slice-call-in-javascript
*/
var ulElementsArray = Array.prototype.slice.call(document.querySelectorAll('.store'));
var ulElementsArrayPosition = 0; // Starting position, moves forward one at each .render()
// Important that each .render() is called in order

var allLocations = [];

// Location Object Constructor Function
function Location(name, minCustomersEachHour, maxCustomersEachHour, avgCookiesPerCustomer) {
  // Object properties
  this.name = name,
  this.minCustomersEachHour = minCustomersEachHour;
  this.maxCustomersEachHour = maxCustomersEachHour;
  this.avgCookiesPerCustomer = avgCookiesPerCustomer;
  this.arrCustomersEachHour = [];
  this.arrCookiesEachHour = [];
  this.totalDailyCookies = 0;

  // Object methods
  this.calcCustomersEachHour = function () {
    for (var i = 0; i < hours.length; i++) {
      this.arrCustomersEachHour.push(calcRandomCustomersHourly(this.minCustomersEachHour, this.maxCustomersEachHour));
    }
  };
  this.calcCookiesEachHour = function () {
    for (var i = 0; i < hours.length; i++) {
      this.arrCookiesEachHour.push(calcAvgCookiesHourly(this.avgCookiesPerCustomer, this.arrCustomersEachHour[i]));
    }
  };

  this.render = function () {
    this.calcCustomersEachHour(); //Calc random customers for each hour, store in array 'arrCustomersEachHour'
    this.calcCookiesEachHour(); //Calc average cookies purchased each hour, store in array 'arrCookiesEachHour'
    this.totalDailyCookies = sumArray(this.arrCookiesEachHour); //Calc total for the day and store in totalDailyCookies
    for (var i = 0; i < hours.length; i++) { //Loop to display '#AM/PM: ## cookies' in a list
      // 1. Create element to hold the data
      var liEl = document.createElement('li');
      // 2. Assign the data to the element
      liEl.textContent = `${hours[i]}: ${this.arrCookiesEachHour[i]} cookies`;
      // 3. Put the element into the DOM
      ulElementsArray[ulElementsArrayPosition].appendChild(liEl);
    }
    //Adds the total as a final list item, 'Total: ## cookies'
    var liEl = document.createElement('li');
    liEl.textContent = `Total: ${this.totalDailyCookies} cookies`;
    ulElementsArray[ulElementsArrayPosition].appendChild(liEl);
    ulElementsArrayPosition++; //Increments for next Location instance
    allLocations.push(this); //Pushes instance into array for console.table() below
  };
}

var locationOne = new Location('1st and Pike', 23, 65, 6.3);
var locationTwo = new Location('SeaTac Airport', 3, 24, 1.2);
var locationThree = new Location('Seattle Center', 11, 38, 3.7);
var locationFour = new Location('Capitol Hill', 20, 38, 2.3);
var locationFive = new Location('Alki', 2, 16, 4.6);

locationOne.render();
locationTwo.render();
locationThree.render();
locationFour.render();
locationFive.render();

console.table(allLocations);
