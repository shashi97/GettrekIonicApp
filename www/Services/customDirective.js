
define(['app'], function (app) {

    app.directive('focus', function ($timeout, $parse) {
        return {
            restrict: 'A',
            link: function (scope, element, attrs) {
                scope.$watch(attrs.focus, function (newValue, oldValue) {
                    if (newValue) { element[0].focus(); }
                });
                element.bind("blur", function (e) {
                    $timeout(function () {
                        scope.$apply(attrs.focus + "=false");
                    }, 0);
                });
                element.bind("focus", function (e) {
                    $timeout(function () {
                        scope.$apply(attrs.focus + "=true");
                    }, 0);
                })
            }
        }
    })

    app.directive('onlyNumber', function () {
        return {
            restrict: 'A',
            link: function (scope, elm, attrs, ctrl) {
                elm.on('keydown', function (event) {
                    if (event.which == 64 || event.which == 16) {
                        // to allow numbers  
                        return false;
                    } else if (event.which >= 48 && event.which <= 57) {
                        // to allow numbers  
                        return true;
                    } else if (event.which >= 96 && event.which <= 105) {
                        // to allow numpad number  
                        return true;
                    } else if ([8, 13, 27, 37, 38, 39, 40].indexOf(event.which) > -1) {
                        // to allow backspace, enter, escape, arrows  
                        return true;
                    } else {
                        event.preventDefault();
                        // to stop others  
                        return false;
                    }
                });
            }
        }
    })

    app.directive('onlyCharacterNumbers', function () {
        return {
            restrict: 'A',
            link: function (scope, elm, attrs, ctrl) {
                elm.on('keyup', function (event) {
                    var val = $(this).val();
                    var newVal = val.replace(/[^a-z0-9A-Z]*/g, '');
                    if (val !== newVal) { // To prevent selection and keyboard navigation issues
                        $(this).val(newVal);
                      alert("Accept only 'character' and 'Number'");
                    }
               });
            }
          
        }
     
    })

});



