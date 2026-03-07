"use client";

import React, { useState, useEffect } from 'react';

function AddProductPage() {
    const [categories, setCategories] = useState([]);

    const [productName, setProductName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');

    const [variants, setVariants] = useState([{ name: '', price: '' }]);

    useEffect(() => {
        // Fetch categories to populate the dropdown
        fetch("/api/admin/categories")
            .then((res) => {
                if (res.ok) return res.json();
                return [];
            })
            .then((data) => setCategories(Array.isArray(data) ? data : []))
            .catch(err => console.error("Error fetching categories:", err));
    }, []);

    const handleVariantChange = (index, field, value) => {
        const newVariants = [...variants];
        newVariants[index][field] = value;
        setVariants(newVariants);
    };

    const addVariant = () => {
        setVariants([...variants, { name: '', price: '' }]);
    };

    const removeVariant = (index) => {
        const newVariants = variants.filter((_, i) => i !== index);
        setVariants(newVariants);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = {
            productName,
            description,
            price,
            category: selectedCategory,
            variants
        };

        console.log("Add Product Form Submitted:", formData);
    };

    return (
        <div className="p-8">
            <h1 className="text-3xl font-bold mb-6">Add Product</h1>

            <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl bg-white p-6 rounded shadow">

                {/* Product Name */}
                <div>
                    <label className="block text-sm font-medium mb-1">Product Name</label>
                    <input
                        type="text"
                        value={productName}
                        onChange={(e) => setProductName(e.target.value)}
                        placeholder="Enter product name"
                        className="w-full border rounded px-3 py-2"
                        required
                    />
                </div>

                {/* Description */}
                <div>
                    <label className="block text-sm font-medium mb-1">Description</label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Enter description"
                        className="w-full border rounded px-3 py-2 h-24"
                        required
                    />
                </div>

                {/* Price */}
                <div>
                    <label className="block text-sm font-medium mb-1">Price</label>
                    <input
                        type="number"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        placeholder="Enter base price"
                        className="w-full border rounded px-3 py-2"
                        required
                    />
                </div>

                {/* Category Selection */}
                <div>
                    <label className="block text-sm font-medium mb-1">Category</label>
                    <select
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className="w-full border rounded px-3 py-2"
                        required
                    >
                        <option value="" disabled>Select a category</option>
                        {categories && categories.map((cat) => (
                            <option key={cat.id || cat.name} value={cat.name}>
                                {cat.name}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Variants Section */}
                <div className="border p-4 rounded bg-gray-50">
                    <div className="flex justify-between items-center mb-4">
                        <label className="block text-sm font-medium">Variants</label>
                        <button
                            type="button"
                            onClick={addVariant}
                            className="bg-gray-200 text-sm px-3 py-1 rounded hover:bg-gray-300"
                        >
                            + Add Variant
                        </button>
                    </div>

                    {variants.map((variant, index) => (
                        <div key={index} className="flex gap-4 mb-2 items-center">
                            <input
                                type="text"
                                value={variant.name}
                                onChange={(e) => handleVariantChange(index, 'name', e.target.value)}
                                placeholder="Variant Name (e.g. Size M)"
                                className="flex-1 border rounded px-3 py-2 text-sm"
                                required
                            />
                            <input
                                type="number"
                                value={variant.price}
                                onChange={(e) => handleVariantChange(index, 'price', e.target.value)}
                                placeholder="Price"
                                className="w-32 border rounded px-3 py-2 text-sm"
                                required
                            />
                            {variants.length > 1 && (
                                <button
                                    type="button"
                                    onClick={() => removeVariant(index)}
                                    className="text-red-500 font-bold px-2 py-1"
                                    title="Remove Variant"
                                >
                                    ✕
                                </button>
                            )}
                        </div>
                    ))}
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 w-full font-medium"
                >
                    Add Product
                </button>
            </form>
        </div>
    );
}

export default AddProductPage;