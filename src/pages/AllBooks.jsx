import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../hooks/useAxiosPublic";
import { useState } from "react";
import { Link } from "react-router-dom";

const AllBooks = () => {
    const axiosPublic = useAxiosPublic();
    const {data:books=[],refetch} = useQuery({
        queryKey:["books"],
        queryFn:async()=>{
            const res = await axiosPublic.get("/books");
            return res.data;
        }
    });
    // pagination state
    const [currentPage,setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    const approvedBooks = books.filter((book)=>book.status==='approved');
    const totalPages = Math.ceil(approvedBooks.length/itemsPerPage);
    const displayedBooks = apprevedBooks.slice((currentPage-1)*itemsPerPage,currentPage*itemsPerPage);

    // Handle page change
    const handlePageChange = (newPage)=>{
        setCurrentPage(newPage);
    };
    return(
       <div>
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {displayedBooks.map((bookItem) => (
          <div key={bookItem.id} className="card w-96 bg-base-100 shadow-xl">
            <img src={bookItem.image} alt={bookItem.title} className="h-96" />
            <h2 className="card-title">{bookItem.title}</h2>
            <p className="font-semibold">Posted by: MyC{bookItem.name}</p>
            <p className="font-medium">Price: {bookItem.price}</p>
            <p className="">{bookItem.description}</p>
            <p className="class-enrollment">
              Total Enrollment: {bookItem.enrollment}
            </p>
            <Link to={`/classDetails/${bookItem._id}`}>
              <button className="btn btn-success btn-outline btn-block">Enroll</button>
            </Link>
          </div>
        ))}
      </div>
      <div className="flex justify-center mt-4">
        {/* Pagination controls */}
        <button
        onClick={()=>handlePageChange(currentPage-1)}
        disabled={currentPage===1}
        className="btn btn-outline mx-1"
        >
          Previous
        </button>
        {
           [...Array(totalPages)].map((_,index)=>(
            <button
            key={index}
            onClick={()=>handlePageChange(index+1)}
            className={`btn mx-1 ${currentPage===index+1 ? 'btn-active':''}`}
            >
                {index+1}
            </button>
           )) 
        }
        <button
          onClick={()=>handlePageChange(currentPage+1)}
          disabled={currentPage===totalPages}
          className="btn btn-outline mx-1"
        >
            Next
        </button>
      </div>
       </div>
    );
};

export default AllBooks;