$(function () {
  String.prototype.capitalize = function() {
    var tokens = this.split(" ").filter(function(t) {return t != ""; }),
        res = [],
        i,
        len,
        component;

    for (i = 0, len = tokens.length; i < len; i++) {
      component = tokens[i];
      res.push(component.substring(0, 1).toUpperCase());
      res.push(component.substring(1));
    }

    return res.join("");
  };

  $('.button-checkbox').each(function () {

    // Settings
    var $widget = $(this),
      $button = $widget.find('button'),
      $checkbox = $widget.find('input:checkbox'),
      color = $button.data('color'),
      settings = {
          on: {
              icon: 'glyphicon glyphicon-check'
          },
          off: {
              icon: 'glyphicon glyphicon-unchecked'
          }
      };

    // Event Handlers
    $button.on('click', function () {
      $checkbox.prop('checked', !$checkbox.is(':checked'));
      $checkbox.triggerHandler('change');
      $checkbox.triggerHandler('click');
      updateDisplay();
    });
    $checkbox.on('change', function () {
      updateDisplay();
    });

    // Actions
    function updateDisplay() {
      var isChecked = $checkbox.is(':checked');

      // Set the button's state
      $button.data('state', (isChecked) ? "on" : "off");

      // Set the button's icon
      $button.find('.state-icon')
        .removeClass()

      // Update the button's color
      if (isChecked) {
        $button
          .removeClass('btn-default')
          .addClass('btn-' + color + ' active');
      }
      else {
        $button
          .removeClass('btn-' + color + ' active')
          .addClass('btn-default');
      }
    }

    // Initialization
    function init() {

      updateDisplay();

    }
    init();
  });
});