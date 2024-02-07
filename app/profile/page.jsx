'use client';
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Profile from "@components/Profile";

const page = () => {
    const { data: session } = useSession();
    const [posts, setPosts] = useState([]);
    const handleEdit = (id) => {
    }
    const handleDelete = (id) => {
    }
    useEffect(() => {
        const fetchData = async () => {
          const response = await fetch(`/api/users/${session?.user.id}/posts`);
          const data = await response.json();
          setPosts(data);
        };
        if(session?.user.id) fetchData();
      }, [session?.user.id]);
  return (
    <Profile 
    name ="My Profile"
    desc = "This is your profile"
    data ={posts}
    handleDelete = {handleDelete}
    handleEdit = {handleEdit}
    />
  )
}

export default page