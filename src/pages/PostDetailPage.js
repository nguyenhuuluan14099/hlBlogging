import IconEyeOpen from "components/icons/IconEyeOpen";
import { db } from "firebase-app/firebaseConfig";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import ItemArticle from "modules/articles/ItemArticle";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import parse from "html-react-parser";
import HomeList from "modules/home/HomeList";
import PostRelated from "modules/post/PostRelated";

const StyledDetail = styled.div``;
const PostDetailPage = () => {
  const { slug } = useParams();
  const [postDetail, setPostDetail] = useState([]);
  useEffect(() => {
    if (!slug) return;
    async function fetchPostDetail() {
      const colRef = collection(db, "posts");
      const docRef = query(colRef, where("slug", "==", slug));
      onSnapshot(docRef, (onSnapshot) => {
        onSnapshot.forEach((doc) => {
          doc.data() &&
            setPostDetail({
              id: doc.id,
              ...doc.data(),
            });
        });
      });
    }
    fetchPostDetail();
  }, [slug]);
  const { user } = postDetail;

  return (
    <>
      <StyledDetail className="container ">
        <>
          <div className="grid grid-cols-2 gap-x-5 pt-10 min-h-[500px] mb-10">
            <img
              src={postDetail.image}
              alt=""
              className="h-[450px] w-full object-cover rounded-lg"
            />
            <div className="flex flex-col gap-y-3 mt-5">
              <span className="text-xs font-semibold bg-orange-300 p-3 rounded-lg  text-white   cursor-pointer inline-block text-center w-full max-w-[200px]">
                {postDetail?.category?.name}
              </span>
              <p className="text-2xl  font-bold  cursor-pointer">
                {postDetail.title}
              </p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-x-2">
                  <p className="text-lg">
                    {new Date(
                      postDetail?.createAt?.seconds * 1000
                    ).toLocaleDateString("vi-VI")}
                  </p>
                  <p className="w-[4px] h-[4px] rounded-full bg-slate-400"></p>
                  <p className="font-semibold hover:text-orange-500 transition-all text-slate-500 text-lg cursor-pointer">
                    {user?.fullname}
                  </p>
                </div>
                <div className="flex items-center gap-x-2">
                  <IconEyeOpen></IconEyeOpen>
                  <p>1200</p>
                </div>
              </div>
            </div>
          </div>
          <div className="content w-full max-w-[1000px] m-auto flex flex-col gap-y-3 leading-8 text-[17px] tracking-wide mb-10 entry-content">
            {parse(postDetail?.content || "")}
          </div>

          <div className="flex items-center gap-x-5  rounded-xl w-full max-w-[800px] mx-auto h-[220px] shadow-[rgba(50,_50,_93,_0.25)_0px_2px_5px_-1px,rgba(0,_0,_0,_0.3)_0px_1px_3px_-1px] bg-white mb-10 p-2">
            <div className="flex w-[200px]  shrink-0 p-2">
              <img
                src={user?.avatar}
                className="m-auto w-[190px]  h-[190px] object-cover rounded-xl "
                alt=""
              />
            </div>
            <div className="flex flex-col gap-y-1 m-auto flex-1">
              <p className="text-orange-400 text-xl font-semibold">
                {user?.fullname}
              </p>
              <p className="text-slate-500 text-[15px] description-user">
                {user?.description ||
                  "Lorem ipsum dolor sit, amet consectetur adipisicing elit. A, porro numquam facilis fugit neque laudantium! Facere rem cumque fuga dicta, rerum repellat eius et laudantium. Animi dignissimos totam commodi ipsum?"}
              </p>
            </div>
          </div>
        </>

        <div className="my-3">
          <p className="w-[60px] h-[4px] bg-orange-500 rouned-lg my-3"></p>
          <p className="text-xl text-orange-500 font-semibold">Post Related</p>
        </div>
        <div className="">
          <PostRelated categoryId={postDetail.categoryId}></PostRelated>
        </div>
      </StyledDetail>
    </>
  );
};

export default PostDetailPage;
