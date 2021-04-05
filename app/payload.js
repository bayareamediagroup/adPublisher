/* this script will be served from the bayareamedia.net 
 * this is the entry point for the third-party appliction.
 * */
var payload = (function(window, undefined) {
	/* private */
	const apiKey = 'z5DpKECxcT9bjrURVyaR0qrWT94M5xgcxed12zU0rdc';

	const _helper = function (param) {
		return param[1];
	};

	const _getCity = function(param) {
		const city = _helper(param.split('&city='));
		return city[0]; 
	};

	const _getAll = function(param) {
		const all = _helper(param.split('&all='));
		return all[0]; 
	};

	const _getIcon = function(param) {
		const icon = _helper(param.split('&icon='));
		return icon[0]; 
	};

	const _getTemp = function(param) {
		const temp = _helper(param.split('&temp='));
		return temp[0]; 
	};

	/* return the zipcode */
	const _getZip = function (query) {
		const param = _helper(query.split('?'));
		const zip = _helper(param.split('='));
		return zip;
	};

	/* return the URL string */
	const _getURL = function() {
		let el;
		let scripts = document.getElementsByTagName('script');

		for (let i = 0; i < scripts.length; i++) {

			el = scripts[i].src;

			if((el.search("payload")) > 0) {
				console.log("payload: ", scripts[i].src);
				return scripts[i].src;
			}
		}

		return null;
	};

	const _addElement = function (data) {
		const icon_size = 25;
		const windowWidth = window.innerWidth;

		var img = document.createElement('img');
		img.id = 'icon';

		var span1 = document.createElement('span');
		span1.id = 'weather';
		span1.style = 'cursor: pointer; font-size: 15px;';

		var span2 = document.createElement('span');
		span2.id = 'location';
		span2.style = 'cursor: pointer; font-size: 15px';

		document.getElementById('wx').appendChild(span2);
		document.getElementById('wx').appendChild(img);
		document.getElementById('wx').appendChild(span1);

		var icon = document.getElementById('icon');
		var wx = document.getElementById('weather');
		var loc = document.getElementById('location');

		/* if city is 1, then show widget */
		if(_getCity(_getURL()) == 1) {

			if ((windowWidth > 800) && (windowWidth < 1300)) {
				wx.innerHTML = " " + data.observations.location[0].observation[0].temperature.slice(0, 2) + '&deg;';
			} else if (windowWidth > 1300) {
				wx.innerHTML = " " + data.observations.location[0].observation[0].temperature.slice(0, 2) + '&deg; F';
				loc.innerHTML = data.observations.location[0].city + ", " + data.observations.location[0].state.slice(0, 2) + "<br/>";
			} else { }
		} else if(_getAll(_getURL()) == 1) {

			icon.src = data.observations.location[0].observation[0].iconLink.concat("?apiKey=", apiKey);
			icon.height = icon_size;
			icon.width = icon_size;
			icon.style = 'cursor: pointer';

			if((windowWidth >= 300) && (windowWidth <= 400)) {
				wx.innerHTML = " " + data.observations.location[0].observation[0].temperature.slice(0, 2) + '&deg;';
			} else if ((windowWidth > 800) && (windowWidth < 1300)) {
				wx.innerHTML = " " + data.observations.location[0].observation[0].temperature.slice(0, 2) + '&deg;';
				loc.innerHTML = data.observations.location[0].city + "<br/>";
			} else if (windowWidth > 1300) {
				wx.innerHTML = " " + data.observations.location[0].observation[0].temperature.slice(0, 2) + '&deg; F';
				loc.innerHTML = data.observations.location[0].city + ", " + data.observations.location[0].state.slice(0, 2) + "<br/>";
			} else { }
		} else if(_getIcon(_getURL()) == 1) {
			icon.src = data.observations.location[0].observation[0].iconLink.concat("?apiKey=", apiKey);
			icon.height = icon_size;
			icon.width = icon_size;
			icon.style = 'cursor: pointer';
		} else if(_getTemp(_getURL()) == 1) {
			if ((windowWidth > 800) && (windowWidth < 1300)) {
				wx.innerHTML = " " + data.observations.location[0].observation[0].temperature.slice(0, 2) + '&deg;';
			} else if (windowWidth > 1300) {
				wx.innerHTML = " " + data.observations.location[0].observation[0].temperature.slice(0, 2) + '&deg; F';
				//		loc.innerHTML = data.observations.location[0].city + ", " + data.observations.location[0].state.slice(0, 2) + "<br/>";
			} else { }
		}
	};

	const _getAPI = function() {
		const baseURL = 'https://weather.ls.hereapi.com/weather/1.0/report.json?';
		const product = 'observation';
		const apiKey = 'z5DpKECxcT9bjrURVyaR0qrWT94M5xgcxed12zU0rdc';
		const zipcode = 94606;
		const metric = false;

		return baseURL + "product=" + product + "&oneobservation=" + true + "&apiKey=" + apiKey + "&zipcode=" + zipcode + "&metric=" + metric;
	};

	window.document.title = "Weather for: " + _getZip(_getURL());
	var a = _getCity(_getURL());
	var b = _getIcon(_getURL());
	var c = _getTemp(_getURL());
	var d = _getAll(_getURL());

	console.log("-->", a);
	console.log("-->", b);
	console.log("-->", c);
	console.log("-->", d);

	/* function loadAdditionalFiles(callback) {}
	 * function getWidgetParams() {}
	 * function getRatingData(params, callback) {}
	 * function drawWidget() {}
	 * */

	/* public */
	return {
		fetch: function() {

			let xhr = new XMLHttpRequest();

			xhr.onreadystatechange = function() {
				if(this.readyState == 4 && this.status == 200) {
					const json = _addElement(JSON.parse(this.responseText));
				}
			}

			xhr.open("get", _getAPI(), true)
			xhr.send();
		},

		loadAdditionalFiles: function(url) {
			let script = document.createElement("script"); 
			script.async = true;

			script.src = url;

			let includeScript = document.getElementsByTagName('script')[0];
			includeScript.parentNode.insertBefore(script, includeScript);
		}
	};
})(window);

let sites = new Array();
sites[0] = 'app/helper1.js';
sites[1] = 'app/helper2.js';
sites[2] = 'app/helper3.js';

for(var i = 0; i < sites.length; i++) {
	payload.loadAdditionalFiles(sites[i]);
}

payload.fetch();
