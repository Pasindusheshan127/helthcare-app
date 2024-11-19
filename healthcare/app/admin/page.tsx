import StatCard from "@/components/StatCard";
import { getRecentAppointmentList } from "@/lib/actions/appointment.actions";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { columns } from "@/components/table/columns";
import { DataTable } from "@/components/table/DataTable";

const Admin = async () => {
  const appointments = await getRecentAppointmentList();
  // interface Patient {
  //   name: string;
  //   age: number;
  //   id: string;
  // }

  interface Appointment {
    id: string;
    amount: number;
    status: "pending" | "processing" | "success" | "scheduled";
    email: string;
    schedule: string;
    primaryPhysician: string;
    userId: string;
    Patient: { name: string; age: number; id: string };
  }

  const data: Appointment[] = [
    {
      id: "728ed52f",
      Patient: {
        name: "john",
        id: "728ed52f",
        age: 10,
      },
      status: "pending",
      email: "m@example.com",
      amount: 100,
      schedule: "01/27/2024",
      primaryPhysician: "John Green",
      userId: "728ed52f",
    },
    {
      id: "728ed2f",
      Patient: {
        name: "john",
        id: "728ed2f",
        age: 10,
      },
      status: "scheduled",
      email: "m@example.com",
      amount: 100,
      schedule: "02/27/2024",
      primaryPhysician: "Leila Cameron",
      userId: "728ed2f",
    },
  ];

  console.log("doc:", appointments.documents);
  return (
    <div className="mx-auto flex max-w-7xl flex-col space-y-4">
      <header className="admin-header">
        <Link href="/" className="cursor-pointer">
          <div className="flex gap-2">
            <Image
              src="/assets/icons/healthheaven.png"
              height={32}
              width={32}
              alt="logo"
            />
            <h1 className="text-xl">healthHeaven</h1>
          </div>
        </Link>
        <p className=" text-16-semibold">Admin Dashboard</p>
      </header>

      <main className="admin-main">
        <section className="w-full space-y-4 mt-4">
          <h1 className="text-3xl">Welcome</h1>
          <p className="text-dark-700">
            Start the day with managing new appointments.
          </p>
        </section>
        <section className="admin-stat">
          <StatCard
            type="appoinments"
            count={appointments.ScheduledCount}
            label="Scheduled appointments"
            icon="/assets/icons/appointments.svg"
          />
          <StatCard
            type="pending"
            count={appointments.pendingCount}
            label="Pending appointments"
            icon="/assets/icons/pending.svg"
          />
          <StatCard
            type="cancelled"
            count={appointments.cancelledCount}
            label="cancelled appointments"
            icon="/assets/icons/cancelled.svg"
          />
        </section>
        <DataTable columns={columns} data={appointments.documents} />
      </main>
    </div>
  );
};

export default Admin;
