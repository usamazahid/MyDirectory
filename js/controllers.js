var App =angular.module('starter.controllers', ['ionic.closePopup'])

//validation
App.directive('numbersOnly', function () {
    return {
        require: 'ngModel',
        link: function (scope, element, attr, ngModelCtrl) {
            function fromUser(text) {
                if (text) {
                    var transformedInput = text.replace(/[^0-9]/g, '');

                    if (transformedInput !== text) {
                        ngModelCtrl.$setViewValue(transformedInput);
                        ngModelCtrl.$render();
                    }
                    return transformedInput;
                }
                return undefined;
            }            
            ngModelCtrl.$parsers.push(fromUser);
        }
    };
});

App.directive("raty", function() {
    return {
        restrict: 'AE',
        link: function(scope, elem, attrs) {
            scope.$evalAsync(function(){
                
                $(elem).raty({start: attrs.score,
                              number: attrs.number,
                              starOff   : 'star-off.png',
                              starOn:'star-on.png',
                              readOnly:  true});
            });
            
        }
    }
});










