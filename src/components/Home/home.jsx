import React, { useEffect, useState } from 'react'
import "./home.css"
import GenericApiService from './../../services/GenericApiService';

export const Home = () => {

	const [bestProductsCount, setBestProductsCount] = useState(0)
	const [bestCommentsCount, setBestCommentsCount] = useState(0)
	const [bestStoresCount, setBestStoresCount] = useState(0)

	const [products, setProducts] = useState([])
	const [stores, setStores] = useState([])
	const [comments, setComments] = useState([])


	const genericApiService = new GenericApiService();

	useEffect(() => {

		const getSettings = async () => {
			const res = await genericApiService.get('/Settings/GetAll?PageNumber=1&PageSize=100')
			var besProductsCount = res.data.data.items.find(item => item.name === "BestProductsViewCount");
			var bestCommentsCount = res.data.data.items.find(item => item.name === "BestCommentsViewCount");
			var bestStoresCount = res.data.data.items.find(item => item.name === "BestStoresViewCount");

			setBestProductsCount(besProductsCount > 0 ? besProductsCount : 10);
			setBestCommentsCount(bestCommentsCount > 0 ? bestCommentsCount : 10);
			setBestStoresCount(bestStoresCount > 0 ? bestStoresCount : 10);
		}

		getSettings()
	}, [genericApiService])

	useEffect(() => {
		const getProducts = async () => {
			const res = await genericApiService.get('/Product/GetAll?PageNumber=1&PageSize=' + bestProductsCount)
			setProducts(res?.data?.data.items);
		}

		const getComments = async () => {
			const res = await genericApiService.get('/Comment/GetAll?PageNumber=1&PageSize=' + bestCommentsCount)
			setComments(res?.data?.data.items);
		}

		const getStores = async () => {
			const res = await genericApiService.get('/Store/GetAll?PageNumber=1&PageSize=' + bestStoresCount)
			setStores(res?.data?.data.items);
		}

		getProducts();
		getComments();
		getStores();
	}, [bestProductsCount, genericApiService, bestCommentsCount, bestStoresCount])

	return (
		<div className='subHome'>
			<h1 className='mt-5 mx-1 text-center'>Best Products</h1>
			<div className="row">

				{
					products?.map((product) => (
						<div className="col-sm">
							<div className="card" style={{ width: "18rem" }}>
								<img className="card-img-top" alt='' />
								<div className="card-body">
									<h5 className="card-title">{product.name} | {product.brandName}</h5>
									<p className="card-text">{product.description}</p>
									<span className="card-text">{product.barcode}</span> <p></p>
									<a href="/" className="btn btn-primary">Go somewhere</a>
								</div>
							</div>
						</div>
					))

				}

			</div>

			<h1 className='mt-5 mx-1 text-center'>Best Stores</h1>
			<div className="row">
				<div className="col-sm">
					<div className="card" style={{ width: "18rem" }}>
						<img className="card-img-top" alt='' />
						<div className="card-body">
							<h5 className="card-title">Card title</h5>
							<p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
							<a href="/" className="btn btn-primary">Go somewhere</a>
						</div>
					</div>
				</div>
				<div className="col-sm">
					<div className="card" style={{ width: "18rem" }}>
						<img className="card-img-top" alt='' />
						<div className="card-body">
							<h5 className="card-title">Card title</h5>
							<p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
							<a href="/" className="btn btn-primary">Go somewhere</a>
						</div>
					</div>
				</div>
				<div className="col-sm">
					<div className="card" style={{ width: "18rem" }}>
						<img className="card-img-top" alt='' />
						<div className="card-body">
							<h5 className="card-title">Card title</h5>
							<p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
							<a href="/" className="btn btn-primary">Go somewhere</a>
						</div>
					</div>
				</div>
				<div className="col-sm">
					<div className="card" style={{ width: "18rem" }}>
						<img className="card-img-top" alt='' />
						<div className="card-body">
							<h5 className="card-title">Card title</h5>
							<p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
							<a href="/" className="btn btn-primary">Go somewhere</a>
						</div>
					</div>
				</div>
			</div>
			<div className="row">
				<div className="col-sm">
					<div className="card" style={{ width: "18rem" }}>
						<img className="card-img-top" alt='' />
						<div className="card-body">
							<h5 className="card-title">Card title</h5>
							<p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
							<a href="/" className="btn btn-primary">Go somewhere</a>
						</div>
					</div>
				</div>
				<div className="col-sm">
					<div className="card" style={{ width: "18rem" }}>
						<img className="card-img-top" alt='' />
						<div className="card-body">
							<h5 className="card-title">Card title</h5>
							<p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
							<a href="/" className="btn btn-primary">Go somewhere</a>
						</div>
					</div>
				</div>
				<div className="col-sm">
					<div className="card" style={{ width: "18rem" }}>
						<img className="card-img-top" alt='' />
						<div className="card-body">
							<h5 className="card-title">Card title</h5>
							<p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
							<a href="/" className="btn btn-primary">Go somewhere</a>
						</div>
					</div>
				</div>
				<div className="col-sm">
					<div className="card" style={{ width: "18rem" }}>
						<img className="card-img-top" alt='' />
						<div className="card-body">
							<h5 className="card-title">Card title</h5>
							<p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
							<a href="/" className="btn btn-primary">Go somewhere</a>
						</div>
					</div>
				</div>
			</div>
			<div className="row">
				<div className="col-sm">
					<div className="card" style={{ width: "18rem" }}>
						<img className="card-img-top" alt='' />
						<div className="card-body">
							<h5 className="card-title">Card title</h5>
							<p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
							<a href="/" className="btn btn-primary">Go somewhere</a>
						</div>
					</div>
				</div>
				<div className="col-sm">
					<div className="card" style={{ width: "18rem" }}>
						<img className="card-img-top" alt='' />
						<div className="card-body">
							<h5 className="card-title">Card title</h5>
							<p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
							<a href="/" className="btn btn-primary">Go somewhere</a>
						</div>
					</div>
				</div>
				<div className="col-sm">
					<div className="card" style={{ width: "18rem" }}>
						<img className="card-img-top" alt='' />
						<div className="card-body">
							<h5 className="card-title">Card title</h5>
							<p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
							<a href="/" className="btn btn-primary">Go somewhere</a>
						</div>
					</div>
				</div>
				<div className="col-sm">
					<div className="card" style={{ width: "18rem" }}>
						<img className="card-img-top" alt='' />
						<div className="card-body">
							<h5 className="card-title">Card title</h5>
							<p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
							<a href="/" className="btn btn-primary">Go somewhere</a>
						</div>
					</div>
				</div>
			</div>

			<h1 className='mt-5 mx-1 text-center'>Best Comments</h1>
			<div className="row">
				<div className="col-sm">
					<div className="card" style={{ width: "18rem" }}>
						<img className="card-img-top" alt='' />
						<div className="card-body">
							<h5 className="card-title">Card title</h5>
							<p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
							<a href="/" className="btn btn-primary">Go somewhere</a>
						</div>
					</div>
				</div>
				<div className="col-sm">
					<div className="card" style={{ width: "18rem" }}>
						<img className="card-img-top" alt='' />
						<div className="card-body">
							<h5 className="card-title">Card title</h5>
							<p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
							<a href="/" className="btn btn-primary">Go somewhere</a>
						</div>
					</div>
				</div>
				<div className="col-sm">
					<div className="card" style={{ width: "18rem" }}>
						<img className="card-img-top" alt='' />
						<div className="card-body">
							<h5 className="card-title">Card title</h5>
							<p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
							<a href="/" className="btn btn-primary">Go somewhere</a>
						</div>
					</div>
				</div>
				<div className="col-sm">
					<div className="card" style={{ width: "18rem" }}>
						<img className="card-img-top" alt='' />
						<div className="card-body">
							<h5 className="card-title">Card title</h5>
							<p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
							<a href="/" className="btn btn-primary">Go somewhere</a>
						</div>
					</div>
				</div>
			</div>
			<div className="row">
				<div className="col-sm">
					<div className="card" style={{ width: "18rem" }}>
						<img className="card-img-top" alt='' />
						<div className="card-body">
							<h5 className="card-title">Card title</h5>
							<p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
							<a href="/" className="btn btn-primary">Go somewhere</a>
						</div>
					</div>
				</div>
				<div className="col-sm">
					<div className="card" style={{ width: "18rem" }}>
						<img className="card-img-top" alt='' />
						<div className="card-body">
							<h5 className="card-title">Card title</h5>
							<p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
							<a href="/" className="btn btn-primary">Go somewhere</a>
						</div>
					</div>
				</div>
				<div className="col-sm">
					<div className="card" style={{ width: "18rem" }}>
						<img className="card-img-top" alt='' />
						<div className="card-body">
							<h5 className="card-title">Card title</h5>
							<p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
							<a href="/" className="btn btn-primary">Go somewhere</a>
						</div>
					</div>
				</div>
				<div className="col-sm">
					<div className="card" style={{ width: "18rem" }}>
						<img className="card-img-top" alt='' />
						<div className="card-body">
							<h5 className="card-title">Card title</h5>
							<p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
							<a href="/" className="btn btn-primary">Go somewhere</a>
						</div>
					</div>
				</div>
			</div>
			<div className="row">
				<div className="col-sm">
					<div className="card" style={{ width: "18rem" }}>
						<img className="card-img-top" alt='' />
						<div className="card-body">
							<h5 className="card-title">Card title</h5>
							<p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
							<a href="/" className="btn btn-primary">Go somewhere</a>
						</div>
					</div>
				</div>
				<div className="col-sm">
					<div className="card" style={{ width: "18rem" }}>
						<img className="card-img-top" alt='' />
						<div className="card-body">
							<h5 className="card-title">Card title</h5>
							<p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
							<a href="/" className="btn btn-primary">Go somewhere</a>
						</div>
					</div>
				</div>
				<div className="col-sm">
					<div className="card" style={{ width: "18rem" }}>
						<img className="card-img-top" alt='' />
						<div className="card-body">
							<h5 className="card-title">Card title</h5>
							<p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
							<a href="/" className="btn btn-primary">Go somewhere</a>
						</div>
					</div>
				</div>
				<div className="col-sm">
					<div className="card" style={{ width: "18rem" }}>
						<img className="card-img-top" alt='' />
						<div className="card-body">
							<h5 className="card-title">Card title</h5>
							<p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
							<a href="/" className="btn btn-primary">Go somewhere</a>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
