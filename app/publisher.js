/* Error Free Dynamic Script Tag Insertion 
 * Purpose: Create a script tag and load the payload.
 * */
(function(window) {
	const domain = '192.168.1.158';
	const port = '8080';
	const zip = 94606; 

	/* control what gets shown */
	const city = 1;
	const icon = 0;
	const temp = 0;

	const script = document.createElement('script');

	script.src = '//' + domain + ':' + port + '/app/payload.js?zipcode=' + zip + '&city=' + city + '&icon=' + icon + '&temp=' + temp;
	script.async = true;

	const includeScript = document.getElementsByTagName('script')[0];

	includeScript.parentNode.insertBefore(script, includeScript);
})(window);
