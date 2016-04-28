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
function handle_submit() { 

	var id = window.localStorage.getItem("id");
	alert (id);
	var email = document.getElementById('email').value;
	var fullname = window.localStorage.getItem("name");
	
	Reg_submit(id, email, fullname);
			
		
	
}

function Reg_submit(id, email, fullname) { 
   		var parameters = "id="+id+"&email="+email+"&nome="+fullname;
	   	Req.open("POST", BASE_URL + 'cadastrar_usu_facebook.php', true);  
	   	Req.setRequestHeader("Content-type", "application/x-www-form-urlencoded");  
	   	Req.setRequestHeader("Content-length", parameters.length);  
	   	Req.setRequestHeader("Connection", "close");  
		Req.send(parameters); // Begin send the data  
	   	Req.onreadystatechange = function() { // Function to read server response  
			if (Req.readyState == 4) { // If server already executed the request  
				var str = Req.responseText.split("&nbsp;"); // Read string data that is sent from server  
				if (str[0] == 'success') {  
					alert("Usúario registrado com sucesso!");
					window.location = "page2.html";  
				}else {  
					alert(str[0]);  
				}  
			}  
		}
	
}

function validateEmail(x) {
	var atpos = x.indexOf("@");
    var dotpos = x.lastIndexOf(".");
    if (atpos<1 || dotpos<atpos+2 || dotpos+2>=x.length) {
        alert("O email é inválido, por favor tente novamente!");
		document.getElementById('email').value = "";
        return false;
    }
	return true;
}

function check_password(pass1, pass2)
{
    if(pass1.value == pass2.value){
		return true;
    }else{
		alert("A confirmação de senha encontra-se incorreta, por favor tente novamente!");
		document.getElementById('password').value = "";
		document.getElementById('password_confirm').value = "";	
		return false;
    }
} 
function check_name(fullname)
{ 
    if(!fullname.match(/\S/)) {
        alert ('Não é permitido campos em branco!');
        document.getElementById('fullname').value = "";	
		return false;
    } else {
        return true;
    }
}