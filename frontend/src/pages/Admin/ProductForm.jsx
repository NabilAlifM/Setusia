import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { PhotoIcon, XMarkIcon } from '@heroicons/react/24/outline';

export default function ProductForm() {
    const { id } = useParams();
    const navigate = useNavigate();
    const isEdit = !!id;

    const [formData, setFormData] = useState({
        name: '',
        category: 'Sneakers',
        price: '',
        discount_price: '',
        description: '',
        stock: '100',
        sizes: [],
        features: [],
    });
    const [images, setImages] = useState([]);
    const [existingImages, setExistingImages] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentFeature, setCurrentFeature] = useState('');
    const [errors, setErrors] = useState({}); // New error state

    useEffect(() => {
        if (isEdit) {
            fetchProduct();
        }
    }, [id]);

    const handleAddFeature = () => {
        if (!currentFeature.trim()) return;
        setFormData(prev => ({
            ...prev,
            features: [...(prev.features || []), currentFeature.trim()]
        }));
        setCurrentFeature('');
    };

    const handleRemoveFeature = (index) => {
        setFormData(prev => ({
            ...prev,
            features: prev.features.filter((_, i) => i !== index)
        }));
    };

    const fetchProduct = async () => {
        try {
            const res = await axios.get(`http://127.0.0.1:8000/api/products/${id}`);
            const p = res.data;
            setFormData({
                name: p.name,
                category: p.category,
                price: p.price,
                discount_price: p.discount_price || '',
                description: p.description,
                stock: p.stock,
                sizes: p.sizes || [],
                features: p.features || [],
            });
            setExistingImages(p.images || []);
        } catch (err) {
            console.error(err);
            alert('Failed to fetch product');
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e) => {
        setImages(Array.from(e.target.files));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const data = new FormData();
        data.append('name', formData.name);
        data.append('category', formData.category);
        data.append('price', formData.price);
        if (formData.discount_price) data.append('discount_price', formData.discount_price);
        data.append('description', formData.description);
        data.append('stock', formData.stock);

        const sizes = Array.isArray(formData.sizes) ? formData.sizes : [];
        const features = Array.isArray(formData.features) ? formData.features : [];

        sizes.forEach(s => data.append('sizes[]', s));
        features.forEach(f => data.append('features[]', f));

        images.forEach(img => data.append('images[]', img));

        if (isEdit) {
            data.append('_method', 'PUT'); // Laravel trick for PUT with files
        }

        try {
            const url = isEdit
                ? `http://127.0.0.1:8000/api/products/${id}`
                : 'http://127.0.0.1:8000/api/products';

            await axios.post(url, data, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });

            navigate('/admin/products');
        } catch (err) {
            console.error(err);
            if (err.response && err.response.status === 422) {
                setErrors(err.response.data.errors);
                alert('Please fix the errors in the form.');
            } else {
                alert('Failed to save product: ' + (err.response?.data?.message || err.message));
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto bg-white p-8 rounded-xl shadow-sm border border-neutral-200">
            <h1 className="text-2xl font-bold mb-6">{isEdit ? 'Edit Product' : 'Create Product'}</h1>

            <form onSubmit={handleSubmit} className="space-y-6">

                {/* Error Summary */}
                {Object.keys(errors).length > 0 && (
                    <div className="bg-red-50 border border-red-200 text-red-600 p-4 rounded-lg text-sm">
                        <p className="font-bold mb-1">There were some problems with your input:</p>
                        <ul className="list-disc pl-5">
                            {Object.values(errors).flat().map((error, index) => (
                                <li key={index}>{error}</li>
                            ))}
                        </ul>
                    </div>
                )}

                <div className="grid grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium mb-1">Name</label>
                        <input className="input-field w-full border p-2 rounded" name="name" value={formData.name} onChange={handleChange} required />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Category</label>
                        <select className="input-field w-full border p-2 rounded" name="category" value={formData.category} onChange={handleChange}>
                            <option>Sneakers</option>
                            <option>Running</option>
                            <option>Casual</option>
                            <option>Original</option>
                            <option>Soccer</option>


                        </select>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium mb-1">Price</label>
                        <input type="number" className="input-field w-full border p-2 rounded" name="price" value={formData.price} onChange={handleChange} required />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Stock</label>
                        <input type="number" className="input-field w-full border p-2 rounded" name="stock" value={formData.stock} onChange={handleChange} required />
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium mb-1">Discount Price (Optional)</label>
                        <input type="number" className="input-field w-full border p-2 rounded" name="discount_price" value={formData.discount_price} onChange={handleChange} />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium mb-2">Sizes Available</label>
                    <div className="flex flex-wrap gap-2">
                        {[36, 37, 38, 39, 40, 41, 42, 43, 44, 45].map((size) => (
                            <button
                                key={size}
                                type="button"
                                onClick={() => {
                                    setFormData(prev => {
                                        const currentSizes = Array.isArray(prev.sizes) ? prev.sizes : [];
                                        const newSizes = currentSizes.includes(size)
                                            ? currentSizes.filter(s => s !== size)
                                            : [...currentSizes, size].sort((a, b) => a - b);
                                        return { ...prev, sizes: newSizes };
                                    });
                                }}
                                className={`w-10 h-10 rounded-lg font-medium transition-all border ${(Array.isArray(formData.sizes) && formData.sizes.includes(size))
                                    ? "bg-neutral-900 text-white border-neutral-900"
                                    : "bg-white text-neutral-600 border-neutral-200 hover:border-neutral-400"
                                    }`}
                            >
                                {size}
                            </button>
                        ))}
                    </div>
                    {(Array.isArray(formData.sizes) && formData.sizes.length === 0) && (
                        <p className="text-red-500 text-sm mt-1">Please select at least one size.</p>
                    )}
                </div>

                <div>
                    <label className="block text-sm font-medium mb-2">Best Features</label>
                    <div className="flex gap-2 mb-3">
                        <input
                            type="text"
                            value={currentFeature}
                            onChange={(e) => setCurrentFeature(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                    e.preventDefault();
                                    handleAddFeature();
                                }
                            }}
                            className="input-field flex-1 border p-2 rounded"
                            placeholder="e.g. Lightweight, Water Resistant"
                        />
                        <button
                            type="button"
                            onClick={handleAddFeature}
                            className="bg-neutral-900 text-white px-4 py-2 rounded-lg hover:bg-neutral-700"
                        >
                            Add
                        </button>
                    </div>

                    <div className="flex flex-wrap gap-2">
                        {formData.features?.map((feature, index) => (
                            <div key={index} className="flex items-center gap-2 bg-neutral-100 px-3 py-1.5 rounded-lg text-sm text-neutral-700">
                                <span>{feature}</span>
                                <button
                                    type="button"
                                    onClick={() => handleRemoveFeature(index)}
                                    className="text-neutral-400 hover:text-red-500"
                                >
                                    <XMarkIcon className="w-4 h-4" />
                                </button>
                            </div>
                        ))}
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">Description</label>
                    <textarea className="input-field w-full border p-2 rounded h-32" name="description" value={formData.description} onChange={handleChange} required />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">Images</label>
                    <div className="border-2 border-dashed border-neutral-200 rounded-xl p-8 text-center hover:bg-neutral-50 transition-colors relative">
                        <input type="file" multiple className="absolute inset-0 opacity-0 cursor-pointer" onChange={handleFileChange} />
                        <div className="flex flex-col items-center gap-2 text-neutral-400">
                            <PhotoIcon className="w-8 h-8" />
                            <span className="text-sm">Click to upload images (Hold Cmd/Ctrl to select multiple)</span>
                        </div>
                    </div>

                    {/* Preview New Images */}
                    {images.length > 0 && (
                        <div className="mt-4 flex gap-2 overflow-x-auto">
                            {images.map((img, i) => (
                                <div key={i} className="w-20 h-20 rounded-lg overflow-hidden border border-neutral-200 flex-shrink-0">
                                    <img src={URL.createObjectURL(img)} className="w-full h-full object-cover" />
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Existing Images */}
                    {isEdit && existingImages.length > 0 && (
                        <div className="mt-4">
                            <p className="text-sm text-neutral-500 mb-2">Current Images:</p>
                            <div className="flex gap-2 overflow-x-auto">
                                {existingImages.map((img, i) => (
                                    <div key={i} className="w-20 h-20 rounded-lg overflow-hidden border border-neutral-200 flex-shrink-0 relative group">
                                        <img src={img} className="w-full h-full object-cover" />
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                <div className="pt-4 border-t border-neutral-100 flex justify-end gap-3">
                    <button type="button" onClick={() => navigate('/admin/products')} className="px-4 py-2 text-neutral-600 hover:bg-neutral-100 rounded-lg">Cancel</button>
                    <button
                        type="submit"
                        disabled={loading}
                        className="bg-primary text-white px-6 py-2 rounded-lg font-bold hover:brightness-110 disabled:opacity-50"
                    >
                        {loading ? 'Saving...' : 'Save Product'}
                    </button>
                </div>
            </form>
        </div>
    );
}
