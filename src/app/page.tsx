import Feeds from "@/components/Feeds";
import React, { Suspense } from "react";

const page = async () => {
  return (
    <div className="w-full flex-center flex-col ">
      <h1 className=" head_text text-center">Discover & Share</h1>
      <h1 className=" orange_gradient text-center ">AI-Powered Prompts</h1>
      <p className="text-center desc ">
        Promptopia is an open-source AI prompting tool for modern world to
        discover, create and share creative prompts
      </p>
      <Feeds />
    </div>
  );
};

export default page;
