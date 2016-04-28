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
	var email = document.getElementById('email').value;
	var password = document.getElementById('password').value;
	var password_confirm = document.getElementById('password_confirm').value;
	var fullname = document.getElementById('fullname').value;
	
	if(!validateEmail(email)){
	// don't do nothing, just clean this textbox
	}else{
		if(!check_password(password, password_confirm)){
			// don't do nothing, just clean this textbox
		}else{
			//correto - checar nome completo
			if(!check_name(fullname)){
				// don't do nothing, just clean this textbox	
			}else{
				Reg_submit(email, password, password_confirm, fullname);
			}
		}
	}
}

function Reg_submit(email, password, password_confirm, fullname) { 
   	if(password == password_confirm){
   		var parameters = "email="+email+"&senha="+password+"&nome="+fullname;
	   	Req.open("POST", BASE_URL + 'cadastrar_usu.php', true);  
	   	Req.setRequestHeader("Content-type", "application/x-www-form-urlencoded");  
	   	Req.setRequestHeader("Content-length", parameters.length);  
	   	Req.setRequestHeader("Connection", "close");  
		Req.send(parameters); // Begin send the data  
	   	Req.onreadystatechange = function() { // Function to read server response  
			if (Req.readyState == 4) { // If server already executed the request  
				var str = Req.responseText.split("&nbsp;"); // Read string data that is sent from server  
				if (str[0] == 'success') {  
					alert("Usúario registrado com sucesso!");
					window.location = "index.html";  
				}else {  
					alert(str[0]);  
				}  
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