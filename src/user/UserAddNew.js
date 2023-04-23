import { Button } from "components/button";
import ImageUpload from "components/image/ImageUpload";
import { Input } from "components/input";
import Field from "components/input/Field";
import InputPassword from "components/input/InputPassword";
import Label from "components/label/Label";
import GridBlock from "components/layout/GridBlock";
import Radio from "components/radio/Radio";
import { auth, db } from "firebase-app/firebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import useFirebaseImage from "hooks/useFirebaseImage";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import slugify from "slugify";
import { userRole, userStatus } from "utils/constants";

const UserAddNew = () => {
  const {
    control,
    handleSubmit,
    setValue,
    getValues,
    watch,
    reset,
    formState: { isSubmitting, isValid },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      avatar: "",
      fullname: "",
      username: "",
      password: "",
      email: "",
      role: userRole.USER,
      status: userStatus.ACTIVE,
      createAt: new Date(),
    },
  });
  const watchStatus = watch("status");
  const watchRole = watch("role");
  const {
    image,
    handleDeleteImage,
    handleResetImage,
    progress,
    handleSelectImage,
  } = useFirebaseImage(setValue, getValues);

  const handleAddNewUser = async (values) => {
    if (!isValid) return;
    try {
      await createUserWithEmailAndPassword(auth, values.email, values.password);
      const colRef = collection(db, "users");
      await addDoc(colRef, {
        avatar: image,
        fullname: values.fullname,
        username: slugify(values.username, {
          lower: true,
          replacement: "",
          trim: true,
        }),
        password: values.password,
        email: values.email,
        role: Number(values.role),
        status: Number(values.status),
        createAt: serverTimestamp(),
      });
      toast.success("create user successfully!");
      reset({
        avatar: "",
        fullname: "",
        username: "",
        password: "",
        email: "",
        role: userRole.USER,
        status: userStatus.ACTIVE,
        createAt: new Date(),
      });
      handleResetImage();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <p className="font-bold text-xl text-orange-500">New User</p>
      <p>Add new user to system</p>

      <form className="mt-10" onSubmit={handleSubmit(handleAddNewUser)}>
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
        <span className="flex mb-5">
          <Button
            disabled={isSubmitting}
            isLoading={isSubmitting}
            type="submit"
          >
            Add New User
          </Button>
        </span>
      </form>
    </div>
  );
};

export default UserAddNew;
