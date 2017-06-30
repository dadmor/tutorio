var bottombar_events = function(){	
	
	/* start record action */
	document.getElementById('io-record-button').addEventListener("click", function(){ 
		document.getElementById('bottom-bar-stop').style.display = "block"; 
		document.getElementById('bottom-bar-manager').style.display = "none"; 
		document.getElementById('io-sidebar').classList.toggle('s-placed'); 
		start_record();
	});

	document.getElementById('bottom-bar-stop').addEventListener("click", function(){ 
		//document.getElementById('io-sidebar').classList.toggle('s-placed'); 
		document.getElementById('bottom-bar-stop').style.display = "none"; 
		document.getElementById('bottom-bar-manager').style.display = "block"; 
		document.getElementById('tutorials-modal').style.display = 'flex';
		recreateNode(frame, true);
		save_tutorial_form();
	});

	/* open tutorial list */
	document.getElementById('bottom-bar-manager').addEventListener("click", function(){ 
		document.getElementById('io-sidebar').classList.toggle('s-placed'); 
	});	
	
}

var tutorialsteps_events = function(){
	/* steps events */
	var tev1 = document.getElementsByClassName("tutorial-step");
	for (var i = 0; i < tev1.length; i++) {
		tev1[i].addEventListener('click', selectTutorialStep, false);
	}

	var tev2 = document.getElementsByClassName("add-slide");
	for (var i = 0; i < tev2.length; i++) {
		tev2[i].addEventListener('click', set_slide, false);
	}

}

