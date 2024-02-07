"use client";
import { useState } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";

const PromptCard = ({ post, handleTagClick, handleEdit, handleDelete }) => {
  const { data: session } = useSession();
  const { pathname } = usePathname();
  const router = useRouter();
  const [copy, setCopy] = useState("");
  const handleCopy = () => {
    setCopy(post.prompt);
    navigator.clipboard.writeText(post.prompt);
    setTimeout(() => {
      setCopy("");
    }, 3000);
  };
  return (
    <div className="prompt_card">
      <div className="flex item-start gap-5 justify-between">
        <div className="flex-1 items-center cursor-pointer gap-3 flex justify-center">
          <Image
            src={post.creator.image}
            alt="profile picture"
            width={40}
            height={40}
            className="rounded-full object-contain"
          />
          <div className="flex flex-col ">
            <h3 className="font-satoshi font-semibold text-gray-900">
              {post.creator.name}
            </h3>
            <p className="text-gray-500 font-inter text-sm">
              {post.creator.email}
            </p>
          </div>
        </div>

        <div className="copy_btn" onClick={handleCopy}>
          <Image
            src={
              copy === post.prompt
                ? "/assets/icons/tick.svg"
                : "/assets/icons/copy.svg"
            }
            alt="copy"
            width={13}
            height={13}
          />
        </div>
      </div>
      <p className="text-gray-700 font-satoshi text-sm my-4">{post.prompt}</p>
      <p
        className="font-inter text-sm cursor-pointer blue_gradient"
        onClick={() => handleTagClick && handleTagClick(post.tag)}
      >
        {post.tag}
      </p>
      {session?.user.id === post.creator._id && pathname === "/profile" && (
        <div className="flex-center gap-4 border-t border-gray-100 pt-3 mt-5">
          <p
            classname="font-inter text-sm green_gradient cursor-pointer"
            onClick={handleEdit}
          >
            Edit
          </p>
          <p
            classname="font-inter text-sm orange_gradient cursor-pointer"
            onClick={handleDelete}
          >
            Delete
          </p>
        </div>
      )}
    </div>
  );
};

export default PromptCard;
