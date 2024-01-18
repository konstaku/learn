import { useEffect, useRef, useState } from 'react';
import AddOrEditEvent from './AddEvent';

// Props types
type HeaderProps = {
  date: Date;
  setDate: (newDate: Date) => void;
};
type DayGridProps = {
  date: Date;
  events: CalendarEvent[];
  setShowAddEvent: (event: CalendarEvent | NewCalendarEvent | null) => void;
};
type EventProps = {
  event: CalendarEvent;
  setShowAddEvent: (event: CalendarEvent | NewCalendarEvent | null) => void;
};
type ShowMoreButtonProps = {
  eventNumber: number;
};
type CalendarCellProps = {
  index: number;
  day: Day;
  setShowAddEvent: (event: CalendarEvent | NewCalendarEvent | null) => void;
  windowHeight: number;
};

type Day = {
  currentDate: Date;
  nonMonth: boolean;
  oldMonth: boolean;
  today?: boolean;
  events?: CalendarEvent[];
};
type Month = Day[];

export type EventColor = 'green' | 'red' | 'blue';
type BaseEvent = {
  id: string;
  new: false;
  date: Date;
  name: string;
  color: EventColor;
};
type FullDayEvent = BaseEvent & {
  fullDay: true;
};
type PartDayEvent = BaseEvent & {
  fullDay: false;
  startTime: string;
  endTime: string;
};
export type CalendarEvent = FullDayEvent | PartDayEvent;
export type NewCalendarEvent = Pick<BaseEvent, 'date'> & { new: true };

const DAYS_IN_WEEK = 7;

export default function Calendar() {
  const [date, setDate] = useState(() => new Date());
  const [events, setEvents] = useState<CalendarEvent[]>(() => {
    const savedEvents: CalendarEvent[] = JSON.parse(
      localStorage.getItem('events') || '[]',
      (key, value) => (key === 'date' ? new Date(value) : value)
    );
    return savedEvents;
  });
  const [showAddEvent, setShowAddEvent] = useState<
    NewCalendarEvent | CalendarEvent | null
  >(null);

  useEffect(() => {
    localStorage.setItem('events', JSON.stringify(events));
  }, [events]);

  return (
    <>
      <div className="calendar">
        <Header date={date} setDate={setDate} />
        <DayGrid
          date={date}
          events={events}
          setShowAddEvent={setShowAddEvent}
        />
        {showAddEvent && (
          <AddOrEditEvent
            showAddEvent={showAddEvent}
            setShowAddEvent={setShowAddEvent}
            events={events}
            setEvents={setEvents}
          />
        )}
      </div>
    </>
  );
}

// Components
function Header({ date, setDate }: HeaderProps) {
  return (
    <>
      <div className="header">
        <button className="btn" onClick={resetDate}>
          Today
        </button>
        <div>
          <button className="month-change-btn" onClick={decrementMonth}>
            &lt;
          </button>
          <button className="month-change-btn" onClick={incrementMonth}>
            &gt;
          </button>
        </div>
        <span className="month-title">
          {date.toLocaleString('default', { month: 'long' })}{' '}
          {date.getFullYear()}
        </span>
      </div>
    </>
  );

  function resetDate() {
    setDate(new Date());
  }

  function decrementMonth() {
    setDate(new Date(date.setMonth(date.getMonth() - 1)));
  }

  function incrementMonth() {
    setDate(new Date(date.setMonth(date.getMonth() + 1)));
  }
}

function DayGrid({ date, events, setShowAddEvent }: DayGridProps) {
  const eventsThisMonth = events.filter(
    (event) => event.date.getMonth() === date.getMonth()
  );

  const [windowHeight, setWindowHeight] = useState(window.innerHeight);

  useEffect(() => trackWindowResize(setWindowHeight), []);

  const month = fillMonth(date, eventsThisMonth);

  return (
    <div className="days">
      {month.map((day, i) => (
        <CalendarCell
          key={new Date(day.currentDate).toString()}
          index={i}
          day={day}
          setShowAddEvent={setShowAddEvent}
          windowHeight={windowHeight}
        />
      ))}
    </div>
  );
}

