import React, { useContext } from 'react'
import './ProductDisplay.css'
import star_icon from "../Assets/star.png";
import star_dull_icon from "../Assets/star_dull.png"
import { ShopContext } from '../../Context/ShopContext';

const ProductDisplay = (props) => {

        const {product} = props;
        const {addToCart} = useContext(ShopContext);
    return (
        <div className='productdisplay'>
            <div className="productdisplay-left">
                <div className="productdisplay-img-list">
                    <img src={product.image} alt="" />
                    <img src={product.image} alt="" />
                    <img src={product.image} alt="" />
                    <img src={product.image} alt="" />
                </div>
                 <div className="productdisplay-img">
                    <img className='productdisplay-main-img' src={product.image} alt="" />
                </div>
            </div>
            <div className="productdisplay-right">
                <h1>{product.name}</h1>
                <div className="productdisplay-right-star">
                    <img src={star_icon} alt="" />
                    <img src={star_icon} alt="" />
                    <img src={star_icon} alt="" />
                    <img src={star_icon} alt="" />
                    <img src={star_dull_icon} alt="" />
                    <p>(122)</p>
                </div>
                <div className="productdisplay-right-prices">
                    <div className="productdisplay-right-price-old">${product.old_price}</div>
                    <div className="productdisplay-right-price-new">${product.new_price}</div>
                </div>
                <div className="productdisplay-right-description">
                These aren't just sneakers. They're your new go-to comfort heroes. 
                Cloud-soft cushioning meets street-smart style in a design that feels like a hug for your feet. 
                Rock them with anything, anywhere.
                </div>
                <div className="productdisplay-right-size">
                    <h1>Select Size</h1>
                    <div className="productdisplay-right-sizes">
                        <div>EUR 30</div>
                        <div>EUR  31</div>
                        <div>EUR 32</div>
                        <div>EUR 33</div>
                        <div>EUR 34</div>
                        <div>EUR 35</div>
                        <div>EUR 36</div>
                        <div>EUR 37</div>
                        <div>EUR 38</div>
                        <div>EUR 39</div>
                        <div>EUR 40</div>
                        <div>EUR 41</div>
                        <div>EUR 42</div>
                        <div>EUR 43</div>
                        <div>EUR 44</div>
                        <div>EUR 45</div>
                    </div>
                </div>
                <button onClick={()=>{addToCart(product.id)}}>ADD TO CART</button>
                <p className='productdisplay-right-category'><span>Category :</span>Women, Nike</p>
                <p className='productdisplay-right-category'><span>Tags :</span>Casual, Latest</p>
            </div>
        </div>
    )
}

export default ProductDisplay