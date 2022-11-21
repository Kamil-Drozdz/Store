let categories = new Set();
categoryItems = document.querySelector('.container__categories-item');

fetch('https://fakestoreapi.com/products')
	.then(res => {
		return res.json();
	})
	.then(data => {
		data;
		data.map(function (item) {
			categories.add(item.category);
		});
		categories = ['All', ...categories];
		categories.forEach((category, index) => {
			const newCategories = document.createElement('button');
			newCategories.innerHTML = category[0].toUpperCase() + category.slice(1).toLowerCase();
			newCategories.dataset.category = category;
			index === 0 ? newCategories.classList.add('isActive') : '';

			categoryItems.appendChild(newCategories);
		});
		categoriesButtons = document.querySelectorAll('.container__categories-item button');
		categoriesButtons.forEach(btn =>
			btn.addEventListener('click', e => {
				const category = e.target.dataset.category;
				const selectedCategory = data.filter(item => {
					if (item.category === category) {
						return item;
					}
				});
				console.log(selectedCategory);
				data(selectedCategory);
			})
		);
	})
	.catch(function (error) {
		let container = document.querySelector('.container');
		container.classList.add('isActive');
		document.getElementById('err').innerHTML = error;
	});
