// Questions

var triviaQuestions = [{
	question: "When was the World's first newspaper created?",
	answerList: ["1756", "1665", "1587", "1698"],
	answer: 1
},{
	question: "Which college offered the first course in journalism?",
	answerList: ["University of Missouri", "Columbia University", "Washington College", "Berkley"],
	answer: 2
},{
	question: "What is Yellow Journalism?",
	answerList: ["Obscenity", "Vulgarity", "Sensationalism", "A newspaper that doesn't have enough ink"],
	answer: 2
},{
	question: "Which major US newspaper was involved in breaking the Watergate story?",
	answerList: ["New York Times", "Washington Post", "The Boston Globe", "The Los Angeles Times"],
	answer: 1
},{
	question: "Which one of these is NOT a news bureau?",
	answerList: ["Copley News Service", "Associated Press", "Boston Times News Service", "United Press"],
	answer: 2
},{
	question: "A freelance writer commissioned on a casual basis by a newspaper is called what?",
	answerList: ["Dolly", "Bouncer", "Stringer", "Subcontractor"],
	answer: 2
},{
	question: "Finish the New York Times Motto: All the news that's fit to...",
	answerList: ["Write", "Tell", "Print", "Talk About"],
	answer: 2
},{
	question: "Which of the following is not covered in the First Amendment?",
	answerList: ["Right to Own a Gun", "Freedom of the Press", "Freedom of Religion", "Petition the Government"],
	answer: 0
},{
	question: "Knowlingly publishing a false statement is called what?",
	answerList: ["Muckracking", "Libel", "Slander", "Yellow Journalism"],
	answer: 1
},{
	question: "What kind of laws protect journalists from having to reveal their sources?",
	answerList: ["Castle Laws", "Shield Laws", "Privacy Laws", "Private Citizen Laws"],
	answer: 1
},{
	question: "What news service was founded in 1851 to cover European news?",
	answerList: ["Associated Press", "Reuters", "Europa", "New Europe"],
	answer: 1
},{
	question: "Ira Glass is the host of what NPR show?",
	answerList: ["All Things Considered", "Serial", "This American Life", "Fresh Air"],
	answer: 2
},{
	question: "The Press is considered the what?",
	answerList: ["Third Estate", "Fourth Estate", "Fifth Estate", "Sixth Estate"],
	answer: 1
},{
	question: "How many years until a copyright expires?",
	answerList: ["55 years", "65 years", "70 years", "75 years"],
	answer: 2
},{
	question: "Which company is NOT one of the largest media conglomerates?",
	answerList: ["Disney", "Time Warner", "Fox", "CBS"],
	answer: 2
}];






// Answers and GIFs

var gifArray = ['question1', 'question2', 'question3', 'question4', 'question5', 'question6', 'question7', 'question8', 'question9', 'question10', 'question11', 'question12', 'question13','question14','question15'];
var currentQuestion; var correctAnswer; var incorrectAnswer; var unanswered; var seconds; var time; var answered; var userSelect;
var messages = {
	correct: "Yes, that's right!",
	incorrect: "No, that's not it.",
	endTime: "Out of time!",
	finished: "Alright! Let's see how well you did."
}




// Start Button 
$('#startBtn').on('click', function(){
	$(this).hide();
	newGame();
});


// Start Over Button
$('#startOverBtn').on('click', function(){
	$(this).hide();
	newGame();
});


// Start New Game 
function newGame(){
	$('#finalMessage').empty();
	$('#correctAnswers').empty();
	$('#incorrectAnswers').empty();
	$('#unanswered').empty();
	currentQuestion = 0;
	correctAnswer = 0;
	incorrectAnswer = 0;
	unanswered = 0;
	newQuestion();
}


// New Question
function newQuestion(){
	$('#message').empty();
	$('#correctedAnswer').empty();
	$('#gif').empty();
	answered = true;
	
	//sets up new questions & answerList
	$('#currentQuestion').html('Question #'+(currentQuestion+1)+'/'+triviaQuestions.length);
	$('.question').html('<h2>' + triviaQuestions[currentQuestion].question + '</h2>');
	for(var i = 0; i < 4; i++){
		var choices = $('<div>');
		choices.text(triviaQuestions[currentQuestion].answerList[i]);
		choices.attr({'data-index': i });
		choices.addClass('thisChoice');
		$('.answerList').append(choices);
	}
	countdown();
	//clicking an answer will pause the time and setup answerPage
	$('.thisChoice').on('click',function(){
		userSelect = $(this).data('index');
		clearInterval(time);
		answerPage();
	});
}




// Countdown

function countdown(){
	seconds = 15;
	$('#timeLeft').html('<h3>Time Remaining: ' + seconds + '</h3>');
	answered = true;
	//sets timer to go down
	time = setInterval(showCountdown, 1000);
}

function showCountdown(){
	seconds--;
	$('#timeLeft').html('<h3>Time Remaining: ' + seconds + '</h3>');
	if(seconds < 1){
		clearInterval(time);
		answered = false;
		answerPage();
	}
}



// Answers


function answerPage(){
	$('#currentQuestion').empty();
	$('.thisChoice').empty(); //Clears question page
	$('.question').empty();

	var rightAnswerText = triviaQuestions[currentQuestion].answerList[triviaQuestions[currentQuestion].answer];
	var rightAnswerIndex = triviaQuestions[currentQuestion].answer;
	$('#gif').html('<img src = "assets/images/'+ gifArray[currentQuestion] +'.gif" width = "400px">');
	//checks to see correct, incorrect, or unanswered
	if((userSelect == rightAnswerIndex) && (answered == true)){
		correctAnswer++;
		$('#message').html(messages.correct);
	} else if((userSelect != rightAnswerIndex) && (answered == true)){
		incorrectAnswer++;
		$('#message').html(messages.incorrect);
		$('#correctedAnswer').html('The correct answer was: ' + rightAnswerText);
	} else{
		unanswered++;
		$('#message').html(messages.endTime);
		$('#correctedAnswer').html('The correct answer was: ' + rightAnswerText);
		answered = true;
	}
	
	if(currentQuestion == (triviaQuestions.length-1)){
		setTimeout(scoreboard, 5000)
	} else{
		currentQuestion++;
		setTimeout(newQuestion, 5000);
	}	
}


// Scores 

function scoreboard(){
	$('#timeLeft').empty();
	$('#message').empty();
	$('#correctedAnswer').empty();
	$('#gif').empty();

	$('#finalMessage').html(messages.finished);
	$('#correctAnswers').html("Correct Answers: " + correctAnswer);
	$('#incorrectAnswers').html("Incorrect Answers: " + incorrectAnswer);
	$('#unanswered').html("Unanswered: " + unanswered);
	$('#startOverBtn').addClass('reset');
	$('#startOverBtn').show();
	$('#startOverBtn').html('Start Over?');
}
