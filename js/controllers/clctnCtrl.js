App.controller('clctnCtrl', function($scope,$http,$rootScope,$state,$ionicModal, $timeout,$ionicLoading,WebService) {


//collection
    var link = 'myCollection';
    var post_data ="";
    WebService.show_loading();
    var promise = WebService.send_data(link,post_data,"post");
         
        promise.then(function(data){
            $scope.collection=data;
            $ionicLoading.hide();
               
        });

//slider collection        
    var link = 'sliderCollection';
    var post_data ="";
    WebService.show_loading();
    var promise = WebService.send_data(link,post_data,"post");
         
        promise.then(function(data){
            $scope.clctnSlider=data;
            $ionicLoading.hide();
               
        });       
    
    //collection view
    $rootScope.clctnView=function(bcid){
       
       var userData=JSON.parse(localStorage.getItem('userData')); 
        if(userData!=undefined) {
        var user_id=userData.id;

       var link = 'myCollectionView';
       var post_data ={id:user_id,bcid:bcid};
       WebService.show_loading();
       var promise = WebService.send_data(link,post_data,"post");
         
        promise.then(function(data){
            $rootScope.clctnViews=data;
             if($rootScope.clctnViews==false){
               $state.go('app.no_result');
             }else{
               $ionicLoading.hide();
               $state.go('app.colection_details');
             }
               
        }); 
      }else{

          $rootScope.noLogins="clctnLogin";
          $rootScope.clctnCatId=bcid;
          $rootScope.modal.show();
      }   
    } 	

});	


