// Google Sheets configuration
const SPREADSHEET_ID = '1h-iTise-2a9RYaw8YxHe27Xa1s0h2Tt9MIeiBc5UmtE';
const STOCK_SHEET_NAME = 'Stock';
const ISSUES_SHEET_NAME = 'Issues';
const API_KEY = 'AIzaSyA294Gs0ckJL6YrQErxF4Bsde2OKb2-ePE';
const CLIENT_ID = '48556472789-ika335ok84gftbn3cnqvr8f04vgv6qjf.apps.googleusercontent.com';
const CLIENT_SECRET = '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';

// Load stock data from Google Sheets
function loadStockFromGoogleSheets() {
    fetch(`https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/${STOCK_SHEET_NAME}?key=${API_KEY}`)
        .then(response => response.json())
        .then(data => {
            if (data.values && data.values.length > 1) {
                const headers = data.values[0];
                const rows = data.values.slice(1);
                
                const stockData = rows.map(row => {
                    const item = {};
                    headers.forEach((header, index) => {
                        item[header.toLowerCase().replace(' ', '')] = row[index] || '';
                    });
                    return item;
                });
                
                localStorage.setItem('stockData', JSON.stringify(stockData));
                renderStockTable(stockData);
            }
        })
        .catch(error => {
            console.error('Error loading stock data:', error);
            alert('ERROR LOADING STOCK DATA FROM GOOGLE SHEETS');
        });
}

// Save stock data to Google Sheets
function saveStockToGoogleSheets(data) {
    const values = [
        ['id', 'itemName', 'itemType', 'model', 'quantity', 'timestamp'],
        ...data.map(item => [item.id, item.itemName, item.itemType, item.model, item.quantity, item.timestamp])
    ];
    
    fetch(`https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/${STOCK_SHEET_NAME}!A1:Z1000?valueInputOption=RAW&key=${API_KEY}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            values: values
        })
    })
    .then(response => response.json())
    .then(data => {
        console.log('Stock data saved to Google Sheets');
    })
    .catch(error => {
        console.error('Error saving stock data:', error);
        alert('ERROR SAVING STOCK DATA TO GOOGLE SHEETS');
    });
}
