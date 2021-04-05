var helper3 = (function(window, undefined) {
    /* declaring an object inside a function 
       is another way of calling functions */

    var helper3 = {};

    helper3.showAlert = function(){
        console.log("Helper3 in a flash");
    };

    return helper3;

})(window);

helper3.showAlert();