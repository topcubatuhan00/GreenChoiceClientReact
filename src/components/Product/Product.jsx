import React, { useState, useEffect } from 'react';
import "./Product.css";
import GenericApiService from './../../services/GenericApiService';
import { useNavigate } from "react-router-dom";

export const Product = () => {

	const [products, setProducts] = useState([]);
	const [pageNumber, setPageNumber] = useState(1);
	const [totalPages, setTotalPages] = useState(0);
	const [pageElements, setPageElements] = useState([]);
	let navigate = useNavigate();

	const getProducts = async () => {
		const apiService = new GenericApiService();
		var res = await apiService.get(`/Product/GetAll?PageNumber=${pageNumber}&PageSize=5`);
		if (res.data.data.items.length > 0) {
			setProducts(res.data.data.items)
			setTotalPages(res.data.data.totalPages);
		}
	}

	useEffect(() => {
		getProducts();
	}, [pageNumber]);

	useEffect(() => {
		const newPageElements = [];
		for (let i = 1; i <= totalPages; i++) {
			newPageElements.push(
				<li className="page-item" key={i}>
					<button onClick={() => setPageNumber(i)} className={`page-link text-dark`}>{i}</button>
				</li>
			);
		}
		setPageElements(newPageElements);
	}, [totalPages]);


	const renderStarts = (score) => {
		score = Math.round(score);
		const starElements = [];
		for (let i = 1; i <= score; i++) {
			starElements.push(
				<li className="list-inline-item m-0"><i className="fa fa-star text-success" style={{fontSize: '15px'}}></i></li>
			)
		}

		for (let i = 1; i <= 5 - score; i++) {
			starElements.push(
				<li className="list-inline-item m-0"><i className="fa fa-star text-gray" style={{fontSize: '15px'}}></i></li>
			)
		}
		return starElements;
	}


	return (
		<div className='h-100'>
			<div class="py-5">
			<h1 className='text-center'>Products</h1>
				<div class="row">
					<div class="col-lg-8 mx-auto">
						<ul class="list-group">
							{
								products.map((product) => (
									<li class="list-group-item m-4 shadow" style={{cursor:'pointer'}} onClick={() => navigate(`${product.id}`)}>
										<div class="media align-items-lg-center flex-column flex-lg-row p-3">
											<div class="media-body order-2 order-lg-1">
												<h5 class="mt-0 font-weight-bold mb-2">{product.name}</h5>
												<p class="font-italic text-muted mb-0 small">{product.description}</p>
												<div class="d-flex align-items-center justify-content-between mt-1">
													<h6 class="font-weight-bold my-2"> </h6>
													<ul class="list-inline small">
														{renderStarts(product.averageScore)}
													</ul>
												</div>
											</div><i className='fas fa-cubes'></i>
										</div>
									</li>
								))
							}
						</ul >

					</div>
				</div>
			</div>

			<nav className='mr-4'>
				<ul className="pagination justify-content-end">
					<li className={`page-item ${pageNumber === 1 ? 'disabled' : ''}`}>
						<button className="page-link text-dark" onClick={() => setPageNumber(pageNumber - 1)}>Previous</button>
					</li>
					{pageElements}
					<li className={`page-item ${pageNumber === totalPages ? 'disabled' : ''}`}>
						<button onClick={() => setPageNumber(pageNumber + 1)} className="page-link text-dark">Next</button>
					</li>
				</ul>
			</nav>
		</div>
	)
}
