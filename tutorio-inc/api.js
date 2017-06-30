var selectTutorialUnit = function() {
	
	set_active_class(this,"tutorial-unit");
	reset_targeter();

	var index = this.getAttribute("data-index");
	var load_tut = storage_obj['tutorials'][index];
	app_obj.action = "run"; 
	app_obj.acctual_index = index;
	app_obj.acctual_name = load_tut.name; 
	app_obj.acctual_slug = load_tut.slug; 
	app_obj.acctual_description = load_tut.description; 

	change_action_prev();
	
	document.getElementById('bottom-bar-title').innerHTML = "<div style='display:flex'><div>‣&nbsp;</div><div style='font-weight:400'>"+app_obj.acctual_name+"</div></div>";
	document.getElementById('bottom-bar-info').innerHTML = "";
	
	load_content(function(res) {
		tutorialsteps_events();
	},"tutorial-steps.html",load_tut,document.getElementById('bottom-bar-info'),true);
	document.getElementById('io-sidebar').classList.toggle('s-placed'); 

};

var selectTutorialStep = function(index) {
	
	if(IsNumeric(index)){
		var el = document.getElementsByClassName("tutorial-step");
		set_active_class(el[index],"tutorial-step");
	}else{
		set_active_class(this,"tutorial-step");
		index = this.getAttribute("data-index");
	} 

	var element = storage_obj['tutorials'][app_obj.acctual_index]['steps'][index];	
	
	if(element.action == 'click'){
		modal_view('hide');
		xpathToElement(element.xpath);
		app_obj.tutorial_acctual_step = index;
		change_action_prev();
		/* add description */
		document.getElementById("io-target-description").innerHTML = element.description;
	}
	if(element.action == 'slide'){
		reset_targeter();
		modal_view('show');
		load_content(function(res) {
			tutorialsteps_events();
		},"modal-show-silde.html",element,document.getElementById('tutorials-modal'),true);
	}
	//document.getElementById('step-sound').style.border = "1px solid red";
	//document.getElementById('step-sound').play();

}

var run_next_step = function(){
	selectTutorialStep(parseFloat(app_obj.tutorial_acctual_step+1))
}

var tutorialEdit = function() {

	console.log(storage_obj);

	/* very similar to selectTutorialUnit function */
	var index = this.parentNode.getAttribute("data-index");
	var load_tut = storage_obj['tutorials'][index];
	app_obj.action = "edit"; 
	app_obj.acctual_index = index;
	app_obj.acctual_name = load_tut.name; 
	app_obj.acctual_slug = load_tut.slug; 
	app_obj.acctual_description = load_tut.description; 
	change_action_prev();

	load_content(function(res) {
		document.getElementById('bottom-bar-info').innerHTML = "";
		load_content(function(res) {
			tutorialsteps_events();
		},"tutorial-steps.html",load_tut,document.getElementById('bottom-bar-info'),true);	
		document.getElementById('io-sidebar').classList.toggle('s-placed');
	},"steps-unit-edit.html",{'name':app_obj.acctual_name},document.getElementById('bottom-bar-title'),true);
}

var set_targeter = function(top,right,bottom,left){

	document.getElementById('io-target-top').style.height = top+"px"; 
	document.getElementById('io-target-bottom').style.top = bottom+"px"; 
	document.getElementById('io-target-bottom').style.height = "calc(100vh - "+bottom+"px)"; 
	document.getElementById('io-target-left').style.width = left+"px"; 
	document.getElementById('io-target-right').style.left = right+"px"; 
	document.getElementById('io-target-right').style.width = "calc(100vw - "+right+"px)"; 

	document.getElementById('io-target-description').style.top = bottom+10+"px"; 
	document.getElementById('io-target-description').style.left = left+5+"px"; 
	document.getElementById('io-target-description').style.opacity = "1"; 

}

var reset_targeter = function(){

	document.getElementById('io-target-top').style.height = "0"; 
	document.getElementById('io-target-bottom').style.top = "100vh"; 
	document.getElementById('io-target-bottom').style.height = "0"; 
	document.getElementById('io-target-left').style.width = "0px"; 
	document.getElementById('io-target-right').style.left = "100vw"; 
	document.getElementById('io-target-right').style.width = "0"; 
	document.getElementById('io-target-description').style.opacity = "0"; 
	document.getElementById('io-target-description').style.top = "-50px"; 
}

