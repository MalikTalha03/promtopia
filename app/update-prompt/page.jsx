"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import Form from "@components/Form";

const EditPrompt = () => {
  const router = useRouter();
    const searchParams = useSearchParams();
    const promptID = searchParams.get("id");
  const [submitting, setIsSubmitting] = useState(false);
  const [post, setPost] = useState({ prompt: "", tag: "" });

  useEffect(() => {
    const getDetails = async () => {
        const response = await fetch(`/api/prompt/${promptID}`);
        const data = await response.json();
        setPost({ prompt: data.prompt, tag: data.tag });
    }
    if (promptID) getDetails();
    }, [promptID]);

  const editPrompt = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    if (!promptID) alert("Prompt not found");

    try {
      const response = await fetch(`/api/prompt/${promptID}`, {
        method: "PATCH",
        body: JSON.stringify({
          prompt: post.prompt,
          tag: post.tag,
        }),
      });

      if (response.ok) {
        router.push("/");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form
      type='Edit'
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={editPrompt}
    />
  );
};

export default EditPrompt;