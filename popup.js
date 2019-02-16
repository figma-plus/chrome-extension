document.getElementById('devMode').onchange = e => {
	chrome.storage.local.set(
		{
			devMode: e.target.checked
		},
		() => {
			document.getElementById('api-docs').style.display = e.target.checked ? 'inline' : 'none';
			setTimeout(() => {
				chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
					chrome.tabs.update(tabs[0].id, { url: tabs[0].url });
				});
			}, 1000);
		}
	);
};

chrome.storage.local.get(['devMode'], function(result) {
	if (result.devMode) {
		document.getElementById('devMode').checked = result.devMode;
		document.getElementById('api-docs').style.display = 'inline';
	}
});
