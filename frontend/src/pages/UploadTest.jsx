import { useState } from 'react';
import axios from 'axios';

export default function UploadTest() {
    const [name, setName] = useState('');
    const [images, setImages] = useState(null);
    const [message, setMessage] = useState('');

    const handleFileChange = (e) => {
        setImages(e.target.files);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('name', name);
        formData.append('category', 'Sneakers');
        formData.append('price', '1000000');
        formData.append('description', 'Test Description');
        formData.append('sizes[]', '40');
        formData.append('sizes[]', '41');

        if (images) {
            for (let i = 0; i < images.length; i++) {
                formData.append('images[]', images[i]);
            }
        }

        try {
            const res = await axios.post('http://127.0.0.1:8000/api/products', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            setMessage('Product uploaded successfully!');
            console.log(res.data);
        } catch (err) {
            setMessage('Upload failed');
            console.error(err);
        }
    };

    return (
        <div className="p-10">
            <h1 className="text-2xl font-bold mb-4">Upload Test</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block mb-2">Product Name</label>
                    <input
                        type="text"
                        className="border p-2 w-full"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div>
                    <label className="block mb-2">Images (Select Multiple)</label>
                    <input
                        type="file"
                        multiple
                        className="border p-2 w-full"
                        onChange={handleFileChange}
                    />
                </div>
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
                    Upload
                </button>
            </form>
            {message && <p className="mt-4">{message}</p>}
        </div>
    );
}
