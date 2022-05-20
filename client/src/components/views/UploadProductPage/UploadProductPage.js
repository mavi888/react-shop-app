import React, { useState } from 'react'
import { Typography, Button, Form, Input } from 'antd';
import FileUpload from '../../utils/FileUpload'
import Axios from 'axios';

import { PRODUCT_SERVER } from '../../Config';

const { Title } = Typography;
const { TextArea } = Input;

const Category = [
    { key: 0, value: "T-Shirts" },
    { key: 1, value: "Hoddies" },
    { key: 2, value: "Books" },
    { key: 3, value: "Pens" },
    { key: 4, value: "Hats" },
    { key: 5, value: "Stickers" },
    { key: 6, value: "Other..." }
]

function UploadProductPage(props) {

    const [TitleValue, setTitleValue] = useState("")
    const [DescriptionValue, setDescriptionValue] = useState("")
    const [PriceValue, setPriceValue] = useState(0)
    const [CategoryValue, setCategoryValue] = useState(1)

    const [Images, setImages] = useState([])

    const onTitleChange = (event) => {
        setTitleValue(event.currentTarget.value)
    }

    const onDescriptionChange = (event) => {
        setDescriptionValue(event.currentTarget.value)
    }

    const onPriceChange = (event) => {
        setPriceValue(event.currentTarget.value)
    }

    const onCategorySelectChange = (event) => {
        setCategoryValue(event.currentTarget.value)
    }

    const updateImages = (newImages) => {
        setImages(newImages)
    }

    const onSubmit = (event) => {
        event.preventDefault();

        if (!TitleValue || !DescriptionValue || !PriceValue ||
            !CategoryValue || !Images) {
            return alert('fill all the fields first!')
        }

        const variables = {
            writer: props.user.userData._id,
            title: TitleValue,
            description: DescriptionValue,
            price: PriceValue,
            images: Images,
            category: CategoryValue,
        }

        Axios.post(`${PRODUCT_SERVER}/uploadProduct`, variables)
            .then(response => {
                if (response.data.success) {
                    alert('Product Successfully Uploaded')
                    props.history.push('/')
                } else {
                    alert('Failed to upload Product')
                }
            })
    }

    return (
        <div style={{ maxWidth: '700px', margin: '2rem auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                <Title level={2}> Upload New Swag</Title>
            </div>

            <Form onSubmit={onSubmit} >

                {/* DropZone */}
                <FileUpload refreshFunction={updateImages} />

                <br />
                <br />
                <label>Title</label>
                <Input
                    onChange={onTitleChange}
                    value={TitleValue}
                />
                <br />
                <br />
                <label>Description</label>
                <TextArea
                    onChange={onDescriptionChange}
                    value={DescriptionValue}
                />
                <br />
                <br />
                <label>Price($)</label>
                <Input
                    onChange={onPriceChange}
                    value={PriceValue}
                    type="number"
                />
                <br /><br />
                <select onChange={onCategorySelectChange} value={CategoryValue}>
                    {Category.map(item => (
                        <option key={item.key} value={item.key}>{item.value} </option>
                    ))}
                </select>
                <br />
                <br />

                <Button
                    onClick={onSubmit}
                > Submit
                </Button>

            </Form>

        </div>
    )
}

export default UploadProductPage
