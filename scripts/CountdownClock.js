function clockUpdate(clock, timeLeft){
	var hours, minutes, seconds;
	hours = parseInt(timeLeft / 3600);
	timeLeft = timeLeft % 3600;
	minutes = parseInt(timeLeft / 60);
	seconds = parseInt(timeLeft % 60);
	clock.html(hours + " h, " + minutes + " m, " + seconds + " s");
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
	var hoursLeft = hours;
	var minutesLeft = minutes;
	var secondsLeft = seconds;
	var totalTime = hours * 3600 + minutes * 60 + seconds;
	var timeLeft = totalTime;
	var clockHandler;

	this.getTotalTime = function(){
		return totalTime;
	}

	this.getTimeLeft = function(){
		return timeLeft;
	}

	this.reset = function(){
		if(clockHandler != undefined){
			clearInterval(clockHandler);
		}
		timeLeft = totalTime;
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

	this.pause = function(){
		if(clockHandler != undefined){
			clearInterval(clockHandler);
		}
	}
}