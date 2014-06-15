$(document).ready(function() {
	$('#overlay').hide();
	var rload;
	cost = {
		from_trash: 0,
		hotdog: 3,
		from_mcdonald: 15,
		from_supermarket: 50,
		from_elite_restaurant: 100,

		sleep: 0,
		aspirin: 3,
		doctor_consultation: 15,
		hospital: 40,
		hospital_house: 100,

		house_box: 0,
		house_cellar: 70,
		house_hotel: 500,
		house_apartment: 50000,
		house_mansion: 100000,

		barefoot: 0,
		sneakers: 25,
		bicycle: 500,
		old_car: 5000,
		sport_car: 40000,

		knife: 15,
		gun: 300,
		rifle: 1500,
		bulletproof_vest: 5000,

		multiplication_table: 100,
		school: 8500,
		college: 20000,
		university: 90000,

		newbie: 100,
		gangster: 500,
		hitman: 2000,
		pickpocketing: 75,
		thief_in_law: 2000,

		driving_licence: 400,
		learn_laws: 10000,
		learn_economy: 10000,
		learn_management: 20000
	}
	require = {
		text: {
			r1: 'Buy Sneakers',
			r2: 'Learn Multiplication Table',
			r3: 'Rent Cellar',
			r4: 'Buy Bicycle',
			r5: 'Buy Old Car',
			r6: 'Obtain Driving Licence',
			r7: 'Rent Room in Hotel',
			r8: 'Study at School',
			r9: 'Study at College',
			r10: 'Learn Economy',
			r11: 'Learn Laws',
			r12: 'Study at University',
			r13: 'Buy Apartment',
			r14: 'Buy Mansion',
			r15: 'Learn Management'
		},
		code: {
			r1: 'sneakers',
			r2: 'multiplication_table',
			r3: 'house_cellar',
			r4: 'bicycle',
			r5: 'old_car',
			r6: 'driving_licence',
			r7: 'house_hotel',
			r8: 'school',
			r9: 'college',
			r10: 'learn_economy',
			r11: 'learn_laws',
			r12: 'university',
			r13: 'house_apartment',
			r14: 'house_mansion',
			r15: 'learn_management',
			r16: require.text.r4
		}
	}
	requireIs = {
		panhandle: [require.code.r1],
		wash_cars: [require.code.r1, require.code.r2, require.code.r3],
		work_in_mcdonald: [require.code.r1, require.code.r2, require.code.r3],
		postman: [require.code.r1, require.code.r2, require.code.r3, require.code.r4],
		driver: [require.code.r2, require.code.r3, require.code.r5, require.code.r6],
		factory_worker: [require.code.r7, require.code.r8],
		office_employee: [require.code.r7, require.code.r9, require.code.r10],
		departement_head: [require.code.r13, require.code.r12, require.code.r11, require.code.r10],
		head_of_company: [require.code.r14, require.code.r12, require.code.r11, require.code.r10, require.code.r15]
	}
	for (var prop in requireIs) {
		if (requireIs.hasOwnProperty(prop)) {
			for (var i = 0; i < requireIs[prop].length; i++) {
				console.log(requireIs[prop][i])
			}
			console.log('----')
		}
	}
	add_hunger = {
		from_trash: 5,
		hotdog: 20,
		from_mcdonald: 40,
		from_supermarket: 75,
		from_elite_restaurant: 100
	}
	add_health = {
		sleep: 5,
		aspirin: 20,
		doctor_consultation: 40,
		hospital: 75,
		hospital_house: 100
	}
	take_job_hunger = {
		panhandle: 2,
		wash_cars: 5,
		work_in_mcdonald: 2,
		postman: 4,
		driver: 5,
		factory_worker: 5,
		office_employee: 7,
		departement_head: 8,
		head_of_company: 9
	}
	take_job_health = {
		panhandle: 2,
		wash_cars: 5,
		work_in_mcdonald: 4,
		postman: 4,
		driver: 5,
		factory_worker: 6,
		office_employee: 7,
		departement_head: 8,
		head_of_company: 9
	}
	take_criminal_job_hunger = {
		steal_bicycle: 5,
		rob_old_people: 7,
		steal_cars: 7,
		sell_drugs: 8,
		kidnap: 10,
		kill_businessman: 10
	}
	take_criminal_job_health = {
		steal_bicycle: 5,
		rob_old_people: 2,
		steal_cars: 7,
		sell_drugs: 8,
		kidnap: 8,
		kill_businessman: 10
	}
	job_pay = {
		panhandle: 1,
		wash_cars: 5,
		work_in_mcdonald: 20,
		postman: 40,
		driver: 60,
		factory_worker: 120,
		office_employee: 300,
		departement_head: 800,
		head_of_company: 100000
	}
	criminal_job_pay = {
		steal_bicycle: 40,
		rob_old_people: 100,
		steal_cars: 200,
		sell_drugs: 500,
		kidnap: 700,
		kill_businessman: 1200
	}
	$('.button_action').each(function() {
		$('.m #val', this).text(cost[$(this).attr('addname')])
		$('.m #val', this).text(job_pay[$(this).attr('addname')])
		$('.m #val', this).text(criminal_job_pay[$(this).attr('addname')])
	});
	if (played())
		loadGame();
	else
		newGame();
	$('.button_action#plus.job').click(function() {
		money = parseInt(localStorage.getItem('money'));
		money_plus = job_pay[$(this).attr('addname')];
		if (canWork($(this).attr('addname'))) {
			localStorage.setItem('money', money + money_plus);
			money = localStorage.getItem('money');
			localStorage.setItem('health', parseInt(localStorage.getItem('health')) - take_job_health[$(this).attr('addname')])
			localStorage.setItem('hunger', parseInt(localStorage.getItem('hunger')) - take_job_hunger[$(this).attr('addname')])
			noti('good', 'Money + $' + money_plus);
			notis('normal', 'Food - ' + take_job_hunger[$(this).attr('addname')]);
			notis('normal', 'Health - ' + take_job_health[$(this).attr('addname')]);
		}
		setHTML();
	});
	$('.button_action#plus.criminal_job').click(function() {
		money = parseInt(localStorage.getItem('money'));
		money_plus = criminal_job_pay[$(this).attr('addname')];
		localStorage.setItem('money', money + money_plus);
		money = localStorage.getItem('money');
		localStorage.setItem('hunger', parseInt(localStorage.getItem('hunger')) - take_criminal_job_hunger[$(this).attr('addname')]);
		localStorage.setItem('health', parseInt(localStorage.getItem('health')) - take_criminal_job_health[$(this).attr('addname')]);
		noti('good', 'Money + $' + money_plus);
		notis('normal', 'Food - ' + take_criminal_job_health[$(this).attr('addname')]);
		notis('normal', 'Health - ' + take_criminal_job_hunger[$(this).attr('addname')]);
		setHTML();
	});
	$('.button_action#minus').click(function() {
		money = parseInt(localStorage.getItem('money'));
		money_minus = cost[$(this).attr('addname')];
		if (money >= money_minus) {
			localStorage.setItem('money', money - money_minus);
			money = localStorage.getItem('money');
			hunger = parseInt(localStorage.getItem('hunger'));
			if ($(this).attr('what') == 'hunger') {
				if (hunger > 0 && hunger <= 100) {
					if ((hunger + add_hunger[$(this).attr('addname')]) > 100) {
						localStorage.setItem('hunger', 100)
						noti('good', 'Food + ' + (100 - hunger))
					} else {
						localStorage.setItem('hunger', hunger + add_hunger[$(this).attr('addname')])
						noti('good', 'Food + ' + add_hunger[$(this).attr('addname')])
					}
					hunger = localStorage.getItem('hunger');
				};
			}
			if ($(this).attr('what') == 'health') {
				if (health > 0 && health <= 100) {
					if ((health + add_health[$(this).attr('addname')]) > 100) {
						localStorage.setItem('health', 100)
						noti('good', 'Health + ' + (100 - health));
					} else {
						localStorage.setItem('health', health + add_health[$(this).attr('addname')])
						noti('good', 'Health + ' + add_health[$(this).attr('addname')])
					}
					health = localStorage.getItem('health');
				};
			}
			if ($(this).hasClass('house')) {
				clearStorage('house');
				localStorage.setItem('house_rent_day', 0)
				localStorage.setItem($(this).attr('addname'), 1)
			}
			if ($(this).hasClass('only_once')) {
				localStorage.setItem($(this).attr('addname'), 1)
			}

			notis('normal', 'Money - $' + money_minus);
			setHTML();
		}
	});
	$('.button_action').click(function() {
		localStorage.setItem('count_day', parseInt(localStorage.getItem('count_day')) + 1)

		// Year Count
		if (parseInt(localStorage.getItem('count_day')) >= 365) {
			localStorage.setItem('count_year', parseInt(localStorage.getItem('count_year')) + 1)
			localStorage.setItem('count_day', 1)
		};

		// House Monthly
		if (localStorage.getItem('house_cellar') == 1 || localStorage.getItem('house_hotel') == 1) {
			localStorage.setItem('house_rent_day', parseInt(localStorage.getItem('house_rent_day')) + 1)
		};
		if (localStorage.getItem('house_rent_day') >= 30) {
			localStorage.setItem('house_rent_day', 0)
			if (localStorage.getItem('house_cellar') == 1) {
				notib('Renting Cellar <b>- $' + cost['house_cellar'] + '</b>')
				localStorage.setItem('money', parseInt(localStorage.getItem('money')) - cost['house_cellar'])
			} else if (localStorage.getItem('house_hotel') == 1) {
				notib('Renting Cellar <b>- $' + cost['house_hotel'] + '</b>')
				localStorage.setItem('money', parseInt(localStorage.getItem('money')) - cost['house_hotel'])
			};
			setHTML()
		};
		setHTML();
	})
	$('#overlay').click(function() {
		if ($(event.target).is('.btn', this)) {
			$('#overlay').empty();
			$('#overlay').fadeOut();
		}
	});
	$('#rload_page').click(function() {
		location.reload();
	})
});

