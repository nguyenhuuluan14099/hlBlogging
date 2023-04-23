import { Button } from "components/button";
import IconDelete from "components/icons/IconDelete";
import IconEdit from "components/icons/IconEdit";
import IconView from "components/icons/IconView";
import Label from "components/label/Label";
import LabelStatus from "components/label/LabelStatus";
import Table from "components/table/Table";
import { db } from "firebase-app/firebaseConfig";
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
import { debounce } from "lodash";
import React, { useState } from "react";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { categoryStatus } from "utils/constants";

const CategoryManage = () => {
  const CAT_PER_PAGE = 1;
  const navigate = useNavigate();
  const [filter, setFilter] = useState("");
  const [categories, setCategories] = useState([]);
  const [lastDoc, setLastDoc] = useState();
  const [total, setTotal] = useState(0);
  useEffect(() => {
    async function fetchDataCat() {
      const colRef = collection(db, "categories");
      const newRef = filter
        ? query(
            colRef,
            where("name", ">=", filter),
            where("name", "<=", filter + "utf8")
          )
        : query(colRef, limit(CAT_PER_PAGE));

      const documentDocRef = await getDocs(newRef);
      const lastVisible = documentDocRef.docs[documentDocRef.docs.length - 1];
      onSnapshot(colRef, (snapshot) => {
        setTotal(snapshot.size);
      });
      onSnapshot(newRef, (snapshot) => {
        let result = [];
        snapshot.forEach((doc) => {
          result.push({
            id: doc.id,
            ...doc.data(),
          });
          setCategories(result);
        });
      });
      setLastDoc(lastVisible);
    }
    fetchDataCat();
  }, [filter]);
  const handleSearchCategory = debounce((e) => {
    setFilter(e.target.value);
  }, 500);
  const handleLoadMoreCats = async () => {
    const colRef = collection(db, "categories");
    const nextRef = query(
      colRef,
      startAfter(lastDoc || 0),
      limit(CAT_PER_PAGE)
    );

    onSnapshot(nextRef, (snapshot) => {
      let result = [];
      snapshot.forEach((doc) => {
        result.push({
          id: doc.id,
          ...doc.data(),
        });
        setCategories([...categories, ...result]);
      });
    });
    const documentDocRef = await getDocs(nextRef);
    const lastVisible = documentDocRef.docs[documentDocRef.docs.length - 1];
    setLastDoc(lastVisible);
  };
  const handleDeleteCate = (cateId) => {
    const docRef = doc(db, "categories", cateId);
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
  return (
    <div>
      <p className="text-2xl font-bold text-orange-500">Category</p>
      <p>Manage your category</p>

      <div className="flex items-center justify-between mb-10">
        <div></div>
        <Link to="/manage/add-category">
          <Button>Add new category</Button>
        </Link>
      </div>
      <div className="flex items-center justify-between">
        <div></div>
        <div>
          <input
            onChange={handleSearchCategory}
            type="text"
            placeholder="Search category..."
            className="p-3 rounded-lg border mb-5 border-orange-200 outline-none focus:border-orange-500 transition-all"
          />
        </div>
      </div>
      <Table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Slug</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {categories.length > 0 &&
            categories.map((item) => (
              <tr key={item.id}>
                <td title={item.id}>{item.id.slice(0, 3) + "..."}</td>
                <td className="font-semibold">{item.name}</td>
                <td className="italic text-slate-400">{item.slug}</td>
                <td>
                  {categoryStatus.APPROVED === item.status && (
                    <LabelStatus type="success">Approved</LabelStatus>
                  )}
                  {categoryStatus.UNAPPROVED === item.status && (
                    <LabelStatus type="warning">UnApproved</LabelStatus>
                  )}
                </td>
                <td className="flex items-center gap-x-2">
                  <IconEdit
                    onClick={() =>
                      navigate(`/manage/update-category?id=${item.id}`)
                    }
                  ></IconEdit>
                  <IconDelete
                    onClick={() => handleDeleteCate(item.id)}
                  ></IconDelete>
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
      {total > categories.length && (
        <span className="flex mt-5">
          <Button onClick={handleLoadMoreCats} className="mx-auto">
            Load more
          </Button>
        </span>
      )}
    </div>
  );
};

export default CategoryManage;
