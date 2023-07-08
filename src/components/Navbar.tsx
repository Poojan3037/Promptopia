"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useSession, signIn, signOut, getProviders } from "next-auth/react";

import { useRouter } from "next/navigation";
import Loading from "@/app/loading";

type ProviderType = {
  callbackUrl: string;
  id: string;
  name: string;
  signinUrl: string;
  type: string;
};

type ProviderRespose = {
  google: ProviderType;
};

const Navbar = () => {
  const [providers, setProviders] = useState<any>([]);
  const [toggleDropdown, setToggleDropdown] = useState(false);

  const session = useSession();
  const router = useRouter();

  const handleLogout = () => {
    router.push("/");
    signOut();
  };

  useEffect(() => {
    (async () => {
      const res: ProviderRespose | null = await getProviders();
      if (res) {
        setProviders(Object.values(res));
      }
    })();
  }, []);

  return (
    <nav className="w-full flex-between pt-3">
      {session.status === "loading" && <Loading />}
      <Link href="/" className="flex-center gap-3 ">
        <Image
          src="/assets/images/logo.svg"
          alt="logo"
          width={30}
          height={30}
          className=" object-contain"
        />
        <p className="font-semibold text-base ">Promptopia</p>
      </Link>

      <div className="flex-center gap-2 ">
        {session.data && session.status === "authenticated" ? (
          <>
            <button
              className="button  bg-black text-white hover:bg-white hover:text-black"
              onClick={() => router.push("/create-prompt")}
            >
              Create Post
            </button>
            <button
              className="button bg-white text-black hover:bg-black hover:text-white"
              onClick={handleLogout}
            >
              Sign Out
            </button>
            <Image
              src={session.data.user?.image || "/assets/images/logo.svg"}
              alt={session.data.user?.name || "logo"}
              width={40}
              height={40}
              className=" object-contain m-2 cursor-pointer rounded-full"
              onClick={() => router.push("/profile")}
            />
          </>
        ) : (
          <>
            {Object.values(providers).length > 0 &&
              Object.values(providers).map((provider: ProviderType | any) => {
                return (
                  <button
                    key={provider?.name}
                    className="button  bg-black text-white hover:bg-white hover:text-black"
                    onClick={() => signIn(provider.signinUrl)}
                  >
                    Sign In
                  </button>
                );
              })}
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
