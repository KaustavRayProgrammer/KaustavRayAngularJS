'use strict';

angular.module('confusionApp')

        .controller('ProjectController', ['$scope', 'projectFactory', function($scope, projectFactory) {
            
            $scope.tab = 1;
            $scope.filtText = '';
            $scope.showDetails = false;
			$scope.showMenu = false;
            $scope.message = "Loading ...";
			
            projectFactory.getProjects().query(
                function(response) {
                    $scope.projects = response;
					
					for (var i=0; i < $scope.projects.length; i++)
					{
						$scope.projects[i].description = $scope.projects[i].descriptions.join("<br>");
					}
					
                    $scope.showMenu = true;
                },
                function(response) {
                    $scope.message = "Error: "+response.status + " " + response.statusText;
                });

                        
            $scope.select = function(setTab) {
                $scope.tab = setTab;
                
                if (setTab === 2) {
                    $scope.filtText = "web";
                }
                else if (setTab === 3) {
                    $scope.filtText = "study";
                }
                else if (setTab === 4) {
                    $scope.filtText = "desktop";
                }
				else if (setTab === 5) {
                    $scope.filtText = "embedded";
                }
                else {
                    $scope.filtText = "";
                }
            };

            $scope.isSelected = function (checkTab) {
                return ($scope.tab === checkTab);
            };
    
            $scope.toggleDetails = function() {
                $scope.showDetails = !$scope.showDetails;
            };
        }])

        .controller('ContactController', ['$scope', function($scope) {

            $scope.feedback = {mychannel:"", firstName:"", lastName:"", agree:false, email:"" };
            
            var channels = [{value:"tel", label:"Tel."}, {value:"Email",label:"Email"}];
            
            $scope.channels = channels;
            $scope.invalidChannelSelection = false;
                        
        }])

        .controller('FeedbackController', ['$scope', 'feedbackFactory', function($scope, feedbackFactory) {
			
			$scope.feedback = {mychannel:"", firstName:"", lastName:"", agree:false, email:"" };
            
            $scope.sendFeedback = function () {
                console.log($scope.feedback);
				
				if ($scope.feedback.agree && ($scope.feedback.mychannel === "")) {
                    $scope.invalidChannelSelection = true;
                    console.log('incorrect');
                }
				else {
					$scope.invalidChannelSelection = false;
					var x = feedbackFactory.getFeedbacks();
					console.log(x);
					x.save($scope.feedback);
					$scope.feedbackForm.$setPristine();
					$scope.feedback = {mychannel:"", firstName:"", lastName:"", agree:false, email:"" };
				}
            } 
        }])

        .controller('ProjectDetailController', ['$scope', '$stateParams', 'projectFactory', function($scope, $stateParams, projectFactory) {

            $scope.dish = {};
            $scope.showDish = false;
            $scope.message="Loading ...";
			console.log($stateParams);
			console.log($stateParams.id);
            $scope.dish = projectFactory.getProjects().get({id:parseInt($stateParams.id,10)})
            .$promise.then(
                            function(response){
                                $scope.project = response;
                                $scope.showDish = true;
                            },
                            function(response) {
                                $scope.message = "Error: "+response.status + " " + response.statusText;
                            }
            );
            
        }])

        .controller('DishCommentController', ['$scope', 'projectFactory', function($scope, projectFactory) {
            
            $scope.mycomment = {rating:5, comment:"", author:"", date:""};
            
            $scope.submitComment = function () {
                $scope.mycomment.date = new Date().toISOString();
                console.log($scope.mycomment);
				$scope.dish.comments.push($scope.mycomment);

                projectFactory.getProjects().update({id:$scope.dish.id},$scope.dish);
				$scope.commentForm.$setPristine();
				$scope.mycomment = {rating:5, comment:"", author:"", date:""};
            }
        }])

        // implement the IndexController and About Controller here
		
		.controller('IndexController', ['$scope', 'corporateFactory', 'projectFactory', function($scope, corporateFactory, projectFactory) {
			
			$scope.showDish = false;
			$scope.showPromotion = false;
			$scope.showLeader = false;
			$scope.message="Loading ...";
			
			$scope.dish = projectFactory.getProjects().get({id:0})
                        .$promise.then(
                            function(response){
                                $scope.dish = response;
                                $scope.showDish = true;
                            },
                            function(response) {
                                $scope.message = "Error: "+response.status + " " + response.statusText;
                            }
                        );
			
			$scope.promotion = projectFactory.getPromotions().get({id:0})
								.$promise.then(
									function(response){
										$scope.promotion = response;
										$scope.showPromotion = true;
									},
									function(response) {
										$scope.message = "Error: "+response.status + " " + response.statusText;
									}
								);
			$scope.leader = corporateFactory.getLeaders().get({id:3})
								.$promise.then(
									function(response){
										$scope.leader = response;
										$scope.showLeader = true;
									},
									function(response) {
										$scope.message = "Error: "+response.status + " " + response.statusText;
									}
								);
		}])
		
		
		
		

		.controller('AboutController', ['$scope', 'corporateFactory', function($scope, corporateFactory) {
			
			$scope.showLeadership = false;
								
			corporateFactory.getLeaders().query(
                function(response) {
                    $scope.leaders = response;
                    $scope.showLeadership = true;
                },
                function(response) {
                    $scope.message = "Error: "+response.status + " " + response.statusText;
                });
		}])
;
