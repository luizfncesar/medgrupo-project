import EventTimeTracker from "../../../common/js/EventTimeTracker";

let clickTracker = new EventTimeTracker;
clickTracker.listen("click focus");

setInterval(function() {
	console.log("last click: " + clickTracker.getLastOccurrence("click"));
}, 1000);

setInterval(function() {
	console.log("last focus: " + clickTracker.getLastOccurrence("focus"));
}, 2000);

setInterval(function() {
	console.log("last focus OR click: " + clickTracker.getLastOccurrence("click focus"));
}, 2000);
