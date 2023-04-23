import { Button } from "components/button";
import IconDelete from "components/icons/IconDelete";
import IconEdit from "components/icons/IconEdit";
import LabelStatus from "components/label/LabelStatus";
import Table from "components/table/Table";
import { db } from "firebase-app/firebaseConfig";
import {
  collection,
  getDocs,
  limit,
  onSnapshot,
  query,
  startAfter,
  where,
} from "firebase/firestore";
import { debounce, last } from "lodash";
import React, { useEffect } from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { userRole, userStatus } from "utils/constants";

const UserManage = () => {
  const [userList, setUserList] = useState([]);
  const navigate = useNavigate();
  const [filter, setFilter] = useState("");
  const [total, setTotal] = useState(0);
  const [lastDoc, setLastDoc] = useState();
  const USER_PER_PAGE = 2;
  useEffect(() => {
    async function fetchDataUsers() {
      const colRef = collection(db, "users");
      const newRef = filter
        ? query(
            colRef,
            where("fullname", ">=", filter),
            where("fullname", "<=", filter + "utf8")
          )
        : query(colRef, limit(USER_PER_PAGE));
      onSnapshot(newRef, (snapshot) => {
        let result = [];
        snapshot.forEach((doc) => {
          result.push({
            id: doc.id,
            ...doc.data(),
          });
        });
        setUserList(result);
      });
      onSnapshot(colRef, (snapshot) => {
        setTotal(snapshot.size);
      });
      const documentDocRef = await getDocs(newRef);
      const lastVisible = documentDocRef.docs[documentDocRef.docs.length - 1];
      setLastDoc(lastVisible);
    }
    fetchDataUsers();
  }, [filter]);

  const handleSearchUser = debounce((e) => {
    setFilter(e.target.value);
  }, 500);
  const handleLoadMoreUsers = async () => {
    const colRef = collection(db, "users");
    const nextRef = query(
      colRef,
      startAfter(lastDoc || 0),
      limit(USER_PER_PAGE)
    );

    onSnapshot(nextRef, (snapshot) => {
      let result = [];
      snapshot.forEach((doc) => {
        result.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      setUserList([...userList, ...result]);
    });
    const documentDocRef = await getDocs(nextRef);
    const lastVisible = documentDocRef.docs[documentDocRef.docs.length - 1];
    setLastDoc(lastVisible);
  };
  return (
    <div>
      <p className="font-bold text-xl text-orange-500">User Manage</p>
      <p>Manage your Users</p>
      <div className="flex items-center justify-between mb-5">
        <div></div>
        <span>
          <Link to="/manage/add-user">
            <Button className="">Add New User</Button>
          </Link>
        </span>
      </div>
      <div className="flex items-center justify-between mb-5">
        <div></div>
        <div className="">
          <input
            onChange={handleSearchUser}
            type="text"
            placeholder="Search user..."
            className="p-3 rounded-lg border border-orange-200 outline-none focus:border-orange-500 transition-all"
          />
        </div>
      </div>
      <Table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Info</th>
            <th>UserName</th>
            <th>Email</th>
            <th>Status</th>
            <th>Role</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {userList.length > 0 &&
            userList.map((user) => (
              <tr key={user.id}>
                <td title={user.id}>{user.id.slice(0, 4) + "..."}</td>
                <td className="flex items-center justify-between gap-x-2 pl-3">
                  <img
                    src={user.avatar}
                    className="w-[50px] h-[50px] rounded-lg object-cover"
                    alt=""
                  />
                  <div className="flex flex-col gap-y-1">
                    <p className="font-semibold">{user.fullname}</p>
                    <p>
                      {new Date(
                        user?.createAt?.seconds * 1000
                      ).toLocaleDateString("vi-VI")}
                    </p>
                  </div>
                </td>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>
                  {Number(user.status) === userStatus.ACTIVE && (
                    <LabelStatus type="success">Active</LabelStatus>
                  )}
                  {Number(user.status) === userStatus.PENDING && (
                    <LabelStatus type="warning">Pending</LabelStatus>
                  )}
                  {Number(user.status) === userStatus.BAN && (
                    <LabelStatus type="danger">Ban</LabelStatus>
                  )}
                </td>
                <td>
                  {Number(user.role) === userRole.ADMIN && <p>ADMIN</p>}
                  {Number(user.role) === userRole.MOD && <p>MOD</p>}
                  {Number(user.role) === userRole.USER && <p>USER</p>}
                </td>
                <td className="flex items-center gap-x-2">
                  <IconEdit
                    onClick={() =>
                      navigate(`/manage/update-user?id=${user.id}`)
                    }
                  ></IconEdit>
                  <IconDelete></IconDelete>
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
      {total > userList.length && (
        <span className="flex mt-5">
          <Button onClick={handleLoadMoreUsers}>Load more</Button>
        </span>
      )}
    </div>
  );
};

export default UserManage;
