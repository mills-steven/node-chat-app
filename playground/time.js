var moment = require('moment');

// var date = new Date()
//
// console.log(date.getMonth());
var createdAt = 1494362139962
var date = moment(createdAt);
console.log(date.startOf('minute').fromNow());

var createdAt = 1494362139962
var date = moment(createdAt);
console.log(date.format('h:mm a'))


var someTimestamp = moment().valueOf();
console.log(someTimestamp);