function newGame() {
	localStorage.clear();
	// Money, Food, Health
	localStorage.setItem('money', 50);
	localStorage.setItem('hunger', 45);
	localStorage.setItem('health', 45);

	//Counting
	localStorage.setItem('count_day', 0);
	localStorage.setItem('count_year', 18);

	// House
	localStorage.setItem('house_box', 1);
	localStorage.setItem('house_cellar', 0);
	localStorage.setItem('house_hotel', 0);
	localStorage.setItem('house_apartment', 0);
	localStorage.setItem('house_mansion', 0);
	localStorage.setItem('house_rent_day', 0);

	// Transport
	localStorage.setItem('barefoot', 1);
	localStorage.setItem('sneakers', 0);
	localStorage.setItem('bicycle', 0);
	localStorage.setItem('old_car', 0);
	localStorage.setItem('sport_car', 0);

	// Weapon
	localStorage.setItem('knife', 0);
	localStorage.setItem('gun', 0);
	localStorage.setItem('rifle', 0);
	localStorage.setItem('bulletproof_vest', 0);

	// Education
	localStorage.setItem('multiplication_table', 0);
	localStorage.setItem('school', 0);
	localStorage.setItem('college', 0);
	localStorage.setItem('university', 0);

	// Criminal Skill
	localStorage.setItem('newbie', 0);
	localStorage.setItem('gangster', 0);
	localStorage.setItem('hitman', 0);
	localStorage.setItem('pickpocketing', 0);
	localStorage.setItem('thief_in_law', 0);

	// Additional Skills
	localStorage.setItem('driving_licence', 0);
	localStorage.setItem('learn_laws', 0);
	localStorage.setItem('learn_economy', 0);
	localStorage.setItem('learn_management', 0);

	setVar();
	$('#notif .noti').each(function() {
		$(this).hide()
	})
	$('.button_action.only_once').each(function() {
		$(this).removeClass('once')
	})
	noti('good', 'New Game Started');
	setHTML();
}

