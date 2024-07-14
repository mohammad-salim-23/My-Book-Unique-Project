import { useContext, useState } from "react";
import { AuthContext } from "../provider/AuthProvider";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { Link, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";

const MyAddedBooks = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const {
    data: books = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["books", user?.email],
    queryFn: async () => {
      const result = await axiosSecure.get(`/books/${user?.email}`);
      return result.data;
    },
    enabled: !!user?.email,
  });

  const handleDeleteBook = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await axiosSecure.delete(`/books/${id}`);
          if (res.data) {
            Swal.fire("Deleted!", "Your book has been deleted.", "success");
            navigate(0); // Refresh page to reflect changes
          }
        } catch (error) {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Something went wrong!",
          });
        }
      }
    });
  };

  const totalPages = Math.ceil(books.length / itemsPerPage);
  const displayedBooks = books.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  if (isLoading) {
    return (
      <>
        <span className="loading loading-bars loading-xs"></span>
        <span className="loading loading-bars loading-sm"></span>
        <span className="loading loading-bars loading-md"></span>
        <span className="loading loading-bars loading-lg"></span>
      </>
    );
  }

  if (isError) {
    return <span>Error: {error.message}</span>;
  }

  return (
    <div>
      <h2>My Added Books</h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-7">
        {displayedBooks.map((book) => (
          <div key={book._id} className="book-item space-y-5">
            <h3 className="text-2xl font-bold">Book Name: {book.bookName}</h3>
            <p className="font-medium">Description: {book.description}</p>
            <p className="font-semibold">Price: {book.price}</p>
            <img
              className="h-96 w-96"
              src={book.image}
              alt={book.bookName}
            />
            <p className="font-semibold">Category: {book.category}</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <Link to={`/dashboard/update/${book._id}`}>
                <button className="btn btn-success">Update</button>
              </Link>
              <button
                onClick={() => handleDeleteBook(book._id)}
                className="btn btn-warning"
              >
                Delete
              </button>
              <button
                className="btn"
                onClick={() => navigate(`/dashboard/myBooks/${book._id}`)}
              >
                See Details
              </button>
            </div>
            <div className="divider"></div>
          </div>
        ))}
      </div>
      <div className="flex justify-center mt-4">
        {/* Pagination controls */}
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
            className={`btn mx-1 ${currentPage === index + 1 ? 'btn-active' : ''}`}
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

export default MyAddedBooks;
