import { ReactElement } from "react";
import AuthLayout from "@/layouts/AuthLayout";
import LoginForm from "@/components/forms/LoginForm/LoginForm";


const Login = () => {
  return (
    <>
      <LoginForm />
    </>
  );
};

Login.getLayout = function getLayout(login: ReactElement) {
  return <AuthLayout>{login}</AuthLayout>;
};

export default Login;