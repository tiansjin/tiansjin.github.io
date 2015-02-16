  // This is called with the results from from FB.getLoginStatus().
  function statusChangeCallback(response) {
    console.log('statusChangeCallback');
    console.log(response);
    // The response object is returned with a status field that lets the
    // app know the current login status of the person.
    // Full docs on the response object can be found in the documentation
    // for FB.getLoginStatus().
    if (response.status === 'connected') {
      // Logged into your app and Facebook.
      showButtons();
    } else if (response.status === 'not_authorized') {
      // The person is logged into Facebook, but not your app.
      document.getElementById('status').innerHTML = 'Please log ' +
        'into this app.';
    } else {
      // The person is not logged into Facebook, so we're not sure if
      // they are logged into this app or not.
      document.getElementById('status').innerHTML = 'Please log ' +
        'into Facebook.';
    }
  }

  // This function is called when someone finishes with the Login
  // Button.  See the onlogin handler attached to it in the sample
  // code below.
  function checkLoginState() {
    FB.getLoginStatus(function(response) {
      statusChangeCallback(response);
    });
  }

  window.fbAsyncInit = function() {
  FB.init({
    appId      : '399183716908483',
    cookie     : true,  // enable cookies to allow the server to access 
                        // the session
    xfbml      : true,  // parse social plugins on this page
    version    : 'v2.1' // use version 2.1
  });

  FB.logout(function(){

  })

  // Now that we've initialized the JavaScript SDK, we call 
  // FB.getLoginStatus().  This function gets the state of the
  // person visiting this page and can return one of three states to
  // the callback you provide.  They can be:
  //
  // 1. Logged into your app ('connected')
  // 2. Logged into Facebook, but not your app ('not_authorized')
  // 3. Not logged into Facebook and can't tell if they are logged into
  //    your app or not.
  //
  // These three cases are handled in the callback function.

  FB.getLoginStatus(function(response) {
    statusChangeCallback(response);
  });

  };

  // Load the SDK asynchronously
  (function(d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s); js.id = id;
    js.src = "//connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
  }(document, 'script', 'facebook-jssdk'));

  function showButtons(){
  	document.getElementById("uploaded").style.display="inline";
  	document.getElementById("tagged").style.display="inline";
    document.getElementById("albums").style.display="inline";
  }

  function hideButtons(){
  	document.getElementById("uploaded").style.display="none";
  	document.getElementById("tagged").style.display="none";
    document.getElementById("albums").style.display="none";
  }


  function clearPhotos(){
  	var section = document.body.getElementsByTagName('section')[1];
  	while (section.firstChild) {
  		section.removeChild(section.firstChild);
  	}
  }

  // function fetchAlbums(){
  //   clearPhotos();
  //   FB.api('/me/albums',{'limit':100}, function(response) {
  //     var data = response.data;
  //     for (i = 0; i < data.length; i++){
  //       var id = data.id;
  //       var name = data.name;
  //       var btn = document.createElement("BUTTON");
  //       var t = document.createTextNode(name);
  //       btn.appendChild(t);
  //       btn.onclick = fetchAlbum(id);
  //       document.body.getElementsByTagName('section')[1].appendChild(btn);
  //     }
  //   }
  // }

  // function fetchAlbum(id){

  // }

  function fetchUploaded(){
  	clearPhotos();
    console.log('Fetching Uploaded Photos.... ');
    FB.api('/me/photos/uploaded',{'limit':100}, function(response) {
      var data = response.data;
      for (i = 0; i < data.length; i++){
        var photo = data[i];
        var names = "";
        if (photo.hasOwnProperty('tags')){
          var tags = photo.tags.data;
          if (tags.length > 0){
            names = tags[0].name;
          }
          for (j = 1; j < tags.length; j++){
            names = names + ", " + tags[j].name;
          }
        }
        displayImage(photo.source, photo.width/2, photo.height/2, names);
      }

    });
  }

  function fetchPhotos() {
  	clearPhotos();
    console.log('Fetching Photos.... ');
    FB.api('/me/photos',{'limit':100}, function(response) {
      
      var data = response.data;
      for (i = 0; i < data.length; i++){
        var photo = data[i];
        var tags = photo.tags.data;
        var names = "";
        if (tags.length > 0){
          names = tags[0].name;
        }
        for (j = 1; j < tags.length; j++){
          names = names + ", " + tags[j].name;
        }
        displayImage(photo.source, photo.width/2, photo.height/2, names);
      }

    });
  }

  function displayImage(src, width, height, caption){
    var figure = document.createElement("FIGURE");
    var img = document.createElement("img");
    img.src = src;
    img.width = width;
    img.height = height;
    img.alt = caption;
    figure.appendChild(img);
    var cap = document.createElement("FIGCAPTION");
    cap.innerHTML = caption;
    figure.appendChild(cap);
    document.body.getElementsByTagName('section')[1].appendChild(figure);
  }
