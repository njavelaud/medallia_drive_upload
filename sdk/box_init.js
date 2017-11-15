document.onreadystatechange = () => {
	if (document.readyState === 'complete') {
		// Box widget initialization
		options.box = {		
			clientId: 'n321brgjwoarbbmyhbu4ldbggd8tdqjb',
		    linkType: 'direct',
		    multiselect: false
		};
	    // Tie buttons with popup launcher
	    document.getElementById("box").addEventListener('click', function() {
		    boxSelect.launchPopup();
		});

		var boxSelect = new BoxSelect(options.box);
		
	    // Successful callback handler
	    boxSelect.success(function(files) {
	        console.log(files);
	        // Replace target of the form to include the file download url as a parameter
	        document.getElementById("drive").value="box";
	        document.getElementById("fileUrl").value=files[0].url;
	        document.getElementById("fileName").innerHTML=files[0].name;
	        document.getElementById("uploadButton").style.display="block";
	        boxSelect.closePopup();
	    });
	    // Cancel callback handler
	    boxSelect.cancel(function() {
	        console.log("The user clicked cancel or closed the popup");
	    });
	}	
};