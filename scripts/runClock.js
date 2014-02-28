$( document ).ready(function() {
	var clock;

    $("input.time").keyup(function(){
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
        }else{
            $("#workHour").val(0);
        }

        if(localStorage.workMinutes){
            $("#workMinute").val(localStorage.workMinutes);
        }else{
            $("#workMinute").val(25);
        }

        if(localStorage.workSeconds){
            $("#workSecond").val(localStorage.workSeconds);
        }else{
            $("#workSecond").val(0);
        }

        if(localStorage.workAlarmURI){
            $("#workAlarmURI").val(localStorage.workAlarmURI);
        }

        // for the relax clock
        if(localStorage.relaxHours){
            $("#relaxHour").val(localStorage.relaxHours);
        }else{
            $("#relaxHour").val(0);
        }

        if(localStorage.relaxMinutes){
            $("#relaxMinute").val(localStorage.relaxMinutes);
        }else{
            $("#relaxMinute").val(5);
        }

        if(localStorage.relaxSeconds){
            $("#relaxSecond").val(localStorage.relaxSeconds);
        }else{
            $("#relaxSecond").val(0);
        }

        if(localStorage.relaxAlarmURI){
            $("#relaxAlarmURI").val(localStorage.relaxAlarmURI);
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

        // disable the time input
        $("#"+clickedClassPrefix+"Hour").attr("disabled", "disabled");
        $("#"+clickedClassPrefix+"Minute").attr("disabled", "disabled");
        $("#"+clickedClassPrefix+"Second").attr("disabled", "disabled");

        // we only read the user input and CREATE NEW CLOCK when the button is in "Start" mode
        if(buttonText == "Start"){
            hours = $("#"+clickedClassPrefix+"Hour").val();
            minutes = $("#"+clickedClassPrefix+"Minute").val();
            seconds = $("#"+clickedClassPrefix+"Second").val();

            // the input we got is text string! So be sure to convert it to integer first!
            if(hours === ""){
                hours = 0;
            }else{
                hours = parseInt(hours);
            }

            if(minutes === ""){
                minutes = 0;
            }else{
                minutes = parseInt(minutes);
            }

            if(seconds === ""){
                seconds = 0;
            }else{
                seconds = parseInt(seconds);
            }

            if(typeof(Storage) !== "undefined"){
                localStorage.setItem(clickedClassPrefix + "Hours", hours);
                localStorage.setItem(clickedClassPrefix + "Minutes", minutes);
                localStorage.setItem(clickedClassPrefix + "Seconds", seconds);
            }

            clock = new CountdownClock(hours, minutes, seconds);

            // do not forget to show the clock face
            $("#" + clickedClassPrefix + "Div").fadeIn('slow');

            $("#" + unClickedClassPrefix + "Div").hide("slow");
        }

        if(clock.getTimeLeft() <= 0){
            clock.setTime(0);
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
                playerHolder: $("#"+clickedClassPrefix+"Audio_holder")
            };

            clock.start(elementsUpdate, elements, clockUpdate, $("#"+clickedClassPrefix+"Div"), clickedClassPrefix);
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
            // alert("here!");
            clock.reset();
            $("#"+clickedClassPrefix+"Start").text("Start");
            clockUpdate($("#"+clickedClassPrefix+"Div"), clock.getTimeLeft());
        }

        // enable the time input
        $("#"+clickedClassPrefix+"Hour").removeAttr("disabled");
        $("#"+clickedClassPrefix+"Minute").removeAttr("disabled");
        $("#"+clickedClassPrefix+"Second").removeAttr("disabled");
    });
    

	$(".audio_holder").click(function(){
		var player = $("#audio_player")[0];
        $(this).hide();
		player.pause();
		player.currentTime = 0;
	});

    $('#myModal').on('hidden.bs.modal', function (e) {
      // stop the alarm
      $(".alarm_holder").empty();
    })

});