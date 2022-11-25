let categories = new Set();

categoryItems = document.querySelector('.container__categories-item');
const ul = document.querySelector('.section__product');

(async () => {
	try {
		await fetch('https://fakestoreapi.com/products')
			.then(res => {
				return res.json();
			})
			.then(data => {
				let selectedProduct = data;
				const renderItems = data => {
					ul.innerHTML = '';
					for (const item of Object.values(data)) {
						const list = document.createDocumentFragment();
						let li = document.createElement('li');
						let title = document.createElement('h2');
						let price = document.createElement('div');
						let category = document.createElement('span');
						let description = document.createElement('h4');
						let image = document.createElement('img');
						let button = document.createElement('button');
						let priceSale = document.createElement('h3');
						let priceSaleInfo = document.createElement('h5');
						//-----
						console.log(item);
						priceSaleInfo.innerHTML = 'Sale!';
						title.innerHTML = `${item.title}`;
						price.innerHTML = `${item.price}  $`;
						priceSale.innerHTML = `${(item.price * 0.8).toFixed(2)} $`;
						category.innerHTML = `${item.category}`;
						description.innerHTML = `${item.description}`;
						image.innerHTML = `${item.image}`;
						button.innerHTML = 'add to cart';

						li.appendChild(priceSaleInfo);
						li.append(image);
						image.src = item.image;
						image.alt = `${item.title}`;
						li.appendChild(title);
						li.appendChild(category);
						li.appendChild(description);
						li.appendChild(price);
						li.appendChild(priceSale);
						li.appendChild(button);
						list.appendChild(li);
						ul.appendChild(list);

						function promotionRandomProduct() {
							let rand = Math.round(Math.random() * 10);
							if (rand > 9) {
								item.id = priceSaleInfo.classList.toggle('isActive');
								+priceSale.classList.toggle('isActive') + price.classList.toggle('isActive');
							}
						}
						promotionRandomProduct();
					}
				};
				document.onload = renderItems(data);
				const functionality = () => {
					data.map(function (item) {
						categories.add(item.category);
					});
					categories = ['All', ...categories];
					categories.forEach((category, value) => {
						const newCategories = document.createElement('button');
						newCategories.innerHTML = category[0].toUpperCase() + category.slice(1).toLowerCase();
						newCategories.dataset.category = category;
						value === 0 ? newCategories.classList.add('isActive') : '';

						categoryItems.appendChild(newCategories);
					});

					categoriesButtons = document.querySelectorAll('.container__categories-item button');
					categoriesButtons.forEach(btn =>
						btn.addEventListener('click', e => {
							let category = e.target.dataset.category;

							categoriesButtons.forEach(btn => btn.classList.remove('isActive'));
							e.target.classList.add('isActive');

							selectedProduct = data;
							if (category === 'All') {
								selectedProduct = data;
							} else {
								selectedProduct = selectedProduct.filter(item => item.category === category);
							}
							console.log('click', category, selectedProduct);
							renderItems(selectedProduct);
						})
					);
				};
				functionality();

				const searchInput = document.querySelector('.search__bar-input');
				searchInput.addEventListener('input', e => {
					const search = e.target.value;
					const foundProducts = selectedProduct.filter(product => {
						if (product.title.toLowerCase().includes(search.toLowerCase())) {
							return product;
						}
					});
					const emptyState = document.querySelector('.empty-state');
					const promotionText = document.querySelector('#promotion');
					foundProducts.length === 0 ? emptyState.classList.add('isActive') : emptyState.classList.remove('isActive');
					foundProducts.length === 0
						? promotionText.classList.add('isActive')
						: promotionText.classList.remove('isActive');
					renderItems(foundProducts);
				});
			});
	} catch (error) {
		let container = document.querySelector('.container');
		container.classList.add('isActive');
		document.getElementById('err').innerHTML = error;
	}
})();
