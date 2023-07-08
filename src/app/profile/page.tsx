"use client"

import Profile from "@/components/Profile";
import { useSession } from "next-auth/react";


import React, { useEffect, useState } from "react";
import Loading from "../loading";


const page = () => {

  const session = useSession();
  const [postList, setPostList] = useState([])
  const [loading, setLoading] = useState(false)



  useEffect(() => {
    (async () => {
      setLoading(true)
      const posts = await fetch("/api/profile", {
        method: "POST",
        body: JSON.stringify({ email: session.data?.user?.email })
      })
      const postdata = await posts.json()
      setPostList(postdata.reverse())
      setLoading(false)
    })()
  }, [])


  return (
    <>
      {loading && <Loading />}
      <Profile
        name="My"
        description="Welcome to your personalized profile page. Share your exceptional prompts and inspire others with the power of your imagination"
        postList={postList}
        setPostList={setPostList}
      />
    </>

  );
};

export default page;
