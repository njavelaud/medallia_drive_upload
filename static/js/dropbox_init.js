function dropboxInit(options){
	// Dropbox widget initialization
	options.dropbox = {
		// Required. Called when a user selects an item in the Chooser.
	    success: function(files) {
	    	// Replace target of the form to include the file download url as a parameter
	    	document.getElementById("drive").value="dropbox";
	        document.getElementById("fileUrl").value=files[0].link;
	        document.getElementById("fileName").innerHTML=files[0].name;
	        document.getElementById("uploadButton").style.display="block";
	    },
	    // Optional. "preview" (default) is a preview link to the document for sharing,
	    // "direct" is an expiring link to download the contents of the file. For more
	    // information about link types, see Link types below.
	    linkType: "direct", // or "direct"
	    // Optional. A value of false (default) limits selection to a single file, while
	    // true enables multiple file selection.
	    multiselect: false // or true
	};

    // Tie buttons with popup launcher
    // Note to self: include tap event for mobile support
    document.getElementById("dropbox").addEventListener('click', function() {
	    Dropbox.choose(options.dropbox);
	});
	console.log('dropbox ready');
}