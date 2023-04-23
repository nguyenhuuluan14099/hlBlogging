import { yupResolver } from "@hookform/resolvers/yup";
import { Button } from "components/button";
import { Input } from "components/input";
import Field from "components/input/Field";
import InputPassword from "components/input/InputPassword";
import Label from "components/label/Label";
import { useAuth } from "context/Auth-context";
import { auth } from "firebase-app/firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";
import React from "react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import * as yup from "yup";

const schema = yup.object({
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
const SignInPage = () => {
  const { userInfo } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    if (userInfo?.email) navigate("/");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const {
    control,
    handleSubmit,
    formState: { isValid, isSubmitting, errors },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(schema),
  });
  const handleSignIn = async (values) => {
    if (!isValid) return;
    try {
      await signInWithEmailAndPassword(auth, values.email, values.password);
      navigate("/");
    } catch (error) {
      toast.error("email or password is not correct");
    }
  };
  useEffect(() => {
    document.title = "Login";
    const arrErr = Object.values(errors);
    if (arrErr.length > 0) {
      toast.error(arrErr[0].message, {
        pauseOnHover: false,
        delay: 0,
      });
    }
  }, [errors]);

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
        <form onSubmit={handleSubmit(handleSignIn)}>
          <Field>
            <Label htmlFor="email">Email</Label>
            <Input
              id="Email"
              type="email"
              placeholder="enter your email"
              control={control}
              name="email"
            ></Input>
          </Field>
          <Field>
            <Label htmlFor="password">Password</Label>
            <InputPassword control={control}></InputPassword>
          </Field>
          <div className="flex items-center gap-x-3 my-3">
            <p>do you have an account ? </p>
            <Link
              to="/sign-up"
              className="font-semibold text-orange-500 text-lg"
            >
              Register
            </Link>
          </div>
          <span className="flex">
            <Button
              className="m-auto px-10"
              type="submit"
              isLoading={isSubmitting}
            >
              Sign in
            </Button>
          </span>
        </form>
      </div>
    </div>
  );
};

export default SignInPage;
