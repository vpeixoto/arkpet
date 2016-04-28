function getXmlHttpRequestObject() {
	if (window.XMLHttpRequest) {  
    	return new XMLHttpRequest();  
   	} else if(window.ActiveXObject) {  
     	return new ActiveXObject("Microsoft.XMLHTTP");  
   	} else {  
     	alert("Your Browser Sucks!");  
   	}  
}
//Our XmlHttpRequest object to get the auto suggest  
var Req = getXmlHttpRequestObject();

function teste() {

   		var parameters = "";
		Req.open("GET", 'http://www.4ponto2.com.br/sites/pets_app/select_pets2.php', true);
		Req.setRequestHeader("Content-type", "application/x-www-form-urlencoded");  
	   	Req.setRequestHeader("Content-length", parameters.length);
	   	Req.setRequestHeader("Connection", "close");  
		Req.send(); // Begin send the data  
	   	Req.onreadystatechange = function() { // Function to read server response  
			if (Req.readyState == 4) {
				var str = Req.responseText;
				alert(str);
			}  
		}
}