$(document).ready(function () {
    //Menu 
    $('.menu-toggle').click(function(e){
      e.preventDefault();
      $('body').toggleClass('menu-show');
    })
    $(document).mouseup(function(e) 
  {
    var container = $('.header-holder__container, .menu-toggle');
    if (!container.is(e.target) && container.has(e.target).length === 0) 
    {
      $('body').removeClass('menu-show');
    }
  });
  //Complex Filter Toggle
  $('.complex-filter-toggle').click(function(e){
    e.preventDefault();
    $('body').addClass('complex-filter-show');
  })
  $('.complex-filter-close').click(function(e){
    e.preventDefault();
    $('body').removeClass('complex-filter-show');
  })
  
  
  
    //Search Dropdown Toggle
    $(document).on('focus', '.search-dropdown .input-control', function () {
      $('.search-dropdown').addClass('search-dropdown__open');
      $(this).parent().parent().addClass('dropdown-active');
      $('.action-dropdown-input').addClass('clickable');
    });
    $('.search-dropdown .input-control').bind('blur', function () {
      $('.search-dropdown').removeClass('search-dropdown__open');
    });
    $('.action-dropdown-input').click(function(){
      $(this).removeClass('clickable');
      $('.search-dropdown').removeClass('search-dropdown__open');
      $(this).parent().parent().removeClass('dropdown-active');
    })
  
  
    //Search Filter Details
    var searchFilterSale = $('#filter-search-sale');
    var searchFilterRent = $('#filter-search-rent');
    var searchFilterDetails = $('#filter-search-details');
    var searchFilterContainer = $('.search-filter__container');
    var searchFilterOverlay = $('.search-filter-overlay');
    searchFilterDetails.click(function (e) {
      e.preventDefault();
      $('body').addClass('filter-search-open');
    })
    $('.filter-search-form').click(function(){
      $('body').addClass('filter-search-open');
    })
    $(document).mouseup(function (e) {
      if (!searchFilterContainer.is(e.target) && searchFilterContainer.has(e.target).length === 0) {
        $('body').removeClass('filter-search-open');
      }
    });
    searchFilterSale.add(searchFilterRent).add(searchFilterOverlay).click(function() { 
      $('body').removeClass('filter-search-open');
     });
  
     //Search Filter More]
     $('.more-search-toggle').click(function(e){
       e.preventDefault();
      $('.search-more').slideToggle();
    })
  
     
  
  
    //Phone Number Show Property Detail
    $('.phone-area__preview').click(function () {
      $(this).hide()
    });
  
    // Show Password
    $('.visibilty-password').click(function () {
      $(this).toggleClass('icon-eye icon-eye-off');
      var input = $(this).siblings();
      if (input.attr('type') == 'password') {
        input.attr('type', 'text');
      } else {
        input.attr('type', 'password');
      }
    });
  
    // Tab
    function tab() {
      $('.tab').on('click', function (evt) {
        evt.preventDefault();
        var $this = $(this);
        var $theTab = $(this).attr('id');
        if ($this.hasClass('active')) {} else {
          $this.closest('.tab-container').find('.tab, .tab-content').removeClass('active');
          $('.tab-holder .tab-content[data-tab="' + $theTab + '"], .tab[id="' + $theTab + '"]').addClass('active');
        }
        if($('.navigation-tab__submenu').length>0){
          $('.card-holder__carousel').slick('refresh');
        }
      });
    }
    tab();
  
    //Custom Select
    $('.custom-select-sm').select2({
      minimumResultsForSearch: Infinity,
      dropdownCssClass: 'select-sm'
    });
    $('.custom-select-md').select2({
      minimumResultsForSearch: Infinity,
      dropdownCssClass: 'select-md'
    });
    $('.custom-select-lg').select2({
      minimumResultsForSearch: Infinity,
      dropdownCssClass: 'select-lg'
    });
  
  
    //Card Carousel
    $('.card-holder__carousel').each(function () {
      var slickInduvidual = $(this);
      slickInduvidual.slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        infinite: true,
        dots: false,
        arrows: true,
        prevArrow: slickInduvidual.parent().parent().siblings().find('.card-navigation__prev'),
        nextArrow: slickInduvidual.parent().parent().siblings().find('.card-navigation__next'),
        draggable: false,
        autoplay: false,
        speed: 600,
      })
    })
  
  
    //Fancybox Gallery
    $('[data-fancybox="images"]').fancybox({
      loop: true,
      animationEffect: 'fade',
      buttons: [
        'close'
      ],
    });
  
    // Modal
    if ($('.modal').length) {
      $('.modal').iziModal({
        overlayClose: false,
        overlayColor: 'rgba(6, 6, 6, 0.6)',
        transitionIn: 'fadeIn',
        transitionOut: 'fadeOut',
        focusInput: false,
        bodyOverflow: true,
        fullscreen: true,
        openFullscreen: true,
        onOpening: function () {
          tab();
        },
      });
    }
  
  
  });
  
  if ($('#map').length) {
    var lat = parseFloat($('#map').data('lat'));
    var lng = parseFloat($('#map').data('lng'));
    ymaps.ready(init);
  
    function init() {
      var myMap = new ymaps.Map('map', {
          center: [lat, lng],
          zoom: 16,
          controls: ['zoomControl']
        }),
        myPlacemark = new ymaps.Placemark([lat, lng]);
      myMap.geoObjects.add(myPlacemark);
      myMap.behaviors.disable('scrollZoom');
    }
  }