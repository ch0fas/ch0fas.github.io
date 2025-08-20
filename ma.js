let albumData = [];

// Loading CSV
fetch('assets/data/albums.csv')
    .then(response => response.text())
    .then(csvText => {
        const results = Papa.parse(csvText, { header: true});
        albumData = results.data;
        applyFilters();
    })

// Filtering in real time
const inputs = ['nameFilter','artistFilter','dayFilter','monthFilter','yearFilter','albumNumber','releaseFilter']