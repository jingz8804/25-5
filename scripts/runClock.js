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
        var clickedClassPrefix = "work";
        var unClickedClassPrefix = "relax";
        if(isWork !== true){
            clickedClassPrefix = "relax";
            unClickedClassPrefix = "work";
        }

        // we only read the user input when the button is in "Start" mode
        if(buttonText == "Start"){
            hours = $("#"+clickedClassPrefix+"Hour").val();
            minutes = $("#"+clickedClassPrefix+"Minute").val();
            seconds = $("#"+clickedClassPrefix+"Second").val();
        }
        
        if(typeof(Storage) !== "undefined"){
            localStorage.setItem(clickedClassPrefix + "Hours", hours);
            localStorage.setItem(clickedClassPrefix + "Minutes", minutes);
            localStorage.setItem(clickedClassPrefix + "Seconds", seconds);
        }

        clock = new CountdownClock(hours, minutes, seconds);

        if(clock.getTimeLeft() <= 0){
            clock.reset();
        }

        // we should change the clockUpdate function to show the digital clock
        clockUpdate($("#"+clickedClassPrefix+"Div"), clock.getTimeLeft())
        

        // When pressing the "Start" or "Resume" button
        if(buttonText == "Start" || buttonText == "Resume"){

            // we set the button text to "Pause"
            $(this).text("Pause");

            var elements = {
                startButtonToChangeText: $(this),
                buttonToEnable: unClickedClassPrefix,
                buttonToDisable: clickedClassPrefix,
                playerHolder: $(".audio_holder"),
                player: $("#audio_player")[0]
            };

            clock.start(elementsUpdate, elements, clockUpdate, $("#"+clickedClassPrefix+"Div"));
        }else{
            $(this).text("Resume");
            clock.pause();
        }
    });

    $(".reset").click(function(){
        var isWork = $(this).hasClass("work");
        var clickedClassPrefix = "work";
        if(isWork !== true){
            clickedClassPrefix = "relax";
        }

        if(clock !== undefined){
            clock.reset();
            $("#"+clickedClassPrefix+"Start").text("Start");
            clockUpdate($("#"+clickedClassPrefix+"Div"), clock.getTimeLeft());
        }
    });
    

	$(".audio_holder").click(function(){
		var player = $("#audio_player")[0];
        $(this).hide();
		player.pause();
		player.currentTime = 0;
	});
});