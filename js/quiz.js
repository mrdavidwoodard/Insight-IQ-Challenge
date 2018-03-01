(function(){

	var app = angular.module('insightIQ',[]);
	
	app.controller('QuizController', ['$scope','$http','$sce',function($scope,$http,$sce){
		$scope.Math = window.Math;
		$scope.score = 0;
		$scope.activeQuestion = -1;
		$scope.activeQuestionAnswered = 0;		
		$scope.percentage = 0;
		
		$http.get('quiz_data.json').then(function(quizData){
			$scope.quizQuestions = quizData.data;
			$scope.totalQuestions = $scope.quizQuestions.length;
		});
		
		// check answer that user clicked
		$scope.selectAnswer = function(qIndex,aIndex){
			
			var questionState = $scope.quizQuestions[qIndex].questionState;

			if(questionState != 'answered'){	
				$scope.quizQuestions[qIndex].selectedAnswer = aIndex;
				var correctAnswer = $scope.quizQuestions[qIndex].correct;
		
				$scope.quizQuestions[qIndex].correctAnswer = correctAnswer;
				
				if( aIndex === correctAnswer ){
					$scope.quizQuestions[qIndex].correctness = 'correct';
					$scope.score += 1;
				} else {
					$scope.quizQuestions[qIndex].correctness = 'incorrect';
				}
				
				$scope.quizQuestions[qIndex].questionState = 'answered';		
		
			}
		
			$scope.percentage = Math.floor(($scope.score / $scope.totalQuestions)*100);
			
		}

		$scope.isSelected = function(qIndex,aIndex){
			return $scope.quizQuestions[qIndex].selectedAnswer === aIndex;
		}

		$scope.isCorrect = function(qIndex,aIndex){
			return $scope.quizQuestions[qIndex].correctAnswer === aIndex;
		}

		$scope.selectContinue = function(){
			return  $scope.activeQuestion += 1;
		}

		$scope.createShareLinks = function(percentage){
			var url = 'http://vame-insight.vestas.com';
			var emailLink = '<a class="btn email" href="mailto:?subject=Try to beat my IQ!&amp;body=I scored a '+percentage+'% on this Insight IQ Challenge. Try to beat my score at '+url+'">Email a friend</a>';
			var newMarkup = emailLink;

			return $sce.trustAsHtml(newMarkup);			

		}
		
	}]);

})();