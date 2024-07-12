import { useContext } from "react";
import { Helmet } from "react-helmet";
import { useForm } from "react-hook-form";

import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";



import { AuthContext } from "../provider/AuthProvider";
import SocialComponent from "../components/SocialComponent";
import useAxiosPublic from "../hooks/useAxiosPublic";

const SignUp = () => {
  const navigate = useNavigate();
  const axiosPublic = useAxiosPublic();
  const {createUser,updateUserProfile} = useContext(AuthContext);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    console.log(data);
    createUser(data.email,data.password)
    .then(result=>{
      const loggedUser = result.user;
      if(loggedUser){
      console.log(loggedUser);
      const profile =   {
        displayName:data?.name,
        photoURL:data?.photoURL
      }
      updateUserProfile(profile)
      .then(()=>{
      //  create user entry in the database
     const userInfo = {
        name: data.name,
        email:data.email,
        phone:data.phone,
        image:data.photoURL
     }
      axiosPublic.post('/users',userInfo)
      .then(res=>{
        if(res.data.insertedId){
          console.log("user added to the databsase")
          reset();
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Your work has been saved",
            showConfirmButton: false,
            timer: 1500
          });
        }
      })
          navigate('/'); 
      })
      .catch(error=>{
        console.log(error);
      })
    }
    })
  };

  return (
    <div>
        <Helmet>
                <title>My Book | SignUp</title>
            </Helmet>
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content flex-col ">
          <div className="text-center ">
            <h1 className="text-5xl font-bold">SignUp now!</h1>
           
          </div>
          <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
            <form onSubmit={handleSubmit(onSubmit)} className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Name</span>
                </label>
                <input
                  type="text"
                  {...register("name", { required: true })}
                  name="name"
                  placeholder="Your Name"
                  className="input input-bordered"
                />
                {errors.name && (
                  <span className="text-red-600 ">Name is required</span>
                )}
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">PhotoURL</span>
                </label>
                <input
                  type="text"
                  {...register("photoURL", { required: true })}
                 
                  placeholder="PhotoURL"
                  className="input input-bordered"
                />
                {errors.photoURL && (
                  <span className="text-red-600 ">Photo URL is required</span>
                )}
                <label className="label">
                  <span className="label-text">Phone Number</span>
                </label>
                <input
                  type="number"
                  {...register("phone", { required: true })}
                 
                  placeholder="phone"
                  className="input input-bordered"
                />
                {errors.photoURL && (
                  <span className="text-red-600 ">phone number is required</span>
                )}
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  {...register("email", { required: true })}
                  name="email"
                  placeholder="email"
                  className="input input-bordered"
                />
                {errors.email && (
                  <span className="text-red-600 ">email is required</span>
                )}
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  type="password"
                  {...register("password", {
                    required: true,
                    minLength: 6,
                    maxLength: 20,
                    pattern:/(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z])/
                  })}
                  name="password"
                  placeholder="password"
                  className="input input-bordered"
                />
                {errors.password?.type === "required" && (
                  <p className="text-red-600">Password must required</p>
                )}
                       {errors.password?.type === "minLength" && (
                  <p className="text-red-600">Password must be 6 characters</p>
                )}
                       {errors.password?.type === "maxLength" && (
                  <p className="text-red-600">Password must be less than 20 characters</p>
                )}
                    {errors.password?.type === "pattern" && (
                  <p className="text-red-600">Password must have one uppercase and one lowercase ,one number and one special characters</p>
                )}
                <label className="label">
                  <a href="#" className="label-text-alt link link-hover">
                    Forgot password?
                  </a>
                </label>
              </div>
              <div className="form-control mt-6">
                <input
                  className="btn btn-outline"
                  type="submit"
                  value="SignUp"
                />
              </div>
            </form>
            <p className="text-center mb-2">Alreade have an account go <Link className="font-bold" to="/login">Login Page</Link> </p>
            <SocialComponent></SocialComponent>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
