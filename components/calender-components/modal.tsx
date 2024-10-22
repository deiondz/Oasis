"use client";
import {
  Credenza,
  CredenzaBody,
  CredenzaContent,
  CredenzaDescription,
  CredenzaHeader,
  CredenzaTitle,
  CredenzaTrigger,
} from "@/components/ui/credenza";
import { Button } from "@components/ui/button";

import EventForm from "./eventform";
import { AddCircle, CalendarAdd } from "iconsax-react";

type ButtonProps = {
  variant?: "default" | "secondary"; // Optional variant type
};

function Modal({ variant = "default" }: ButtonProps) {
  return (
    <Credenza>
      <CredenzaTrigger asChild>
        {variant === "default" ? (
          <Button
            variant="default"
            className="gap-2 flex items-center"
            onClick={() => {
              console.log("Add Event");
            }}
          >
            <AddCircle size={16} color="white" />
            <span className="lg:block hidden">Add Event</span>
          </Button>
        ) : (
          <Button
            variant="ghost"
            className="inline-flex items-center gap-2 justify-center whitespace-nowrap font-medium ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent rounded-md w-full h-1/2 text-[8px] sm:text-xs text-muted-foreground hover:text-foreground transition-opacity truncate px-0.5 sm:px-2 sm:opacity-0 lg:py-5 sm:group-hover:opacity-100"
          >
            <AddCircle size={10} color="black" />
            <span className="lg:block hidden">Add Event</span>
          </Button>
        )}
      </CredenzaTrigger>

      <CredenzaContent className="max-w-5xl">
        <CredenzaHeader className="lg:px-2 px-6 ">
          <CredenzaTitle>
            <div className="flex items-center justify-start">
              <CalendarAdd className="w-6 h-6" color="black" strokeWidth={20} />
              <span className="ml-2">Add Event</span>
            </div>
          </CredenzaTitle>
          <CredenzaDescription className="text-left">
            Create a new event in your calendar.
          </CredenzaDescription>
        </CredenzaHeader>

        {/* Make the modal body scrollable */}
        <CredenzaBody className="max-h-[80vh]  overflow-y-auto">
          <EventForm />
        </CredenzaBody>
      </CredenzaContent>
    </Credenza>
  );
}

export default Modal;
