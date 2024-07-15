import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { useState } from "react";
import Swal from "sweetalert2";


const AllUsers = () => {
    const axiosSecure = useAxiosSecure();
    const {data:users=[],refetch} = useQuery({
        queryKey:["users"],
        queryFn:async()=>{
            queryFn:async()=>{
                const result = await axiosSecure.get("/users");
                return result.data;
            }
        }
    });
    // state for pagination
    const [currentPage,setCurrentPage] = useState(1);
    const itemsPerPage = 10;
    // calculate total pages
    const totalPages = Math.ceil(users.length/itemsPerPage);
    // Function to get current users to display
    const getCurrentUsers = ()=>{
        const startIndex = (currentPage-1)*itemsPerPage;
        const endIndex = startIndex+itemsPerPage;
        return users.slice(startIndex,endIndex);
    };
    // make admin a user
    const handleMakeAdmin=(user)=>{
        axiosSecure.patch(`/users/admin/${user._id}`)
        .then((res)=>{
            if(res.data.modifiedCount>0){
                Swal.fire({
                    position: "top-end",
            icon: "success",
            title: `${user.name} is an Admin Now!`,
            showConfirmButton: false,
            timer: 1500, 
                });
                refetch();
            }
        })
        .catch((error)=>{
            console.error("Failded to make admin:",error);
        })
    };
    const handleDeleteUser = (user)=>{
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
          }).then((result)=>{
            if(result.isConfirmed){
                axiosSecure.delete(`/users/${user._id}`)
                .then((res)=>{
                    if(res.data.modifiedCount>0){
                        refetch();
                        Swal.fire({
                            title: "Deleted!",
                            text: "Your file has been deleted.",
                            icon: "success",
                          });
                    }
                })
                .catch((error)=>{
                    console.error("Failed to delete user:", error);
                });
            }
          })
    };
    // Handler for page change
    const handlePageChange=(newPage)=>{
        setCurrentPage(newPage);
    }
    return (
        <div>
             <div className="flex justify-evenly my-4">
        <h2 className="text-3xl">All users</h2>
        <h2 className="text-3xl">Total users: {users.length}</h2>
      </div>
      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          {/* Head */}
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {/* Users */}
            {getCurrentUsers().map((user, index) => (
              <tr key={user._id}>
                <th>{index + 1}</th>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                  {user.role === "admin" ? (
                    "Admin"
                  ) : (
                    <button
                      onClick={() => handleMakeAdmin(user)}
                      className="btn bg-primaryColor btn-lg"
                    >
                      <FaUsers className="text-white text-2xl" />
                    </button>
                  )}
                </td>
                <td>
                  <button
                    onClick={() => handleDeleteUser(user)}
                    className="btn btn-ghost btn-lg"
                  >
                    <FaTrashAlt className="text-black" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Pagination */}
      <div className="flex justify-center mt-4">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="btn btn-outline mx-1"
        >
          Previous
        </button>
        {[...Array(totalPages)].map((_, index) => (
          <button
            key={index}
            onClick={() => handlePageChange(index + 1)}
            className={`btn mx-1 ${currentPage === index + 1 ? "btn-active" : ""}`}
          >
            {index + 1}
          </button>
        ))}
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="btn btn-outline mx-1"
        >
          Next
        </button>
      </div>
        </div>
    );
};

export default AllUsers;