function start_record(){

	reset_targeter();
	loadScript(_URL+_includePATH+"inspector.js",function(){
		runInspector();
	});						
	storage_obj['tutorials'].unshift({
		"name":"New tutorial",
		"slug":"new-tutorial",
		"description":"",
		"steps":[]
	});
	app_obj.tutorial_name = "New tutorial";
	app_obj.tutorial_slug = "new-tutorial";
	app_obj.action = "rec"; 

	change_action_prev();

	document.getElementById('bottom-bar-title').innerHTML = "<div style='display:flex'><div>•&nbsp;</div><div style='font-weight:400'>recording now</div></div>";
	document.getElementById('bottom-bar-info').innerHTML = "";

	storage('save',app_obj);
	storage('save',storage_obj);
}

var set_step = function(target){

	storage_obj['tutorials'][0]['steps'].push({
		"action":"click",
		"name":"step 1",
		"xpath":target
	});	
	document.getElementById('bottom-bar-info').innerHTML += "<span>Step "+storage_obj['tutorials'][0]['steps'].length+"</span>";
	storage('save',storage_obj);
}

var set_slide = function(){
	/* similar to set_step */
	var steps = storage_obj['tutorials'][app_obj.acctual_index]['steps'];

	steps.unshift({
		"action":"slide",
		"name":"slide "+steps.length+1,
		"title":"New slide",
		"description":"New slide short description",
		"next_title":"Next",
	});	
	document.getElementById('bottom-bar-info').innerHTML = "<span>Slide "+steps.length+"</span>"+document.getElementById('bottom-bar-info').innerHTML;
	storage('save',storage_obj);
}

save_tutorial_form = function(){

	load_content(function(res) {
		loadScript(_URL+_eventsPATH+"/modal-events.js",function(){
			modal_events();
		});	
	},"modal-save-tutorial.html",{"title":"Describe your tutorial"},document.getElementById('tut-modal-body'),true);
}

save_tutorial = function(){

	document.getElementById('io-sidebar').classList.toggle('s-placed'); 
	document.getElementById('tutorials-modal').style.display = 'none';

	storage_obj['tutorials'][0].name = document.getElementById('tutorial-name').value;
	storage_obj['tutorials'][0].slug = document.getElementById('tutorial-name').value;
	storage_obj['tutorials'][0].description = document.getElementById('tutorial-description').value;

	load_content(function(res) {
		sidebar_events();
	},"sidebar-unit.html",storage_obj,document.getElementById('io-sidebar-list'),true);

	app_obj.action = "standby"; 
	change_action_prev();
}

var x_event_data = [];
var set_xevent = function(el){
	x_event_data.push(el);
	el.style.outline = "2px dashed rgba(255,0,0,0.1)";
	el.addEventListener('click', run_next_step, false);
}

var modal_view = function(type){
	if(type=='show'){
		document.getElementById('tutorials-modal').style.display = 'block';
		document.getElementById('tutorials-modal').style.transform = 'scale(1.2, 1.2)';
		setTimeout(function() {
			document.getElementById('tutorials-modal').style.opacity = 1;
			document.getElementById('tutorials-modal').style.transform = 'scale(1, 1)';
		}, 0);
		
	}
	if(type=='hide'){
		document.getElementById('tutorials-modal').style.opacity = 0;
		setTimeout(function() {
			document.getElementById('tutorials-modal').style.display = 'none';
		}, 100);
		
	}
	if(type=='toggle'){
		alert('not yet');
	}
}


/* TECH */
function IsNumeric(val) {
    return Number(parseFloat(val))==val;
}

var set_active_class = function(_this, group_class_name){

	var classname = document.getElementsByClassName(group_class_name);
	for (var i = 0; i < classname.length; i++) {
		classname[i].classList.remove("active");
	}
	_this.classList.add("active"); 

}

var xpathToElement = function(path){

	var element = document.evaluate( path ,document, null, XPathResult.ANY_TYPE, null );
	element = element.iterateNext();
	var rect = element.getBoundingClientRect();

	set_targeter(rect.top, rect.right, rect.bottom, rect.left);
	set_xevent(element);
}

var change_action_prev = function(){
	document.getElementById('app-object-prewiew').innerHTML = '<pre>'+JSON.stringify(app_obj, null ,2)+'</pre>';
	document.getElementById('app-object-prewiew').innerHTML += '<pre>'+JSON.stringify(storage_obj, null ,2)+'</pre>';
}

var storage = function(type,data){

	if(type == 'load'){
		window[data] = JSON.parse(localStorage[data]);
	}
	if(type == 'save'){
		localStorage[window_getVarName(data)] = JSON.stringify(data);
	}
	if(type == 'check'){		
		return localStorage[data];
	}
	function window_getVarName(what){
		for (var name in window){
			if (window[name]==what)
				return(name);
		}
		return("");
	}
}





