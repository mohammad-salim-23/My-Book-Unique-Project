import { useContext } from "react";
import { AuthContext } from "../provider/AuthProvider";
import { Helmet } from "react-helmet";


const AddBooks = () => {
    const currentDate = new Date().toISOString().slice(0,10);
    const { user } = useContext(AuthContext);
    
    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const bookData = {
            bookName: formData.get('bookName'),
            writerName: formData.get('writerName'),
            addedBy: user?.name,
            bookPhoto: formData.get('bookPhoto'),
            category: formData.get('category'),
            quantity: formData.get('quantity'),
            dateAdded: currentDate,
            purchaseQuantity:0,
        };
        console.log(bookData);
        // Handle the form submission, e.g., send the data to the server
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
                        value={user?.name}
                        readOnly
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-100 focus:outline-none focus:ring-primary focus:border-primary"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Book Photo URL</label>
                    <input
                        type="url"
                        name="bookPhoto"
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                        required
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
