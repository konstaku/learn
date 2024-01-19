import {
  CalendarEvent,
  Day,
  Month,
  NewCalendarEvent,
} from '../components/Calendar';

export function handleWindowResize(setWindowHeight: (height: number) => void) {
  setWindowHeight(window.innerHeight);
}

export function trackWindowResize(setWindowHeight: (n: number) => void) {
  window.addEventListener('resize', () => handleWindowResize(setWindowHeight));
  return () =>
    window.removeEventListener('resize', () =>
      handleWindowResize(setWindowHeight)
    );
}

export function loadEvents() {
  const savedEvents: CalendarEvent[] = JSON.parse(
    localStorage.getItem('events') || '[]',
    (key, value) => (key === 'date' ? new Date(value) : value)
  );
  return savedEvents;
}

export function calculateMaxEvents(
  cellRef: React.RefObject<HTMLDivElement>,
  eventsCount: number
) {
  const cellHeight = cellRef.current?.clientHeight;
  if (!cellHeight) return 0;

  const dayDiv = cellRef.current.closest('.day');
  if (!dayDiv) return 0;

  const padding = 4;
  const elemHeight = 24;
  const maxHeight = dayDiv?.clientHeight - elemHeight;

  // Check if all events can fit and return early if yes
  // Needed for case when 1 event is hidden but can be shown instead of 'hidden' button
  const allEventsFit =
    maxHeight - padding * 3 >=
    eventsCount * elemHeight + (eventsCount + 1) * padding;

  if (allEventsFit) {
    return eventsCount;
  }

  // Otherwise calculate event number that can be fit
  let eventFit = Math.floor(cellHeight / (elemHeight + padding));
  return eventFit;
}

export function fillMonth(date: Date, eventsThisMonth: CalendarEvent[]) {
  const month: Month = [];

  const firstDayNumber = getFirstDay(date);
  const monthLength = getMonthLength(date);

  const today = new Date();

  // If first day is not Monday, add days to calendar
  if (firstDayNumber > 0) {
    for (let i = firstDayNumber - 1; i >= 0; i--) {
      month.push({
        currentDate: new Date(date.getFullYear(), date.getMonth(), 0 - i),
        nonMonth: true,
        oldMonth: true,
      });
    }
  }

  // Fill month with days
  for (let i = 1; i <= monthLength; i++) {
    const currentDate = new Date(date.getFullYear(), date.getMonth(), i);
    const eventsToday = eventsThisMonth.filter(
      (event) => event.date.getDate() === currentDate.getDate()
    );

    const day: Day = {
      currentDate: currentDate,
      nonMonth: false,
      oldMonth: i < new Date().getDate(),
      events: eventsToday,
    };

    if (
      day.currentDate.getFullYear() === today.getFullYear() &&
      day.currentDate.getMonth() === today.getMonth() &&
      day.currentDate.getDate() === today.getDate()
    ) {
      day.today = true;
    }

    month.push(day);
  }

  // Fill in remaining days
  if (month.length % 7) {
    const remainingDaysCount = 7 - (month.length % 7);

    for (let i = 1; i <= remainingDaysCount; i++) {
      month.push({
        currentDate: new Date(date.getFullYear(), date.getMonth() + 1, i),
        nonMonth: true,
        oldMonth: false,
      });
    }
  }

  return month;
}

export function getFirstDay(date: Date) {
  return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
}

export function getMonthLength(date: Date) {
  return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
}

export function handleAddEvent(
  setShowAddEvent: (event: CalendarEvent | NewCalendarEvent) => void,
  event: CalendarEvent | NewCalendarEvent
) {
  setShowAddEvent(event);
}

export function sortEvents(a: CalendarEvent, b: CalendarEvent) {
  if (a.fullDay && !b.fullDay) return -1;
  if (!a.fullDay && b.fullDay) return 1;
  if (!a.fullDay && !b.fullDay) {
    return a.endTime < b.endTime ? -1 : 1;
  }
  return 0;
}
