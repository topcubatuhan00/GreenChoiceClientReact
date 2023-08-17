import React, { useEffect, useState } from 'react'
import "./home.css"
import GenericApiService from './../../services/GenericApiService';

export const Home = () => {
	const [bestProductsCount, setBestProductsCount] = useState();
	const [bestCommentsCount, setBestCommentsCount] = useState();
	const [bestStoresCount, setBestStoresCount] = useState();
	const [products, setProducts] = useState([]);
	const [stores, setStores] = useState([]);
	const [comments, setComments] = useState([]);
	const genericApiService = new GenericApiService();

	useEffect(() => {
		const fetchData = async () => {
			const res = await genericApiService.get('/Settings/GetAll?PageNumber=1&PageSize=100');
			const items = res.data.data.items;

			const bestProducts = items.find(item => item.name === "BestProductsViewCount");
			const bestComments = items.find(item => item.name === "BestCommentsViewCount");
			const bestStores = items.find(item => item.name === "BestStoresViewCount");

			setBestProductsCount(bestProducts ? bestProducts.value : 10);
			setBestCommentsCount(bestComments ? bestComments.value : 10);
			setBestStoresCount(bestStores ? bestStores.value : 10);
		};

		fetchData();
	}, []);

	useEffect(() => {
		const fetchData = async () => {
			const res = bestProductsCount > 0 && await genericApiService.get('/Product/GetAll?PageNumber=1&PageSize=' + bestProductsCount);
			if (res.code !== "ERR_NETWORK" && res.data !== null && res.data !== undefined) {
				setProducts(res.data.data.items);
			}
		};

		fetchData();
	}, [bestProductsCount, genericApiService]);

	useEffect(() => {
		const fetchData = async () => {
			const res = bestCommentsCount > 0 && await genericApiService.get('/Comment/GetAll?PageNumber=1&PageSize=' + bestCommentsCount);
			if (res.code !== "ERR_NETWORK" && res.data !== null && res.data !== undefined) {
				setComments(res.data.data.items);
			}
		};

		fetchData();
	}, [bestCommentsCount, genericApiService]);

	useEffect(() => {
		const fetchData = async () => {
			const res = bestStoresCount > 0 && await genericApiService.get('/Store/GetAll?PageNumber=1&PageSize=' + bestStoresCount);
			if (res.code !== "ERR_NETWORK" && res.data !== null && res.data !== undefined) {
				setStores(res.data.data.items);
			}
		};

		fetchData();
	}, [bestStoresCount, genericApiService]);
	return (
		<div className='subHome'>
			<h1 className='mt-5 mx-1 text-center'>Best Products</h1>
			<div className="row">
				{
					products?.map((product) => (
						<div key={product.id} className="col-sm">
							<div className="card" style={{ width: "18rem" }}>
								<div className="card-body">
									<p className="card-text text-center w-100">{product.name}</p>
									<hr />
									<span className="d-flex justify-content-between align-items-center w-100">
										<div className='colorizedBack'><i className="fas fa-globe fs-5 mx-2"></i>{product.brandName}</div>
										<div className='colorizedBack'><i className='fas fa-user fs-5 mx-2'></i>{product.creatorName}</div>
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
							<div className="card" style={{ width: "18rem" }}>
								<div className="card-body">
									<p className="card-text text-center w-100">{stores.name}</p>
									<hr />

									<div className='colorizedBack w-100'><i className="fas fa-phone fs-5 mx-2"></i>{stores.phoneNumber}</div>
									<div className='colorizedBack mt-2'><i className='fas fa-home fs-5 mx-2'></i>{stores.address}</div>

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
							<div className="card" style={{ width: "18rem" }}>
								<div className="card-body">
									<p className="card-text text-center w-100">{comment.text}</p>
									<hr />
									<span className="d-flex justify-content-between align-items-center w-100">
										<div className='colorizedBack'><i className="fas fa-bookmark fs-5 mx-2"></i>{comment.productName}</div>
										<div className='colorizedBack'><i className='fas fa-user fs-5 mx-2'></i>{comment.userName}</div>
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
