App.service("WebService",["$http","$q","$ionicLoading","$ionicPopup","$timeout",function(e,t,o,n,r){this.upload=function(e,o,n){var r=base_url+e,a=t.defer(),s=document.getElementById(o),i=s.src,u=new FileUploadOptions;u.fileKey="file",u.fileName=i.substr(i.lastIndexOf("/")+1),u.mimeType="image/jpeg",u.params=n,u.chunkedMode=!1;var c=new FileTransfer;return c.upload(i,r,function(e){a.resolve(e.response)},function(e){alert("An error has occurred: Code::: = "+e.code)},u),a.promise},this.send_data=function(a,s,i){var u=t.defer();if("post"==i){var c=base_url+a;$.ajax({type:"POST",url:c,data:s,tryCount:1,retryLimit:4,timeout:2e4,success:function(e){u.resolve(e)},error:function(e,t){var a,s;"timeout"==t?(s="TIME OUT",a="Check your network strength"):404==e.status?(s="SERVER ERROR",a="Unable to connect to the server!"):200==e.status?(s="SERVER ERROR",a="We're sorry, but Something went wrong."):(s="SERVER ERROR",a="Error code : "+e.status),o.hide();var i=this,u=n.alert({title:s,template:a,cssClass:"ALERT"});u.then(function(){o.show({content:"Loading",showBackdrop:!1}),r(function(){$.ajax(i)},100)})},dataType:"json"})}else{var c=base_url+a,d={method:"POST",url:c,data:s};e(d).then(function(e){u.resolve(e.data)},function(){o.hide(),u.reject()})}return u.promise},this.show_loading=function(){o.show({content:"Loading",showBackdrop:!1})}}]);