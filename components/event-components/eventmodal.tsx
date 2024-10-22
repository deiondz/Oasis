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
import EventForm from "@components/calender-components/eventform";
import { Button } from "@components/ui/button";

import { CalendarAdd } from "iconsax-react";

type ButtonProps = {

    eventdetails: {
        eventname: string;
        description: string;
    }
};

function EventModal({ eventdetails }: ButtonProps) {
    return (
        <Credenza>
            <CredenzaTrigger asChild>
                <Button
                    variant="ghost"
                    className="bg-yellow-200 w-full dark:bg-yellow-800 flex flex-col items-start text-yellow-800 dark:text-yellow-200 p-1 text-[8px] h-10 sm:text-xs rounded mb-1 cursor-pointer transition-colors duration-200 hover:bg-opacity-40 dark:hover:bg-opacity-40 border-l-4 border-l-black/70 dark:border-l-white/50"
                >
                    <h2 className="font-semibold  w-[80px]  truncate">
                        {eventdetails.eventname}
                    </h2>
                    <div className="hidden sm:block truncate ">
                        <p className="truncate   w-[80px] font-light">
                            {eventdetails.description}
                        </p>
                    </div>
                </Button>
            </CredenzaTrigger>

            <CredenzaContent className="max-w-5xl">
                <CredenzaHeader className="lg:px-2 px-6 ">
                    <CredenzaTitle>
                        <div className="flex items-center justify-start">
                            <CalendarAdd className="w-6 h-6" color="black" strokeWidth={20} />
                            <span className="ml-2">Modify Event</span>
                        </div>
                    </CredenzaTitle>
                    <CredenzaDescription className="text-left">
                        Modify the details of the event.
                    </CredenzaDescription>
                </CredenzaHeader>

                {/* Make the EventModal body scrollable */}
                <CredenzaBody className="max-h-[80vh]  overflow-y-auto">
                    <EventForm values={eventdetails} />
                </CredenzaBody>
            </CredenzaContent>
        </Credenza>
    );
}

export default EventModal;
