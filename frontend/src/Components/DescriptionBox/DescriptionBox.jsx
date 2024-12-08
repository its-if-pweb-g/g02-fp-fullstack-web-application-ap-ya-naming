import React from 'react'
import './DescriptionBox.css'

const DescriptionBox = () => {
    return (
        <div className='descriptionbox'>
            <div className="descriptionbox-navigator">
                <div className="descriptionbox-nav-box">Description</div>
                <div className="descriptionbox-nav-box fade">Review (122)</div>
            </div>
            <div className="descriptionbox-description">
                <p>E-commerce is the modern way of doing business online, where people can buy and sell products or services through the internet. 
                    It's like having a digital marketplace that never closes, allowing customers to shop from anywhere using their computers or phones. 
                    From giant retailers like Amazon to small Instagram shops, e-commerce has transformed how we shop by offering convenience, wider product choices, and the ability to compare prices easily. 
                    Businesses benefit from reaching global customers without needing physical stores, while shoppers enjoy the convenience of doorstep delivery and easy payment options.</p>
                <p>
                An e-commerce website is an online platform that enables businesses to sell products or services directly to customers through the internet. 
                It includes essential features like product catalogs, shopping carts, secure payment processing, and order management systems. 
                These websites serve as digital storefronts where customers can browse items, make purchases, and track their deliveries, all from the comfort of their homes using computers or mobile devices.
                </p>
            </div>
        </div>
    )
}

export default DescriptionBox