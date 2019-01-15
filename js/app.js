'use strict';

var hours = ['6am', '7am', '8am', '9am', '10am', '11am', '12pm', '1pm', '2pm', '3pm', '4pm', '5pm', '6pm', '7pm', '8pm'];

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
