"use client";
import React, { useEffect, useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";

import { set } from "zod";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { decryptKey, encryptKey } from "@/lib/utils";

const PasskeyModal = () => {
  const router = useRouter();
  const [open, setOpen] = useState(true);
  const [passkey, setPasskey] = useState("");
  const [error, setError] = useState("");
  const path = usePathname();

  const encryptedKey =
    typeof window !== "undefined"
      ? window.localStorage.getItem("accessKey")
      : null;

  useEffect(() => {
    const accessKey = encryptedKey && decryptKey(encryptedKey);
    if (accessKey === process.env.NEXT_PUBLIC_ADMIN_PASSKEY) {
      setOpen(false);
      router.push("/admin");
    } else {
      setOpen(true);
    }
  }, [encryptKey]);

  const validatePasskey = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();

    if (path) {
      if (passkey === process.env.NEXT_PUBLIC_ADMIN_PASSKEY) {
        const encryptedKey = encryptKey(passkey);
        localStorage.setItem("accessKey", encryptedKey);
        setOpen(false);
      } else {
        setError("Invalid Passkey. Please try again");
      }
    }
  };

  const closeModal = () => {
    setOpen(false);
    router.push("/");
  };
  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent className="shad-alert-dialog">
        <AlertDialogHeader>
          <AlertDialogTitle className="flex flex-start justify-between">
            Admin Access verification
            <Image
              src="/assets/icons/close.svg"
              alt="closse"
              width={20}
              height={20}
              onClick={() => closeModal()}
              className="cursor-pointer"
            />
          </AlertDialogTitle>
          <AlertDialogDescription>
            To access the admin page , please enter the passkey.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div>
          <InputOTP
            maxLength={6}
            value={passkey}
            onChange={(value) => setPasskey(value)}
          >
            <InputOTPGroup className="shad-otp">
              <InputOTPSlot className="shad-otp-slot" index={0} />
              <InputOTPSlot className="shad-otp-slot" index={1} />
              <InputOTPSlot className="shad-otp-slot" index={2} />
              <InputOTPSlot className="shad-otp-slot" index={3} />
              <InputOTPSlot className="shad-otp-slot" index={4} />
              <InputOTPSlot className="shad-otp-slot" index={5} />
            </InputOTPGroup>
          </InputOTP>
          {error && (
            <p className="shad-error text-14-regular mt-14 flex justify-center">
              {error}
            </p>
          )}
        </div>
        <AlertDialogFooter>
          <AlertDialogCancel
            onClick={(e) => validatePasskey(e)}
            className="shad-primary-btn w-full"
          >
            enter Admin Passkey
          </AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default PasskeyModal;
