import React, { useContext, useEffect, useState } from 'react'
import { Icon } from "@iconify/react";
import TextInput from "../Components/Shared/TextInput";
import PasswordInput from "../Components/Shared/PasswordInput";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from 'formik';
import * as Yup from "yup";
import { makeUnauthenticatedPOSTRequest } from '../Utils/helper';
import { useCookies } from 'react-cookie';
import { alertContext, userContext } from '../App';
import LoginSignupLoader from '../Components/Shared/LoginSignupLoader';
import LoginSignupAlert from '../modal/LoginSignupAlert';


export default function LoginComponent() {

    const [cookie, setCookie] = useCookies(["token"]);
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const { setUser } = useContext(userContext)
    const { setAlert, setAlertMessage, LoginSignupalert,
        setLoginSignupAlertMessage, setLoginSignupalert
    } = useContext(alertContext)


    useEffect(() => {
        console.log(LoginSignupalert, "login")
    }, [LoginSignupalert])

    const LoginSchema = Yup.object().shape({
        emailOrusername: Yup.string().required("Please enter username or email"),
        password: Yup.string().min(8).required("You need to enter a password"),

    });

    const { values,
        isValid,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit } = useFormik({
            initialValues: { emailOrusername: '', password: '', },
            onSubmit: async (values) => {
                setLoading(true)
                const { emailOrusername, password } = values
                const data = { value: emailOrusername, password }
                const response = await makeUnauthenticatedPOSTRequest("/auth/login", data)

                if (response && !response.err) {
                    const userData = { firstName: response.firstName, lastName: response.lastName, email: response.email, username: response.username, year: response.year, month: response.month, day: response.day }
                    const token = response.token
                    const date = new Date()
                    date.setDate(date.getDate() + 30)
                    setCookie("token", token, { path: "/", expires: date })
                    console.log(userData, "userdata")
                    setLoading(false)
                    setUser(userData)
                    setAlertMessage("Login Success ✅")
                    setAlert(true)
                    navigate("/")
                }
                else if (response.err === "Invalid credentials!") {
                    setLoading(false)
                    setLoginSignupAlertMessage("Looks like account not exists 🤔")
                    setLoginSignupalert(true)
                }
                else if (response.err === "Invalid Password!") {
                    setLoading(false)
                    setLoginSignupAlertMessage("Wrong Password! ❌")
                    setLoginSignupalert(true)
                }


                else {
                    setLoading(false)
                    setLoginSignupAlertMessage("Login Failed, Please Try Again ❌")
                    setLoginSignupalert(true)
                }


            },
            validationSchema: LoginSchema
        })

    return (
        <div className="flex flex-col items-center w-full h-full">
            {loading && (
                <LoginSignupLoader
                />
            )}
            {LoginSignupalert && (
                <LoginSignupAlert
                />
            )}
            <div className="flex justify-center w-full p-5 border-b border-gray-300 border-solid logo">
                <Icon icon="logos:spotify" width="150" />
            </div>
            <div className="flex flex-col items-center justify-center w-[90%] py-10 md:w-1/3 inputRegion">
                <div className="mb-4 font-bold">
                    To continue, log in to Spotify.
                </div>
                <form onSubmit={handleSubmit}>
                    <TextInput
                        label="Email address or username"
                        placeholder="Email or username"
                        className="my-6"
                        name="emailOrusername"
                        type="=text"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.email}
                        touched={touched}
                        errors={errors}

                    />
                    <PasswordInput
                        label="Password"
                        placeholder="Password"
                        name="password"
                        type="password"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.password}
                        touched={touched}
                        errors={errors}


                    />

                    <div className="flex items-center justify-end w-full my-8 ">
                        <button type='submit' disabled={!isValid}
                            className="p-3 px-10 font-semibold bg-green-400 rounded-full hover:bg-green-700 disabled:bg-gray-600"

                        >
                            LOG IN
                        </button>
                    </div>
                </form>
                <div className="w-full border border-gray-300 border-solid"></div>
                <div className="my-6 text-sm font-semibold md:text-lg">
                    Don't have an account?
                </div>
                <div className="flex items-center justify-center w-full py-4 text-xs font-bold text-center text-gray-500 border border-gray-500 rounded-full md:text-lg">
                    <Link to="/signup">SIGN UP FOR SPOTIFY</Link>
                </div>
            </div>
        </div>
    )
}

