var client_id = "633043246748696";      //test app id
var redir_url = "https://www.facebook.com/connect/login_success.html";
var Project = {
    isInternet : true,
    iOSVersion : 4.0,
    currentDeviceToken : '',
    currentImageId:'',
    pageBackStack : '',
    isIOSDevice : ( (navigator.userAgent.match(/iPhone/i)) || (navigator.userAgent.match(/iPad/i)) ) == null ? (navigator.userAgent.match(/Android/i)) == null ?  (navigator.userAgent.match(/BlackBerry/i)) == null ? 0 : 3 : 2 : 1,
    isDeviceType : (navigator.userAgent.match(/iPad/i))  == "iPad" ? "iPad" : (navigator.userAgent.match(/iPhone/i))  == "iPhone" ? "iPhone" : (navigator.userAgent.match(/Android/i)) == "Android" ? "Android" : (navigator.userAgent.match(/BlackBerry/i)) == "BlackBerry" ? "BlackBerry" : "Browser",
    deviceWidth : $(window).width(),
    deviceHeight : $(window).height(),
    bottomArray : new Array() ,
    currentPageScoll : '',
    listSettings : '',
    pageData : '',
    currentListData : '',
    pageLoadStarted : false ,
    recordLimit : 10 ,
    site_url : 'http://4ponto2.com.br/sites/pets_app/',
    ws_url : 'http://4ponto2.com.br/sites/pets_app/',

    geoInfo : '',
    initialPage : '',
    isDefaultTabBar : false,
    tabArr : new Array(),
    init: function () {
        this.pageBackStack = new Array();
//        if ( Project.isDefaultTabBar ) {
//            this.makeBottomBar();
//            showLoading(this.initialPage,"next");
//        } else {
//            loadPageData(this.initialPage,"next");
//        }
    },
    modules: [],
    initModules: function () {
        for (var module in Project.modules) {
            var id = module.replace(/([A-Z])/g, '-$1').toLowerCase();
            id = id.substring(0, 1) == '-' ? id.substring(1) : id;
            if ($('#' + id).length && typeof(this.modules[module].init) == 'function') {
                Project.modules[module].init($('#' + id));
            }
        }
    },
    handleImageUpload : function ( btnObj ) {
        Project.currentImageId = btnObj.id.toString().substr(4);
        $("#image_action_sheet").show();
        return false;
    },
    getPicture : function() {
        try {
            navigator.camera.getPicture(Project.uploadFile,
                function(message) {
                    jAlert("Image from library failed",function(){
                       cordova.exec(null, null, "DatePicker", "ios7adjustment",[]);
                    });
                },{
                    quality: 75, 
					targetWidth:500,
  					//targeHeight: 500,
  					correctOrientation: true,
                    destinationType: navigator.camera.DestinationType.DATA_URL,
                    sourceType: navigator.camera.PictureSourceType.PHOTOLIBRARY
            });
        } catch ( err ) {
            alert(err)
        }
        
        $("#image_action_sheet").hide();
    },
    captureImage : function() {
        try {
            navigator.camera.getPicture(Project.uploadFile,
                function(message) {
                    if( Project.isIOSDevice != 0 ) {
                        cordova.exec(null, null, "DatePicker", "ios7adjustment",[]);
                    }
                    jAlert("Image from library failed",function(){
                           cordova.exec(null, null, "DatePicker", "ios7adjustment",[]);
                    });
                },{
                    quality: 75, 
					targetWidth:500,
	 	 			//targeHeight: 500,
  					correctOrientation: true,
                    destinationType: navigator.camera.DestinationType.DATA_URL,
                    sourceType: navigator.camera.PictureSourceType.CAMERA
            });
        } catch ( err ) {
            alert(err);
        }
        $("#image_action_sheet").hide();
    },
    handleCancelImage : function() {
        $("#image_action_sheet").hide();
    },
    uploadFile : function (mediaFile) {
        if( Project.isIOSDevice != 0 ) {
            cordova.exec(null, null, "DatePicker", "ios7adjustment",[]);
        }
        $("#"+Project.currentImageId).val(mediaFile);
        $("#img_"+Project.currentImageId).attr("src","data:image/jpeg;base64,"+mediaFile);
        Project.currentImageId = '';
        console.log(mediaFile);
    },
    makeBottomBar : function () {
        //attach DIV and Add span in to that.        
        if ( this.tabArr.length > 0 ) {
            $div = $("<div class='tabbar footer-cnt' id='footer-icons'><ul></ul></div>");
            for ( tb = 0; tb < this.tabArr.length; tb++ ) {
                $span = $('<li index="'+tb+'" onclick="Project.handleTabClick(this);" id="bot_bar_'+this.tabArr[tb].id+'"><div class="notification" style="display:none;">0</div><a href="#" class="'+this.tabArr[tb].cls+'">'+this.tabArr[tb].text+'</a></li>');
                //$span = $("<li index='"+tb+"' onclick='Project.handleTabClick(this)' id='bot_bar_" + this.tabArr[tb].id + "' class='" + this.tabArr[tb].id + "'>"+this.tabArr[tb].id +"</li>");
                $div.find('ul').append($span);
            }
            $("body").append($div);
            $("#bot_bar_" + this.tabArr[0].id ).addClass("active");
//            this.tabArr[0]['func']();
        }
    },
    handleTabClick : function ( tabObject ) {    	  
        Project.clearBackStack();
        $("#footer-icons li").removeClass("active");
        $(tabObject).addClass("active");
        var idx = $(tabObject).attr("index");
        this.tabArr[idx]['func']();
    } ,
    callBackButton : function () {
    	var lastItem = this.pageBackStack.slice(-2)[0];
    	if(lastItem && this.pageBackStack.length > 1){
			loadPageData(lastItem['file_name'] , 'prev' , lastItem['my_data'] );
    	} else {
    		jAlert("Previous page unavailable");
    	}
    } , 
    clearBackStack : function () {
        this.pageBackStack = new Array();
    },
    addBackStack : function (file_name , my_data) {
        var pgArray = new Array ();
        pgArray['file_name'] = file_name;
        pgArray['my_data'] = my_data;
        this.pageBackStack.push(pgArray);
    }
};

