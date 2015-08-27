(function() {
  'use strict';
  angular.module('app')
  .controller('CarouselCtrl', CarouselCtrl);

  CarouselCtrl.$inject=['HomeFactory','$state'];

  function CarouselCtrl(HomeFactory,$state) {
    var vm = this;
  vm.noWrapSlides = false; //setting no-wrap to an expression which evaluates to a truthy value will prevent looping
  var slides = vm.slides = []; //this is the array that will be displayed on the view


  vm.addSlide = function() {
    var newWidth = 600 + slides.length + 1;
    slides.push({
      image: '//placekitten.com/' + newWidth + '/300',
      text: ['More','Extra','Lots of','Surplus'][slides.length % 4] + ' ' +
      ['Cats', 'Kittys', 'Felines', 'Cutes'][slides.length % 4]
    });
  };
  for (var i=0; i<4; i++) {
    vm.addSlide();
  }
}
})();
