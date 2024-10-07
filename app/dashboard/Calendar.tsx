"use client";

import { Button } from "@/components/ui/button"; // shadcn Button
import { Card } from "@/components/ui/card"; // shadcn Card for structure
import { Combobox } from "@components/calender-components/combobox";
import { ChevronLeftIcon, ChevronRightIcon } from "@radix-ui/react-icons";
import {
  addDays,
  addMonths,
  format,
  getDay,
  startOfMonth,
  startOfWeek,
  subMonths,
} from "date-fns";
import { useRef, useState } from "react";

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [isAnimating, setIsAnimating] = useState(false); // State for animation
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

  const renderDaysInMonth = () => {
    const days = [];
    let day = startWeek; // Starting from the beginning of the week
    const todayDate = format(new Date(), "d"); // Get the current day of the month
    const todayMonth = format(new Date(), "M"); // Get the current month number

    for (let i = 0; i < 6; i++) {
      // Iterate through 6 weeks
      for (let j = 0; j < 7; j++) {
        // Check if the day belongs to the current month
        if (format(day, "M") === format(currentDate, "M")) {
          const isToday =
            format(day, "d") === todayDate && format(day, "M") === todayMonth;

          days.push(
            <div
              key={day.toString()}
              className={`p-1 sm:p-2 h-[80px] sm:h-[130px] border rounded relative group flex flex-col ${
                isToday ? "text-blue-600" : "text-foreground"
              } group`}
            >
              <div
                className={`font-semibold mb-1 w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center text-xs sm:text-sm ${
                  isToday
                    ? "text-white rounded-full w-6 flex items-center justify-center bg-black aspect-square"
                    : "text-foreground"
                }`}
              >
                {format(day, "d")}
              </div>
              <div className="flex-grow overflow-hidden">
                <Button
                  variant="ghost"
                  className="inline-flex items-center justify-center whitespace-nowrap font-medium ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent rounded-md w-full h-1/2 text-[8px] sm:text-xs text-muted-foreground hover:text-foreground transition-opacity truncate px-0.5 sm:px-2 sm:opacity-0 lg:py-5 sm:group-hover:opacity-100"
                >
                  <span className="font-bold">+</span>
                  <span className="hidden sm:inline ml-1">Add Event</span>
                </Button>
              </div>
              <Button
                variant="ghost"
                className="bg-yellow-200 dark:bg-yellow-800 text-yellow-800 dark:text-yellow-200 p-1 text-[8px] h-10 sm:text-xs rounded mb-1 cursor-pointer transition-colors duration-200 hover:bg-opacity-40 dark:hover:bg-opacity-40 border-l-4 border-l-black/70 dark:border-l-white/50"
              >
                <div className="font-semibold truncate">Ads Campaign Nr2</div>
                <div className="hidden sm:block truncate">
                  <div className="truncate">
                    AdSense + FB, Target Audience: SMB2-Delta3
                  </div>
                </div>
              </Button>
            </div>
          );
        }
        day = addDays(day, 1); // Move to the next day
      }
    }
    return days;
  };

  return (
    <div className="">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-4 space-y-4 sm:space-y-0">
        <div className="flex items-center space-x-1 sm:space-x-2">
          <Button
            variant="outline"
            onClick={() => {
              handleMonthChange("prev");
            }}
          >
            <ChevronLeftIcon className="h-4 w-4" />
          </Button>
          <Combobox
            value={value}
            setValue={setValue}
            items={months}
            placeholder={format(currentDate, "MMMM")}
            isAnimating={isAnimating}
            onSelect={(e: any) => {
              handleMonthChange(e);
            }}
          />
          <Button
            variant="outline"
            onClick={() => {
              handleMonthChange("next");
            }}
          >
            <ChevronRightIcon className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Calendar Days of the Week */}

      <Card
        className={` transition-all rounded-lg border bg-card text-card-foreground shadow-sm p-2 sm:p-4  ${
          isAnimating
            ? "transform-none opacity-0"
            : "-translate-y-[1.9873px]  opacity-100"
        }`}
      >
        <div style={{ minWidth: "100%", display: "table" }}>
          <div className="grid grid-cols-7 gap-1 sm:gap-2">
            {renderDaysOfWeek()}

            {renderDaysInMonth()}
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Calendar;
