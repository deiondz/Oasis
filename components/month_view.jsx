"use client";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ClockIcon,
} from "@radix-ui/react-icons";
import dayjs from "dayjs";
import { useEffect, useState } from "react";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function Header({
  currentMonth,
  onPreviousMonth,
  onNextMonth,
  setCurrentMonth,
}) {
  return (
    <header className="flex items-center justify-between  py-4 lg:flex-none">
      <h1 className="text-base font-semibold leading-6 text-gray-900">
        <time dateTime={currentMonth.format("YYYY-MM")}>
          {currentMonth.format("MMMM YYYY")}
        </time>
      </h1>
      <div className="flex items-center">
        <div className="relative flex items-center rounded-md bg-white  md:items-stretch">
          <button
            type="button"
            onClick={onPreviousMonth}
            className="flex h-9 w-12 items-center justify-center rounded-l-md border-y border-l border-gray-300 pr-1 text-gray-400 hover:text-gray-500 focus:relative md:w-9 md:pr-0 md:hover:bg-gray-50"
          >
            <span className="sr-only">Previous month</span>
            <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
          </button>
          <button
            onClick={() => setCurrentMonth(dayjs())}
            type="button"
            className="hidden border-y border-gray-300 px-3.5 text-sm font-semibold text-gray-900 hover:bg-gray-50 focus:relative md:block"
          >
            Today
          </button>
          <span className="relative -mx-px h-5 w-px bg-gray-300 md:hidden" />
          <button
            type="button"
            onClick={onNextMonth}
            className="flex h-9 w-12 items-center justify-center rounded-r-md border-y border-r border-gray-300 pl-1 text-gray-400 hover:text-gray-500 focus:relative md:w-9 md:pl-0 md:hover:bg-gray-50"
          >
            <span className="sr-only">Next month</span>
            <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>
        <div className="hidden md:ml-4 md:flex md:items-center">
          <div className="ml-6 h-6 w-px bg-gray-300" />
          <button
            type="button"
            className="ml-6 rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white  hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Add event
          </button>
        </div>
      </div>
    </header>
  );
}

function DayGrid({ days }) {
  return (
    <div className=" border rounded-sm lg:flex lg:flex-auto lg:flex-col">
      <div className="grid grid-cols-7 gap-px border-b border-gray-300 bg-gray-200 text-center text-xs font-semibold leading-6 text-gray-700 lg:flex-none">
        <div className="bg-white py-2">Sun</div>
        <div className="bg-white py-2">Mon</div>
        <div className="bg-white py-2">Tue</div>
        <div className="bg-white py-2">Wed</div>
        <div className="bg-white py-2">Thu</div>
        <div className="bg-white py-2">Fri</div>
        <div className="bg-white py-2">Sat</div>
      </div>
      <div className="flex bg-gray-200 text-xs leading-6 text-gray-700 lg:flex-auto">
        <div className="hidden w-full lg:grid lg:grid-cols-7  lg:gap-px">
          {days.map((day) => (
            <div
              key={day.date}
              className={classNames(
                day.isCurrentMonth ? "bg-white" : "bg-gray-50 text-gray-500",
                "relative p-2 h-40"
              )}
            >
              <time
                dateTime={day.date}
                className={
                  day.isToday
                    ? "flex h-6 w-6 items-center justify-center rounded-full bg-indigo-600 font-semibold text-white"
                    : undefined
                }
              >
                {day.date.split("-").pop().replace(/^0/, "")}
              </time>
              {day.events.length > 0 && (
                <ol className="mt-2 ">
                  {day.events.slice(0, 2).map((event) => (
                    <li key={event.id}>
                      <a href={event.href} className="group flex">
                        <p className="flex-auto truncate font-medium text-gray-900 group-hover:text-indigo-600">
                          {event.name}
                        </p>
                        <time
                          dateTime={event.datetime}
                          className="ml-3 hidden flex-none text-gray-500 group-hover:text-indigo-600 xl:block"
                        >
                          {event.time}
                        </time>
                      </a>
                    </li>
                  ))}
                  {day.events.length > 2 && (
                    <li className="text-gray-500">
                      + {day.events.length - 2} more
                    </li>
                  )}
                </ol>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function SelectedDayEvents({ selectedDay }) {
  if (!selectedDay?.events.length) return null;
  return (
    <div className=" py-4  lg:hidden">
      <ol className="divide-y divide-gray-100 overflow-hidden rounded-lg bg-white text-sm  -1 -black -opacity-5">
        {selectedDay.events.map((event) => (
          <li
            key={event.id}
            className="group flex p-4 pr-6 focus-within:bg-gray-50 hover:bg-gray-50"
          >
            <div className="flex-auto">
              <p className="font-semibold text-gray-900">{event.name}</p>
              <time
                dateTime={event.datetime}
                className="mt-2 flex items-center text-gray-700"
              >
                <ClockIcon
                  className="mr-2 h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
                {event.time}
              </time>
            </div>
            <a
              href={event.href}
              className="ml-6 flex-none self-center rounded-md bg-white px-3 py-2 font-semibold text-gray-900 opacity-0 -1 -inset -gray-300 hover:-gray-400 focus:opacity-100 group-hover:opacity-100"
            >
              Edit<span className="sr-only">, {event.name}</span>
            </a>
          </li>
        ))}
      </ol>
    </div>
  );
}

export default function MonthView() {
  const [currentMonth, setCurrentMonth] = useState(dayjs().startOf("month"));

  useEffect(() => {
    console.log("Current month:", currentMonth.format("MMMM YYYY"));
  }, [currentMonth]);

  const handlePreviousMonth = () => {
    setCurrentMonth(currentMonth.subtract(1, "month"));
  };

  const handleNextMonth = () => {
    setCurrentMonth(currentMonth.add(1, "month"));
  };

  const generateDays = (month, events) => {
    const start = month.startOf("month").startOf("week");
    const end = month.endOf("month").endOf("week");
    let days = [];
    let day = start;

    while (day.isBefore(end, "day")) {
      // Filter events for the current day
      const dailyEvents = events.filter((event) =>
        dayjs(event.datetime).isSame(day, "day")
      );

      days.push({
        date: day.format("YYYY-MM-DD"),
        isCurrentMonth: day.isSame(month, "month"),
        isToday: day.isSame(dayjs(), "day"),
        events: dailyEvents,
      });
      console.log(day.format("YYYY-MM-DD"), dailyEvents);
      day = day.add(1, "day");
    }

    return days;
  };

  // Example usage

  const days = generateDays(currentMonth, [
    {
      id: 1,
      name: "Meeting with Jane",
      datetime: "2024-08-01T09:00",
      time: "9:00 AM",
      href: "#",
    },
    {
      id: 2,
      name: "Lunch with John",
      datetime: "2024-08-01T12:00",
      time: "12:00 PM",
      href: "#",
    },
    {
      id: 3,
      name: "Coffee with Alice",
      datetime: "2024-08-01T15:00",
      time: "3:00 PM",
      href: "#",
    },
  ]);

  const selectedDay = days.find((day) => day.isToday);

  return (
    <>
      <Header
        currentMonth={currentMonth}
        onPreviousMonth={handlePreviousMonth}
        onNextMonth={handleNextMonth}
        setCurrentMonth={setCurrentMonth}
      />
      <main className="flex-auto">
        <DayGrid days={days} />
        <SelectedDayEvents selectedDay={selectedDay} />
      </main>
    </>
  );
}
