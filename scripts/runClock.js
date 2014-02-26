$( document ).ready(function() {
	// Initialization of the Work Clock
	var workDiv = $("#clockWork");
	// Initialization of the Relax Clock
	var relaxDiv = $("#clockRelax");

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

        // we only read the user input when the button is in "Start" mode
        if(buttonText == "Start"){
            hours = $("#workHour").val();
            minutes = $("#workMinute").val();
            seconds = $("#workSecond").val();
        }

        var isWork = $(this).hasClass("work");
        if(typeof(Storage) !== "undefined"){

            if (isWork === true){
                // for the work clock
                localStorage.workHours = hours;
                localStorage.workMinutes = minutes;
                localStorage.workSeconds = seconds;
            }else{
                // for the work clock
                localStorage.relaxHours = hours;
                localStorage.relaxMinutes = minutes;
                localStorage.relaxSeconds = seconds;   
            }
        }

        

        clock = new CountdownClock(hours, minutes, seconds);

        if(clock.getTimeLeft() <= 0){
            clock.reset();
        }

        if (isWork === true){ // we should change the clockUpdate function to show the digital clock
            clockUpdate(workDiv, clock.getTimeLeft());
        }else{
            clockUpdate(relaxDiv, clock.getTimeLeft());
        }

        // When pressing the "Start" or "Resume" button
        if(buttonText == "Start" || buttonText == "Resume"){

            // we set the button text to "Pause"
            $(this).text("Pause");

            if(isWork === true){ // TODO: refactor this part
                // start the countdown through setInterval
                var elements = {
                    startButtonToChangeText: $(this),
                    startButtonToEnable: $("#startRelax"),
                    resetButtonToEnable: $("#resetRelax"),
                    startButtonToDisable: $(this),
                    resetButtonToDisable: $("#resetWork"),
                    playerHolder: $(".audio_holder"),
                    player: $("#audio_player")[0]
                };

                clock.start(elementsUpdate, elements, clockUpdate, workDiv);
            }else{
                var elements = {
                    startButtonToChangeText: $(this),
                    startButtonToEnable: $("#startWork"),
                    resetButtonToEnable: $("#resetWork"),
                    startButtonToDisable: $(this),
                    resetButtonToDisable: $("#resetRelax"),
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

        if(clock !== undefined){
            clock.reset();
            if (isWork === true) {
                $("#startWork").text("Start");
                clockUpdate(workDiv, clock.getTimeLeft()); 
            }else{
                $("#startRelax").text("Start");
                clockUpdate(relaxDiv, clock.getTimeLeft()); 
            };
        }

    });
    

	$(".audio_holder").click(function(){
		var player = $("#audio_player")[0];
        $(this).hide();
		player.pause();
		player.currentTime = 0;
	});
});