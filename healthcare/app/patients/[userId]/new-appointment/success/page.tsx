import { Button } from "@/components/ui/button";
import { Doctors } from "@/constants";
import { getAppointment } from "@/lib/actions/appointment.actions";
import { formatDateTime } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Success = async ({
  params: { userId },
  searchParams,
}: SearchParamProps) => {
  const appointmentId = (searchParams?.appointmentId as string) || "";
  const appointment = await getAppointment(appointmentId);
  //   const doctor = Doctors.find(
  //     (doc) => doc.name === appointment.primaryPhysicaian
  //   );

  return (
    <div className="flex h-screen max-h-screen px-[5%]">
      <div className="success-img">
        <Link href="/">
          <div className="flex">
            <Image
              src="/assets/icons/HealthHeaven.png"
              height={100}
              width={100}
              alt="logo"
              className="h-10 w-fit"
            />
            <h1 className="text-2xl mt-1 ml-2">healthHeaven</h1>
          </div>
        </Link>
        <section className="flex flex-col items-center">
          <Image
            src="/assets/gifs/success.gif"
            height={300}
            width={300}
            alt="success"
          />
          <h1 className="text-green-500 text-6xl font-bold mb-4">Success!</h1>
          <h2 className="header mb-6 max-w-[600px]">
            your <span className="text-green-500">appointment request</span> has
            been successfully submitted!
          </h2>
          <p className="">We wil be in touch shortly to confirm.</p>
        </section>
        <section className="request-details">
          <p className="">Request appointment details:</p>
          <div className="">
            {/* <Image src={doctor?.image!} height={100} width={100} alt="doctor" className="size-6" /> */}
            {/* <p className="whitespace-nowrap">Dr. {doctor?.name}</p> */}
          </div>
          <div className="flex gap-2">
            <Image
              src="/assets/icons/calendar.svg"
              width={24}
              height={24}
              alt="calendar"
            />
            {/* <p>{formatDateTime(appointment.schedule).dateTime}</p> */}
          </div>
        </section>
        <Button variant="outline" className="shad-primary-btn" asChild>
          <Link href={`/patients/${userId}/new-appointment`}>
            New Appointment
          </Link>
        </Button>

        <p className="copyright ">© 2024 healthHeaven</p>
      </div>
    </div>
  );
};

export default Success;