$(document).ready(function(){
    try {
        if( Project.isIOSDevice == 0 ) {
            setTimeout(function(){
                onDeviceReady();
            },100);
        } else {
            document.addEventListener("deviceready",onDeviceReady,false);
        }
    } catch (err) {
        alert(err);
    }
});
function onDeviceReady() {
    if ((localStorage.getItem("language") == undefined)|| (localStorage.getItem("language") == null)) {		
        localStorage.setItem("language", "EN");
        console.log(localStorage.getItem("language"));
    }
    $("#viewPort").attr("content","user-scalable=no, initial-scale=1, maximum-scale=1, minimum-scale=1, target-densitydpi=device-dpi, height="+innerHeight+", width=device-width");
	 /*
    if( Project.isIOSDevice == 0 ) {
        Project.initialPage = 'loading.html';					
    } else {
        Project.initialPage = 'loading.html';
    }
    */
    	
      var helpPageShown = localStorage.getItem("helpScreenShown");
	   if(!helpPageShown){
	       //loadPageData("help.html","next");
	       Project.initialPage = 'help.html';
	   } else {
	       //if(isUserLoggedIn()){
	       //   var start_screen = localStorage.getItem("start_screen");
	          //loadPageData(getScreenName(start_screen),'next');
	       //   Project.initialPage = getScreenName(start_screen);
	       //} else {
	          //loadPageData("login.html","next");
	          Project.initialPage = 'login.html';
	       //}
	   }
    
    
    Project.isDefaultTabBar = false;
    if(Project.isDefaultTabBar){
        Project.tabArr = [
        {
            'id':'first_tab',
            'cls':'icon1',
            'func':firstTab,
            'text':'Home'
        },
        {
            'id':'second_tab',
            'cls':'icon2',
            'func':secondTab,
            'text':'Pending Bets'
        },
        {
            'id':'third_tab',
            'cls':'icon3',
            'func':thirdTab,
            'text':'Open Bets'
        },
        {
            'id':'forth_tab',
            'cls':'icon4',
            'func':fourthTab,
            'text':'Closed Bets'
        },
        {
            'id':'fifth_tab',
            'cls':'icon6',
            'func':fifthTab,
            'text':'New Bets'
        }
        ];
    }
    Project.init();
	
}

