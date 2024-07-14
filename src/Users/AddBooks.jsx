import { useContext } from "react";
import { AuthContext } from "../provider/AuthProvider";
import { Helmet } from "react-helmet";
import useAxiosSecure from "../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const AddBooks = () => {
    const currentDate = new Date().toISOString().slice(0, 10);
    const { user } = useContext(AuthContext); // Ensure user object is available
    const navigate = useNavigate();
    const axiosSecure = useAxiosSecure();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const bookData = {
            bookName: formData.get('bookName'),
            writerName: formData.get('writerName'),
            addedBy: user?.displayName,
            email: user?.email, // Automatically populated from AuthContext
            category: formData.get('category'),
            quantity: formData.get('quantity'),
            dateAdded: currentDate,
            purchaseQuantity: 0,
            image: formData.get('image'),
            price: formData.get('price'),
            description: formData.get('description'), // Added description
        };

        try {
            const response = await axiosSecure.post("/addBook", bookData);
            if (response.data?.insertedId) {
                e.target.reset();
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: `Book "${bookData.bookName}" has been added successfully`,
                    showConfirmButton: false,
                    timer: 1500,
                });
                navigate("/dashboard/added");
            }
        } catch (error) {
            console.error("Error adding book:", error);
        }
    };

    return (
        <div className="container mx-auto p-4">
            <Helmet>
                <title>My Book | AddBook</title>
            </Helmet>
            <h1 className="text-2xl font-bold mb-4">Add a New Book</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Book Name</label>
                    <input
                        type="text"
                        name="bookName"
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Writer Name</label>
                    <input
                        type="text"
                        name="writerName"
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Added By (User Name)</label>
                    <input
                        type="text"
                        name="addedBy"
                        value={user?.displayName} // Automatically populated and read-only
                        readOnly
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-100 focus:outline-none focus:ring-primary focus:border-primary"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Category</label>
                    <input
                        type="text"
                        name="category"
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Quantity</label>
                    <input
                        type="number"
                        name="quantity"
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Image URL</label>
                    <input
                        type="url"
                        name="image"
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Price</label>
                    <input
                        type="number"
                        name="price"
                        step="0.01"
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Description</label>
                    <textarea
                        name="description"
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                        required
                    ></textarea>
                </div>
                <div>
                    <button
                        type="submit"
                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                    >
                        Add Book
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddBooks;
