import { useState } from 'react';
import AddEvent from './AddEvent';

// Props types
type HeaderProps = {
  date: Date;
  setDate: (newDate: Date) => void;
};
type DayProps = { dayNumber: number };
type DayGridProps = {
  month: Month;
  setShowAddEvent: (date: Date | null) => void;
};

type Day = {
  currentDate: Date;
  nonMonth: boolean;
  oldMonth: boolean;
  today?: boolean;
};
type Month = Day[];

const DAYS_IN_WEEK = 7;

export default function Calendar() {
  const [date, setDate] = useState(() => new Date());
  const [showAddEvent, setShowAddEvent] = useState<Date | null>(null);
  const month = fillMonth(date);

  return (
    <>
      <div className="calendar">
        <Header date={date} setDate={setDate} />
        <DayGrid month={month} setShowAddEvent={setShowAddEvent} />
        {showAddEvent && (
          <AddEvent
            showAddEvent={showAddEvent}
            setShowAddEvent={setShowAddEvent}
          />
        )}
      </div>
    </>
  );
}

function fillMonth(date: Date) {
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
    const day: Day = {
      currentDate: new Date(date.getFullYear(), date.getMonth(), i),
      nonMonth: false,
      oldMonth: i < new Date().getDate(),
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

function Day({ dayNumber }: DayProps) {
  return (
    <>
      <div className="day">
        <div className="day-header">
          <div className="day-number">{dayNumber}</div>
          <button className="add-event-btn">+</button>
        </div>
      </div>
    </>
  );
}

function DayGrid({ month, setShowAddEvent }: DayGridProps) {
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
        </div>
      ))}
    </div>
  );
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