var pageLoadStarted = false;
var prev_page;
var curr_page;
var page_container = $("#page-cnt");
var page_currentPage = '';

function loadPageData( file_name , eType ,data,addToStack) {
    page_container = $("#page-cnt");
    if( file_name.indexOf(".html") == -1 ) {
        file_name = file_name+".html";
    }
    
    prev_page = curr_page;
    curr_page = file_name;
    
    console.log("|-:-|-:-|-:-| - CURRENT SCREEN :> "+curr_page);
    
    if ( pageLoadStarted ) {
        console.log(">> animation is in process");
        return false;
    }
	if ( eType == 'next' ) {
		Project.addBackStack(file_name , data);
	} else if ( eType == 'prev' || eType == 'back' && !addToStack) {
		Project.pageBackStack.pop();
	}
	pageLoadStarted = true;
    pageData = JSON.stringify(data);
    previousAnimation = eType == undefined ? "next" : eType;
    //showLoading();
    $.ajax({
        url : file_name,
        success : function(HTML){
            var page = $('<div />',{'class':'page-cnt'});
//            var reg = new RegExp(/#.[^(^)^\|^<^>^#]*#/g);
//            if (reg.exec(HTML)) {
//                var strings_arr = HTML.match(reg);
//                for ( var i = 0; i < strings_arr.length; i++) {
//                    var loc_key = strings_arr[i].replace(/[\$\{\}\|\@\!\#]/g,'');
//                    HTML = HTML.replace(strings_arr[i],	getValFromKey(loc_key));
//                }
//            }
            page.html(HTML);
            $("footer").hide();
            if($(page).find("footer").length > 0){
            	if( (localStorage.getItem('user_id') == null) || (localStorage.getItem('user_id') == undefined) || (localStorage.getItem('user_id') == "") ){
		 				hideBottomBar();
		  			}else{
		  				showBottomBar();	
		  			}                
            } else {
                hideBottomBar();
            }
            if (page.html() != '') {
                if ( eType == "prev" ) {
                    from = "left";
                } else {
                    from = "right";
                }
                slidePageFrom(page,from,pageData);
            }
            hideLoading();
        },
        error : function(xhr,status,error){
            console.error(arguments);
        },
        async : false
    })
//    checkConnection();
}

WSCall = 0;

function getWSData( url , params, callSettings ,callBackFn  ){
	if(typeof url == 'function'){
		var obj = new url(params,function(response){
			if(typeof callBackFn == 'function'){
				callBackFn(response);
			}
		});
		return false;
	}
    if ( typeof(callSettings) == 'function' ) {
        callBackFn = callSettings;
        callSettings = '';
    }
//    if ( callSettings.showLoading == '' || callSettings.showLoading == undefined ) {
//        if(callSettings.showLoading != false){
//            callSettings.showLoading = true;
//        }
//    }
    if (url.indexOf('http://') == -1 && url.indexOf('https://') == -1) {
        url = Project.ws_url+ url;    
    }
    if ( typeof(params) == "object") {
        var paramString = new Array();
        for ( tmpKey in params ) {
            paramString.push(tmpKey+"="+params[tmpKey]);
        }
        paramString = paramString.join("&");
        params = paramString+"&device_type="+Project.isDeviceType;
    }
    console.log("URL>>"+url+"?"+params);
//    var md5_name = md5(url+params);
//    var loadFromCache = false;
//    if (callSettings.cache != 0 && localStorage.getItem(md5_name) ) {
//    	content_type = localStorage.getItem(md5_name).split(",")[0];
//        cached_time = localStorage.getItem(md5_name).split(",")[1];
//        if ( Math.round(((new Date()).getTime() - parseInt(cached_time))/1000) < callSettings.cache ) {
//            loadFromCache = true;
//        }
//    }
    
//    if ( !loadFromCache ) {
        WSCall++;
//        if ( callSettings.showLoading ) {
//            //showLoading();
//        }
        var callTime = new Date().getTime();
        params = params+"&call_time="+callTime;
        var httpc = new XMLHttpRequest();
        httpc.open("POST", url, true);
        httpc.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        httpc.onreadystatechange = function() {
            if(httpc.readyState == 4) {
                WSCall--;
                var responseType = httpc.getAllResponseHeaders();
                if(responseType.indexOf("application/json") != -1) {
                    rType = "showLoading";
                } else if(responseType.indexOf("text/xml") != -1) {
                    rType = "xml";									   
                } else {
                    rType = "text";									   
                }
                
                if ( callSettings.cache != 0 ) {
//                    writeFileToCache(md5_name , httpc.responseText , function(){
//                        localStorage.setItem(md5_name , new Array(rType , (new Date()).getTime()));
//                    });
                }
                if(httpc.responseText){
					if(rType == "json") {
						callBackFn(JSON.parse(httpc.responseText));
					} else {
						callBackFn(httpc.responseText);				   
					}
				}
                if ( callSettings.showLoading ) {
                    hideLoading();
                }
            }
        }
        httpc.send(params);

//    } else {
//        var str = window.location.href.toString().replace("index.html" , "");
//        cache_url = str + "../../Documents/app_cache/"+md5_name;
//        $.get(cache_url,function(filecnt){
//            if ( content_type == 'json' ) {
//                callBackFn(eval(filecnt));
//            } else {
//                callBackFn(filecnt);
//            }
//        });
//    }
}

