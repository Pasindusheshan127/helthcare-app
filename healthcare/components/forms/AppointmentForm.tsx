"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form } from "@/components/ui/form";
import CustomFormField from "../CustomFormField";
import SubmitButton from "../SubmitButton";
import { useState } from "react";
import { getAppointmentSchema } from "@/lib/validation";
import { useRouter } from "next/navigation";
import { FormFieldType } from "./PatientForm";
import { Doctors } from "@/constants";
import { SelectItem } from "../ui/select";
import Image from "next/image";
import { createAppointment } from "@/lib/actions/appointment.actions";
import { ColumnSpacingIcon } from "@radix-ui/react-icons";

const AppointmentForm = ({
  userId,
  patientId,
  type,
}: {
  userId: string;
  patientId: string;
  type: "create" | "cancel" | "schedule";
}) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const AppointmentFormValidation = getAppointmentSchema(type);

  const form = useForm<z.infer<typeof AppointmentFormValidation>>({
    resolver: zodResolver(AppointmentFormValidation),
    defaultValues: {
      primaryPhysician: "",
      schedule: new Date(),
      reason: "",
      note: "",
      cancellationReason: "",
    },
  });

  const onSubmit = async (
    values: z.infer<typeof AppointmentFormValidation>
  ) => {
    setIsLoading(true);

    let status;
    switch (type) {
      case "schedule":
        status = "schedule";
        break;
      case "cancel":
        status = "cancel";
        break;
      case "create":
        status = "create";
        break;
      default:
        break;
    }

    console.log("before the type", type);
    console.log(patientId);

    try {
      if (type === "create" && patientId) {
        // console.log("I am here");
        const appointmentData = {
          userId,
          patient: patientId,
          primaryPhysician: values.primaryPhysician,
          schedule: new Date(values.schedule),
          reason: values.reason,
          note: values.note,
          status: status as Status,
        };

        //@ts-ignore
        const appointment = await createAppointment(appointmentData);

        if (appointment) {
          form.reset();
          router.push(
            `/patient/${userId}/new-appointment/success?appointmentId=${appointment.$id}`
          );
        }
      }
    } catch (err) {
      console.error("Error creating user:", err);
    }
    setIsLoading(false);
  };

  let buttonLabel;

  switch (type) {
    case "cancel":
      buttonLabel = "Cancel Appoinment";
      break;
    case "create":
      buttonLabel = "Create Appoinment";
      break;
    case "schedule":
      buttonLabel = "Schedule Appoinment";
      break;
    default:
      break;
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 flex-1">
        <section className="mb-12 space-y4">
          <h1 className="header">New Appoinment</h1>
          <p className="text-dark-700">
            Request a new appointment in 10 second
          </p>
        </section>

        {type !== "cancel" && (
          <>
            <CustomFormField
              fieldType={FormFieldType.SELECT}
              control={form.control}
              name="primaryPhysician"
              label="Docter"
              placeholder="select a Docter"
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

            <CustomFormField
              fieldType={FormFieldType.DATE_PICKER}
              control={form.control}
              name="schedule"
              label="Schedule"
              placeholder="Expected appoinment date"
              showTimeSelect
              dateFormat="MM/dd/yyyy - h:mm aa"
            />

            <div className="flex flex-col gap-6 xl:flex-row">
              <div className="w-full xl:w-1/2">
                <CustomFormField
                  fieldType={FormFieldType.TEXTAREA}
                  control={form.control}
                  name="reason"
                  label="Reason"
                  placeholder="Enter reason for appoinment"
                />
              </div>
              <div className="w-full xl:w-1/2">
                <CustomFormField
                  fieldType={FormFieldType.TEXTAREA}
                  control={form.control}
                  name="notes"
                  label="Notes"
                  placeholder="Enter notes"
                />
              </div>
            </div>
          </>
        )}

        {type === "cancel" && (
          <CustomFormField
            fieldType={FormFieldType.TEXTAREA}
            control={form.control}
            name="cancellationReason"
            label="Reason for cansellation"
            placeholder="Enter reason for cancellation"
          />
        )}

        <SubmitButton
          isLoading={isLoading}
          className={`${
            type === "cancel" ? "shad-danger-btn" : "shad-primary-btn"
          } w-full`}
        >
          {buttonLabel}
        </SubmitButton>
      </form>
    </Form>
  );
};

export default AppointmentForm;
