// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers'])

.run(function($ionicPlatform) {
  //$cordovaSplashScreen.hide();
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})






.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

    .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'loginCtrl'
  })

  .state('app.search', {
    url: '/search',
    views: {
      'menuContent': {
        templateUrl: 'templates/search.html',
		   controller: 'searchCtrl'
      }
    }
  })
  
.state('app.collection', {
    url: '/collection',
    views: {
      'menuContent': {
        templateUrl: 'templates/collection.html',
		   controller:'clctnCtrl'
      }
    }
  })
  
  
  
  .state('app.forgot', {
    url: '/forgot',
    views: {
      'menuContent': {
        templateUrl: 'templates/forgot.html',
		   controller:'loginCtrl'
      }
    }
  })
  
 
     .state('app.srch-results', {
    url: '/srch-results',
    views: {
      'menuContent': {
        templateUrl: 'templates/srch-results.html',
		   controller:'searchCtrl'
      }
    }
  })
   
  
  
 .state('app.signin', {
    url: '/signin',
    views: {
      'menuContent': {
        templateUrl: 'templates/signin.html',
		   controller: 'loginCtrl'
      }
    }
  })
  
 .state('app.signup', {
    url: '/signup',
    views: {
      'menuContent': {
        templateUrl: 'templates/signup.html'
		  
      }
    }
  })
  

    .state('app.home', {
      url: '/home',
      views: {
        'menuContent': {
          templateUrl: 'templates/home.html',
          controller: 'homeCtrl'
        }
      }
    })
  
  
     
  
   .state('app.colection_details', {
      url: '/colection_details',
      views: {
        'menuContent': {
          templateUrl: 'templates/colection_details.html',
           controller: 'clctnCtrl'
      
        }
      }
    })
   .state('app.singlesearch', {
      url: '/singlesearch',
      views: {
        'menuContent': {
          templateUrl: 'templates/singlesearch.html',
           controller: 'homeCtrl'
      
        }
      }
    })
  .state('app.no_result', {
      url: '/no_result',
      views: {
        'menuContent': {
          templateUrl: 'templates/no_result.html',
           controller: 'homeCtrl'
      
        }
      }
    })
  
 // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/home');
});



