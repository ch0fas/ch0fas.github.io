let albumData = [];

// Loading CSV
fetch('assets/data/albums.csv')
    .then(response => response.text())
    .then(csvText => {
        const results = Papa.parse(csvText, { header: true});
        albumData = results.data.map(row => {
            if (row.Listening_Date) {
                row.listenDate = new Date(row.Listening_Date);
            } else {
                row.listenDate = null;
            }
            return row;
        });
        applyFilters();
    });


// Filtering in real time
const inputs = ['nameFilter','artistFilter','weekFilter','dayFilter','monthFilter','yearFilter','albumNumber','releaseFilter']

inputs.forEach(id => {
    document.getElementById(id).addEventListener('input', applyFilters);
});

// Filters
function applyFilters() {
    const user_album = document.getElementById('nameFilter').value.trim();
    const user_artist = document.getElementById('artistFilter').value.trim();
    const user_week = parseInt(document.getElementById('weekFilter').value);
    const user_day = parseInt(document.getElementById('dayFilter').value);
    const user_month = parseInt(document.getElementById('monthFilter').value);
    const user_year = parseInt(document.getElementById('yearFilter').value);
    const user_num = parseInt(document.getElementById('albumNumber').value);
    const user_year_release = parseInt(document.getElementById('releaseFilter').value);

    const filtered = albumData.filter(row => {
        const date = row.listenDate;
        return (!user_album || row.Album_Name.toLowerCase().includes(user_album.toLowerCase()))
            && (!user_artist || row.Artist_Group.toLowerCase().includes(user_artist.toLowerCase()))
            && (isNaN(user_week) || (date && date.getDay() == user_week))
            && (isNaN(user_day) || (date && date.getDate() === user_day))
            && (isNaN(user_month) || (date && date.getMonth() + 1 === user_month))
            && (isNaN(user_year) || (date && date.getFullYear() === user_year))
            && (isNaN(user_num) || parseInt(row.Album_Number) === user_num)
            && (isNaN(user_year_release) || parseInt(row.Year_Of_Release) === user_year_release)
    });

    displayResults(filtered);
}

function displayResults(data) {
    const tbody = document.querySelector('#albumsTable tbody');
    tbody.innerHTML = '';

    data.forEach(row => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
        <td>${row.Album_Name}</td>
        <td>${row.Artist_Group}</td>
        <td>${row.listenDate ? row.listenDate.toLocaleDateString("es-mx" , {weekday: 'short', day:'numeric', month: 'short', year:'numeric'}) : ''}</td>
        <td>${row.Album_Number}</td>
        <td>${row.Year_Of_Release}</td>
        `;
        tbody.appendChild(tr);
    });

    document.getElementById('amnt').textContent = `Rows: ${data.length} / ${albumData.length}`;
}