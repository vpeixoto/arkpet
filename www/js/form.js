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
   var name = document.getElementById("name").value;  
   var gender = document.getElementById("gender").value;
   var position = document.getElementById("position").value;
   var parameters = "name="+name+"&gender="+gender+"&position="+position;// Create parameters to be sent for server  
   Req.open("POST", 'http://www.4ponto2.com.br/sites/pets_app/data.php', true);  
   Req.setRequestHeader("Content-type", "application/x-www-form-urlencoded");  
   Req.setRequestHeader("Content-length", parameters.length);  
   Req.setRequestHeader("Connection", "close");  
      Req.send(parameters); // Begin send the data  
   Req.onreadystatechange = function() { // Function to read server response  
           if (Req.readyState == 4) { // If server already executed the request  
                var str = Req.responseText.split("&nbsp;"); // Read string data that is sent from server  
                if (str[0] == 'success') {  
                     alert("Data inputted successfully.");  
                }else {  
                     alert(str[0]);  
                }  
           }  
      }  
 }