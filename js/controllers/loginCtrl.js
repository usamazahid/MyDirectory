App.controller('loginCtrl', function($scope,$http,$rootScope,$state,$ionicModal,$ionicPopup, $timeout,$ionicLoading,WebService,$ionicHistory) {

 $rootScope.menuDivShow=false;
         $rootScope.menuDiv=true;

 // Form data for the login modal
  $rootScope.loginData = {};
// Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/signin.html', {
    scope: $rootScope
  }).then(function(modal) {
    $rootScope.modal = modal;
  });

// Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $rootScope.modal.hide();
  };

// Open the login modal
  $scope.login = function() {
    $rootScope.modal.show();
  };

// Perform the login action when the user submits the login form
  $rootScope.doLogin = function() {
    //alert("sdsd");
    console.log('Doing login', $rootScope.loginData);
     $rootScope.logut=false;
    $rootScope.menuDiv=true;
     $rootScope.menuDivShow=false;
    $scope.showMessage = false;
    var link = 'login';//define controller function name
    var post_data = $rootScope.loginData;
    WebService.show_loading();
    var promise = WebService.send_data(link,post_data,"post");
     
      promise.then(function(data){
       
        if(data[0].status=='success'){
            var user_data = {
                  "id": data[0].data.id,
                  "username": data[0].data.username,
                  "email": data[0].data.email,
                  "phone_number": data[0].data.phone_number,
                  "zip_code": data[0].data.zip_code,
                  "user_image":data[0].data.image
            }; 
            localStorage.setItem('userData', JSON.stringify(user_data)); 
            var userData=JSON.parse(localStorage.getItem('userData'));  
            var user_id=userData.id;                  
            $rootScope.username=userData.username; 
            $rootScope.userimage=userData.user_image; 
            if($rootScope.userimage==false){
               $rootScope.Nouserimage="nouserimage"; 
            }
            $scope.showMessage = true;
            $rootScope.menuDivShow=true;
             $rootScope.menuDiv=false;
             $rootScope.logut=true;
              if($rootScope.noLogins=="noLogin"){
                $rootScope.modal.hide();
                 
                 $ionicHistory.nextViewOptions({
                   disableBack: true
                 });//show the menu btn 
                 $timeout(function() {
                   $state.go('app.srch-results');
                  }, 1000);
                
              }else if($rootScope.noLogins=="clctnLogin"){
                $rootScope.modal.hide();
            
                 $timeout(function() {
                  $rootScope.clctnView($rootScope.clctnCatId);
                  }, 1000);
                
              }else{
                 $ionicHistory.nextViewOptions({
                   disableBack: true
                 });
                $state.go('app.home');
              }
         
        }else{
          $scope.showMessage = true;
          $scope.class = data[0].class;  
          $scope.message = data[0].message;
        }
      $ionicLoading.hide();
      });

// code if using a login system
      $timeout(function() {
        $scope.closeLogin();
      }, 1000);
  };

//registration  
  $scope.regData={};
  $scope.doReg = function() {
    
    console.log('Doing Registration', $scope.regData);
   if($scope.regData.password==$scope.regData.password_c){

    var link = 'registration';
    var post_data = $scope.regData;
    WebService.show_loading();
    var promise = WebService.send_data(link,post_data,"post");
     
      promise.then(function(data){
         
        if(data[0].status=='success'){
           
          $state.go('app.signin');
        }else{
          $scope.class = data[0].class;  
          $scope.message = data[0].message;
        }
      $ionicLoading.hide();
      });
    }else{
      alert("Password and Confirm password are do not Match");
    }

  };
//forget password  
  $scope.fgt={};
  $scope.forgetPassword = function() {
   
    console.log('Doing forgetPassword', $scope.fgt);

    $scope.showMessage = false;
    var link = 'forgetpassword';
    var post_data = $scope.fgt;
    WebService.show_loading();
    var promise = WebService.send_data(link,post_data,"post");
     
      promise.then(function(data){
        if (data[0].status=='emailsend') {
          $scope.showMessage = true;
          $scope.class = data[0].class; 
          $scope.message = data[0].message; 
        }else {
          $scope.showMessage = true;
          $scope.class = data[0].class; 
          $scope.message = data[0].message;
        }
         
        
      $ionicLoading.hide();
      });

    $timeout(function() {
     $scope.showMessage = false;
    }, 3000);
  };

//logout
$scope.logout = function(){
    
    
    localStorage.removeItem('userData');
    localStorage.removeItem('city');
    WebService.show_loading();  
    
    $timeout(function(){
        $ionicLoading.hide();
        $ionicHistory.nextViewOptions({
          disableAnimate: true,
          disableBack: true
        });
         $rootScope.logut=false;
         $rootScope.menuDivShow=false;
         $rootScope.menuDiv=true;
        $state.go('app.home', {}, {reload: true}); 

    }, 1000);
    //$state.go('landing');
  
  };  
	
});