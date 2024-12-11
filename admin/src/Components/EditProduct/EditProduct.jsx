import React, { useEffect, useState } from 'react';
import './EditProduct.css';
import { useParams } from 'react-router-dom';
import upload_area from '../../assets/Assets/upload-area.png'; // Assuming this is the fallback image

const EditProduct = () => {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const [image, setImage] = useState(null); // State to store the selected image
  const [imagePreview, setImagePreview] = useState(null); // State to store the image preview

  // Fetch product data by ID
  const fetchProduct = async () => {
    const res = await fetch(`http://localhost:4000/product/${id}`);
    const data = await res.json();
    setProduct(data);
  };

  useEffect(() => {
    fetchProduct();
  }, [id]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prev) => ({ ...prev, [name]: value }));
  };

  // Handle image change and preview
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);

    // Create a URL for the selected image to show as preview
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl); // Set preview image
    }
  };

  const handleSave = async () => {
    let updatedProduct = { ...product };
    if (image) {
      // Logic to upload the new image
      const formData = new FormData();
      formData.append('product', image);

      const imageUploadResponse = await fetch('http://localhost:4000/upload', {
        method: 'POST',
        body: formData,
      });
      const imageData = await imageUploadResponse.json();
      if (imageData.success) {
        updatedProduct.image = imageData.image_url; // Update product with new image URL
      }
    }

    // Send updated product details to the server
    await fetch(`http://localhost:4000/updateproduct/${id}`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedProduct),
    });
    alert('Product updated successfully!');
  };

  return (
    <div className="editproduct">
      <h1>Edit Product</h1>

      {/* Display current product image or a preview of the new image */}
      <div>
        <img
          src={imagePreview || product.image || upload_area} // Show the preview if available, otherwise show the current image or fallback
          alt="Product"
          style={{
            width: '200px',
            height: 'auto',
            borderRadius: '8px',
            border: '1px solid #ddd',
          }}
        />
      </div>

      <button onClick={() => document.getElementById('imageInput').click()}>
        Change Image
      </button>

      {/* Hidden file input */}
      <input
        type="file"
        id="imageInput"
        hidden
        onChange={handleImageChange}
      />

      <div>
        <label>Product Name:</label>
        <input
          type="text"
          name="name"
          value={product.name || ''}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Old Price:</label>
        <input
          type="text"
          name="old_price"
          value={product.old_price || ''}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>New Price:</label>
        <input
          type="text"
          name="new_price"
          value={product.new_price || ''}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Category:</label>
        <select
          name="category"
          value={product.category || ''}
          onChange={handleChange}
        >
          <option value="Women">Women</option>
          <option value="Men">Men</option>
          <option value="Kid">Kid</option>
        </select>
      </div>

      <button onClick={handleSave}>Save Changes</button>
    </div>
  );
};

export default EditProduct;
