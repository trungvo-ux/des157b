(function () {
    'use strict';
  
    mapboxgl.accessToken = 'pk.eyJ1IjoidHJ1bmd2byIsImEiOiJjbTkzZ2tpOXowZ3RlMmxwemN4OGdxMGk1In0.ysct13efrEWRGdbox_ke7w';
  
    const map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [-121.7405, 38.5449],
      zoom: 13
    });
  
    const locations = {
      'ucd-btn': {
        coords: [-121.75693138329348, 38.54020866214167],
        popup: new mapboxgl.Popup().setHTML(`
             <div style="max-width: 200px;">
              <img src="images/ucd-image.avif" alt="UC Davis" style="width: 100%; height: auto;" />
              <h2>UC Davis</h2>
              <p>A research university with a focus on sustainability and innovation.</p>
              <br>
              <p1><b>
              Longitude:
              </b>
              </p1>
             -121.75693138329348
              </br>
                 <br>
                <p1><b>
                Latitude:
                </b>
                </p1>
                38.54020866214167
              </br>
            </div>
          `)
      },
      'north-btn': {
        coords: [-121.75677678232528, 38.56409673796168],
        popup: new mapboxgl.Popup().setHTML(`
             <div style="max-width: 200px;">
              <img src="images/north-davis.jpg" alt="UC Davis" style="width: 100%; height: auto;" />
              <h2>North Davis</h2>
              <p> A residential region with greenbelts, schools, and easy access to nature trails and the North Davis Pond.</p>
              <br>
              <p1><b>
              Longitude:
              </b>
              </p1>
                -121.75677678232528
              </br>
                 <br>
                <p1><b>
                Latitude:
                </b>
                </p1>
                38.56409673796168
              </br>
            </div>
          `)
      },
      'downtown-btn': {
        coords: [-121.745, 38.543],
        popup: new mapboxgl.Popup().setHTML(`
             <div style="max-width: 200px;">
              <img src="images/downtown-davis.avif" alt="UC Davis" style="width: 100%; height: auto;" />
              <h2>Downtown Davis</h2>
              <p>A vibrant hub of local shops, cafes, farmers markets, and university culture, centered around the Davis Amtrak station.</p>
              <br>
              <p1><b>
              Longitude:
              </b>
              </p1>
              -121.72215709584212
              </br>
                 <br>
                <p1><b>
                Latitude:
                </b>
                </p1>
                38.53881784161431
              </br>
            </div>
          `)
      },
      'south-btn': {
        coords: [-121.72215709584212, 38.53881784161431],
        popup: new mapboxgl.Popup().setHTML(`
            <div style="max-width: 200px;">
              <img src="images/south-davis.jpg" alt="UC Davis" style="width: 100%; height: auto;" />
              <h2>South Davis</h2>
              <p>A quiet, suburban area with parks and family-friendly neighborhoods, known for its bike paths and proximity to I-80.</p>
              <br>
              <p1><b>
              Longitude:
              </b>
              </p1>
              -121.72215709584212
              </br>
                 <br>
                <p1><b>
                Latitude:
                </b>
                </p1>
                38.53881784161431
              </br>
            </div>
          `)
      },
      'aggie-btn': {
        coords: [-121.458172,   38.554682],
        popup: new mapboxgl.Popup().setHTML(`
            <div style="max-width: 200px;">
              <img src="images/aggie-space.png" alt="UC Davis" style="width: 100%; height: auto;" />
              <h2>Aggie Square</h2>
              <p>UC Davis’s innovation district in Sacramento focused on life sciences, tech, and community health collaboration.</p>
              <br>
              <p1><b>
              Longitude:
              </b>
              </p1>
              -121.458172
              </br>
                 <br>
                <p1><b>
                Latitude:
                </b>
                </p1>
                38.554682
              </br>
            </div>
          `)
      }
      
    };
  
    Object.entries(locations).forEach(([id, { coords, popup }]) => {
      const marker = new mapboxgl.Marker()
        .setLngLat(coords)
        .setPopup(popup)
        .addTo(map);
  
      document.getElementById(id).addEventListener('click', () => {
        map.flyTo({
          center: coords,
          zoom: 15,
          speed: 1.2
        });
  
        popup.addTo(map);
      });
    });
  })();