import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { PencilIcon, TrashIcon, PlusIcon } from '@heroicons/react/24/outline';

export default function ProductList() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const res = await axios.get('http://127.0.0.1:8000/api/products');
            setProducts(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this product?')) return;
        try {
            await axios.delete(`http://127.0.0.1:8000/api/products/${id}`);
            fetchProducts();
        } catch (err) {
            console.error(err);
            alert('Failed to delete product');
        }
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Products</h1>
                <Link
                    to="/admin/products/create"
                    className="bg-neutral-900 text-white px-4 py-2 rounded-lg flex items-center gap-2 text-sm font-medium hover:bg-neutral-800"
                >
                    <PlusIcon className="w-4 h-4" /> Add Product
                </Link>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-neutral-200 overflow-hidden">
                <table className="w-full text-left text-sm">
                    <thead className="bg-neutral-50 border-b border-neutral-100">
                        <tr>
                            <th className="p-4 font-medium text-neutral-500">Image</th>
                            <th className="p-4 font-medium text-neutral-500">Name</th>
                            <th className="p-4 font-medium text-neutral-500">Category</th>
                            <th className="p-4 font-medium text-neutral-500">Price</th>
                            <th className="p-4 font-medium text-neutral-500 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-neutral-100">
                        {products.map((product) => (
                            <tr key={product.id} className="hover:bg-neutral-50/50">
                                <td className="p-4">
                                    <div className="w-12 h-12 rounded-lg bg-neutral-100 overflow-hidden">
                                        {product.images?.[0] && (
                                            <img src={product.images[0]} alt="" className="w-full h-full object-cover" />
                                        )}
                                    </div>
                                </td>
                                <td className="p-4 font-medium text-neutral-900">{product.name}</td>
                                <td className="p-4 text-neutral-500">{product.category}</td>
                                <td className="p-4 text-neutral-900 font-mono">
                                    Rp {parseInt(product.price).toLocaleString('id-ID')}
                                </td>
                                <td className="p-4 text-right">
                                    <div className="flex items-center justify-end gap-2">
                                        <Link
                                            to={`/admin/products/edit/${product.id}`}
                                            className="p-2 text-neutral-400 hover:text-primary hover:bg-neutral-100 rounded-lg transition-colors"
                                        >
                                            <PencilIcon className="w-4 h-4" />
                                        </Link>
                                        <button
                                            onClick={() => handleDelete(product.id)}
                                            className="p-2 text-neutral-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                                        >
                                            <TrashIcon className="w-4 h-4" />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