function loadGame() {
	setVar();
	noti('good', 'Welcome Back!')
	setHTML();
}

function alll() {
	for (var i = 0; i < localStorage.length; i++) {
		var key = localStorage.key(i);
		var val = localStorage.getItem(key);
		console.log(key + "   ::   " + val);
	}
}

function played() {
	if (localStorage.getItem('money') &&
		localStorage.getItem('hunger') &&
		localStorage.getItem('health'))
		return true;
	else
		return false;
}

function setHTML() {
	setVar();
	if (health <= 0) {
		localStorage.setItem('health', 0);
		health = localStorage.getItem('health');
	};
	if (hunger <= 0) {
		localStorage.setItem('hunger', 0);
		hunger = localStorage.getItem('hunger');
	};
	$('.val.all_money').text(nrC(money));
	$('#hunger #how_much').css('width', hunger + '%');
	$('#hunger .val').text(hunger);
	$('#health #how_much').css('width', health + '%');
	$('#health .val').text(health);

	setHouse();
	$('.content .button_action.buy').each(function() {
		if (money < cost[$(this).attr('addname')]) {
			$(this).attr('disabled', true)
		} else {
			$(this).attr('disabled', false)
		}
	})
	setOther();
	$('.count_day').text(count_day);
	$('.count_year').text(count_year);
	alive()
}

