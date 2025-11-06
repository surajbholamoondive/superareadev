const processNearbyObject = (nearby) => {
    const nearbyPlaces = [];
    Object.keys(nearby).forEach((amenity) => {
        if (nearby[amenity].length === 0) {
            return;
        }
        const nearestElement = nearby[amenity].reduce((nearest, element) => {
            if (!nearest || parseFloat(element.distance) < parseFloat(nearest.distance)) {
                return element;
            }
            return nearest;
        }, null);
        if (nearestElement) {
            nearbyPlaces.push({
                [amenity]: nearestElement.distance
            });
        }
    });
    return nearbyPlaces;
}
export default processNearbyObject;
