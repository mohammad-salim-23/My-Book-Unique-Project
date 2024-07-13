import { useContext } from "react";
import { AuthContext } from "../provider/AuthProvider";


const MyProfile = () => {
    const {user} = useContext(AuthContext);
    return (
        <div>
               <div className="flex items-center justify-center">
            <div className="card w-full bg-base-100 shadow-xl">
  <div className="card-body">
    <h2 className="card-title">{user?.displayName}</h2>
  
    <p className="font-medium">email:{user?.email}</p>
    <p className="font-medium">phone number:{user.phone}</p>

  </div>
  <figure><img className="h-96 w-96" src={user?.photoURL} alt="Shoes" /></figure>
</div>
        </div>  
        </div>
    );
};

export default MyProfile;