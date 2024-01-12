import { useState } from 'react';
import AddEvent from './AddEvent';

// Props types
type HeaderProps = {
  date: Date;
  setDate: (newDate: Date) => void;
};
type DayGridProps = {
  date: Date;
  events: CalendarEvent[];
  setShowAddEvent: (date: Date | null) => void;
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

const DAYS_IN_WEEK = 7;

export default function Calendar() {
  const [date, setDate] = useState(() => new Date());
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [showAddEvent, setShowAddEvent] = useState<Date | null>(null);

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
          <AddEvent
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
  const month = fillMonth(date, eventsThisMonth);

  return (
    <div className="days">
      {month.map((day, i) => (
        <div
          key={new Date(day.currentDate).toString()}
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
              onClick={(e) =>
                handleAddEvent(e, setShowAddEvent, day.currentDate)
              }
            >
              +
            </button>
          </div>
          {/* Add events */}
          {day.events?.length && (
            <>
              <div className="events">
                {day.events
                  .sort((a, b) =>
                    a.fullDay && !b.fullDay
                      ? -1
                      : !a.fullDay && b.fullDay
                      ? 1
                      : 0
                  )
                  .map((event, index) =>
                    event.fullDay ? (
                      <button
                        key={index}
                        className={`all-day-event ${event.color} event`}
                      >
                        <div className="event-name">{event.name}</div>
                      </button>
                    ) : (
                      <button key={index} className="event">
                        <div className={`color-dot ${event.color}`}></div>
                        <div className="event-time">{event.startTime}</div>
                        <div className="event-name">{event.name}</div>
                      </button>
                    )
                  )}
              </div>
            </>
          )}
        </div>
      ))}
    </div>
  );
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
  e: React.MouseEvent<HTMLButtonElement>,
  setShowAddEvent: (date: Date | null) => void,
  currentDate: Date
) {
  console.log('event', e);
  setShowAddEvent(currentDate);
}
