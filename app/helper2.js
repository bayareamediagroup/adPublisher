var helper2 = (function(window, undefined) {
    /* declaring an object inside a function 
       is another way of calling functions */

    var helper2 = {};

    helper2.showAlert = function(){
        console.log("Helper2 in a flash");
    };

    return helper2;

})(window);

helper2.showAlert();