import React, { useEffect, useState } from 'react'
import { Button, Descriptions } from 'antd';

const Category = [
    "T-Shirts",
    "Hoddies",
    "Books",
    "Pens",
    "Hats",
    "Stickers",
    "Other..."
]

function ProductInfo(props) {

    const [Product, setProduct] = useState({})

    useEffect(() => {
        console.log(props.detail)
        setProduct(props.detail)
    }, [props.detail])

    const addToCartHandler = () => {
        props.addToCart(props.detail._id)
    }

    return (
        <div>
            <Descriptions title="Product Info">
                <Descriptions.Item label="Price">$ {Product.price}</Descriptions.Item>
                <Descriptions.Item label="Sold">{Product.sold}</Descriptions.Item>
                <Descriptions.Item label="Category"> {Category[Product.category]}</Descriptions.Item>
                <Descriptions.Item label="Description"> {Product.description}</Descriptions.Item>
            </Descriptions>

            <br />
            <br />
            <br />
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <Button size="large" shape="round" type="danger"
                    onClick={addToCartHandler}
                >
                    Add to Cart
                    </Button>
            </div>
        </div>
    )
}

export default ProductInfo
