"use client";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"; // Fixed import path
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

// Form schema with validation
const formSchema = z.object({
  eventname: z.string().min(1, "Event name is required"),
  name: z.string().min(1, "Name is required"),
  description: z.string().min(1, "Description is required"),
  startdate: z.date({ required_error: "Start date is required" }),
  endtime: z.string().min(1, "End time is required"),
  phonenumber: z.string().min(1, "Phone number is required"),
  email: z.string().email("Invalid email address"),
});

export default function EventForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      console.log(values);
      toast(
        <div>
          <h2 className="text-lg font-semibold">Event Created</h2>
          <p className="text-sm font-normal text-muted-foreground">
            Your event has been successfully created.
          </p>
        </div>
      );
    } catch (error) {
      console.error("Form submission error", error);
      toast.error("Failed to submit the form. Please try again.");
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4 lg:py-0 py-4 w-full mx-auto "
      >
        <FormField
          control={form.control}
          name="eventname"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Event Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter event name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Enter event description"
                  className="resize-none "
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-12 items-baseline gap-4">
          <div className="col-span-6">
            <FormField
              control={form.control}
              name="startdate"
              render={({ field }) => (
                <FormItem className="flex flex-col w-full">
                  <FormLabel>Start Date</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={(date) => {
                          field.onChange(date);
                        }}
                      />
                    </PopoverContent>
                  </Popover>
                  <FormDescription>Set the event start date.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="col-span-6 w-full">
            <FormField
              control={form.control}
              name="endtime"
              render={({ field }) => (
                <FormItem className="flex flex-col h-full">
                  <FormLabel>End Time</FormLabel>
                  <FormControl>
                    <Select
                      defaultValue={field.value}
                      onValueChange={(e) => {
                        field.onChange(e); // change the time
                      }}
                    >
                      <SelectTrigger className="font-normal focus:ring-0 h-full w-[120px]">
                        <SelectValue placeholder="Select time" />
                      </SelectTrigger>
                      <SelectContent>
                        <ScrollArea className="h-[15rem]">
                          {Array.from({ length: 96 }).map((_, i) => {
                            const hour = Math.floor(i / 4)
                              .toString()
                              .padStart(2, "0");
                            const minute = ((i % 4) * 15)
                              .toString()
                              .padStart(2, "0");
                            return (
                              <SelectItem key={i} value={`${hour}:${minute}`}>
                                {hour}:{minute}
                              </SelectItem>
                            );
                          })}
                        </ScrollArea>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
        <div className="grid grid-cols-12 items-baseline gap-4">
          <div className="col-span-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your full name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="col-span-6">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your email address" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <div className="grid grid-cols-2 items-baseline gap-4">
          <div className="col-span-1">
            <FormField
              control={form.control}
              name="phonenumber"
              render={({ field }) => (
                <FormItem className="flex flex-col items-start">
                  <FormLabel>Phone Number</FormLabel>
                  <FormControl className="w-full">
                    <Input placeholder="Enter your email address" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}