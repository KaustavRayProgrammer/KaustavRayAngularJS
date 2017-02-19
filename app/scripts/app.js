'use strict';

angular.module('confusionApp', ['ui.router','ngResource'])
.config(function($stateProvider, $urlRouterProvider) {
        $stateProvider
        
            // route for the home page
            .state('app', {
                url:'/',
                views: {
                    'header': {
                        templateUrl : 'views/header.html',
                    },
                    'content': {
                        templateUrl : 'views/home.html',
                        controller  : 'IndexController'
                    },
                    'footer': {
                        templateUrl : 'views/footer.html',
                    }
                }

            })
        
            // route for the aboutus page
            .state('app.aboutus', {
                url:'aboutus',
                views: {
                    'content@': {
                        templateUrl : 'views/aboutus.html',
                        controller  : 'AboutController'                  
                    }
                }
            })
        
            // route for the contactus page
            .state('app.contactus', {
                url:'contactus',
                views: {
                    'content@': {
                        templateUrl : 'views/contactus.html',
                        controller  : 'ContactController'                  
                    }
                }
            })

            // route for the projects page
            .state('app.projects', {
                url: 'projects',
                views: {
                    'content@': {
                        templateUrl : 'views/projects.html',
                        controller  : 'ProjectController'
                    }
                }
            })

            // route for the projectdetail page
            .state('app.projectdetails', {
                url: 'projects/:id',
                views: {
                    'content@': {
                        templateUrl : 'views/projectdetail.html',
                        controller  : 'ProjectDetailController'
                   }
                }
            });
    
        $urlRouterProvider.otherwise('/');
    })
;
