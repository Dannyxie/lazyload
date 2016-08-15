require(['jquery', 'lazyload'], function($, LazyLoad){
	var lazyload = new LazyLoad($('#parent'),{
		lazyLoadAttr : 'data-src'
	});

	lazyload.lazyLoad();
});