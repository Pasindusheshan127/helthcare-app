import Image from "next/image";
import Link from "next/link";
import PatientForm from "@/components/forms/PatientForm";

export default function Home() {
  return (
    <div className="flex h-screen max-h-screen">
      {/* TODO: Verification | */}
      <section className="remove-scrolbar container my-auto">
        <div className="sub-container max-w-[496px]">
          <Image
            src="/assets/icons/logo-full.svg"
            height={100}
            width={100}
            alt="patient"
            className="mb-12 h-10 w-fit rounded-full cursor-pointer"
          />
          <PatientForm />
          <div className="text-14-regular flex justify-between">
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
        src="/assets/images/onboardingImg.jpg"
        height={1000}
        width={1000}
        alt="patient"
        className="side-img max-w-[50%]"
      />
    </div>
  );
}
