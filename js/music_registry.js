let albumData = [];

// Loading CSV
fetch("../assets/data/albums.csv")
  .then((response) => response.text())
  .then((csvText) => {
    const results = Papa.parse(csvText, { header: true });
    albumData = results.data.map((row) => {
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
const inputs = [
  "name_filter",
  "artist_filter",
  "listening_day_filter",
  "date_filter",
  "month_date_filter",
  "year_date_filter",
  "num_filter",
  "year_release_filter",
];

inputs.forEach((id) => {
  document.getElementById(id).addEventListener("input", applyFilters);
});

// Filters
function applyFilters() {
  const user_album = document.getElementById("name_filter").value.trim();
  const user_artist = document.getElementById("artist_filter").value.trim();
  const user_week = parseInt(
    document.getElementById("listening_day_filter").value,
  );
  const user_day = parseInt(document.getElementById("date_filter").value);
  const user_month = parseInt(
    document.getElementById("month_date_filter").value,
  );
  const user_year = parseInt(document.getElementById("year_date_filter").value);
  const user_num = parseInt(document.getElementById("num_filter").value);
  const user_year_release = parseInt(
    document.getElementById("year_release_filter").value,
  );

  const filtered = albumData.filter((row) => {
    const date = row.listenDate;
    return (
      (!user_album ||
        row.Album_Name.toLowerCase().includes(user_album.toLowerCase())) &&
      (!user_artist ||
        row.Artist_Group.toLowerCase().includes(user_artist.toLowerCase())) &&
      (isNaN(user_week) || (date && date.getDay() == user_week)) &&
      (isNaN(user_day) || (date && date.getDate() === user_day)) &&
      (isNaN(user_month) || (date && date.getMonth() + 1 === user_month)) &&
      (isNaN(user_year) || (date && date.getFullYear() === user_year)) &&
      (isNaN(user_num) || parseInt(row.Album_Number) === user_num) &&
      (isNaN(user_year_release) ||
        parseInt(row.Year_Of_Release) === user_year_release)
    );
  });

  displayResults(filtered);
}

// To display the table with the results
function displayResults(data) {
  const tbody = document.querySelector("#albums_table tbody");
  tbody.innerHTML = "";

  data.forEach((row) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
        <td>${row.Album_Name}</td>
        <td>${row.Artist_Group}</td>
        <td>${row.listenDate ? row.listenDate.toLocaleDateString("en-us", { weekday: "short", day: "numeric", month: "short", year: "numeric" }) : ""}</td>
        <td>${row.Album_Number}</td>
        <td>${row.Year_Of_Release}</td>
        `;
    tbody.appendChild(tr);
  });

  document.getElementById("amnt").textContent =
    `Albums: ${data.length} / ${albumData.length}`;
}
