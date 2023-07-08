"use client";

import React, { useState } from "react";
import Form from "../../components/Form";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";


type PostType = {
  prompt: string;
  tags: string;
};

const page = () => {
  const [post, setPost] = useState<PostType>({ prompt: "", tags: "" });
  const [submitting, setSubmitting] = useState<boolean>(false);
  const session = useSession();
  const router = useRouter();

  const createPrompt = async () => {
    try {
      setSubmitting(true);

      if (session.data && session.data.user?.email) {
        const response = await fetch("/api/post/new", {
          method: "POST",
          body: JSON.stringify({
            email: session.data.user.email,
            prompt: post.prompt,
            tags: post.tags,
          }),
        });

        if (response.ok) {
          setPost({ prompt: "", tags: "" });
          router.replace("/");
        }
      } else {
        router.push("/");
      }
    } catch (err) {
      console.log(err);
    } finally {
      setSubmitting(false);
    }
  };




  return (
    <Form
      type="Create"
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={createPrompt}
    />
  );
};

export default page;
