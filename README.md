# Location Detection

Simple web application to retrieve a user's location

## 📌 Overview

This project provides a web-based solution to detect a user's location with multiple fallback methods for accuracy.

It offers:

- GPS-based location detection (most accurate)

- Network-based location detection

- IP-based location fallback

- Options to view the detected location on Google Maps or OpenStreetMap

## 🛠️ Installation

No installation required! Simply:

1. Clone this repository:

    ```bash
    git clone https://github.com/evans-nyang/get-location.git
    ```

2. Open the `index.html` file in your web browser.
<!-- 3. Allow location access when prompted by your browser.
4. Click the "Get Location" button to retrieve your location.
5. View your location on the map or copy the coordinates.
6. You can also view the location on Google Maps or OpenStreetMap by clicking the respective buttons.
7. The application will automatically fall back to network-based or IP-based location detection if GPS is unavailable.
8. The application will also display an error message if location detection fails. -->

## 🌟 Features

- Multi-source location detection (GPS > Network > IP)

- Accuracy indicators showing estimated precision

- Reverse geocoding to display human-readable addresses

- Map integration with Google Maps and OpenStreetMap

- Responsive design works on desktop and mobile

- Privacy-focused - all processing happens client-side

## 🖥️ Usage

1. Click the "Get My Location" button

2. Wait while the system detects your location

3. View your:

    - Coordinates (latitude/longitude)

    - Estimated accuracy

    - Detection method used

    - Formatted address (when available)

4. Click map links to view your location on:

    - Google Maps

    - OpenStreetMap

## 🛡️ Privacy Policy

We take your privacy seriously. This application does not collect, store, or share any personal information. Your location data is processed entirely in your browser and is not sent to any server.
We do not track or log any user activity. The only data we use is the location information necessary to provide the service you requested.
We do not use cookies or any other tracking technologies. Your location data is not shared with any third parties.
We do not use any third-party libraries or services that may collect your data. The only external service we use is OpenStreetMap Nominatim for geocoding, which is open-source and does not require any personal information.

This application:

- Only accesses your location when you explicitly click the button

- Processes all location data in your browser

- Doesn't store your location information on any server

- Uses open-source geocoding services (OpenStreetMap Nominatim)

## 🤝 Contributing

We welcome contributions! Please:

1. Fork the repository

2. Create your feature branch (`git checkout -b feature/AmazingFeature`)

3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)

4. Push to the branch (`git push origin feature/AmazingFeature`)

5. Open a Pull Request

## 📜 License

Distributed under the MIT License. See [LICENSE](./LICENSE) for more information.

## 🙏 Acknowledgments

- [OpenStreetMap](https://www.openstreetmap.org/) for map data
- [Google Maps](https://maps.google.com/) for map services
- [Leaflet](https://leafletjs.com/) for map rendering
- [Geolocation API](https://developer.mozilla.org/en-US/docs/Web/API/Geolocation_API) for GPS and network location detection
- [ipapi.co](https://ipapi.co/) for IP-based location detection
