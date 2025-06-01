// Load issues data from Google Sheets
function loadIssuesFromGoogleSheets() {
    fetch(`https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/${ISSUES_SHEET_NAME}?key=${API_KEY}`)
        .then(response => response.json())
        .then(data => {
            if (data.values && data.values.length > 1) {
                const headers = data.values[0];
                const rows = data.values.slice(1);
                
                const issuesData = rows.map(row => {
                    const item = {};
                    headers.forEach((header, index) => {
                        item[header.toLowerCase().replace(' ', '')] = row[index] || '';
                    });
                    return item;
                });
                
                localStorage.setItem('issuesData', JSON.stringify(issuesData));
                renderIssuesTable(issuesData);
            }
        })
        .catch(error => {
            console.error('Error loading issues data:', error);
            alert('ERROR LOADING ISSUES DATA FROM GOOGLE SHEETS');
        });
}

// Save issues data to Google Sheets
function saveIssuesToGoogleSheets(data) {
    const values = [
        ['id', 'date', 'itemType', 'itemName', 'model', 'quantity', 'department', 'userName', 'timestamp'],
        ...data.map(item => [
            item.id, 
            item.date, 
            item.itemType, 
            item.itemName, 
            item.model, 
            item.quantity, 
            item.department, 
            item.userName, 
            item.timestamp
        ])
    ];
    
    fetch(`https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/${ISSUES_SHEET_NAME}!A1:Z1000?valueInputOption=RAW&key=${API_KEY}`, {
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
        console.log('Issues data saved to Google Sheets');
    })
    .catch(error => {
        console.error('Error saving issues data:', error);
        alert('ERROR SAVING ISSUES DATA TO GOOGLE SHEETS');
    });
}

// Clean up old issues data (older than 1 year)
function cleanupOldIssuesData() {
    const issuesData = JSON.parse(localStorage.getItem('issuesData') || '[]');
    const oneYearAgo = new Date();
    oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);
    
    const filteredData = issuesData.filter(item => {
        const itemDate = new Date(item.date);
        return itemDate >= oneYearAgo;
    });
    
    if (filteredData.length !== issuesData.length) {
        localStorage.setItem('issuesData', JSON.stringify(filteredData));
        saveIssuesToGoogleSheets(filteredData);
    }
}

// Run cleanup on startup
document.addEventListener('DOMContentLoaded', function() {
    cleanupOldIssuesData();
});