function alive() {
	var next = 1;
	if (hunger <= 0 || health <= 0) {
		notib('You Die!');
		newGame();
		next = 0;
	};
	if (next) {
		if (hunger < 20 && health < 20) {
			notib('Eat Something and Treat Yourself!')
			return;
		};
		if (hunger < 20) {
			notib('Eat Something!')
			return;
		};
		if (health < 20) {
			notib('Treat Yourself!')
			return;
		};
	}
}

function nrC(nber) {
	nber += '';
	x = nber.split('.');
	x1 = x[0];
	x2 = x.length > 1 ? '.' + x[1] : '';
	var rgx = /(\d+)(\d{3})/;
	while (rgx.test(x1)) {
		x1 = x1.replace(rgx, '$1' + ' ' + '$2');
	}
	return x1 + x2;
}

function noti(how, text) {
	$('#notif').append('<span><div class="noti ' + how + '">' + text + '</div></span>');
	$('#notif span').delay(5500).fadeOut('slow');
}

function notis(how, text) {
	$('#notif').append('<span><div class="noti ' + how + ' s">' + text + '</div></span>');
	$('#notif span').delay(5500).fadeOut('slow');
}

function notib(text) {
	$('#overlay').fadeIn('fast');
	if (text == 'You Die!') {
		o_class = "alert_text rload_page"
		$('#overlay').css('background-color', 'rgba(0, 0, 0, .99)')
	} else
		o_class = "alert_text"
	$('#overlay').html('<p class="' + o_class + '">' + text + '</p><button class="btn">OK</button>');
	$('#overlay .btn').focus()
}

