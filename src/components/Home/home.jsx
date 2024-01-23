import React, { useEffect, useState } from 'react'
import "./home.css"
import GenericApiService from './../../services/GenericApiService';

export const Home = () => {
	const [products, setProducts] = useState([]);
	const [stores, setStores] = useState([]);
	const [comments, setComments] = useState([]);

	useEffect(() => {

		const genericApiService = new GenericApiService();

		const fetchProducts = async () => {
			const res = await genericApiService.get('/Product/GetAllForHomePage')
			if (res.errors !== null) {
				setProducts(res.data.data);
			}
		};

		const fetchComments = async () => {
			const res = await genericApiService.get('/Comment/GetAllForHomePage')
			if (res.errors !== null) {
				setComments(res.data.data);
			}
		};

		const fetchStores = async () => {
			const res = await genericApiService.get('/Store/GetAllForHomePage')
			if (res.errors !== null) {
				setStores(res.data.data);
			}
		};

		fetchProducts();
		fetchComments();
		fetchStores();
	}, []);

	return (
		<div className='subHome'>
			<h1 className='mt-5 mx-1 text-center'>Best Products</h1>
			<div className="row">
				{
					products?.map((product) => (
						<div key={product.id} className="col-sm">
							<div className="card" style={{ width: "50vh" }}>
								<div className="card-body">
									<p className="card-text text-center w-100">{product.name}</p>
									<hr />
									<span className="bestItemsSpan">
										<div className='colorizedBack'><i className="fas fa-globe fs-5 mx-2"></i>{product.brandName}</div>
										<div className='colorizedBackOwner'><i className='fas fa-user fs-5 mx-2'></i>{product.creatorName}</div>
									</span>
								</div>
							</div>
						</div>
					))
				}
			</div>

			<h1 className='mt-5 mx-1 text-center'>Best Stores</h1>
			<div className="row">
				{
					stores?.map((stores) => (
						<div key={stores.id} className="col-sm">
							<div className="card" style={{ width: "50vh" }}>
								<div className="card-body">
									<p className="card-text text-center w-100">{stores.name}</p>
									<hr />

									<div className='colorizedBack w-100'><i className="fas fa-phone fs-5 mx-2"></i>{stores.phoneNumber}</div>
									<div className='colorizedBackOwner mt-2'><i className='fas fa-home fs-5 mx-2'></i>{stores.address}</div>

								</div>
							</div>
						</div>
					))
				}
			</div>

			<h1 className='mt-5 mx-1 text-center'>Best Comments</h1>
			<div className="row">
				{
					comments?.map((comment) => (
						<div key={comment.id} className="col-sm">
							<div className="card" style={{ width: "50vh" }}>
								<div className="card-body">
									<p className="card-text text-center w-100">{comment.text}</p>
									<hr />
									<span className="bestItemsSpan">
										<div className='colorizedBack'><i className="fas fa-bookmark fs-5 mx-2"></i>{comment.productName}</div>
										<div className='colorizedBackOwner'><i className='fas fa-user fs-5 mx-2'></i>{comment.userName}</div>
									</span>
								</div>
							</div>
						</div>
					))
				}
			</div>
		</div>
	)
}
