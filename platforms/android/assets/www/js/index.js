/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};

openFB.init({appId: '182963532074970',tokenStore: window.localStorage});

function facebook() {
    openFB.login(
                 function(response) {
                 if(response.status === 'connected') {
                 //alert('Facebook login succeeded');
                 getInfo();
                 } else {
                 alert('Facebook login failed: ' + response.error);
                 }
                 }, {scope: 'public_profile,email'});
}

function getInfo() {

    openFB.api({
               path: '/me',
               success: function(data) {
               if (data.name != null) {
				   //data.name, data.email, data.id
				   //alert(JSON.stringify(data));
				   name = data.name;
				   id = data.id;
				   window.localStorage.setItem("name", name );
				   localStorage.setItem("userId", id);
				   window.localStorage.setItem("id",  id);
				   validarID(id);
               } else {
               	  alert("Facebook login falhou, tente novamente!");  
               }
               },
               error: errorHandler});
			   
}

function errorHandler(error) {
    alert(error.message);
}


function login(){
	window.location.href = "cadastrar.html";
}


function validarID(id){
	//Our XmlHttpRequest object to get the auto suggest  
	var Req = getXmlHttpRequestObject();  

	//window.location = "cad_email.html";
	   	var parameters = "id="+id;
	   	Req.open("POST", BASE_URL + 'validar_usu_facebook.php', true);  
	   	Req.setRequestHeader("Content-type", "application/x-www-form-urlencoded");  
	   	Req.setRequestHeader("Content-length", parameters.length);  
	   	Req.setRequestHeader("Connection", "close");  
		Req.send(parameters); // Begin send the data  
	   	Req.onreadystatechange = function() { // Function to read server response  
			if (Req.readyState == 4) { // If server already executed the request  
				
				var str = Req.responseText.split("&nbsp;"); // Read string data that is sent from server  
				if (str[0] == 'cheio') {  
					window.location = "page2.html";  
				}else {
					var id = window.localStorage.getItem("id");
					var fullname = window.localStorage.getItem("name");
					Reg_submit(id, fullname);
					//window.location = "cad_email.html"; 
					//alert(str[0]);
				}  
			}  
		}
}

function Reg_submit(id, fullname) { 
   		var parameters = "id="+id+"&nome="+fullname;
	   	Req.open("POST", BASE_URL + 'cadastrar_usu_facebook.php', true);  
	   	Req.setRequestHeader("Content-type", "application/x-www-form-urlencoded");  
	   	Req.setRequestHeader("Content-length", parameters.length);  
	   	Req.setRequestHeader("Connection", "close");  
		Req.send(parameters); // Begin send the data  
	   	Req.onreadystatechange = function() { // Function to read server response  
			if (Req.readyState == 4) { // If server already executed the request  
				var str = Req.responseText.split("&nbsp;"); // Read string data that is sent from server  
				if (str[0] == 'success') {  
					window.location = "page2.html";  
				}else {  
					alert(str[0]);  
				}  
			}  
		}
	
}

function getXmlHttpRequestObject() {
	if (window.XMLHttpRequest) {  
    	return new XMLHttpRequest();  
   	} else if(window.ActiveXObject) {
		return new ActiveXObject("Microsoft.XMLHTTP");
		  
   	} else {  
     	alert("Your Browser Sucks!");  
   	}  
}