$(document).ready(function () {
    // Variable to store the names of checked amenities
    const checkedAmenities = {};
    const maxCharacters = 40;

    // Function to update the list of checked amenities in HTML
    function updateCheckedAmenities() {
        let displayText = Object.values(checkedAmenities).join(', ');

        // Truncate the text if it exceeds the maximum number of characters
        if (displayText.length > maxCharacters) {
            displayText = displayText.substring(0, maxCharacters) + '...';
        }

        // Update the element with id 'checked_amenities' with the checked amenities list
        $('#checked_amenities').text(displayText);
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

        // Update the list of checked amenities in HTML
        updateCheckedAmenities();
    });

    // Request to get the status
    $.get('http://0.0.0.0:5001/api/v1/status/', function (data) {
        // Check if the status is 'OK'
        if (data.status === 'OK') {
            // Add the class 'available' to the element with id 'api_status'
            $('#api_status').addClass('available');
        } else {
            // Remove the class 'available' from the element with id 'api_status'
            $('#api_status').removeClass('available');
        }
    });

    // Function to fetch places data
    function fetchPlaces() {
        // Send an AJAX request to fetch places data
        $.ajax({
            url: 'http://0.0.0.0:5001/api/v1/places_search/',
            type: 'POST',
            headers: { 'Content-Type': 'application/json' },
            data: JSON.stringify({ amenities: Object.keys(checkedAmenities) }),
            success: function (response) {
                // Loop through the response data and append place information to the HTML
                $('SECTION.places').empty();
                for (const r of response) {
                    const article = ['<article>',
                        '<div class="title_box">',
                        `<h2>${r.name}</h2>`,
                        `<div class="price_by_night">$${r.price_by_night}</div>`,
                        '</div>',
                        '<div class="information">',
                        `<div class="max_guest">${r.max_guest} Guest(s)</div>`,
                        `<div class="number_rooms">${r.number_rooms} Bedroom(s)</div>`,
                        `<div class="number_bathrooms">${r.number_bathrooms} Bathroom(s)</div>`,
                        '</div>',
                        '<div class="description">',
                        `${r.description}`,
                        '</div>',
                        '</article>'];
                    $('SECTION.places').append(article.join(''));
                }
            },
            error: function (error) {
                console.log(error);
            }
        });
    }

    // Call the fetchPlaces function to fetch places data
    fetchPlaces();

    $( "button" ).on( "click", function() {
        fetchPlaces(); 
      });

});
