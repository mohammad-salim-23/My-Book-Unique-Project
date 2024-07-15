import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

import { FaCheck, FaTimes } from "react-icons/fa";
import useAxiosSecure from "../hooks/useAxiosSecure";

const AllBookReq = () => {
  const axiosSecure = useAxiosSecure();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const { data: books = [], refetch, isLoading, isError, error } = useQuery({
    queryKey: ["books"],
    queryFn: async () => {
      const res = await axiosSecure.get("/books");
      return res.data;
    },
  });

  const totalPages = Math.ceil(books.length / itemsPerPage);
  const displayedBooks = books.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleApprove = async (book) => {
    try {
      await axiosSecure.patch(`/books/approve/${book._id}`);
      refetch();
    } catch (error) {
      console.error("Failed to approve book request", error);
    }
  };

  const handleReject = async (book) => {
    try {
      await axiosSecure.delete(`/books/${book._id}`);
      refetch();
    } catch (error) {
      console.error("Failed to reject book request", error);
    }
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  if (isLoading) {
    return (
      <div className="loading">
        <span className="loading loading-bars loading-xs"></span>
        <span className="loading loading-bars loading-sm"></span>
        <span className="loading loading-bars loading-md"></span>
        <span className="loading loading-bars loading-lg"></span>
      </div>
    );
  }

  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <div className="flex justify-between my-4">
        <h2 className="text-3xl">All Book Requests</h2>
        <h2 className="text-3xl">Total Requests: {books.length}</h2>
      </div>
      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th>#</th>
              <th>Book Name</th>
              <th>Author</th>
              <th>Category</th>
              <th>Status</th>
              <th>Approve</th>
              <th>Reject</th>
            </tr>
          </thead>
          <tbody>
            {displayedBooks.map((book, index) => (
              <tr key={book._id}>
                <td>{index + 1}</td>
                <td>{book.name}</td>
                <td>{book.author}</td>
                <td>{book.category}</td>
                <td>{book.status}</td>
                <td>
                  <button
                    onClick={() => handleApprove(book)}
                    className="btn btn-success"
                    disabled={book.status !== "pending"}
                  >
                    <FaCheck />
                  </button>
                </td>
                <td>
                  <button
                    onClick={() => handleReject(book)}
                    className="btn btn-danger"
                    disabled={book.status !== "pending"}
                  >
                    <FaTimes />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
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

export default AllBookReq;
