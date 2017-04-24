
var app = angular.module('starter', ['ionic', 'ionic-datepicker', 'LocalStorageModule', 'ui.select', 'ngCookies'])

app.run(function ($ionicPlatform) {
    $ionicPlatform.ready(function () {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            cordova.plugins.Keyboard.disableScroll(true);

        }
        if (window.StatusBar) {
            // org.apache.cordova.statusbar required
            StatusBar.styleLightContent();
        }
    });
})

app.config(function ($stateProvider, $urlRouterProvider,$httpProvider) {
    //$stateProvider

    $stateProvider
      .state('aindex', {
          url: '/aindex',
          templateUrl: 'templates/aindex.html',
          controller: 'aIndexController'
      })
// login page route

     .state('login', {
         url: '/login',
         templateUrl: 'templates/login.html',
         controller: 'loginController'
     })

//Today Tab functionality
    .state('Today', {
        url: '/Today/:IsDate',
        cache: false,
        templateUrl: 'templates/DayTemplate/Today.html',
    
        controller: 'TodayController'
    })
        
    .state('Todaydetail', {
        url: '/TodayDetail/:AttStatus/:AttDate/:IsDate/:Value/:Name',
        cache:true,
        templateUrl: 'templates/DayTemplate/Todaydetail.html',
        controller: 'AttendanceSummeryController'
    })

//Date Tab functionality
    //.state('Daytab.Date', {
    //    url: '/Date/:IsDate',
    //    views: {
    //        'Daytab-Date': {
    //            url: '/TodayDetail/:AttStatus/:AttDate/:IsDate/:Value/:Name',
    //            templateUrl: 'templates/DayTemplate/Date.html',
    //            controller: 'DateCtrl'
    //        }
    //    }
    //})

//Month Tab functionality
    .state('MonthTab', {
        url: '/MonthTab',
        cache: false,
        abstract: true,
        templateUrl: 'templates/MonthTemplate/MonthTab.html'
    })

//ThisMonth Tab functionality
    .state('ThisMonth', {
        url: '/ThisMonth',
        cache: false,
        templateUrl: 'templates/MonthTemplate/ThisMonth.html',
        controller: 'ThisMonthController'
    })

 .state('ThisMonthdetail', {
     url: '/ThisMonthdetail/:Value/:Name/:ThisMonthId',
     cache: false,
     templateUrl: 'templates/MonthTemplate/ThisMonthdetail.html',
     controller: 'ThisMonthdetailController'

 })
//LastMonth Tab functionality
    .state('MonthTab.LastMonth', {
        url: '/LastMonth',
        cache: false,
        views: {
            'MonthTab-LastMonth': {
                templateUrl: 'templates/MonthTemplate/LastMonth.html'
            }
        }
    })
    //******************************************************************\\
    //******************************************************************\\
    $urlRouterProvider.otherwise('/aindex')
    $httpProvider.interceptors.push('interceptorService');
})
app.directive('allowPattern', [allowPatternDirective]);

function allowPatternDirective() {
    return {
        restrict: "A",
        compile: function (tElement, tAttrs) {
            return function (scope, element, attrs) {
                // I handle key events
                element.bind("keypress", function (event) {
                    var keyCode = event.which || event.keyCode; // I safely get the keyCode pressed from the event.
                    var keyCodeChar = String.fromCharCode(keyCode); // I determine the char from the keyCode.

                    // If the keyCode char does not match the allowed Regex Pattern, then don't allow the input into the field.
                    if (!keyCodeChar.match(new RegExp(attrs.allowPattern, "i"))) {
                        event.preventDefault();
                        
                        return false;

                    }

                });
            };
        }
    };
}
//var serviceBase = 'http://localhost:26264/'; 
var serviceBase = 'http://server.conqsys.com:156/';
app.constant('ngAuthSettings', {
    apiServiceBaseUri: serviceBase,
    clientId: 'PayRollMobileApp'
});
