const mapElement = document.getElementById("map");

if (mapElement && window.coordinates) {

    const map = L.map("map", {
    zoomControl: true,
    scrollWheelZoom: true
    }).setView(
        [window.coordinates[1], window.coordinates[0]],
        13
    );

    L.tileLayer(
        "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
        {
            attribution: "&copy; OpenStreetMap contributors"
        }
    ).addTo(map);

    const redMarker = L.AwesomeMarkers.icon({
        icon: "circle",
        prefix: "fa",
        markerColor: "red"
    });

    const marker = L.marker(
        [window.coordinates[1], window.coordinates[0]],
        {
            icon: redMarker
        }
    ).addTo(map);

    marker.bindPopup(`
        <div style="width:220px">
            <h5>${window.listingTitle}</h5>
            <h6>📍 ${window.listingLocation}</h6>
            <p>Exact Location will be provided after booking!</p>
        </div>
    `);
}