function CalendarCell({
  index: i,
  day,
  setShowAddEvent,
  windowHeight,
}: // maxEvents,
CalendarCellProps) {
  const cellRef = useRef<HTMLDivElement>(null);
  const [maxEvents, setMaxEvents] = useState(() => calculateMaxEvents(cellRef));
  // Do something when window height changes
  useEffect(() => {
    if (day.events?.length) {
      setMaxEvents(calculateMaxEvents(cellRef));
    }
  }, [windowHeight]);

  let showMore = day.events?.length
    ? day.events.length - maxEvents <= 0
      ? 0
      : day.events.length - maxEvents
    : 0;

  return (
    <div
      // Set first cell as a ref to calculate height
      // ref={i === 0 ? cellRef : undefined}
      className={`day ${day.nonMonth && 'non-month-day'} ${
        day.oldMonth && 'old-month-day'
      }`}
    >
      <div className="day-header">
        {i < DAYS_IN_WEEK && (
          <div className="week-name">
            {day.currentDate.toLocaleDateString('default', {
              weekday: 'short',
            })}
          </div>
        )}
        <div className={`day-number ${day.today && 'today'}`}>
          {day.currentDate.getDate()}
        </div>
        <button
          className="add-event-btn"
          onClick={() =>
            handleAddEvent(setShowAddEvent, {
              date: day.currentDate,
              new: true,
            })
          }
        >
          +
        </button>
      </div>
      {/* Add events */}
      {day.events?.length ? (
        <>
          <div className="events" ref={cellRef}>
            {
              // prettier-ignore
              day.events
              .sort(sortEvents)
              .slice(0, maxEvents)
              .map((event, index) => 
                <Event 
                  event={event} 
                  setShowAddEvent={setShowAddEvent} 
                  key={index} 
                />)
            }
          </div>
          {showMore > 0 && <ShowMoreButton eventNumber={showMore} />}
        </>
      ) : undefined}
    </div>
  );
}

function Event({ event, setShowAddEvent }: EventProps) {
  if (event.fullDay) {
    return (
      <button
        onClick={() => handleAddEvent(setShowAddEvent, event)}
        className={`all-day-event ${event.color} event`}
      >
        <div className="event-name">{event.name}</div>
      </button>
    );
  } else {
    return (
      <button
        onClick={() => handleAddEvent(setShowAddEvent, event)}
        className="event"
      >
        <div className={`color-dot ${event.color}`}></div>
        <div className="event-time">{event.startTime}</div>
        <div className="event-name">{event.name}</div>
      </button>
    );
  }
}

// Helpers
function handleWindowResize(setWindowHeight: (height: number) => void) {
  setWindowHeight(window.innerHeight);
}

function trackWindowResize(setWindowHeight: (n: number) => void) {
  window.addEventListener('resize', () => handleWindowResize(setWindowHeight));
  return () =>
    window.removeEventListener('resize', () =>
      handleWindowResize(setWindowHeight)
    );
}

function ShowMoreButton({ eventNumber }: ShowMoreButtonProps) {
  return <button className="events-view-more-btn">+{eventNumber} More</button>;
}

function calculateMaxEvents(cellRef: React.RefObject<HTMLDivElement>) {
  const cellHeight = cellRef.current?.clientHeight;
  if (!cellHeight) return 0;

  const padding = 4;
  const elemHeight = 24;
  const eventFit = Math.floor(cellHeight / (padding * 2 + elemHeight));

  console.log(
    `This div is ${cellHeight}px high and can fit ${eventFit} events`
  );

  return eventFit;
}

function fillMonth(date: Date, eventsThisMonth: CalendarEvent[]) {
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

function getFirstDay(date: Date) {
  return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
}

function getMonthLength(date: Date) {
  return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
}

function handleAddEvent(
  setShowAddEvent: (event: CalendarEvent | NewCalendarEvent) => void,
  event: CalendarEvent | NewCalendarEvent
) {
  setShowAddEvent(event);
}

function sortEvents(a: CalendarEvent, b: CalendarEvent) {
  if (a.fullDay && !b.fullDay) return -1;
  if (!a.fullDay && b.fullDay) return 1;
  if (!a.fullDay && !b.fullDay) {
    return a.endTime < b.endTime ? -1 : 1;
  }
  return 0;
}
