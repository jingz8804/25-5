$( document ).ready(function() {

	var WorkTime;
	var workTimeLeft;

	var RelaxTime;
	var relaxTimeLeft;

	// Initialization of the Work Clock
	var clockWork = $("#clockWork");
	// clockUpdate(clockWork, workTimeLeft);

	// Initialization of the Relax Clock
	var clockRelax = $("#clockRelax");
	// clockUpdate(clockRelax, relaxTimeLeft);

	// the work time interval handler
    var workClockHandler;

    // the relax time interval handler
    var relaxClockHandler;

    $("#workHour").keyup(function(){
    	var v = this.value;
   		var vReplaced = v.replace(/[^0-9]/g, '');
    	if ( v != vReplaced) {
	       this.value = vReplaced;
	    }
    });

 //    $("#workHour").keyup(function () {
 //    	alert("here");
 //    	alert(this.value);
 //    	alert($(this).val());
	//     if (this.value != this.value.replace(/[^0-9\.]/g, '')) {
	//        this.value = this.value.replace(/[^0-9\.]/g, '');
	//     }
	//     alert("here2");
	// });

    // WORK: add the event listener for the Start/Resume Button
    $("#startWork").click(function(){
    	var hours = $("#workHour").val();
    	var minutes = $("#workMinute").val();
    	var seconds = $("#workSecond").val();
    	WorkTime = hours * 3600 + minutes * 60 + seconds;
    	workTimeLeft = WorkTime;

    	// there seems to have a delay at the beginning
    	// without this it seems that we spend 2 seconds at the first second
    	if(workTimeLeft <= 0){
    		workTimeLeft = WorkTime;
    	}
    	clockUpdate(clockWork, workTimeLeft);

    	// When pressing the "Start" or "Resume" button
    	if($(this).text() == "Start" || $(this).text() == "Resume"){

    		// we set the button text to "Pause"
    		$(this).text("Pause");

    		// start the countdown through setInterval
    		workClockHandler = setInterval(function () {
				

				// when times up we disable the 
				if(workTimeLeft == 0){
					// here we have to use $("#startWork") because we are inside the workClockHandler block
					// we cannot see the outer $(this)
					// $("#startWork").attr("disabled", "disabled");
					clearInterval(workClockHandler);
					$("#startWork").text("Start");
					alert("Work Complete!");

					$("#startRelax").removeAttr("disabled");
					$("#resetRelax").removeAttr("disabled");

					$("#startWork").attr("disabled", "disabled");
					$("#resetWork").attr("disabled", "disabled");

					$(".audio_holder").show();
					$("#audio_player")[0].play();
				}

				workTimeLeft--;
				if(workTimeLeft >= 0){
					clockUpdate(clockWork, workTimeLeft);
				}
		    }, 1000);
    	}else{
    		$(this).text("Resume");
    		clearInterval(workClockHandler);
    	}
		
	});

	$("#resetWork").click(function(){
		if(workClockHandler != undefined){
			clearInterval(workClockHandler);
		}
		$("#startWork").text("Start");
		workTimeLeft = WorkTime;
		clockUpdate(clockWork, workTimeLeft); 
	})

	// ===================================================================================== //

	// RELAX: add the event listener for the Start/Resume Button
    $("#startRelax").click(function(){
    	var hours = $("#relaxHour").val();
    	var minutes = $("#relaxMinute").val();
    	var seconds = $("#relaxSecond").val();
    	RelaxTime = hours * 3600 + minutes * 60 + seconds;
    	relaxTimeLeft = RelaxTime;

    	// there seems to have a delay at the beginning
    	// without this it seems that we spend 2 seconds at the first second
    	if(relaxTimeLeft <= 0){
    		relaxTimeLeft = RelaxTime;
    	}

    	clockUpdate(clockRelax, relaxTimeLeft);

    	// When pressing the "Start" or "Resume" button
    	if($(this).text() == "Start" || $(this).text() == "Resume"){

    		// we set the button text to "Pause"
    		$(this).text("Pause");

    		// start the countdown through setInterval
    		relaxClockHandler = setInterval(function () {
				
				// when times up we disable the 
				if(relaxTimeLeft == 0){
					// here we have to use $("#startRelax") because we are inside the relaxClockHandler block
					// we cannot see the outer $(this)
					// $("#startRelax").attr("disabled", "disabled");
					clearInterval(relaxClockHandler);
					$("#startRelax").text("Start");
					alert("Time For Work!");

					$("#startWork").removeAttr("disabled");
					$("#resetWork").removeAttr("disabled");

					$("#startRelax").attr("disabled", "disabled");
					$("#resetRelax").attr("disabled", "disabled");
				}

				relaxTimeLeft--;
				if (relaxTimeLeft >= 0){
					clockUpdate(clockRelax, relaxTimeLeft);
				}
				

			 
		    }, 1000);
    	}else{
    		$(this).text("Resume");
    		clearInterval(relaxClockHandler);
    	}
		
	});

	$("#resetRelax").click(function(){
		if(relaxClockHandler != undefined){
			clearInterval(relaxClockHandler);
		}
		$("#startRelax").text("Start");
		relaxTimeLeft = RelaxTime;
		clockUpdate(clockRelax, relaxTimeLeft); 
	})
});

function clockUpdate(clock, timeLeft){
	var hours, minutes, seconds;
	hours = parseInt(timeLeft / 3600);
	timeLeft = timeLeft % 3600;
	minutes = parseInt(timeLeft / 60);
	seconds = parseInt(timeLeft % 60);
	clock.html(hours + " h, " + minutes + " m, " + seconds + " s");
}

