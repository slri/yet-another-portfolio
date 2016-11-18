;(function($) {


function scrollicious(opts, callback) {

	opts = opts || {};

	if (!(this instanceof scrollicious)) {
        return new scrollicious(opts, callback);
    }

    this._viewport 					= opts.viewport || "";
	this._computedViewport 			= Math.round($(window).height() * ((this._viewport || 50) / 100));

	this._target 			= $(opts.target || "#target");

	this._trigger 			= $(opts.trigger || "#trigger");

	this._duration 			= opts.duration || "";

	this._triggerStart 		= this._trigger.offset().top;
	this._triggerEnd 		= this._duration || this._trigger.outerHeight();
	this._triggerOffset 	= this._triggerStart - this._viewport;
	this._triggerDuration 	= this._triggerOffset + this._triggerEnd;

	var _self = this;

	$(window).scroll(function() {
		var weReAt = $(window).scrollTop();

		if(weReAt >= _self._triggerOffset && weReAt <= _self._triggerDuration) {
			
			callback(((weReAt - _self._triggerOffset) / _self._triggerEnd) * 100, _self._target);
		}
	});

	$(window).resize(function() {
		_self._viewport 		= Math.round($(window).height() * ((_self._viewport || 50) / 100));

		_self._triggerStart 	= _self._trigger.offset().top;
		_self._triggerEnd 		= _self._duration || _self._trigger.outerHeight();
		_self._triggerOffset 	= _self._triggerStart - _self._viewport;
		_self._triggerDuration 	= _self._triggerOffset + _self._triggerEnd;
	});
}

window.scrollicious = scrollicious;

})(jQuery);