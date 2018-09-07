'use strict';
(function () {
	angular.module('myApp')

	.filter('startsWithA', function (selectedSearch) {
	    return function (items) {
	    	console.log('checking item', items)
	    	console.log('selectedSearch in', selectedSearch)
	    	
	        var filtered = [];
	        for (var i = 0; i < items.length; i++) {
	            var item = items[i];
	            if (item.debt!=0) {
	                filtered.push(item);
	            }
	        }
	        return filtered;
	    };
	});

})();