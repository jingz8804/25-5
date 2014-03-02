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

    var previouslyClicked = "";
    var isSwitched = false;

    var clickedClassPrefix;
    var unClickedClassPrefix;
    
    $("button").click(function(){
        // check which side is clicked
        var isWork = $(this).hasClass("work");
        clickedClassPrefix = "work";
        unClickedClassPrefix = "relax";
        if(isWork !== true){
            clickedClassPrefix = "relax";
            unClickedClassPrefix = "work";
        }

        if ((previouslyClicked !== "") && (clickedClassPrefix !== previouslyClicked)){
            isSwitched = true;
        }

        previouslyClicked = clickedClassPrefix;

        // get the button text
        var buttonText = $(this).text();
        var hours;
        var minutes;
        var seconds;

        if(buttonText == "START COUNTDOWN"){
            // if we are clicking on the Start button
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

            // be sure to always change the text of the pause button
            $("#" + clickedClassPrefix + "Pause").text("PAUSE");

            if (clock){
                clock.pause(); // must pause first to clear the time interval, otherwise it will keep going
                clock.setTotalTime(hours, minutes, seconds);
                if (isSwitched){
                    // do not forget to show the clock face
                    $("#" + clickedClassPrefix + "Div").fadeIn('slow');

                    $("#" + unClickedClassPrefix + "Div").hide("slow");

                    $("#" + clickedClassPrefix + "Pause").show('fast');
                    $("#" + unClickedClassPrefix + "Pause").hide('slow');
                }
            }else{
                clock = new CountdownClock(hours, minutes, seconds);
                // do not forget to show the clock face
                $("#" + clickedClassPrefix + "Div").fadeIn('slow');

                $("#" + unClickedClassPrefix + "Div").hide("slow");

                $("#" + clickedClassPrefix + "Pause").show('fast');
                $("#" + unClickedClassPrefix + "Pause").hide('slow');
            }

            if(clock.getTimeLeft() <= 0){
                clock.setTime(0, 0, 0);
            }

            // immediately show the time
            clockUpdate($("#"+clickedClassPrefix+"Div"), clock.getTimeLeft());

            var elements = {
                playerHolder: $("#"+clickedClassPrefix+"Audio_holder")
            };

            clock.start(elementsUpdate, elements, clockUpdate, $("#"+clickedClassPrefix+"Div"), clickedClassPrefix);
        }else if(buttonText == "RESUME"){
            $(this).text("PAUSE");
            if(clock.getTimeLeft() <= 0){
                clock.setTime(0, 0, 0);
            }
            // clockUpdate($("#"+clickedClassPrefix+"Div"), clock.getTimeLeft())
            var elements = {
                playerHolder: $("#"+clickedClassPrefix+"Audio_holder")
            };

            clock.start(elementsUpdate, elements, clockUpdate, $("#"+clickedClassPrefix+"Div"), clickedClassPrefix);
        }else{
            // this is to pause the clock
            $(this).text("RESUME");
            clock.pause();
        }

    })
    

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