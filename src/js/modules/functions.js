import Swiper, {
	Navigation,
	Pagination,
	Autoplay
} from 'swiper'; //Navigation, Pagination, Autoplay

// Проверка поддержки webp, добавление класса webp или no-webp для HTML */
export function isWebp() {
	// Проверка поддержки webp
	function testWebP(callback) {
		let webP = new Image();
		webP.onload = webP.onerror = function () {
			callback(webP.height == 2);
		};
		webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
	}
	// Добавление класса _webp или _no-webp для HTML
	testWebP(function (support) {
		let className = support === true ? 'webp' : 'no-webp';
		document.documentElement.classList.add(className);
	});
}

// Экспортируемая функция slider, которая определяет наличие слайдера на странице
export const slider = () => {
	// Найдем элемент слайдера по селектору
	const sliderSelector = '#swiper';
	const slider = document.querySelector(sliderSelector);
	// Если такого элемента нет на странице, то выходим из функции
	if (!slider) return;
	// Инициализируем новый Swiper в найденом элементе
	const swiper = new Swiper(sliderSelector, {
		// Инициализируем необходимые модули Swiper
		modules: [Navigation, Pagination, Autoplay],
		// Количество видимых слайдов на разных размерах экранов
		slidesPerView: 5,
		breakpoints: {
			576: {
				slidesPerView: 1,
			},
			768: {
				slidesPerView: 2,
			},
			992: {
				slidesPerView: 3,
			},
			1200: {
				slidesPerView: 4
			}
		},
		// Настройки циклической прокрутки и скорости переключения слайдов
		loop: true,
		speed: 300,
		// Настройки автоматической прокрутки
		// autoplay: {
		// 	delay: 2000,
		// },
		// Настройки навигации и пагинации
		navigation: {
			nextEl: '.partners-slider-next',
			prevEl: '.partners-slider-prev',
		},
		pagination: {
			el: '.swiper-pagination',
			clickable: true
		},
	});
}

// экспортируем функцию modal
export const modal = () => {
	// получаем все модальные окна
	const modals = document.querySelectorAll("[data-modal]");
	if (!modals) return; // проверка на существование объекта на странице
	modals.forEach((trigger) => {
		// каждому триггеру (кнопке) добавляем обработчик события "клик"
		trigger.addEventListener("click", (event) => {
			// отменяем стандартное поведение браузера при клике по ссылке
			event.preventDefault();
			// получаем модальное окно по его id, указанному в атрибуте data-modal триггера
			const modal = document.getElementById(trigger.dataset.modal);
			// добавляем модальному окну класс "modal_open", чтобы оно стало видимым
			modal.classList.add("modal--open");
			// получаем все элементы с классом "modal-exit" внутри модального окна
			const exits = modal.querySelectorAll(".modal-exit");
			// каждому такому элементу добавляем обработчик события "клик"
			exits.forEach((exit) => {
				exit.addEventListener("click", (event) => {
					// отменяем стандартное поведение браузера при клике по ссылке
					event.preventDefault();
					// удаляем у модального окна класс "modal_open", чтобы оно скрылось
					modal.classList.remove("modal--open");
				});
			});
		});
	});
}

// экспортируем функцию fixedHeader
export const fixedHeader = () => {
	const header = document.querySelector(".header");
	if (!header) return; // проверка на существование объекта на странице
	let headerHeight = header.offsetHeight; // задаем начальное значение высоты
	const handleResize = () => {
		// пересчитываем высоту заголовка при необходимости (например, если содержимое изменяется динамически)
		headerHeight = header.offsetHeight;
	};
	const handleScroll = () => {
		const curPos = window.scrollY;
		if (curPos > headerHeight) {
			header.classList.add("header--fixed");
			// используем CSS-переменную, чтобы не жестко задавать высоту заголовка 
			body.style.setProperty("--header-height", `${headerHeight}px`);
		} else {
			header.classList.remove("header--fixed");
			body.style.setProperty("--header-height", "0");
		}
	};
	const body = document.querySelector("body");
	if (!body) return; // проверка на существование объекта на странице
	body.style.setProperty("--header-height", "0"); // инициализируем переменную
	window.addEventListener("scroll", handleScroll);
	window.addEventListener("resize", handleResize); // также слушаем события изменения размеров окна
}

// экспортируем функцию scrollToTop
export const scrollToTop = () => {
	// выбираем кнопку для скролла наверх по ее id
	const scrollBtn = document.querySelector('#scroll-to-top-btn');
	// проверяем, существует ли кнопка
	if (!scrollBtn) return;
	// объявление функции handleScroll(), которая будет отслеживать скролл и переключать классы для кнопки
	const handleScroll = () => {
		// если скролл больше 500px, добавляем класс, иначе убираем
		scrollBtn.classList.toggle('scroll-btn--show', window.pageYOffset > 500);
	}
	// объявление функции handleBtnClick(), которая будет скроллить страницу наверх при клике на кнопку
	const handleBtnClick = () => {
		// если пользователь уже находится вверху страницы, не скроллим
		if (window.scrollY !== 0) {
			window.scrollTo({
				top: 0,
				behavior: "smooth"
			});
		}
	};
	// добавление слушателей событий: для скролла и для клика на кнопке
	window.addEventListener('scroll', handleScroll);
	scrollBtn.addEventListener('click', handleBtnClick);

}

// экспортируем функцию mobMenu
export const mobMenu = () => {
	const openClass = 'body--menu-open';
	const body = document.querySelector('body');
	const menu = document.querySelector('.mobile-menu');
	const closeBtn = document.querySelector('.close-btn');
	const burgerBtn = document.querySelector('.burger-btn');
	// Проверяем, существуют ли на странице все необходимые элементы
	if (!menu) {
		console.log('mobile-menu не найден на странице');
		return;
	}
	if (!closeBtn) {
		console.log('close-btn не найден на странице');
		return;
	}
	if (!burgerBtn) {
		console.log('burger-btn не найден на странице');
		return;
	}

	// Функция, которая добавляет и убирает класс menu--open у body
	const toggleMenu = () => {
		body.classList.toggle(openClass);
		body.style.overflowY = (body.classList.contains(openClass)) ? 'hidden' : 'visible';
	}

	// При клике на кнопку .close-btn закрываем меню
	closeBtn.addEventListener('click', toggleMenu);

	// При клике на кнопку .burger-btn открываем меню
	burgerBtn.addEventListener('click', (e) => {
		e.stopPropagation(); // Остановить всплытие события, чтобы клик на кнопке не вызывал клик на всем документе
		toggleMenu();
	});

	// При клике на документ проверяем, не является ли целью события элементом меню или кнопкой .burger-btn
	// Если целью является любой другой элемент на странице, закрываем меню
	document.addEventListener('click', (e) => {
		const target = e.target;
		const its_menu = target === menu || menu.contains(target);
		const its_burgerBtn = target === burgerBtn;
		const menu_is_active = body.classList.contains(openClass);

		if (!its_menu && !its_burgerBtn && menu_is_active) {
			toggleMenu();
		}
	});
}