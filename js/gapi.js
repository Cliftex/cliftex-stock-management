// Google API initialization
function initGoogleAPI() {
    gapi.load('client:auth2', function() {
        gapi.client.init({
            apiKey: API_KEY,
            clientId: CLIENT_ID,
            discoveryDocs: ["https://sheets.googleapis.com/$discovery/rest?version=v4"],
            scope: "https://www.googleapis.com/auth/spreadsheets"
        }).then(function() {
            console.log('Google API initialized');
        }, function(error) {
            console.error('Error initializing Google API:', error);
        });
    });
}

// Load the Google API client library
(function() {
    const script = document.createElement('script');
    script.src = 'https://apis.google.com/js/api.js';
    script.onload = initGoogleAPI;
    document.body.appendChild(script);
})();
