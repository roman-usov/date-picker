import {
	displayDate,
	addHandlerForCalendar,
	renderCalendar,
	addHandlerForDateSelection,
	toggleCalendar,
	addHandlerMainDateOnLoad,
	addHandlerForSwitchingCalendar,
} from './view.js';
import { calendarData, calculateCalendarParams } from './model.js';

function controlCurrentDate(mainDate) {
	displayDate(mainDate);
}

function controlOpeningCalendar(pickerDate) {
	calendarData.mainDate = pickerDate;

	calculateCalendarParams();

	renderCalendar(calendarData);

	toggleCalendar();
}

function controlDateSelection(selectedDate) {
	calendarData.mainDate = selectedDate;

	displayDate(selectedDate);

	toggleCalendar();
}

function controlSwitchingCalendar(firstDateNewMonth) {
	calendarData.mainDate = firstDateNewMonth;

	calculateCalendarParams();

	renderCalendar(calendarData);
}

function init() {
	addHandlerMainDateOnLoad(controlCurrentDate(calendarData.mainDate));

	addHandlerForCalendar(controlOpeningCalendar);

	addHandlerForDateSelection(controlDateSelection);

	addHandlerForSwitchingCalendar(controlSwitchingCalendar);
}

init();
