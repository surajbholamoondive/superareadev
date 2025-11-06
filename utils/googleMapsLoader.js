// Singleton for Google Maps loader
let googleMapsLoader = null;
let geocoderInstance = null;

const initializeGoogleMaps = async () => {
    if (googleMapsLoader) {
        return geocoderInstance;
    }

    try {
        const { Loader } = await import('@googlemaps/js-api-loader');
        googleMapsLoader = new Loader({
            apiKey: process.env.NEXT_PUBLIC_apiGooglePlace,
            libraries: ['places'],
        });

        await googleMapsLoader.load();
        geocoderInstance = new google.maps.Geocoder();
        return geocoderInstance;
    } catch (error) {
        console.error('Failed to initialize Google Maps:', error);
        return null;
    }
};

export default initializeGoogleMaps; 