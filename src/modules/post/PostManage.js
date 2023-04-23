import IconEdit from "components/icons/IconEdit";
import IconView from "components/icons/IconView";
import IconDelete from "components/icons/IconDelete";
import Table from "components/table/Table";
import React, { useEffect, useState } from "react";
import LabelStatus from "components/label/LabelStatus";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  limit,
  onSnapshot,
  query,
  startAfter,
  where,
} from "firebase/firestore";
import { db } from "firebase-app/firebaseConfig";
import { postStatus } from "utils/constants";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { debounce } from "lodash";
import { Button } from "components/button";

const PostManage = () => {
  const POST_PER_PAGE = 5;
  const navigate = useNavigate();
  const [postList, setPostList] = useState([]);
  const [total, setTotal] = useState(0);
  const [filter, setFilter] = useState("");
  const [lastDoc, setLastDoc] = useState();

  useEffect(() => {
    async function fetchDataPost() {
      const colRef = collection(db, "posts");
      const newRef = filter
        ? query(
            colRef,
            where("title", ">=", filter),
            where("title", "<=", filter + "utf8")
          )
        : query(colRef, limit(POST_PER_PAGE));
      const documentDocRef = await getDocs(newRef);
      const lastVisible = documentDocRef.docs[documentDocRef.docs.length - 1];

      onSnapshot(colRef, (snapshot) => {
        setTotal(snapshot.size);
      });
      onSnapshot(newRef, (snapshot) => {
        const result = [];
        snapshot.forEach((doc) => {
          result.push({
            id: doc.id,
            ...doc.data(),
          });
        });
        setPostList(result);
      });
      setLastDoc(lastVisible);
    }
    fetchDataPost();
  }, [filter]);
  const handleDeletePost = (postId) => {
    const docRef = doc(db, "posts", postId);
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await deleteDoc(docRef);
        Swal.fire("Deleted!", "Your file has been deleted.", "success");
      }
    });
  };

  const handleSearchPost = debounce((e) => {
    setFilter(e.target.value);
  }, 500);
  const handleLoadMorePosts = async () => {
    const colRef = collection(db, "posts");
    const nextRef = query(
      colRef,
      startAfter(lastDoc || 0),
      limit(POST_PER_PAGE)
    );

    onSnapshot(nextRef, (snapshot) => {
      let result = [];
      snapshot.forEach((doc) => {
        result.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      setPostList([...postList, ...result]);
    });
    const documentDocRef = await getDocs(nextRef);
    const lastVisible = documentDocRef.docs[documentDocRef.docs.length - 1];
    setLastDoc(lastVisible);
  };
  return (
    <div>
      <p className="text-2xl font-bold text-orange-500">Posts Manage</p>
      <p>Manage your posts</p>

      <div className="flex items-center justify-between my-10">
        <div></div>
        <div>
          <input
            onChange={handleSearchPost}
            type="text"
            placeholder="Search post..."
            className="p-3 rounded-lg border border-orange-200 outline-orange-200 w-full max-w-[450px] focus:outline-orange-500 focus:border-orange-500 transition-all"
          />
        </div>
      </div>
      <Table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Post</th>
            <th>Category</th>
            <th>Author</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {postList.length > 0 &&
            postList.map((post) => (
              <tr key={post.id}>
                <td title={post.id}>{post.id.slice(0, 4) + "..."}</td>
                <td className="flex items-center gap-x-2">
                  <img
                    src={post.image}
                    alt=""
                    className="shrink-0 w-[50px] h-[40px] object-cover rounded-lg"
                  />
                  <div className="flex-1 marker:flex flex-col gap-y-2">
                    <p title={post.title} className="font-semibold text-lg">
                      {post.title.slice(0, 20) + "..."}
                    </p>
                    <p className="text-slate-500 text-xs">
                      {new Date(
                        post?.createAt?.seconds * 1000
                      ).toLocaleDateString("vi-VI")}
                    </p>
                  </div>
                </td>
                <td>{post?.category?.name}</td>
                <td>{post?.user?.fullname}</td>
                <td>
                  {post.status === postStatus.APPROVED && (
                    <LabelStatus type="success">Approved</LabelStatus>
                  )}
                  {post.status === postStatus.PENDING && (
                    <LabelStatus type="warning">Pending</LabelStatus>
                  )}
                  {post.status === postStatus.REJECTED && (
                    <LabelStatus type="danger">Rejeced</LabelStatus>
                  )}
                </td>
                <td className="flex items-center gap-x-2">
                  <IconView
                    onClick={() => navigate(`/${post.slug}`)}
                  ></IconView>
                  <IconEdit
                    onClick={() =>
                      navigate(`/manage/update-post?id=${post.id}`)
                    }
                  ></IconEdit>
                  <IconDelete
                    onClick={() => handleDeletePost(post.id)}
                  ></IconDelete>
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
      {total > postList.length && (
        <span className="mt-5 flex">
          <Button className="mx-auto" onClick={handleLoadMorePosts}>
            Load more
          </Button>
        </span>
      )}
    </div>
  );
};

export default PostManage;
