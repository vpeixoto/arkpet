$(document).ready(function(){

	//Popup dos markers
	var infoWindow = null;	

	//A visibilidade do mapa precisa estar global
	var map = null;
	
	var markers = [];

	google.maps.event.addDomListener(window, 'load', initialize);
	
	function initialize() {

		navigator.geolocation.getCurrentPosition(onSuccess, onError, { enableHighAccuracy: true });
		
		function onSuccess(position) {
			lat = position.coords.latitude;
			lng = position.coords.longitude;
			
			var myLatlng = new google.maps.LatLng(lat,lng);
			var myOptions = {
				zoom : 13,
				center : myLatlng,
				mapTypeId : google.maps.MapTypeId.ROADMAP
			}

			map = new google.maps.Map(document.getElementById("map"),
				myOptions);
				
			infoWindow = new google.maps.InfoWindow;
			
			var marker = new google.maps.Marker({
				position: myLatlng,
				map: map,
				icon: "img/ico_person.png"
			});
			
			add_markers();
		}
		function onError(error) {
			alert('code: ' + error.code + '\n' +
				  'message: ' + error.message + '\n');
		}
	}
	
	function add_markers(){
		
		var marker;
			
		$.ajax({
			type: "POST",
			url: BASE_URL + "petshops.php",
			async: true,
			success: function(datos){
				var dataJson = eval(datos);
				for(var i in dataJson){
					var latLng = new google.maps.LatLng(dataJson[i].lat , dataJson[i].long);
					var nome = dataJson[i].nome;
					var end = dataJson[i].end;
					var phone = dataJson[i].phone;
					var icontype ="img/ico_petshop.png";
					var contentString = msg(nome, end, phone);
					
					/*
					var infowindow = new google.maps.InfoWindow({
						content: contentString
					});
					*/
					var marker = new google.maps.Marker({
						position : latLng,
						map : map,
						icon: icontype,
						 title:nome
					});
					attachSecretMessage(marker, contentString);
					/*
					marker.addListener('click', function() {
				    	infowindow.open(map, marker);
  					});
					*/
					markers.push(marker);
					
					//google.maps.event.addListener(marker, "click", function() {});
				}
			},
        	error: function (obj, error, objError){
				//avisar que ocurrió un error
				console.log('ocorreu um erro');
			}
		});
	}
	
	function attachSecretMessage(marker, secretMessage) {
		var infowindow = new google.maps.InfoWindow({
			content: secretMessage,
			maxWidth: 350
	  	});
	
	  	marker.addListener('click', function() {
			infowindow.open(marker.get('map'), marker);
	  	});
	}
	
	function msg(Nome,End,Phone){
		var nome = Nome;
		var end = End;
		var phone = Phone;
		var info_window =  '<div id="content">'+
      '<h1 id="firstHeading" class="firstHeading">' + nome + '</h1>'+
      '<div id="bodyContent">'+
      '<p><b>Endereço:</p></b><p>' + end + '</p> ' +
      '<p><b>Telefone:</p></b><p>' + phone + '</p> ' +
      '</div>'+
      '</div>';
					
		return info_window;
	}
});

$(function() {
	$("#voltar").click(function() {
		window.location="page2.html";
	});
});
