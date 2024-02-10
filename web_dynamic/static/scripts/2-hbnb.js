$(document).ready(function () {
    // Variable to store the IDs of checked amenities
    const checkedAmenities = {};
  
    // Function to update the h4 tag with the list of checked amenities
    function updateAmenities() {
        const amenitiesList = Object.values(checkedAmenities).join(', ');
        $('.popover h4').text(amenitiesList);
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
        updateAmenities();
    });

    // Request to get the status
    $.get('http://0.0.0.0:5001/api/v1/status/', function (data) {
        const status = data.status;
        // Update the availability status
        updateStatus(status);
    });
  });
  