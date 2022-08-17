import React, { useEffect, useState } from 'react';
import { Col, Card, Row } from 'antd';
import { RocketOutlined } from '@ant-design/icons';

import ImageSlider from '../../utils/ImageSlider';
import CheckBox from './Sections/CheckBox';
import RadioBox from './Sections/RadioBox';
import { category, price } from './Sections/Datas';
import SearchFeature from './Sections/SearchFeature';

import { getProducts } from '../../../_actions/user_actions';
import { useDispatch } from 'react-redux';

const { Meta } = Card;

function LandingPage() {
	const dispatch = useDispatch();

	const [Products, setProducts] = useState([]);
	const [Skip, setSkip] = useState(0);
	const [Limit, setLimit] = useState(8);
	const [PostSize, setPostSize] = useState();
	const [SearchTerms, setSearchTerms] = useState('');

	const [Filters, setFilters] = useState({
		category: [],
		price: [],
	});

	useEffect(() => {
		const variables = {
			skip: Skip,
			limit: Limit,
		};

		getProductsFromServer(variables);
	}, []);

	const getProductsFromServer = (variables) => {
		dispatch(getProducts(variables)).then((response) => {
			if (response.payload.success) {
				if (variables.loadMore) {
					setProducts([...Products, ...response.payload.products]);
				} else {
					setProducts([]);
					setProducts(response.payload.products);
				}
				setPostSize(response.payload.postSize);
			} else {
				alert('Failed to fectch product datas');
			}
		});
	};

	const onLoadMore = () => {
		let skip = Skip + Limit;

		const variables = {
			skip: skip,
			limit: Limit,
			loadMore: true,
			filters: Filters,
			searchTerm: SearchTerms,
		};
		getProductsFromServer(variables);
		setSkip(skip);
	};

	const renderCards = Products.map((product, index) => {
		return (
			<Col lg={6} md={8} xs={24}>
				<Card
					hoverable={true}
					cover={
						<a href={`/product/${product._id}`}>
							{' '}
							<ImageSlider images={product.images} />
						</a>
					}
				>
					<Meta title={product.title} description={`$${product.price}`} />
				</Card>
			</Col>
		);
	});

	const showFilteredResults = (filters) => {
		const variables = {
			skip: 0,
			limit: Limit,
			filters: filters,
		};
		getProductsFromServer(variables);
		setSkip(0);
	};

	const handlePrice = (value) => {
		const data = price;
		let array = [];

		for (let key in data) {
			if (data[key]._id === parseInt(value, 10)) {
				array = data[key].array;
			}
		}
		console.log('array', array);
		return array;
	};

	const handleFilters = (filters, category) => {
		const newFilters = { ...Filters };
		newFilters[category] = filters;

		if (category === 'price') {
			let priceValues = handlePrice(filters);
			newFilters[category] = priceValues;
		}

		console.log(newFilters);

		showFilteredResults(newFilters);
		setFilters(newFilters);
	};

	const updateSearchTerms = (newSearchTerm) => {
		const variables = {
			skip: 0,
			limit: Limit,
			filters: Filters,
			searchTerm: newSearchTerm,
		};

		setSkip(0);
		setSearchTerms(newSearchTerm);

		getProductsFromServer(variables);
	};

	return (
		<div style={{ width: '75%', margin: '3rem auto' }}>
			<div style={{ textAlign: 'center' }}>
				<h2>
					Check all the swag <RocketOutlined />
				</h2>
			</div>

			{/* Filter  */}

			<Row gutter={[16, 16]}>
				<Col lg={12} xs={24}>
					<CheckBox
						list={category}
						handleFilters={(filters) => handleFilters(filters, 'category')}
					/>
				</Col>
				<Col lg={12} xs={24}>
					<RadioBox
						list={price}
						handleFilters={(filters) => handleFilters(filters, 'price')}
					/>
				</Col>
			</Row>

			{/* Search  */}
			<div
				style={{
					display: 'flex',
					justifyContent: 'flex-end',
					margin: '1rem auto',
				}}
			>
				<SearchFeature refreshFunction={updateSearchTerms} />
			</div>

			{Products.length === 0 ? (
				<div
					style={{
						display: 'flex',
						height: '300px',
						justifyContent: 'center',
						alignItems: 'center',
					}}
				>
					<h2>No post yet...</h2>
				</div>
			) : (
				<div>
					<Row gutter={[16, 16]}>{renderCards}</Row>
				</div>
			)}
			<br />
			<br />

			{PostSize >= Limit && (
				<div style={{ display: 'flex', justifyContent: 'center' }}>
					<button onClick={onLoadMore}>Load More</button>
				</div>
			)}
		</div>
	);
}

export default LandingPage;
