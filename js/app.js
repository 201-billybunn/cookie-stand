'use strict';

var hours = ['6am', '7am', '8am', '9am', '10am', '11am', '12pm', '1pm', '2pm', '3pm', '4pm', '5pm', '6pm', '7pm', '8pm'];

/*
// CONSTRUCTOR FUNCTIONS
change object literal into a function with a capital first letter
- add "this." before each property name
- change colons after properties to assignments "="
- replace commas after properties with semicolons ";"
- add semicolon to end of contructor function
- to invoke a new function from a constructor "var objectName = new Constructorname();"

// RESTRUCTURE OBJECTS
- create "helper functions" outside of objects that do repeated tasks (random hourly customer calc, random hourly cookie calc)
- create methods within objects that call on helper functions
- list methods separately from object with properties (have object declared with propterties, then have each method below added)
*/

//HELPER FUNCTIONS
function calcRandomCustomersHourly(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min; // The maximum is inclusive and the minimum is inclusive
}
function calcAvgCookiesHourly(customers, avgCookies) {
  return customers * avgCookies;
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
var ulElementsArrayPosition = 0;

// Ballard object
var ballard = {
  // Object properties
  name: 'Ballard',
  minCustomersEachHour: 10,
  maxCustomersEachHour: 30,
  avgCookiesPerCustomer: 5,
  arrCustomersEachHour: [],
  arrCookiesEachHour: [],
  totalDailyCookies: 0,
};

// Object methods
ballard.calcCustomersEachHour = function () {
  for (var i = 0; i < hours.length; i++) {
    this.arrCustomersEachHour.push(calcRandomCustomersHourly(this.minCustomersEachHour, this.maxCustomersEachHour));
  }
  console.log('arrCustomersEachHour:', this.arrCustomersEachHour);
};
ballard.calcCookiesEachHour = function () {
  for (var i = 0; i < hours.length; i++) {
    this.arrCookiesEachHour.push(calcAvgCookiesHourly(this.avgCookiesPerCustomer, this.arrCustomersEachHour[i]));
    // console.log(`${this.avgCookiesPerCustomer} * ${this.arrCustomersEachHour[i]} = ${this.avgCookiesPerCustomer * this.arrCustomersEachHour[i]}`);
  }
  console.log('arrCookiesEachHour:', this.arrCookiesEachHour);
};

ballard.render = function () {
  for (var i = 0 + ulElementsArrayPosition; i < ulElementsArray.length; i++) {
    this.calcCustomersEachHour();
    this.calcCookiesEachHour();
    this.totalDailyCookies = sumArray(this.arrCookiesEachHour);
    console.log(this.totalDailyCookies);
    // var ulElement = document.getElementById('store-zero');
    for (var i = 0; i < hours.length; i++) {
      // 1. Create element to hold the data
      var liEl = document.createElement('li');
      // 2. Assign the data to the element
      liEl.textContent = `${hours[i]}: ${this.arrCookiesEachHour[i]} cookies`;
      // 3. Put the element into the DOM
      // ulElement.appendChild(liEl);
      ulElementsArray[0].appendChild(liEl);
    }
    var liEl = document.createElement('li');
    liEl.textContent = `Total: ${this.totalDailyCookies} cookies`;
    ulElementsArray[0].appendChild(liEl);
    ulElementsArrayPosition++;
    break;
  }
};

ballard.render();

// 1st and Pike Object
var locationOne = {
  name: '1st and Pike',
  minCustHourly: 23,
  maxCustHourly: 65,
  aveCookiePerCust: 6.3,
  // Method to generate random number of customers per hour (between min and max above)
  randCustHourly: function () {
    return Math.floor(Math.random() * (this.maxCustHourly - this.minCustHourly)) + this.minCustHourly; // The maximum is exclusive and the minimum is inclusive
  },
  // For each store hour, multiplies # of cust (calculated above) and ave cookies per cust. Pushes result to array
  randCookiesHourly: function () {
    for (var i = 0; i < hours.length; i++) {
      this.cookiesHourly.push(Math.round(this.aveCookiePerCust * this.randCustHourly()));
    }
  },
  // Array to store the # of cookies purchased each hour
  cookiesHourly: [],
  // Sums the array above
  totalCookiesDaily: function () {
    function sum(a, b) {
      return a + b;
    }
    return this.cookiesHourly.reduce(sum);
  },
  render: function () {
    // this.randCustHourly();
    this.randCookiesHourly();
    this.totalCookiesDaily();
    for (var i = 0; i < hours.length; i++) {
      var ulElement = document.getElementById('store-one');
      // 1. Create element to hold the data
      var liEl = document.createElement('li');
      // 2. Assign the data to the element
      liEl.textContent = `${hours[i]}: ${this.cookiesHourly[i]} cookies`;
      // 3. Put the element into the DOM
      ulElement.appendChild(liEl);
    }
    var liEl = document.createElement('li');
    liEl.textContent = `Total: ${this.totalCookiesDaily()} cookies`;
    ulElement.appendChild(liEl);
    console.log(this.name, ': ', this.cookiesHourly);
  },
};

// SeaTac Airport Object
var locationTwo = {
  name: 'SeaTac Airport',
  minCustHourly: 3,
  maxCustHourly: 24,
  aveCookiePerCust: 1.2,
  randCustHourly: function () {
    return Math.floor(Math.random() * (this.maxCustHourly - this.minCustHourly)) + this.minCustHourly;
  },
  randCookiesHourly: function () {
    for (var i = 0; i < hours.length; i++) {
      this.cookiesHourly.push(Math.round(this.aveCookiePerCust * this.randCustHourly()));
    }
  },
  cookiesHourly: [],
  totalCookiesDaily: function () {
    function sum(a, b) {
      return a + b;
    }
    return this.cookiesHourly.reduce(sum);
  },
  render: function () {
    this.randCookiesHourly();
    this.totalCookiesDaily();
    for (var i = 0; i < hours.length; i++) {
      var ulElement = document.getElementById('store-two');
      var liEl = document.createElement('li');
      liEl.textContent = `${hours[i]}: ${this.cookiesHourly[i]} cookies`;
      ulElement.appendChild(liEl);
    }
    var liEl = document.createElement('li');
    liEl.textContent = `Total: ${this.totalCookiesDaily()} cookies`;
    ulElement.appendChild(liEl);
    console.log(this.name, ': ', this.cookiesHourly);
  },
};

// Seattle Center Object
var locationThree = {
  name: 'Seattle Center',
  minCustHourly: 11,
  maxCustHourly: 38,
  aveCookiePerCust: 3.7,
  randCustHourly: function () {
    return Math.floor(Math.random() * (this.maxCustHourly - this.minCustHourly)) + this.minCustHourly;
  },
  randCookiesHourly: function () {
    for (var i = 0; i < hours.length; i++) {
      this.cookiesHourly.push(Math.round(this.aveCookiePerCust * this.randCustHourly()));
    }
  },
  cookiesHourly: [],
  totalCookiesDaily: function () {
    function sum(a, b) {
      return a + b;
    }
    return this.cookiesHourly.reduce(sum);
  },
  render: function () {
    this.randCookiesHourly();
    this.totalCookiesDaily();
    for (var i = 0; i < hours.length; i++) {
      var ulElement = document.getElementById('store-three');
      var liEl = document.createElement('li');
      liEl.textContent = `${hours[i]}: ${this.cookiesHourly[i]} cookies`;
      ulElement.appendChild(liEl);
    }
    var liEl = document.createElement('li');
    liEl.textContent = `Total: ${this.totalCookiesDaily()} cookies`;
    ulElement.appendChild(liEl);
    console.log(this.name, ': ', this.cookiesHourly);
  },
};

// Capitol Hill Object
var locationFour = {
  name: 'Capitol Hill',
  minCustHourly: 20,
  maxCustHourly: 38,
  aveCookiePerCust: 2.3,
  randCustHourly: function () {
    return Math.floor(Math.random() * (this.maxCustHourly - this.minCustHourly)) + this.minCustHourly;
  },
  randCookiesHourly: function () {
    for (var i = 0; i < hours.length; i++) {
      this.cookiesHourly.push(Math.round(this.aveCookiePerCust * this.randCustHourly()));
    }
  },
  cookiesHourly: [],
  totalCookiesDaily: function () {
    function sum(a, b) {
      return a + b;
    }
    return this.cookiesHourly.reduce(sum);
  },
  render: function () {
    this.randCookiesHourly();
    this.totalCookiesDaily();
    for (var i = 0; i < hours.length; i++) {
      var ulElement = document.getElementById('store-four');
      var liEl = document.createElement('li');
      liEl.textContent = `${hours[i]}: ${this.cookiesHourly[i]} cookies`;
      ulElement.appendChild(liEl);
    }
    var liEl = document.createElement('li');
    liEl.textContent = `Total: ${this.totalCookiesDaily()} cookies`;
    ulElement.appendChild(liEl);
    console.log(this.name, ': ', this.cookiesHourly);
  },
};

// Alki Object
var locationFive = {
  name: 'Alki',
  minCustHourly: 2,
  maxCustHourly: 16,
  aveCookiePerCust: 4.6,
  randCustHourly: function () {
    return Math.floor(Math.random() * (this.maxCustHourly - this.minCustHourly)) + this.minCustHourly;
  },
  randCookiesHourly: function () {
    for (var i = 0; i < hours.length; i++) {
      this.cookiesHourly.push(Math.round(this.aveCookiePerCust * this.randCustHourly()));
    }
  },
  cookiesHourly: [],
  totalCookiesDaily: function () {
    function sum(a, b) {
      return a + b;
    }
    return this.cookiesHourly.reduce(sum);
  },
  render: function () {
    this.randCookiesHourly();
    this.totalCookiesDaily();
    for (var i = 0; i < hours.length; i++) {
      var ulElement = document.getElementById('store-five');
      var liEl = document.createElement('li');
      liEl.textContent = `${hours[i]}: ${this.cookiesHourly[i]} cookies`;
      ulElement.appendChild(liEl);
    }
    var liEl = document.createElement('li');
    liEl.textContent = `Total: ${this.totalCookiesDaily()} cookies`;
    ulElement.appendChild(liEl);
    console.log(this.name, ': ', this.cookiesHourly);
  },
};

locationOne.render();
locationTwo.render();
locationThree.render();
locationFour.render();
locationFive.render();
