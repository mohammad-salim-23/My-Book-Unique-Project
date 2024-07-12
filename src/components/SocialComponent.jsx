import { useNavigate } from "react-router-dom";
import useAxiosPublic from "../hooks/useAxiosPublic";
import { useContext } from "react";
import { AuthContext } from "../provider/AuthProvider";
import { FaGoogle } from "react-icons/fa";

const SocialComponent = () => {
   const axiosPublic = useAxiosPublic();
   const navigate = useNavigate();
   const {googleSignIn} = useContext(AuthContext);
   const handleGoogleSignIn = ()=>{
     googleSignIn()
     .then(result=>{
        const userInfo={
            email:result.user?.email,
            name:result.user?.displayName
        }
        axiosPublic.post('/users',userInfo)
        .then(res=>{
            console.log(res.data);
            navigate('/');
        })
     })
   }
    return (
        <div className="px-32">
            <div>
                <button  onClick={handleGoogleSignIn} className="btn btn-active btn-block bg-[#987306]">
                      <FaGoogle></FaGoogle>
                      Google
                </button>
            </div>
        </div>
    );
};

export default SocialComponent;