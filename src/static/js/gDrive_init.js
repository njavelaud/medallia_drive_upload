function gDriveInit(){
	// ---- GDRIVE INIT ----
    // The Browser API key obtained from the Google API Console.
	var developerKey = 'AIzaSyCGKo2AQlmFJ2BqowpsDmeYf3gmv7DVZ3Y';

	// The Client ID obtained from the Google API Console. Replace with your own Client ID.
	var clientId = "773917306404-72m9gnohalig1sp2l99edbghnb1cq15h.apps.googleusercontent.com";

	// Scope to use to access user's photos.
	var scope = ['https://www.googleapis.com/auth/drive.readonly'];

	var pickerApiLoaded = false;
	var oauthToken;

	// Use the API Loader script to load google.picker and gapi.auth.
	function onApiLoad() {
	gapi.load('auth', {'callback': onAuthApiLoad});
	gapi.load('picker', {'callback': onPickerApiLoad});
	}

	function onAuthApiLoad() {
	window.gapi.auth.authorize(
	    {
	      'client_id': clientId,
	      'scope': scope,
	      'immediate': false
	    },
	    handleAuthResult);
	}

	function onPickerApiLoad() {
	pickerApiLoaded = true;
	createPicker();
	}

	function handleAuthResult(authResult) {
	if (authResult && !authResult.error) {
	  oauthToken = authResult.access_token;
	  createPicker();
	}
	}

	// Create and render a Picker object for picking user Photos.
	function createPicker() {
		console.log(window.location.protocol + '//' + window.location.host);
	if (pickerApiLoaded && oauthToken) {
	  var picker = new google.picker.PickerBuilder().
	      addView(google.picker.ViewId.DOCS).
	      setOAuthToken(oauthToken).
	      setDeveloperKey(developerKey).
	      setOrigin(window.location.protocol + '//' + window.location.host).
	      setCallback(pickerCallback).
	      build();
	  picker.setVisible(true);
	}
	}

	// A simple callback implementation.
	function pickerCallback(files) {
		if (files[google.picker.Response.ACTION] == google.picker.Action.PICKED) {
		  var file = files[google.picker.Response.DOCUMENTS][0];
		}
		document.getElementById("drive").value="gDrive";
		document.getElementById("fileUrl").value='https://www.googleapis.com/drive/v2/files/'+file.id+'?alt=media';
        document.getElementById("fileName").innerHTML=file.name;
        document.getElementById("uploadButton").style.display="block";
        document.getElementById("oauthToken").value=oauthToken;
	}

    // Tie buttons with popup launcher
    // Note to self: include tap event for mobile support
	document.getElementById("gDrive").addEventListener('click', function() {
		onApiLoad()
	});
	console.log('gDrive ready');
}