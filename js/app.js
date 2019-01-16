'use strict';

// HELPER FUNCTIONS
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

var ulElementsArray = Array.prototype.slice.call(document.querySelectorAll('.store'));
var ulElementsArrayPosition = 0; // Starting position, moves forward one at each .render()
// Important that each .render() is called in order

// FOR TABLE RENDERING
var hours = ['6am', '7am', '8am', '9am', '10am', '11am', '12pm', '1pm', '2pm', '3pm', '4pm', '5pm', '6pm', '7pm', '8pm'];

var allLocations = [];
var locationTable = document.getElementById('locations');


// LOCATION OBJECT CONSTRUCTOR FUNCTION
function Location(name, minCustomersEachHour, maxCustomersEachHour, avgCookiesPerCustomer) {
  this.name = name,
  this.minCustomersEachHour = minCustomersEachHour;
  this.maxCustomersEachHour = maxCustomersEachHour;
  this.avgCookiesPerCustomer = avgCookiesPerCustomer;
  this.totalDailyCookies = 0;
  this.arrCustomersEachHour = [];
  this.arrCookiesEachHour = [];
  for (var i = 0; i < hours.length; i++) {
    this.arrCustomersEachHour.push(calcRandomCustomersHourly(this.minCustomersEachHour, this.maxCustomersEachHour));
    this.arrCookiesEachHour.push(calcAvgCookiesHourly(this.avgCookiesPerCustomer, this.arrCustomersEachHour[i]));
    this.totalDailyCookies = sumArray(this.arrCookiesEachHour);
  }
  allLocations.push(this);
}
new Location('1st and Pike', 23, 65, 6.3);
new Location('SeaTac Airport', 3, 24, 1.2);
new Location('Seattle Center', 11, 38, 3.7);
new Location('Capitol Hill', 20, 38, 2.3);
new Location('Alki', 2, 16, 4.6);

console.table(allLocations);



// RENDER TABLE DATA PROTOTYPE
Location.prototype.renderTable = function () {
  // for (var i = 0; i < hours.length; i++) {
  var trEl = document.createElement('tr'); // Make a <tr> (table row)

  var tdEl = document.createElement('td'); // Make a <td> (table cell)
  console.log('created td:', tdEl);
  tdEl.textContent = this.name; // Add content to <td>
  console.log('content created at', tdEl);
  trEl.appendChild(tdEl); // Append for 'name'

  for (var i = 0; i < hours.length; i++) {
    // var trEl = document.createElement('tr');
    var tdEl = document.createElement('td'); // Make a <td> (table cell)
    tdEl.textContent = this.arrCookiesEachHour[i]; // Add content to <td>
    trEl.appendChild(tdEl);
  }

  locationTable.appendChild(trEl);

};


// Separate function to make the table header
function makeHeaderRow() {
  var trEl = document.createElement('tr');
  var thEl = document.createElement('th');
  for (var i = -1; i < hours.length; i++) { // 'i - 1' to create blank header cell above names
    var thEl = document.createElement('th');
    thEl.textContent = hours[i];
    trEl.appendChild(thEl);
  }
  thEl = document.createElement('th');
  thEl.textContent = 'Daily Location Total';
  trEl.appendChild(thEl);
  locationTable.prepend(trEl);
}

// Function to render all locations
function renderAllTables() {
  for (var i = 0; i < allLocations.length; i++) {
    allLocations[i].renderTable();
  }
}
console.log(allLocations[0]);
makeHeaderRow();
renderAllTables();








// locationOne.renderTable();




// var locationOne = new Location('1st and Pike', 23, 65, 6.3);
// var locationOne = new Location('1st and Pike', 23, 65, 6.3);
// var locationTwo = new Location('SeaTac Airport', 3, 24, 1.2);
// var locationThree = new Location('Seattle Center', 11, 38, 3.7);
// var locationFour = new Location('Capitol Hill', 20, 38, 2.3);
// var locationFive = new Location('Alki', 2, 16, 4.6);






// locationTwo.render();
// locationThree.render();
// locationFour.render();
// locationFive.render();
// var locationOne = new Location('1st and Pike', 23, 65, 6.3);

// makeHeaderRow();

// locationOne.renderTableAll();





// // Prototype method to render sales data in a list
// Location.prototype.renderList = function () {
//   this.calcCustomersEachHour(); //Calc random customers for each hour, store in array 'arrCustomersEachHour'
//   this.calcCookiesEachHour(); //Calc average cookies purchased each hour, store in array 'arrCookiesEachHour'
//   this.totalDailyCookies = sumArray(this.arrCookiesEachHour); //Calc total for the day and store in totalDailyCookies
//   for (var i = 0; i < hours.length; i++) { //Loop to display '#AM/PM: ## cookies' in a list
//     // 1. Create element to hold the data
//     var liEl = document.createElement('li');
//     // 2. Assign the data to the element
//     liEl.textContent = `${hours[i]}: ${this.arrCookiesEachHour[i]} cookies`;
//     // 3. Put the element into the DOM
//     ulElementsArray[ulElementsArrayPosition].appendChild(liEl);
//   }
//   //Adds the total as a final list item, 'Total: ## cookies'
//   var liEl = document.createElement('li');
//   liEl.textContent = `Total: ${this.totalDailyCookies} cookies`;
//   ulElementsArray[ulElementsArrayPosition].appendChild(liEl);

//   ulElementsArrayPosition++; //Increments for next Location instance
//   // allLocations.push(this); //Pushes instance into array for console.table()
// };



// function renderListAll() {
//   for (var i = 0; i < ulElementsArray.length; i++) {
//     allLocations[i].renderList();
//   }
// }