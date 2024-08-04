'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { createClient } from '@/supabase/client';
import { Post, User } from '@/types';
import Defaultimg from '@/assets/image/defaultimg.png';
import KebabMenu from '@/components/common/KebabMenu';

const PostingDetailPost = ({ params }: { params: { id: string } }) => {
  const { id } = params;
  const supabase = createClient();
  const [post, setPost] = useState<Post | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [userPurpose, setUserPurpose] = useState<string | null>(null);
  const postDate = new Date(post?.created_at as string);
  const postYear = String(postDate.getFullYear()).slice(-2);
  const postMonth = String(postDate.getMonth() + 1).padStart(2, '0');
  const postDay = String(postDate.getDate()).padStart(2, '0');
  const dateOnly = `${postYear}.${postMonth}.${postDay}`;
  const defaultImageUrl = Defaultimg;

  const getPost = async () => {
    const { data: getPost, error } = await supabase.from('posts').select('*').eq('id', id).single();

    if (error) {
      console.log('error', error);
      return;
    }
    setPost(getPost);
  };

  const getUser = async (userId: string) => {
    const { data: getUser, error } = await supabase.from('users').select('*').eq('user_id', userId).single();

    if (error) {
      console.log('error', error);
    } else {
      setUser(getUser);
    }
  };

  const getPurpose = async () => {
    if (user?.user_id) {
      const { data, error: infoError } = await supabase
        .from('information')
        .select('purpose')
        .eq('user_id', user.user_id as string)
        .single();

      if (infoError) {
        console.error('Error fetching data:', infoError);
      }
      const purpose = data?.purpose;
      setUserPurpose(purpose as string);
    }
  };

  useEffect(() => {
    getPost();
  }, []);

  useEffect(() => {
    if (post?.user_id) {
      getUser(post.user_id);
    }
  }, [post]);

  useEffect(() => {
    getPurpose();
  }, [user]);

  return (
    <>
      <div className="w-[800px] mx-auto">
        <span className="text-primary600 border-primary500 border border-solid py-1 px-2 mb-3 rounded bg-white">
          {post?.category}
        </span>
        <div className="flex justify-between">
          <p className="text-gray900 font-semibold mt-2">{post?.title}</p>
          <i>
            <KebabMenu params={params} />
          </i>
        </div>
        <p className="text-gray600 text-sm pb-4 border-b border-gray200 border-solid">{dateOnly}</p>
        <Image
          src={post?.image_url[0] as string}
          alt=""
          width={580}
          height={380}
          className="object-cover mt-6 rounded !w-[580px] !h-[380px]"
        />
        {post?.image_url[1] ? (
          <Image
            src={post?.image_url[1] as string}
            alt=""
            width={580}
            height={380}
            className="object-cover mt-6 rounded !w-[580px] !h-[380px]"
          />
        ) : null}
        {post?.image_url[2] ? (
          <Image
            src={post?.image_url[2] as string}
            alt=""
            width={580}
            height={380}
            className="object-cover mt-6 rounded !w-[580px] !h-[380px]"
          />
        ) : null}
        <p className="mt-6">{post?.content}</p>

        <div className="inline-flex border border-gray100 border-solid rounded-2xl pl-3 py-6 pr-6 mt-10 bg-gray-50">
          <Image
            src={user?.profile_url ? (user?.profile_url as string) : defaultImageUrl}
            alt=""
            width={40}
            height={40}
            className="rounded-xl"
          />
          <div className="flex flex-col ml-3 text-gray900">
            <p className="text-sm mb-1">{user?.nickname}</p>
            <span className="text-xs text-backgroundInfo">{userPurpose}</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default PostingDetailPost;
