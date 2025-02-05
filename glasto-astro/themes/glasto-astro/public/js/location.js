async function fetchLocation(event) {
    event.preventDefault();
    const input = document.getElementById('locationInput').value.trim();
    const resultsDiv = document.getElementById('results');
    const errorDiv = document.getElementById('error');

    if (!input) {
        errorDiv.textContent = "Please enter a location.";
        errorDiv.style.display = "block";
        resultsDiv.style.display = "none";
        return;
    }

    try {
        const response = await fetch(
            `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(input)}&key=YOUR_REAL_API_KEY`
        );

        if (!response.ok) throw new Error("API request failed");

        const data = await response.json();

        if (data.results.length > 0) {
            const { geometry, components } = data.results[0];

            document.getElementById('lat').textContent = geometry.lat;
            document.getElementById('lng').textContent = geometry.lng;
            document.getElementById('city').textContent = components.city || components.town || 'N/A';
            document.getElementById('state').textContent = components.state || 'N/A';
            document.getElementById('country').textContent = components.country || 'N/A';
            
            resultsDiv.style.display = "block";
            errorDiv.style.display = "none";
        } else {
            errorDiv.textContent = 'Location not found';
            errorDiv.style.display = "block";
            resultsDiv.style.display = "none";
        }
    } catch (err) {
        errorDiv.textContent = 'Error fetching location data';
        errorDiv.style.display = "block";
        resultsDiv.style.display = "none";
    }
}

// Expose function to global scope
window.fetchLocation = fetchLocation;
