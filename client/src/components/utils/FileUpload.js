import React, { useState } from 'react';
import Dropzone from 'react-dropzone';
import { PlusCircleOutlined } from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import { uploadImage } from '../../_actions/user_actions';

function FileUpload(props) {
	const dispatch = useDispatch();

	const [Images, setImages] = useState([]);
	const URL = process.env.REACT_APP_SERVER_URL;

	const onDrop = (files) => {
		let formData = new FormData();
		const config = {
			header: { 'content-type': 'multipart/form-data' },
		};
		formData.append('file', files[0]);

		dispatch(uploadImage(formData, config)).then((response) => {
			if (response.payload.success) {
				setImages([...Images, response.payload.image]);
				props.refreshFunction([...Images, response.payload.image]);
			} else {
				console.log(response);
				alert('Failed to save the Image in Server');
			}
		});
	};

	const onDelete = (image) => {
		const currentIndex = Images.indexOf(image);

		let newImages = [...Images];
		newImages.splice(currentIndex, 1);

		setImages(newImages);
		props.refreshFunction(newImages);
	};

	return (
		<div style={{ display: 'flex', justifyContent: 'space-between' }}>
			<Dropzone onDrop={onDrop} multiple={false} maxSize={800000000}>
				{({ getRootProps, getInputProps }) => (
					<div
						style={{
							width: '300px',
							height: '240px',
							border: '1px solid lightgray',
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'center',
						}}
						{...getRootProps()}
					>
						{console.log('getRootProps', { ...getRootProps() })}
						{console.log('getInputProps', { ...getInputProps() })}
						<input {...getInputProps()} />
						<PlusCircleOutlined style={{ fontSize: '200%' }} />
					</div>
				)}
			</Dropzone>

			<div
				style={{
					display: 'flex',
					width: '350px',
					height: '240px',
					overflowX: 'scroll',
				}}
			>
				{Images.map((image, index) => (
					<div onClick={() => onDelete(image)}>
						{URL}
						<img
							style={{ minWidth: '300px', width: '300px', height: '240px' }}
							src={`${URL}${image}`}
							alt={`productImg-${index}`}
						/>
					</div>
				))}
			</div>
		</div>
	);
}

export default FileUpload;
