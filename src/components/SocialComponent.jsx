import { useNavigate } from "react-router-dom";
import useAxiosPublic from "../hooks/useAxiosPublic";
import { useContext } from "react";
import { AuthContext } from "../provider/AuthProvider";
import { FaGoogle } from "react-icons/fa";

const SocialComponent = () => {
   const axiosPublic = useAxiosPublic();
   const navigate = useNavigate();
   const {googleSignIn} = useContext(AuthContext);
    return (
        <div className="px-32">
            <div>
                <button onClick={handleGoogleSignIn} className="btn btn-active">
                      <FaGoogle></FaGoogle>
                </button>
            </div>
        </div>
    );
};

export default SocialComponent;