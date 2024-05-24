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
import { userApplication } from "@/actions/candidates";
import { candidateRegistrationSchema } from "@/schemas/candidate-form";
import { FileUpload } from "@/app/(dashboard)/_components/file-upload";
import toast from "react-hot-toast";

export const CandidateForm = () => {
  const router = useRouter();
  const [resumeUrl, setResumeUrl] = useState<string | undefined>();

  const form = useForm<z.infer<typeof candidateRegistrationSchema>>({
    resolver: zodResolver(candidateRegistrationSchema),
    defaultValues: {
      name: "",
      email: "",
      experience: "",
      address: "",
      province: "",
      resume: "",
    },
  });

  const { isSubmitting } = form.formState;

  const onSubmit = async (
    values: z.infer<typeof candidateRegistrationSchema>
  ) => {
    try {
      await userApplication(values);

      toast.success("Submitted Successfully!");
      form.reset();
      setResumeUrl("");
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
                    disabled={isSubmitting}
                    placeholder="Rajesh Allala"
                    className="w-full"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* name */}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    disabled={isSubmitting}
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
                    disabled={isSubmitting}
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
                    disabled={isSubmitting}
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
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select a province" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="alberta">Alberta</SelectItem>
                      <SelectItem value="british columbia">
                        British Columbia
                      </SelectItem>
                      <SelectItem value="manitoba">Manitoba</SelectItem>
                      <SelectItem value="new brunswick">
                        New Brunswick
                      </SelectItem>
                      <SelectItem value="nova scotia">Nova Scotia</SelectItem>
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
                <FormControl>
                  {resumeUrl ? (
                    <Input
                      disabled
                      placeholder="Resume uploaded"
                      className="w-full"
                    />
                  ) : (
                    <FileUpload
                      endpoint="resume"
                      onChange={(url) => {
                        if (url) {
                          setResumeUrl(url);
                          form.setValue("resume", url);
                        }
                      }}
                    />
                  )}
                </FormControl>
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
              "Submit"
            )}
          </Button>
        </form>
      </Form>
    </>
  );
};
