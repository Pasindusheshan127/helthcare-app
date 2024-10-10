import React from "react";
import Image from "next/image";
import AppointmentForm from "@/components/forms/AppointmentForm";
import { getPatient } from "@/lib/actions/patient.actions";

const NewAppointment = async ({ params: { userId } }: SearchParamProps) => {
  const patient = await getPatient(userId);

  // console.log("patient:", patient);

  return (
    <div className="flex h-screen max-h-screen">
      {/* TODO: Verification | */}
      <section className="remove-scrolbar container my-auto">
        <div className="sub-container max-w-[860px flex-1 justify-between]">
          <div className="flex gap-2 cursor-pointer">
            <Image
              src="/assets/icons/HealthHeaven.png"
              height={1000}
              width={1000}
              alt="patient"
              className="mb-12 h-10 w-fit rounded-full "
            />
            <h1 className="text-5xl-bold text-center font-semibold mt-2">
              HealthHeaven
            </h1>
          </div>

          <AppointmentForm
            type="create"
            userId={userId}
            patientId={patient?.$id}
          />

          <p className="jcopyright mt-10 py-12">© 2024 healthHeaven</p>
        </div>
      </section>
      <Image
        src="/assets/images/appointment-img.png"
        height={1000}
        width={1000}
        alt="appointment"
        className="side-img max-w-[390px] bg-bottom"
      />
    </div>
  );
};

export default NewAppointment;
