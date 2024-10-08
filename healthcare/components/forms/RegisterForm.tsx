"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormControl } from "@/components/ui/form";
import CustomFormField from "../CustomFormField";
import SubmitButton from "../SubmitButton";
import { useState } from "react";
import { UserFormValidation } from "@/lib/validation";
import { useRouter } from "next/navigation";
import { FormFieldType } from "./PatientForm";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { GenderOption } from "@/constants";
import { Label } from "../ui/label";

const RegisterForm = ({ user }: { user: User }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof UserFormValidation>>({
    resolver: zodResolver(UserFormValidation),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
    },
  });

  async function onSubmit({
    name,
    email,
    phone,
  }: z.infer<typeof UserFormValidation>) {
    setIsLoading(true);

    // try {
    //   const user = { name, email, phone };
    //   const newUser = await createUser(user);
    //   console.log("User created:", newUser);
    //   if (newUser) {
    //     router.push(`/patients/${newUser.$id}/register`);
    //   }
    // } catch (err) {
    //   console.error("Error creating user:", err);
    // }
    setIsLoading(false);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 flex-1">
        {/* Header section */}
        <section className=" space-y-4">
          <h1 className="header">welcome👋</h1>
          <p className="text-dark-700">Let us know more about yourself. </p>
        </section>
        {/* User details section */}

        {/* Personal information sectio */}
        <section className=" space-y-6">
          <div className="space-y-1 mb-9">
            <h1 className="sub-header">Personal Information</h1>
          </div>
        </section>

        {/* Full name section */}
        <CustomFormField
          fieldType={FormFieldType.INPUT}
          control={form.control}
          name="name"
          label="Full Name"
          placeholder="janith liyanage"
          iconSrc="/assets/icons/user.svg"
          iconAlt="user"
        />

        <div className="flex flex-col gap-6 xl:flex-row justify-between">
          {/* email address */}
          <CustomFormField
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name="email"
            label="Email"
            placeholder="janithliyanage@gmail.com"
            iconSrc="/assets/icons/email.svg"
            iconAlt="email"
          />

          {/* Phone number  */}
          <CustomFormField
            fieldType={FormFieldType.PHONE_INPUT}
            control={form.control}
            name="phone"
            label="Phone number"
            placeholder="+94 77 123 4567"
            iconSrc="/assets/icons/phone.svg"
            iconAlt="phone"
          />
        </div>
        <div className="flex flex-col xl:flex-row gap-6 justify-between">
          {/* Birthday */}
          <CustomFormField
            fieldType={FormFieldType.DATE_PICKER}
            control={form.control}
            name="BirthDate"
            label="Date of Birth"
          />
          {/* Gender */}
          <CustomFormField
            fieldType={FormFieldType.SKELTON}
            control={form.control}
            name="gender"
            label="Gender"
            renderSkelton={(field) => (
              <FormControl>
                <RadioGroup
                  className="flex h-11 gap-6 xl:justify-between"
                  onChange={field.onChange}
                  defaultValue={field.value}
                >
                  {GenderOption.map((option) => (
                    <div key={option} className="radio-group">
                      <RadioGroupItem value={option} id={option} />
                      <Label htmlFor={option} className="cursor-pointer">
                        {option}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </FormControl>
            )}
          />
        </div>
        {/* Medical information section*/}
        <section className=" space-y-6">
          <div className="space-y-1 mb-9">
            <h1 className="sub-header">Medical Information</h1>
          </div>
        </section>

        {/* Identification and verification section */}
        <section className="space-y-6">
          <div className="space-y-1 mb-9">
            <h1 className="sub-header">Identification and Verification</h1>
          </div>
        </section>

        {/* Submit button */}
        <SubmitButton isLoading={isLoading}>Get Started</SubmitButton>
      </form>
    </Form>
  );
};

export default RegisterForm;
