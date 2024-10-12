import RegisterForm from "@/components/forms/RegisterForm";
import { getUser } from "@/lib/actions/patient.actions";
import Image from "next/image";
import React from "react";

const Register = async ({ params: { userId } }: SearchParamProps) => {
  const user = await getUser(userId);

  console.log("user:", user);

  return (
    <div className="flex h-screen max-h-screen">
      <section className="remove-scrollbar container ">
        <div className="sub-container max-w-[860px] flex-1 flex-col py-10">
          {/* LOGO */}
          <div className="flex gap-2 cursor-pointer ">
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

          <p className="copyright py-12 ">© 2024 healthHeaven</p>
        </div>
      </section>
      <Image
        src="/assets/images/registerImg.png"
        height={1000}
        width={1000}
        alt="patient"
        className="side-img max-w-[400px] object-cover"
      />
    </div>
  );
};

export default Register;
