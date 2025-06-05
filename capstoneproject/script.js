
mapboxgl.accessToken = 'pk.eyJ1IjoidHJ1bmd2byIsImEiOiJjbTkzZ2tpOXowZ3RlMmxwemN4OGdxMGk1In0.ysct13efrEWRGdbox_ke7w';

const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/satellite-streets-v12',
    projection: 'globe',
    zoom: 1.5,
    center: [0, 20]
});

map.on('style.load', () => {
    map.setFog({});
});

let allMarkers = [];
let allData = [];

const sidebar = document.getElementById('sidebar');
const userList = document.getElementById('user-list');
const searchInput = document.getElementById('global-search');

function formatTimeAgo(timeStr) {
    const now = new Date();
    const past = new Date(timeStr);
    const diffMs = now - past;
    const minutes = Math.floor(diffMs / 60000);
    if (minutes < 1) return "Just now";
    if (minutes === 1) return "1 min ago";
    if (minutes < 60) return `${minutes} min ago`;
    const hours = Math.floor(minutes / 60);
    return `${hours} hour${hours > 1 ? 's' : ''} ago`;
}

function renderList(filteredData) {
    userList.innerHTML = '';
    allMarkers.forEach(obj => obj.marker.remove());
    allMarkers = [];

    filteredData.forEach((feature, index) => {
        const { name, address, social_rating, crime_record, last_seen, mugshot_url, employment, connections } = feature.properties;
        const coords = feature.geometry.coordinates;

        const riskLevel = social_rating >= 90 ? "high" : social_rating >= 75 ? "medium" : "low";
        const markerColor = social_rating >= 90 ? '#4CAF50' : social_rating >= 75 ? '#FFC107' : '#F44336';

        const popupHTML = `
        <div style="
            font-family: 'Helvetica Neue', sans-serif;
            max-width: 300px;
            background: white;
            border-radius: 12px;
            padding: 8px;
        ">
            <div style="display: flex; gap: 12px;">
                <div style="flex-shrink: 0; width: 48px; height: 48px; border-radius: 50%; background-color: #ddd; background-image: url('${mugshot_url}'); background-size: cover;"></div>
                <div>
                    <strong style="font-size: 16px;">${name}</strong><br>
                    <span style="color: #888; font-size: 13px;">21 yrs old</span>
                </div>
            </div>
            <div style="margin-top: 12px;">
                <div style="display:inline-block; background:#eee; padding:4px 8px; border-radius:6px; margin-bottom:4px;">College Student at UC Davis</div><br/>
                <div style="display:inline-block; background:#eee; padding:4px 8px; border-radius:6px;">Graduating in 1 week</div>
            </div>
            <div style="margin-top: 12px; font-size: 13px;">
                <strong>Address</strong><br>${address}
            </div>
            <div style="margin-top: 10px; font-size: 13px;">
                <strong>Convictions</strong><br>2025 – ${crime_record}
            </div>
            <div style="margin-top: 10px; font-size: 13px;">
                <strong>Employment</strong><br>2023 – ${employment}
            </div>
        </div>
        `;

        const popup = new mapboxgl.Popup({ offset: 25 })
            .setLngLat(coords)
            .setHTML(popupHTML);

        const marker = new mapboxgl.Marker({ color: markerColor })
            .setLngLat(coords)
            .setPopup(popup)
            .addTo(map);

        allMarkers.push({ marker, coords, name, riskLevel });

        const li = document.createElement('li');
        li.classList.add('card', riskLevel);
        li.innerHTML = `
            <div class="card-content">
                <div class="avatar" style="background-image: url('${mugshot_url}')"></div>
                <div class="user-text">
                    <strong>${name}</strong>
                    <small>${address} - ${formatTimeAgo(last_seen)}</small>
                </div>
            </div>
            <div class="rating" style="text-align: right;">
                <div class="severity-label" style="font-size: 12px; font-weight: bold; color: #555; margin-bottom: 4px;">
                </div>
                Rating:
                <div class="rating-circle">${social_rating}</div>
            </div>
        `;
        
    li.addEventListener("click", () => {
        document.querySelectorAll('.card').forEach(card => card.classList.remove('active'));
        li.classList.add('active');
    
            map.flyTo({ center: coords, zoom: 15, speed: 0.8 });
            setTimeout(() => popup.addTo(map), 800);
        });
        userList.appendChild(li);
    });
}

fetch('davis_people_profiles_randomized.geojson')    .then(response => response.json())
    .then(data => {
        allData = data.features;

        const tabs = document.querySelectorAll('.tab');
        tabs.forEach(tab => {
            tab.addEventListener('click', () => {
                const level = tab.dataset.level;
                tabs.forEach(t => t.classList.remove('active'));
                tab.classList.add('active');

                if (level === 'all') {
                    renderList(allData);
                } else {
                    renderList(allData.filter(f => {
                        const r = f.properties.social_rating;
                        return (level === 'high' && r >= 90) ||
                               (level === 'medium' && r >= 75 && r < 90) ||
                               (level === 'low' && r < 75);
                    }));
                }
            });
        });

        searchInput.addEventListener("input", (e) => {
            const keyword = e.target.value.toLowerCase();
            if (!sidebar.classList.contains('hidden')) {
                const matches = allData.filter(f =>
                    f.properties.name.toLowerCase().includes(keyword) ||
                    f.properties.address.toLowerCase().includes(keyword)
                );
                renderList(matches);
                if (matches.length > 0) {
                    map.flyTo({ center: matches[0].geometry.coordinates, zoom: 15 });
                }
            } else {
                sidebar.classList.remove("hidden");

                const matches = allData.filter(f =>
                    f.properties.name.toLowerCase().includes(keyword) ||
                    f.properties.address.toLowerCase().includes(keyword)
                );
                renderList(matches);

                if (matches.length > 0) {
                    map.flyTo({ center: matches[0].geometry.coordinates, zoom: 15 });
                } else {
                    fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${keyword}.json?access_token=${mapboxgl.accessToken}`)
                        .then(res => res.json())
                        .then(geo => {
                            if (geo.features.length > 0) {
                                map.flyTo({
                                    center: geo.features[0].center,
                                    zoom: 10
                                });
                            }
                        });
                }
            }
        });
    });
