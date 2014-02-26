function clockUpdate(clock, timeLeft){	
	var hours, minutes, seconds;
	hours = parseInt(timeLeft / 3600);
	timeLeft = timeLeft % 3600;
	minutes = parseInt(timeLeft / 60);
	seconds = parseInt(timeLeft % 60);
	clock.html(hours + " h, " + minutes + " m, " + seconds + " s");

	// var h1, h2, m1, m2, s1, s2;
	// h1 = parseInt(hours / 10);
	// h2 = hours % 10;
	// m1 = parseInt(minutes / 10);
	// m2 = minutes % 10;
	// s1 = parseInt(seconds / 10);
	// s2 = seconds % 10;

	// digits.h1.attr('class', digit_to_name[h1]);
	// digits.h2.attr('class', digit_to_name[h2]);
	// digits.m1.attr('class', digit_to_name[m1]);
	// digits.m2.attr('class', digit_to_name[m2]);
	// digits.s1.attr('class', digit_to_name[s1]);
	// digits.s2.attr('class', digit_to_name[s2]);

	// clock.find('.digits').append(digit_holder);
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
			if(timeLeft >= 0){
				clockUpdate(clockDiv, timeLeft);
			}
		}
	}
}