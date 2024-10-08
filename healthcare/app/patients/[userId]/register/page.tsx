import RegisterForm from "@/components/forms/RegisterForm";
import { getUser } from "@/lib/actions/patient.actions";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Register = async ({ params: { userId } }: SearchParamProps) => {
  const user = await getUser(userId);

  return (
    <div className="flex h-screen max-h-screen">
      <section className="remove-scrolbar container my-auto">
        <div className="sub-container max-w-[496px]">
          {/* LOGO */}
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

          <RegisterForm user={user} />

          <div className="text-14-regular flex mt-12 justify-between">
            <p className="justify-items-end text-dark-600 xl:text-green-500">
              © 2024 healthHeaven
            </p>
            <Link href="/?admin=true" className="text-green-500">
              Admin
            </Link>
          </div>
        </div>
      </section>
      <Image
        src="/assets/images/registerImg.png"
        height={1000}
        width={1000}
        alt="patient"
        className="side-img max-w-[50%] object-cover"
      />
    </div>
  );
};

export default Register;
