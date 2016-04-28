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

function login_submit() {
	//window.location = "page2.html";
	
	var email = document.getElementById('usuario').value;
   	var password = document.getElementById('senha').value;
   	var parameters = "email="+email+"&senha="+password;
	Req.open("POST", 'http://4ponto2.com.br/sites/pets_app/login_usu.php', true);
	Req.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	Req.setRequestHeader("Content-length", parameters.length);
	Req.setRequestHeader("Connection", "close");
	Req.send(parameters); // Begin send the data
	Req.onreadystatechange = function() { // Function to read server response
		if (Req.readyState == 4) { // If server already executed the request
			var str = Req.responseText.split("&nbsp;"); // Read string data that is sent from server
			if (str[0] == 'success') {
				//alert("Usúario encontrado!");
				localStorage.setItem("userId", str[1]);
				//alert(localStorage.getItem("userId"));
				window.location = "page2.html";
			}else {
				alert('Ocorreu um erro, por favor se cadastre ou tente mais tarde!');
				//alert(str[0]);
			}
		}
	}
	
}