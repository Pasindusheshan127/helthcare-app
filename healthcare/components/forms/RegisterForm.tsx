"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormControl } from "@/components/ui/form";
import CustomFormField from "../CustomFormField";
import SubmitButton from "../SubmitButton";
import { useState } from "react";
import { PatientFormValidation } from "@/lib/validation";
import { useRouter } from "next/navigation";

import {
  Doctors,
  GenderOptions,
  IdentificationTypes,
  PatientFormDefaultValues,
} from "@/constants";
import { Label } from "../ui/label";
import { SelectItem } from "../ui/select";
import Image from "next/image";
import FileUploder from "../FileUploder";
import { Value } from "@radix-ui/react-select";
import { registerPatient } from "@/lib/actions/patient.actions";
import { FormFieldType } from "./PatientForm";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";

const RegisterForm = ({ user }: { user: User }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof PatientFormValidation>>({
    resolver: zodResolver(PatientFormValidation),
    defaultValues: {
      ...PatientFormDefaultValues,
      name: "",
      email: "",
      phone: "",
    },
  });

  async function onSubmit(values: z.infer<typeof PatientFormValidation>) {
    setIsLoading(true);

    // Store file info in form data as
    let formData;
    if (
      values.identificationDocument &&
      values.identificationDocument?.length > 0
    ) {
      const blobFile = new Blob([values.identificationDocument[0]], {
        type: values.identificationDocument[0].type,
      });

      formData = new FormData();
      formData.append("blobFile", blobFile);
      formData.append("fileName", values.identificationDocument[0].name);
    }

    try {
      const patientData = {
        ...values,
        userId: user.$id,
        birthDate: new Date(values.birthDate),
        identificationDocument: formData,
      };
      //@ts-ignore
      const newPatient = await registerPatient(patientData);
    } catch (err) {
      console.error("Error creating user:", err);
    }
    setIsLoading(false);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 flex-1">
        {/* Header section */}
        <section className="space-y-4 ">
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

        {/* Full name  */}
        <CustomFormField
          fieldType={FormFieldType.INPUT}
          control={form.control}
          name="name"
          label="Full Name"
          placeholder="janith liyanage"
          iconSrc="/assets/icons/user.svg"
          iconAlt="user"
        />

        <div className="flex flex-col gap-6 xl:flex-row">
          {/* email address */}
          <div className="w-full xl:w-1/2">
            <CustomFormField
              fieldType={FormFieldType.INPUT}
              control={form.control}
              name="email"
              label="Email"
              placeholder="janithliyanage@gmail.com"
              iconSrc="/assets/icons/email.svg"
              iconAlt="email"
            />
          </div>

          {/* Phone number  */}
          <div className="w-full xl:w-1/2">
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
        </div>
        <div className="flex flex-col gap-6 xl:flex-row">
          {/* Birthday */}
          <div className="w-full xl:w-1/2">
            <CustomFormField
              fieldType={FormFieldType.DATE_PICKER}
              control={form.control}
              name="BirthDate"
              label="Date of Birth"
            />
          </div>
          {/* Gender */}
          <div className="w-full xl:w-1/2">
            <CustomFormField
              fieldType={FormFieldType.SKELTON}
              control={form.control}
              name="gender"
              label="Gender"
              renderSkeleton={(field) => (
                <FormControl>
                  <RadioGroup
                    className="flex h-11 gap-6 xl:justify-between"
                    onChange={field.onChange}
                    defaultValue={field.value}
                  >
                    {GenderOptions.map((option) => (
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
        </div>

        <div className="flex flex-col gap-6 xl:flex-row w-full">
          {/* address */}
          <div className="w-full xl:w-1/2">
            <CustomFormField
              fieldType={FormFieldType.INPUT}
              control={form.control}
              name="address"
              label="Address"
              placeholder="201,uyandena,kurunagala"
            />
          </div>

          {/* occupation */}
          <div className="w-full xl:w-1/2">
            <CustomFormField
              fieldType={FormFieldType.INPUT}
              control={form.control}
              name="occupation"
              label="Occupation"
              placeholder="Software Engineer"
            />
          </div>
        </div>

        <div className="flex flex-col gap-6 xl:flex-row">
          {/* Emergency Contac tName */}
          <div className="w-full xl:w-1/2">
            <CustomFormField
              fieldType={FormFieldType.INPUT}
              control={form.control}
              name="emergencyContactName"
              label="Emergency Contac tName"
              placeholder="Guardian name"
            />
          </div>

          {/* Emergency Contact number */}
          <div className="w-full xl:w-1/2">
            <CustomFormField
              fieldType={FormFieldType.PHONE_INPUT}
              control={form.control}
              name="emergencyContactNumber"
              label="Emaegency Contact number"
              placeholder="+94 77 123 4567"
            />
          </div>
        </div>

        {/* Medical information section*/}
        <section className=" space-y-6">
          <div className="space-y-1 mb-9">
            <h1 className="sub-header">Medical Information</h1>
          </div>
        </section>

        <CustomFormField
          fieldType={FormFieldType.SELECT}
          control={form.control}
          name="primartPhysician"
          label="Primary Physician"
          placeholder="select a physician"
        >
          {Doctors.map((docter) => (
            <SelectItem key={docter.name} value={docter.name}>
              <div className="flex items-center cursor-pointer gap-4">
                <Image
                  src={docter.image}
                  width={32}
                  height={32}
                  alt={docter.name}
                  className="rounded-md border border-dark-500"
                />
                <p className="">{docter.name}</p>
              </div>
            </SelectItem>
          ))}
        </CustomFormField>

        <div className="flex flex-col gap-6 xl:flex-row">
          {/* Insurance Provider */}
          <div className="w-full xl:w-1/2">
            <CustomFormField
              fieldType={FormFieldType.INPUT}
              control={form.control}
              name="insuranceProvider"
              label="Insurance Provider"
              placeholder="Srilankan's Insurance"
            />
          </div>

          {/* Insurance Policy Number */}
          <div className="w-full xl:w-1/2">
            <CustomFormField
              fieldType={FormFieldType.INPUT}
              control={form.control}
              name="insurancePolicyNumber"
              label="Insurance Policy Number"
              placeholder="Sxxycd3246432"
            />
          </div>
        </div>

        <div className="flex flex-col gap-6 xl:flex-row">
          {/*Allergies*/}
          <div className="w-full xl:w-1/2">
            <CustomFormField
              fieldType={FormFieldType.TEXTAREA}
              control={form.control}
              name="allergies"
              label="Allergies (if any)"
              placeholder="penicillin,pollen"
            />
          </div>

          {/*Current Medication*/}
          <div className="w-full xl:w-1/2">
            <CustomFormField
              fieldType={FormFieldType.TEXTAREA}
              control={form.control}
              name="currentMedication"
              label="Current Medication (if any)"
              placeholder="paracetamol 500mg"
            />
          </div>
        </div>

        <div className="flex flex-col gap-6 xl:flex-row">
          {/*Family Medical History*/}
          <div className="w-full xl:w-1/2">
            <CustomFormField
              fieldType={FormFieldType.TEXTAREA}
              control={form.control}
              name="familyMedicalHistory"
              label="Family Medical History"
              placeholder=" Father has heart disease  "
            />
          </div>

          {/*Past Medical History*/}
          <div className="w-full xl:w-1/2">
            <CustomFormField
              fieldType={FormFieldType.TEXTAREA}
              control={form.control}
              name="pastMedicalHistory"
              label="Past Medical History "
              placeholder=" Appendectomy "
            />
          </div>
        </div>

        {/* Identification and verification section */}
        <section className="space-y-6">
          <div className="space-y-1 mb-9">
            <h1 className="sub-header">Identification and Verification</h1>
          </div>
        </section>

        {/* Identification Type */}
        <CustomFormField
          fieldType={FormFieldType.SELECT}
          control={form.control}
          name="identificationType"
          label="Identification Type"
          placeholder="Select an Identification Type"
        >
          {IdentificationTypes.map((type) => (
            <SelectItem key={type} value={type}>
              {type}
            </SelectItem>
          ))}
        </CustomFormField>

        {/* Identification Number */}
        <CustomFormField
          fieldType={FormFieldType.INPUT}
          control={form.control}
          name="identificationNumber"
          label="Identification Number"
          placeholder="123456789"
        />

        {/* Identification Document */}
        <CustomFormField
          fieldType={FormFieldType.SKELTON}
          control={form.control}
          name="identificationDocument"
          label="Identification Document"
          renderSkeleton={(field) => (
            <FormControl>
              <FileUploder files={field.value} onChange={field.onChange} />
            </FormControl>
          )}
        />

        {/* Consent and Privacy section */}
        <section className="space-y-6">
          <div className="space-y-1 mb-9">
            <h1 className="sub-header">Consent and Privacy</h1>
          </div>
        </section>

        {/* Treatment Consent */}
        <CustomFormField
          fieldType={FormFieldType.CHECKBOX}
          control={form.control}
          name="treatmentConsent"
          label="I consent to teatment"
        />

        {/* Disclouser Consent */}
        <CustomFormField
          fieldType={FormFieldType.CHECKBOX}
          control={form.control}
          name="disclouserConsent"
          label="I consent to disclouser of information"
        />

        {/* Privacy Consent */}
        <CustomFormField
          fieldType={FormFieldType.CHECKBOX}
          control={form.control}
          name="privacyConsent"
          label="I consent to privacy policy"
        />

        {/* Submit button */}
        <SubmitButton isLoading={isLoading}>Get Started</SubmitButton>
      </form>
    </Form>
  );
};

export default RegisterForm;
