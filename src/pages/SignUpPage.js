import { Button } from "components/button";
import { Input } from "components/input";
import Field from "components/input/Field";
import InputPassword from "components/input/InputPassword";
import Label from "components/label/Label";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { toast } from "react-toastify";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db } from "firebase-app/firebaseConfig";
import { collection, doc, serverTimestamp, setDoc } from "firebase/firestore";
import slugify from "slugify";
import { userRole, userStatus } from "utils/constants";

const schema = yup.object({
  fullname: yup.string().required("please enter your full name"),
  email: yup.string().email().required("please enter your email"),
  password: yup
    .string()
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      {
        message:
          "minimum eight character, at least one uppercase character, at least one lowercase character, one number and one special character",
      }
    )
    .required("please enter your password"),
});
const SignUpPage = () => {
  const navigate = useNavigate();
  const {
    control,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(schema),
  });
  const handleSignUp = async (values) => {
    if (!isValid) return;
    try {
      await createUserWithEmailAndPassword(auth, values.email, values.password);
      updateProfile(auth.currentUser, {
        displayName: values.fullname,
      });
      const colRef = collection(db, "users");
      await setDoc(doc(colRef, auth.currentUser.uid), {
        fullname: values.fullname,
        email: values.email,
        password: values.password,
        username: slugify(values.fullname, { lower: true }),
        avatar:
          "https://images.unsplash.com/photo-1584797079913-f5408e4a5fcf?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8dXNlcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60",
        status: userStatus.ACTIVE,
        role: userRole.USER,
        createAt: serverTimestamp(),
      });
      toast.success("create account successfully!", {
        pauseOnHover: false,
      });
      navigate("/");
    } catch (error) {
      toast.error("auth/email already in use");
    }
  };
  useEffect(() => {
    const arrErr = Object.values(errors);
    if (arrErr.length > 0) {
      toast.error(arrErr[0]?.message, {
        pauseOnHover: false,
        delay: 0,
      });
    }
  }, [errors]);
  useEffect(() => {
    document.title = "Register";
  }, []);
  return (
    <div className="w-full flex  gap-y-2  ">
      <div className="m-auto flex flex-col gap-y-5  mt-10 w-full max-w-[600px]">
        <div className="text-center flex flex-col gap-y-2 items-center">
          <img
            src="./homeLogo.png"
            alt=""
            className="w-[150px] h-[150px] object-cover"
          />
          <p className="font-semibold text-2xl text-orange-500">HLBlogging</p>
        </div>
        <form className="form" onSubmit={handleSubmit(handleSignUp)}>
          <Field>
            <Label htmlFor="fullName">fullName</Label>
            <Input
              id="fullName"
              name="fullname"
              placeholder="please enter your fullName"
              type="text"
              control={control}
            ></Input>
          </Field>
          <Field>
            <Label htmlFor="email">Email</Label>
            <Input
              name="email"
              id="email"
              placeholder="please enter your email"
              control={control}
              type="email"
            ></Input>
          </Field>

          <Field>
            <Label htmlFor="password">password</Label>
            <InputPassword control={control}></InputPassword>
          </Field>
          <div className="flex items-center gap-x-2 my-3">
            <p>do you have an account</p>
            <Link
              to="/sign-in"
              className="font-semibold text-orange-500 text-lg"
            >
              Login
            </Link>
          </div>
          <span className="flex">
            <Button
              isLoading={isSubmitting}
              disabled={isSubmitting}
              type="submit"
              className="w-[200px] mx-auto"
            >
              Sign Up
            </Button>
          </span>
        </form>
      </div>
    </div>
  );
};

export default SignUpPage;
