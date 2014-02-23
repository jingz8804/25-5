$( document ).ready(function() {
	// Initialization of the Work Clock
	var workDiv = $("#clockWork");
	// Initialization of the Relax Clock
	var relaxDiv = $("#clockRelax");

	var workClock;
	var relaxClock;

    $("input").keyup(function(){
    	var v = this.value;
   		var vReplaced = v.replace(/[^0-9]/g, '');
    	if ( v != vReplaced) {
	       this.value = vReplaced;
	    }
    });

    // WORK: add the event listener for the Start/Resume Button
    $("#startWork").click(function(){
    	var hours = $("#workHour").val();
    	var minutes = $("#workMinute").val();
    	var seconds = $("#workSecond").val();

    	workClock = new CountdownClock(hours, minutes, seconds);

    	// there seems to have a delay at the beginning
    	// without this it seems that we spend 2 seconds at the first second
    	if(workClock.getTimeLeft() <= 0){
    		workClock.reset();
    	}
    	clockUpdate(workDiv, workClock.getTimeLeft());

    	// When pressing the "Start" or "Resume" button
    	if($(this).text() == "Start" || $(this).text() == "Resume"){

    		// we set the button text to "Pause"
    		$(this).text("Pause");

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

    		workClock.start(elementsUpdate, elements, clockUpdate, workDiv);
    	}else{
    		$(this).text("Resume");
    		workClock.pause();
    	}
		
	});

	$("#resetWork").click(function(){
		if(workClock != undefined){
			workClock.reset();
			$("#startWork").text("Start");
			clockUpdate(workDiv, workClock.getTimeLeft()); 
		}
	})

	// ===================================================================================== //

	// RELAX: add the event listener for the Start/Resume Button
	$("#startRelax").click(function(){
    	var hours = $("#relaxHour").val();
    	var minutes = $("#relaxMinute").val();
    	var seconds = $("#relaxSecond").val();

    	relaxClock = new CountdownClock(hours, minutes, seconds);

    	// there seems to have a delay at the beginning
    	// without this it seems that we spend 2 seconds at the first second

    	if(relaxClock.getTimeLeft() <= 0){
    		relaxClock.reset();
    	}
    	clockUpdate(relaxDiv, relaxClock.getTimeLeft());

    	// When pressing the "Start" or "Resume" button
    	if($(this).text() == "Start" || $(this).text() == "Resume"){

    		// we set the button text to "Pause"
    		$(this).text("Pause");

    		var elements = {
    			startButtonToChangeText: $(this),
    			startButtonToEnable: $("#startWork"),
    			resetButtonToEnable: $("#resetWork"),
    			startButtonToDisable: $(this),
    			resetButtonToDisable: $("#resetRelax"),
    			playerHolder: $(".audio_holder"),
    			player: $("#audio_player")[0]
    		};

    		relaxClock.start(elementsUpdate, elements, clockUpdate, relaxDiv);
    	}else{
    		$(this).text("Resume");
    		relaxClock.pause();
    	}
		
	});

	$("#resetRelax").click(function(){
		if(relaxClock != undefined){
			relaxClock.reset();
			$("#startRelax").text("Start");
			clockUpdate(relaxDiv, relaxClock.getTimeLeft()); 
		}
	})

	$(".audio_holder").click(function(){
		var player = $("#audio_player")[0];
        $(this).hide();
		player.pause();
		player.currentTime = 0;
	});
});