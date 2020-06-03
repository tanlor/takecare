import { CountUp } from './CountUp.min.js';

// Fetch and apply guild stats
// =======================================

fetch(`https://api.allorigins.win/get?url=${encodeURIComponent('https://gameinfo.albiononline.com/api/gameinfo/guilds/x8pr49RnSimilkapwLA3SQ/data')}`)
		.then(response => {
			if (response.ok) return response.json()
			throw new Error('Network response was not ok.')
		})
		.then(data => {
			let obj = JSON.parse(data.contents)
		  //document.getElementById('stats-player-kills').innerHTML = `${obj.overall.kills.toLocaleString()}`

			const countMembers = new CountUp('stats-member-count', obj.basic.memberCount, {'duration': 8} );
			countMembers.start();

			const countKills = new CountUp('stats-player-kills', obj.overall.kills, {'duration': 8});
			countKills.start();

			const countKillFame = new CountUp('stats-kill-fame', obj.guild.killFame, {'duration': 8});
			countKillFame.start();

			document.getElementById('stats-ratio').innerHTML = `${obj.overall.ratio}`
			 });

// Change text every 3 seconds
// =======================================
	 const words = [
		 'Dominate',
		 'Conquer',
		 'Fight',
		 'Improve'
	 ];

	 let count = 0;

	 function changeWords() {
		 let titleWord = words[count];
		 count++;
		 document.getElementById('titleWordHTML').innerHTML = `${titleWord}`;
		 count > words.length - 1 ? count = 0 : null;
	 }

	 changeWords();
	 window.setInterval(changeWords, 4000);

// Navbar change
// =======================================

	 $(window).scroll( () =>
			($(document).scrollTop() > 850 ) ? $('navbar').addClass('stretch') : $('navbar').removeClass('stretch')
	 );

	 
// Mobile Navbar
// =======================================
	let show = true;
	const menuSection = document.querySelector('.navbar');
	const menuButton = document.querySelector('.navbar-mobile-menu-icon');

	menuButton.addEventListener("click", () => {
		menuSection.classList.toggle("on", show);
		show = !show;
	});