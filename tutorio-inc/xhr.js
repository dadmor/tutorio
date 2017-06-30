/* AJAX JSON LOADER */
// method default GET
var loadFile = function (callback, file, post_data, error, method) {

    document.getElementById("preloader").style.opacity = '0.6';
    document.getElementById("preloader").innerHTML = 'Loading...';

    var xobj = new XMLHttpRequest();
    xobj.overrideMimeType("application/json");
    xobj.open(method, file, true); 

    /*xobj.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8");
    xobj.setRequestHeader("Access-Control-Allow-Origin", _URL);
    xobj.setRequestHeader("Access-Control-Allow-Headers","origin");
    xobj.setRequestHeader("Access-Control-Request-Headers","access-control-allow-origin");*/
    //xobj.setRequestHeader("Host", _URL); 
    xobj.onreadystatechange = function () {
        
        if (xobj.readyState == 4 && xobj.status == "200") {
            document.getElementById("preloader").style.opacity = '0.1';
            document.getElementById("preloader").innerHTML = '';
            callback(xobj.responseText);
            return true;
        }
        if (xobj.readyState == 4 && xobj.status == "201") {
            document.getElementById("preloader").style.opacity = '0.1';
            document.getElementById("preloader").innerHTML = '';
            callback(xobj.responseText);
            return true;
        }
        if(xobj.readyState == 4 && xobj.status == "403") {          
            var msg = JSON.parse(xobj.responseText);
            msg.error = 'loadFile:error 403';
            if(msg.message){
                
                document.getElementById("preloader-bar").setAttribute('style','opacity:1; background-color:rgb(164, 25, 25); width:100%');
                document.getElementById("preloader-bar").innerHTML = msg.message;
                document.getElementById("modal-content-wrapper").innerHTML += '<div><a href="'+msg.documentation_url+'" target="_blank">'+msg.documentation_url+'</a></div>';
            }
            error(msg);
            return true;
        }
        if(xobj.status == "404") {  
            var msg ={};
            msg.error = 'FATAL ERROR\n'+file+' \nDOESNT EXIST';
            error(msg);
            return true;            
        }
    };
    //xobj.send('data='+btoa(JSON.stringify(post_data)));  
    xobj.send(JSON.stringify(post_data));  
}

var load_content = function(callback,tpl_file,data,target,replace=null){    
    var _c = callback;
    loadFile( function(response) {      
        var tempHTML = doT.template(response);
        var tempCONTENT = data;
        if(!replace){
            target.innerHTML+=tempHTML(tempCONTENT);
        }else{
            target.innerHTML=tempHTML(tempCONTENT);
        }
        _c( tempHTML(tempCONTENT) );
    },_URL+_tplPATH+"/"+tpl_file,null,
    function(msg){
        console.log('app error [_tech.js]:content file doesnt extst');
    },"POST");
}