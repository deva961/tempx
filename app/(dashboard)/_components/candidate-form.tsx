"use client";

import { z } from "zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { updateApplicationById, userApplication } from "@/actions/candidates";
import { candidateRegistrationSchema } from "@/schemas/candidate-form";
import toast from "react-hot-toast";
import { Router } from "next/router";

interface CandidateFormProps {
  initialData: {
    id: string;
    name: string;
    email: string;
    experience: string;
    address?: string;
    province: string;
    resume: string;
    status: string;
  };
}

export const CandidateForm = ({ initialData }: CandidateFormProps) => {
  const form = useForm<z.infer<typeof candidateRegistrationSchema>>({
    resolver: zodResolver(candidateRegistrationSchema),
    defaultValues: initialData,
  });

  const router = useRouter();

  const { isSubmitting } = form.formState;

  const onSubmit = async (
    values: z.infer<typeof candidateRegistrationSchema>
  ) => {
    try {
      await updateApplicationById(initialData.id, values);
      router.push("/hirings");
      toast.success("Submitted Successfully!");
      form.reset();
    } catch (error) {
      toast.error("Something went wrong!");
    }
  };

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          {/* name */}
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input
                    disabled
                    placeholder="Rajesh Allala"
                    className="w-full"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* email */}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    disabled
                    placeholder="rajesh@gmail.com"
                    className="w-full"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* experience */}
          <FormField
            control={form.control}
            name="experience"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Experience <small>(in years)</small>
                </FormLabel>
                <FormControl>
                  <Input
                    disabled
                    placeholder="2"
                    className="w-full"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* address */}
          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Address</FormLabel>
                <FormControl>
                  <Input
                    disabled
                    placeholder="Hamilton"
                    className="w-full"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* province */}
          <FormField
            control={form.control}
            name="province"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Province</FormLabel>
                <FormControl>
                  <Select
                    onValueChange={field.onChange}
                    value={field.value}
                    disabled
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select a province" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="alberta">Alberta</SelectItem>
                      <SelectItem value="british_columbia">
                        British Columbia
                      </SelectItem>
                      <SelectItem value="manitoba">Manitoba</SelectItem>
                      <SelectItem value="new_brunswick">
                        New Brunswick
                      </SelectItem>
                      <SelectItem value="nova_scotia">Nova Scotia</SelectItem>
                      <SelectItem value="ontario">Ontario</SelectItem>
                      <SelectItem value="quebec">Quebec</SelectItem>
                      <SelectItem value="saskatchewan">Saskatchewan</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* resume */}
          <FormField
            control={form.control}
            name="resume"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Resume</FormLabel>
                <div>
                  <a
                    href={initialData.resume}
                    target="_blank"
                    className="text-sm text-blue-600 underline"
                  >
                    Download
                  </a>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* status */}
          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Status</FormLabel>
                <div>
                  <FormControl>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="fresh">New</SelectItem>
                        <SelectItem value="interview">Interview</SelectItem>
                        <SelectItem value="selected">Select</SelectItem>
                        <SelectItem value="rejected">Reject</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <Loader2 className="animate-spin mr-1 h-4" /> Processing...
              </>
            ) : (
              "Update"
            )}
          </Button>
        </form>
      </Form>
    </>
  );
};