function setHouse() {
	setVar();
	if (house_box) {
		$('.button_action[addname="house_box"]').attr('disabled', true);
		$('.button_action[addname="house_box"]').addClass('once');
		$('.live_house').html('Box')
	} else {
		$('.button_action[addname="house_box"]').attr('disabled', false);
		$('.button_action[addname="house_box"]').removeClass("once")
	}
	if (house_cellar) {
		$('.button_action[addname="house_cellar"]').attr('disabled', true);
		$('.button_action[addname="house_cellar"]').addClass('once');
		$('.live_house').html('Cellar<span> [day ' + localStorage.getItem("house_rent_day") + ']</span>')
	} else {
		$('.button_action[addname="house_cellar"]').attr('disabled', false);
		$('.button_action[addname="house_cellar"]').removeClass("once")
	}
	if (house_hotel) {
		$('.button_action[addname="house_hotel"]').attr('disabled', true);
		$('.button_action[addname="house_hotel"]').addClass('once');
		$('.live_house').html('Room in Hotel<span> [day ' + localStorage.getItem("house_rent_day") + ']</span>')
	} else {
		$('.button_action[addname="house_hotel"]').attr('disabled', false);
		$('.button_action[addname="house_hotel"]').removeClass("once")
	}
	if (house_apartment) {
		$('.button_action[addname="house_apartment"]').attr('disabled', true);
		$('.button_action[addname="house_apartment"]').addClass('once');
		$('.live_house').html('Apartment')
	} else {
		$('.button_action[addname="house_apartment"]').attr('disabled', false);
		$('.button_action[addname="house_apartment"]').removeClass("once")
	}
	if (house_mansion) {
		$('.button_action[addname="house_mansion"]').attr('disabled', true);
		$('.button_action[addname="house_mansion"]').addClass('once');
		$('.live_house').html('Mansion')
	} else {
		$('.button_action[addname="house_mansion"]').attr('disabled', false);
		$('.button_action[addname="house_mansion"]').removeClass("once")
	}
}

function setOther() {
	setVar();
	$('.button_action.only_once').each(function() {
		if (localStorage.getItem($(this).attr('addname')) == 1) {
			$(this).attr('disabled', true)
			$(this).addClass('once')
		}
	})
}

function setVar() {
	// Money, Eat, Food
	money = parseInt(localStorage.getItem('money'));
	hunger = parseInt(localStorage.getItem('hunger'));
	health = parseInt(localStorage.getItem('health'));

	// House
	house_box = parseInt(localStorage.getItem('house_box'));
	house_cellar = parseInt(localStorage.getItem('house_cellar'));
	house_hotel = parseInt(localStorage.getItem('house_hotel'));
	house_apartment = parseInt(localStorage.getItem('house_apartment'));
	house_mansion = parseInt(localStorage.getItem('house_mansion'));

	// Transport
	barefoot = parseInt(localStorage.getItem('barefoot'));
	sneakers = parseInt(localStorage.getItem('sneakers'));
	bicycle = parseInt(localStorage.getItem('bicycle'));
	old_car = parseInt(localStorage.getItem('old_car'));
	sport_car = parseInt(localStorage.getItem('sport_car'));

	// Weapon
	knife = parseInt(localStorage.getItem('knife'));
	gun = parseInt(localStorage.getItem('gun'));
	rifle = parseInt(localStorage.getItem('rifle'));
	bulletproof_vest = parseInt(localStorage.getItem('bulletproof_vest'));

	// Education
	multiplication_table = parseInt(localStorage.getItem('multiplication_table'));
	school = parseInt(localStorage.getItem('school'));
	college = parseInt(localStorage.getItem('college'));
	university = parseInt(localStorage.getItem('university'));

	// Criminal Skill
	newbie = parseInt(localStorage.getItem('newbie'));
	gangster = parseInt(localStorage.getItem('gangster'));
	hitman = parseInt(localStorage.getItem('hitman'));
	pickpocketing = parseInt(localStorage.getItem('pickpocketing'));
	thief_in_law = parseInt(localStorage.getItem('thief_in_law'));

	// Additional Skills
	driving_licence = parseInt(localStorage.getItem('driving_licence'));
	learn_laws = parseInt(localStorage.getItem('learn_laws'));
	learn_economy = parseInt(localStorage.getItem('learn_economy'));
	learn_management = parseInt(localStorage.getItem('learn_management'));

	//Counting
	count_day = parseInt(localStorage.getItem('count_day'));
	count_year = parseInt(localStorage.getItem('count_year'));
}

function clearStorage(what) {
	if (what == 'house') {
		localStorage.setItem('house_box', 0);
		localStorage.setItem('house_cellar', 0);
		localStorage.setItem('house_hotel', 0);
		localStorage.setItem('house_apartment', 0);
		localStorage.setItem('house_mansion', 0);
	};
}

function canWork(where) {
	alert(where)
}