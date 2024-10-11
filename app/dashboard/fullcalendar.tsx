"use client";

import { Button } from "@/components/ui/button"; // shadcn Button
import { Card } from "@/components/ui/card"; // shadcn Card for structure
import Modal from "@components/calender-components/modal";
import { MonthHeader } from "@components/calender-components/monthheader";
import { Tabs } from "@components/calender-components/tabs";
import { YearHeader } from "@components/calender-components/yearheader";
import YearView from "@components/calender-components/yearview";
import {
  addDays,
  addMonths,
  addYears,
  format,
  getDay,
  startOfMonth,
  startOfWeek,
  subMonths,
  subYears,
} from "date-fns";
import { useRef, useState } from "react";

interface Event {
  date: string;
  title: string;
  description: string;
}

interface CalendarProps {
  events: Event[];
}

const Calendar = ({ events }: CalendarProps) => {
  type TabTypes = "month" | "year"; // Add more tab types if necessary

  const [currentDate, setCurrentDate] = useState(new Date());
  const [isAnimating, setIsAnimating] = useState(false); // State for animation
  const [activeTab, setActiveTab] = useState<TabTypes>("month"); // Default to "month"
  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const [value, setValue] = useState<string>("");

  // Array of month names

  const animationDuration = 300; // Animation duration in milliseconds

  // Reference for the animation timeout
  const animationTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Navigate to previous and next months

  const months = [
    { value: "january", label: "January" },
    { value: "february", label: "February" },
    { value: "march", label: "March" },
    { value: "april", label: "April" },
    { value: "may", label: "May" },
    { value: "june", label: "June" },
    { value: "july", label: "July" },
    { value: "august", label: "August" },
    { value: "september", label: "September" },
    { value: "october", label: "October" },
    { value: "november", label: "November" },
    { value: "december", label: "December" },
  ];
  // Handle month selection

  const handleMonthChange = (action: "prev" | "next" | string) => {
    triggerAnimation(() => {
      if (action === "prev") {
        setCurrentDate(subMonths(currentDate, 1));
        setValue(format(subMonths(currentDate, 1), "MMMM").toLowerCase());
      } else if (action === "next") {
        setCurrentDate(addMonths(currentDate, 1));
        setValue(format(addMonths(currentDate, 1), "MMMM").toLowerCase());
        console.log(format(addMonths(currentDate, 1), "MMMM"));
      } else {
        const monthIndex = months.findIndex((month) => month.value === action);
        console.log({ monthIndex, action });

        if (monthIndex !== -1) {
          setCurrentDate(new Date(currentDate.getFullYear(), monthIndex, 1));
        }
      }
    });
  };
  const handleYearChange = (action: "prev" | "next" | number) => {
    triggerAnimation(() => {
      if (action === "prev") {
        setCurrentDate(subYears(currentDate, 1));
      } else if (action === "next") {
        setCurrentDate(addYears(currentDate, 1));
      } else if (typeof action === "number") {
        setCurrentDate(new Date(action, currentDate.getMonth(), 1));
      }
    });
  };

  // Trigger animation and then update the state
  const triggerAnimation = (updateState: () => void) => {
    setIsAnimating(true);

    // Clear any existing timeouts
    if (animationTimeoutRef.current) {
      clearTimeout(animationTimeoutRef.current);
    }

    animationTimeoutRef.current = setTimeout(() => {
      updateState();
      setIsAnimating(false);
    }, animationDuration);
  };

  const handleToday = () => {
    const today = new Date();
    triggerAnimation(() => {
      setCurrentDate(today);
      setValue(format(today, "MMMM").toLowerCase());
    });
  };

  // Get days for the calendar grid
  const startDay = startOfMonth(currentDate);
  const startWeek = startOfWeek(startDay);

  const firstDayIndex = getDay(startDay);
  const reorderedDaysOfWeek = [
    ...daysOfWeek.slice(firstDayIndex),
    ...daysOfWeek.slice(0, firstDayIndex),
  ];

  const renderDaysOfWeek = () => {
    return reorderedDaysOfWeek.map((day) => (
      <div key={day} className="text-center font-medium text-xs sm:text-sm">
        {day}
      </div>
    ));
  };

  function AddEvent() {
    return <Modal variant="secondary" />;
  }
  function AddEvent2() {
    return <Modal />;
  }

  const renderDaysInMonth = () => {
    const days = [];
    let day = startWeek; // Starting from the beginning of the week
    const todayDate = format(new Date(), "d"); // Get the current day of the month
    const todayMonth = format(new Date(), "M"); // Get the current month number
    const todayYear = format(new Date(), "yyyy"); // Get the current year

    for (let i = 0; i < 6; i++) {
      // Iterate through 6 weeks
      for (let j = 0; j < 7; j++) {
        // Check if the day belongs to the current month
        if (format(day, "M") === format(currentDate, "M")) {
          const isToday =
            format(day, "d") === todayDate &&
            format(day, "M") === todayMonth &&
            format(day, "yyyy") === todayYear;

          // Filter events for the specific day
          const eventsForDay = events.filter(
            (event) =>
              format(new Date(event.date), "yyyy-MM-dd") ===
              format(day, "yyyy-MM-dd")
          );

          days.push(
            <div
              key={day.toString()}
              className={`p-1 sm:p-2 h-[80px] sm:h-[130px] border rounded relative group flex flex-col ${
                isToday ? "text-blue-600" : "text-foreground"
              } group`}
            >
              {/* Day number */}
              <div
                className={`font-semibold mb-1 w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center text-xs sm:text-sm ${
                  isToday
                    ? "text-white rounded-full w-6 flex items-center justify-center bg-black aspect-square"
                    : "text-foreground"
                }`}
              >
                {format(day, "d")}
              </div>

              {/* Events list */}
              <div className="flex-grow overflow-hidden">
                {eventsForDay.length === 0 && <AddEvent />} {/* No events */}
                {eventsForDay.length === 1 && (
                  <>
                    {/* Render the single event */}
                    <Button
                      variant="ghost"
                      className="bg-yellow-200 w-full flex flex-col items-start justify-start dark:bg-yellow-800 text-yellow-800 dark:text-yellow-200 p-1 text-[8px] h-10 sm:text-xs rounded mb-1 cursor-pointer transition-colors duration-200 hover:bg-opacity-40 dark:hover:bg-opacity-40 border-l-4 border-l-black/70 dark:border-l-white/50"
                    >
                      <h2 className="font-semibold text-left w-[80px] truncate">
                        {eventsForDay[0].title}
                      </h2>
                      <div className="hidden sm:block truncate ">
                        <p className="truncate w-[80px] font-light">
                          {eventsForDay[0].description}
                        </p>
                      </div>
                    </Button>

                    {/* Add event button below the single event */}
                    <AddEvent />
                  </>
                )}
                {eventsForDay.length > 1 && (
                  <>
                    {/* Render the first event */}
                    <Button
                      variant="ghost"
                      className="bg-yellow-200 w-full dark:bg-yellow-800 flex flex-col items-start text-yellow-800 dark:text-yellow-200 p-1 text-[8px] h-10 sm:text-xs rounded mb-1 cursor-pointer transition-colors duration-200 hover:bg-opacity-40 dark:hover:bg-opacity-40 border-l-4 border-l-black/70 dark:border-l-white/50"
                    >
                      <h2 className="font-semibold  w-[80px]  truncate">
                        {eventsForDay[0].title}
                      </h2>
                      <div className="hidden sm:block truncate ">
                        <p className="truncate   w-[80px] font-light">
                          {eventsForDay[0].description}
                        </p>
                      </div>
                    </Button>

                    {/* Show "+X more" for additional events */}
                    {eventsForDay.length > 2 && (
                      <Button
                        variant="ghost"
                        className="text-xs w-full text-muted-foreground mb-1"
                      >
                        +{eventsForDay.length - 1} more
                      </Button>
                    )}
                  </>
                )}
              </div>
            </div>
          );
        }
        day = addDays(day, 1); // Move to the next day
      }
    }
    return days;
  };

  return (
    <div>
      {activeTab === "month" ? (
        <div className="flex flex-col sm:flex-row justify-between items-center mb-4 space-y-4 sm:space-y-0">
          <MonthHeader
            currentDate={currentDate}
            setCurrentDate={setCurrentDate}
            isAnimating={isAnimating}
            value={value}
            setValue={setValue}
            months={months}
            handleMonthChange={handleMonthChange}
            handleYearChange={handleYearChange}
          />
          <div className="flex items-center justify-between gap-4">
            <AddEvent2 />
            <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />
            <Button variant="outline" onClick={handleToday}>
              Today
            </Button>
          </div>
        </div>
      ) : (
        <div className="flex flex-col sm:flex-row justify-between items-center mb-4 space-y-4 sm:space-y-0">
          <YearHeader
            getFullYear={currentDate.getFullYear()}
            setCurrentDate={setCurrentDate}
            isAnimating={isAnimating}
            handleYearChange={handleYearChange}
          />
          <div className="flex items-center justify-center gap-4">
            <AddEvent2 />
            <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />
            <Button variant="outline" onClick={handleToday}>
              This Year
            </Button>
          </div>
        </div>
      )}
      {/* Calendar Days of the Week */}

      <Card
        className={` transition-all rounded-lg border bg-card duration-300 text-card-foreground shadow-sm p-2 sm:p-4  ${
          isAnimating
            ? " opacity-0 -translate-y-1"
            : "opacity-100 translate-y-0"
        }`}
      >
        <div style={{ minWidth: "100%", display: "table" }}>
          {activeTab === "month" ? (
            <div className="grid grid-cols-7 gap-1 sm:gap-2">
              {renderDaysOfWeek()}
              {renderDaysInMonth()}
            </div>
          ) : (
            <YearView currentDate={currentDate} events={events as any} />
          )}
        </div>
      </Card>
    </div>
  );
};

export default Calendar;
