import {
	format,
	isSameMonth,
	startOfMonth,
	isSameDay,
	addMonths,
	subMonths,
} from 'date-fns';

const datePickerButton = document.querySelector('.date-picker-button');
const calendar = document.querySelector('.date-picker');
const currentMonthEl = document.querySelector('.current-month');
const dateGrid = document.querySelector('.date-picker-grid-dates');
const dateTemplate = document.querySelector('#date-template');
const datePickerHeader = document.querySelector('.date-picker-header');

export function addHandlerMainDateOnLoad(handler) {
	window.addEventListener('load', handler);
}

export function displayDate(date) {
	datePickerButton.innerText = format(date, 'MMMM do, yyyy');
	datePickerButton.dataset.currentDate = date;
}

export function toggleCalendar() {
	calendar.classList.toggle('show');
}

export function addHandlerForCalendar(handler) {
	datePickerButton.addEventListener('click', (e) => {
		const button = e.target;

		if (!button) return;

		const pickerDate = new Date(datePickerButton.dataset.currentDate);

		if (button.matches('.date-picker-button')) {
			handler(pickerDate);
		}
	});
}

export function renderCalendar(calendarData) {
	const currentDate = calendarData.mainDate;

	currentMonthEl.innerText = format(currentDate, 'MMMM - yyyy');
	currentMonthEl.dataset.currentMonthFirstDate = startOfMonth(currentDate);

	dateGrid.innerHTML = '';
	const dateElements = createDateElements(calendarData);
	dateElements.forEach((dateElement) => {
		dateGrid.appendChild(dateElement);
	});
}

export function addHandlerForDateSelection(handler) {
	dateGrid.addEventListener('click', (e) => {
		const button = e.target;

		if (e.target.nodeName !== 'BUTTON') return;

		if (button.matches('.date')) {
			const selectedDate = new Date(button.dataset.date);

			handler(selectedDate);
		}
	});
}

export function addHandlerForSwitchingCalendar(handler) {
	datePickerHeader.addEventListener('click', (e) => {
		const button = e.target;

		if (e.target.nodeName !== 'BUTTON') return;

		const firstDateCurrentMonth = new Date(
			currentMonthEl.dataset.currentMonthFirstDate
		);

		if (button.matches('.prev-month-button')) {
			const firstDatePrevMonth = subMonths(firstDateCurrentMonth, 1);
			handler(firstDatePrevMonth);
		} else {
			const firstDateNextMonth = addMonths(firstDateCurrentMonth, 1);
			handler(firstDateNextMonth);
		}
	});
}

function createDateElements(calendarData) {
	const pickerDate = new Date(datePickerButton.dataset.currentDate);
	const currentMonth = new Date(currentMonthEl.dataset.currentMonthFirstDate);

	const dates = calendarData.dates.map((date) => {
		const templateClone = generateDateEl(date, pickerDate, currentMonth);
		return templateClone;
	});

	return dates;
}

function generateDateEl(date, pickerDate, currentMonth) {
	const templateClone = dateTemplate.content.cloneNode(true);
	const element = templateClone.querySelector('.date');
	element.innerText = format(date, 'd');
	element.dataset.date = date;

	if (!isSameMonth(date, currentMonth)) {
		element.classList.add('date-picker-other-month-date');
	}

	if (isSameDay(date, pickerDate)) {
		element.classList.add('selected');
	}

	return templateClone;
}
