import React, { useState, useEffect } from "react";
import Navbar from "../components/UI/Navbar/Navbar";
import ContentContainer from "../components/UI/ContentContainer";
import Heading from "../components/UI/Heading";
import { useDispatch } from "react-redux";
import { submitLogin } from "../reducers/authReducer";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector((state) => state.auth);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [emailValidation, setEmailValidation] = useState("");
    const [passwordValidation, setPasswordValidation] = useState("");

    useEffect(() => {
        if (email.length > 0) {
            // Validate the email
            let atPos = email.indexOf("@");
            if (atPos === undefined) {
                setEmailValidation("Your email must contain an @ symbol");
                return;
            }

            if (!email.includes(".", atPos)) {
                setEmailValidation(
                    "Your email must contain a . after the @ symbol",
                );
                return;
            }

            setEmailValidation("");
        }
    }, [email]);

    useEffect(() => {
        if (password.length > 0) {
            // Validate the password
            setPasswordValidation(
                password.length > 8
                    ? ""
                    : "Your password must be greater than 8 characters!",
            );
        }
    }, [password]);

    useEffect(() => {
        if (user) {
            navigate("/home");
        }
    }, [user]);

    const onSubmit = (e) => {
        e.preventDefault();

        // As long as email and password are valid
        if (emailValidation == "" && passwordValidation == "") {
            // Dispatch login request
            dispatch(submitLogin(email, password));
        }
    };

    return (
        <div className="min-h-screen">
            <Navbar transparent={false} />
            <section className="w-full">
                <ContentContainer>
                    <Heading>Login</Heading>
                </ContentContainer>
                <ContentContainer className="flex justify-center">
                    <div className="mb-10 items-center sm:w-4/5 md:w-2/3 xl:w-3/6 lg:w-3/6 my-5 py-5">
                        <form onSubmit={onSubmit}>
                            {/* EMAIL */}
                            <div className="flex flex-col gap-2 mx-2 pb-4">
                                <label className="md:text-2xl text-darkblue-100">
                                    Email
                                </label>
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
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                    type="Password"
                                    className="border-border-color border-2 h-8 md:h-12 rounded-lg px-2 py-4 focus:outline-none focus:border-skyblue-200"
                                />
                                {/* ERROR MESSAGE */}
                                <span className="min-h-[6px] text-red-500">
                                    {passwordValidation}
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

export default Login;
