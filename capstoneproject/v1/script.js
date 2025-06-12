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