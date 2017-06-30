/* API */
var sidebar_events = function(){
	/* click on tutorial into list */
	var classname = document.getElementsByClassName("tutorial-unit");
	for (var i = 0; i < classname.length; i++) {
		classname[i].addEventListener('click', selectTutorialUnit, false);
	}

	var ev2 = document.getElementsByClassName("tutorial-edit");
	for (var i = 0; i < ev2.length; i++) {
		ev2[i].addEventListener('click', tutorialEdit, false);
	}
}
