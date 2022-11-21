let response = fetch('https://fakestoreapi.com/products')
	.then(res => {
		return res.json();
	})
	.then(data => {
		let items = data;
		items.map(function (item) {
			item.innerHTML = '';
			const ul = document.querySelector('.section__product');
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
		});
	})
	.catch(function (error) {
		let container = document.querySelector('.container');
		container.classList.add('isActive');
		document.getElementById('err').innerHTML = error;
	});
