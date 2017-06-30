console.log('TUTORIO START');
/* loadScripts from another files */
var _URL = "http://mroczna.stronazen.pl/";
//var _URL = "";
var _includePATH = "tutorio-inc/";
var _tplPATH = "tutorio-inc/tpl";
var _jsonPATH = "tutorio-inc/json";
var _eventsPATH = "tutorio-inc/events";

/* SCRIPT INCLUDE */
var loadScriptQueue = {};
function loadScript(url, callback)
{
	if(loadScriptQueue[url]){
		callback();
	}else{ 
		loadScriptQueue[url] = true;
	    var head = document.getElementsByTagName('head')[0];
	    var script = document.createElement('script');
	    script.id = url;
	    script.type = 'text/javascript';
	    script.src = url;
	    script.onreadystatechange = callback;
	    script.onload = callback;
	    head.appendChild(script);
	}
}
/*function reloadScript(url){
	var element = document.getElementById(url);
	element.outerHTML = "";
	delete element;

	console.log(loadScriptQueue);
}*/





function recreateNode(el, withChildren) {
  if (withChildren) {
    el.parentNode.replaceChild(el.cloneNode(true), el);
  } else {
    var newEl = el.cloneNode(false);
    while (el.hasChildNodes()) newEl.appendChild(el.firstChild);
    el.parentNode.replaceChild(newEl, el);
  }
}
/* ----------------------------------------------------------- */

/* EXAMPLE */
/*loadScript("example.js",function(){
	alert('download-script-init');
});*/

/* init firebase */
/*loadScript("https://www.gstatic.com/firebasejs/3.6.3/firebase.js",function(){
	
	var config = {
		apiKey: "AIzaSyDdb230Z84rg8b4_tObGZCa7cwF7HvxO6s",
		authDomain: "tutorio-f07f8.firebaseapp.com",
		databaseURL: "https://tutorio-f07f8.firebaseio.com",
		storageBucket: "tutorio-f07f8.appspot.com",
		messagingSenderId: "9098244104"
	};
	//firebase.initializeApp(config);

	
	var provider = new firebase.auth.FacebookAuthProvider();

	provider.setCustomParameters({
		'display': 'popup'
	});

	firebase.auth().signInWithPopup(provider).then(function(result) {
		// This gives you a Facebook Access Token. You can use it to access the Facebook API.
		var token = result.credential.accessToken;
		// The signed-in user info.
		var user = result.user;
		// ...
	}).catch(function(error) {
		// Handle Errors here.
		var errorCode = error.code;
		var errorMessage = error.message;
		// The email of the user's account used.
		var email = error.email;
		// The firebase.auth.AuthCredential type that was used.
		var credential = error.credential;
		// ...
	});
	

	//var contactsRef = firebase.child('contacts');
});*/






/* ----------------------------------------------------------- */



	var main_target;
	var set_step;
	var storage_obj;
	var app_obj;



 document.addEventListener("DOMContentLoaded", function(event) {

	main_target = document.getElementsByTagName('body')[0];


	/* API */
	loadScript(_URL+_includePATH+"api.js",function(){
		console.log('api.js loaded');
	});


    
	/* RUN APP */
	/* init preloader */
	loadScript(_URL+_includePATH+"preloader.js",function(){
		
		main_target.appendChild(preloader);
		//document.getElementsByTagName('body')[0].appendChild(preloader);
		
		/* AJAX init */
		loadScript(_URL+_includePATH+"xhr.js",function(){

			
			/* TPL library */
			loadScript(_URL+_includePATH+"dotjs.min.js",function(){
				
				/* Load bottom bar */
				load_content(function(res) {

					/* Load sidebar */
					load_content(function(res) {

						/* Register app object */
						loadFile(function(res) {		
							app_obj = JSON.parse(res);
						}, _URL+_jsonPATH+"/app.json", null, function(res) {console.log(res)}, "GET"); 

						/* Load tutorials */
						if( storage('check','storage_obj') == undefined){
							loadFile(function(res) {		
								load_sidebar_unit(storage_obj = JSON.parse(res));
							}, _URL+_jsonPATH+"/wordpress-example-tuts.json", null, function(res) {console.log(res)}, "GET"); 
						}else{
								storage('load','storage_obj'); 
								load_sidebar_unit(storage_obj);
						}					

					},"sidebar.html",{},main_target);

				},"bottom-bar.html",{'title':'TUTOR.IO'},main_target);

				load_content(function(res) {
				},"modal.html",{},main_target);

				load_content(function(res) {
				},"targeter.html",{},main_target);

				load_content(function(res) {
				},"app-object-preview.tpl",{},main_target);

				/* load sound */
				/* TODO cross browser problem */
				/*load_content(function(res) {
				},"sound-set.html",{},main_target);*/

			});
			
		});
	});

	var load_sidebar_unit = function(res){
		/* Load sidebar unit */
		load_content(function(res) {

			/* Load events */
			loadScript(_URL+_eventsPATH+"/sidebar-events.js",function(){
				sidebar_events();
			});	

			/* bottombar events */
			loadScript(_URL+_eventsPATH+"/bottombar-events.js",function(){
				bottombar_events();
			});	
		
		},"sidebar-unit.html",storage_obj,document.getElementById('io-sidebar-list'));

	}


});












