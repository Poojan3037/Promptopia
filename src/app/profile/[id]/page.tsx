"use client"

import Loading from "@/app/loading";
import Profile from "@/components/Profile";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const page = ({ params }: any) => {
  const searchParams = useSearchParams();
  const userName = searchParams.get("name") as string

  const [postList, setPostList] = useState([])
  const [loading, setLoading] = useState(false)



  useEffect(() => {
    (async () => {
      setLoading(true)
      const posts = await fetch(`/api/profile/${params.id}`)
      const postdata = await posts.json()
      setPostList(postdata.reverse())
      setLoading(false)
    })()
  }, [])


  return (
    <>
      {
        loading && <Loading />
      }
      <Profile
        name={userName}
        description={`Welcome to ${userName}'s personalized profile page. Explore ${userName}'s exceptional prompts and be inspired by the power of their imagination`}
        postList={postList}
        setPostList={setPostList}
      />
    </>
  );
};

export default page;
