addEventListener('message', function(event) {
	this.postMessage("Orders received: " + event.data + ".<br>Roger that.");
}, false);
