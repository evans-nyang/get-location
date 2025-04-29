class LocationService {
    constructor() {
        this.maxGpsAttempts = 3;
        this.maxNetworkAttempts = 2;
        this.currentLocation = null;
    }

    async getBestLocation() {
        // Try GPS first
        for (let i = 0; i < this.maxGpsAttempts; i++) {
            try {
                const pos = await this._getPosition(true);
                if (pos.coords.accuracy < 50) { // Very accurate
                    return await this._enhanceLocation(pos);
                }
            } catch (e) {
                console.log(`GPS attempt ${i + 1} failed`, e);
            }
        }

        // Try network-based
        for (let i = 0; i < this.maxNetworkAttempts; i++) {
            try {
                const pos = await this._getPosition(false);
                return await this._enhanceLocation(pos);
            } catch (e) {
                console.log(`Network attempt ${i + 1} failed`, e);
            }
        }

        // Final fallback to IP
        return await this._getIPLocation();
    }

    async _getPosition(highAccuracy) {
        return new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(
                resolve,
                reject,
                {
                    enableHighAccuracy: highAccuracy,
                    timeout: highAccuracy ? 10000 : 5000,
                    maximumAge: 0
                }
            );
        });
    }

    async _enhanceLocation(position) {
        // Add address information
        try {
            const address = await this._reverseGeocode(
                position.coords.latitude,
                position.coords.longitude
            );
            return {
                ...position,
                address
            };
        } catch (e) {
            console.log("Reverse geocoding failed", e);
            return position;
        }
    }

    async _reverseGeocode(lat, lng) {
        const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`
        );
        const data = await response.json();
        return data.address;
    }

    async _getIPLocation() {
        const response = await fetch('https://ipapi.co/json/');
        const data = await response.json();
        return {
            coords: {
                latitude: data.latitude,
                longitude: data.longitude,
                accuracy: 5000
            },
            source: 'IP',
            address: {
                city: data.city,
                region: data.region,
                country: data.country_name
            }
        };
    }
}

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    const locationService = new LocationService();
    const getLocationBtn = document.getElementById('getLocationBtn');
    const resultDiv = document.getElementById('result');
    const mapLinksDiv = document.getElementById('mapLinks');

    getLocationBtn.addEventListener('click', async () => {
        resultDiv.innerHTML = '<p>Detecting your location...</p>';
        mapLinksDiv.classList.add('hidden');

        try {
            const location = await locationService.getBestLocation();
            locationService.currentLocation = location;

            console.log("Best location obtained:", location);
            let addressText = '';
            if (location.address) {
                const addr = location.address;
                addressText = `
            <p><strong>Address:</strong> 
            ${addr.road ? addr.road + ', ' : ''}
            ${addr.city || addr.town || addr.village || ''}
            ${addr.state ? ', ' + addr.state : ''}
            ${addr.country ? ', ' + addr.country : ''}
            ${addr.postcode ? ' (' + addr.postcode + ')' : ''}</p>
          `;
            }

            resultDiv.innerHTML = `
          <p><strong>Coordinates:</strong> ${location.coords.latitude.toFixed(6)}, ${location.coords.longitude.toFixed(6)}</p>
          <p><strong>Accuracy:</strong> ±${Math.round(location.coords.accuracy)} meters</p>
          <p><strong>Source:</strong> ${location.source}</p>
          ${addressText}
        `;

            // Show map links
            mapLinksDiv.classList.remove('hidden');
        } catch (error) {
            console.error("Failed to get location:", error);
            resultDiv.innerHTML = `
          <p>Could not determine your location.</p>
          <p>Please ensure location services are enabled and try again.</p>
          <p>Error: ${error.message}</p>
        `;
        }
    });

    // Handle map link clicks
    document.getElementById('openGoogleMaps').addEventListener('click', (e) => {
        e.preventDefault();
        if (locationService.currentLocation) {
            const { latitude, longitude } = locationService.currentLocation.coords;
            window.open(`https://www.google.com/maps?q=${latitude},${longitude}`, '_blank');
        }
    });

    document.getElementById('openOpenStreetMap').addEventListener('click', (e) => {
        e.preventDefault();
        if (locationService.currentLocation) {
            const { latitude, longitude } = locationService.currentLocation.coords;
            window.open(`https://www.openstreetmap.org/?mlat=${latitude}&mlon=${longitude}#map=15/${latitude}/${longitude}`, '_blank');
        }
    });
});
