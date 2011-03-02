/*
 * A jQuery plugin for Awesome Toggling
 * 
 * Author:	Joel Courtney (@jufemaiz)
 * Website: http://euphemize.net/
 *
 * Revisions:
 *		0.1		- Initial commit
 * 
 * References:
 *		TBA
 *
 */
(function($) {

	// replace 'pluginName' with the name of your plugin
    $.fn.jmc_toggler = function(options) {
		// plugin default options
        var defaults = { 'horizontal' : true, 'speed' : null, };

		// extends defaults with options provided
        if (options) { $.extend(defaults, options); }

		// iterate over matched elements
        return this.each(function() {
            // implementations
			
			// Get the element
			var el = $(this);
			// Set the canvas for the toggler
			setCanvas(el,options);
			
			// Hover events
			el.hover(
				// Hover on
				function(ev){
					var canvas = $($(ev.currentTarget).find('.jmc_toggler_canvas').get(0));
					canvas.animate(animationOptions(canvas,options,true), (options.speed == null ? canvas.width() : options.speed), function() {});
				},
				// Hover off
				function(ev){
					var canvas = $($(ev.currentTarget).find('.jmc_toggler_canvas').get(0));
					canvas.animate(animationOptions(canvas,options,false), (options.speed == null ? canvas.width() : options.speed), function() {});
				}
			);
        });

    };

	// public functions definition
	// $.fn.jmc_toggler.functionName = function(foo) {
	// 	return this;
	// };

	// private functions definition

	function setCanvas(el,options) {
		var canvas_template = $('<div class="jmc_toggler_canvas" />');

		el.addClass('jmc_toggler');
		el.children('.panel').addClass('jmc_toggler_panel');
		el.children().wrapAll(canvas_template);
		canvas_template = el.find('.jmc_toggler_canvas'); // reset the canvas to the dom element

		// add styling
		var panels = el.find('.jmc_toggler_panel');
		var panel = $(panels.get(0));
		
		el.css({'position':'relative','overflow':'hidden','height':panel.height(),'width':panel.width()});
		canvas_template.css({'position':'absolute','top':0,'left':0,'height':2*panel.height(),'width':2*panel.width()});

		// Horizontal versus vertical
		var _d = 'inline-block'; var _f = 'left';
		if(!options.horizontal) { _d = 'block'; _f = 'none'; }
		panels.css({'display':_d});
		if(jQuery.support.inlineBlockNeedsLayout) { $(panels.get(1)).css({'float':_f}); }

	}
	
	function animationOptions(el,options,r) {
		var animation_options = {}; var _p = 'left'; var _v = el.width()/2;
		if(!options.horizontal) { _p = 'top'; _v = el.height()/2; }
		animation_options[_p] =	(r?'-=' : '+=') + (_v);
		return animation_options;
	}

})(jQuery);