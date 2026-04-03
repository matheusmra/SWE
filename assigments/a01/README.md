# GYM Finder — WebGIS Prototype (A01)

An interactive WebGIS application designed to help university students locate nearby gyms. This project was developed as the first assignment (A01) for the Software Engineering II (SWE-II) course.

## 🎯 Project Objective
Demonstrate the implementation of a professional-grade Geographic Information System (GIS) on the web using modern JavaScript libraries and spatial analysis tools.

## 🛠️ Main Features
- **Map Interaction**: Full support for Zoom and Pan across two base map types (Streets via OpenStreetMap and Satellite via Esri).
- **Geolocation**: Real-time identification of user position ("My Location").
- **Layer Management**: Support for importing multiple spatial data formats, including:
  - **GeoJSON / JSON**
  - **KML** (Google Earth)
  - **GPX** (GPS Exchange)
  - **Shapefile** (via `.zip` or `.shp`)
- **Proximity Analysis**: Use of **Turf.js** to calculate distances and filter features within a custom radius (e.g., 500m) from the user's location.
- **Dynamic UI**: Sidebar for layer control, proximity filtering, and result listing with automatic map centering.

## 🚀 Technologies Used
- **HTML5 / CSS3**: Responsive layout and modern styling.
- **Leaflet.js**: Core mapping engine.
- **Turf.js**: Advanced spatial analysis.
- **Omnivore**: Parser for KML/GPX formats.
- **Shpjs**: Support for Shapefiles.

## 📋 How to Use
1. Open `index.html` in any modern web browser.
2. Define your position by clicking on the map or using the **"My Location"** button.
3. Import a layer (e.g., a `.geojson` file containing gym locations).
4. Use the **Proximity Filter** to find gyms within a specific radius.


