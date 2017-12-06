function oneDriveInit(options){
	options.oneDrive = {
		//thNHWQF2{?[vknnvFR6298= app password
		clientId: "7b87525d-393b-4524-adb1-67e9eaa51203",
		action: "download",
		multiSelect: false,
		advanced: {},
		success: function(files) {
			document.getElementById("drive").value="oneDrive";
			document.getElementById("fileUrl").value=files.value[0]['@microsoft.graph.downloadUrl'];
	        document.getElementById("fileName").innerHTML=files.value[0].name;
	        document.getElementById("uploadButton").style.display="block";
		},
		cancel: function() { /* cancel handler */ },
		error: function(e) { /* error handler */ }
	};

    document.getElementById("oneDrive").addEventListener('click', function() {
    	OneDrive.open(options.oneDrive);
	});
	console.log('oneDrive ready');
}