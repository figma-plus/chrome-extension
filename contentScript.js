fetch('https://figma-plus.github.io/figma-plus/version.json', { cache: 'no-cache' })
	.then(response => response.json())
	.then(version => {
		version = version.public;
		const css = document.createElement('link');
		css.rel = 'stylesheet';
		css.type = 'text/css';
		css.href = `https://cdn.jsdelivr.net/gh/figma-plus/figma-plus@${version}/dist/css/app.css`;
		document.head.appendChild(css);
		const vendors = document.createElement('script');
		vendors.src = `https://cdn.jsdelivr.net/gh/figma-plus/figma-plus@${version}/dist/js/chunk-vendors.js`;
		const app = document.createElement('script');
		app.src = `https://cdn.jsdelivr.net/gh/figma-plus/figma-plus@${version}/dist/js/app.js`;
		chrome.storage.local.get(['devMode'], function(result) {
			if (result.devMode) {
				const devModeScript = document.createElement('script');
				devModeScript.innerHTML = `window.pluginDevMode = true;`;
				document.head.appendChild(devModeScript);
			}
			document.head.appendChild(vendors);
			document.head.appendChild(app);
		});
	});
