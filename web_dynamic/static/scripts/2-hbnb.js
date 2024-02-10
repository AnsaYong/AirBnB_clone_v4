$(document).ready(function () {
    // Variable to store the IDs of checked amenities
    const checkedAmenities = {};
    const maxCharacters = 40;
  
    // Function to update the list of checked amenities in HTML
    function updateCheckedAmenities() {
        let displayText = Object.values(checkedAmenities).join(', ');

        // Truncate the text if it exceeds the maximum number of characters
        if (displayText.length > maxCharacters) {
            displayText = displayText.substring(0, maxCharacters) + '...';
        }

        $('#checked_amenities').text(displayText);
    }

    // Function to update the availability status
    function updateStatus(status) {
        const apiStatusDiv = $('#api_status');
        if (status === 'OK') {
            apiStatusDiv.addClass('available');
        } else {
            apiStatusDiv.removeClass('available');
        }
    }
  
    // Listen for changes on each input checkbox tag
    $('input[type="checkbox"]').change(function () {
        const amenityId = $(this).closest('li').data('id');
        const amenityName = $(this).closest('li').data('name');
  
        // If checkbox is checked, store Amenity ID in variable
        if ($(this).is(':checked')) {
            checkedAmenities[amenityId] = amenityName;
        } else {
            // If checkbox is unchecked, remove Amenity ID from variable
            delete checkedAmenities[amenityId];
        }
  
        // Update the h4 tag with the list of checked amenities
        updateCheckedAmenities();
    });

    // Request to get the status
    $.get('http://0.0.0.0:5001/api/v1/status/', function (data) {
        const status = data.status;
        // Update the availability status
        updateStatus(status);
    });
  });
  