fetch('https://fakestoreapi.com/products')
	.then(res => res.json())
	.then(data => {
		let items = data;
		items.map(function (item) {
			const ul = document.querySelector('.section__product');
			const list = document.createDocumentFragment();
			let li = document.createElement('li');
			let id = document.createElement('p');
			let title = document.createElement('h2');
			let price = document.createElement('h3');
			let category = document.createElement('span');
			let description = document.createElement('h4');
			let image = document.createElement('img');
			let button = document.createElement('button');

			innerHTML = 'Produkt';
			id.innerHTML = `${item.id}`;
			title.innerHTML = `${item.title}`;
			price.innerHTML = `${item.price}  zł`;
			category.innerHTML = `${item.category}`;
			description.innerHTML = `${item.description}`;
			image.innerHTML = `${item.image}`;
			button.innerHTML = 'Dodaj do koszyka';
			li.append(image);
			image.alt = 'image';
			li.appendChild(id);
			li.appendChild(title);
			li.appendChild(price);
			li.appendChild(category);
			li.appendChild(description);
			image.src = item.image;
			li.appendChild(button);
			list.appendChild(li);
			ul.appendChild(list);
		});
	})
	.catch(function (error) {
		console.log(error);
	});
