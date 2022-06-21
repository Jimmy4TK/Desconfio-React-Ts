import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import DangerLabel from "../common/components/DangerLabel"
import Form from "../common/components/Form"
import FormAcceptButton from "../common/components/FormAcceptButton"
import FormButton from "../common/components/FormButton"
import FormButtonBar from "../common/components/FormButtonBar"
import FormInput from "../common/components/FormInput"
import FormPassword from "../common/components/FormPassword"
import FormTitle from "../common/components/FormTitle"
import GlobalContent from "../common/components/GlobalContent"
import { useErrorHandler } from "../common/utils/ErrorHandler"
import { login } from "./userService"

export default function Login() {
    const history = useNavigate()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const errorHandler = useErrorHandler()

    const loginClick = async () => {
        errorHandler.cleanRestValidations()
        if (!email) {
            errorHandler.addError("email", "No puede estar vacío")
        }
        if (!password) {
            errorHandler.addError("password", "No puede estar vacío")
        }
        if (errorHandler.hasErrors()) {
            return
        }

        try {
            await login({
                email: email,
                password
            })
            history('/')
        } catch (error) {
            errorHandler.processRestValidations(error)
        }
    }

    return (
        <GlobalContent>
            <FormTitle>Login</FormTitle>

            <Form>
                <div className="col-5">
                    <FormInput
                        label="Email"
                        name="email"
                        errorHandler={errorHandler}
                        onChange={(event) => setEmail(event.target.value)} />

                    <FormPassword
                        label="Password"
                        name="password"
                        errorHandler={errorHandler}
                        onChange={(event) => setPassword(event.target.value)} />

                    <DangerLabel message={errorHandler.errorMessage} />
                </div>

                <div className="mt-2">
                    <FormButtonBar>
                        <FormAcceptButton label="Login" onClick={loginClick} />
                        <FormButton label="Cancelar" onClick={() => history('/')} />
                    </FormButtonBar>
                </div>
            </Form >
        </GlobalContent >
    )
}
