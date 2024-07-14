import { useContext, useState } from "react";
import { AuthContext } from "../provider/AuthProvider";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";


const MyAddedBooks = () => {
    const {user} = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();
    const [currentPage,setCurrentPage] = useState(1);
    const itemsPerPage = 10;
    const{
        data:books=[],
        isLoading,
        isError,
        error,

    }= useQuery({
           queryKey:['books',user?.email],
           queryFn:async()=>{
            const result = await axiosSecure.get(`/books/${user?.email}`);
            return result.data;
           },
           enabled:!!user?.email,
    });
    return (
        <div>
            
        </div>
    );
};

export default MyAddedBooks;