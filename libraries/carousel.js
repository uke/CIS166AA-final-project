var tricopter_pics;

jsLib.event.add( window, "load", function() {
    var options = {
        height: 500,
        maxSpeed: 2.5,
maxAspect: .5
    }
    tricopter_pics = new Carousel("myCarousel", options);

});