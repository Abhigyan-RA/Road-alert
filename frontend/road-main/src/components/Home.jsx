import React, { useState, useRef } from 'react';
import { MapContainer, Marker, TileLayer, FeatureGroup } from "react-leaflet";
import { EditControl } from "react-leaflet-draw";
import "leaflet/dist/leaflet.css";
import "leaflet-draw/dist/leaflet.draw.css";
import L from "leaflet";
import { IoImageOutline } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';
import '../index.css';
import img4 from '../../public/image 4.png';
import './Home.css';

function Home() {
  const [center] = useState({ lat: 24.084622, lng: 54.248357 });
  const [selectedFile, setSelectedFile] = useState(null);
  const ZOOM_LEVEL = 9;
  const mapRef = useRef();
  const [fileName, setFileName] = useState('No file chosen');
  const [polygonCoords, setPolygonCoords] = useState([]); // State for storing lat/lngs
  const navigate = useNavigate(); // For navigation

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFileName(file.name); // Update the state with the selected file's name
      setSelectedFile(file);
    }
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedFile) {
      console.log("Selected file:", selectedFile);
      navigate('/dashboard'); // Navigate to dashboard page after form submission
    } else {
      alert("Please upload a satellite image.");
    }
  };

  // Handle when a polygon shape is created
  const _onCreate = (e) => {
    const { layerType, layer } = e;
    if (layerType === "polygon") {
      const { _latlngs } = layer; // Get the array of lat/lngs
      const latLngs = _latlngs[0].map((latlng) => ({
        lat: latlng.lat,
        lng: latlng.lng,
      }));
      console.log("Polygon created:", latLngs);
      setPolygonCoords(latLngs); // Save the coordinates to state
    }
  };

  const _onEdit = (e) => {
    console.log("Edited shapes:", e);
  };

  const _onDelete = (e) => {
    console.log("Deleted shapes:", e);
    setPolygonCoords([]); // Clear coordinates when a shape is deleted
  };

  const markerIcon = new L.icon({
    iconAnchor: [17, 46],
    popupAnchor: [3, -46],
    shadowSize: [41, 41],
  });

  return (
    <div className='bg-[#f9f4f2] space-y-10'>
      {/* Hero Section */}
      <div className="h-screen w-full flex justify-between items-center  px-20">
        <div className="text-center w-1/2">
          <h1 className="text-5xl font-bold text-text text-left leading-normal italic mb-8">
            WHERE <br /> EXPLORATION <br /> KNOWS NO <br /> BOUNDS
          </h1>
          <button className="bg-[#1B75BC] text-white shadow-lg font-medium px-6 py-3  font-poppins
          rounded hover:bg-blue-600 transition duration-300">
            Explore Now
          </button>
        </div>
        <div className="flex justify-center items-center">
          <img src={img4} className="w-[500px] h-[500px] rounded-lg " alt="Exploration" />
        </div>
      </div>

      {/* About Us Section */}
      <div className="flex flex-col items-center bg-white p-8 rounded-lg shadow-lg mx-20">
        <h2 className="text-3xl font-bold text-[#A87B2B] mb-4">About Us</h2>
        {/* Mission Statement */}
        <p className="text-gray-600 text-center max-w-xl mb-6">
          At Solar Potential, we are driven by the vision to revolutionize energy generation through the use of cutting-edge technology. Our mission is to empower individuals, businesses, and governments to make informed decisions about solar energy investments.
        </p>
        
      </div>

      {/* Select Area Section */}
      <div className="flex flex-col items-center mt-10">
        <h2 className="text-3xl font-bold text-[#A87B2B]">Select Area</h2>
        <p className="text-sm text-[#A87B2B]">
          SELECT AN AREA ON THE MAP TO ESTIMATE THE NUMBER OF Roads IN THE AREA
        </p>
      </div>

      {/* Map Section */}
      <div className="w-[800px] h-[350px] top-24 mx-auto border-[#A87B2B] border-8">
        <MapContainer
          center={[center.lat, center.lng]}
          zoom={ZOOM_LEVEL}
          ref={mapRef}
          className="w-full h-full"
        >
          <TileLayer
            url="https://api.maptiler.com/maps/basic-v2/256/{z}/{x}/{y}.png?key=WiYckNfYMwWkYDvE0AIh"
            attribution='&copy; <a href="https://www.maptiler.com/copyright">MapTiler</a> & <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          <Marker position={[24.6223, 77.48357]} />
          <FeatureGroup>
            <EditControl
              position="topright"
              onCreated={_onCreate}
              onDeleted={_onDelete}
              onEdited={_onEdit}
              draw={{
                rectangle: false,
                circle: false,
                circlemarker: false,
                marker: false,
                polyline: false,
              }}
            />
          </FeatureGroup>
        </MapContainer>
      </div>

      {/* Display Coordinates */}
      {polygonCoords.length > 0 && (
        <div className="text-center mt-4">
          <h3 className="text-xl font-semibold">Polygon Coordinates:</h3>
          <ul>
            {polygonCoords.map((coord, index) => (
              <li key={index}>
                Latitude: {coord.lat}, Longitude: {coord.lng}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* File Upload Form */}
      <div className="flex flex-col items-center space-y-4 mt-8">
        <label
          htmlFor="file-upload"
          className="cursor-pointer inline-flex items-center px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm text-sm font-medium hover:bg-blue-100"
        >
          <IoImageOutline className="w-5 h-5 mr-2" />
          <span className="text-[12px] text-gray-700">{fileName}</span>
        </label>

        <input
          id="file-upload"
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFileChange}
        />
        <button
          onClick={handleSubmit}
          className="bg-[#1B75BC] text-white shadow-lg font-medium px-6 py-3  font-poppins
          rounded hover:bg-blue-600 transition duration-300"
        >
          Submit
        </button>
      </div>

      {/* Contact Us Section */}
      <div className="flex flex-col items-center bg-white p-8 rounded-lg shadow-lg mx-20 mt-10">
        <h2 className="text-3xl font-bold text-[#A87B2B] mb-4">Contact Us</h2>
        <p className="text-gray-600 text-center">
          Have questions or want to learn more? Reach out to us at:
        </p>
        <p className="text-gray-600 mt-4 font-semibold">
          Email: support@solarpotential.com
        </p>
        <p className="text-gray-600 mt-2 font-semibold">
          Phone: +1-800-123-4567
        </p>
      </div>
    </div>
  );
}

export default Home;
