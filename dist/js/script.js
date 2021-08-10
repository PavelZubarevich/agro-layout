"use strict";

function _createForOfIteratorHelper(o, allowArrayLike) {
	var it;
	if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) {
		if (
			Array.isArray(o) ||
			(it = _unsupportedIterableToArray(o)) ||
			(allowArrayLike && o && typeof o.length === "number")
		) {
			if (it) o = it;
			var i = 0;
			var F = function F() {};
			return {
				s: F,
				n: function n() {
					if (i >= o.length) return { done: true };
					return { done: false, value: o[i++] };
				},
				e: function e(_e) {
					throw _e;
				},
				f: F,
			};
		}
		throw new TypeError(
			"Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."
		);
	}
	var normalCompletion = true,
		didErr = false,
		err;
	return {
		s: function s() {
			it = o[Symbol.iterator]();
		},
		n: function n() {
			var step = it.next();
			normalCompletion = step.done;
			return step;
		},
		e: function e(_e2) {
			didErr = true;
			err = _e2;
		},
		f: function f() {
			try {
				if (!normalCompletion && it["return"] != null) it["return"]();
			} finally {
				if (didErr) throw err;
			}
		},
	};
}

function _unsupportedIterableToArray(o, minLen) {
	if (!o) return;
	if (typeof o === "string") return _arrayLikeToArray(o, minLen);
	var n = Object.prototype.toString.call(o).slice(8, -1);
	if (n === "Object" && o.constructor) n = o.constructor.name;
	if (n === "Map" || n === "Set") return Array.from(o);
	if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _arrayLikeToArray(arr, len) {
	if (len == null || len > arr.length) len = arr.length;
	for (var i = 0, arr2 = new Array(len); i < len; i++) {
		arr2[i] = arr[i];
	}
	return arr2;
}

function _classCallCheck(instance, Constructor) {
	if (!(instance instanceof Constructor)) {
		throw new TypeError("Cannot call a class as a function");
	}
}

function _defineProperties(target, props) {
	for (var i = 0; i < props.length; i++) {
		var descriptor = props[i];
		descriptor.enumerable = descriptor.enumerable || false;
		descriptor.configurable = true;
		if ("value" in descriptor) descriptor.writable = true;
		Object.defineProperty(target, descriptor.key, descriptor);
	}
}

function _createClass(Constructor, protoProps, staticProps) {
	if (protoProps) _defineProperties(Constructor.prototype, protoProps);
	if (staticProps) _defineProperties(Constructor, staticProps);
	return Constructor;
}

//========== very Alpha v0.0.0 ============ //
var Slider = /*#__PURE__*/ (function () {
	function Slider(_ref) {
		var _ref$dots = _ref.dots,
			dots = _ref$dots === void 0 ? null : _ref$dots,
			_ref$infinity = _ref.infinity,
			infinity = _ref$infinity === void 0 ? false : _ref$infinity,
			_ref$slidesToShow = _ref.slidesToShow,
			slidesToShow = _ref$slidesToShow === void 0 ? 1 : _ref$slidesToShow,
			_ref$autoHeight = _ref.autoHeight,
			autoHeight = _ref$autoHeight === void 0 ? false : _ref$autoHeight,
			_ref$id = _ref.id,
			id = _ref$id === void 0 ? null : _ref$id;

		_classCallCheck(this, Slider);

		(this.dots = dots),
			(this.infinity = infinity),
			(this.slidesToShow = slidesToShow),
			(this.autoHeight = autoHeight),
			(this.id = id);
	}

	_createClass(Slider, [
		{
			key: "init",
			value: function init() {
				var sliderBlock = document.querySelector(this.id ? "#".concat(this.id) : "#slider");

				if (sliderBlock) {
					this.slidesBlock = sliderBlock.children.slides;
					this.slides = this.slidesBlock.children;
					this.numberOfSlides = this.slides.length;
					this.curentSlide = 0;
					this.prepareSlides();
					this.dots && this.prepareDots(sliderBlock);
					this.noEvents = true;
					this.tuchSlide();
					this.autoHeight && this.autoHeightHandler(this.infinity, 0);
				}
			},
		},
		{
			key: "prepareSlides",
			value: function prepareSlides() {
				this.slidesArray = [];
				this.heightArray = [];

				var _iterator = _createForOfIteratorHelper(this.slides),
					_step;

				try {
					for (_iterator.s(); !(_step = _iterator.n()).done; ) {
						var slide = _step.value;
						this.slidesArray.push(slide);
						this.heightArray.push(parseInt(getComputedStyle(slide.children[0]).getPropertyValue("height")) + 20);
					}
				} catch (err) {
					_iterator.e(err);
				} finally {
					_iterator.f();
				}

				for (var i = 0; i < this.numberOfSlides; i++) {
					this.slides[0].remove();
				}

				this.showSlides();
			},
		},
		{
			key: "showSlides",
			value: function showSlides() {
				this.infinity ? (this.slideOffset = -100) : (this.slideOffset = 0);

				var _iterator2 = _createForOfIteratorHelper(this.slidesArray),
					_step2;

				try {
					for (_iterator2.s(); !(_step2 = _iterator2.n()).done; ) {
						var slide = _step2.value;
						slide.style.transform = "translate(".concat(this.slideOffset, "%, 0)");
						slide.style.transition = "0.3s";
						this.slidesBlock.append(slide);
					}
				} catch (err) {
					_iterator2.e(err);
				} finally {
					_iterator2.f();
				}
			},
		},
		{
			key: "prepareDots",
			value: function prepareDots(sliderBlock) {
				this.dotsBlock = sliderBlock.children.dots;
				var dot = this.dotsBlock.children;

				for (var i = 0; i < this.numberOfSlides; i++) {
					var customDot = dot[0].cloneNode(true);
					customDot.children[0].setAttribute("data-id", i);
					i === 0 && (customDot.children[0].checked = true);
					customDot.addEventListener("change", this.shiftSlide.bind(this));
					this.dotsBlock.append(customDot);
				}

				dot[0].remove();
			},
		},
		{
			key: "shiftSlide",
			value: function shiftSlide(e, nextSlide) {
				var _this = this;

				if (!nextSlide && nextSlide !== 0) {
					nextSlide = e.target.dataset.id;
				}

				var isForward = null;

				if (nextSlide - this.curentSlide === 1) {
					this.slideOffset = this.slideOffset - 100;
					isForward = true;
				} else if (nextSlide - this.curentSlide === -1) {
					this.slideOffset = this.slideOffset + 100;
					isForward = false;
				} else if (nextSlide - this.curentSlide === -2) {
					this.infinity
						? (this.slideOffset = this.slideOffset - 100)
						: (this.slideOffset = this.slideOffset + 200);
					isForward = true;
				} else if (nextSlide - this.curentSlide === 2) {
					this.infinity
						? (this.slideOffset = this.slideOffset + 100)
						: (this.slideOffset = this.slideOffset - 200);
					isForward = true;
				}

				var _iterator3 = _createForOfIteratorHelper(this.slidesArray),
					_step3;

				try {
					for (_iterator3.s(); !(_step3 = _iterator3.n()).done; ) {
						var slide = _step3.value;
						slide.style.transform = "translate(".concat(this.slideOffset, "%, 0)");
					}
				} catch (err) {
					_iterator3.e(err);
				} finally {
					_iterator3.f();
				}

				if (nextSlide >= 3) {
					nextSlide = 0;
				}

				if (nextSlide <= -1) {
					nextSlide = 2;
				}

				this.curentSlide = nextSlide;

				var _iterator4 = _createForOfIteratorHelper(this.dotsBlock.children),
					_step4;

				try {
					for (_iterator4.s(); !(_step4 = _iterator4.n()).done; ) {
						var dot = _step4.value;

						if (+this.curentSlide === +dot.children[0].dataset.id) {
							dot.children[0].checked = true;
							this.autoHeight && this.autoHeightHandler(this.infinity, +dot.children[0].dataset.id);
						}
					}
				} catch (err) {
					_iterator4.e(err);
				} finally {
					_iterator4.f();
				}

				this.infinity &&
					setTimeout(function () {
						return _this.updateSlides(isForward);
					}, 300);
			},
		},
		{
			key: "tuchSlide",
			value: function tuchSlide() {
				var offset = 0;
				var startCords;
				var movebind = move.bind(this);

				if (this.noEvents) {
					this.slidesBlock.addEventListener("pointerdown", keypress.bind(this));
					this.slidesBlock.addEventListener("pointerup", clearEvents.bind(this));
					this.noEvents = false;
				}

				function clearEvents() {
					document.removeEventListener("pointermove", movebind);

					var _iterator5 = _createForOfIteratorHelper(this.slidesArray),
						_step5;

					try {
						for (_iterator5.s(); !(_step5 = _iterator5.n()).done; ) {
							var slide = _step5.value;
							slide.style.transform = "translate(".concat(this.slideOffset, "%, 0)");
						}
					} catch (err) {
						_iterator5.e(err);
					} finally {
						_iterator5.f();
					}
				}

				function keypress(e) {
					e.preventDefault();
					startCords = e.clientX;
					document.addEventListener("pointermove", movebind);
				}

				function move(e) {
					var scale = window.innerWidth < 768 ? 3 : 5;
					offset = -Math.round((startCords - e.clientX) / scale);

					var _iterator6 = _createForOfIteratorHelper(this.slidesArray),
						_step6;

					try {
						for (_iterator6.s(); !(_step6 = _iterator6.n()).done; ) {
							var slide = _step6.value;
							slide.style.transform = "translate(".concat(this.slideOffset + offset, "%, 0)");
						}
					} catch (err) {
						_iterator6.e(err);
					} finally {
						_iterator6.f();
					}

					if (offset === -70) {
						this.shiftSlide.bind(this)(null, this.curentSlide + 1);
						clearEvents.bind(this)();
					}

					if (offset === 70) {
						this.shiftSlide.bind(this)(null, this.curentSlide - 1);
						clearEvents.bind(this)();
					}
				}
			},
		},
		{
			key: "updateSlides",
			value: function updateSlides(isForward) {
				var element = null;

				if (isForward) {
					element = this.slidesArray.shift();
					this.slidesArray.push(element);
				} else if (isForward === false) {
					element = this.slidesArray.pop();
					this.slidesArray.unshift(element);
				}

				this.showSlides();
			},
		},
		{
			key: "autoHeightHandler",
			value: function autoHeightHandler(infiniti, index) {
				infiniti && index++;
				index === 3 && (index = 0);
				this.slidesBlock.style.maxHeight = "".concat(this.heightArray[index], "px");
			},
		},
	]);

	return Slider;
})();

var burger = document.querySelector(".burger"),
	headerTop = document.querySelector(".header__top"),
	headerNav = document.querySelector(".header-top__nav"),
	headerBtn = document.querySelector(".header-top__btn"),
	headerLogo = document.querySelector(".header-top__logo");
burger.addEventListener("click", function () {
	burger.classList.toggle("_active");
	headerTop.classList.toggle("_active");
	headerNav.classList.toggle("_active");
	headerBtn.classList.toggle("_active");
	headerLogo.classList.toggle("_active");
});
var list = document.querySelector(".header-nav__list");
var header = document.querySelector(".header-top__content");
var width = window.innerWidth;

if (window.innerWidth < 576) {
	list.appendChild(headerBtn);
} else {
	window.addEventListener("resize", function () {
		if (window.innerWidth < 576) {
			list.appendChild(headerBtn);
		} else {
			header.appendChild(headerBtn);
		}
	});
}

var slider = new Slider({
	dots: true,
	infinity: true,
	autoHeight: true,
});
slider.init();
