import React, { useEffect, useState } from 'react'
import ImageGallery from 'react-image-gallery';

function ProductImage(props) {
    const [Images, setImages] = useState([])

    useEffect(() => {
        if (props.detail.images && props.detail.images.length > 0) {
            console.log(props.detail.images)
            let images = [];

            props.detail.images && props.detail.images.map(item => {
                images.push({
                    original: `${process.env.REACT_APP_SERVER_URL}${item}`,
                    thumbnail: `${process.env.REACT_APP_SERVER_URL}${item}`
                })
            })
            setImages(images)
        }
    }, [props.detail])

    return (
        <div>
            <ImageGallery items={Images} />
        </div>
    )
}

export default ProductImage
