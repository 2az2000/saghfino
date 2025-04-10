import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import axios from "axios";
// import "leaflet/dist/leaflet.css";

// رفع مشکل آیکون مارکر (مشکل رایج در Leaflet + React)
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
});

const MapWithGeocoding = () => {
  const [address, setAddress] = useState("");
  const [coordinates, setCoordinates] = useState(null);
  const [map, setMap] = useState(null);

  // جستجوی آدرس و تبدیل به مختصات با Nominatim
  const handleSearch = async () => {
    try {
      const response = await axios.get(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}`
      );
      if (response.data[0]) {
        const { lat, lon } = response.data[0];
        setCoordinates({ lat: parseFloat(lat), lng: parseFloat(lon) });
        
        // حرکت نقشه به مختصات جدید
        if (map) map.flyTo([lat, lon], 15);
      }
    } catch (error) {
      console.error("خطا در جستجوی آدرس:", error);
    }
  };

  return (
    <div style={{ width: "100%", height: "500px" }}>
      <div style={{ marginBottom: "20px" }}>
        <input
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="آدرس را وارد کنید (مثال: تهران، میدان آزادی)"
          style={{ width: "300px", padding: "8px" }}
        />
        <button 
          onClick={handleSearch}
          style={{ padding: "8px 16px", marginLeft: "10px" }}
        >
          جستجو روی نقشه
        </button>
      </div>

      <MapContainer
        center={[35.6892, 51.3890]} // مختصات پیش‌فرض (تهران)
        zoom={13}
        style={{ height: "100%", width: "100%" }}
        whenCreated={setMap}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        
        {coordinates && (
          <Marker position={[coordinates.lat, coordinates.lng]}>
            <Popup>{address || "موقعیت یافت شده"}</Popup>
          </Marker>
        )}
      </MapContainer>
    </div>
  );
};

export default MapWithGeocoding;