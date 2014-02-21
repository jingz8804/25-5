$( document ).ready(function() {
	// Handler for .ready() called.
	var TTime = 10
	var time_left = TTime;

	// variables for time units
	var minutes, seconds;

	var clockWork = $("#clockWork");

	// do some time calculations
	minutes = parseInt(time_left / 60);
	seconds = parseInt(time_left % 60);
	 
	// format countdown string + set tag value
	clockWork.html(minutes + " m, " + seconds + " s"); 

	// update the tag with id "countdown" every 1 second
    var myClock;

    $("#start").click(function(){
    	if(time_left == TTime){
    		time_left--;
    	}
    	if($(this).text() == "Start" || $(this).text() == "Resume"){
    		$(this).text("Pause");
    		myClock = setInterval(function () {

				// do some time calculations
				minutes = parseInt(time_left / 60);
				seconds = parseInt(time_left % 60);
				 
				// format countdown string + set tag value
				clockWork.html(minutes + " m, " + seconds + " s"); 

				if(time_left == 0){
					// here we have to use $("#start") because we are inside the myClock block
					// we cannot see the outer $(this)
					$("#start").attr("disabled", "disabled");
					clearInterval(myClock);
				}

				time_left--;
			 
		    }, 1000);
    	}else{
    		$(this).text("Resume");
    		clearInterval(myClock);
    	}
		
	});

	$("#reset").click(function(){
		if(myClock != undefined){
			clearInterval(myClock);
		}
		$("#start").removeAttr("disabled");
		$("#start").text("Start");
		time_left = 10;

		// do some time calculations
		minutes = parseInt(time_left / 60);
		seconds = parseInt(time_left % 60);
		 
		// format countdown string + set tag value
		clockWork.html(minutes + " m, " + seconds + " s"); 
	})
});



