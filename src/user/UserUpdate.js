import { Button } from "components/button";
import ImageUpload from "components/image/ImageUpload";
import { Input } from "components/input";
import Field from "components/input/Field";
import InputPassword from "components/input/InputPassword";
import Label from "components/label/Label";
import GridBlock from "components/layout/GridBlock";
import Radio from "components/radio/Radio";
import TextArea from "components/textarea/TextArea";
import { db } from "firebase-app/firebaseConfig";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import useFirebaseImage from "hooks/useFirebaseImage";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import { userRole, userStatus } from "utils/constants";

const UserUpdate = () => {
  const {
    control,
    handleSubmit,
    watch,
    reset,
    setValue,
    getValues,
    formState: { isSubmitting, isValid },
  } = useForm({
    mode: "onChange",
  });
  const watchStatus = watch("status");
  const watchRole = watch("role");
  const [param] = useSearchParams();
  const userId = param.get("id");
  const imageUrlName = getValues("avatar");
  const imageRegex = /%2F(\S+)\?/gm.exec(imageUrlName);
  const imageName = imageRegex?.length > 0 ? imageRegex[1] : "";

  const { image, setImage, handleSelectImage, handleDeleteImage, progress } =
    useFirebaseImage(setValue, getValues, imageName, DeleteImage);
  const handleUpdateUser = async (values) => {
    if (!isValid) return;
    try {
      const docRef = doc(db, "users", userId);
      await updateDoc(docRef, {
        ...values,
        avatar: image,
      });
      toast.success("update user successfully");
    } catch (error) {
      console.log(error);
    }
  };
  async function DeleteImage() {
    const docRef = doc(db, "users", userId);
    await updateDoc(docRef, {
      avatar: "",
    });
  }
  useEffect(() => {
    setImage(imageUrlName);
  }, [setImage, imageUrlName]);
  useEffect(() => {
    async function fetchData() {
      if (!userId) return;
      const docRef = doc(db, "users", userId);
      const docData = await getDoc(docRef);
      if (docData.data()) {
        reset(docData.data());
      }
    }
    fetchData();
  }, [reset, userId]);

  if (!userId) return;
  return (
    <div>
      <p className="text-xl font-bold text-orange-500">Update user</p>
      <p>update your user</p>
      <form className="mt-10" onSubmit={handleSubmit(handleUpdateUser)}>
        <Field>
          <Label>Avatar</Label>
          <ImageUpload
            classNameForImg="w-[250px] h-[200px] object-cover rounded-full"
            image={image}
            className=" border-none"
            handleDeleteImage={handleDeleteImage}
            progress={progress}
            onChange={handleSelectImage}
          ></ImageUpload>
        </Field>

        <GridBlock>
          <Field>
            <Label>FullName</Label>
            <Input
              placeholder="enter your fullname"
              control={control}
              name="fullname"
            ></Input>
          </Field>
          <Field>
            <Label>UserName</Label>
            <Input
              placeholder="enter your username"
              control={control}
              name="username"
            ></Input>
          </Field>
        </GridBlock>
        <GridBlock>
          <Field>
            <Label>Email</Label>
            <Input
              placeholder="enter your email"
              control={control}
              name="email"
            ></Input>
          </Field>
          <Field>
            <Label>Password</Label>
            <InputPassword control={control}></InputPassword>
          </Field>
        </GridBlock>

        <GridBlock>
          <Field>
            <Label>Status</Label>
            <div className="flex items-center gap-x-3">
              <Radio
                checked={Number(watchStatus) === userStatus.ACTIVE}
                name="status"
                control={control}
                value={userStatus.ACTIVE}
              >
                Approved
              </Radio>
              <Radio
                checked={Number(watchStatus) === userStatus.PENDING}
                name="status"
                control={control}
                value={userStatus.PENDING}
              >
                Pending
              </Radio>
              <Radio
                checked={Number(watchStatus) === userStatus.BAN}
                name="status"
                control={control}
                value={userStatus.BAN}
              >
                Rejected
              </Radio>
            </div>
          </Field>
          <Field>
            <Label>Role</Label>
            <div className="flex items-center gap-x-3">
              <Radio
                checked={Number(watchRole) === userRole.ADMIN}
                name="role"
                control={control}
                value={userRole.ADMIN}
              >
                Admin
              </Radio>
              <Radio
                checked={Number(watchRole) === userRole.MOD}
                name="role"
                control={control}
                value={userRole.MOD}
              >
                Mod
              </Radio>
              <Radio
                checked={Number(watchRole) === userRole.USER}
                name="role"
                control={control}
                value={userRole.USER}
              >
                User
              </Radio>
            </div>
          </Field>
        </GridBlock>
        <GridBlock>
          <Field>
            <Label htmlFor="description">Description</Label>
            <TextArea control={control} name="description"></TextArea>
          </Field>
        </GridBlock>
        <span className="flex mb-5">
          <Button
            disabled={isSubmitting}
            isLoading={isSubmitting}
            type="submit"
          >
            Update User
          </Button>
        </span>
      </form>
    </div>
  );
};

export default UserUpdate;
