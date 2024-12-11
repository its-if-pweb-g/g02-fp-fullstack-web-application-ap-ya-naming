import React, { useEffect, useState } from 'react';
import './ListProduct.css';
import remove_icon from '../../assets/Assets/remove_icon.png';
import edit_icon from '../../assets/Assets/edit_icon.png';
import { useNavigate } from 'react-router-dom';

const ListProduct = () => {
  const [allproducts, setAllProducts] = useState([]);
  const navigate = useNavigate();

  const fetchInfo = async () => {
    await fetch('http://localhost:4000/allproducts')
      .then((res) => res.json())
      .then((data) => setAllProducts(data));
  };

  useEffect(() => {
    fetchInfo();
  }, []);

  const remove_product = async (id) => {
    const confirmDelete = window.confirm('Are you sure you want to remove this product?');
    if (confirmDelete) {
      await fetch('http://localhost:4000/removeproduct', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id }),
      });
      await fetchInfo();
    }
  };

  const goToEditPage = (id) => {
    navigate(`/editproduct/${id}`);
  };

  return (
    <div className='list-product'>
      <h1>All Product List</h1>
      <div className='listproduct-format-main'>
        <p>Products</p>
        <p>Title</p>
        <p>Old Price</p>
        <p>New Price</p>
        <p>Category</p>
        <p>Action</p> {/* Change column header for Remove */}
      </div>
      <div className='listproduct-allproducts'>
        <hr />
        {allproducts.map((product, index) => (
          <div key={index} className="listproduct-format-main listproduct-format">
            <img src={product.image} alt="" className="listproduct-product-icon" />
            <p>{product.name}</p>
            <p>${product.old_price}</p>
            <p>${product.new_price}</p>
            <p>{product.category}</p>
            <div className='listproduct-actions'>
              <div className="remove-action">
                <img
                  onClick={() => remove_product(product.id)}
                  className='listproduct-remove-icon'
                  src={remove_icon}
                  alt="Remove"
                />
              </div>
              <div className="edit-action">
                <img
                  onClick={() => goToEditPage(product.id)}
                  className='listproduct-edit-icon'
                  src={edit_icon}
                  alt="Edit"
                />
              </div>
            </div>
          </div>
        ))}
        <hr />
      </div>
    </div>
  );
};

export default ListProduct;
