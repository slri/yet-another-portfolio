;(function($) {


function scrollicious(opts, callback) {

	opts = opts || {};

	if (!(this instanceof scrollicious)) {
        return new scrollicious(opts, callback);
    }

    var _globalResizeTimer 		= null,
    	_globalAnimationTime 	= opts.animation || 500,

    	_viewport 				= opts.viewport || "",
    	_computedViewport 		= Math.round($(window).height() * ((_viewport || 50) / 100)),

    	_target 				= $(opts.target || "#target"),

    	_trigger 				= $(opts.trigger || "#trigger"),

    	_duration 				= opts.duration || "",

    	_triggerStart 			= _trigger.offset().top,
		_triggerEnd 			= _duration || _trigger.outerHeight(),
		_triggerOffset 			= _triggerStart - _computedViewport,
		_triggerDuration 		= _triggerOffset + _triggerEnd;

	

	$(window).scroll(function() {
		var weReAt = $(window).scrollTop();

		if(weReAt >= _triggerOffset && weReAt <= _triggerDuration) {

			callback(((weReAt - _triggerOffset) / _triggerEnd) * 100, _target);
		}
	});

	$(window).resize(function() {
		clearTimeout(_globalResizeTimer);

		_globalResizeTimer = setTimeout(function() {

			_computedViewport 	= Math.round($(window).height() * ((_viewport || 50) / 100));

			_triggerStart 		= _trigger.offset().top;
			_triggerEnd 		= _duration || _trigger.outerHeight();
			_triggerOffset 		= _triggerStart - _computedViewport;
			_triggerDuration 	= _triggerOffset + _triggerEnd;
		}, _globalAnimationTime);
	});
}

window.scrollicious = scrollicious;

})(jQuery);