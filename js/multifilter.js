$(document).ready(function() {
  var $products = $('.grid-products'),
      $filters = $("#filters input[type='checkbox']"),
      product_filter = new Multifilter($products, $filters);
  product_filter.init();
});

// funtion to initialize loaded values and do operations on each filter
function Multifilter(products, filters) {
  var _this = this;

  // initialize the parameters for fetching at the time of filtering the record.
  this.init = function() {
    this.products = products;
    this.filters = filters;
    this.bindEvents();
  };

  this.bindEvents = function() {
    this.filters.click(this.filterGridProducts);
    $('#none').click(this.removeAllFilters);
  };

  // this function is responsible for getting the values from initializer and checking which filter is selected - then, filtering the results by using data variables.
  this.filterGridProducts = function() {
    // hides all records and then filter based on selected values.
    _this.products.hide();
    var filteredProducts = _this.products;
    var filterAttributes = $('.filter-attributes'); 
    // for each attribute check the corresponding attribute filters selected
    filterAttributes.each(function(){
      var selectedFilters = $(this).find('input:checked');
      // if selected - filter by the attribute
      if (selectedFilters.length) {
        var selectedFiltersValues = [];
        selectedFilters.each(function() {
          var currentFilter = $(this);
          // preparing array for all filters which are selected.
          selectedFiltersValues.push("[data-" + currentFilter.attr('name') + "='" + currentFilter.val() + "']");
        });
        filteredProducts = filteredProducts.filter(selectedFiltersValues.join(','));
      }
    });
    
    filteredProducts.show();
  };

  this.removeAllFilters = function() {
    _this.filters.prop('checked', false);
    _this.filters.trigger('change');
    _this.products.show();
  }
}