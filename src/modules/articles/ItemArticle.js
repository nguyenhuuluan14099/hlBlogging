import PostCate from "modules/post/PostCate";
import PostImage from "modules/post/PostImage";
import PostTitle from "modules/post/PostTitle";
import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const ItemArticleStyled = styled.div`
  .category {
    color: ${(props) => props.theme.textPrimary};
  }
`;
const ItemArticle = ({ data }) => {
  if (!data) return;
  console.log(data);
  return (
    <ItemArticleStyled className="shadow-[rgba(50,_50,_93,_0.25)_0px_2px_5px_-1px,rgba(0,_0,_0,_0.3)_0px_1px_3px_-1px]  h-full min-h-[320px] rounded-lg flex flex-col ">
      <PostImage className="shrink-0" to="" src={data.image}></PostImage>
      <div className="p-4 flex-1 flex flex-col gap-y-3 bg-white rounded-b-lg">
        <PostCate to={data.category?.slug}>{data.category?.name}</PostCate>
        <PostTitle to={`/${data.slug}`}>{data.title}</PostTitle>
        <div className="flex items-center gap-x-2 text-xs text-slate-600">
          <Link
            to={`author/${data.user.username}`}
            className="authorName font-semibold cursor-pointer hover:text-orange-500 transition-all"
          >
            {data.user.fullname}
          </Link>
          <p className="time">
            {new Date(data.createAt?.seconds * 1000).toLocaleDateString(
              "vi-VI"
            )}
          </p>
        </div>
      </div>
    </ItemArticleStyled>
  );
};

export default ItemArticle;
