import React from "react"
import { Link, useNavigate } from "react-router-dom"
import { login as storeLogin } from "../features/authSlice"
import {Button, Input, Logo} from "./index"
import { useDispatch } from "react-redux"
import authService from "../appwrite/auth"
import {useForm} from "react-hook-form"

function Login() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {register, handleSubmit} = useForm();
    const [error, setError] = useState("");
    
    const login = async(data) => {
      setError("");
      try{
          const session = await authService.login(data);
          if(session){
            const userData = await authService.getCurrentUser(); //we're using await here as getCurrentUser is a promise.
            if(userData){
              dispatch(storeLogin(userData))
            }
            navigate("/"); //navigate se directly page vala navigate ho jata hai without clicking anywhere.**
          }
      }
      catch(error){
        setError(error.message)
      }
    }

                                                                                                          
  return (
    <div className="flex items-center justify-center w-full">
      <div className = {`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}>
      <div className="mb-2 flex justify-center">
                    <span className="inline-block w-full max-w-[100px]">
                        <Logo width="100%" />
                    </span>
        </div>
        <h2 className="text-center text-2xl font-bold leading-tight">Sign in to your account</h2>
        <p className="mt-2 text-center text-base text-black/60">
                    Don&apos;t have any account?&nbsp;
                    <Link
                        to="/signup"
                        className="font-medium text-primary transition-all duration-200 hover:underline"
                    >
                        Sign Up
                    </Link>
        </p>
        {error && <p className="text-red-600 mt-8 text-center">{error}</p>} 
        
         <form onSubmit={handleSubmit(login)} className="mt-8"> {/* here since we're using react hook form, the handleSubmit is an inbuilt event
         in react hook form which will happen onClick and we have to pass a function jo hume karana hai onClick(eg. login function) */}
         {/* what handleSubmit does is that it manages the state of all the input fields which are present 
         in the function with the help of register */}
         <div className="space-y-5">
          <Input 
          label = "Email: "
          type = "email"
          placeholder = "Enter your email"
          {...register ("email", {
            required : true,
            validate : {
              matchPattern : (value) => / ^(?=.{1,256}$)[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$ /.
              test(value) ||
              "Email address must be a valid address"
            }
          })}
          />
          <Input
          label = "Password: "
          type = "password"
          placeholder = "Enter your password"
          {...register("password", {
            required : true,
            validate : {
              matchPattern : (value) => / ^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$ /.
              test(value) ||
              "Give valid password"
              }
          })}
          />
          <Button
          type="submit"
          className="w-full"
          >Sign In</Button>
         </div>
        </form> 


      </div>
    </div>
  )
}
export default Login