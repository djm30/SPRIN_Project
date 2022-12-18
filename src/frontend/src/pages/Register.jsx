import React, { useState, useEffect } from "react";
import Navbar from "../components/UI/Navbar/Navbar";
import ContentContainer from "../components/UI/ContentContainer";
import Heading from "../components/UI/Heading";
import { useDispatch } from "react-redux";
import { registerUser } from "../reducers/userReducer";

const Register = () => {
  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confPassword, setConfPassword] = useState("");

  const [nameValidation, setNameValidation] = useState("");
  const [emailValidation, setEmailValidation] = useState("");
  const [passwordValidation, setPasswordValidation] = useState("");
  const [confPasswordValidation, setConfPasswordValidation] = useState("");

  useEffect(() => {
    if (email.length > 0) {
      // Validate the email
      let atPos = email.indexOf("@");
      if (atPos === undefined) {
        setEmailValidation("Your email must contain an @ symbol");
        return;
      }

      if (!email.includes(".", atPos)) {
        setEmailValidation("Your email must contain a . after the @ symbol");
        return;
      }

      setEmailValidation("");
    }
  }, [email]);

  useEffect(() => {
    if (name.length > 0) {
      if (!name.length > 0) {
        setNameValidation("Your username can't be blank");
      }
      setNameValidation("");
    }
  }, [name]);

  useEffect(() => {
    if (password.length > 0) {
      // Validate the password
      setPasswordValidation(
        password.length > 8
          ? ""
          : "Your password must be greater than 8 characters!"
      );
    }
  }, [password]);

  useEffect(() => {
    if (confPassword == password) {
      if (!confPassword.length > 0) {
        // Validate the password
        setPasswordValidation(
          "Your password must be greater than 8 characters!"
        );
        setConfPasswordValidation("");
      }
    }
  }, [confPassword]);

  const onSubmit = (e) => {
    e.preventDefault();
    if (
      emailValidation == "" &&
      passwordValidation == "" &&
      nameValidation == "" &&
      confPasswordValidation == ""
    ) {
      dispatch(registerUser({ name, email, password }));
    }
  };

  return (
    <div className="min-h-screen">
      <Navbar transparent={false} />
      <section className="w-full">
        <ContentContainer>
          <Heading>Register</Heading>
        </ContentContainer>
        <ContentContainer className="flex justify-center">
          <div className="mb-10 items-center sm:w-4/5 md:w-2/3 xl:w-3/6 lg:w-3/6 my-5 py-5">
            <form onSubmit={onSubmit}>
              {/* NAME */}
              <div className="flex flex-col gap-2 mx-2 pb-4">
                <label className="md:text-2xl text-darkblue-100">Name</label>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  type="text"
                  className="border-border-color border-2 h-8 md:h-12 rounded-lg px-2 py-4 focus:outline-none focus:border-skyblue-200"
                />
                {/* ERROR MESSAGE */}
                <span className="min-h-[6px] text-red-500">
                  {nameValidation}
                </span>
              </div>
              <div className="flex flex-col gap-2 mx-2 pb-4">
                <label className="md:text-2xl text-darkblue-100">Email</label>
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="Email"
                  className="border-border-color border-2 h-8 md:h-12 rounded-lg px-2 py-4 focus:outline-none focus:border-skyblue-200"
                />
                {/* ERROR MESSAGE */}
                <span className="min-h-[6px] text-red-500">
                  {emailValidation}
                </span>
              </div>
              {/* PASSWORD */}
              <div className="flex flex-col gap-2 mx-2 pb-4">
                <label className="md:text-2xl text-darkblue-100">
                  Password
                </label>
                <input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type="Password"
                  className="border-border-color border-2 h-8 md:h-12 rounded-lg px-2 py-4 focus:outline-none focus:border-skyblue-200"
                />
                {/* ERROR MESSAGE */}
                <span className="min-h-[6px] text-red-500">
                  {passwordValidation}
                </span>
              </div>
              {/* CONFIRM PASSWORD */}
              <div className="flex flex-col gap-2 mx-2 pb-4">
                <label className="md:text-2xl text-darkblue-100">
                  Confirm Password
                </label>
                <input
                  value={confPassword}
                  onChange={(e) => setConfPassword(e.target.value)}
                  type="Password"
                  className="border-border-color border-2 h-8 md:h-12 rounded-lg px-2 py-4 focus:outline-none focus:border-skyblue-200"
                />
                {/* ERROR MESSAGE */}
                <span className="min-h-[6px] text-red-500">
                  {confPasswordValidation}
                </span>
              </div>
              <div className="flex justify-center">
                <button className="bg-darkblue-100 text-white w-1/3 px-4 py-2 rounded-lg hover:bg-skyblue-200 transition-all">
                  Login
                </button>
              </div>
            </form>
          </div>
        </ContentContainer>
        {/* POST A RESOURCE BUTTON HERE */}
      </section>
    </div>
  );
};

export default Register;
