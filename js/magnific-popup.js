/*! Magnific Popup - v1.1.0 - 2016-02-20
* http://dimsemenov.com/plugins/magnific-popup/
* Copyright (c) 2016 Dmitry Semenov; */
;(function (factory) { 
if (typeof define === 'function' && define.amd) { 
 // AMD. Register as an anonymous module. 
 define(['jquery'], factory); 
 } else if (typeof exports === 'object') { 
 // Node/CommonJS 
 factory(require('jquery')); 
 } else { 
 // Browser globals 
 factory(window.jQuery || window.Zepto); 
 } 
 }(function($) { 

/*>>core*/
/**
 * 
 * Magnific Popup Core JS file
 * 
 */


/**
 * Private static constants
 */
var CLOSE_EVENT = 'Close',
	BEFORE_CLOSE_EVENT = 'BeforeClose',
	AFTER_CLOSE_EVENT = 'AfterClose',
	BEFORE_APPEND_EVENT = 'BeforeAppend',
	MARKUP_PARSE_EVENT = 'MarkupParse',
	OPEN_EVENT = 'Open',
	CHANGE_EVENT = 'Change',
	NS = 'mfp',
	EVENT_NS = '.' + NS,
	READY_CLASS = 'mfp-ready',
	REMOVING_CLASS = 'mfp-removing',
	PREVENT_CLOSE_CLASS = 'mfp-prevent-close';


/**
 * Private vars 
 */
/*jshint -W079 */
var mfp, // As we have only one instance of MagnificPopup object, we define it locally to not to use 'this'
	MagnificPopup = function(){},
	_isJQ = !!(window.jQuery),
	_prevStatus,
	_window = $(window),
	_document,
	_prevContentType,
	_wrapClasses,
	_currPopupType;


/**
 * Private functions
 */
var _mfpOn = function(name, f) {
		mfp.ev.on(NS + name + EVENT_NS, f);
	},
	_getEl = function(className, appendTo, html, raw) {
		var el = document.createElement('div');
		el.className = 'mfp-'+className;
		if(html) {
			el.innerHTML = html;
		}
		if(!raw) {
			el = $(el);
			if(appendTo) {
				el.appendTo(appendTo);
			}
		} else if(appendTo) {
			appendTo.appendChild(el);
		}
		return el;
	},
	_mfpTrigger = function(e, data) {
		mfp.ev.triggerHandler(NS + e, data);

		if(mfp.st.callbacks) {
			// converts "mfpEventName" to "eventName" callback and triggers it if it's present
			e = e.charAt(0).toLowerCase() + e.slice(1);
			if(mfp.st.callbacks[e]) {
				mfp.st.callbacks[e].apply(mfp, $.isArray(data) ? data : [data]);
			}
		}
	},
	_getCloseBtn = function(type) {
		if(type !== _currPopupType || !mfp.currTemplate.closeBtn) {
			mfp.currTemplate.closeBtn = $( mfp.st.closeMarkup.replace('%title%', mfp.st.tClose ) );
			_currPopupType = type;
		}
		return mfp.currTemplate.closeBtn;
	},
	// Initialize Magnific Popup only when called at least once
	_checkInstance = function() {
		if(!$.magnificPopup.instance) {
			/*jshint -W020 */
			mfp = new MagnificPopup();
			mfp.init();
			$.magnificPopup.instance = mfp;
		}
	},
	// CSS transition detection, http://stackoverflow.com/questions/7264899/detect-css-transitions-using-javascript-and-without-modernizr
	supportsTransitions = function() {
		var s = document.createElement('p').style, // 's' for style. better to create an element if body yet to exist
			v = ['ms','O','Moz','Webkit']; // 'v' for vendor

		if( s['transition'] !== undefined ) {
			return true; 
		}
			
		while( v.length ) {
			if( v.pop() + 'Transition' in s ) {
				return true;
			}
		}
				
		return false;
	};



/**
 * Public functions
 */
MagnificPopup.prototype = {

	constructor: MagnificPopup,

	/**
	 * Initializes Magnific Popup plugin. 
	 * This function is triggered only once when $.fn.magnificPopup or $.magnificPopup is executed
	 */
	init: function() {
		var appVersion = navigator.appVersion;
		mfp.isLowIE = mfp.isIE8 = document.all && !document.addEventListener;
		mfp.isAndroid = (/android/gi).test(appVersion);
		mfp.isIOS = (/iphone|ipad|ipod/gi).test(appVersion);
		mfp.supportsTransition = supportsTransitions();

		// We disable fixed positioned lightbox on devices that don't handle it nicely.
		// If you know a better way of detecting this - let me know.
		mfp.probablyMobile = (mfp.isAndroid || mfp.isIOS || /(Opera Mini)|Kindle|webOS|BlackBerry|(Opera Mobi)|(Windows Phone)|IEMobile/i.test(navigator.userAgent) );
		_document = $(document);

		mfp.popupsCache = {};
	},

	/**
	 * Opens popup
	 * @param  data [description]
	 */
	open: function(data) {

		var i;

		if(data.isObj === false) { 
			// convert jQuery collection to array to avoid conflicts later
			mfp.items = data.items.toArray();

			mfp.index = 0;
			var items = data.items,
				item;
			for(i = 0; i < items.length; i++) {
				item = items[i];
				if(item.parsed) {
					item = item.el[0];
				}
				if(item === data.el[0]) {
					mfp.index = i;
					break;
				}
			}
		} else {
			mfp.items = $.isArray(data.items) ? data.items : [data.items];
			mfp.index = data.index || 0;
		}

		// if popup is already opened - we just update the content
		if(mfp.isOpen) {
			mfp.updateItemHTML();
			return;
		}
		
		mfp.types = []; 
		_wrapClasses = '';
		if(data.mainEl && data.mainEl.length) {
			mfp.ev = data.mainEl.eq(0);
		} else {
			mfp.ev = _document;
		}

		if(data.key) {
			if(!mfp.popupsCache[data.key]) {
				mfp.popupsCache[data.key] = {};
			}
			mfp.currTemplate = mfp.popupsCache[data.key];
		} else {
			mfp.currTemplate = {};
		}



		mfp.st = $.extend(true, {}, $.magnificPopup.defaults, data ); 
		mfp.fixedContentPos = mfp.st.fixedContentPos === 'auto' ? !mfp.probablyMobile : mfp.st.fixedContentPos;

		if(mfp.st.modal) {
			mfp.st.closeOnContentClick = false;
			mfp.st.closeOnBgClick = false;
			mfp.st.showCloseBtn = false;
			mfp.st.enableEscapeKey = false;
		}
		

		// Building markup
		// main containers are created only once
		if(!mfp.bgOverlay) {

			// Dark overlay
			mfp.bgOverlay = _getEl('bg').on('click'+EVENT_NS, function() {
				mfp.close();
			});

			mfp.wrap = _getEl('wrap').attr('tabindex', -1).on('click'+EVENT_NS, function(e) {
				if(mfp._checkIfClose(e.target)) {
					mfp.close();
				}
			});

			mfp.container = _getEl('container', mfp.wrap);
		}

		mfp.contentContainer = _getEl('content');
		if(mfp.st.preloader) {
			mfp.preloader = _getEl('preloader', mfp.container, mfp.st.tLoading);
		}


		// Initializing modules
		var modules = $.magnificPopup.modules;
		for(i = 0; i < modules.length; i++) {
			var n = modules[i];
			n = n.charAt(0).toUpperCase() + n.slice(1);
			mfp['init'+n].call(mfp);
		}
		_mfpTrigger('BeforeOpen');


		if(mfp.st.showCloseBtn) {
			// Close button
			if(!mfp.st.closeBtnInside) {
				mfp.wrap.append( _getCloseBtn() );
			} else {
				_mfpOn(MARKUP_PARSE_EVENT, function(e, template, values, item) {
					values.close_replaceWith = _getCloseBtn(item.type);
				});
				_wrapClasses += ' mfp-close-btn-in';
			}
		}

		if(mfp.st.alignTop) {
			_wrapClasses += ' mfp-align-top';
		}

	

		if(mfp.fixedContentPos) {
			mfp.wrap.css({
				overflow: mfp.st.overflowY,
				overflowX: 'hidden',
				overflowY: mfp.st.overflowY
			});
		} else {
			mfp.wrap.css({ 
				top: _window.scrollTop(),
				position: 'absolute'
			});
		}
		if( mfp.st.fixedBgPos === false || (mfp.st.fixedBgPos === 'auto' && !mfp.fixedContentPos) ) {
			mfp.bgOverlay.css({
				height: _document.height(),
				position: 'absolute'
			});
		}

		

		if(mfp.st.enableEscapeKey) {
			// Close on ESC key
			_document.on('keyup' + EVENT_NS, function(e) {
				if(e.keyCode === 27) {
					mfp.close();
				}
			});
		}

		_window.on('resize' + EVENT_NS, function() {
			mfp.updateSize();
		});


		if(!mfp.st.closeOnContentClick) {
			_wrapClasses += ' mfp-auto-cursor';
		}
		
		if(_wrapClasses)
			mfp.wrap.addClass(_wrapClasses);


		// this triggers recalculation of layout, so we get it once to not to trigger twice
		var windowHeight = mfp.wH = _window.height();

		
		var windowStyles = {};

		if( mfp.fixedContentPos ) {
            if(mfp._hasScrollBar(windowHeight)){
                var s = mfp._getScrollbarSize();
                if(s) {
                    windowStyles.marginRight = s;
                }
            }
        }

		if(mfp.fixedContentPos) {
			if(!mfp.isIE7) {
				windowStyles.overflow = 'hidden';
			} else {
				// ie7 double-scroll bug
				$('body, html').css('overflow', 'hidden');
			}
		}

		
		
		var classesToadd = mfp.st.mainClass;
		if(mfp.isIE7) {
			classesToadd += ' mfp-ie7';
		}
		if(classesToadd) {
			mfp._addClassToMFP( classesToadd );
		}

		// add content
		mfp.updateItemHTML();

		_mfpTrigger('BuildControls');

		// remove scrollbar, add margin e.t.c
		$('html').css(windowStyles);
		
		// add everything to DOM
		mfp.bgOverlay.add(mfp.wrap).prependTo( mfp.st.prependTo || $(document.body) );

		// Save last focused element
		mfp._lastFocusedEl = document.activeElement;
		
		// Wait for next cycle to allow CSS transition
		setTimeout(function() {
			
			if(mfp.content) {
				mfp._addClassToMFP(READY_CLASS);
				mfp._setFocus();
			} else {
				// if content is not defined (not loaded e.t.c) we add class only for BG
				mfp.bgOverlay.addClass(READY_CLASS);
			}
			
			// Trap the focus in popup
			_document.on('focusin' + EVENT_NS, mfp._onFocusIn);

		}, 16);

		mfp.isOpen = true;
		mfp.updateSize(windowHeight);
		_mfpTrigger(OPEN_EVENT);

		return data;
	},

	/**
	 * Closes the popup
	 */
	close: function() {
		if(!mfp.isOpen) return;
		_mfpTrigger(BEFORE_CLOSE_EVENT);

		mfp.isOpen = false;
		// for CSS3 animation
		if(mfp.st.removalDelay && !mfp.isLowIE && mfp.supportsTransition )  {
			mfp._addClassToMFP(REMOVING_CLASS);
			setTimeout(function() {
				mfp._close();
			}, mfp.st.removalDelay);
		} else {
			mfp._close();
		}
	},

	/**
	 * Helper for close() function
	 */
	_close: function() {
		_mfpTrigger(CLOSE_EVENT);

		var classesToRemove = REMOVING_CLASS + ' ' + READY_CLASS + ' ';

		mfp.bgOverlay.detach();
		mfp.wrap.detach();
		mfp.container.empty();

		if(mfp.st.mainClass) {
			classesToRemove += mfp.st.mainClass + ' ';
		}

		mfp._removeClassFromMFP(classesToRemove);

		if(mfp.fixedContentPos) {
			var windowStyles = {marginRight: ''};
			if(mfp.isIE7) {
				$('body, html').css('overflow', '');
			} else {
				windowStyles.overflow = '';
			}
			$('html').css(windowStyles);
		}
		
		_document.off('keyup' + EVENT_NS + ' focusin' + EVENT_NS);
		mfp.ev.off(EVENT_NS);

		// clean up DOM elements that aren't removed
		mfp.wrap.attr('class', 'mfp-wrap').removeAttr('style');
		mfp.bgOverlay.attr('class', 'mfp-bg');
		mfp.container.attr('class', 'mfp-container');

		// remove close button from target element
		if(mfp.st.showCloseBtn &&
		(!mfp.st.closeBtnInside || mfp.currTemplate[mfp.currItem.type] === true)) {
			if(mfp.currTemplate.closeBtn)
				mfp.currTemplate.closeBtn.detach();
		}


		if(mfp.st.autoFocusLast && mfp._lastFocusedEl) {
			$(mfp._lastFocusedEl).focus(); // put tab focus back
		}
		mfp.currItem = null;	
		mfp.content = null;
		mfp.currTemplate = null;
		mfp.prevHeight = 0;

		_mfpTrigger(AFTER_CLOSE_EVENT);
	},
	
	updateSize: function(winHeight) {

		if(mfp.isIOS) {
			// fixes iOS nav bars https://github.com/dimsemenov/Magnific-Popup/issues/2
			var zoomLevel = document.documentElement.clientWidth / window.innerWidth;
			var height = window.innerHeight * zoomLevel;
			mfp.wrap.css('height', height);
			mfp.wH = height;
		} else {
			mfp.wH = winHeight || _window.height();
		}
		// Fixes #84: popup incorrectly positioned with position:relative on body
		if(!mfp.fixedContentPos) {
			mfp.wrap.css('height', mfp.wH);
		}

		_mfpTrigger('Resize');

	},

	/**
	 * Set content of popup based on current index
	 */
	updateItemHTML: function() {
		var item = mfp.items[mfp.index];

		// Detach and perform modifications
		mfp.contentContainer.detach();

		if(mfp.content)
			mfp.content.detach();

		if(!item.parsed) {
			item = mfp.parseEl( mfp.index );
		}

		var type = item.type;

		_mfpTrigger('BeforeChange', [mfp.currItem ? mfp.currItem.type : '', type]);
		// BeforeChange event works like so:
		// _mfpOn('BeforeChange', function(e, prevType, newType) { });

		mfp.currItem = item;

		if(!mfp.currTemplate[type]) {
			var markup = mfp.st[type] ? mfp.st[type].markup : false;

			// allows to modify markup
			_mfpTrigger('FirstMarkupParse', markup);

			if(markup) {
				mfp.currTemplate[type] = $(markup);
			} else {
				// if there is no markup found we just define that template is parsed
				mfp.currTemplate[type] = true;
			}
		}

		if(_prevContentType && _prevContentType !== item.type) {
			mfp.container.removeClass('mfp-'+_prevContentType+'-holder');
		}

		var newContent = mfp['get' + type.charAt(0).toUpperCase() + type.slice(1)](item, mfp.currTemplate[type]);
		mfp.appendContent(newContent, type);

		item.preloaded = true;

		_mfpTrigger(CHANGE_EVENT, item);
		_prevContentType = item.type;

		// Append container back after its content changed
		mfp.container.prepend(mfp.contentContainer);

		_mfpTrigger('AfterChange');
	},


	/**
	 * Set HTML content of popup
	 */
	appendContent: function(newContent, type) {
		mfp.content = newContent;

		if(newContent) {
			if(mfp.st.showCloseBtn && mfp.st.closeBtnInside &&
				mfp.currTemplate[type] === true) {
				// if there is no markup, we just append close button element inside
				if(!mfp.content.find('.mfp-close').length) {
					mfp.content.append(_getCloseBtn());
				}
			} else {
				mfp.content = newContent;
			}
		} else {
			mfp.content = '';
		}

		_mfpTrigger(BEFORE_APPEND_EVENT);
		mfp.container.addClass('mfp-'+type+'-holder');

		mfp.contentContainer.append(mfp.content);
	},


	/**
	 * Creates Magnific Popup data object based on given data
	 * @param  {int} index Index of item to parse
	 */
	parseEl: function(index) {
		var item = mfp.items[index],
			type;

		if(item.tagName) {
			item = { el: $(item) };
		} else {
			type = item.type;
			item = { data: item, src: item.src };
		}

		if(item.el) {
			var types = mfp.types;

			// check for 'mfp-TYPE' class
			for(var i = 0; i < types.length; i++) {
				if( item.el.hasClass('mfp-'+types[i]) ) {
					type = types[i];
					break;
				}
			}

			item.src = item.el.attr('data-mfp-src');
			if(!item.src) {
				item.src = item.el.attr('href');
			}
		}

		item.type = type || mfp.st.type || 'inline';
		item.index = index;
		item.parsed = true;
		mfp.items[index] = item;
		_mfpTrigger('ElementParse', item);

		return mfp.items[index];
	},


	/**
	 * Initializes single popup or a group of popups
	 */
	addGroup: function(el, options) {
		var eHandler = function(e) {
			e.mfpEl = this;
			mfp._openClick(e, el, options);
		};

		if(!options) {
			options = {};
		}

		var eName = 'click.magnificPopup';
		options.mainEl = el;

		if(options.items) {
			options.isObj = true;
			el.off(eName).on(eName, eHandler);
		} else {
			options.isObj = false;
			if(options.delegate) {
				el.off(eName).on(eName, options.delegate , eHandler);
			} else {
				options.items = el;
				el.off(eName).on(eName, eHandler);
			}
		}
	},
	_openClick: function(e, el, options) {
		var midClick = options.midClick !== undefined ? options.midClick : $.magnificPopup.defaults.midClick;


		if(!midClick && ( e.which === 2 || e.ctrlKey || e.metaKey || e.altKey || e.shiftKey ) ) {
			return;
		}

		var disableOn = options.disableOn !== undefined ? options.disableOn : $.magnificPopup.defaults.disableOn;

		if(disableOn) {
			if($.isFunction(disableOn)) {
				if( !disableOn.call(mfp) ) {
					return true;
				}
			} else { // else it's number
				if( _window.width() < disableOn ) {
					return true;
				}
			}
		}

		if(e.type) {
			e.preventDefault();

			// This will prevent popup from closing if element is inside and popup is already opened
			if(mfp.isOpen) {
				e.stopPropagation();
			}
		}

		options.el = $(e.mfpEl);
		if(options.delegate) {
			options.items = el.find(options.delegate);
		}
		mfp.open(options);
	},


	/**
	 * Updates text on preloader
	 */
	updateStatus: function(status, text) {

		if(mfp.preloader) {
			if(_prevStatus !== status) {
				mfp.container.removeClass('mfp-s-'+_prevStatus);
			}

			if(!text && status === 'loading') {
				text = mfp.st.tLoading;
			}

			var data = {
				status: status,
				text: text
			};
			// allows to modify status
			_mfpTrigger('UpdateStatus', data);

			status = data.status;
			text = data.text;

			mfp.preloader.html(text);

			mfp.preloader.find('a').on('click', function(e) {
				e.stopImmediatePropagation();
			});

			mfp.container.addClass('mfp-s-'+status);
			_prevStatus = status;
		}
	},


	/*
		"Private" helpers that aren't private at all
	 */
	// Check to close popup or not
	// "target" is an element that was clicked
	_checkIfClose: function(target) {

		if($(target).hasClass(PREVENT_CLOSE_CLASS)) {
			return;
		}

		var closeOnContent = mfp.st.closeOnContentClick;
		var closeOnBg = mfp.st.closeOnBgClick;

		if(closeOnContent && closeOnBg) {
			return true;
		} else {

			// We close the popup if click is on close button or on preloader. Or if there is no content.
			if(!mfp.content || $(target).hasClass('mfp-close') || (mfp.preloader && target === mfp.preloader[0]) ) {
				return true;
			}

			// if click is outside the content
			if(  (target !== mfp.content[0] && !$.contains(mfp.content[0], target))  ) {
				if(closeOnBg) {
					// last check, if the clicked element is in DOM, (in case it's removed onclick)
					if( $.contains(document, target) ) {
						return true;
					}
				}
			} else if(closeOnContent) {
				return true;
			}

		}
		return false;
	},
	_addClassToMFP: function(cName) {
		mfp.bgOverlay.addClass(cName);
		mfp.wrap.addClass(cName);
	},
	_removeClassFromMFP: function(cName) {
		this.bgOverlay.removeClass(cName);
		mfp.wrap.removeClass(cName);
	},
	_hasScrollBar: function(winHeight) {
		return (  (mfp.isIE7 ? _document.height() : document.body.scrollHeight) > (winHeight || _window.height()) );
	},
	_setFocus: function() {
		(mfp.st.focus ? mfp.content.find(mfp.st.focus).eq(0) : mfp.wrap).focus();
	},
	_onFocusIn: function(e) {
		if( e.target !== mfp.wrap[0] && !$.contains(mfp.wrap[0], e.target) ) {
			mfp._setFocus();
			return false;
		}
	},
	_parseMarkup: function(template, values, item) {
		var arr;
		if(item.data) {
			values = $.extend(item.data, values);
		}
		_mfpTrigger(MARKUP_PARSE_EVENT, [template, values, item] );

		$.each(values, function(key, value) {
			if(value === undefined || value === false) {
				return true;
			}
			arr = key.split('_');
			if(arr.length > 1) {
				var el = template.find(EVENT_NS + '-'+arr[0]);

				if(el.length > 0) {
					var attr = arr[1];
					if(attr === 'replaceWith') {
						if(el[0] !== value[0]) {
							el.replaceWith(value);
						}
					} else if(attr === 'img') {
						if(el.is('img')) {
							el.attr('src', value);
						} else {
							el.replaceWith( $('<img>').attr('src', value).attr('class', el.attr('class')) );
						}
					} else {
						el.attr(arr[1], value);
					}
				}

			} else {
				template.find(EVENT_NS + '-'+key).html(value);
			}
		});
	},

	_getScrollbarSize: function() {
		// thx David
		if(mfp.scrollbarSize === undefined) {
			var scrollDiv = document.createElement("div");
			scrollDiv.style.cssText = 'width: 99px; height: 99px; overflow: scroll; position: absolute; top: -9999px;';
			document.body.appendChild(scrollDiv);
			mfp.scrollbarSize = scrollDiv.offsetWidth - scrollDiv.clientWidth;
			document.body.removeChild(scrollDiv);
		}
		return mfp.scrollbarSize;
	}

}; /* MagnificPopup core prototype end */




/**
 * Public static functions
 */
$.magnificPopup = {
	instance: null,
	proto: MagnificPopup.prototype,
	modules: [],

	open: function(options, index) {
		_checkInstance();

		if(!options) {
			options = {};
		} else {
			options = $.extend(true, {}, options);
		}

		options.isObj = true;
		options.index = index || 0;
		return this.instance.open(options);
	},

	close: function() {
		return $.magnificPopup.instance && $.magnificPopup.instance.close();
	},

	registerModule: function(name, module) {
		if(module.options) {
			$.magnificPopup.defaults[name] = module.options;
		}
		$.extend(this.proto, module.proto);
		this.modules.push(name);
	},

	defaults: {

		// Info about options is in docs:
		// http://dimsemenov.com/plugins/magnific-popup/documentation.html#options

		disableOn: 0,

		key: null,

		midClick: false,

		mainClass: '',

		preloader: true,

		focus: '', // CSS selector of input to focus after popup is opened

		closeOnContentClick: false,

		closeOnBgClick: true,

		closeBtnInside: true,

		showCloseBtn: true,

		enableEscapeKey: true,

		modal: false,

		alignTop: false,

		removalDelay: 0,

		prependTo: null,

		fixedContentPos: 'auto',

		fixedBgPos: 'auto',

		overflowY: 'auto',

		closeMarkup: '<button title="%title%" type="button" class="mfp-close">&#215;</button>',

		tClose: 'Close (Esc)',

		tLoading: 'Loading...',

		autoFocusLast: true

	}
};



$.fn.magnificPopup = function(options) {
	_checkInstance();

	var jqEl = $(this);

	// We call some API method of first param is a string
	if (typeof options === "string" ) {

		if(options === 'open') {
			var items,
				itemOpts = _isJQ ? jqEl.data('magnificPopup') : jqEl[0].magnificPopup,
				index = parseInt(arguments[1], 10) || 0;

			if(itemOpts.items) {
				items = itemOpts.items[index];
			} else {
				items = jqEl;
				if(itemOpts.delegate) {
					items = items.find(itemOpts.delegate);
				}
				items = items.eq( index );
			}
			mfp._openClick({mfpEl:items}, jqEl, itemOpts);
		} else {
			if(mfp.isOpen)
				mfp[options].apply(mfp, Array.prototype.slice.call(arguments, 1));
		}

	} else {
		// clone options obj
		options = $.extend(true, {}, options);

		/*
		 * As Zepto doesn't support .data() method for objects
		 * and it works only in normal browsers
		 * we assign "options" object directly to the DOM element. FTW!
		 */
		if(_isJQ) {
			jqEl.data('magnificPopup', options);
		} else {
			jqEl[0].magnificPopup = options;
		}

		mfp.addGroup(jqEl, options);

	}
	return jqEl;
};

/*>>core*/

/*>>inline*/

var INLINE_NS = 'inline',
	_hiddenClass,
	_inlinePlaceholder,
	_lastInlineElement,
	_putInlineElementsBack = function() {
		if(_lastInlineElement) {
			_inlinePlaceholder.after( _lastInlineElement.addClass(_hiddenClass) ).detach();
			_lastInlineElement = null;
		}
	};

$.magnificPopup.registerModule(INLINE_NS, {
	options: {
		hiddenClass: 'hide', // will be appended with `mfp-` prefix
		markup: '',
		tNotFound: 'Content not found'
	},
	proto: {

		initInline: function() {
			mfp.types.push(INLINE_NS);

			_mfpOn(CLOSE_EVENT+'.'+INLINE_NS, function() {
				_putInlineElementsBack();
			});
		},

		getInline: function(item, template) {

			_putInlineElementsBack();

			if(item.src) {
				var inlineSt = mfp.st.inline,
					el = $(item.src);

				if(el.length) {

					// If target element has parent - we replace it with placeholder and put it back after popup is closed
					var parent = el[0].parentNode;
					if(parent && parent.tagName) {
						if(!_inlinePlaceholder) {
							_hiddenClass = inlineSt.hiddenClass;
							_inlinePlaceholder = _getEl(_hiddenClass);
							_hiddenClass = 'mfp-'+_hiddenClass;
						}
						// replace target inline element with placeholder
						_lastInlineElement = el.after(_inlinePlaceholder).detach().removeClass(_hiddenClass);
					}

					mfp.updateStatus('ready');
				} else {
					mfp.updateStatus('error', inlineSt.tNotFound);
					el = $('<div>');
				}

				item.inlineElement = el;
				return el;
			}

			mfp.updateStatus('ready');
			mfp._parseMarkup(template, {}, item);
			return template;
		}
	}
});

/*>>inline*/

/*>>ajax*/
var AJAX_NS = 'ajax',
	_ajaxCur,
	_removeAjaxCursor = function() {
		if(_ajaxCur) {
			$(document.body).removeClass(_ajaxCur);
		}
	},
	_destroyAjaxRequest = function() {
		_removeAjaxCursor();
		if(mfp.req) {
			mfp.req.abort();
		}
	};

$.magnificPopup.registerModule(AJAX_NS, {

	options: {
		settings: null,
		cursor: 'mfp-ajax-cur',
		tError: '<a href="%url%">The content</a> could not be loaded.'
	},

	proto: {
		initAjax: function() {
			mfp.types.push(AJAX_NS);
			_ajaxCur = mfp.st.ajax.cursor;

			_mfpOn(CLOSE_EVENT+'.'+AJAX_NS, _destroyAjaxRequest);
			_mfpOn('BeforeChange.' + AJAX_NS, _destroyAjaxRequest);
		},
		getAjax: function(item) {

			if(_ajaxCur) {
				$(document.body).addClass(_ajaxCur);
			}

			mfp.updateStatus('loading');

			var opts = $.extend({
				url: item.src,
				success: function(data, textStatus, jqXHR) {
					var temp = {
						data:data,
						xhr:jqXHR
					};

					_mfpTrigger('ParseAjax', temp);

					mfp.appendContent( $(temp.data), AJAX_NS );

					item.finished = true;

					_removeAjaxCursor();

					mfp._setFocus();

					setTimeout(function() {
						mfp.wrap.addClass(READY_CLASS);
					}, 16);

					mfp.updateStatus('ready');

					_mfpTrigger('AjaxContentAdded');
				},
				error: function() {
					_removeAjaxCursor();
					item.finished = item.loadError = true;
					mfp.updateStatus('error', mfp.st.ajax.tError.replace('%url%', item.src));
				}
			}, mfp.st.ajax.settings);

			mfp.req = $.ajax(opts);

			return '';
		}
	}
});

/*>>ajax*/

/*>>image*/
var _imgInterval,
	_getTitle = function(item) {
		if(item.data && item.data.title !== undefined)
			return item.data.title;

		var src = mfp.st.image.titleSrc;

		if(src) {
			if($.isFunction(src)) {
				return src.call(mfp, item);
			} else if(item.el) {
				return item.el.attr(src) || '';
			}
		}
		return '';
	};

$.magnificPopup.registerModule('image', {

	options: {
		markup: '<div class="mfp-figure">'+
					'<div class="mfp-close"></div>'+
					'<figure>'+
						'<div class="mfp-img"></div>'+
						'<figcaption>'+
							'<div class="mfp-bottom-bar">'+
								'<div class="mfp-title"></div>'+
								'<div class="mfp-counter"></div>'+
							'</div>'+
						'</figcaption>'+
					'</figure>'+
				'</div>',
		cursor: 'mfp-zoom-out-cur',
		titleSrc: 'title',
		verticalFit: true,
		tError: '<a href="%url%">The image</a> could not be loaded.'
	},

	proto: {
		initImage: function() {
			var imgSt = mfp.st.image,
				ns = '.image';

			mfp.types.push('image');

			_mfpOn(OPEN_EVENT+ns, function() {
				if(mfp.currItem.type === 'image' && imgSt.cursor) {
					$(document.body).addClass(imgSt.cursor);
				}
			});

			_mfpOn(CLOSE_EVENT+ns, function() {
				if(imgSt.cursor) {
					$(document.body).removeClass(imgSt.cursor);
				}
				_window.off('resize' + EVENT_NS);
			});

			_mfpOn('Resize'+ns, mfp.resizeImage);
			if(mfp.isLowIE) {
				_mfpOn('AfterChange', mfp.resizeImage);
			}
		},
		resizeImage: function() {
			var item = mfp.currItem;
			if(!item || !item.img) return;

			if(mfp.st.image.verticalFit) {
				var decr = 0;
				// fix box-sizing in ie7/8
				if(mfp.isLowIE) {
					decr = parseInt(item.img.css('padding-top'), 10) + parseInt(item.img.css('padding-bottom'),10);
				}
				item.img.css('max-height', mfp.wH-decr);
			}
		},
		_onImageHasSize: function(item) {
			if(item.img) {

				item.hasSize = true;

				if(_imgInterval) {
					clearInterval(_imgInterval);
				}

				item.isCheckingImgSize = false;

				_mfpTrigger('ImageHasSize', item);

				if(item.imgHidden) {
					if(mfp.content)
						mfp.content.removeClass('mfp-loading');

					item.imgHidden = false;
				}

			}
		},

		/**
		 * Function that loops until the image has size to display elements that rely on it asap
		 */
		findImageSize: function(item) {

			var counter = 0,
				img = item.img[0],
				mfpSetInterval = function(delay) {

					if(_imgInterval) {
						clearInterval(_imgInterval);
					}
					// decelerating interval that checks for size of an image
					_imgInterval = setInterval(function() {
						if(img.naturalWidth > 0) {
							mfp._onImageHasSize(item);
							return;
						}

						if(counter > 200) {
							clearInterval(_imgInterval);
						}

						counter++;
						if(counter === 3) {
							mfpSetInterval(10);
						} else if(counter === 40) {
							mfpSetInterval(50);
						} else if(counter === 100) {
							mfpSetInterval(500);
						}
					}, delay);
				};

			mfpSetInterval(1);
		},

		getImage: function(item, template) {

			var guard = 0,

				// image load complete handler
				onLoadComplete = function() {
					if(item) {
						if (item.img[0].complete) {
							item.img.off('.mfploader');

							if(item === mfp.currItem){
								mfp._onImageHasSize(item);

								mfp.updateStatus('ready');
							}

							item.hasSize = true;
							item.loaded = true;

							_mfpTrigger('ImageLoadComplete');

						}
						else {
							// if image complete check fails 200 times (20 sec), we assume that there was an error.
							guard++;
							if(guard < 200) {
								setTimeout(onLoadComplete,100);
							} else {
								onLoadError();
							}
						}
					}
				},

				// image error handler
				onLoadError = function() {
					if(item) {
						item.img.off('.mfploader');
						if(item === mfp.currItem){
							mfp._onImageHasSize(item);
							mfp.updateStatus('error', imgSt.tError.replace('%url%', item.src) );
						}

						item.hasSize = true;
						item.loaded = true;
						item.loadError = true;
					}
				},
				imgSt = mfp.st.image;


			var el = template.find('.mfp-img');
			if(el.length) {
				var img = document.createElement('img');
				img.className = 'mfp-img';
				if(item.el && item.el.find('img').length) {
					img.alt = item.el.find('img').attr('alt');
				}
				item.img = $(img).on('load.mfploader', onLoadComplete).on('error.mfploader', onLoadError);
				img.src = item.src;

				// without clone() "error" event is not firing when IMG is replaced by new IMG
				// TODO: find a way to avoid such cloning
				if(el.is('img')) {
					item.img = item.img.clone();
				}

				img = item.img[0];
				if(img.naturalWidth > 0) {
					item.hasSize = true;
				} else if(!img.width) {
					item.hasSize = false;
				}
			}

			mfp._parseMarkup(template, {
				title: _getTitle(item),
				img_replaceWith: item.img
			}, item);

			mfp.resizeImage();

			if(item.hasSize) {
				if(_imgInterval) clearInterval(_imgInterval);

				if(item.loadError) {
					template.addClass('mfp-loading');
					mfp.updateStatus('error', imgSt.tError.replace('%url%', item.src) );
				} else {
					template.removeClass('mfp-loading');
					mfp.updateStatus('ready');
				}
				return template;
			}

			mfp.updateStatus('loading');
			item.loading = true;

			if(!item.hasSize) {
				item.imgHidden = true;
				template.addClass('mfp-loading');
				mfp.findImageSize(item);
			}

			return template;
		}
	}
});

/*>>image*/

/*>>zoom*/
var hasMozTransform,
	getHasMozTransform = function() {
		if(hasMozTransform === undefined) {
			hasMozTransform = document.createElement('p').style.MozTransform !== undefined;
		}
		return hasMozTransform;
	};

$.magnificPopup.registerModule('zoom', {

	options: {
		enabled: false,
		easing: 'ease-in-out',
		duration: 300,
		opener: function(element) {
			return element.is('img') ? element : element.find('img');
		}
	},

	proto: {

		initZoom: function() {
			var zoomSt = mfp.st.zoom,
				ns = '.zoom',
				image;

			if(!zoomSt.enabled || !mfp.supportsTransition) {
				return;
			}

			var duration = zoomSt.duration,
				getElToAnimate = function(image) {
					var newImg = image.clone().removeAttr('style').removeAttr('class').addClass('mfp-animated-image'),
						transition = 'all '+(zoomSt.duration/1000)+'s ' + zoomSt.easing,
						cssObj = {
							position: 'fixed',
							zIndex: 9999,
							left: 0,
							top: 0,
							'-webkit-backface-visibility': 'hidden'
						},
						t = 'transition';

					cssObj['-webkit-'+t] = cssObj['-moz-'+t] = cssObj['-o-'+t] = cssObj[t] = transition;

					newImg.css(cssObj);
					return newImg;
				},
				showMainContent = function() {
					mfp.content.css('visibility', 'visible');
				},
				openTimeout,
				animatedImg;

			_mfpOn('BuildControls'+ns, function() {
				if(mfp._allowZoom()) {

					clearTimeout(openTimeout);
					mfp.content.css('visibility', 'hidden');

					// Basically, all code below does is clones existing image, puts in on top of the current one and animated it

					image = mfp._getItemToZoom();

					if(!image) {
						showMainContent();
						return;
					}

					animatedImg = getElToAnimate(image);

					animatedImg.css( mfp._getOffset() );

					mfp.wrap.append(animatedImg);

					openTimeout = setTimeout(function() {
						animatedImg.css( mfp._getOffset( true ) );
						openTimeout = setTimeout(function() {

							showMainContent();

							setTimeout(function() {
								animatedImg.remove();
								image = animatedImg = null;
								_mfpTrigger('ZoomAnimationEnded');
							}, 16); // avoid blink when switching images

						}, duration); // this timeout equals animation duration

					}, 16); // by adding this timeout we avoid short glitch at the beginning of animation


					// Lots of timeouts...
				}
			});
			_mfpOn(BEFORE_CLOSE_EVENT+ns, function() {
				if(mfp._allowZoom()) {

					clearTimeout(openTimeout);

					mfp.st.removalDelay = duration;

					if(!image) {
						image = mfp._getItemToZoom();
						if(!image) {
							return;
						}
						animatedImg = getElToAnimate(image);
					}

					animatedImg.css( mfp._getOffset(true) );
					mfp.wrap.append(animatedImg);
					mfp.content.css('visibility', 'hidden');

					setTimeout(function() {
						animatedImg.css( mfp._getOffset() );
					}, 16);
				}

			});

			_mfpOn(CLOSE_EVENT+ns, function() {
				if(mfp._allowZoom()) {
					showMainContent();
					if(animatedImg) {
						animatedImg.remove();
					}
					image = null;
				}
			});
		},

		_allowZoom: function() {
			return mfp.currItem.type === 'image';
		},

		_getItemToZoom: function() {
			if(mfp.currItem.hasSize) {
				return mfp.currItem.img;
			} else {
				return false;
			}
		},

		// Get element postion relative to viewport
		_getOffset: function(isLarge) {
			var el;
			if(isLarge) {
				el = mfp.currItem.img;
			} else {
				el = mfp.st.zoom.opener(mfp.currItem.el || mfp.currItem);
			}

			var offset = el.offset();
			var paddingTop = parseInt(el.css('padding-top'),10);
			var paddingBottom = parseInt(el.css('padding-bottom'),10);
			offset.top -= ( $(window).scrollTop() - paddingTop );


			/*

			Animating left + top + width/height looks glitchy in Firefox, but perfect in Chrome. And vice-versa.

			 */
			var obj = {
				width: el.width(),
				// fix Zepto height+padding issue
				height: (_isJQ ? el.innerHeight() : el[0].offsetHeight) - paddingBottom - paddingTop
			};

			// I hate to do this, but there is no another option
			if( getHasMozTransform() ) {
				obj['-moz-transform'] = obj['transform'] = 'translate(' + offset.left + 'px,' + offset.top + 'px)';
			} else {
				obj.left = offset.left;
				obj.top = offset.top;
			}
			return obj;
		}

	}
});



/*>>zoom*/

/*>>iframe*/

var IFRAME_NS = 'iframe',
	_emptyPage = '//about:blank',

	_fixIframeBugs = function(isShowing) {
		if(mfp.currTemplate[IFRAME_NS]) {
			var el = mfp.currTemplate[IFRAME_NS].find('iframe');
			if(el.length) {
				// reset src after the popup is closed to avoid "video keeps playing after popup is closed" bug
				if(!isShowing) {
					el[0].src = _emptyPage;
				}

				// IE8 black screen bug fix
				if(mfp.isIE8) {
					el.css('display', isShowing ? 'block' : 'none');
				}
			}
		}
	};

$.magnificPopup.registerModule(IFRAME_NS, {

	options: {
		markup: '<div class="mfp-iframe-scaler">'+
					'<div class="mfp-close"></div>'+
					'<iframe class="mfp-iframe" src="//about:blank" frameborder="0" allowfullscreen></iframe>'+
				'</div>',

		srcAction: 'iframe_src',

		// we don't care and support only one default type of URL by default
		patterns: {
			youtube: {
				index: 'youtube.com',
				id: 'v=',
				src: '//www.youtube.com/embed/%id%?autoplay=1'
			},
			vimeo: {
				index: 'vimeo.com/',
				id: '/',
				src: '//player.vimeo.com/video/%id%?autoplay=1'
			},
			gmaps: {
				index: '//maps.google.',
				src: '%id%&output=embed'
			}
		}
	},

	proto: {
		initIframe: function() {
			mfp.types.push(IFRAME_NS);

			_mfpOn('BeforeChange', function(e, prevType, newType) {
				if(prevType !== newType) {
					if(prevType === IFRAME_NS) {
						_fixIframeBugs(); // iframe if removed
					} else if(newType === IFRAME_NS) {
						_fixIframeBugs(true); // iframe is showing
					}
				}// else {
					// iframe source is switched, don't do anything
				//}
			});

			_mfpOn(CLOSE_EVENT + '.' + IFRAME_NS, function() {
				_fixIframeBugs();
			});
		},

		getIframe: function(item, template) {
			var embedSrc = item.src;
			var iframeSt = mfp.st.iframe;

			$.each(iframeSt.patterns, function() {
				if(embedSrc.indexOf( this.index ) > -1) {
					if(this.id) {
						if(typeof this.id === 'string') {
							embedSrc = embedSrc.substr(embedSrc.lastIndexOf(this.id)+this.id.length, embedSrc.length);
						} else {
							embedSrc = this.id.call( this, embedSrc );
						}
					}
					embedSrc = this.src.replace('%id%', embedSrc );
					return false; // break;
				}
			});

			var dataObj = {};
			if(iframeSt.srcAction) {
				dataObj[iframeSt.srcAction] = embedSrc;
			}
			mfp._parseMarkup(template, dataObj, item);

			mfp.updateStatus('ready');

			return template;
		}
	}
});



/*>>iframe*/

/*>>gallery*/
/**
 * Get looped index depending on number of slides
 */
var _getLoopedId = function(index) {
		var numSlides = mfp.items.length;
		if(index > numSlides - 1) {
			return index - numSlides;
		} else  if(index < 0) {
			return numSlides + index;
		}
		return index;
	},
	_replaceCurrTotal = function(text, curr, total) {
		return text.replace(/%curr%/gi, curr + 1).replace(/%total%/gi, total);
	};

$.magnificPopup.registerModule('gallery', {

	options: {
		enabled: false,
		arrowMarkup: '<button title="%title%" type="button" class="mfp-arrow mfp-arrow-%dir%"></button>',
		preload: [0,2],
		navigateByImgClick: true,
		arrows: true,

		tPrev: 'Previous (Left arrow key)',
		tNext: 'Next (Right arrow key)',
		tCounter: '%curr% of %total%'
	},

	proto: {
		initGallery: function() {

			var gSt = mfp.st.gallery,
				ns = '.mfp-gallery';

			mfp.direction = true; // true - next, false - prev

			if(!gSt || !gSt.enabled ) return false;

			_wrapClasses += ' mfp-gallery';

			_mfpOn(OPEN_EVENT+ns, function() {

				if(gSt.navigateByImgClick) {
					mfp.wrap.on('click'+ns, '.mfp-img', function() {
						if(mfp.items.length > 1) {
							mfp.next();
							return false;
						}
					});
				}

				_document.on('keydown'+ns, function(e) {
					if (e.keyCode === 37) {
						mfp.prev();
					} else if (e.keyCode === 39) {
						mfp.next();
					}
				});
			});

			_mfpOn('UpdateStatus'+ns, function(e, data) {
				if(data.text) {
					data.text = _replaceCurrTotal(data.text, mfp.currItem.index, mfp.items.length);
				}
			});

			_mfpOn(MARKUP_PARSE_EVENT+ns, function(e, element, values, item) {
				var l = mfp.items.length;
				values.counter = l > 1 ? _replaceCurrTotal(gSt.tCounter, item.index, l) : '';
			});

			_mfpOn('BuildControls' + ns, function() {
				if(mfp.items.length > 1 && gSt.arrows && !mfp.arrowLeft) {
					var markup = gSt.arrowMarkup,
						arrowLeft = mfp.arrowLeft = $( markup.replace(/%title%/gi, gSt.tPrev).replace(/%dir%/gi, 'left') ).addClass(PREVENT_CLOSE_CLASS),
						arrowRight = mfp.arrowRight = $( markup.replace(/%title%/gi, gSt.tNext).replace(/%dir%/gi, 'right') ).addClass(PREVENT_CLOSE_CLASS);

					arrowLeft.click(function() {
						mfp.prev();
					});
					arrowRight.click(function() {
						mfp.next();
					});

					mfp.container.append(arrowLeft.add(arrowRight));
				}
			});

			_mfpOn(CHANGE_EVENT+ns, function() {
				if(mfp._preloadTimeout) clearTimeout(mfp._preloadTimeout);

				mfp._preloadTimeout = setTimeout(function() {
					mfp.preloadNearbyImages();
					mfp._preloadTimeout = null;
				}, 16);
			});


			_mfpOn(CLOSE_EVENT+ns, function() {
				_document.off(ns);
				mfp.wrap.off('click'+ns);
				mfp.arrowRight = mfp.arrowLeft = null;
			});

		},
		next: function() {
			mfp.direction = true;
			mfp.index = _getLoopedId(mfp.index + 1);
			mfp.updateItemHTML();
		},
		prev: function() {
			mfp.direction = false;
			mfp.index = _getLoopedId(mfp.index - 1);
			mfp.updateItemHTML();
		},
		goTo: function(newIndex) {
			mfp.direction = (newIndex >= mfp.index);
			mfp.index = newIndex;
			mfp.updateItemHTML();
		},
		preloadNearbyImages: function() {
			var p = mfp.st.gallery.preload,
				preloadBefore = Math.min(p[0], mfp.items.length),
				preloadAfter = Math.min(p[1], mfp.items.length),
				i;

			for(i = 1; i <= (mfp.direction ? preloadAfter : preloadBefore); i++) {
				mfp._preloadItem(mfp.index+i);
			}
			for(i = 1; i <= (mfp.direction ? preloadBefore : preloadAfter); i++) {
				mfp._preloadItem(mfp.index-i);
			}
		},
		_preloadItem: function(index) {
			index = _getLoopedId(index);

			if(mfp.items[index].preloaded) {
				return;
			}

			var item = mfp.items[index];
			if(!item.parsed) {
				item = mfp.parseEl( index );
			}

			_mfpTrigger('LazyLoad', item);

			if(item.type === 'image') {
				item.img = $('<img class="mfp-img" />').on('load.mfploader', function() {
					item.hasSize = true;
				}).on('error.mfploader', function() {
					item.hasSize = true;
					item.loadError = true;
					_mfpTrigger('LazyLoadError', item);
				}).attr('src', item.src);
			}


			item.preloaded = true;
		}
	}
});

/*>>gallery*/

/*>>retina*/

var RETINA_NS = 'retina';

$.magnificPopup.registerModule(RETINA_NS, {
	options: {
		replaceSrc: function(item) {
			return item.src.replace(/\.\w+$/, function(m) { return '@2x' + m; });
		},
		ratio: 1 // Function or number.  Set to 1 to disable.
	},
	proto: {
		initRetina: function() {
			if(window.devicePixelRatio > 1) {

				var st = mfp.st.retina,
					ratio = st.ratio;

				ratio = !isNaN(ratio) ? ratio : ratio();

				if(ratio > 1) {
					_mfpOn('ImageHasSize' + '.' + RETINA_NS, function(e, item) {
						item.img.css({
							'max-width': item.img[0].naturalWidth / ratio,
							'width': '100%'
						});
					});
					_mfpOn('ElementParse' + '.' + RETINA_NS, function(e, item) {
						item.src = st.replaceSrc(item, ratio);
					});
				}
			}

		}
	}
});

/*>>retina*/
 _checkInstance(); }));
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJtYWduaWZpYy1wb3B1cC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIvKiEgTWFnbmlmaWMgUG9wdXAgLSB2MS4xLjAgLSAyMDE2LTAyLTIwXG4qIGh0dHA6Ly9kaW1zZW1lbm92LmNvbS9wbHVnaW5zL21hZ25pZmljLXBvcHVwL1xuKiBDb3B5cmlnaHQgKGMpIDIwMTYgRG1pdHJ5IFNlbWVub3Y7ICovXG47KGZ1bmN0aW9uIChmYWN0b3J5KSB7IFxuaWYgKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZCkgeyBcbiAvLyBBTUQuIFJlZ2lzdGVyIGFzIGFuIGFub255bW91cyBtb2R1bGUuIFxuIGRlZmluZShbJ2pxdWVyeSddLCBmYWN0b3J5KTsgXG4gfSBlbHNlIGlmICh0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcpIHsgXG4gLy8gTm9kZS9Db21tb25KUyBcbiBmYWN0b3J5KHJlcXVpcmUoJ2pxdWVyeScpKTsgXG4gfSBlbHNlIHsgXG4gLy8gQnJvd3NlciBnbG9iYWxzIFxuIGZhY3Rvcnkod2luZG93LmpRdWVyeSB8fCB3aW5kb3cuWmVwdG8pOyBcbiB9IFxuIH0oZnVuY3Rpb24oJCkgeyBcblxuLyo+PmNvcmUqL1xuLyoqXG4gKiBcbiAqIE1hZ25pZmljIFBvcHVwIENvcmUgSlMgZmlsZVxuICogXG4gKi9cblxuXG4vKipcbiAqIFByaXZhdGUgc3RhdGljIGNvbnN0YW50c1xuICovXG52YXIgQ0xPU0VfRVZFTlQgPSAnQ2xvc2UnLFxuXHRCRUZPUkVfQ0xPU0VfRVZFTlQgPSAnQmVmb3JlQ2xvc2UnLFxuXHRBRlRFUl9DTE9TRV9FVkVOVCA9ICdBZnRlckNsb3NlJyxcblx0QkVGT1JFX0FQUEVORF9FVkVOVCA9ICdCZWZvcmVBcHBlbmQnLFxuXHRNQVJLVVBfUEFSU0VfRVZFTlQgPSAnTWFya3VwUGFyc2UnLFxuXHRPUEVOX0VWRU5UID0gJ09wZW4nLFxuXHRDSEFOR0VfRVZFTlQgPSAnQ2hhbmdlJyxcblx0TlMgPSAnbWZwJyxcblx0RVZFTlRfTlMgPSAnLicgKyBOUyxcblx0UkVBRFlfQ0xBU1MgPSAnbWZwLXJlYWR5Jyxcblx0UkVNT1ZJTkdfQ0xBU1MgPSAnbWZwLXJlbW92aW5nJyxcblx0UFJFVkVOVF9DTE9TRV9DTEFTUyA9ICdtZnAtcHJldmVudC1jbG9zZSc7XG5cblxuLyoqXG4gKiBQcml2YXRlIHZhcnMgXG4gKi9cbi8qanNoaW50IC1XMDc5ICovXG52YXIgbWZwLCAvLyBBcyB3ZSBoYXZlIG9ubHkgb25lIGluc3RhbmNlIG9mIE1hZ25pZmljUG9wdXAgb2JqZWN0LCB3ZSBkZWZpbmUgaXQgbG9jYWxseSB0byBub3QgdG8gdXNlICd0aGlzJ1xuXHRNYWduaWZpY1BvcHVwID0gZnVuY3Rpb24oKXt9LFxuXHRfaXNKUSA9ICEhKHdpbmRvdy5qUXVlcnkpLFxuXHRfcHJldlN0YXR1cyxcblx0X3dpbmRvdyA9ICQod2luZG93KSxcblx0X2RvY3VtZW50LFxuXHRfcHJldkNvbnRlbnRUeXBlLFxuXHRfd3JhcENsYXNzZXMsXG5cdF9jdXJyUG9wdXBUeXBlO1xuXG5cbi8qKlxuICogUHJpdmF0ZSBmdW5jdGlvbnNcbiAqL1xudmFyIF9tZnBPbiA9IGZ1bmN0aW9uKG5hbWUsIGYpIHtcblx0XHRtZnAuZXYub24oTlMgKyBuYW1lICsgRVZFTlRfTlMsIGYpO1xuXHR9LFxuXHRfZ2V0RWwgPSBmdW5jdGlvbihjbGFzc05hbWUsIGFwcGVuZFRvLCBodG1sLCByYXcpIHtcblx0XHR2YXIgZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcblx0XHRlbC5jbGFzc05hbWUgPSAnbWZwLScrY2xhc3NOYW1lO1xuXHRcdGlmKGh0bWwpIHtcblx0XHRcdGVsLmlubmVySFRNTCA9IGh0bWw7XG5cdFx0fVxuXHRcdGlmKCFyYXcpIHtcblx0XHRcdGVsID0gJChlbCk7XG5cdFx0XHRpZihhcHBlbmRUbykge1xuXHRcdFx0XHRlbC5hcHBlbmRUbyhhcHBlbmRUbyk7XG5cdFx0XHR9XG5cdFx0fSBlbHNlIGlmKGFwcGVuZFRvKSB7XG5cdFx0XHRhcHBlbmRUby5hcHBlbmRDaGlsZChlbCk7XG5cdFx0fVxuXHRcdHJldHVybiBlbDtcblx0fSxcblx0X21mcFRyaWdnZXIgPSBmdW5jdGlvbihlLCBkYXRhKSB7XG5cdFx0bWZwLmV2LnRyaWdnZXJIYW5kbGVyKE5TICsgZSwgZGF0YSk7XG5cblx0XHRpZihtZnAuc3QuY2FsbGJhY2tzKSB7XG5cdFx0XHQvLyBjb252ZXJ0cyBcIm1mcEV2ZW50TmFtZVwiIHRvIFwiZXZlbnROYW1lXCIgY2FsbGJhY2sgYW5kIHRyaWdnZXJzIGl0IGlmIGl0J3MgcHJlc2VudFxuXHRcdFx0ZSA9IGUuY2hhckF0KDApLnRvTG93ZXJDYXNlKCkgKyBlLnNsaWNlKDEpO1xuXHRcdFx0aWYobWZwLnN0LmNhbGxiYWNrc1tlXSkge1xuXHRcdFx0XHRtZnAuc3QuY2FsbGJhY2tzW2VdLmFwcGx5KG1mcCwgJC5pc0FycmF5KGRhdGEpID8gZGF0YSA6IFtkYXRhXSk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9LFxuXHRfZ2V0Q2xvc2VCdG4gPSBmdW5jdGlvbih0eXBlKSB7XG5cdFx0aWYodHlwZSAhPT0gX2N1cnJQb3B1cFR5cGUgfHwgIW1mcC5jdXJyVGVtcGxhdGUuY2xvc2VCdG4pIHtcblx0XHRcdG1mcC5jdXJyVGVtcGxhdGUuY2xvc2VCdG4gPSAkKCBtZnAuc3QuY2xvc2VNYXJrdXAucmVwbGFjZSgnJXRpdGxlJScsIG1mcC5zdC50Q2xvc2UgKSApO1xuXHRcdFx0X2N1cnJQb3B1cFR5cGUgPSB0eXBlO1xuXHRcdH1cblx0XHRyZXR1cm4gbWZwLmN1cnJUZW1wbGF0ZS5jbG9zZUJ0bjtcblx0fSxcblx0Ly8gSW5pdGlhbGl6ZSBNYWduaWZpYyBQb3B1cCBvbmx5IHdoZW4gY2FsbGVkIGF0IGxlYXN0IG9uY2Vcblx0X2NoZWNrSW5zdGFuY2UgPSBmdW5jdGlvbigpIHtcblx0XHRpZighJC5tYWduaWZpY1BvcHVwLmluc3RhbmNlKSB7XG5cdFx0XHQvKmpzaGludCAtVzAyMCAqL1xuXHRcdFx0bWZwID0gbmV3IE1hZ25pZmljUG9wdXAoKTtcblx0XHRcdG1mcC5pbml0KCk7XG5cdFx0XHQkLm1hZ25pZmljUG9wdXAuaW5zdGFuY2UgPSBtZnA7XG5cdFx0fVxuXHR9LFxuXHQvLyBDU1MgdHJhbnNpdGlvbiBkZXRlY3Rpb24sIGh0dHA6Ly9zdGFja292ZXJmbG93LmNvbS9xdWVzdGlvbnMvNzI2NDg5OS9kZXRlY3QtY3NzLXRyYW5zaXRpb25zLXVzaW5nLWphdmFzY3JpcHQtYW5kLXdpdGhvdXQtbW9kZXJuaXpyXG5cdHN1cHBvcnRzVHJhbnNpdGlvbnMgPSBmdW5jdGlvbigpIHtcblx0XHR2YXIgcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3AnKS5zdHlsZSwgLy8gJ3MnIGZvciBzdHlsZS4gYmV0dGVyIHRvIGNyZWF0ZSBhbiBlbGVtZW50IGlmIGJvZHkgeWV0IHRvIGV4aXN0XG5cdFx0XHR2ID0gWydtcycsJ08nLCdNb3onLCdXZWJraXQnXTsgLy8gJ3YnIGZvciB2ZW5kb3JcblxuXHRcdGlmKCBzWyd0cmFuc2l0aW9uJ10gIT09IHVuZGVmaW5lZCApIHtcblx0XHRcdHJldHVybiB0cnVlOyBcblx0XHR9XG5cdFx0XHRcblx0XHR3aGlsZSggdi5sZW5ndGggKSB7XG5cdFx0XHRpZiggdi5wb3AoKSArICdUcmFuc2l0aW9uJyBpbiBzICkge1xuXHRcdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHRcdH1cblx0XHR9XG5cdFx0XHRcdFxuXHRcdHJldHVybiBmYWxzZTtcblx0fTtcblxuXG5cbi8qKlxuICogUHVibGljIGZ1bmN0aW9uc1xuICovXG5NYWduaWZpY1BvcHVwLnByb3RvdHlwZSA9IHtcblxuXHRjb25zdHJ1Y3RvcjogTWFnbmlmaWNQb3B1cCxcblxuXHQvKipcblx0ICogSW5pdGlhbGl6ZXMgTWFnbmlmaWMgUG9wdXAgcGx1Z2luLiBcblx0ICogVGhpcyBmdW5jdGlvbiBpcyB0cmlnZ2VyZWQgb25seSBvbmNlIHdoZW4gJC5mbi5tYWduaWZpY1BvcHVwIG9yICQubWFnbmlmaWNQb3B1cCBpcyBleGVjdXRlZFxuXHQgKi9cblx0aW5pdDogZnVuY3Rpb24oKSB7XG5cdFx0dmFyIGFwcFZlcnNpb24gPSBuYXZpZ2F0b3IuYXBwVmVyc2lvbjtcblx0XHRtZnAuaXNMb3dJRSA9IG1mcC5pc0lFOCA9IGRvY3VtZW50LmFsbCAmJiAhZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcjtcblx0XHRtZnAuaXNBbmRyb2lkID0gKC9hbmRyb2lkL2dpKS50ZXN0KGFwcFZlcnNpb24pO1xuXHRcdG1mcC5pc0lPUyA9ICgvaXBob25lfGlwYWR8aXBvZC9naSkudGVzdChhcHBWZXJzaW9uKTtcblx0XHRtZnAuc3VwcG9ydHNUcmFuc2l0aW9uID0gc3VwcG9ydHNUcmFuc2l0aW9ucygpO1xuXG5cdFx0Ly8gV2UgZGlzYWJsZSBmaXhlZCBwb3NpdGlvbmVkIGxpZ2h0Ym94IG9uIGRldmljZXMgdGhhdCBkb24ndCBoYW5kbGUgaXQgbmljZWx5LlxuXHRcdC8vIElmIHlvdSBrbm93IGEgYmV0dGVyIHdheSBvZiBkZXRlY3RpbmcgdGhpcyAtIGxldCBtZSBrbm93LlxuXHRcdG1mcC5wcm9iYWJseU1vYmlsZSA9IChtZnAuaXNBbmRyb2lkIHx8IG1mcC5pc0lPUyB8fCAvKE9wZXJhIE1pbmkpfEtpbmRsZXx3ZWJPU3xCbGFja0JlcnJ5fChPcGVyYSBNb2JpKXwoV2luZG93cyBQaG9uZSl8SUVNb2JpbGUvaS50ZXN0KG5hdmlnYXRvci51c2VyQWdlbnQpICk7XG5cdFx0X2RvY3VtZW50ID0gJChkb2N1bWVudCk7XG5cblx0XHRtZnAucG9wdXBzQ2FjaGUgPSB7fTtcblx0fSxcblxuXHQvKipcblx0ICogT3BlbnMgcG9wdXBcblx0ICogQHBhcmFtICBkYXRhIFtkZXNjcmlwdGlvbl1cblx0ICovXG5cdG9wZW46IGZ1bmN0aW9uKGRhdGEpIHtcblxuXHRcdHZhciBpO1xuXG5cdFx0aWYoZGF0YS5pc09iaiA9PT0gZmFsc2UpIHsgXG5cdFx0XHQvLyBjb252ZXJ0IGpRdWVyeSBjb2xsZWN0aW9uIHRvIGFycmF5IHRvIGF2b2lkIGNvbmZsaWN0cyBsYXRlclxuXHRcdFx0bWZwLml0ZW1zID0gZGF0YS5pdGVtcy50b0FycmF5KCk7XG5cblx0XHRcdG1mcC5pbmRleCA9IDA7XG5cdFx0XHR2YXIgaXRlbXMgPSBkYXRhLml0ZW1zLFxuXHRcdFx0XHRpdGVtO1xuXHRcdFx0Zm9yKGkgPSAwOyBpIDwgaXRlbXMubGVuZ3RoOyBpKyspIHtcblx0XHRcdFx0aXRlbSA9IGl0ZW1zW2ldO1xuXHRcdFx0XHRpZihpdGVtLnBhcnNlZCkge1xuXHRcdFx0XHRcdGl0ZW0gPSBpdGVtLmVsWzBdO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGlmKGl0ZW0gPT09IGRhdGEuZWxbMF0pIHtcblx0XHRcdFx0XHRtZnAuaW5kZXggPSBpO1xuXHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fSBlbHNlIHtcblx0XHRcdG1mcC5pdGVtcyA9ICQuaXNBcnJheShkYXRhLml0ZW1zKSA/IGRhdGEuaXRlbXMgOiBbZGF0YS5pdGVtc107XG5cdFx0XHRtZnAuaW5kZXggPSBkYXRhLmluZGV4IHx8IDA7XG5cdFx0fVxuXG5cdFx0Ly8gaWYgcG9wdXAgaXMgYWxyZWFkeSBvcGVuZWQgLSB3ZSBqdXN0IHVwZGF0ZSB0aGUgY29udGVudFxuXHRcdGlmKG1mcC5pc09wZW4pIHtcblx0XHRcdG1mcC51cGRhdGVJdGVtSFRNTCgpO1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblx0XHRcblx0XHRtZnAudHlwZXMgPSBbXTsgXG5cdFx0X3dyYXBDbGFzc2VzID0gJyc7XG5cdFx0aWYoZGF0YS5tYWluRWwgJiYgZGF0YS5tYWluRWwubGVuZ3RoKSB7XG5cdFx0XHRtZnAuZXYgPSBkYXRhLm1haW5FbC5lcSgwKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0bWZwLmV2ID0gX2RvY3VtZW50O1xuXHRcdH1cblxuXHRcdGlmKGRhdGEua2V5KSB7XG5cdFx0XHRpZighbWZwLnBvcHVwc0NhY2hlW2RhdGEua2V5XSkge1xuXHRcdFx0XHRtZnAucG9wdXBzQ2FjaGVbZGF0YS5rZXldID0ge307XG5cdFx0XHR9XG5cdFx0XHRtZnAuY3VyclRlbXBsYXRlID0gbWZwLnBvcHVwc0NhY2hlW2RhdGEua2V5XTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0bWZwLmN1cnJUZW1wbGF0ZSA9IHt9O1xuXHRcdH1cblxuXG5cblx0XHRtZnAuc3QgPSAkLmV4dGVuZCh0cnVlLCB7fSwgJC5tYWduaWZpY1BvcHVwLmRlZmF1bHRzLCBkYXRhICk7IFxuXHRcdG1mcC5maXhlZENvbnRlbnRQb3MgPSBtZnAuc3QuZml4ZWRDb250ZW50UG9zID09PSAnYXV0bycgPyAhbWZwLnByb2JhYmx5TW9iaWxlIDogbWZwLnN0LmZpeGVkQ29udGVudFBvcztcblxuXHRcdGlmKG1mcC5zdC5tb2RhbCkge1xuXHRcdFx0bWZwLnN0LmNsb3NlT25Db250ZW50Q2xpY2sgPSBmYWxzZTtcblx0XHRcdG1mcC5zdC5jbG9zZU9uQmdDbGljayA9IGZhbHNlO1xuXHRcdFx0bWZwLnN0LnNob3dDbG9zZUJ0biA9IGZhbHNlO1xuXHRcdFx0bWZwLnN0LmVuYWJsZUVzY2FwZUtleSA9IGZhbHNlO1xuXHRcdH1cblx0XHRcblxuXHRcdC8vIEJ1aWxkaW5nIG1hcmt1cFxuXHRcdC8vIG1haW4gY29udGFpbmVycyBhcmUgY3JlYXRlZCBvbmx5IG9uY2Vcblx0XHRpZighbWZwLmJnT3ZlcmxheSkge1xuXG5cdFx0XHQvLyBEYXJrIG92ZXJsYXlcblx0XHRcdG1mcC5iZ092ZXJsYXkgPSBfZ2V0RWwoJ2JnJykub24oJ2NsaWNrJytFVkVOVF9OUywgZnVuY3Rpb24oKSB7XG5cdFx0XHRcdG1mcC5jbG9zZSgpO1xuXHRcdFx0fSk7XG5cblx0XHRcdG1mcC53cmFwID0gX2dldEVsKCd3cmFwJykuYXR0cigndGFiaW5kZXgnLCAtMSkub24oJ2NsaWNrJytFVkVOVF9OUywgZnVuY3Rpb24oZSkge1xuXHRcdFx0XHRpZihtZnAuX2NoZWNrSWZDbG9zZShlLnRhcmdldCkpIHtcblx0XHRcdFx0XHRtZnAuY2xvc2UoKTtcblx0XHRcdFx0fVxuXHRcdFx0fSk7XG5cblx0XHRcdG1mcC5jb250YWluZXIgPSBfZ2V0RWwoJ2NvbnRhaW5lcicsIG1mcC53cmFwKTtcblx0XHR9XG5cblx0XHRtZnAuY29udGVudENvbnRhaW5lciA9IF9nZXRFbCgnY29udGVudCcpO1xuXHRcdGlmKG1mcC5zdC5wcmVsb2FkZXIpIHtcblx0XHRcdG1mcC5wcmVsb2FkZXIgPSBfZ2V0RWwoJ3ByZWxvYWRlcicsIG1mcC5jb250YWluZXIsIG1mcC5zdC50TG9hZGluZyk7XG5cdFx0fVxuXG5cblx0XHQvLyBJbml0aWFsaXppbmcgbW9kdWxlc1xuXHRcdHZhciBtb2R1bGVzID0gJC5tYWduaWZpY1BvcHVwLm1vZHVsZXM7XG5cdFx0Zm9yKGkgPSAwOyBpIDwgbW9kdWxlcy5sZW5ndGg7IGkrKykge1xuXHRcdFx0dmFyIG4gPSBtb2R1bGVzW2ldO1xuXHRcdFx0biA9IG4uY2hhckF0KDApLnRvVXBwZXJDYXNlKCkgKyBuLnNsaWNlKDEpO1xuXHRcdFx0bWZwWydpbml0JytuXS5jYWxsKG1mcCk7XG5cdFx0fVxuXHRcdF9tZnBUcmlnZ2VyKCdCZWZvcmVPcGVuJyk7XG5cblxuXHRcdGlmKG1mcC5zdC5zaG93Q2xvc2VCdG4pIHtcblx0XHRcdC8vIENsb3NlIGJ1dHRvblxuXHRcdFx0aWYoIW1mcC5zdC5jbG9zZUJ0bkluc2lkZSkge1xuXHRcdFx0XHRtZnAud3JhcC5hcHBlbmQoIF9nZXRDbG9zZUJ0bigpICk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRfbWZwT24oTUFSS1VQX1BBUlNFX0VWRU5ULCBmdW5jdGlvbihlLCB0ZW1wbGF0ZSwgdmFsdWVzLCBpdGVtKSB7XG5cdFx0XHRcdFx0dmFsdWVzLmNsb3NlX3JlcGxhY2VXaXRoID0gX2dldENsb3NlQnRuKGl0ZW0udHlwZSk7XG5cdFx0XHRcdH0pO1xuXHRcdFx0XHRfd3JhcENsYXNzZXMgKz0gJyBtZnAtY2xvc2UtYnRuLWluJztcblx0XHRcdH1cblx0XHR9XG5cblx0XHRpZihtZnAuc3QuYWxpZ25Ub3ApIHtcblx0XHRcdF93cmFwQ2xhc3NlcyArPSAnIG1mcC1hbGlnbi10b3AnO1xuXHRcdH1cblxuXHRcblxuXHRcdGlmKG1mcC5maXhlZENvbnRlbnRQb3MpIHtcblx0XHRcdG1mcC53cmFwLmNzcyh7XG5cdFx0XHRcdG92ZXJmbG93OiBtZnAuc3Qub3ZlcmZsb3dZLFxuXHRcdFx0XHRvdmVyZmxvd1g6ICdoaWRkZW4nLFxuXHRcdFx0XHRvdmVyZmxvd1k6IG1mcC5zdC5vdmVyZmxvd1lcblx0XHRcdH0pO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRtZnAud3JhcC5jc3MoeyBcblx0XHRcdFx0dG9wOiBfd2luZG93LnNjcm9sbFRvcCgpLFxuXHRcdFx0XHRwb3NpdGlvbjogJ2Fic29sdXRlJ1xuXHRcdFx0fSk7XG5cdFx0fVxuXHRcdGlmKCBtZnAuc3QuZml4ZWRCZ1BvcyA9PT0gZmFsc2UgfHwgKG1mcC5zdC5maXhlZEJnUG9zID09PSAnYXV0bycgJiYgIW1mcC5maXhlZENvbnRlbnRQb3MpICkge1xuXHRcdFx0bWZwLmJnT3ZlcmxheS5jc3Moe1xuXHRcdFx0XHRoZWlnaHQ6IF9kb2N1bWVudC5oZWlnaHQoKSxcblx0XHRcdFx0cG9zaXRpb246ICdhYnNvbHV0ZSdcblx0XHRcdH0pO1xuXHRcdH1cblxuXHRcdFxuXG5cdFx0aWYobWZwLnN0LmVuYWJsZUVzY2FwZUtleSkge1xuXHRcdFx0Ly8gQ2xvc2Ugb24gRVNDIGtleVxuXHRcdFx0X2RvY3VtZW50Lm9uKCdrZXl1cCcgKyBFVkVOVF9OUywgZnVuY3Rpb24oZSkge1xuXHRcdFx0XHRpZihlLmtleUNvZGUgPT09IDI3KSB7XG5cdFx0XHRcdFx0bWZwLmNsb3NlKCk7XG5cdFx0XHRcdH1cblx0XHRcdH0pO1xuXHRcdH1cblxuXHRcdF93aW5kb3cub24oJ3Jlc2l6ZScgKyBFVkVOVF9OUywgZnVuY3Rpb24oKSB7XG5cdFx0XHRtZnAudXBkYXRlU2l6ZSgpO1xuXHRcdH0pO1xuXG5cblx0XHRpZighbWZwLnN0LmNsb3NlT25Db250ZW50Q2xpY2spIHtcblx0XHRcdF93cmFwQ2xhc3NlcyArPSAnIG1mcC1hdXRvLWN1cnNvcic7XG5cdFx0fVxuXHRcdFxuXHRcdGlmKF93cmFwQ2xhc3Nlcylcblx0XHRcdG1mcC53cmFwLmFkZENsYXNzKF93cmFwQ2xhc3Nlcyk7XG5cblxuXHRcdC8vIHRoaXMgdHJpZ2dlcnMgcmVjYWxjdWxhdGlvbiBvZiBsYXlvdXQsIHNvIHdlIGdldCBpdCBvbmNlIHRvIG5vdCB0byB0cmlnZ2VyIHR3aWNlXG5cdFx0dmFyIHdpbmRvd0hlaWdodCA9IG1mcC53SCA9IF93aW5kb3cuaGVpZ2h0KCk7XG5cblx0XHRcblx0XHR2YXIgd2luZG93U3R5bGVzID0ge307XG5cblx0XHRpZiggbWZwLmZpeGVkQ29udGVudFBvcyApIHtcbiAgICAgICAgICAgIGlmKG1mcC5faGFzU2Nyb2xsQmFyKHdpbmRvd0hlaWdodCkpe1xuICAgICAgICAgICAgICAgIHZhciBzID0gbWZwLl9nZXRTY3JvbGxiYXJTaXplKCk7XG4gICAgICAgICAgICAgICAgaWYocykge1xuICAgICAgICAgICAgICAgICAgICB3aW5kb3dTdHlsZXMubWFyZ2luUmlnaHQgPSBzO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG5cdFx0aWYobWZwLmZpeGVkQ29udGVudFBvcykge1xuXHRcdFx0aWYoIW1mcC5pc0lFNykge1xuXHRcdFx0XHR3aW5kb3dTdHlsZXMub3ZlcmZsb3cgPSAnaGlkZGVuJztcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdC8vIGllNyBkb3VibGUtc2Nyb2xsIGJ1Z1xuXHRcdFx0XHQkKCdib2R5LCBodG1sJykuY3NzKCdvdmVyZmxvdycsICdoaWRkZW4nKTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHRcblx0XHRcblx0XHR2YXIgY2xhc3Nlc1RvYWRkID0gbWZwLnN0Lm1haW5DbGFzcztcblx0XHRpZihtZnAuaXNJRTcpIHtcblx0XHRcdGNsYXNzZXNUb2FkZCArPSAnIG1mcC1pZTcnO1xuXHRcdH1cblx0XHRpZihjbGFzc2VzVG9hZGQpIHtcblx0XHRcdG1mcC5fYWRkQ2xhc3NUb01GUCggY2xhc3Nlc1RvYWRkICk7XG5cdFx0fVxuXG5cdFx0Ly8gYWRkIGNvbnRlbnRcblx0XHRtZnAudXBkYXRlSXRlbUhUTUwoKTtcblxuXHRcdF9tZnBUcmlnZ2VyKCdCdWlsZENvbnRyb2xzJyk7XG5cblx0XHQvLyByZW1vdmUgc2Nyb2xsYmFyLCBhZGQgbWFyZ2luIGUudC5jXG5cdFx0JCgnaHRtbCcpLmNzcyh3aW5kb3dTdHlsZXMpO1xuXHRcdFxuXHRcdC8vIGFkZCBldmVyeXRoaW5nIHRvIERPTVxuXHRcdG1mcC5iZ092ZXJsYXkuYWRkKG1mcC53cmFwKS5wcmVwZW5kVG8oIG1mcC5zdC5wcmVwZW5kVG8gfHwgJChkb2N1bWVudC5ib2R5KSApO1xuXG5cdFx0Ly8gU2F2ZSBsYXN0IGZvY3VzZWQgZWxlbWVudFxuXHRcdG1mcC5fbGFzdEZvY3VzZWRFbCA9IGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQ7XG5cdFx0XG5cdFx0Ly8gV2FpdCBmb3IgbmV4dCBjeWNsZSB0byBhbGxvdyBDU1MgdHJhbnNpdGlvblxuXHRcdHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG5cdFx0XHRcblx0XHRcdGlmKG1mcC5jb250ZW50KSB7XG5cdFx0XHRcdG1mcC5fYWRkQ2xhc3NUb01GUChSRUFEWV9DTEFTUyk7XG5cdFx0XHRcdG1mcC5fc2V0Rm9jdXMoKTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdC8vIGlmIGNvbnRlbnQgaXMgbm90IGRlZmluZWQgKG5vdCBsb2FkZWQgZS50LmMpIHdlIGFkZCBjbGFzcyBvbmx5IGZvciBCR1xuXHRcdFx0XHRtZnAuYmdPdmVybGF5LmFkZENsYXNzKFJFQURZX0NMQVNTKTtcblx0XHRcdH1cblx0XHRcdFxuXHRcdFx0Ly8gVHJhcCB0aGUgZm9jdXMgaW4gcG9wdXBcblx0XHRcdF9kb2N1bWVudC5vbignZm9jdXNpbicgKyBFVkVOVF9OUywgbWZwLl9vbkZvY3VzSW4pO1xuXG5cdFx0fSwgMTYpO1xuXG5cdFx0bWZwLmlzT3BlbiA9IHRydWU7XG5cdFx0bWZwLnVwZGF0ZVNpemUod2luZG93SGVpZ2h0KTtcblx0XHRfbWZwVHJpZ2dlcihPUEVOX0VWRU5UKTtcblxuXHRcdHJldHVybiBkYXRhO1xuXHR9LFxuXG5cdC8qKlxuXHQgKiBDbG9zZXMgdGhlIHBvcHVwXG5cdCAqL1xuXHRjbG9zZTogZnVuY3Rpb24oKSB7XG5cdFx0aWYoIW1mcC5pc09wZW4pIHJldHVybjtcblx0XHRfbWZwVHJpZ2dlcihCRUZPUkVfQ0xPU0VfRVZFTlQpO1xuXG5cdFx0bWZwLmlzT3BlbiA9IGZhbHNlO1xuXHRcdC8vIGZvciBDU1MzIGFuaW1hdGlvblxuXHRcdGlmKG1mcC5zdC5yZW1vdmFsRGVsYXkgJiYgIW1mcC5pc0xvd0lFICYmIG1mcC5zdXBwb3J0c1RyYW5zaXRpb24gKSAge1xuXHRcdFx0bWZwLl9hZGRDbGFzc1RvTUZQKFJFTU9WSU5HX0NMQVNTKTtcblx0XHRcdHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG5cdFx0XHRcdG1mcC5fY2xvc2UoKTtcblx0XHRcdH0sIG1mcC5zdC5yZW1vdmFsRGVsYXkpO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRtZnAuX2Nsb3NlKCk7XG5cdFx0fVxuXHR9LFxuXG5cdC8qKlxuXHQgKiBIZWxwZXIgZm9yIGNsb3NlKCkgZnVuY3Rpb25cblx0ICovXG5cdF9jbG9zZTogZnVuY3Rpb24oKSB7XG5cdFx0X21mcFRyaWdnZXIoQ0xPU0VfRVZFTlQpO1xuXG5cdFx0dmFyIGNsYXNzZXNUb1JlbW92ZSA9IFJFTU9WSU5HX0NMQVNTICsgJyAnICsgUkVBRFlfQ0xBU1MgKyAnICc7XG5cblx0XHRtZnAuYmdPdmVybGF5LmRldGFjaCgpO1xuXHRcdG1mcC53cmFwLmRldGFjaCgpO1xuXHRcdG1mcC5jb250YWluZXIuZW1wdHkoKTtcblxuXHRcdGlmKG1mcC5zdC5tYWluQ2xhc3MpIHtcblx0XHRcdGNsYXNzZXNUb1JlbW92ZSArPSBtZnAuc3QubWFpbkNsYXNzICsgJyAnO1xuXHRcdH1cblxuXHRcdG1mcC5fcmVtb3ZlQ2xhc3NGcm9tTUZQKGNsYXNzZXNUb1JlbW92ZSk7XG5cblx0XHRpZihtZnAuZml4ZWRDb250ZW50UG9zKSB7XG5cdFx0XHR2YXIgd2luZG93U3R5bGVzID0ge21hcmdpblJpZ2h0OiAnJ307XG5cdFx0XHRpZihtZnAuaXNJRTcpIHtcblx0XHRcdFx0JCgnYm9keSwgaHRtbCcpLmNzcygnb3ZlcmZsb3cnLCAnJyk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHR3aW5kb3dTdHlsZXMub3ZlcmZsb3cgPSAnJztcblx0XHRcdH1cblx0XHRcdCQoJ2h0bWwnKS5jc3Mod2luZG93U3R5bGVzKTtcblx0XHR9XG5cdFx0XG5cdFx0X2RvY3VtZW50Lm9mZigna2V5dXAnICsgRVZFTlRfTlMgKyAnIGZvY3VzaW4nICsgRVZFTlRfTlMpO1xuXHRcdG1mcC5ldi5vZmYoRVZFTlRfTlMpO1xuXG5cdFx0Ly8gY2xlYW4gdXAgRE9NIGVsZW1lbnRzIHRoYXQgYXJlbid0IHJlbW92ZWRcblx0XHRtZnAud3JhcC5hdHRyKCdjbGFzcycsICdtZnAtd3JhcCcpLnJlbW92ZUF0dHIoJ3N0eWxlJyk7XG5cdFx0bWZwLmJnT3ZlcmxheS5hdHRyKCdjbGFzcycsICdtZnAtYmcnKTtcblx0XHRtZnAuY29udGFpbmVyLmF0dHIoJ2NsYXNzJywgJ21mcC1jb250YWluZXInKTtcblxuXHRcdC8vIHJlbW92ZSBjbG9zZSBidXR0b24gZnJvbSB0YXJnZXQgZWxlbWVudFxuXHRcdGlmKG1mcC5zdC5zaG93Q2xvc2VCdG4gJiZcblx0XHQoIW1mcC5zdC5jbG9zZUJ0bkluc2lkZSB8fCBtZnAuY3VyclRlbXBsYXRlW21mcC5jdXJySXRlbS50eXBlXSA9PT0gdHJ1ZSkpIHtcblx0XHRcdGlmKG1mcC5jdXJyVGVtcGxhdGUuY2xvc2VCdG4pXG5cdFx0XHRcdG1mcC5jdXJyVGVtcGxhdGUuY2xvc2VCdG4uZGV0YWNoKCk7XG5cdFx0fVxuXG5cblx0XHRpZihtZnAuc3QuYXV0b0ZvY3VzTGFzdCAmJiBtZnAuX2xhc3RGb2N1c2VkRWwpIHtcblx0XHRcdCQobWZwLl9sYXN0Rm9jdXNlZEVsKS5mb2N1cygpOyAvLyBwdXQgdGFiIGZvY3VzIGJhY2tcblx0XHR9XG5cdFx0bWZwLmN1cnJJdGVtID0gbnVsbDtcdFxuXHRcdG1mcC5jb250ZW50ID0gbnVsbDtcblx0XHRtZnAuY3VyclRlbXBsYXRlID0gbnVsbDtcblx0XHRtZnAucHJldkhlaWdodCA9IDA7XG5cblx0XHRfbWZwVHJpZ2dlcihBRlRFUl9DTE9TRV9FVkVOVCk7XG5cdH0sXG5cdFxuXHR1cGRhdGVTaXplOiBmdW5jdGlvbih3aW5IZWlnaHQpIHtcblxuXHRcdGlmKG1mcC5pc0lPUykge1xuXHRcdFx0Ly8gZml4ZXMgaU9TIG5hdiBiYXJzIGh0dHBzOi8vZ2l0aHViLmNvbS9kaW1zZW1lbm92L01hZ25pZmljLVBvcHVwL2lzc3Vlcy8yXG5cdFx0XHR2YXIgem9vbUxldmVsID0gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsaWVudFdpZHRoIC8gd2luZG93LmlubmVyV2lkdGg7XG5cdFx0XHR2YXIgaGVpZ2h0ID0gd2luZG93LmlubmVySGVpZ2h0ICogem9vbUxldmVsO1xuXHRcdFx0bWZwLndyYXAuY3NzKCdoZWlnaHQnLCBoZWlnaHQpO1xuXHRcdFx0bWZwLndIID0gaGVpZ2h0O1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRtZnAud0ggPSB3aW5IZWlnaHQgfHwgX3dpbmRvdy5oZWlnaHQoKTtcblx0XHR9XG5cdFx0Ly8gRml4ZXMgIzg0OiBwb3B1cCBpbmNvcnJlY3RseSBwb3NpdGlvbmVkIHdpdGggcG9zaXRpb246cmVsYXRpdmUgb24gYm9keVxuXHRcdGlmKCFtZnAuZml4ZWRDb250ZW50UG9zKSB7XG5cdFx0XHRtZnAud3JhcC5jc3MoJ2hlaWdodCcsIG1mcC53SCk7XG5cdFx0fVxuXG5cdFx0X21mcFRyaWdnZXIoJ1Jlc2l6ZScpO1xuXG5cdH0sXG5cblx0LyoqXG5cdCAqIFNldCBjb250ZW50IG9mIHBvcHVwIGJhc2VkIG9uIGN1cnJlbnQgaW5kZXhcblx0ICovXG5cdHVwZGF0ZUl0ZW1IVE1MOiBmdW5jdGlvbigpIHtcblx0XHR2YXIgaXRlbSA9IG1mcC5pdGVtc1ttZnAuaW5kZXhdO1xuXG5cdFx0Ly8gRGV0YWNoIGFuZCBwZXJmb3JtIG1vZGlmaWNhdGlvbnNcblx0XHRtZnAuY29udGVudENvbnRhaW5lci5kZXRhY2goKTtcblxuXHRcdGlmKG1mcC5jb250ZW50KVxuXHRcdFx0bWZwLmNvbnRlbnQuZGV0YWNoKCk7XG5cblx0XHRpZighaXRlbS5wYXJzZWQpIHtcblx0XHRcdGl0ZW0gPSBtZnAucGFyc2VFbCggbWZwLmluZGV4ICk7XG5cdFx0fVxuXG5cdFx0dmFyIHR5cGUgPSBpdGVtLnR5cGU7XG5cblx0XHRfbWZwVHJpZ2dlcignQmVmb3JlQ2hhbmdlJywgW21mcC5jdXJySXRlbSA/IG1mcC5jdXJySXRlbS50eXBlIDogJycsIHR5cGVdKTtcblx0XHQvLyBCZWZvcmVDaGFuZ2UgZXZlbnQgd29ya3MgbGlrZSBzbzpcblx0XHQvLyBfbWZwT24oJ0JlZm9yZUNoYW5nZScsIGZ1bmN0aW9uKGUsIHByZXZUeXBlLCBuZXdUeXBlKSB7IH0pO1xuXG5cdFx0bWZwLmN1cnJJdGVtID0gaXRlbTtcblxuXHRcdGlmKCFtZnAuY3VyclRlbXBsYXRlW3R5cGVdKSB7XG5cdFx0XHR2YXIgbWFya3VwID0gbWZwLnN0W3R5cGVdID8gbWZwLnN0W3R5cGVdLm1hcmt1cCA6IGZhbHNlO1xuXG5cdFx0XHQvLyBhbGxvd3MgdG8gbW9kaWZ5IG1hcmt1cFxuXHRcdFx0X21mcFRyaWdnZXIoJ0ZpcnN0TWFya3VwUGFyc2UnLCBtYXJrdXApO1xuXG5cdFx0XHRpZihtYXJrdXApIHtcblx0XHRcdFx0bWZwLmN1cnJUZW1wbGF0ZVt0eXBlXSA9ICQobWFya3VwKTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdC8vIGlmIHRoZXJlIGlzIG5vIG1hcmt1cCBmb3VuZCB3ZSBqdXN0IGRlZmluZSB0aGF0IHRlbXBsYXRlIGlzIHBhcnNlZFxuXHRcdFx0XHRtZnAuY3VyclRlbXBsYXRlW3R5cGVdID0gdHJ1ZTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHRpZihfcHJldkNvbnRlbnRUeXBlICYmIF9wcmV2Q29udGVudFR5cGUgIT09IGl0ZW0udHlwZSkge1xuXHRcdFx0bWZwLmNvbnRhaW5lci5yZW1vdmVDbGFzcygnbWZwLScrX3ByZXZDb250ZW50VHlwZSsnLWhvbGRlcicpO1xuXHRcdH1cblxuXHRcdHZhciBuZXdDb250ZW50ID0gbWZwWydnZXQnICsgdHlwZS5jaGFyQXQoMCkudG9VcHBlckNhc2UoKSArIHR5cGUuc2xpY2UoMSldKGl0ZW0sIG1mcC5jdXJyVGVtcGxhdGVbdHlwZV0pO1xuXHRcdG1mcC5hcHBlbmRDb250ZW50KG5ld0NvbnRlbnQsIHR5cGUpO1xuXG5cdFx0aXRlbS5wcmVsb2FkZWQgPSB0cnVlO1xuXG5cdFx0X21mcFRyaWdnZXIoQ0hBTkdFX0VWRU5ULCBpdGVtKTtcblx0XHRfcHJldkNvbnRlbnRUeXBlID0gaXRlbS50eXBlO1xuXG5cdFx0Ly8gQXBwZW5kIGNvbnRhaW5lciBiYWNrIGFmdGVyIGl0cyBjb250ZW50IGNoYW5nZWRcblx0XHRtZnAuY29udGFpbmVyLnByZXBlbmQobWZwLmNvbnRlbnRDb250YWluZXIpO1xuXG5cdFx0X21mcFRyaWdnZXIoJ0FmdGVyQ2hhbmdlJyk7XG5cdH0sXG5cblxuXHQvKipcblx0ICogU2V0IEhUTUwgY29udGVudCBvZiBwb3B1cFxuXHQgKi9cblx0YXBwZW5kQ29udGVudDogZnVuY3Rpb24obmV3Q29udGVudCwgdHlwZSkge1xuXHRcdG1mcC5jb250ZW50ID0gbmV3Q29udGVudDtcblxuXHRcdGlmKG5ld0NvbnRlbnQpIHtcblx0XHRcdGlmKG1mcC5zdC5zaG93Q2xvc2VCdG4gJiYgbWZwLnN0LmNsb3NlQnRuSW5zaWRlICYmXG5cdFx0XHRcdG1mcC5jdXJyVGVtcGxhdGVbdHlwZV0gPT09IHRydWUpIHtcblx0XHRcdFx0Ly8gaWYgdGhlcmUgaXMgbm8gbWFya3VwLCB3ZSBqdXN0IGFwcGVuZCBjbG9zZSBidXR0b24gZWxlbWVudCBpbnNpZGVcblx0XHRcdFx0aWYoIW1mcC5jb250ZW50LmZpbmQoJy5tZnAtY2xvc2UnKS5sZW5ndGgpIHtcblx0XHRcdFx0XHRtZnAuY29udGVudC5hcHBlbmQoX2dldENsb3NlQnRuKCkpO1xuXHRcdFx0XHR9XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRtZnAuY29udGVudCA9IG5ld0NvbnRlbnQ7XG5cdFx0XHR9XG5cdFx0fSBlbHNlIHtcblx0XHRcdG1mcC5jb250ZW50ID0gJyc7XG5cdFx0fVxuXG5cdFx0X21mcFRyaWdnZXIoQkVGT1JFX0FQUEVORF9FVkVOVCk7XG5cdFx0bWZwLmNvbnRhaW5lci5hZGRDbGFzcygnbWZwLScrdHlwZSsnLWhvbGRlcicpO1xuXG5cdFx0bWZwLmNvbnRlbnRDb250YWluZXIuYXBwZW5kKG1mcC5jb250ZW50KTtcblx0fSxcblxuXG5cdC8qKlxuXHQgKiBDcmVhdGVzIE1hZ25pZmljIFBvcHVwIGRhdGEgb2JqZWN0IGJhc2VkIG9uIGdpdmVuIGRhdGFcblx0ICogQHBhcmFtICB7aW50fSBpbmRleCBJbmRleCBvZiBpdGVtIHRvIHBhcnNlXG5cdCAqL1xuXHRwYXJzZUVsOiBmdW5jdGlvbihpbmRleCkge1xuXHRcdHZhciBpdGVtID0gbWZwLml0ZW1zW2luZGV4XSxcblx0XHRcdHR5cGU7XG5cblx0XHRpZihpdGVtLnRhZ05hbWUpIHtcblx0XHRcdGl0ZW0gPSB7IGVsOiAkKGl0ZW0pIH07XG5cdFx0fSBlbHNlIHtcblx0XHRcdHR5cGUgPSBpdGVtLnR5cGU7XG5cdFx0XHRpdGVtID0geyBkYXRhOiBpdGVtLCBzcmM6IGl0ZW0uc3JjIH07XG5cdFx0fVxuXG5cdFx0aWYoaXRlbS5lbCkge1xuXHRcdFx0dmFyIHR5cGVzID0gbWZwLnR5cGVzO1xuXG5cdFx0XHQvLyBjaGVjayBmb3IgJ21mcC1UWVBFJyBjbGFzc1xuXHRcdFx0Zm9yKHZhciBpID0gMDsgaSA8IHR5cGVzLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRcdGlmKCBpdGVtLmVsLmhhc0NsYXNzKCdtZnAtJyt0eXBlc1tpXSkgKSB7XG5cdFx0XHRcdFx0dHlwZSA9IHR5cGVzW2ldO1xuXHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cblx0XHRcdGl0ZW0uc3JjID0gaXRlbS5lbC5hdHRyKCdkYXRhLW1mcC1zcmMnKTtcblx0XHRcdGlmKCFpdGVtLnNyYykge1xuXHRcdFx0XHRpdGVtLnNyYyA9IGl0ZW0uZWwuYXR0cignaHJlZicpO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdGl0ZW0udHlwZSA9IHR5cGUgfHwgbWZwLnN0LnR5cGUgfHwgJ2lubGluZSc7XG5cdFx0aXRlbS5pbmRleCA9IGluZGV4O1xuXHRcdGl0ZW0ucGFyc2VkID0gdHJ1ZTtcblx0XHRtZnAuaXRlbXNbaW5kZXhdID0gaXRlbTtcblx0XHRfbWZwVHJpZ2dlcignRWxlbWVudFBhcnNlJywgaXRlbSk7XG5cblx0XHRyZXR1cm4gbWZwLml0ZW1zW2luZGV4XTtcblx0fSxcblxuXG5cdC8qKlxuXHQgKiBJbml0aWFsaXplcyBzaW5nbGUgcG9wdXAgb3IgYSBncm91cCBvZiBwb3B1cHNcblx0ICovXG5cdGFkZEdyb3VwOiBmdW5jdGlvbihlbCwgb3B0aW9ucykge1xuXHRcdHZhciBlSGFuZGxlciA9IGZ1bmN0aW9uKGUpIHtcblx0XHRcdGUubWZwRWwgPSB0aGlzO1xuXHRcdFx0bWZwLl9vcGVuQ2xpY2soZSwgZWwsIG9wdGlvbnMpO1xuXHRcdH07XG5cblx0XHRpZighb3B0aW9ucykge1xuXHRcdFx0b3B0aW9ucyA9IHt9O1xuXHRcdH1cblxuXHRcdHZhciBlTmFtZSA9ICdjbGljay5tYWduaWZpY1BvcHVwJztcblx0XHRvcHRpb25zLm1haW5FbCA9IGVsO1xuXG5cdFx0aWYob3B0aW9ucy5pdGVtcykge1xuXHRcdFx0b3B0aW9ucy5pc09iaiA9IHRydWU7XG5cdFx0XHRlbC5vZmYoZU5hbWUpLm9uKGVOYW1lLCBlSGFuZGxlcik7XG5cdFx0fSBlbHNlIHtcblx0XHRcdG9wdGlvbnMuaXNPYmogPSBmYWxzZTtcblx0XHRcdGlmKG9wdGlvbnMuZGVsZWdhdGUpIHtcblx0XHRcdFx0ZWwub2ZmKGVOYW1lKS5vbihlTmFtZSwgb3B0aW9ucy5kZWxlZ2F0ZSAsIGVIYW5kbGVyKTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdG9wdGlvbnMuaXRlbXMgPSBlbDtcblx0XHRcdFx0ZWwub2ZmKGVOYW1lKS5vbihlTmFtZSwgZUhhbmRsZXIpO1xuXHRcdFx0fVxuXHRcdH1cblx0fSxcblx0X29wZW5DbGljazogZnVuY3Rpb24oZSwgZWwsIG9wdGlvbnMpIHtcblx0XHR2YXIgbWlkQ2xpY2sgPSBvcHRpb25zLm1pZENsaWNrICE9PSB1bmRlZmluZWQgPyBvcHRpb25zLm1pZENsaWNrIDogJC5tYWduaWZpY1BvcHVwLmRlZmF1bHRzLm1pZENsaWNrO1xuXG5cblx0XHRpZighbWlkQ2xpY2sgJiYgKCBlLndoaWNoID09PSAyIHx8IGUuY3RybEtleSB8fCBlLm1ldGFLZXkgfHwgZS5hbHRLZXkgfHwgZS5zaGlmdEtleSApICkge1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblxuXHRcdHZhciBkaXNhYmxlT24gPSBvcHRpb25zLmRpc2FibGVPbiAhPT0gdW5kZWZpbmVkID8gb3B0aW9ucy5kaXNhYmxlT24gOiAkLm1hZ25pZmljUG9wdXAuZGVmYXVsdHMuZGlzYWJsZU9uO1xuXG5cdFx0aWYoZGlzYWJsZU9uKSB7XG5cdFx0XHRpZigkLmlzRnVuY3Rpb24oZGlzYWJsZU9uKSkge1xuXHRcdFx0XHRpZiggIWRpc2FibGVPbi5jYWxsKG1mcCkgKSB7XG5cdFx0XHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0XHRcdH1cblx0XHRcdH0gZWxzZSB7IC8vIGVsc2UgaXQncyBudW1iZXJcblx0XHRcdFx0aWYoIF93aW5kb3cud2lkdGgoKSA8IGRpc2FibGVPbiApIHtcblx0XHRcdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblxuXHRcdGlmKGUudHlwZSkge1xuXHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xuXG5cdFx0XHQvLyBUaGlzIHdpbGwgcHJldmVudCBwb3B1cCBmcm9tIGNsb3NpbmcgaWYgZWxlbWVudCBpcyBpbnNpZGUgYW5kIHBvcHVwIGlzIGFscmVhZHkgb3BlbmVkXG5cdFx0XHRpZihtZnAuaXNPcGVuKSB7XG5cdFx0XHRcdGUuc3RvcFByb3BhZ2F0aW9uKCk7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0b3B0aW9ucy5lbCA9ICQoZS5tZnBFbCk7XG5cdFx0aWYob3B0aW9ucy5kZWxlZ2F0ZSkge1xuXHRcdFx0b3B0aW9ucy5pdGVtcyA9IGVsLmZpbmQob3B0aW9ucy5kZWxlZ2F0ZSk7XG5cdFx0fVxuXHRcdG1mcC5vcGVuKG9wdGlvbnMpO1xuXHR9LFxuXG5cblx0LyoqXG5cdCAqIFVwZGF0ZXMgdGV4dCBvbiBwcmVsb2FkZXJcblx0ICovXG5cdHVwZGF0ZVN0YXR1czogZnVuY3Rpb24oc3RhdHVzLCB0ZXh0KSB7XG5cblx0XHRpZihtZnAucHJlbG9hZGVyKSB7XG5cdFx0XHRpZihfcHJldlN0YXR1cyAhPT0gc3RhdHVzKSB7XG5cdFx0XHRcdG1mcC5jb250YWluZXIucmVtb3ZlQ2xhc3MoJ21mcC1zLScrX3ByZXZTdGF0dXMpO1xuXHRcdFx0fVxuXG5cdFx0XHRpZighdGV4dCAmJiBzdGF0dXMgPT09ICdsb2FkaW5nJykge1xuXHRcdFx0XHR0ZXh0ID0gbWZwLnN0LnRMb2FkaW5nO1xuXHRcdFx0fVxuXG5cdFx0XHR2YXIgZGF0YSA9IHtcblx0XHRcdFx0c3RhdHVzOiBzdGF0dXMsXG5cdFx0XHRcdHRleHQ6IHRleHRcblx0XHRcdH07XG5cdFx0XHQvLyBhbGxvd3MgdG8gbW9kaWZ5IHN0YXR1c1xuXHRcdFx0X21mcFRyaWdnZXIoJ1VwZGF0ZVN0YXR1cycsIGRhdGEpO1xuXG5cdFx0XHRzdGF0dXMgPSBkYXRhLnN0YXR1cztcblx0XHRcdHRleHQgPSBkYXRhLnRleHQ7XG5cblx0XHRcdG1mcC5wcmVsb2FkZXIuaHRtbCh0ZXh0KTtcblxuXHRcdFx0bWZwLnByZWxvYWRlci5maW5kKCdhJykub24oJ2NsaWNrJywgZnVuY3Rpb24oZSkge1xuXHRcdFx0XHRlLnN0b3BJbW1lZGlhdGVQcm9wYWdhdGlvbigpO1xuXHRcdFx0fSk7XG5cblx0XHRcdG1mcC5jb250YWluZXIuYWRkQ2xhc3MoJ21mcC1zLScrc3RhdHVzKTtcblx0XHRcdF9wcmV2U3RhdHVzID0gc3RhdHVzO1xuXHRcdH1cblx0fSxcblxuXG5cdC8qXG5cdFx0XCJQcml2YXRlXCIgaGVscGVycyB0aGF0IGFyZW4ndCBwcml2YXRlIGF0IGFsbFxuXHQgKi9cblx0Ly8gQ2hlY2sgdG8gY2xvc2UgcG9wdXAgb3Igbm90XG5cdC8vIFwidGFyZ2V0XCIgaXMgYW4gZWxlbWVudCB0aGF0IHdhcyBjbGlja2VkXG5cdF9jaGVja0lmQ2xvc2U6IGZ1bmN0aW9uKHRhcmdldCkge1xuXG5cdFx0aWYoJCh0YXJnZXQpLmhhc0NsYXNzKFBSRVZFTlRfQ0xPU0VfQ0xBU1MpKSB7XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXG5cdFx0dmFyIGNsb3NlT25Db250ZW50ID0gbWZwLnN0LmNsb3NlT25Db250ZW50Q2xpY2s7XG5cdFx0dmFyIGNsb3NlT25CZyA9IG1mcC5zdC5jbG9zZU9uQmdDbGljaztcblxuXHRcdGlmKGNsb3NlT25Db250ZW50ICYmIGNsb3NlT25CZykge1xuXHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0fSBlbHNlIHtcblxuXHRcdFx0Ly8gV2UgY2xvc2UgdGhlIHBvcHVwIGlmIGNsaWNrIGlzIG9uIGNsb3NlIGJ1dHRvbiBvciBvbiBwcmVsb2FkZXIuIE9yIGlmIHRoZXJlIGlzIG5vIGNvbnRlbnQuXG5cdFx0XHRpZighbWZwLmNvbnRlbnQgfHwgJCh0YXJnZXQpLmhhc0NsYXNzKCdtZnAtY2xvc2UnKSB8fCAobWZwLnByZWxvYWRlciAmJiB0YXJnZXQgPT09IG1mcC5wcmVsb2FkZXJbMF0pICkge1xuXHRcdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHRcdH1cblxuXHRcdFx0Ly8gaWYgY2xpY2sgaXMgb3V0c2lkZSB0aGUgY29udGVudFxuXHRcdFx0aWYoICAodGFyZ2V0ICE9PSBtZnAuY29udGVudFswXSAmJiAhJC5jb250YWlucyhtZnAuY29udGVudFswXSwgdGFyZ2V0KSkgICkge1xuXHRcdFx0XHRpZihjbG9zZU9uQmcpIHtcblx0XHRcdFx0XHQvLyBsYXN0IGNoZWNrLCBpZiB0aGUgY2xpY2tlZCBlbGVtZW50IGlzIGluIERPTSwgKGluIGNhc2UgaXQncyByZW1vdmVkIG9uY2xpY2spXG5cdFx0XHRcdFx0aWYoICQuY29udGFpbnMoZG9jdW1lbnQsIHRhcmdldCkgKSB7XG5cdFx0XHRcdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH0gZWxzZSBpZihjbG9zZU9uQ29udGVudCkge1xuXHRcdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHRcdH1cblxuXHRcdH1cblx0XHRyZXR1cm4gZmFsc2U7XG5cdH0sXG5cdF9hZGRDbGFzc1RvTUZQOiBmdW5jdGlvbihjTmFtZSkge1xuXHRcdG1mcC5iZ092ZXJsYXkuYWRkQ2xhc3MoY05hbWUpO1xuXHRcdG1mcC53cmFwLmFkZENsYXNzKGNOYW1lKTtcblx0fSxcblx0X3JlbW92ZUNsYXNzRnJvbU1GUDogZnVuY3Rpb24oY05hbWUpIHtcblx0XHR0aGlzLmJnT3ZlcmxheS5yZW1vdmVDbGFzcyhjTmFtZSk7XG5cdFx0bWZwLndyYXAucmVtb3ZlQ2xhc3MoY05hbWUpO1xuXHR9LFxuXHRfaGFzU2Nyb2xsQmFyOiBmdW5jdGlvbih3aW5IZWlnaHQpIHtcblx0XHRyZXR1cm4gKCAgKG1mcC5pc0lFNyA/IF9kb2N1bWVudC5oZWlnaHQoKSA6IGRvY3VtZW50LmJvZHkuc2Nyb2xsSGVpZ2h0KSA+ICh3aW5IZWlnaHQgfHwgX3dpbmRvdy5oZWlnaHQoKSkgKTtcblx0fSxcblx0X3NldEZvY3VzOiBmdW5jdGlvbigpIHtcblx0XHQobWZwLnN0LmZvY3VzID8gbWZwLmNvbnRlbnQuZmluZChtZnAuc3QuZm9jdXMpLmVxKDApIDogbWZwLndyYXApLmZvY3VzKCk7XG5cdH0sXG5cdF9vbkZvY3VzSW46IGZ1bmN0aW9uKGUpIHtcblx0XHRpZiggZS50YXJnZXQgIT09IG1mcC53cmFwWzBdICYmICEkLmNvbnRhaW5zKG1mcC53cmFwWzBdLCBlLnRhcmdldCkgKSB7XG5cdFx0XHRtZnAuX3NldEZvY3VzKCk7XG5cdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0fVxuXHR9LFxuXHRfcGFyc2VNYXJrdXA6IGZ1bmN0aW9uKHRlbXBsYXRlLCB2YWx1ZXMsIGl0ZW0pIHtcblx0XHR2YXIgYXJyO1xuXHRcdGlmKGl0ZW0uZGF0YSkge1xuXHRcdFx0dmFsdWVzID0gJC5leHRlbmQoaXRlbS5kYXRhLCB2YWx1ZXMpO1xuXHRcdH1cblx0XHRfbWZwVHJpZ2dlcihNQVJLVVBfUEFSU0VfRVZFTlQsIFt0ZW1wbGF0ZSwgdmFsdWVzLCBpdGVtXSApO1xuXG5cdFx0JC5lYWNoKHZhbHVlcywgZnVuY3Rpb24oa2V5LCB2YWx1ZSkge1xuXHRcdFx0aWYodmFsdWUgPT09IHVuZGVmaW5lZCB8fCB2YWx1ZSA9PT0gZmFsc2UpIHtcblx0XHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0XHR9XG5cdFx0XHRhcnIgPSBrZXkuc3BsaXQoJ18nKTtcblx0XHRcdGlmKGFyci5sZW5ndGggPiAxKSB7XG5cdFx0XHRcdHZhciBlbCA9IHRlbXBsYXRlLmZpbmQoRVZFTlRfTlMgKyAnLScrYXJyWzBdKTtcblxuXHRcdFx0XHRpZihlbC5sZW5ndGggPiAwKSB7XG5cdFx0XHRcdFx0dmFyIGF0dHIgPSBhcnJbMV07XG5cdFx0XHRcdFx0aWYoYXR0ciA9PT0gJ3JlcGxhY2VXaXRoJykge1xuXHRcdFx0XHRcdFx0aWYoZWxbMF0gIT09IHZhbHVlWzBdKSB7XG5cdFx0XHRcdFx0XHRcdGVsLnJlcGxhY2VXaXRoKHZhbHVlKTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9IGVsc2UgaWYoYXR0ciA9PT0gJ2ltZycpIHtcblx0XHRcdFx0XHRcdGlmKGVsLmlzKCdpbWcnKSkge1xuXHRcdFx0XHRcdFx0XHRlbC5hdHRyKCdzcmMnLCB2YWx1ZSk7XG5cdFx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0XHRlbC5yZXBsYWNlV2l0aCggJCgnPGltZz4nKS5hdHRyKCdzcmMnLCB2YWx1ZSkuYXR0cignY2xhc3MnLCBlbC5hdHRyKCdjbGFzcycpKSApO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRlbC5hdHRyKGFyclsxXSwgdmFsdWUpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHR0ZW1wbGF0ZS5maW5kKEVWRU5UX05TICsgJy0nK2tleSkuaHRtbCh2YWx1ZSk7XG5cdFx0XHR9XG5cdFx0fSk7XG5cdH0sXG5cblx0X2dldFNjcm9sbGJhclNpemU6IGZ1bmN0aW9uKCkge1xuXHRcdC8vIHRoeCBEYXZpZFxuXHRcdGlmKG1mcC5zY3JvbGxiYXJTaXplID09PSB1bmRlZmluZWQpIHtcblx0XHRcdHZhciBzY3JvbGxEaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuXHRcdFx0c2Nyb2xsRGl2LnN0eWxlLmNzc1RleHQgPSAnd2lkdGg6IDk5cHg7IGhlaWdodDogOTlweDsgb3ZlcmZsb3c6IHNjcm9sbDsgcG9zaXRpb246IGFic29sdXRlOyB0b3A6IC05OTk5cHg7Jztcblx0XHRcdGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoc2Nyb2xsRGl2KTtcblx0XHRcdG1mcC5zY3JvbGxiYXJTaXplID0gc2Nyb2xsRGl2Lm9mZnNldFdpZHRoIC0gc2Nyb2xsRGl2LmNsaWVudFdpZHRoO1xuXHRcdFx0ZG9jdW1lbnQuYm9keS5yZW1vdmVDaGlsZChzY3JvbGxEaXYpO1xuXHRcdH1cblx0XHRyZXR1cm4gbWZwLnNjcm9sbGJhclNpemU7XG5cdH1cblxufTsgLyogTWFnbmlmaWNQb3B1cCBjb3JlIHByb3RvdHlwZSBlbmQgKi9cblxuXG5cblxuLyoqXG4gKiBQdWJsaWMgc3RhdGljIGZ1bmN0aW9uc1xuICovXG4kLm1hZ25pZmljUG9wdXAgPSB7XG5cdGluc3RhbmNlOiBudWxsLFxuXHRwcm90bzogTWFnbmlmaWNQb3B1cC5wcm90b3R5cGUsXG5cdG1vZHVsZXM6IFtdLFxuXG5cdG9wZW46IGZ1bmN0aW9uKG9wdGlvbnMsIGluZGV4KSB7XG5cdFx0X2NoZWNrSW5zdGFuY2UoKTtcblxuXHRcdGlmKCFvcHRpb25zKSB7XG5cdFx0XHRvcHRpb25zID0ge307XG5cdFx0fSBlbHNlIHtcblx0XHRcdG9wdGlvbnMgPSAkLmV4dGVuZCh0cnVlLCB7fSwgb3B0aW9ucyk7XG5cdFx0fVxuXG5cdFx0b3B0aW9ucy5pc09iaiA9IHRydWU7XG5cdFx0b3B0aW9ucy5pbmRleCA9IGluZGV4IHx8IDA7XG5cdFx0cmV0dXJuIHRoaXMuaW5zdGFuY2Uub3BlbihvcHRpb25zKTtcblx0fSxcblxuXHRjbG9zZTogZnVuY3Rpb24oKSB7XG5cdFx0cmV0dXJuICQubWFnbmlmaWNQb3B1cC5pbnN0YW5jZSAmJiAkLm1hZ25pZmljUG9wdXAuaW5zdGFuY2UuY2xvc2UoKTtcblx0fSxcblxuXHRyZWdpc3Rlck1vZHVsZTogZnVuY3Rpb24obmFtZSwgbW9kdWxlKSB7XG5cdFx0aWYobW9kdWxlLm9wdGlvbnMpIHtcblx0XHRcdCQubWFnbmlmaWNQb3B1cC5kZWZhdWx0c1tuYW1lXSA9IG1vZHVsZS5vcHRpb25zO1xuXHRcdH1cblx0XHQkLmV4dGVuZCh0aGlzLnByb3RvLCBtb2R1bGUucHJvdG8pO1xuXHRcdHRoaXMubW9kdWxlcy5wdXNoKG5hbWUpO1xuXHR9LFxuXG5cdGRlZmF1bHRzOiB7XG5cblx0XHQvLyBJbmZvIGFib3V0IG9wdGlvbnMgaXMgaW4gZG9jczpcblx0XHQvLyBodHRwOi8vZGltc2VtZW5vdi5jb20vcGx1Z2lucy9tYWduaWZpYy1wb3B1cC9kb2N1bWVudGF0aW9uLmh0bWwjb3B0aW9uc1xuXG5cdFx0ZGlzYWJsZU9uOiAwLFxuXG5cdFx0a2V5OiBudWxsLFxuXG5cdFx0bWlkQ2xpY2s6IGZhbHNlLFxuXG5cdFx0bWFpbkNsYXNzOiAnJyxcblxuXHRcdHByZWxvYWRlcjogdHJ1ZSxcblxuXHRcdGZvY3VzOiAnJywgLy8gQ1NTIHNlbGVjdG9yIG9mIGlucHV0IHRvIGZvY3VzIGFmdGVyIHBvcHVwIGlzIG9wZW5lZFxuXG5cdFx0Y2xvc2VPbkNvbnRlbnRDbGljazogZmFsc2UsXG5cblx0XHRjbG9zZU9uQmdDbGljazogdHJ1ZSxcblxuXHRcdGNsb3NlQnRuSW5zaWRlOiB0cnVlLFxuXG5cdFx0c2hvd0Nsb3NlQnRuOiB0cnVlLFxuXG5cdFx0ZW5hYmxlRXNjYXBlS2V5OiB0cnVlLFxuXG5cdFx0bW9kYWw6IGZhbHNlLFxuXG5cdFx0YWxpZ25Ub3A6IGZhbHNlLFxuXG5cdFx0cmVtb3ZhbERlbGF5OiAwLFxuXG5cdFx0cHJlcGVuZFRvOiBudWxsLFxuXG5cdFx0Zml4ZWRDb250ZW50UG9zOiAnYXV0bycsXG5cblx0XHRmaXhlZEJnUG9zOiAnYXV0bycsXG5cblx0XHRvdmVyZmxvd1k6ICdhdXRvJyxcblxuXHRcdGNsb3NlTWFya3VwOiAnPGJ1dHRvbiB0aXRsZT1cIiV0aXRsZSVcIiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJtZnAtY2xvc2VcIj4mIzIxNTs8L2J1dHRvbj4nLFxuXG5cdFx0dENsb3NlOiAnQ2xvc2UgKEVzYyknLFxuXG5cdFx0dExvYWRpbmc6ICdMb2FkaW5nLi4uJyxcblxuXHRcdGF1dG9Gb2N1c0xhc3Q6IHRydWVcblxuXHR9XG59O1xuXG5cblxuJC5mbi5tYWduaWZpY1BvcHVwID0gZnVuY3Rpb24ob3B0aW9ucykge1xuXHRfY2hlY2tJbnN0YW5jZSgpO1xuXG5cdHZhciBqcUVsID0gJCh0aGlzKTtcblxuXHQvLyBXZSBjYWxsIHNvbWUgQVBJIG1ldGhvZCBvZiBmaXJzdCBwYXJhbSBpcyBhIHN0cmluZ1xuXHRpZiAodHlwZW9mIG9wdGlvbnMgPT09IFwic3RyaW5nXCIgKSB7XG5cblx0XHRpZihvcHRpb25zID09PSAnb3BlbicpIHtcblx0XHRcdHZhciBpdGVtcyxcblx0XHRcdFx0aXRlbU9wdHMgPSBfaXNKUSA/IGpxRWwuZGF0YSgnbWFnbmlmaWNQb3B1cCcpIDoganFFbFswXS5tYWduaWZpY1BvcHVwLFxuXHRcdFx0XHRpbmRleCA9IHBhcnNlSW50KGFyZ3VtZW50c1sxXSwgMTApIHx8IDA7XG5cblx0XHRcdGlmKGl0ZW1PcHRzLml0ZW1zKSB7XG5cdFx0XHRcdGl0ZW1zID0gaXRlbU9wdHMuaXRlbXNbaW5kZXhdO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0aXRlbXMgPSBqcUVsO1xuXHRcdFx0XHRpZihpdGVtT3B0cy5kZWxlZ2F0ZSkge1xuXHRcdFx0XHRcdGl0ZW1zID0gaXRlbXMuZmluZChpdGVtT3B0cy5kZWxlZ2F0ZSk7XG5cdFx0XHRcdH1cblx0XHRcdFx0aXRlbXMgPSBpdGVtcy5lcSggaW5kZXggKTtcblx0XHRcdH1cblx0XHRcdG1mcC5fb3BlbkNsaWNrKHttZnBFbDppdGVtc30sIGpxRWwsIGl0ZW1PcHRzKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0aWYobWZwLmlzT3Blbilcblx0XHRcdFx0bWZwW29wdGlvbnNdLmFwcGx5KG1mcCwgQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzLCAxKSk7XG5cdFx0fVxuXG5cdH0gZWxzZSB7XG5cdFx0Ly8gY2xvbmUgb3B0aW9ucyBvYmpcblx0XHRvcHRpb25zID0gJC5leHRlbmQodHJ1ZSwge30sIG9wdGlvbnMpO1xuXG5cdFx0Lypcblx0XHQgKiBBcyBaZXB0byBkb2Vzbid0IHN1cHBvcnQgLmRhdGEoKSBtZXRob2QgZm9yIG9iamVjdHNcblx0XHQgKiBhbmQgaXQgd29ya3Mgb25seSBpbiBub3JtYWwgYnJvd3NlcnNcblx0XHQgKiB3ZSBhc3NpZ24gXCJvcHRpb25zXCIgb2JqZWN0IGRpcmVjdGx5IHRvIHRoZSBET00gZWxlbWVudC4gRlRXIVxuXHRcdCAqL1xuXHRcdGlmKF9pc0pRKSB7XG5cdFx0XHRqcUVsLmRhdGEoJ21hZ25pZmljUG9wdXAnLCBvcHRpb25zKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0anFFbFswXS5tYWduaWZpY1BvcHVwID0gb3B0aW9ucztcblx0XHR9XG5cblx0XHRtZnAuYWRkR3JvdXAoanFFbCwgb3B0aW9ucyk7XG5cblx0fVxuXHRyZXR1cm4ganFFbDtcbn07XG5cbi8qPj5jb3JlKi9cblxuLyo+PmlubGluZSovXG5cbnZhciBJTkxJTkVfTlMgPSAnaW5saW5lJyxcblx0X2hpZGRlbkNsYXNzLFxuXHRfaW5saW5lUGxhY2Vob2xkZXIsXG5cdF9sYXN0SW5saW5lRWxlbWVudCxcblx0X3B1dElubGluZUVsZW1lbnRzQmFjayA9IGZ1bmN0aW9uKCkge1xuXHRcdGlmKF9sYXN0SW5saW5lRWxlbWVudCkge1xuXHRcdFx0X2lubGluZVBsYWNlaG9sZGVyLmFmdGVyKCBfbGFzdElubGluZUVsZW1lbnQuYWRkQ2xhc3MoX2hpZGRlbkNsYXNzKSApLmRldGFjaCgpO1xuXHRcdFx0X2xhc3RJbmxpbmVFbGVtZW50ID0gbnVsbDtcblx0XHR9XG5cdH07XG5cbiQubWFnbmlmaWNQb3B1cC5yZWdpc3Rlck1vZHVsZShJTkxJTkVfTlMsIHtcblx0b3B0aW9uczoge1xuXHRcdGhpZGRlbkNsYXNzOiAnaGlkZScsIC8vIHdpbGwgYmUgYXBwZW5kZWQgd2l0aCBgbWZwLWAgcHJlZml4XG5cdFx0bWFya3VwOiAnJyxcblx0XHR0Tm90Rm91bmQ6ICdDb250ZW50IG5vdCBmb3VuZCdcblx0fSxcblx0cHJvdG86IHtcblxuXHRcdGluaXRJbmxpbmU6IGZ1bmN0aW9uKCkge1xuXHRcdFx0bWZwLnR5cGVzLnB1c2goSU5MSU5FX05TKTtcblxuXHRcdFx0X21mcE9uKENMT1NFX0VWRU5UKycuJytJTkxJTkVfTlMsIGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRfcHV0SW5saW5lRWxlbWVudHNCYWNrKCk7XG5cdFx0XHR9KTtcblx0XHR9LFxuXG5cdFx0Z2V0SW5saW5lOiBmdW5jdGlvbihpdGVtLCB0ZW1wbGF0ZSkge1xuXG5cdFx0XHRfcHV0SW5saW5lRWxlbWVudHNCYWNrKCk7XG5cblx0XHRcdGlmKGl0ZW0uc3JjKSB7XG5cdFx0XHRcdHZhciBpbmxpbmVTdCA9IG1mcC5zdC5pbmxpbmUsXG5cdFx0XHRcdFx0ZWwgPSAkKGl0ZW0uc3JjKTtcblxuXHRcdFx0XHRpZihlbC5sZW5ndGgpIHtcblxuXHRcdFx0XHRcdC8vIElmIHRhcmdldCBlbGVtZW50IGhhcyBwYXJlbnQgLSB3ZSByZXBsYWNlIGl0IHdpdGggcGxhY2Vob2xkZXIgYW5kIHB1dCBpdCBiYWNrIGFmdGVyIHBvcHVwIGlzIGNsb3NlZFxuXHRcdFx0XHRcdHZhciBwYXJlbnQgPSBlbFswXS5wYXJlbnROb2RlO1xuXHRcdFx0XHRcdGlmKHBhcmVudCAmJiBwYXJlbnQudGFnTmFtZSkge1xuXHRcdFx0XHRcdFx0aWYoIV9pbmxpbmVQbGFjZWhvbGRlcikge1xuXHRcdFx0XHRcdFx0XHRfaGlkZGVuQ2xhc3MgPSBpbmxpbmVTdC5oaWRkZW5DbGFzcztcblx0XHRcdFx0XHRcdFx0X2lubGluZVBsYWNlaG9sZGVyID0gX2dldEVsKF9oaWRkZW5DbGFzcyk7XG5cdFx0XHRcdFx0XHRcdF9oaWRkZW5DbGFzcyA9ICdtZnAtJytfaGlkZGVuQ2xhc3M7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHQvLyByZXBsYWNlIHRhcmdldCBpbmxpbmUgZWxlbWVudCB3aXRoIHBsYWNlaG9sZGVyXG5cdFx0XHRcdFx0XHRfbGFzdElubGluZUVsZW1lbnQgPSBlbC5hZnRlcihfaW5saW5lUGxhY2Vob2xkZXIpLmRldGFjaCgpLnJlbW92ZUNsYXNzKF9oaWRkZW5DbGFzcyk7XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0bWZwLnVwZGF0ZVN0YXR1cygncmVhZHknKTtcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRtZnAudXBkYXRlU3RhdHVzKCdlcnJvcicsIGlubGluZVN0LnROb3RGb3VuZCk7XG5cdFx0XHRcdFx0ZWwgPSAkKCc8ZGl2PicpO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0aXRlbS5pbmxpbmVFbGVtZW50ID0gZWw7XG5cdFx0XHRcdHJldHVybiBlbDtcblx0XHRcdH1cblxuXHRcdFx0bWZwLnVwZGF0ZVN0YXR1cygncmVhZHknKTtcblx0XHRcdG1mcC5fcGFyc2VNYXJrdXAodGVtcGxhdGUsIHt9LCBpdGVtKTtcblx0XHRcdHJldHVybiB0ZW1wbGF0ZTtcblx0XHR9XG5cdH1cbn0pO1xuXG4vKj4+aW5saW5lKi9cblxuLyo+PmFqYXgqL1xudmFyIEFKQVhfTlMgPSAnYWpheCcsXG5cdF9hamF4Q3VyLFxuXHRfcmVtb3ZlQWpheEN1cnNvciA9IGZ1bmN0aW9uKCkge1xuXHRcdGlmKF9hamF4Q3VyKSB7XG5cdFx0XHQkKGRvY3VtZW50LmJvZHkpLnJlbW92ZUNsYXNzKF9hamF4Q3VyKTtcblx0XHR9XG5cdH0sXG5cdF9kZXN0cm95QWpheFJlcXVlc3QgPSBmdW5jdGlvbigpIHtcblx0XHRfcmVtb3ZlQWpheEN1cnNvcigpO1xuXHRcdGlmKG1mcC5yZXEpIHtcblx0XHRcdG1mcC5yZXEuYWJvcnQoKTtcblx0XHR9XG5cdH07XG5cbiQubWFnbmlmaWNQb3B1cC5yZWdpc3Rlck1vZHVsZShBSkFYX05TLCB7XG5cblx0b3B0aW9uczoge1xuXHRcdHNldHRpbmdzOiBudWxsLFxuXHRcdGN1cnNvcjogJ21mcC1hamF4LWN1cicsXG5cdFx0dEVycm9yOiAnPGEgaHJlZj1cIiV1cmwlXCI+VGhlIGNvbnRlbnQ8L2E+IGNvdWxkIG5vdCBiZSBsb2FkZWQuJ1xuXHR9LFxuXG5cdHByb3RvOiB7XG5cdFx0aW5pdEFqYXg6IGZ1bmN0aW9uKCkge1xuXHRcdFx0bWZwLnR5cGVzLnB1c2goQUpBWF9OUyk7XG5cdFx0XHRfYWpheEN1ciA9IG1mcC5zdC5hamF4LmN1cnNvcjtcblxuXHRcdFx0X21mcE9uKENMT1NFX0VWRU5UKycuJytBSkFYX05TLCBfZGVzdHJveUFqYXhSZXF1ZXN0KTtcblx0XHRcdF9tZnBPbignQmVmb3JlQ2hhbmdlLicgKyBBSkFYX05TLCBfZGVzdHJveUFqYXhSZXF1ZXN0KTtcblx0XHR9LFxuXHRcdGdldEFqYXg6IGZ1bmN0aW9uKGl0ZW0pIHtcblxuXHRcdFx0aWYoX2FqYXhDdXIpIHtcblx0XHRcdFx0JChkb2N1bWVudC5ib2R5KS5hZGRDbGFzcyhfYWpheEN1cik7XG5cdFx0XHR9XG5cblx0XHRcdG1mcC51cGRhdGVTdGF0dXMoJ2xvYWRpbmcnKTtcblxuXHRcdFx0dmFyIG9wdHMgPSAkLmV4dGVuZCh7XG5cdFx0XHRcdHVybDogaXRlbS5zcmMsXG5cdFx0XHRcdHN1Y2Nlc3M6IGZ1bmN0aW9uKGRhdGEsIHRleHRTdGF0dXMsIGpxWEhSKSB7XG5cdFx0XHRcdFx0dmFyIHRlbXAgPSB7XG5cdFx0XHRcdFx0XHRkYXRhOmRhdGEsXG5cdFx0XHRcdFx0XHR4aHI6anFYSFJcblx0XHRcdFx0XHR9O1xuXG5cdFx0XHRcdFx0X21mcFRyaWdnZXIoJ1BhcnNlQWpheCcsIHRlbXApO1xuXG5cdFx0XHRcdFx0bWZwLmFwcGVuZENvbnRlbnQoICQodGVtcC5kYXRhKSwgQUpBWF9OUyApO1xuXG5cdFx0XHRcdFx0aXRlbS5maW5pc2hlZCA9IHRydWU7XG5cblx0XHRcdFx0XHRfcmVtb3ZlQWpheEN1cnNvcigpO1xuXG5cdFx0XHRcdFx0bWZwLl9zZXRGb2N1cygpO1xuXG5cdFx0XHRcdFx0c2V0VGltZW91dChmdW5jdGlvbigpIHtcblx0XHRcdFx0XHRcdG1mcC53cmFwLmFkZENsYXNzKFJFQURZX0NMQVNTKTtcblx0XHRcdFx0XHR9LCAxNik7XG5cblx0XHRcdFx0XHRtZnAudXBkYXRlU3RhdHVzKCdyZWFkeScpO1xuXG5cdFx0XHRcdFx0X21mcFRyaWdnZXIoJ0FqYXhDb250ZW50QWRkZWQnKTtcblx0XHRcdFx0fSxcblx0XHRcdFx0ZXJyb3I6IGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRcdF9yZW1vdmVBamF4Q3Vyc29yKCk7XG5cdFx0XHRcdFx0aXRlbS5maW5pc2hlZCA9IGl0ZW0ubG9hZEVycm9yID0gdHJ1ZTtcblx0XHRcdFx0XHRtZnAudXBkYXRlU3RhdHVzKCdlcnJvcicsIG1mcC5zdC5hamF4LnRFcnJvci5yZXBsYWNlKCcldXJsJScsIGl0ZW0uc3JjKSk7XG5cdFx0XHRcdH1cblx0XHRcdH0sIG1mcC5zdC5hamF4LnNldHRpbmdzKTtcblxuXHRcdFx0bWZwLnJlcSA9ICQuYWpheChvcHRzKTtcblxuXHRcdFx0cmV0dXJuICcnO1xuXHRcdH1cblx0fVxufSk7XG5cbi8qPj5hamF4Ki9cblxuLyo+PmltYWdlKi9cbnZhciBfaW1nSW50ZXJ2YWwsXG5cdF9nZXRUaXRsZSA9IGZ1bmN0aW9uKGl0ZW0pIHtcblx0XHRpZihpdGVtLmRhdGEgJiYgaXRlbS5kYXRhLnRpdGxlICE9PSB1bmRlZmluZWQpXG5cdFx0XHRyZXR1cm4gaXRlbS5kYXRhLnRpdGxlO1xuXG5cdFx0dmFyIHNyYyA9IG1mcC5zdC5pbWFnZS50aXRsZVNyYztcblxuXHRcdGlmKHNyYykge1xuXHRcdFx0aWYoJC5pc0Z1bmN0aW9uKHNyYykpIHtcblx0XHRcdFx0cmV0dXJuIHNyYy5jYWxsKG1mcCwgaXRlbSk7XG5cdFx0XHR9IGVsc2UgaWYoaXRlbS5lbCkge1xuXHRcdFx0XHRyZXR1cm4gaXRlbS5lbC5hdHRyKHNyYykgfHwgJyc7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdHJldHVybiAnJztcblx0fTtcblxuJC5tYWduaWZpY1BvcHVwLnJlZ2lzdGVyTW9kdWxlKCdpbWFnZScsIHtcblxuXHRvcHRpb25zOiB7XG5cdFx0bWFya3VwOiAnPGRpdiBjbGFzcz1cIm1mcC1maWd1cmVcIj4nK1xuXHRcdFx0XHRcdCc8ZGl2IGNsYXNzPVwibWZwLWNsb3NlXCI+PC9kaXY+Jytcblx0XHRcdFx0XHQnPGZpZ3VyZT4nK1xuXHRcdFx0XHRcdFx0JzxkaXYgY2xhc3M9XCJtZnAtaW1nXCI+PC9kaXY+Jytcblx0XHRcdFx0XHRcdCc8ZmlnY2FwdGlvbj4nK1xuXHRcdFx0XHRcdFx0XHQnPGRpdiBjbGFzcz1cIm1mcC1ib3R0b20tYmFyXCI+Jytcblx0XHRcdFx0XHRcdFx0XHQnPGRpdiBjbGFzcz1cIm1mcC10aXRsZVwiPjwvZGl2PicrXG5cdFx0XHRcdFx0XHRcdFx0JzxkaXYgY2xhc3M9XCJtZnAtY291bnRlclwiPjwvZGl2PicrXG5cdFx0XHRcdFx0XHRcdCc8L2Rpdj4nK1xuXHRcdFx0XHRcdFx0JzwvZmlnY2FwdGlvbj4nK1xuXHRcdFx0XHRcdCc8L2ZpZ3VyZT4nK1xuXHRcdFx0XHQnPC9kaXY+Jyxcblx0XHRjdXJzb3I6ICdtZnAtem9vbS1vdXQtY3VyJyxcblx0XHR0aXRsZVNyYzogJ3RpdGxlJyxcblx0XHR2ZXJ0aWNhbEZpdDogdHJ1ZSxcblx0XHR0RXJyb3I6ICc8YSBocmVmPVwiJXVybCVcIj5UaGUgaW1hZ2U8L2E+IGNvdWxkIG5vdCBiZSBsb2FkZWQuJ1xuXHR9LFxuXG5cdHByb3RvOiB7XG5cdFx0aW5pdEltYWdlOiBmdW5jdGlvbigpIHtcblx0XHRcdHZhciBpbWdTdCA9IG1mcC5zdC5pbWFnZSxcblx0XHRcdFx0bnMgPSAnLmltYWdlJztcblxuXHRcdFx0bWZwLnR5cGVzLnB1c2goJ2ltYWdlJyk7XG5cblx0XHRcdF9tZnBPbihPUEVOX0VWRU5UK25zLCBmdW5jdGlvbigpIHtcblx0XHRcdFx0aWYobWZwLmN1cnJJdGVtLnR5cGUgPT09ICdpbWFnZScgJiYgaW1nU3QuY3Vyc29yKSB7XG5cdFx0XHRcdFx0JChkb2N1bWVudC5ib2R5KS5hZGRDbGFzcyhpbWdTdC5jdXJzb3IpO1xuXHRcdFx0XHR9XG5cdFx0XHR9KTtcblxuXHRcdFx0X21mcE9uKENMT1NFX0VWRU5UK25zLCBmdW5jdGlvbigpIHtcblx0XHRcdFx0aWYoaW1nU3QuY3Vyc29yKSB7XG5cdFx0XHRcdFx0JChkb2N1bWVudC5ib2R5KS5yZW1vdmVDbGFzcyhpbWdTdC5jdXJzb3IpO1xuXHRcdFx0XHR9XG5cdFx0XHRcdF93aW5kb3cub2ZmKCdyZXNpemUnICsgRVZFTlRfTlMpO1xuXHRcdFx0fSk7XG5cblx0XHRcdF9tZnBPbignUmVzaXplJytucywgbWZwLnJlc2l6ZUltYWdlKTtcblx0XHRcdGlmKG1mcC5pc0xvd0lFKSB7XG5cdFx0XHRcdF9tZnBPbignQWZ0ZXJDaGFuZ2UnLCBtZnAucmVzaXplSW1hZ2UpO1xuXHRcdFx0fVxuXHRcdH0sXG5cdFx0cmVzaXplSW1hZ2U6IGZ1bmN0aW9uKCkge1xuXHRcdFx0dmFyIGl0ZW0gPSBtZnAuY3Vyckl0ZW07XG5cdFx0XHRpZighaXRlbSB8fCAhaXRlbS5pbWcpIHJldHVybjtcblxuXHRcdFx0aWYobWZwLnN0LmltYWdlLnZlcnRpY2FsRml0KSB7XG5cdFx0XHRcdHZhciBkZWNyID0gMDtcblx0XHRcdFx0Ly8gZml4IGJveC1zaXppbmcgaW4gaWU3Lzhcblx0XHRcdFx0aWYobWZwLmlzTG93SUUpIHtcblx0XHRcdFx0XHRkZWNyID0gcGFyc2VJbnQoaXRlbS5pbWcuY3NzKCdwYWRkaW5nLXRvcCcpLCAxMCkgKyBwYXJzZUludChpdGVtLmltZy5jc3MoJ3BhZGRpbmctYm90dG9tJyksMTApO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGl0ZW0uaW1nLmNzcygnbWF4LWhlaWdodCcsIG1mcC53SC1kZWNyKTtcblx0XHRcdH1cblx0XHR9LFxuXHRcdF9vbkltYWdlSGFzU2l6ZTogZnVuY3Rpb24oaXRlbSkge1xuXHRcdFx0aWYoaXRlbS5pbWcpIHtcblxuXHRcdFx0XHRpdGVtLmhhc1NpemUgPSB0cnVlO1xuXG5cdFx0XHRcdGlmKF9pbWdJbnRlcnZhbCkge1xuXHRcdFx0XHRcdGNsZWFySW50ZXJ2YWwoX2ltZ0ludGVydmFsKTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdGl0ZW0uaXNDaGVja2luZ0ltZ1NpemUgPSBmYWxzZTtcblxuXHRcdFx0XHRfbWZwVHJpZ2dlcignSW1hZ2VIYXNTaXplJywgaXRlbSk7XG5cblx0XHRcdFx0aWYoaXRlbS5pbWdIaWRkZW4pIHtcblx0XHRcdFx0XHRpZihtZnAuY29udGVudClcblx0XHRcdFx0XHRcdG1mcC5jb250ZW50LnJlbW92ZUNsYXNzKCdtZnAtbG9hZGluZycpO1xuXG5cdFx0XHRcdFx0aXRlbS5pbWdIaWRkZW4gPSBmYWxzZTtcblx0XHRcdFx0fVxuXG5cdFx0XHR9XG5cdFx0fSxcblxuXHRcdC8qKlxuXHRcdCAqIEZ1bmN0aW9uIHRoYXQgbG9vcHMgdW50aWwgdGhlIGltYWdlIGhhcyBzaXplIHRvIGRpc3BsYXkgZWxlbWVudHMgdGhhdCByZWx5IG9uIGl0IGFzYXBcblx0XHQgKi9cblx0XHRmaW5kSW1hZ2VTaXplOiBmdW5jdGlvbihpdGVtKSB7XG5cblx0XHRcdHZhciBjb3VudGVyID0gMCxcblx0XHRcdFx0aW1nID0gaXRlbS5pbWdbMF0sXG5cdFx0XHRcdG1mcFNldEludGVydmFsID0gZnVuY3Rpb24oZGVsYXkpIHtcblxuXHRcdFx0XHRcdGlmKF9pbWdJbnRlcnZhbCkge1xuXHRcdFx0XHRcdFx0Y2xlYXJJbnRlcnZhbChfaW1nSW50ZXJ2YWwpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHQvLyBkZWNlbGVyYXRpbmcgaW50ZXJ2YWwgdGhhdCBjaGVja3MgZm9yIHNpemUgb2YgYW4gaW1hZ2Vcblx0XHRcdFx0XHRfaW1nSW50ZXJ2YWwgPSBzZXRJbnRlcnZhbChmdW5jdGlvbigpIHtcblx0XHRcdFx0XHRcdGlmKGltZy5uYXR1cmFsV2lkdGggPiAwKSB7XG5cdFx0XHRcdFx0XHRcdG1mcC5fb25JbWFnZUhhc1NpemUoaXRlbSk7XG5cdFx0XHRcdFx0XHRcdHJldHVybjtcblx0XHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdFx0aWYoY291bnRlciA+IDIwMCkge1xuXHRcdFx0XHRcdFx0XHRjbGVhckludGVydmFsKF9pbWdJbnRlcnZhbCk7XG5cdFx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRcdGNvdW50ZXIrKztcblx0XHRcdFx0XHRcdGlmKGNvdW50ZXIgPT09IDMpIHtcblx0XHRcdFx0XHRcdFx0bWZwU2V0SW50ZXJ2YWwoMTApO1xuXHRcdFx0XHRcdFx0fSBlbHNlIGlmKGNvdW50ZXIgPT09IDQwKSB7XG5cdFx0XHRcdFx0XHRcdG1mcFNldEludGVydmFsKDUwKTtcblx0XHRcdFx0XHRcdH0gZWxzZSBpZihjb3VudGVyID09PSAxMDApIHtcblx0XHRcdFx0XHRcdFx0bWZwU2V0SW50ZXJ2YWwoNTAwKTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9LCBkZWxheSk7XG5cdFx0XHRcdH07XG5cblx0XHRcdG1mcFNldEludGVydmFsKDEpO1xuXHRcdH0sXG5cblx0XHRnZXRJbWFnZTogZnVuY3Rpb24oaXRlbSwgdGVtcGxhdGUpIHtcblxuXHRcdFx0dmFyIGd1YXJkID0gMCxcblxuXHRcdFx0XHQvLyBpbWFnZSBsb2FkIGNvbXBsZXRlIGhhbmRsZXJcblx0XHRcdFx0b25Mb2FkQ29tcGxldGUgPSBmdW5jdGlvbigpIHtcblx0XHRcdFx0XHRpZihpdGVtKSB7XG5cdFx0XHRcdFx0XHRpZiAoaXRlbS5pbWdbMF0uY29tcGxldGUpIHtcblx0XHRcdFx0XHRcdFx0aXRlbS5pbWcub2ZmKCcubWZwbG9hZGVyJyk7XG5cblx0XHRcdFx0XHRcdFx0aWYoaXRlbSA9PT0gbWZwLmN1cnJJdGVtKXtcblx0XHRcdFx0XHRcdFx0XHRtZnAuX29uSW1hZ2VIYXNTaXplKGl0ZW0pO1xuXG5cdFx0XHRcdFx0XHRcdFx0bWZwLnVwZGF0ZVN0YXR1cygncmVhZHknKTtcblx0XHRcdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0XHRcdGl0ZW0uaGFzU2l6ZSA9IHRydWU7XG5cdFx0XHRcdFx0XHRcdGl0ZW0ubG9hZGVkID0gdHJ1ZTtcblxuXHRcdFx0XHRcdFx0XHRfbWZwVHJpZ2dlcignSW1hZ2VMb2FkQ29tcGxldGUnKTtcblxuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0ZWxzZSB7XG5cdFx0XHRcdFx0XHRcdC8vIGlmIGltYWdlIGNvbXBsZXRlIGNoZWNrIGZhaWxzIDIwMCB0aW1lcyAoMjAgc2VjKSwgd2UgYXNzdW1lIHRoYXQgdGhlcmUgd2FzIGFuIGVycm9yLlxuXHRcdFx0XHRcdFx0XHRndWFyZCsrO1xuXHRcdFx0XHRcdFx0XHRpZihndWFyZCA8IDIwMCkge1xuXHRcdFx0XHRcdFx0XHRcdHNldFRpbWVvdXQob25Mb2FkQ29tcGxldGUsMTAwKTtcblx0XHRcdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdFx0XHRvbkxvYWRFcnJvcigpO1xuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9LFxuXG5cdFx0XHRcdC8vIGltYWdlIGVycm9yIGhhbmRsZXJcblx0XHRcdFx0b25Mb2FkRXJyb3IgPSBmdW5jdGlvbigpIHtcblx0XHRcdFx0XHRpZihpdGVtKSB7XG5cdFx0XHRcdFx0XHRpdGVtLmltZy5vZmYoJy5tZnBsb2FkZXInKTtcblx0XHRcdFx0XHRcdGlmKGl0ZW0gPT09IG1mcC5jdXJySXRlbSl7XG5cdFx0XHRcdFx0XHRcdG1mcC5fb25JbWFnZUhhc1NpemUoaXRlbSk7XG5cdFx0XHRcdFx0XHRcdG1mcC51cGRhdGVTdGF0dXMoJ2Vycm9yJywgaW1nU3QudEVycm9yLnJlcGxhY2UoJyV1cmwlJywgaXRlbS5zcmMpICk7XG5cdFx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRcdGl0ZW0uaGFzU2l6ZSA9IHRydWU7XG5cdFx0XHRcdFx0XHRpdGVtLmxvYWRlZCA9IHRydWU7XG5cdFx0XHRcdFx0XHRpdGVtLmxvYWRFcnJvciA9IHRydWU7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9LFxuXHRcdFx0XHRpbWdTdCA9IG1mcC5zdC5pbWFnZTtcblxuXG5cdFx0XHR2YXIgZWwgPSB0ZW1wbGF0ZS5maW5kKCcubWZwLWltZycpO1xuXHRcdFx0aWYoZWwubGVuZ3RoKSB7XG5cdFx0XHRcdHZhciBpbWcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbWcnKTtcblx0XHRcdFx0aW1nLmNsYXNzTmFtZSA9ICdtZnAtaW1nJztcblx0XHRcdFx0aWYoaXRlbS5lbCAmJiBpdGVtLmVsLmZpbmQoJ2ltZycpLmxlbmd0aCkge1xuXHRcdFx0XHRcdGltZy5hbHQgPSBpdGVtLmVsLmZpbmQoJ2ltZycpLmF0dHIoJ2FsdCcpO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGl0ZW0uaW1nID0gJChpbWcpLm9uKCdsb2FkLm1mcGxvYWRlcicsIG9uTG9hZENvbXBsZXRlKS5vbignZXJyb3IubWZwbG9hZGVyJywgb25Mb2FkRXJyb3IpO1xuXHRcdFx0XHRpbWcuc3JjID0gaXRlbS5zcmM7XG5cblx0XHRcdFx0Ly8gd2l0aG91dCBjbG9uZSgpIFwiZXJyb3JcIiBldmVudCBpcyBub3QgZmlyaW5nIHdoZW4gSU1HIGlzIHJlcGxhY2VkIGJ5IG5ldyBJTUdcblx0XHRcdFx0Ly8gVE9ETzogZmluZCBhIHdheSB0byBhdm9pZCBzdWNoIGNsb25pbmdcblx0XHRcdFx0aWYoZWwuaXMoJ2ltZycpKSB7XG5cdFx0XHRcdFx0aXRlbS5pbWcgPSBpdGVtLmltZy5jbG9uZSgpO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0aW1nID0gaXRlbS5pbWdbMF07XG5cdFx0XHRcdGlmKGltZy5uYXR1cmFsV2lkdGggPiAwKSB7XG5cdFx0XHRcdFx0aXRlbS5oYXNTaXplID0gdHJ1ZTtcblx0XHRcdFx0fSBlbHNlIGlmKCFpbWcud2lkdGgpIHtcblx0XHRcdFx0XHRpdGVtLmhhc1NpemUgPSBmYWxzZTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXG5cdFx0XHRtZnAuX3BhcnNlTWFya3VwKHRlbXBsYXRlLCB7XG5cdFx0XHRcdHRpdGxlOiBfZ2V0VGl0bGUoaXRlbSksXG5cdFx0XHRcdGltZ19yZXBsYWNlV2l0aDogaXRlbS5pbWdcblx0XHRcdH0sIGl0ZW0pO1xuXG5cdFx0XHRtZnAucmVzaXplSW1hZ2UoKTtcblxuXHRcdFx0aWYoaXRlbS5oYXNTaXplKSB7XG5cdFx0XHRcdGlmKF9pbWdJbnRlcnZhbCkgY2xlYXJJbnRlcnZhbChfaW1nSW50ZXJ2YWwpO1xuXG5cdFx0XHRcdGlmKGl0ZW0ubG9hZEVycm9yKSB7XG5cdFx0XHRcdFx0dGVtcGxhdGUuYWRkQ2xhc3MoJ21mcC1sb2FkaW5nJyk7XG5cdFx0XHRcdFx0bWZwLnVwZGF0ZVN0YXR1cygnZXJyb3InLCBpbWdTdC50RXJyb3IucmVwbGFjZSgnJXVybCUnLCBpdGVtLnNyYykgKTtcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHR0ZW1wbGF0ZS5yZW1vdmVDbGFzcygnbWZwLWxvYWRpbmcnKTtcblx0XHRcdFx0XHRtZnAudXBkYXRlU3RhdHVzKCdyZWFkeScpO1xuXHRcdFx0XHR9XG5cdFx0XHRcdHJldHVybiB0ZW1wbGF0ZTtcblx0XHRcdH1cblxuXHRcdFx0bWZwLnVwZGF0ZVN0YXR1cygnbG9hZGluZycpO1xuXHRcdFx0aXRlbS5sb2FkaW5nID0gdHJ1ZTtcblxuXHRcdFx0aWYoIWl0ZW0uaGFzU2l6ZSkge1xuXHRcdFx0XHRpdGVtLmltZ0hpZGRlbiA9IHRydWU7XG5cdFx0XHRcdHRlbXBsYXRlLmFkZENsYXNzKCdtZnAtbG9hZGluZycpO1xuXHRcdFx0XHRtZnAuZmluZEltYWdlU2l6ZShpdGVtKTtcblx0XHRcdH1cblxuXHRcdFx0cmV0dXJuIHRlbXBsYXRlO1xuXHRcdH1cblx0fVxufSk7XG5cbi8qPj5pbWFnZSovXG5cbi8qPj56b29tKi9cbnZhciBoYXNNb3pUcmFuc2Zvcm0sXG5cdGdldEhhc01velRyYW5zZm9ybSA9IGZ1bmN0aW9uKCkge1xuXHRcdGlmKGhhc01velRyYW5zZm9ybSA9PT0gdW5kZWZpbmVkKSB7XG5cdFx0XHRoYXNNb3pUcmFuc2Zvcm0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwJykuc3R5bGUuTW96VHJhbnNmb3JtICE9PSB1bmRlZmluZWQ7XG5cdFx0fVxuXHRcdHJldHVybiBoYXNNb3pUcmFuc2Zvcm07XG5cdH07XG5cbiQubWFnbmlmaWNQb3B1cC5yZWdpc3Rlck1vZHVsZSgnem9vbScsIHtcblxuXHRvcHRpb25zOiB7XG5cdFx0ZW5hYmxlZDogZmFsc2UsXG5cdFx0ZWFzaW5nOiAnZWFzZS1pbi1vdXQnLFxuXHRcdGR1cmF0aW9uOiAzMDAsXG5cdFx0b3BlbmVyOiBmdW5jdGlvbihlbGVtZW50KSB7XG5cdFx0XHRyZXR1cm4gZWxlbWVudC5pcygnaW1nJykgPyBlbGVtZW50IDogZWxlbWVudC5maW5kKCdpbWcnKTtcblx0XHR9XG5cdH0sXG5cblx0cHJvdG86IHtcblxuXHRcdGluaXRab29tOiBmdW5jdGlvbigpIHtcblx0XHRcdHZhciB6b29tU3QgPSBtZnAuc3Quem9vbSxcblx0XHRcdFx0bnMgPSAnLnpvb20nLFxuXHRcdFx0XHRpbWFnZTtcblxuXHRcdFx0aWYoIXpvb21TdC5lbmFibGVkIHx8ICFtZnAuc3VwcG9ydHNUcmFuc2l0aW9uKSB7XG5cdFx0XHRcdHJldHVybjtcblx0XHRcdH1cblxuXHRcdFx0dmFyIGR1cmF0aW9uID0gem9vbVN0LmR1cmF0aW9uLFxuXHRcdFx0XHRnZXRFbFRvQW5pbWF0ZSA9IGZ1bmN0aW9uKGltYWdlKSB7XG5cdFx0XHRcdFx0dmFyIG5ld0ltZyA9IGltYWdlLmNsb25lKCkucmVtb3ZlQXR0cignc3R5bGUnKS5yZW1vdmVBdHRyKCdjbGFzcycpLmFkZENsYXNzKCdtZnAtYW5pbWF0ZWQtaW1hZ2UnKSxcblx0XHRcdFx0XHRcdHRyYW5zaXRpb24gPSAnYWxsICcrKHpvb21TdC5kdXJhdGlvbi8xMDAwKSsncyAnICsgem9vbVN0LmVhc2luZyxcblx0XHRcdFx0XHRcdGNzc09iaiA9IHtcblx0XHRcdFx0XHRcdFx0cG9zaXRpb246ICdmaXhlZCcsXG5cdFx0XHRcdFx0XHRcdHpJbmRleDogOTk5OSxcblx0XHRcdFx0XHRcdFx0bGVmdDogMCxcblx0XHRcdFx0XHRcdFx0dG9wOiAwLFxuXHRcdFx0XHRcdFx0XHQnLXdlYmtpdC1iYWNrZmFjZS12aXNpYmlsaXR5JzogJ2hpZGRlbidcblx0XHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0XHR0ID0gJ3RyYW5zaXRpb24nO1xuXG5cdFx0XHRcdFx0Y3NzT2JqWyctd2Via2l0LScrdF0gPSBjc3NPYmpbJy1tb3otJyt0XSA9IGNzc09ialsnLW8tJyt0XSA9IGNzc09ialt0XSA9IHRyYW5zaXRpb247XG5cblx0XHRcdFx0XHRuZXdJbWcuY3NzKGNzc09iaik7XG5cdFx0XHRcdFx0cmV0dXJuIG5ld0ltZztcblx0XHRcdFx0fSxcblx0XHRcdFx0c2hvd01haW5Db250ZW50ID0gZnVuY3Rpb24oKSB7XG5cdFx0XHRcdFx0bWZwLmNvbnRlbnQuY3NzKCd2aXNpYmlsaXR5JywgJ3Zpc2libGUnKTtcblx0XHRcdFx0fSxcblx0XHRcdFx0b3BlblRpbWVvdXQsXG5cdFx0XHRcdGFuaW1hdGVkSW1nO1xuXG5cdFx0XHRfbWZwT24oJ0J1aWxkQ29udHJvbHMnK25zLCBmdW5jdGlvbigpIHtcblx0XHRcdFx0aWYobWZwLl9hbGxvd1pvb20oKSkge1xuXG5cdFx0XHRcdFx0Y2xlYXJUaW1lb3V0KG9wZW5UaW1lb3V0KTtcblx0XHRcdFx0XHRtZnAuY29udGVudC5jc3MoJ3Zpc2liaWxpdHknLCAnaGlkZGVuJyk7XG5cblx0XHRcdFx0XHQvLyBCYXNpY2FsbHksIGFsbCBjb2RlIGJlbG93IGRvZXMgaXMgY2xvbmVzIGV4aXN0aW5nIGltYWdlLCBwdXRzIGluIG9uIHRvcCBvZiB0aGUgY3VycmVudCBvbmUgYW5kIGFuaW1hdGVkIGl0XG5cblx0XHRcdFx0XHRpbWFnZSA9IG1mcC5fZ2V0SXRlbVRvWm9vbSgpO1xuXG5cdFx0XHRcdFx0aWYoIWltYWdlKSB7XG5cdFx0XHRcdFx0XHRzaG93TWFpbkNvbnRlbnQoKTtcblx0XHRcdFx0XHRcdHJldHVybjtcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRhbmltYXRlZEltZyA9IGdldEVsVG9BbmltYXRlKGltYWdlKTtcblxuXHRcdFx0XHRcdGFuaW1hdGVkSW1nLmNzcyggbWZwLl9nZXRPZmZzZXQoKSApO1xuXG5cdFx0XHRcdFx0bWZwLndyYXAuYXBwZW5kKGFuaW1hdGVkSW1nKTtcblxuXHRcdFx0XHRcdG9wZW5UaW1lb3V0ID0gc2V0VGltZW91dChmdW5jdGlvbigpIHtcblx0XHRcdFx0XHRcdGFuaW1hdGVkSW1nLmNzcyggbWZwLl9nZXRPZmZzZXQoIHRydWUgKSApO1xuXHRcdFx0XHRcdFx0b3BlblRpbWVvdXQgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuXG5cdFx0XHRcdFx0XHRcdHNob3dNYWluQ29udGVudCgpO1xuXG5cdFx0XHRcdFx0XHRcdHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG5cdFx0XHRcdFx0XHRcdFx0YW5pbWF0ZWRJbWcucmVtb3ZlKCk7XG5cdFx0XHRcdFx0XHRcdFx0aW1hZ2UgPSBhbmltYXRlZEltZyA9IG51bGw7XG5cdFx0XHRcdFx0XHRcdFx0X21mcFRyaWdnZXIoJ1pvb21BbmltYXRpb25FbmRlZCcpO1xuXHRcdFx0XHRcdFx0XHR9LCAxNik7IC8vIGF2b2lkIGJsaW5rIHdoZW4gc3dpdGNoaW5nIGltYWdlc1xuXG5cdFx0XHRcdFx0XHR9LCBkdXJhdGlvbik7IC8vIHRoaXMgdGltZW91dCBlcXVhbHMgYW5pbWF0aW9uIGR1cmF0aW9uXG5cblx0XHRcdFx0XHR9LCAxNik7IC8vIGJ5IGFkZGluZyB0aGlzIHRpbWVvdXQgd2UgYXZvaWQgc2hvcnQgZ2xpdGNoIGF0IHRoZSBiZWdpbm5pbmcgb2YgYW5pbWF0aW9uXG5cblxuXHRcdFx0XHRcdC8vIExvdHMgb2YgdGltZW91dHMuLi5cblx0XHRcdFx0fVxuXHRcdFx0fSk7XG5cdFx0XHRfbWZwT24oQkVGT1JFX0NMT1NFX0VWRU5UK25zLCBmdW5jdGlvbigpIHtcblx0XHRcdFx0aWYobWZwLl9hbGxvd1pvb20oKSkge1xuXG5cdFx0XHRcdFx0Y2xlYXJUaW1lb3V0KG9wZW5UaW1lb3V0KTtcblxuXHRcdFx0XHRcdG1mcC5zdC5yZW1vdmFsRGVsYXkgPSBkdXJhdGlvbjtcblxuXHRcdFx0XHRcdGlmKCFpbWFnZSkge1xuXHRcdFx0XHRcdFx0aW1hZ2UgPSBtZnAuX2dldEl0ZW1Ub1pvb20oKTtcblx0XHRcdFx0XHRcdGlmKCFpbWFnZSkge1xuXHRcdFx0XHRcdFx0XHRyZXR1cm47XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRhbmltYXRlZEltZyA9IGdldEVsVG9BbmltYXRlKGltYWdlKTtcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRhbmltYXRlZEltZy5jc3MoIG1mcC5fZ2V0T2Zmc2V0KHRydWUpICk7XG5cdFx0XHRcdFx0bWZwLndyYXAuYXBwZW5kKGFuaW1hdGVkSW1nKTtcblx0XHRcdFx0XHRtZnAuY29udGVudC5jc3MoJ3Zpc2liaWxpdHknLCAnaGlkZGVuJyk7XG5cblx0XHRcdFx0XHRzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRcdFx0YW5pbWF0ZWRJbWcuY3NzKCBtZnAuX2dldE9mZnNldCgpICk7XG5cdFx0XHRcdFx0fSwgMTYpO1xuXHRcdFx0XHR9XG5cblx0XHRcdH0pO1xuXG5cdFx0XHRfbWZwT24oQ0xPU0VfRVZFTlQrbnMsIGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRpZihtZnAuX2FsbG93Wm9vbSgpKSB7XG5cdFx0XHRcdFx0c2hvd01haW5Db250ZW50KCk7XG5cdFx0XHRcdFx0aWYoYW5pbWF0ZWRJbWcpIHtcblx0XHRcdFx0XHRcdGFuaW1hdGVkSW1nLnJlbW92ZSgpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRpbWFnZSA9IG51bGw7XG5cdFx0XHRcdH1cblx0XHRcdH0pO1xuXHRcdH0sXG5cblx0XHRfYWxsb3dab29tOiBmdW5jdGlvbigpIHtcblx0XHRcdHJldHVybiBtZnAuY3Vyckl0ZW0udHlwZSA9PT0gJ2ltYWdlJztcblx0XHR9LFxuXG5cdFx0X2dldEl0ZW1Ub1pvb206IGZ1bmN0aW9uKCkge1xuXHRcdFx0aWYobWZwLmN1cnJJdGVtLmhhc1NpemUpIHtcblx0XHRcdFx0cmV0dXJuIG1mcC5jdXJySXRlbS5pbWc7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0XHR9XG5cdFx0fSxcblxuXHRcdC8vIEdldCBlbGVtZW50IHBvc3Rpb24gcmVsYXRpdmUgdG8gdmlld3BvcnRcblx0XHRfZ2V0T2Zmc2V0OiBmdW5jdGlvbihpc0xhcmdlKSB7XG5cdFx0XHR2YXIgZWw7XG5cdFx0XHRpZihpc0xhcmdlKSB7XG5cdFx0XHRcdGVsID0gbWZwLmN1cnJJdGVtLmltZztcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGVsID0gbWZwLnN0Lnpvb20ub3BlbmVyKG1mcC5jdXJySXRlbS5lbCB8fCBtZnAuY3Vyckl0ZW0pO1xuXHRcdFx0fVxuXG5cdFx0XHR2YXIgb2Zmc2V0ID0gZWwub2Zmc2V0KCk7XG5cdFx0XHR2YXIgcGFkZGluZ1RvcCA9IHBhcnNlSW50KGVsLmNzcygncGFkZGluZy10b3AnKSwxMCk7XG5cdFx0XHR2YXIgcGFkZGluZ0JvdHRvbSA9IHBhcnNlSW50KGVsLmNzcygncGFkZGluZy1ib3R0b20nKSwxMCk7XG5cdFx0XHRvZmZzZXQudG9wIC09ICggJCh3aW5kb3cpLnNjcm9sbFRvcCgpIC0gcGFkZGluZ1RvcCApO1xuXG5cblx0XHRcdC8qXG5cblx0XHRcdEFuaW1hdGluZyBsZWZ0ICsgdG9wICsgd2lkdGgvaGVpZ2h0IGxvb2tzIGdsaXRjaHkgaW4gRmlyZWZveCwgYnV0IHBlcmZlY3QgaW4gQ2hyb21lLiBBbmQgdmljZS12ZXJzYS5cblxuXHRcdFx0ICovXG5cdFx0XHR2YXIgb2JqID0ge1xuXHRcdFx0XHR3aWR0aDogZWwud2lkdGgoKSxcblx0XHRcdFx0Ly8gZml4IFplcHRvIGhlaWdodCtwYWRkaW5nIGlzc3VlXG5cdFx0XHRcdGhlaWdodDogKF9pc0pRID8gZWwuaW5uZXJIZWlnaHQoKSA6IGVsWzBdLm9mZnNldEhlaWdodCkgLSBwYWRkaW5nQm90dG9tIC0gcGFkZGluZ1RvcFxuXHRcdFx0fTtcblxuXHRcdFx0Ly8gSSBoYXRlIHRvIGRvIHRoaXMsIGJ1dCB0aGVyZSBpcyBubyBhbm90aGVyIG9wdGlvblxuXHRcdFx0aWYoIGdldEhhc01velRyYW5zZm9ybSgpICkge1xuXHRcdFx0XHRvYmpbJy1tb3otdHJhbnNmb3JtJ10gPSBvYmpbJ3RyYW5zZm9ybSddID0gJ3RyYW5zbGF0ZSgnICsgb2Zmc2V0LmxlZnQgKyAncHgsJyArIG9mZnNldC50b3AgKyAncHgpJztcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdG9iai5sZWZ0ID0gb2Zmc2V0LmxlZnQ7XG5cdFx0XHRcdG9iai50b3AgPSBvZmZzZXQudG9wO1xuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIG9iajtcblx0XHR9XG5cblx0fVxufSk7XG5cblxuXG4vKj4+em9vbSovXG5cbi8qPj5pZnJhbWUqL1xuXG52YXIgSUZSQU1FX05TID0gJ2lmcmFtZScsXG5cdF9lbXB0eVBhZ2UgPSAnLy9hYm91dDpibGFuaycsXG5cblx0X2ZpeElmcmFtZUJ1Z3MgPSBmdW5jdGlvbihpc1Nob3dpbmcpIHtcblx0XHRpZihtZnAuY3VyclRlbXBsYXRlW0lGUkFNRV9OU10pIHtcblx0XHRcdHZhciBlbCA9IG1mcC5jdXJyVGVtcGxhdGVbSUZSQU1FX05TXS5maW5kKCdpZnJhbWUnKTtcblx0XHRcdGlmKGVsLmxlbmd0aCkge1xuXHRcdFx0XHQvLyByZXNldCBzcmMgYWZ0ZXIgdGhlIHBvcHVwIGlzIGNsb3NlZCB0byBhdm9pZCBcInZpZGVvIGtlZXBzIHBsYXlpbmcgYWZ0ZXIgcG9wdXAgaXMgY2xvc2VkXCIgYnVnXG5cdFx0XHRcdGlmKCFpc1Nob3dpbmcpIHtcblx0XHRcdFx0XHRlbFswXS5zcmMgPSBfZW1wdHlQYWdlO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0Ly8gSUU4IGJsYWNrIHNjcmVlbiBidWcgZml4XG5cdFx0XHRcdGlmKG1mcC5pc0lFOCkge1xuXHRcdFx0XHRcdGVsLmNzcygnZGlzcGxheScsIGlzU2hvd2luZyA/ICdibG9jaycgOiAnbm9uZScpO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXHR9O1xuXG4kLm1hZ25pZmljUG9wdXAucmVnaXN0ZXJNb2R1bGUoSUZSQU1FX05TLCB7XG5cblx0b3B0aW9uczoge1xuXHRcdG1hcmt1cDogJzxkaXYgY2xhc3M9XCJtZnAtaWZyYW1lLXNjYWxlclwiPicrXG5cdFx0XHRcdFx0JzxkaXYgY2xhc3M9XCJtZnAtY2xvc2VcIj48L2Rpdj4nK1xuXHRcdFx0XHRcdCc8aWZyYW1lIGNsYXNzPVwibWZwLWlmcmFtZVwiIHNyYz1cIi8vYWJvdXQ6YmxhbmtcIiBmcmFtZWJvcmRlcj1cIjBcIiBhbGxvd2Z1bGxzY3JlZW4+PC9pZnJhbWU+Jytcblx0XHRcdFx0JzwvZGl2PicsXG5cblx0XHRzcmNBY3Rpb246ICdpZnJhbWVfc3JjJyxcblxuXHRcdC8vIHdlIGRvbid0IGNhcmUgYW5kIHN1cHBvcnQgb25seSBvbmUgZGVmYXVsdCB0eXBlIG9mIFVSTCBieSBkZWZhdWx0XG5cdFx0cGF0dGVybnM6IHtcblx0XHRcdHlvdXR1YmU6IHtcblx0XHRcdFx0aW5kZXg6ICd5b3V0dWJlLmNvbScsXG5cdFx0XHRcdGlkOiAndj0nLFxuXHRcdFx0XHRzcmM6ICcvL3d3dy55b3V0dWJlLmNvbS9lbWJlZC8laWQlP2F1dG9wbGF5PTEnXG5cdFx0XHR9LFxuXHRcdFx0dmltZW86IHtcblx0XHRcdFx0aW5kZXg6ICd2aW1lby5jb20vJyxcblx0XHRcdFx0aWQ6ICcvJyxcblx0XHRcdFx0c3JjOiAnLy9wbGF5ZXIudmltZW8uY29tL3ZpZGVvLyVpZCU/YXV0b3BsYXk9MSdcblx0XHRcdH0sXG5cdFx0XHRnbWFwczoge1xuXHRcdFx0XHRpbmRleDogJy8vbWFwcy5nb29nbGUuJyxcblx0XHRcdFx0c3JjOiAnJWlkJSZvdXRwdXQ9ZW1iZWQnXG5cdFx0XHR9XG5cdFx0fVxuXHR9LFxuXG5cdHByb3RvOiB7XG5cdFx0aW5pdElmcmFtZTogZnVuY3Rpb24oKSB7XG5cdFx0XHRtZnAudHlwZXMucHVzaChJRlJBTUVfTlMpO1xuXG5cdFx0XHRfbWZwT24oJ0JlZm9yZUNoYW5nZScsIGZ1bmN0aW9uKGUsIHByZXZUeXBlLCBuZXdUeXBlKSB7XG5cdFx0XHRcdGlmKHByZXZUeXBlICE9PSBuZXdUeXBlKSB7XG5cdFx0XHRcdFx0aWYocHJldlR5cGUgPT09IElGUkFNRV9OUykge1xuXHRcdFx0XHRcdFx0X2ZpeElmcmFtZUJ1Z3MoKTsgLy8gaWZyYW1lIGlmIHJlbW92ZWRcblx0XHRcdFx0XHR9IGVsc2UgaWYobmV3VHlwZSA9PT0gSUZSQU1FX05TKSB7XG5cdFx0XHRcdFx0XHRfZml4SWZyYW1lQnVncyh0cnVlKTsgLy8gaWZyYW1lIGlzIHNob3dpbmdcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0vLyBlbHNlIHtcblx0XHRcdFx0XHQvLyBpZnJhbWUgc291cmNlIGlzIHN3aXRjaGVkLCBkb24ndCBkbyBhbnl0aGluZ1xuXHRcdFx0XHQvL31cblx0XHRcdH0pO1xuXG5cdFx0XHRfbWZwT24oQ0xPU0VfRVZFTlQgKyAnLicgKyBJRlJBTUVfTlMsIGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRfZml4SWZyYW1lQnVncygpO1xuXHRcdFx0fSk7XG5cdFx0fSxcblxuXHRcdGdldElmcmFtZTogZnVuY3Rpb24oaXRlbSwgdGVtcGxhdGUpIHtcblx0XHRcdHZhciBlbWJlZFNyYyA9IGl0ZW0uc3JjO1xuXHRcdFx0dmFyIGlmcmFtZVN0ID0gbWZwLnN0LmlmcmFtZTtcblxuXHRcdFx0JC5lYWNoKGlmcmFtZVN0LnBhdHRlcm5zLCBmdW5jdGlvbigpIHtcblx0XHRcdFx0aWYoZW1iZWRTcmMuaW5kZXhPZiggdGhpcy5pbmRleCApID4gLTEpIHtcblx0XHRcdFx0XHRpZih0aGlzLmlkKSB7XG5cdFx0XHRcdFx0XHRpZih0eXBlb2YgdGhpcy5pZCA9PT0gJ3N0cmluZycpIHtcblx0XHRcdFx0XHRcdFx0ZW1iZWRTcmMgPSBlbWJlZFNyYy5zdWJzdHIoZW1iZWRTcmMubGFzdEluZGV4T2YodGhpcy5pZCkrdGhpcy5pZC5sZW5ndGgsIGVtYmVkU3JjLmxlbmd0aCk7XG5cdFx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0XHRlbWJlZFNyYyA9IHRoaXMuaWQuY2FsbCggdGhpcywgZW1iZWRTcmMgKTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0ZW1iZWRTcmMgPSB0aGlzLnNyYy5yZXBsYWNlKCclaWQlJywgZW1iZWRTcmMgKTtcblx0XHRcdFx0XHRyZXR1cm4gZmFsc2U7IC8vIGJyZWFrO1xuXHRcdFx0XHR9XG5cdFx0XHR9KTtcblxuXHRcdFx0dmFyIGRhdGFPYmogPSB7fTtcblx0XHRcdGlmKGlmcmFtZVN0LnNyY0FjdGlvbikge1xuXHRcdFx0XHRkYXRhT2JqW2lmcmFtZVN0LnNyY0FjdGlvbl0gPSBlbWJlZFNyYztcblx0XHRcdH1cblx0XHRcdG1mcC5fcGFyc2VNYXJrdXAodGVtcGxhdGUsIGRhdGFPYmosIGl0ZW0pO1xuXG5cdFx0XHRtZnAudXBkYXRlU3RhdHVzKCdyZWFkeScpO1xuXG5cdFx0XHRyZXR1cm4gdGVtcGxhdGU7XG5cdFx0fVxuXHR9XG59KTtcblxuXG5cbi8qPj5pZnJhbWUqL1xuXG4vKj4+Z2FsbGVyeSovXG4vKipcbiAqIEdldCBsb29wZWQgaW5kZXggZGVwZW5kaW5nIG9uIG51bWJlciBvZiBzbGlkZXNcbiAqL1xudmFyIF9nZXRMb29wZWRJZCA9IGZ1bmN0aW9uKGluZGV4KSB7XG5cdFx0dmFyIG51bVNsaWRlcyA9IG1mcC5pdGVtcy5sZW5ndGg7XG5cdFx0aWYoaW5kZXggPiBudW1TbGlkZXMgLSAxKSB7XG5cdFx0XHRyZXR1cm4gaW5kZXggLSBudW1TbGlkZXM7XG5cdFx0fSBlbHNlICBpZihpbmRleCA8IDApIHtcblx0XHRcdHJldHVybiBudW1TbGlkZXMgKyBpbmRleDtcblx0XHR9XG5cdFx0cmV0dXJuIGluZGV4O1xuXHR9LFxuXHRfcmVwbGFjZUN1cnJUb3RhbCA9IGZ1bmN0aW9uKHRleHQsIGN1cnIsIHRvdGFsKSB7XG5cdFx0cmV0dXJuIHRleHQucmVwbGFjZSgvJWN1cnIlL2dpLCBjdXJyICsgMSkucmVwbGFjZSgvJXRvdGFsJS9naSwgdG90YWwpO1xuXHR9O1xuXG4kLm1hZ25pZmljUG9wdXAucmVnaXN0ZXJNb2R1bGUoJ2dhbGxlcnknLCB7XG5cblx0b3B0aW9uczoge1xuXHRcdGVuYWJsZWQ6IGZhbHNlLFxuXHRcdGFycm93TWFya3VwOiAnPGJ1dHRvbiB0aXRsZT1cIiV0aXRsZSVcIiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJtZnAtYXJyb3cgbWZwLWFycm93LSVkaXIlXCI+PC9idXR0b24+Jyxcblx0XHRwcmVsb2FkOiBbMCwyXSxcblx0XHRuYXZpZ2F0ZUJ5SW1nQ2xpY2s6IHRydWUsXG5cdFx0YXJyb3dzOiB0cnVlLFxuXG5cdFx0dFByZXY6ICdQcmV2aW91cyAoTGVmdCBhcnJvdyBrZXkpJyxcblx0XHR0TmV4dDogJ05leHQgKFJpZ2h0IGFycm93IGtleSknLFxuXHRcdHRDb3VudGVyOiAnJWN1cnIlIG9mICV0b3RhbCUnXG5cdH0sXG5cblx0cHJvdG86IHtcblx0XHRpbml0R2FsbGVyeTogZnVuY3Rpb24oKSB7XG5cblx0XHRcdHZhciBnU3QgPSBtZnAuc3QuZ2FsbGVyeSxcblx0XHRcdFx0bnMgPSAnLm1mcC1nYWxsZXJ5JztcblxuXHRcdFx0bWZwLmRpcmVjdGlvbiA9IHRydWU7IC8vIHRydWUgLSBuZXh0LCBmYWxzZSAtIHByZXZcblxuXHRcdFx0aWYoIWdTdCB8fCAhZ1N0LmVuYWJsZWQgKSByZXR1cm4gZmFsc2U7XG5cblx0XHRcdF93cmFwQ2xhc3NlcyArPSAnIG1mcC1nYWxsZXJ5JztcblxuXHRcdFx0X21mcE9uKE9QRU5fRVZFTlQrbnMsIGZ1bmN0aW9uKCkge1xuXG5cdFx0XHRcdGlmKGdTdC5uYXZpZ2F0ZUJ5SW1nQ2xpY2spIHtcblx0XHRcdFx0XHRtZnAud3JhcC5vbignY2xpY2snK25zLCAnLm1mcC1pbWcnLCBmdW5jdGlvbigpIHtcblx0XHRcdFx0XHRcdGlmKG1mcC5pdGVtcy5sZW5ndGggPiAxKSB7XG5cdFx0XHRcdFx0XHRcdG1mcC5uZXh0KCk7XG5cdFx0XHRcdFx0XHRcdHJldHVybiBmYWxzZTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9KTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdF9kb2N1bWVudC5vbigna2V5ZG93bicrbnMsIGZ1bmN0aW9uKGUpIHtcblx0XHRcdFx0XHRpZiAoZS5rZXlDb2RlID09PSAzNykge1xuXHRcdFx0XHRcdFx0bWZwLnByZXYoKTtcblx0XHRcdFx0XHR9IGVsc2UgaWYgKGUua2V5Q29kZSA9PT0gMzkpIHtcblx0XHRcdFx0XHRcdG1mcC5uZXh0KCk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9KTtcblx0XHRcdH0pO1xuXG5cdFx0XHRfbWZwT24oJ1VwZGF0ZVN0YXR1cycrbnMsIGZ1bmN0aW9uKGUsIGRhdGEpIHtcblx0XHRcdFx0aWYoZGF0YS50ZXh0KSB7XG5cdFx0XHRcdFx0ZGF0YS50ZXh0ID0gX3JlcGxhY2VDdXJyVG90YWwoZGF0YS50ZXh0LCBtZnAuY3Vyckl0ZW0uaW5kZXgsIG1mcC5pdGVtcy5sZW5ndGgpO1xuXHRcdFx0XHR9XG5cdFx0XHR9KTtcblxuXHRcdFx0X21mcE9uKE1BUktVUF9QQVJTRV9FVkVOVCtucywgZnVuY3Rpb24oZSwgZWxlbWVudCwgdmFsdWVzLCBpdGVtKSB7XG5cdFx0XHRcdHZhciBsID0gbWZwLml0ZW1zLmxlbmd0aDtcblx0XHRcdFx0dmFsdWVzLmNvdW50ZXIgPSBsID4gMSA/IF9yZXBsYWNlQ3VyclRvdGFsKGdTdC50Q291bnRlciwgaXRlbS5pbmRleCwgbCkgOiAnJztcblx0XHRcdH0pO1xuXG5cdFx0XHRfbWZwT24oJ0J1aWxkQ29udHJvbHMnICsgbnMsIGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRpZihtZnAuaXRlbXMubGVuZ3RoID4gMSAmJiBnU3QuYXJyb3dzICYmICFtZnAuYXJyb3dMZWZ0KSB7XG5cdFx0XHRcdFx0dmFyIG1hcmt1cCA9IGdTdC5hcnJvd01hcmt1cCxcblx0XHRcdFx0XHRcdGFycm93TGVmdCA9IG1mcC5hcnJvd0xlZnQgPSAkKCBtYXJrdXAucmVwbGFjZSgvJXRpdGxlJS9naSwgZ1N0LnRQcmV2KS5yZXBsYWNlKC8lZGlyJS9naSwgJ2xlZnQnKSApLmFkZENsYXNzKFBSRVZFTlRfQ0xPU0VfQ0xBU1MpLFxuXHRcdFx0XHRcdFx0YXJyb3dSaWdodCA9IG1mcC5hcnJvd1JpZ2h0ID0gJCggbWFya3VwLnJlcGxhY2UoLyV0aXRsZSUvZ2ksIGdTdC50TmV4dCkucmVwbGFjZSgvJWRpciUvZ2ksICdyaWdodCcpICkuYWRkQ2xhc3MoUFJFVkVOVF9DTE9TRV9DTEFTUyk7XG5cblx0XHRcdFx0XHRhcnJvd0xlZnQuY2xpY2soZnVuY3Rpb24oKSB7XG5cdFx0XHRcdFx0XHRtZnAucHJldigpO1xuXHRcdFx0XHRcdH0pO1xuXHRcdFx0XHRcdGFycm93UmlnaHQuY2xpY2soZnVuY3Rpb24oKSB7XG5cdFx0XHRcdFx0XHRtZnAubmV4dCgpO1xuXHRcdFx0XHRcdH0pO1xuXG5cdFx0XHRcdFx0bWZwLmNvbnRhaW5lci5hcHBlbmQoYXJyb3dMZWZ0LmFkZChhcnJvd1JpZ2h0KSk7XG5cdFx0XHRcdH1cblx0XHRcdH0pO1xuXG5cdFx0XHRfbWZwT24oQ0hBTkdFX0VWRU5UK25zLCBmdW5jdGlvbigpIHtcblx0XHRcdFx0aWYobWZwLl9wcmVsb2FkVGltZW91dCkgY2xlYXJUaW1lb3V0KG1mcC5fcHJlbG9hZFRpbWVvdXQpO1xuXG5cdFx0XHRcdG1mcC5fcHJlbG9hZFRpbWVvdXQgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRcdG1mcC5wcmVsb2FkTmVhcmJ5SW1hZ2VzKCk7XG5cdFx0XHRcdFx0bWZwLl9wcmVsb2FkVGltZW91dCA9IG51bGw7XG5cdFx0XHRcdH0sIDE2KTtcblx0XHRcdH0pO1xuXG5cblx0XHRcdF9tZnBPbihDTE9TRV9FVkVOVCtucywgZnVuY3Rpb24oKSB7XG5cdFx0XHRcdF9kb2N1bWVudC5vZmYobnMpO1xuXHRcdFx0XHRtZnAud3JhcC5vZmYoJ2NsaWNrJytucyk7XG5cdFx0XHRcdG1mcC5hcnJvd1JpZ2h0ID0gbWZwLmFycm93TGVmdCA9IG51bGw7XG5cdFx0XHR9KTtcblxuXHRcdH0sXG5cdFx0bmV4dDogZnVuY3Rpb24oKSB7XG5cdFx0XHRtZnAuZGlyZWN0aW9uID0gdHJ1ZTtcblx0XHRcdG1mcC5pbmRleCA9IF9nZXRMb29wZWRJZChtZnAuaW5kZXggKyAxKTtcblx0XHRcdG1mcC51cGRhdGVJdGVtSFRNTCgpO1xuXHRcdH0sXG5cdFx0cHJldjogZnVuY3Rpb24oKSB7XG5cdFx0XHRtZnAuZGlyZWN0aW9uID0gZmFsc2U7XG5cdFx0XHRtZnAuaW5kZXggPSBfZ2V0TG9vcGVkSWQobWZwLmluZGV4IC0gMSk7XG5cdFx0XHRtZnAudXBkYXRlSXRlbUhUTUwoKTtcblx0XHR9LFxuXHRcdGdvVG86IGZ1bmN0aW9uKG5ld0luZGV4KSB7XG5cdFx0XHRtZnAuZGlyZWN0aW9uID0gKG5ld0luZGV4ID49IG1mcC5pbmRleCk7XG5cdFx0XHRtZnAuaW5kZXggPSBuZXdJbmRleDtcblx0XHRcdG1mcC51cGRhdGVJdGVtSFRNTCgpO1xuXHRcdH0sXG5cdFx0cHJlbG9hZE5lYXJieUltYWdlczogZnVuY3Rpb24oKSB7XG5cdFx0XHR2YXIgcCA9IG1mcC5zdC5nYWxsZXJ5LnByZWxvYWQsXG5cdFx0XHRcdHByZWxvYWRCZWZvcmUgPSBNYXRoLm1pbihwWzBdLCBtZnAuaXRlbXMubGVuZ3RoKSxcblx0XHRcdFx0cHJlbG9hZEFmdGVyID0gTWF0aC5taW4ocFsxXSwgbWZwLml0ZW1zLmxlbmd0aCksXG5cdFx0XHRcdGk7XG5cblx0XHRcdGZvcihpID0gMTsgaSA8PSAobWZwLmRpcmVjdGlvbiA/IHByZWxvYWRBZnRlciA6IHByZWxvYWRCZWZvcmUpOyBpKyspIHtcblx0XHRcdFx0bWZwLl9wcmVsb2FkSXRlbShtZnAuaW5kZXgraSk7XG5cdFx0XHR9XG5cdFx0XHRmb3IoaSA9IDE7IGkgPD0gKG1mcC5kaXJlY3Rpb24gPyBwcmVsb2FkQmVmb3JlIDogcHJlbG9hZEFmdGVyKTsgaSsrKSB7XG5cdFx0XHRcdG1mcC5fcHJlbG9hZEl0ZW0obWZwLmluZGV4LWkpO1xuXHRcdFx0fVxuXHRcdH0sXG5cdFx0X3ByZWxvYWRJdGVtOiBmdW5jdGlvbihpbmRleCkge1xuXHRcdFx0aW5kZXggPSBfZ2V0TG9vcGVkSWQoaW5kZXgpO1xuXG5cdFx0XHRpZihtZnAuaXRlbXNbaW5kZXhdLnByZWxvYWRlZCkge1xuXHRcdFx0XHRyZXR1cm47XG5cdFx0XHR9XG5cblx0XHRcdHZhciBpdGVtID0gbWZwLml0ZW1zW2luZGV4XTtcblx0XHRcdGlmKCFpdGVtLnBhcnNlZCkge1xuXHRcdFx0XHRpdGVtID0gbWZwLnBhcnNlRWwoIGluZGV4ICk7XG5cdFx0XHR9XG5cblx0XHRcdF9tZnBUcmlnZ2VyKCdMYXp5TG9hZCcsIGl0ZW0pO1xuXG5cdFx0XHRpZihpdGVtLnR5cGUgPT09ICdpbWFnZScpIHtcblx0XHRcdFx0aXRlbS5pbWcgPSAkKCc8aW1nIGNsYXNzPVwibWZwLWltZ1wiIC8+Jykub24oJ2xvYWQubWZwbG9hZGVyJywgZnVuY3Rpb24oKSB7XG5cdFx0XHRcdFx0aXRlbS5oYXNTaXplID0gdHJ1ZTtcblx0XHRcdFx0fSkub24oJ2Vycm9yLm1mcGxvYWRlcicsIGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRcdGl0ZW0uaGFzU2l6ZSA9IHRydWU7XG5cdFx0XHRcdFx0aXRlbS5sb2FkRXJyb3IgPSB0cnVlO1xuXHRcdFx0XHRcdF9tZnBUcmlnZ2VyKCdMYXp5TG9hZEVycm9yJywgaXRlbSk7XG5cdFx0XHRcdH0pLmF0dHIoJ3NyYycsIGl0ZW0uc3JjKTtcblx0XHRcdH1cblxuXG5cdFx0XHRpdGVtLnByZWxvYWRlZCA9IHRydWU7XG5cdFx0fVxuXHR9XG59KTtcblxuLyo+PmdhbGxlcnkqL1xuXG4vKj4+cmV0aW5hKi9cblxudmFyIFJFVElOQV9OUyA9ICdyZXRpbmEnO1xuXG4kLm1hZ25pZmljUG9wdXAucmVnaXN0ZXJNb2R1bGUoUkVUSU5BX05TLCB7XG5cdG9wdGlvbnM6IHtcblx0XHRyZXBsYWNlU3JjOiBmdW5jdGlvbihpdGVtKSB7XG5cdFx0XHRyZXR1cm4gaXRlbS5zcmMucmVwbGFjZSgvXFwuXFx3KyQvLCBmdW5jdGlvbihtKSB7IHJldHVybiAnQDJ4JyArIG07IH0pO1xuXHRcdH0sXG5cdFx0cmF0aW86IDEgLy8gRnVuY3Rpb24gb3IgbnVtYmVyLiAgU2V0IHRvIDEgdG8gZGlzYWJsZS5cblx0fSxcblx0cHJvdG86IHtcblx0XHRpbml0UmV0aW5hOiBmdW5jdGlvbigpIHtcblx0XHRcdGlmKHdpbmRvdy5kZXZpY2VQaXhlbFJhdGlvID4gMSkge1xuXG5cdFx0XHRcdHZhciBzdCA9IG1mcC5zdC5yZXRpbmEsXG5cdFx0XHRcdFx0cmF0aW8gPSBzdC5yYXRpbztcblxuXHRcdFx0XHRyYXRpbyA9ICFpc05hTihyYXRpbykgPyByYXRpbyA6IHJhdGlvKCk7XG5cblx0XHRcdFx0aWYocmF0aW8gPiAxKSB7XG5cdFx0XHRcdFx0X21mcE9uKCdJbWFnZUhhc1NpemUnICsgJy4nICsgUkVUSU5BX05TLCBmdW5jdGlvbihlLCBpdGVtKSB7XG5cdFx0XHRcdFx0XHRpdGVtLmltZy5jc3Moe1xuXHRcdFx0XHRcdFx0XHQnbWF4LXdpZHRoJzogaXRlbS5pbWdbMF0ubmF0dXJhbFdpZHRoIC8gcmF0aW8sXG5cdFx0XHRcdFx0XHRcdCd3aWR0aCc6ICcxMDAlJ1xuXHRcdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0X21mcE9uKCdFbGVtZW50UGFyc2UnICsgJy4nICsgUkVUSU5BX05TLCBmdW5jdGlvbihlLCBpdGVtKSB7XG5cdFx0XHRcdFx0XHRpdGVtLnNyYyA9IHN0LnJlcGxhY2VTcmMoaXRlbSwgcmF0aW8pO1xuXHRcdFx0XHRcdH0pO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cblx0XHR9XG5cdH1cbn0pO1xuXG4vKj4+cmV0aW5hKi9cbiBfY2hlY2tJbnN0YW5jZSgpOyB9KSk7Il0sImZpbGUiOiJtYWduaWZpYy1wb3B1cC5qcyJ9
