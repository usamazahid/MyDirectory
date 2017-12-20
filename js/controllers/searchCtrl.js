App.controller('searchCtrl', function($http,$rootScope,$scope,$state,$stateParams,$ionicPopup, $timeout,$ionicLoading,WebService) {
 

//google api key get
             
    var link = 'apikeyGet';
    var post_data ="";
    WebService.show_loading();
    var promise = WebService.send_data(link,post_data,"post");
         
        promise.then(function(data){
            $rootScope.apikey=data.google_api;
            $ionicLoading.hide();
        });
             
//eachtime call initmap when load the controller  (ionic view enter code) 
   $scope.$on("$ionicView.enter", function() {
         $scope.initMap();
         //$scope.initMapBusi();
    });
//map view
  
$scope.initMap = function () {
    $rootScope.mapValues="";
    var selectedArray = [];
    
    if($rootScope.from_type=="api_name"){
       var fetchArrayVAlue=$rootScope.result[0];
        selectedArray.push({
                DisplayText: fetchArrayVAlue.name,
                Address: fetchArrayVAlue.formatted_address,
                LatitudeLongitude:fetchArrayVAlue.geometry.location.lat+','+fetchArrayVAlue.geometry.location.lng,
        });
    }else if($rootScope.fromtype=="singleValue"){
       var fetchArrayVAlue=$rootScope.businessAllGogldetails[0];
     
        selectedArray.push({
                DisplayText: fetchArrayVAlue.name,
                Address: fetchArrayVAlue.formatted_address,
                LatitudeLongitude:fetchArrayVAlue.geometry.location.lat+','+fetchArrayVAlue.geometry.location.lng,
        });
    }else if($rootScope.from_type=="singleValueDb"){
       var fetchArrayVAlue=$rootScope.businessAlldetails;
        selectedArray.push({
                DisplayText: fetchArrayVAlue.business_name,
                Address: fetchArrayVAlue.street_address,
                LatitudeLongitude:fetchArrayVAlue.latitude+','+fetchArrayVAlue.longitude,
        });

    }else if($rootScope.from_type=="cgoogle"){


        var fetchArrayVAlue=$rootScope.categorylist[0];
        for (var i in fetchArrayVAlue) {
        // console.log(fetchArrayVAlue[i].street_address);
          if(fetchArrayVAlue[i].street_address)
          {
                selectedArray.push({
                   DisplayText: fetchArrayVAlue[i].name,
                   Address: fetchArrayVAlue[i].street_address,
                   LatitudeLongitude:fetchArrayVAlue[i].latitude+','+fetchArrayVAlue[i].longitude,
                     //LatitudeLongitude:"10.22"+','+"70.222", 
                });
          }
          else{
            selectedArray.push({
                   DisplayText: fetchArrayVAlue[i].name,
                   Address: fetchArrayVAlue[i].formatted_address,
                   LatitudeLongitude:fetchArrayVAlue[i].geometry.location.lat+','+fetchArrayVAlue[i].geometry.location.lng,
                     //LatitudeLongitude:"10.22"+','+"70.222", 
                });
          }      
        }
    }
    else if($rootScope.from_type=="other"){
       var fetchArrayVAlue=$rootScope.result[0];
        selectedArray.push({
                DisplayText: fetchArrayVAlue[0].name,
                Address: fetchArrayVAlue[0].street_address,
                LatitudeLongitude:fetchArrayVAlue[0].latitude+','+fetchArrayVAlue[0].longitude,
        });

    }else{
       var fetchArrayVAlue=$rootScope.result[0];
        for (var i in fetchArrayVAlue) {
        // console.log(fetchArrayVAlue[i].street_address);
          if(fetchArrayVAlue[i].street_address)
          {
                selectedArray.push({
                   DisplayText: fetchArrayVAlue[i].name,
                   Address: fetchArrayVAlue[i].street_address,
                   LatitudeLongitude:fetchArrayVAlue[i].latitude+','+fetchArrayVAlue[i].longitude,
                     //LatitudeLongitude:"10.22"+','+"70.222", 
                });
          }
          else{
            selectedArray.push({
                   DisplayText: fetchArrayVAlue[i].name,
                   Address: fetchArrayVAlue[i].formatted_address,
                   LatitudeLongitude:fetchArrayVAlue[i].geometry.location.lat+','+fetchArrayVAlue[i].geometry.location.lng,
                    //LatitudeLongitude:"10.22"+','+"70.222", 
                });
          }      
        }
    }
    $rootScope.mapValues=selectedArray;
     $scope.mapLoad();
     $scope.initMapBusi();
}

 

//map load
    $scope.mapLoad = function () {
       
       // console.log($rootScope.mapValues);
        var mapPassData=$rootScope.mapValues;
        $scope.map = new google.maps.Map(document.getElementById('map-canvas'), {
            center: {lat: 10.0178, lng: 76.3333},
            zoom: 13,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        });
        if (mapPassData.length >= 1){
            for (var i = 0; i < mapPassData.length; i++){

                var myarr = mapPassData[i].LatitudeLongitude.split(",");
                if (myarr[0].length > 1) {
                    $scope.ViewCustInGoogleMap(mapPassData);

                }
            }
        }
    }

//map load for business details page
    $scope.initMapBusi = function () {
     
        var mapPassData=$rootScope.mapValues;
        //console.log(mapPassData);
        $scope.map = new google.maps.Map(document.getElementById('mapbusi'), {
            center: {lat: 10.0178, lng: 76.3333},
            zoom: 13,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        });
        if (mapPassData.length >= 1){
            for (var i = 0; i < mapPassData.length; i++){

                var myarr = mapPassData[i].LatitudeLongitude.split(",");
                if (myarr[0].length > 1) {
                    $scope.ViewCustInGoogleMap(mapPassData);

                }
            }
        }
    }

    $scope.ViewCustInGoogleMap = function (mapPassData, merge_json) {
      
        merge_json = merge_json || false;

        if (merge_json) {
            new_data = JSON.parse(mapPassData);
            $.merge(people, new_data);
        }else {
            people = mapPassData;
        }
        for (var i = 0; i < people.length; i++) {
            $scope.setMarker(people[i]);
        }
        /*zoom map pointer*/
        var LatLngList = [];

        if (people.length > 1){
            for (var i = 0; i < people.length; i++){

                var myarr = people[i].LatitudeLongitude.split(",");
                LatLngList.push(new google.maps.LatLng(myarr[0], myarr[1]));
            }

            latlngbounds = new google.maps.LatLngBounds();

            LatLngList.forEach(function (latLng) {
                latlngbounds.extend(latLng);
            });

            $scope.map.setCenter(latlngbounds.getCenter());
            $scope.map.fitBounds(latlngbounds);

        } else {
            var myarr = people[0].LatitudeLongitude.split(",");
            latlng = new google.maps.LatLng(myarr[0], myarr[1]);
            $scope.map.setCenter(latlng);
        }
        /*end zoom map pointer*/
    }
    $scope.setMarker = function (people) {
        geocoder = new google.maps.Geocoder();
        infowindow = new google.maps.InfoWindow();
        if ((people["LatitudeLongitude"] == null) || (people["LatitudeLongitude"] == 'null') || (people["LatitudeLongitude"] == '')) {
            geocoder.geocode({'address': people["Location"]}, function (results, status) {
                if (status == google.maps.GeocoderStatus.OK) {
                    latlng = new google.maps.LatLng(results[0].geometry.location.lat(), results[0].geometry.location.lng());
                    marker = new google.maps.Marker({
                        position: latlng,
                        map: $scope.map,
                        icon: 'img/pointer.png',
                        draggable: false,
                        html: '<div class="c1"><div class="acc-func-rating"><div class="vertical flat"><div class="progress-bar"><div class="progress-track"><div class="progress-fill"><div class="progress-fill"></div></div></div></div></div><div class="acc-func-price">' + people["DisplayText"] + '</div><div class="c2"><div class="c2-inner"><h1>' + people["Address"] + '</h1><p>' + people["Location"] + '</p></div></div>'
                    });

                    google.maps.event.addListener(marker, 'click', function (event) {
                        infowindow.setContent(this.html);
                        infowindow.setPosition(event.latLng);
                        infowindow.open($scope.map, this);
                    });
                } else {
                    alert(people["DisplayText"] + " -- " + people["Location"] + ". This address couldn't be found");
                }
            });
        } else {
            var latlngStr = people["LatitudeLongitude"].split(",");
            var lat = parseFloat(latlngStr[0]);
            var lng = parseFloat(latlngStr[1]);
            latlng = new google.maps.LatLng(lat, lng);
            marker = new google.maps.Marker({
                position: latlng,
                map: $scope.map,
                icon: 'img/pointer.png',
                draggable: false, // can't drag it
                html: '<div class="c1"><div class="acc-func-rating"><div class="vertical flat"><div class="progress-bar"><div class="progress-track"><div class="progress-fill"><div class="progress-fill"></div></div></div></div></div><div class="acc-func-price">' + people["DisplayText"] + '</div><div class="c2"><div class="c2-inner"><h1>' + people["Address"] + '</h1><p>' + people["Location"] + '</p></div></div>'
            });

            google.maps.event.addListener(marker, 'click', function (event) {
                infowindow.setContent(this.html);
                infowindow.setPosition(event.latLng);
                infowindow.open($scope.map, this);
            });
        }
    }


/* prinku design code for business details page*/

    $scope.active_content = 'orders';
	//setActiveContent(orders);
	$scope.setActiveContent = function(active_content){
		$scope.active_content = active_content;
	}


//get business details
    $scope.businessDetails=function(businessID){
        
        $rootScope.businessID=businessID; 
        var cityData=JSON.parse(localStorage.getItem('city'));  
	    var city=cityData.city;
        var userData=JSON.parse(localStorage.getItem('userData'));
        if(userData!=undefined) { 
        var user_id=userData.id;
        }
	    var link = 'businessDetails';
        if(user_id!=''){
	       var post_data ={id:businessID,city:city,user_id:user_id};
        }else{
           var post_data ={id:businessID,city:city};

        }
	    WebService.show_loading();
	    var promise = WebService.send_data(link,post_data,"post");
	     
	        promise.then(function(data){
	            $rootScope.businessAlldetails =data;
	            $rootScope.from_type="singleValueDb";
               // console.log(data);
                if(!(data.favid)){
                 $rootScope.favid ="noFav";
                }
               
	            $ionicLoading.hide();

			    //get gallary details 
				    var link = 'businessGallery';
				    var post_data ={b_id:$rootScope.businessID};
				    WebService.show_loading();
				    var promise = WebService.send_data(link,post_data,"post");
				     
				        promise.then(function(data){
				           $rootScope.gallary =data;
				           $ionicLoading.hide();
				        });

				//get review details 
				    var link = 'businessReviews';
				    var post_data ={b_id:$rootScope.businessID};
				    WebService.show_loading();
				    var promise = WebService.send_data(link,post_data,"post");
				     
				        promise.then(function(data){
				           $rootScope.reviews =data;
				           $ionicLoading.hide();
				        });               
    
	            $state.go('app.srch-results');
	        });    

    }

//get business details
    $scope.businessGooglDetails=function(placeID,from_type,type){
    
        var type=type;
        var cityData=JSON.parse(localStorage.getItem('city'));  
	    var city=cityData.city;
	    var link = 'businessGooglDetails';
	    var post_data ={id:placeID,city:city,from_type:from_type};
	    WebService.show_loading();
	    var promise = WebService.send_data(link,post_data,"post");
	     
	        promise.then(function(data){
	            $rootScope.businessAllGogldetails =data.details;
	           // $rootScope.from_type =data.from_type;
	            $rootScope.goglReview =data.review;
                $rootScope.noGal="noGallery"; 
                if($rootScope.goglReview==false){
                   $rootScope.goRev="noGoglRev"; 
                }
                if(type=="cat"){
                  $rootScope.fromtype="catValue";
                }else{
	              $rootScope.fromtype="singleValue";
                }
	            $ionicLoading.hide();
	            $state.go('app.srch-results');
            });
    }

    
//favourite 
    $scope.favourite=function(bId,cid){
 
        
        var userData=JSON.parse(localStorage.getItem('userData')); 
        if(userData!=undefined) {
            var user_id=userData.id;
          
            var link = 'favourite';
            var post_data ={bId:bId,user_id:user_id,cid:cid};
            WebService.show_loading();
            var promise = WebService.send_data(link,post_data,"post");
         
                promise.then(function(data){
                    $rootScope.favValue=data;
                    $ionicLoading.hide();
                });
        }else{
            $rootScope.noLogins="noLogin"; 
            $rootScope.modal.show();
           
        }      

    }




 
 

});