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

var hours = ['6 AM', '7 AM', '8 AM', '9 AM', '10 AM', '11 AM', '12 PM', '1 PM', '2 PM', '3 PM', '4 PM', '5 PM', '6 PM', '7 PM', '8 PM'];

var allLocations = [];
var grandTotal = [];
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

// RENDER TABLE DATA PROTOTYPE
Location.prototype.renderTable = function () {
  var trEl = document.createElement('tr'); // Make a <tr> (table row)

  // Loop to create, content, append for 'Name'
  var tdEl = document.createElement('td'); // Make a <td> (table cell)
  tdEl.textContent = this.name; // Add content to <td>
  trEl.appendChild(tdEl); // Append for 'name'

  // Loop to create, content, append for 'arrCookiesEachHour'
  for (var i = 0; i < hours.length; i++) {
    var tdEl = document.createElement('td');
    tdEl.textContent = this.arrCookiesEachHour[i];
    trEl.appendChild(tdEl);
  }

  // Create, content, append for 'Daily Total'
  tdEl = document.createElement('td');
  tdEl.textContent = this.totalDailyCookies;
  trEl.appendChild(tdEl);

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

// Create Location instances
new Location('1st and Pike', 23, 65, 6.3);
new Location('SeaTac Airport', 3, 24, 1.2);
new Location('Seattle Center', 11, 38, 3.7);
new Location('Capitol Hill', 20, 38, 2.3);
new Location('Alki', 2, 16, 4.6);

console.table(allLocations);
makeHeaderRow();
renderAllTables();
