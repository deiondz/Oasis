"use client";
import {
  Credenza,
  CredenzaBody,
  CredenzaClose,
  CredenzaContent,
  CredenzaDescription,
  CredenzaFooter,
  CredenzaHeader,
  CredenzaTitle,
  CredenzaTrigger,
} from "@/components/ui/credenza";
import { Button } from "@components/ui/button";
import { AddCircle, CalendarAdd, CalendarSearch } from "iconsax-react";
import EventForm from "./eventform";
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
            <AddCircle size={16} />
            <span className="lg:block hidden">Add Hall</span>
          </Button>
        ) : (
          <Button
            variant="ghost"
            className="inline-flex items-center gap-2 justify-center whitespace-nowrap font-medium ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent rounded-md w-full h-1/2 text-[8px] sm:text-xs text-muted-foreground hover:text-foreground transition-opacity truncate px-0.5 sm:px-2 sm:opacity-0 lg:py-5 sm:group-hover:opacity-100"
          >
            <AddCircle size={10} />
            <span className="lg:block hidden">Add Hall</span>
          </Button>
        )}
      </CredenzaTrigger>
      <CredenzaContent className="max-w-5xl">
        <CredenzaHeader>
          <CredenzaTitle>
            <div className="flex items-center justify-start">
              <CalendarAdd className="w-6 h-6" strokeWidth={20} />
              <span className="ml-2">Add Event</span>
            </div>
          </CredenzaTitle>
          <CredenzaDescription>
            Create a new event in your calendar.
          </CredenzaDescription>
        </CredenzaHeader>
        <CredenzaBody>
          <EventForm />
        </CredenzaBody>
      </CredenzaContent>
    </Credenza>
  );
}

export default Modal;