//window.onerror=function(error){
//    console.log('An error has occurred!\n'+error);
//}

function checkConnection(callBackFunction) {
    if(Project.isIOSDevice){
        var networkState = navigator.network.connection.type;
        //	alert("networkState >> "+ networkState)
        console.log("networkState >> "+networkState);
        var states = {};
        states[Connection.UNKNOWN]  = 'Unknown connection';
        states[Connection.ETHERNET] = 'Ethernet connection';
        states[Connection.WIFI]     = 'WiFi connection';
        states[Connection.CELL_2G]  = 'Cell 2G connection';
        states[Connection.CELL_3G]  = 'Cell 3G connection';
        states[Connection.CELL_4G]  = 'Cell 4G connection';
        states[Connection.NONE]     = 'No network connection';
        
        
        if(states[networkState] == "No network connection" || states[networkState] == "Unknown connection") {
            hideLoading();			
            Project.isInternet = false;
            jAlert(states[networkState],"");
        } else {
            Project.isInternet = true;
        }
    }
}

var slidePageFrom = function(page, from, pageData) {
    page_container.append(page);
    if (!page_currentPage || !from) {
        page.attr("class", "page-cnt page center");
        page_currentPage = page;
        pageLoadStarted = false;
        pageInit();
        return;
    }
    page.attr("class", "page-cnt page " + from);
    page_currentPage.bind('webkitTransitionEnd', function(e) {
        $(e.target).remove();
        pageLoadStarted = false;
        if(!pageData){
            pageData = '{}';
        }
        pageInit(eval('(' + pageData+ ')'));
        if(Project.isIOSDevice){
            initPickerView();
        }
    });
    page_container[0].offsetWidth;          // DO NOT remove / comment this line!
    page.attr("class", "page-cnt page transition center");
    page_currentPage.attr("class", "page-cnt page transition " + (from === "left" ? "right" : "left"));
    page_currentPage = page;
}

function nativeKeyboardEvent(event) {
	try {
        window.scrollTo(0,0);
		if(device.platform == "iOS" && parseFloat(device.version) >= 7.0 ) {
            console.log("on blur call....");
            window.scrollTo(0,0);
		}
	} catch (_err) {
		
	}
}
/*
function registerAPN() {
    try {
            window.plugins.pushNotification.registerDevice({alert:true, badge:true, sound:true}, function(status) {
                //alert(status);
                console.log(">>Device >>>> Token>>"+status.deviceToken);
                Project.currentDeviceToken = status.deviceToken;
                //alert(Project.currentDeviceToken);
                sendDevicetoken(Project.currentDeviceToken);
                window.plugins.pushNotification.getPendingNotifications(function(noti){
                    console.log(noti.notifications);
                    if(noti.notifications.length > 0){
                        notification_received_flag = true;
                        notification_received_data = noti.notifications;                                                                               
                    }
                });
            });
    } catch ( err ) {
        //jAlert(err);
        console.log("Push notification Error >>");
        console.log(err)
    }
}
function sendDevicetoken(devicetoken) {
    var token_params = {"device_token":devicetoken}
    getWSData('messages',{},'',function(response){
    	$('#msg-notification').html(response['data'].messages_adv.length);
    });

}*/