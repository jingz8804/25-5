$( document ).ready(function() {
	var clock;

    $("input").keyup(function(){
    	var v = this.value;
   		var vReplaced = v.replace(/[^0-9]/g, '');
    	if ( v != vReplaced) {
	       this.value = vReplaced;
	    }
    });

    // retrieve user supplied time units
    if(typeof(Storage)!=="undefined"){
        // for the work clock
        if(localStorage.workHours){
            $("#workHour").val(localStorage.workHours);
        }

        if(localStorage.workMinutes){
            $("#workMinute").val(localStorage.workMinutes);
        }

        if(localStorage.workSeconds){
            $("#workSecond").val(localStorage.workSeconds);
        }

        // for the relax clock
        if(localStorage.relaxHours){
            $("#relaxHour").val(localStorage.relaxHours);
        }

        if(localStorage.relaxMinutes){
            $("#relaxMinute").val(localStorage.relaxMinutes);
        }

        if(localStorage.relaxSeconds){
            $("#relaxSecond").val(localStorage.relaxSeconds);
        }

    }
    
    $(".start").click(function(){
        var hours;
        var minutes;
        var seconds;
        var buttonText = $(this).text();

        var isWork = $(this).hasClass("work");
        var classPrefix = "work";
        if(isWork !== true){
            classPrefix = "relax";
        }

        // we only read the user input when the button is in "Start" mode
        if(buttonText == "Start"){
            hours = $("#"+classPrefix+"Hour").val();
            minutes = $("#"+classPrefix+"Minute").val();
            seconds = $("#"+classPrefix+"Second").val();
        }
        
        if(typeof(Storage) !== "undefined"){
            localStorage.setItem(classPrefix + "Hours", hours);
            localStorage.setItem(classPrefix + "Minutes", minutes);
            localStorage.setItem(classPrefix + "Seconds", seconds);
        }

        clock = new CountdownClock(hours, minutes, seconds);

        if(clock.getTimeLeft() <= 0){
            clock.reset();
        }

        // we should change the clockUpdate function to show the digital clock
        clockUpdate($("#"+classPrefix+"Div"), clock.getTimeLeft())
        

        // When pressing the "Start" or "Resume" button
        if(buttonText == "Start" || buttonText == "Resume"){

            // we set the button text to "Pause"
            $(this).text("Pause");

            if(isWork === true){ // TODO: refactor this part
                // start the countdown through setInterval
                var elements = {
                    startButtonToChangeText: $(this),
                    startButtonToEnable: $("#relaxStart"),
                    resetButtonToEnable: $("#relaxReset"),
                    startButtonToDisable: $(this),
                    resetButtonToDisable: $("#workReset"),
                    playerHolder: $(".audio_holder"),
                    player: $("#audio_player")[0]
                };

                clock.start(elementsUpdate, elements, clockUpdate, workDiv);
            }else{
                var elements = {
                    startButtonToChangeText: $(this),
                    startButtonToEnable: $("#workStart"),
                    resetButtonToEnable: $("#workReset"),
                    startButtonToDisable: $(this),
                    resetButtonToDisable: $("#relaxReset"),
                    playerHolder: $(".audio_holder"),
                    player: $("#audio_player")[0]
                };
                clock.start(elementsUpdate, elements, clockUpdate, relaxDiv);
            }
        }else{
            $(this).text("Resume");
            clock.pause();
        }
    });

    $(".reset").click(function(){
        var isWork = $(this).hasClass("work");
        var classPrefix = "work";
        if(isWork !== true){
            classPrefix = "relax";
        }

        if(clock !== undefined){
            clock.reset();
            $("#"+classPrefix+"Start").text("Start");
            clockUpdate($("#"+classPrefix+"Div"), clock.getTimeLeft());
        }
    });
    

	$(".audio_holder").click(function(){
		var player = $("#audio_player")[0];
        $(this).hide();
		player.pause();
		player.currentTime = 0;
	});
});