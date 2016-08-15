define(['jquery', 'inherit'], function($, inherit) {

	var LazyLoad = inherit(new function() {

		var id = 0;

		function init(container, options) {

			this.scrollId = id++;
			this.options = options;
			var container = this.container = $(container);
			this.imageList = container.find('img[' + options.lazyLoadAttr + ']');
		}


		function loadImage(li) {
			if (li.length == 0) {
				return;
			}
			var options = this.options;
			var lazyLoadAttr = options.lazyLoadAttr;
			var src = li.attr(lazyLoadAttr);
			src != undefined && src != '' && li.attr('src', src).removeAttr(lazyLoadAttr);

			return true;

		}


		function belowthefold(element) {
			return $(element).offset().top >= $(window).scrollTop() + $(window).height() + $(window).height();
		}

		function abovethetop(element) {
			return $(element).offset().top <= $(window).scrollTop() - $(element).height() - $(window).height();
		}


		function inViewport(element) {
			return !belowthefold(element) && !abovethetop(element);

		}

		function checkViewportImage() {
			var self = this;
			this.imageList.each(function(idx, ele) {
				inViewport(ele) && $.proxy(loadImage, self)($(ele)) && $.proxy(updateImageList, self)();
			})
		}

		function updateImageList() {
			this.imageList = this.imageList.filter('img[' + this.options.lazyLoadAttr + ']');
			if (this.imageList.length == 0) {
				$(window).off('scroll.' + this.scrollId);
			}
		}


		function lazyLoad() {
			var self = this;
			$.proxy(checkViewportImage, self)();
			$(window).on('scroll.' + this.scrollId, function() {
				$.proxy(checkViewportImage, self)();
			});
			// $(window).scroll(function() {
			// });
		}

		return {
			__constructor: init,
			lazyLoad: lazyLoad
		}

	});

	return LazyLoad;
});