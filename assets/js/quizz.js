//Setting the variables
//Variables used to change the question:
var nbQuest = 1;
var nbQuestAnswered = 1;
let nbQuTotal = listQuestions.length;
$('#totalquest').html(nbQuTotal);
var rightAns = listQuestions[nbQuest-1]["rightAnswer"];

let imgSrc1 = "assets/img/Quest-";
let imgSrc2 = ".png";
let imgSrc3 = "assets/img/Expl-"

//Variables used to change the style of the buttons:
let clDef = "def";
let clGreen = "btn-success";
let clRed = "btn-danger";

let classbtn = [];
for (var i = 0; i < nbQuTotal; i++) {
	classbtn.push({
		"wrongAns": false,
		"clueUsed": false
	})
}

var clueIsclicked = false;

var score = 0;


//Show a question
function showQuest () {
	$('#numberquest').html(nbQuest);
	$('#question').html(listQuestions[nbQuest-1]['question']);
	rightAns = listQuestions[nbQuest-1]["rightAnswer"];

	for(var i=1; i<=4; i++) {
		$('#answer'+i).removeClass(clDef + ' ' + clGreen + ' ' + clRed).addClass(clDef);
		$('#answer'+i).html(listQuestions[nbQuest-1]['answer'+i]);
		$('#answer'+i).prop("disabled", nbQuest < nbQuestAnswered);
	}
	if (nbQuest < nbQuestAnswered) {
		$('#'+rightAns).removeClass(clDef).addClass(clGreen);
		if (classbtn[nbQuest-1]['wrongAns']) {$('#'+classbtn[nbQuest-1]['wrongAns']).removeClass(clDef).addClass(clRed)}
	}

	if(nbQuest == 1) {$('#prev').prop("disabled",true)}
	else {$('#prev').prop("disabled",false)}

	if (nbQuest == nbQuTotal) {
		$('#next').hide();
		$('#end').show();
	}
	else {
		$('#next').show();
		$('#end').hide();
	}
	$('#next').prop("disabled",nbQuestAnswered == nbQuest);
	$('#end').prop("disabled",nbQuestAnswered == nbQuest)

	$('#imgQuest').attr('src',imgSrc1 + listQuestions[nbQuest-1]['picture'] + imgSrc2);

	$('#clue').hide();
	$('#clue').html(listQuestions[nbQuest-1]['clue']);
	if (nbQuest == nbQuestAnswered) {$('#clueCost').html('(-0.5 pt)')}
	else {$('#clueCost').html('')}
	clueIsclicked = false;

	if(nbQuest == nbQuestAnswered) {$('#explain').hide()}
		else {$('#explain').show()}
	$('#gotItRight').html('.')
}

showQuest();



// When an answer is clicked
$('.answer').click(function(){
	$('.answer').prop("disabled",true);
	$('#'+rightAns).removeClass(clDef).addClass(clGreen);
	nbQuestAnswered ++;

	$('#next').prop("disabled",false);
	$('#end').prop("disabled",false);


	if ($(this).attr('id') == rightAns) {
		if (classbtn[nbQuest-1]['clueUsed']) {
			score += 0.5;
			$('#detailedScore').html($('#detailedScore').html()+'Question '+ nbQuest+': 0.5pt<br>');
		}
		else {
			score ++;
			$('#detailedScore').html($('#detailedScore').html()+'Question '+ nbQuest+': 1pt<br>');
		}
		$('#gotItRight').html(', indeed!');
	}
	else {
		$(this).removeClass(clDef).addClass(clRed);
		classbtn[nbQuest-1]["wrongAns"] = $(this).attr('id');
		$('#detailedScore').html($('#detailedScore').html()+'Question '+ nbQuest+': 0pt<br>')
		$('#gotItRight').html(', sorry.')
	}
	$('#currentScore').html(score);
	$('#clueCost').html('');
	showExpl();
	$('#explain').show();
})


//Go to next or previous question
$('#prev').click(function() {
	nbQuest --;
	showQuest();
})

$('#next').click(function() {
	nbQuest ++;
	showQuest();
})

$('#explNext').click(function() {
	if (nbQuest < nbQuTotal) {
		nbQuest ++;
		showQuest();
	}
	else {$('#modalEnd').modal('show')}
	
})


//Button Clue
$('#btnClue').click(function() {
	if (clueIsclicked) {$('#clue').hide(); clueIsclicked = false}
	else {$('#clue').show(); clueIsclicked = true}
	$('#clueCost').html('');
	if (nbQuest == nbQuestAnswered) {classbtn[nbQuest-1]['clueUsed'] = true}
})


//End
$('#end').click(function(){
	$('#score').html(score);
	$('#scoretot').html(nbQuTotal);

	if (score == 10) {$('#comment').html(", awesome! Are you also a fan? You have to tell me!")}
	else if (score > 5) {$('#comment').html(", good job!")}
	else if (score > 0) {$('#comment').html(", not bad!")}
	else {$('#comment').html(", well... You know, scores don't really matter.")}
})

$('#tryAgain').click(function(){
	score = 0;
	nbQuest = 1;
	nbQuestAnswered = 1;
	for (var i = 0; i < classbtn.length; i++) {
		classbtn[i]["wrongAns"]= false;
		classbtn[i]["clueUsed"]= false;
	}
	$('#currentScore').html(score);
	$('#detailedScore').html('');
	showQuest()
	clueIsclicked = false;
})


//Modal with explantions
function showExpl () {
	$('#explRightAns').html($('#'+rightAns).html());
	$('#explImg').attr('src',imgSrc3 + listQuestions[nbQuest-1]['picture'] + imgSrc2);
	$('#explQuote').html(listQuestions[nbQuest-1]['quote']);
	$('#explText').html(listQuestions[nbQuest-1]['explanation']);

	if(nbQuest < nbQuTotal) {$('#explNext').html('Go to the next question')}
		else {$('#explNext').html('Go to the end')}
	
	$('#modalExpl').modal('show');
}