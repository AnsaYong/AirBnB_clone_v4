$(document).ready(function () {
    // Array to store the names of checked amenities
    const checkedAmenities = [];

    // Function to update the list of checked amenities in HTML
    function updateCheckedAmenities() {
        $('#checked-amenities').text(checkedAmenities.join(', '));
    }

    // Listen for changes on each input checkbox tag
    $('input[type="checkbox"]').change(function () {
        const amenityId = $(this).closest('li').data('id');
        const amenityName = $(this).closest('li').data('name');

        // If checkbox is checked, add amenity name to the array
        if ($(this).is(':checked')) {
            checkedAmenities.push(amenityName);
        } else {
            // If checkbox is unchecked, remove amenity name from the array
            const index = checkedAmenities.indexOf(amenityName);
            if (index !== -1) {
                checkedAmenities.splice(index, 1);
            }
        }

        // Update the list of checked amenities in HTML
        updateCheckedAmenities();
    });
});