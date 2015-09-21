






function test() {

    var value = 100;
    var a = {};

    return {
        set: function (v) {
            value = v;
        },

        show: function () {
            console.log(value);
        }
    };
}


test();

var obj1 = test();
obj1.set(123);
obj1.show();


var obj2 = test();
obj2.set(456);
obj2.show();


(function () {
    var a = 1;

    if (a === 1) {
        require('a.js');
    }

})()


var A = {

};

A.B = {

};
A.B.C = {

};

var A = {

    B: {

        C: {

        }
    }
};

