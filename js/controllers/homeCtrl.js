App.controller('homeCtrl', function($scope,$ionicBackdrop,$timeout,$http,$ionicPopup,$ionicLoading,$state,WebService,$rootScope) {

 $scope.homeList=false;
  // Triggered on a button click, or some other target
 $scope.showPopup = function() {
    $scope.homeList=true;
  
  }


//get current city

if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(function(position){

  $scope.$apply(function(){
    $scope.position = position;
    var myLatlng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
    currgeocoder = new google.maps.Geocoder();
    currgeocoder.geocode({
    'location': myLatlng
    }, function(results, status) {
    if (status == google.maps.GeocoderStatus.OK) {

      var add = results[0].formatted_address;
      var value=add.split(",");
      var count=value.length;
      $rootScope.city=value[count-3];//rootScope 's scope has get in all places
     // $scope.setCity($rootScope.city);//call another function
      var city_data = {
                  "city": $rootScope.city
                 };                    
        localStorage.setItem('city', JSON.stringify(city_data));
        console.log(city_data);
      } else {

      }
    });

  });
  });
}

  //search city from google  
  $rootScope.initialize=function() {
   
    var input = document.getElementById('country');
    var autocomplete = new google.maps.places.Autocomplete(input);
 
      google.maps.event.addListener(autocomplete, 'place_changed', function () {
        var address = autocomplete.getPlace().formatted_address;
        var res = address.split(",",1); 
        document.getElementById('country').value=address;
        $("#country").val(res.toString());
        $rootScope.sCity=res.toString();
        var city_data = {
                  "city": $rootScope.sCity
                 };                    
        localStorage.setItem('city', JSON.stringify(city_data));
        console.log(city_data);
      });

  }
  $rootScope.initializeSingle=function() {
   
    var input = document.getElementById('countrys');
    var autocomplete = new google.maps.places.Autocomplete(input);
 
      google.maps.event.addListener(autocomplete, 'place_changed', function () {
        var address = autocomplete.getPlace().formatted_address;
        var res = address.split(",",1); 
        document.getElementById('countrys').value=address;
        $("#countrys").val(res.toString());
        $rootScope.sCity=res.toString();
        var city_data = {
                  "city": $rootScope.sCity
                 };                    
        localStorage.setItem('city', JSON.stringify(city_data));
        console.log(city_data);
      });

  }

  //long press issue solved for select city from google result
  $rootScope.disableTap = function () {
    
    var container = document.getElementsByClassName('pac-container');
    angular.element(container).attr('data-tap-disabled', 'true');
    var backdrop = document.getElementsByClassName('backdrop');
    angular.element(backdrop).attr('data-tap-disabled', 'true');
    // leave input field if google-address-entry is selected
      angular.element(container).on("click", function () {
          document.getElementById('country').blur();
      });
  };


//search function
    $scope.myTitle = 'Auto Complete Example';
    $rootScope.data = {};
    $rootScope.showList=false;

  $rootScope.search = function() {

    var cityData=JSON.parse(localStorage.getItem('city'));  
    var city=cityData.city;
    
    if($rootScope.data.search!=""){

      var link = 'getBusinessname';
      var post_data = {searchword: $rootScope.data.search,city:city};
      WebService.show_loading();
      var promise = WebService.send_data(link,post_data,"post");
  
        promise.then(function(data){
           $rootScope.business =data;
           $rootScope.popStatus =data[0].status;
           
           if($rootScope.popStatus=="OVER_QUERY_LIMIT"){
            var alertPopup = $ionicPopup.alert({
              title: 'OVER QUERY LIMIT!',
              template: 'You have exceeded your daily request quota for this API.'
            });
           }
           $rootScope.showList=true;
           $ionicLoading.hide();
        });
   
    }else{
     
      $rootScope.showList=false;//hide li list
    }
  }

//list hide when click value and pass values to controller and get result  
  $rootScope.hideList = function(item) {
    
    $rootScope.result=""; 
    var cityData=JSON.parse(localStorage.getItem('city'));  
    var city=cityData.city;
    $rootScope.showList=false;//hide list
    $rootScope.selected_values=item;

      var link = 'searchResult';
      var post_data = {result:$rootScope.selected_values,city:city};
      WebService.show_loading();
      var promise = WebService.send_data(link,post_data,"post");
  
        promise.then(function(data){
           $rootScope.result =data.result;
             if($rootScope.result==false){
               $state.go('app.no_result');
             }else{
               $rootScope.from_type =data.from_type;
               $state.go('app.search');//go to next page
               $ionicLoading.hide();
             }
        });
  }

//category listing  
      var link = 'categoryList';
      var post_data = "";
      WebService.show_loading();
      var promise = WebService.send_data(link,post_data,"post");
  
        promise.then(function(data){
           $scope.categories =data;
           $ionicLoading.hide();
        });

//category details  
 
  $scope.categorys=function(catid,catname,type){
   
   $rootScope.categorylist ="";
    var cityData=JSON.parse(localStorage.getItem('city'));  
    var city=cityData.city;
    var link = 'categoryBusinessDetails';
    var post_data ={catid:catid,city:city,name:catname,from_type:type};
    WebService.show_loading();
    var promise = WebService.send_data(link,post_data,"post");
     
        promise.then(function(data){
           $rootScope.categorylist =data.resultHome;
           if($rootScope.categorylist==false){

              $state.go('app.no_result');
           }else{
             $rootScope.from_type=data.from_type;
             $ionicLoading.hide();
             $state.go('app.search');
           }  
        });

  }  
  

  
});