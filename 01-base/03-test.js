var module = (function() {
    var _count = 0;
    var m1 = function() {
    alert(_count)
    };
    var m2 = function() {
    alert(_count + 1)
	  };
 
    return {
	    m1: m1,
	    m2: m2
    }
})();