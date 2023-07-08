"use client";

import React, { useEffect, useState } from "react";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Form from "@/components/Form";
import Loading from "@/app/loading";


type PostType = {
    prompt: string;
    tags: string;
};


const page = ({ params }: any) => {
    const [post, setPost] = useState<PostType>({ prompt: "", tags: "" });
    const [submitting, setSubmitting] = useState<boolean>(false);
    const session = useSession();
    const router = useRouter();



    const [loading, setLoading] = useState(false)

    const editPropmt = async () => {
        try {
            setSubmitting(true);

            if (session.data && session.data.user?.email) {
                const response = await fetch(`/api/post/${params.id}`, {
                    method: "PATCH",
                    body: JSON.stringify({
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

    useEffect(() => {
        (async () => {
            setLoading(true)
            const posts = await fetch(`/api/post/${params.id}`, {
                method: "GET",

            })
            const postdata = await posts.json()

            setPost({
                prompt: postdata.prompt,
                tags: postdata.tags
            })

            setLoading(false)
        })()
    }, [])

    return (
        <>
            {
                loading && <Loading />
            }
            <Form
                type="Edit"
                post={post}
                setPost={setPost}
                submitting={submitting}
                handleSubmit={editPropmt}
            />
        </>
    )
}

export default page