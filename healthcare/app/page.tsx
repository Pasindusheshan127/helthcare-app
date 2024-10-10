import Image from "next/image";
import Link from "next/link";
import PatientForm from "@/components/forms/PatientForm";
import PasskeyModal from "@/components/PasskeyModal";

export default function Home({ searchParams }: SearchParamProps) {
  const isAdmin = searchParams.admin === "true";
  return (
    <div className="flex h-screen max-h-screen">
      {isAdmin && <PasskeyModal />}

      <section className="remove-scrolbar container my-auto">
        <div className="sub-container max-w-[496px]">
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

          <PatientForm />

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
        src="/assets/images/onboardingImg.jpg"
        height={1000}
        width={1000}
        alt="patient"
        className="side-img max-w-[50%]"
      />
    </div>
  );
}
