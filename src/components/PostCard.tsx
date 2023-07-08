"use client";

import { useSession } from "next-auth/react";
import Image from "next/image";
import { useParams, usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const PostCard = ({ post, handleSearch, handleDeletePost }: any) => {
  const [isCopied, setIsCopied] = useState(false);
  const router = useRouter();
  const session = useSession();
  const pathname = usePathname()

  const handleCopy = () => {
    navigator.clipboard.writeText(post.prompt);
    setIsCopied(true);
  };

  const redirectToProfile = () => {
    if (post.creator.email === session.data?.user?.email) {
      router.push("/profile");
    } else {
      router.push(`/profile/${post.creator._id}?name=${post.creator.username}`);
    }
  };


  useEffect(() => {
    const clearTimeoutId = setTimeout(() => {
      setIsCopied(false);
    }, 3000);
  }, [isCopied]);

  return (
    <div className="post-card flex-col glass-effect p-2 h-fit">
      <div className="post-header flex-between gap-2 ">
        <div
          className="flex-center gap-2 cursor-pointer"
          onClick={redirectToProfile}
        >
          <Image
            src={post.creator.image}
            alt={post.creator.username}
            width="30"
            height="30"
            className="rounded-full shadow-md"
          />
          <div>
            <h6 className="text-md font-semibold">{post.creator.username}</h6>
            <p className="text-sm text-gray-600 font-semibold">
              {post.creator.email}
            </p>
          </div>
        </div>
        <div className="bg-gray-300 p-1 rounded-full">
          {isCopied ? (
            <Image
              src="/assets/icons/tick.svg"
              width="20"
              height="20"
              alt="copy"
              className="cursor-pointer"
            />
          ) : (
            <Image
              src="/assets/icons/copy.svg"
              width="20"
              height="20"
              alt="copy"
              className="cursor-pointer"
              onClick={handleCopy}
            />
          )}
        </div>
      </div>
      <div className="post-body">
        <p className="font-satoshi text-md mt-3">{post.prompt}</p>
        <p
          className="font-inter text-sm text-blue-400"
          onClick={() => handleSearch(post.tags)}
        >
          {post.tags}
        </p>
      </div>
      {
        pathname === "/profile" && session.data?.user?.email === post.creator.email &&
        <div className="footer flex-end gap-2">
          <button className="text-sm text-green-700 font-semibold outline-none border-0" onClick={() => router.push(`/update-prompt/${post._id}`)}>Edit</button>
          <button className="text-sm text-red-700 font-semibold outline-none border-0" onClick={() => handleDeletePost(post._id)}>Delete</button>
        </div>
      }
    </div>
  );
};

export default PostCard;
