$(document).ready(function() {

      var owl = $("#owl-demo");

      owl.owlCarousel({
        
        itemsCustom : [
          [0, 1],
          [400, 1],
		      [1023, 2],
          [1024, 2],
          [1600, 2]
        ],
        navigation : false,
		pagination : false,
		autoPlay :true,
    

      });
    });
	
    $(document).ready(function() {
     
      var owl = $("#owl-demo");
     
      owl.owlCarousel();
     
      // Custom Navigation Events
      $(".next").click(function(){
        owl.trigger('owl.next');
      })
      $(".prev").click(function(){
        owl.trigger('owl.prev');
      })
     
    });