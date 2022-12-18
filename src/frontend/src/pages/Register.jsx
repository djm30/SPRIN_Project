import React, { useState, useEffect } from "react";
import Navbar from "../components/UI/Navbar/Navbar";
import ContentContainer from "../components/UI/ContentContainer";
import Heading from "../components/UI/Heading";
import { useDispatch } from "react-redux";
import { registerUser } from "../reducers/userReducer";

// The useDispatch allows the Register component to dispatch the components.
const Register = () => {
  const dispatch = useDispatch();

  // The useState hooks store the email, password, confPassword, emailValidation, confPasswordValidation and passwordValidation in the component's state.
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confPassword, setConfPassword] = useState("");

  const [nameValidation, setNameValidation] = useState("");
  const [emailValidation, setEmailValidation] = useState("");
  const [passwordValidation, setPasswordValidation] = useState("");
  const [confPasswordValidation, setConfPasswordValidation] = useState("");

  // This code uses the useEffect hook to check the length of the email string and validate its contents. If the length of the email string is greater than 0, the code checks
  // if an "@" symbol is present and if there is a "." after the "@" symbol. If either of these conditions are not met, an error message is set in the emailValidation state. If
  // both conditions are met, the emailValidation state is set to an empty string.
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

  // This code uses the React Hook useEffect to check if the length of the "name" input is greater than 0. If it is, it sets the nameValidation to an empty string,
  // indicating that the input is valid. If the name input is blank, it sets the nameValidation to a string saying "Your username can't be blank".
  useEffect(() => {
    if (name.length > 0) {
      if (!name.length > 0) {
        setNameValidation("Your username can't be blank");
      }
      setNameValidation("");
    }
  }, [name]);

  // This code uses the useEffect hook to set a validation check for a password field. If the length of the password is greater than 0, it will set the password validation
  // to an empty string if the password is greater than 8 characters, or a message if it is not. The useEffect hook will re-run whenever the value of the password field changes.
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

  // This code is used to validate that both the password and confirmation password fields are the same. If they are not, the function will set a validation message to let
  // the user know that both passwords must match. If the length of the confirmation password is greater than 0, the function will set the confirmation password validation message
  // to an empty string.
  useEffect(() => {
    if (confPassword == password) {
      if (!confPassword.length > 0) {
        // Validate the password
        setConfPasswordValidation(
          "Your password must be greater than 8 characters!"
        );
        setConfPasswordValidation("");
      }
    } else setConfPasswordValidation("Both passwords must match");
  }, [confPassword]);

  // This code is a function that runs when the form below is submitted. It prevents the default action of the form from happening and checks for any validation errors. If there are
  // no validation errors, it will dispatch the registerUser action with the entered name, email, and password.
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

  // This html code draws the register page with page name, labelled text boxes and a register button. Each textbox contains the validation coded above and on submit, all the info
  // in the form is sent to the dispatch method
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
                  Register
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
