var digit_to_name = 'zero one two three four five six seven eight nine'.split(' ');

// This object will hold the digit elements
var digits = {};

// Positions for the hours, minutes, and seconds
var positions = [
    'h1', 'h2', ':', 'm1', 'm2', ':', 's1', 's2'
];

// Generate the digits with the needed markup,
// and add them to the clock

// var digit_holder = clock.find('.digits');

var digit_holder = $('<div>');
digit_holder.addClass("digits");

$.each(positions, function(){

    if(this == ':'){
        digit_holder.append('<div class="dots">');
    }
    else{

        var pos = $('<div>');

        for(var i=1; i<8; i++){
            pos.append('<span class="d' + i + '">');
        }

        // Set the digits as key:value pairs in the digits object
        digits[this] = pos;

        // Add the digit elements to the page
        digit_holder.append(pos);
    }

});


function clockUpdate(clock, timeLeft){	
	var hours, minutes, seconds;
	hours = parseInt(timeLeft / 3600);
	timeLeft = timeLeft % 3600;
	minutes = parseInt(timeLeft / 60);
	seconds = parseInt(timeLeft % 60);
	// clock.html(hours + " h, " + minutes + " m, " + seconds + " s");

	var h1, h2, m1, m2, s1, s2;
	h1 = parseInt(hours / 10);
	h2 = hours % 10;
	m1 = parseInt(minutes / 10);
	m2 = minutes % 10;
	s1 = parseInt(seconds / 10);
	s2 = seconds % 10;

	digits.h1.attr('class', digit_to_name[h1]);
	digits.h2.attr('class', digit_to_name[h2]);
	digits.m1.attr('class', digit_to_name[m1]);
	digits.m2.attr('class', digit_to_name[m2]);
	digits.s1.attr('class', digit_to_name[s1]);
	digits.s2.attr('class', digit_to_name[s2]);

	clock.find('.display').append(digit_holder);
}

function elementsUpdate(elements){
	elements.startButtonToChangeText.text("Start");
	var toEnable = elements.buttonToEnable;
	var toDisable = elements.buttonToDisable;

	$("button." + toEnable).removeAttr("disabled");
	$("button." + toDisable).attr("disabled", "disabled");

	// elements.startButtonToEnable.removeAttr("disabled");
	// elements.resetButtonToEnable.removeAttr("disabled");

	// elements.startButtonToDisable.attr("disabled", "disabled");
	// elements.resetButtonToDisable.attr("disabled", "disabled");

	elements.playerHolder.show();
	elements.player.play();

	elements.playerHolder.append('<div><iframe id="workVideo" width="250" height="125" src="http://www.youtube.com/embed/oHg5SJYRHA0?controls=0&showinfo=0&rel=0&autoplay=1" frameborder="0"></iframe></div>')
	alert("Work Complete!");
}

function CountdownClock(hours, minutes, seconds){
	var totalTime = hours * 3600 + minutes * 60 + seconds;
	var timeLeft = totalTime;
	var clockHandler;

	this.getTotalTime = function(){
		return totalTime;
	}

	this.getTimeLeft = function(){
		return timeLeft;
	}

	this.start = function(elementsUpdate, elements, clockUpdate, clockDiv){
		clockHandler = setInterval(function(){ // here we do not need to pass any parameters, something about closure right?

			if(timeLeft == 0){
				clearInterval(clockHandler);
				elementsUpdate(elements);
			}

			timeLeft--;
			if(timeLeft >= 0){
				clockUpdate(clockDiv, timeLeft);
			}
		}, 1000);
	}

	this.reset = function(){
		if(clockHandler !== undefined){
			clearInterval(clockHandler);
		}
		timeLeft = totalTime;
	}

	this.pause = function(){
		if(clockHandler !== undefined){
			clearInterval(clockHandler);
		}
	}

	this.setTime = function(time){
		timeLeft = time;
	}
}