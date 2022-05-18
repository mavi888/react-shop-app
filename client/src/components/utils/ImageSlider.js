import React from 'react'
import { Carousel } from 'antd';

function ImageSlider(props) {

    const URL = process.env.REACT_APP_SERVER_URL
    return (
        <div>

            <Carousel autoplay>
                {props.images.map((image, index) => (
                    <div key={index}>
                        <img style={{ width: '100%', maxHeight: '150px' }}
                            src={`${URL}${image}`} alt="productImage" />
                    </div>
                ))}
            </Carousel>
        </div>
    )
}

export default ImageSlider
