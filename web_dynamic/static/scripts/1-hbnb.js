$(document).ready(function () {
  // Variable to store the IDs of checked amenities
  const checkedAmenities = {};

  // Function to update the h4 tag with the list of checked amenities
  function updateAmenities() {
      const amenitiesList = Object.values(checkedAmenities).join(', ');
      $('.popover h4').text(amenitiesList);
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
});
