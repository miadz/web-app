'use strict';

angular.module('rac.directives')
.directive('verticalTab', function () {
  return {
    restrict: 'A',
    link: function () {
      $('.js-vertical-tab-content').hide();
      $('.js-vertical-tab-content:first').show();

      $('.js-vertical-tab').click(function(event) {
        event.preventDefault();

        $('.js-vertical-tab-content').hide();
        var activeTab = $(this).attr('rel');
        $('#'+activeTab).show();

        $('.js-vertical-tab').removeClass('is-active');
        $(this).addClass('is-active');

        $('.js-vertical-tab-accordion-heading').removeClass('is-active');
        $('.js-vertical-tab-accordion-heading[rel^="'+activeTab+'"]').addClass('is-active');
      });
    }
  };
});