'use strict';

var hours = ['6am', '7am', '8am', '9am', '10am', '11am', '12pm', '1pm', '2pm', '3pm', '4pm', '5pm', '6pm', '7pm', '8pm'];

var firstAndPike = {
  minCustHourly: 23,
  maxCustHourly: 65,
  aveCookiePerCust: 10, // change back to 6.3
  // Method to generate random number of customers (between min and max above)
  randCustHourly: function() {
    return Math.floor(Math.random() * (this.maxCustHourly - this.minCustHourly)) + this.minCustHourly; // The maximum is exclusive and the minimum is inclusive
  },
  // For each store hour, multiplies # of cust (calculated above) and ave cookies per cust. Pushes result to array
  randCookiesHourly: function() {
    for (var i = 0; i < hours.length; i++) {
      this.cookiesHourly.push(this.aveCookiePerCust * this.randCustHourly());
    }
  },
  cookiesHourly: [],
  // Sums cookiesHourly array
  totalCookiesDaily: function() {
    function sum(a, b) {
      return a + b;
    }
    return this.cookiesHourly.reduce(sum);
  }
}
firstAndPike.randCustHourly();
firstAndPike.randCookiesHourly();
firstAndPike.totalCookiesDaily();