'use strict';

// +++++++++++++++++++++++++++++++++++++++++++++++++++++
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

// +++++++++++++++++++++++++++++++++++++++++++++++++++++
// GLOBAL VARIABLES
var storeTable = document.getElementById('stores');
var tableForm = document.getElementById('table-form');

var hours = ['6 AM', '7 AM', '8 AM', '9 AM', '10 AM', '11 AM', '12 PM', '1 PM', '2 PM', '3 PM', '4 PM', '5 PM', '6 PM', '7 PM', '8 PM'];
var allStores = [];
var storeTotalArray = [];

// +++++++++++++++++++++++++++++++++++++++++++++++++++++
// STORE OBJECT CONSTRUCTOR FUNCTION
function Store(storeName, minCustomersEachHour, maxCustomersEachHour, avgCookiesPerCustomer) {
  this.storeName = storeName,
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
  allStores.push(this); // Pushes each instances into array 'allStores'
  storeTotalArray.push(this.totalDailyCookies); // Pushes each instances' 
}

// +++++++++++++++++++++++++++++++++++++++++++++++++++++
// EVENT HANDLER FOR SUBMISSION OF TABLE DATA
function handleTableSubmit(event) {
  console.log('name:',event.target.name.value);
  console.log('name:',event.target.min.value);
  console.log('name:',event.target.max.value);
  console.log('name:',event.target.avg.value);

  event.preventDefault(); // Prevents page reload on a 'submit' event

  // put HTML5 form validation here

  var storeName = event.target.name.value;
  var minCustomersEachHour = parseInt(event.target.min.value);
  var maxCustomersEachHour = parseInt(event.target.max.value);
  var avgCookiesPerCustomer = parseInt(event.target.avg.value);

  new Store(storeName, minCustomersEachHour, maxCustomersEachHour, avgCookiesPerCustomer);

  storeTable.textContent = '';

  Store.renderHeader();
  renderAllTables();
  Store.renderFooter();

  // Empties form fields
  event.target.name.value = null;
  event.target.min.value = null;
  event.target.max.value = null;
  event.target.avg.value = null;
}

// EVENT LISTENTER FOR TABLE SUBMISSION FORM
tableForm.addEventListener('submit', handleTableSubmit);

// RENDER TABLE DATA PROTOTYPE
Store.prototype.renderTable = function () {
  var trEl = document.createElement('tr'); // Make a <tr> (table row)
  // Create, content, append for 'Name'
  var tdEl = document.createElement('td'); // Make a <td> (table cell)
  tdEl.textContent = this.storeName; // Add content to <td> (the name property)
  trEl.appendChild(tdEl); // Append the table row with the <td>
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
  storeTable.appendChild(trEl);

  console.log('ran renderTable');
};

// Function to make the table header
Store.renderHeader = function () {
  var trEl = document.createElement('tr');
  var thEl = document.createElement('th');
  for (var i = -1; i < hours.length; i++) { // 'i - 1' to create blank header cell above names
    var thEl = document.createElement('th');
    thEl.textContent = hours[i];
    trEl.appendChild(thEl);
  }
  thEl = document.createElement('th');
  thEl.textContent = 'Daily Store Total';
  trEl.appendChild(thEl);
  storeTable.prepend(trEl);

  console.log('ran renderHeader');
}

// Function to make the table footer
Store.renderFooter = function () {
  var trEl = document.createElement('tr');
  var tdEl = document.createElement('td');
  var grandTotal = document.createElement('td');
  tdEl.textContent = 'Hourly Total';
  trEl.appendChild(tdEl);
  for (var i = 0; i < hours.length; i++) {
    var totalPerHour = 0;
    var tdEl = document.createElement('td');
    for (var j = 0; j < allStores.length; j++) {
      totalPerHour += allStores[j].arrCookiesEachHour[i];
    }
    tdEl = document.createElement('td');
    tdEl.textContent = totalPerHour;
    trEl.appendChild(tdEl);
  }
  storeTable.appendChild(trEl);

  grandTotal = document.createElement('td');
  grandTotal.textContent = sumArray(storeTotalArray); // Sums daily total array
  trEl.appendChild(grandTotal); // Adds grand total to footer

  console.log('ran renderFooter');
};

// Function to render all stores
function renderAllTables() {
  for (var i = 0; i < allStores.length; i++) {
    allStores[i].renderTable();
  }
  console.log('ran renderAllTables');
}











// Create Store instances
new Store('1st and Pike', 23, 65, 6.3);
new Store('SeaTac Airport', 3, 24, 1.2);
new Store('Seattle Center', 11, 38, 3.7);
new Store('Capitol Hill', 20, 38, 2.3);
new Store('Alki', 2, 16, 4.6);

console.table(allStores);
Store.renderHeader();
renderAllTables();
Store.renderFooter();
