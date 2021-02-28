import React from "react";
import {Formik, Form} from "formik";
import * as yup from "yup";
import { Button, CircularProgress } from "@material-ui/core";
import {RouteComponentProps} from "react-router-dom"

import InputField from "../components/shared/InputField"
import { useRegisterMutation } from "../generated/graphql";





const Register: React.FC<RouteComponentProps> = ({history}) => {

    const [register, { data, loading, error }] = useRegisterMutation()

    const initialObject = {
        email: "",
        password: "",
    }
    
    const validationSchema = yup.object({
        email: yup.string().email("Bitte Gültige Adresse angeben").required("Dieses Feld muss ausgefüllt werden"),
        password: yup.string().min(6, "Password muss mindestens sechs Zeichen lang sein").max(50).required("Dieses Feld muss ausgefüllt werden")
      });
    
    const submitHandler = async ({email, password}: any, config: {setSubmitting:  (isSubmitting: boolean) => void, resetForm: () => void}) => {
        config.setSubmitting(true);
        await register({
            variables: {
                email, 
                password
            }
        })
        history.push("/");
        config.setSubmitting(false);
        config.resetForm();
    }
    
    console.log( data, loading, error);
    return(
        <div>
            <h1>Register</h1>
            <Formik 
                initialValues={initialObject}
                validationSchema={validationSchema}
                onSubmit={(data, {setSubmitting, resetForm}) => submitHandler(data, {setSubmitting, resetForm})}
            >
                {({isValid, touched}) => (
                    <Form>
                        <InputField
                            id="email"
                            label="Email Addresse"
                            name="email"
                            autoFocus
                        />
                        <InputField 
                            id="password"
                            label="Passwort"
                            name="password"
                            default="password muss mindestens 6 Zeichen lang sein"
                        />

                        <Button
                        type="submit"
                        fullWidth
                        variant="outlined"
                        color="secondary"
                        className="submit"
                        disabled={Object.keys(touched).length === 0 || !isValid}
                        >
                            Jetzt registrieren
                            {loading && <CircularProgress style={{width: "20px", height: "20px", marginLeft: "20px"}} />}
                        </Button>
                    </Form>
                )}

            </Formik>
        </div>
    )
};

export default Register