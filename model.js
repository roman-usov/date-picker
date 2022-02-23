import {
	startOfMonth,
	endOfMonth,
	startOfWeek,
	endOfWeek,
	eachDayOfInterval,
} from 'date-fns';

export const calendarData = {
	mainDate: new Date(),
};

export function calculateCalendarParams() {
	const firstWeekStart = startOfWeek(startOfMonth(calendarData.mainDate), {
		weekStartsOn: 1,
	});
	const lastWeekEnd = endOfWeek(endOfMonth(calendarData.mainDate), {
		weekStartsOn: 1,
	});
	calendarData.dates = eachDayOfInterval({
		start: firstWeekStart,
		end: lastWeekEnd,
	});
}
