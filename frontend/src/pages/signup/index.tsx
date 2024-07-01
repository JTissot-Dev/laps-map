import { ReactElement } from "react";
import AuthLayout from "@/layouts/AuthLayout";
import SignupForm from "@/components/forms/SignupForm/SignupForm";


const Signup = () => {
  return (
    <>
      <SignupForm />
    </>
  );
};

Signup.getLayout = function getLayout(signup: ReactElement) {
  return <AuthLayout>{signup}</AuthLayout>;
};

export default Signup;