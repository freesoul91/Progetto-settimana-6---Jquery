const arrayCards = [{
		imgSrc: 'img/amare.png',
		name: 'amare'
	},
	{
		imgSrc: 'img/amare.png',
		name: 'amare'
	},
	{
		imgSrc: 'img/amare1.png',
		name: 'amare1'
	},
	{
		imgSrc: 'img/amare1.png',
		name: 'amare1'
	},
	{
		imgSrc: 'img/arrabbiato.png',
		name: 'arrabbiato'
	},
	{
		imgSrc: 'img/arrabbiato.png',
		name: 'arrabbiato'
	},
	{
		imgSrc: 'img/bello.png',
		name: 'bello'
	},
	{
		imgSrc: 'img/bello.png',
		name: 'bello'
	},
	{
		imgSrc: 'img/piangere.png',
		name: 'piangere'
	},
	{
		imgSrc: 'img/piangere.png',
		name: 'piangere'
	},
	{
		imgSrc: 'img/ridere.png',
		name: 'ridere'
	},
	{
		imgSrc: 'img/ridere.png',
		name: 'ridere'
	},
	{
		imgSrc: 'img/shock.png',
		name: 'shock'
	},
	{
		imgSrc: 'img/shock.png',
		name: 'shock'
	},
	{
		imgSrc: 'img/spavento.png',
		name: 'spavento'
	},
	{
		imgSrc: 'img/spavento.png',
		name: 'spavento'
	},
];

$(() => {
	const playerLivesCount = $('.playerLivesCount');
	let playerLives = 17;
	playerLivesCount.text(playerLives);
	const modale = $('#modal');

	const clickNumbers = $('.clickNumbers');
	let totalClicks = 0;
	clickNumbers.text(totalClicks);


	const container = $('.container');
	$('<section></section>').css({
		'margin': '1em',
		'display': 'grid',
		'grid-template-columns': 'repeat(4, 8rem)',
		'grid-template-rows': 'repeat (4, 8rem)',
		'grid-gap': '0.3rem',
		'perspective': '800px',
	}).appendTo(container);


	function shuffle(a) {
		var currentIndex = a.length;
		var temporaryValue, randomIndex;
		while (currentIndex !== 0) {
			randomIndex = Math.floor(Math.random() * currentIndex);
			currentIndex -= 1;
			temporaryValue = a[currentIndex];
			a[currentIndex] = a[randomIndex];
			a[randomIndex] = temporaryValue;
		}
		return a;
	}


	const cardGenerator = () => {
		const cardData = shuffle(arrayCards);



		cardData.forEach(function (item) {
			const card = $('<div></div>');
			const face = $('<img>');
			const back = $('<div></div>').css({
				'background': 'rgb(20, 20, 20)',
				'position': 'absolute',
				'top': '0',
				'backface-visibility': 'hidden',
			});
			card.addClass('card');
			face.addClass('face');
			back.addClass('back');

			face.attr('src', item.imgSrc);
			card.attr('name', item.name);
			card.attr('data-card-value', item.name);

			card.appendTo('section');
			face.appendTo(card);
			back.appendTo(card);

			card.on('click', (e) => {
				card.toggleClass('toggleCard');
				totalClicks += 1;
				clickNumbers.text(totalClicks);

				checkCards(e);
			});
		});
	};

	const checkCards = function (e) {
		const clickedCard = e.target;
		console.log(clickedCard);
		clickedCard.classList.add('flipped');
		const flippedCards = $('.flipped');
		const toggleCard = $('.toggleCard');
		console.log(toggleCard);

		if (flippedCards.length == 2) {
			if (flippedCards.first().data('cardValue') === flippedCards.last().data('cardValue')) {

				flippedCards.each(function () {
					flippedCards.removeClass('flipped');
					flippedCards.css('pointer-events', 'none');
				});
			} else {
				flippedCards.each(function () {
					flippedCards.removeClass('flipped');
					setTimeout(function () {
						flippedCards.removeClass('toggleCard')
					}, 1000);
				});
				playerLives--;
				playerLivesCount.text(playerLives);
				if (playerLives == 0) {
					alert('Hai perso! Ritenta!');
					window.location.reload()
				};
			};
		};

		if (toggleCard.length === 16) {
			modale.show();
		};
	};
	cardGenerator();


});