// Script del sito personale "alessiogiordano.net" al 01/02/20

function AGinternationalize() {
	var language = navigator.language || navigator.userLanguage;
	switch(language.substring(0,2)) {
			case "it": document.documentElement.lang = "it"; AGita(); break;
			default: document.documentElement.lang = "en"; break;
	}
}
function AGita() {
	if(document.querySelectorAll("#AGone").length != 0) {
		// HomePage
		document.querySelector("#AGone .AGlabel").innerText = "Prodotti";
		document.querySelector("#AGtwo .AGlabel").innerText = "Blog";
		document.querySelector("#AGthree .AGlabel").innerText = "Contatti";
		document.getElementById("AGtemp").innerText = "Carico le previsioni...";
		document.getElementById("AGcopy").innerText = "© 2020 Alessio Giordano - Tutte le emoji presenti in questa pagina sono usate sotto licenza CC BY-SA 4.0 da OpenMoji. Le previsioni del tempo sono fornite dalla API gratuita di Open Weather Map sotto licenza CC BY-SA 4.0";
	} else if(document.querySelectorAll("#AGsubscribe").length != 0) {
		// Blog
		document.querySelector("#AGsubscribe").innerText = "Iscriviti al feed RSS";
		document.querySelector("#AGsubscribe").href = "it.xml";
		document.querySelector("input[type='search']").placeholder = "Cerca post del blog...";
		document.querySelector(".AGloader h1").innerText = "Attendi mentre i post vengono caricati";
	} else if(document.querySelectorAll("#AGcontactspage").length != 0) {
		// Contacts
		document.querySelectorAll(".AGbreadtitle")[1].innerText = "Contatti";
		document.querySelectorAll(".AGconlink")[0].childNodes[1].innerText = "Invia un messaggio di posta";
		document.querySelectorAll(".AGconlink")[1].childNodes[1].innerText = "Iscriviti al feed RSS"
		document.querySelectorAll(".AGconlink")[2].childNodes[1].innerText = "Segui su Twitter"
	} else if(document.querySelectorAll(".AGproduct").length != 0) {
		// Products
		document.querySelectorAll(".AGbreadtitle")[1].innerText = "Prodotti";
		document.querySelector(".AGloader h1").innerText = "Attendi mentre i prodotti vengono caricati";
	} else if(document.querySelectorAll(".AGnotfound").length != 0) {
		// 404
		document.querySelectorAll(".AGbreadtitle")[1].innerText = "Pagina non trovata";
		document.querySelector(".AGnotfound h1").innerText = "404";
		document.querySelector(".AGnotfound p").innerText = "Pagina non trovata";
		document.querySelector(".AGnotfound h4").innerText = "Torna alla pagina iniziale";
	}
}
function AGweathericon(code) {
	switch(code) {
		case "02n": code = "03d"; break;
		case "03n": code = "03d"; break;
		case "04d": code = "03d"; break;
		case "04n": code = "03d"; break;
		case "09n": code = "09d"; break;
		case "10n": code = "09d"; break;
		case "11n": code = "11d"; break;
		case "13n": code = "13d"; break;
		case "50n": code = "50d"; break;
	}
	code = "assets/weather/" + code + ".svg";
	return code;
}
function AGupdateweather(response) {
	response = JSON.parse(response);
	document.getElementById("AGiconimg").setAttribute("src", AGweathericon(response.weather[0].icon));
	// Se ricevo gradi Kelvin:
	//document.getElementById("AGtemp").innerHTML = response.weather[0].main + " <span style='font-weight: bold'>" + Math.floor(response.main.temp_max -273.15) + "°C</span> " + Math.floor(response.main.temp_min -273.15) + "°C";
	document.getElementById("AGtemp").innerHTML = response.weather[0].description.charAt(0).toUpperCase() + response.weather[0].description.slice(1) + " - <span style='font-weight: bold'>" + Math.floor(response.main.temp_max) + "°C</span> " + Math.floor(response.main.temp_min) + "°C";
}
function AGgetweather() {
	if(new Date().getMonth() == 0) {
		if(new Date().getDate() == 1) {
			document.getElementById("AGiconimg").setAttribute("src", AGweathericon("CAP"));
			switch(document.documentElement.lang) {
				case "it": document.getElementById("AGtemp").innerText = "Felice Anno Nuovo!"; break;
				default: document.getElementById("AGtemp").innerText = "Happy New Year!"; break;
			}
			return 2
		}
	}
	if(new Date().getMonth() == 3) {
		if(new Date().getDate() == 25) {
			document.getElementById("AGiconimg").setAttribute("src", AGweathericon("ITA"));
			switch(document.documentElement.lang) {
				case "it": document.getElementById("AGtemp").innerText = "Buona festa della liberazione!"; break;
				default: document.getElementById("AGtemp").innerText = "Happy Liberation Day!"; break;
			}
			return 2
		}
	}
	if(new Date().getMonth() == 4) {
		if(new Date().getDate() == 9) {
			document.getElementById("AGiconimg").setAttribute("src", AGweathericon("EUR"));
			switch(document.documentElement.lang) {
				case "it": document.getElementById("AGtemp").innerText = "9 Maggio - Giornata dell'Europa"; break;
				default: document.getElementById("AGtemp").innerText = "9th May - Europe Day"; break;
			}
			return 2
		}
	}
	if(new Date().getMonth() == 5) {
		if(new Date().getDate() == 2) {
			document.getElementById("AGiconimg").setAttribute("src", AGweathericon("ITA"));
			switch(document.documentElement.lang) {
				case "it": document.getElementById("AGtemp").innerText = "Buona Festa della Repubblica"; break;
				default: document.getElementById("AGtemp").innerText = "Happy Republic Day!"; break;
			}
			return 2
		}
	}
	if(new Date().getMonth() == 8) {
		if(new Date().getDate() == 1) {
			document.getElementById("AGiconimg").setAttribute("src", AGweathericon("COM"));
			switch(document.documentElement.lang) {
				case "it": document.getElementById("AGtemp").innerText = "Buon Compleanno a me!"; break;
				default: document.getElementById("AGtemp").innerText = "Happy Birthday to me!"; break;
			}
			return 2
		}
	}
	if(new Date().getMonth() == 11) {
		if(new Date().getDate() == 25) {
			document.getElementById("AGiconimg").setAttribute("src", AGweathericon("PIC"));
			switch(document.documentElement.lang) {
				case "it": document.getElementById("AGtemp").innerText = "Buon Natale!"; break;
				default: document.getElementById("AGtemp").innerText = "Merry Christmas!"; break;
			}
			return 2
		}
	}
	var freshness = new Date().getTime() - localStorage.getItem("AGweathertimestamp-" + document.documentElement.lang);
	if(freshness < 4000) {
		AGupdateweather(localStorage.getItem("AGweatherrequest-" + document.documentElement.lang));
		return 1
	}
	document.getElementById("AGiconimg").setAttribute("src", AGweathericon("000"));
	switch(document.documentElement.lang) {
		case "it": document.getElementById("AGtemp").innerText = "Carico le previsioni..."; break;
		default: document.getElementById("AGtemp").innerText = "Loading forecast..."; break;
	}
	var request = new XMLHttpRequest();
	request.onreadystatechange = function() {
		if(this.readyState == 4 && this.status == 200) {
			// Recevied Data
			localStorage.setItem("AGweatherrequest-" + document.documentElement.lang, request.responseText);
			localStorage.setItem("AGweathertimestamp-" + document.documentElement.lang, new Date().getTime());
			AGupdateweather(request.responseText);
		} else if(this.readyState == 4) {
			document.getElementById("AGiconimg").setAttribute("src", AGweathericon("111"));
			switch(document.documentElement.lang) {
				case "it": document.getElementById("AGtemp").innerText = "Previsioni non disponibili..."; break;
				default: document.getElementById("AGtemp").innerText = "Forecast not available"; break;
			}
		}
	}
	request.open("GET", "https://api.openweathermap.org/data/2.5/weather?id=2525068&lang=" + document.documentElement.lang + "&units=metric&appid=4df05fc5bd06583a42eeacfa9ce4422b", true);
	request.send();
	return 0;
}

function AGactivatehref() {
	const choices = document.querySelectorAll(".AGactivatehref");
	for(let i = 0; i < choices.length; i++) {
		choices[i].addEventListener("click", function(event) {
			const target = event.currentTarget;
			const href = target.dataset.href;
			window.location.href = href;
		});
	}
}
function AGgetblogposts() {
	var feed = "";
	var language = navigator.language || navigator.userLanguage;
	switch(language.substring(0,2)) {
		case "it": feed = "it.xml"; break;
		default: feed = "en.xml"; break;
	}
	var request = new XMLHttpRequest();
	request.onreadystatechange= function() {
		if(this.readyState == 4 && this.status == 200) {
			var dom = request.responseXML;
			var articles = dom.getElementsByTagName("item");
			var existing = document.querySelectorAll('section');
			for (let i = 0; i < existing.length; i++) {
				existing[i].parentNode.removeChild(existing[i]);
			}
			
			for (let i = 0; i < articles.length; i++) {
				
				var title, category, date, url, image, description;
				var darkIsAvailable = false;
				var article = articles[i].childNodes;
				
				for (let j = 0; j < article.length; j++) {
					switch(article[j].tagName) {
						case "title": title = article[j].textContent; break;
						case "category": category = article[j].textContent; break;
						case "agShortDate": date = article[j].textContent; break;
						case "link": url = article[j].textContent; break;
						case "enclosure": image = article[j].getAttribute('url'); if(article[j].getAttribute('darkmode') == "true") { darkIsAvailable = true }; break;
						case "description": description = article[j].textContent; break;
						default: break;
					}
				}
				
				var section = document.createElement("section"); 
				section.classList.add("AGactivatehref");
				section.dataset.title = title;
				section.dataset.description = description;
				section.dataset.category = category;
				section.dataset.date = date;
				section.dataset.href = url.replace("https://www.alessiogiordano.net/blog/", "");
				
				var body = '<div class="AGarticleinfo"><p><b>';
				body += category;
				body += '</b> ';
				body += date;
				body += '</p><h1>';
				body += title;
				body += '</h1><h4>';
				body += description;
				body += '</h4></div><div>';
				
				if(darkIsAvailable) {
					body += '<img src="' + image.replace("https://www.alessiogiordano.net/blog/", "") + '" class="AGlight" />';
					body += '<img src="' + image.replace("https://www.alessiogiordano.net/blog/", "").replace("light", "dark") + '" class="AGdark" />';
				} else {
					body += '<img src="' + image.replace("https://www.alessiogiordano.net/blog/", "") + '" />';
				}
				body += '</div>';
				
				section.innerHTML = body;
				
				document.getElementById("AGarticle").appendChild(section);
				
			}
			AGfilter();
			AGactivatehref();
		}
	}
	request.open("GET", feed, true);
	request.send();
}

function AGgetproducts() {
	var feed = "";
	var language = navigator.language || navigator.userLanguage;
	switch(language.substring(0,2)) {
		case "it": feed = "it.xml"; break;
		default: feed = "en.xml"; break;
	}
	var request = new XMLHttpRequest();
	request.onreadystatechange= function() {
		if(this.readyState == 4 && this.status == 200) {
			var dom = request.responseXML;
			var products = dom.getElementsByTagName("item");
			var existing = document.querySelectorAll('section');
			for (let i = 0; i < existing.length; i++) {
				existing[i].parentNode.removeChild(existing[i]);
			}
			
			for (let i = 0; i < products.length; i++) {
				
				var title, description, category, price, link, icon, ios, iphone, ipad, watch, tv, mac;
				var product = products[i].childNodes;
				
				for (let j = 0; j < product.length; j++) {
					switch(product[j].tagName) {
						case "title": title = product[j].textContent; break;
						case "description": description = product[j].textContent; break;
						case "category": category = product[j].textContent; break;
						case "price": price = product[j].textContent; break;
						case "link": link = product[j].textContent; break;
						case "icon": icon = product[j].getAttribute('url'); break;
						case "ios": ios = product[j].textContent; iphone = product[j].getAttribute('iphone'); ipad = product[j].getAttribute('ipad'); watch = product[j].getAttribute('watch'); tv = product[j].getAttribute('tv'); break;
						case "mac": mac = product[j].textContent; break;
						default: break;
					}
				}
				
				var section = document.createElement("section"); 
				section.classList.add("AGproduct");
				section.dataset.title = title;
				section.dataset.description = description;
				section.dataset.category = category;
				section.dataset.price = price;
				section.dataset.ios = ios!=undefined ? "true" : "false";
				section.dataset.iphone = iphone!=undefined ? iphone : "false";
				section.dataset.ipad = ipad!=undefined ? iphone : "false";
				section.dataset.applewatch = watch!=undefined ? iphone : "false";
				section.dataset.appletv = tv!=undefined ? iphone : "false";
				section.dataset.mac = mac!=undefined ? "true" : "false";
				
				var body = '<div><h1>';
				body += title;
				body += '</h1><p>';
				body += description;
				body += '</p><h4>';
				body += category;
				body += ' - ';
				var language = navigator.language.substring(0,2) || navigator.userLanguage.substring(0,2);
				if((ios!=undefined)&&(mac!=undefined)) {
					if((iphone == "true") && (ipad == "true") && (watch == "true") && (tv == "true")) {
						switch(language) {
							case "it": body += "Per iPhone, iPad, iPod touch, Mac, Apple Watch e Apple TV"; break;
							default: body += "For iPhone, iPad, iPod touch, Mac, Apple Watch and Apple TV"; break;
						}
					} else if((iphone == "true") && (ipad == "true") && (watch == "true") && (tv != "true")) {
						switch(language) {
							case "it": body += "Per iPhone, iPad, iPod touch, Mac e Apple Watch"; break;
							default: body += "For iPhone, iPad, iPod touch, Mac and Apple Watch"; break;
						}
					} else if((iphone == "true") && (ipad == "true") && (watch != "true") && (tv == "true")) {
						switch(language) {
							case "it": body += "Per iPhone, iPad, iPod touch, Mac e Apple TV"; break;
							default: body += "For iPhone, iPad, iPod touch, Mac and Apple TV"; break;
						}
					} else if((iphone == "true") && (ipad == "true") && (watch != "true") && (tv != "true")) {
						switch(language) {
							case "it": body += "Per iPhone, iPad, iPod touch e Mac"; break;
							default: body += "For iPhone, iPad, iPod touch and Mac"; break;
						}
					} else if((iphone == "true") && (ipad != "true") && (watch == "true") && (tv == "true")) {
						switch(language) {
							case "it": body += "Per iPhone, iPod touch, Mac, Apple Watch e Apple TV"; break;
							default: body += "For iPhone, iPod touch, Mac, Apple Watch and Apple TV"; break;
						}
					} else if((iphone == "true") && (ipad != "true") && (watch != "true") && (tv == "true")) {
						switch(language) {
							case "it": body += "Per iPhone, iPod touch, Mac e Apple TV"; break;
							default: body += "For iPhone, iPod touch, Mac and Apple TV"; break;
						}
					} else if((iphone == "true") && (ipad != "true") && (watch == "true") && (tv != "true")) {
						switch(language) {
							case "it": body += "Per iPhone, iPod touch, Mac e Apple Watch"; break;
							default: body += "For iPhone, iPod touch, Mac and Apple Watch"; break;
						}
					} else if((iphone == "true") && (ipad != "true") && (watch != "true") && (tv != "true")) {
						switch(language) {
							case "it": body += "Per iPhone, iPod touch e Mac"; break;
							default: body += "For iPhone, iPod touch and Mac"; break;
						}
					} else if((iphone != "true") && (ipad == "true") && (watch == "true") && (tv == "true")) {
						switch(language) {
							case "it": body += "Per iPad, Mac, Apple Watch e Apple TV"; break;
							default: body += "For iPad, Mac, Apple Watch and Apple TV"; break;
						}
					} else if((iphone != "true") && (ipad == "true") && (watch != "true") && (tv == "true")) {
						switch(language) {
							case "it": body += "Per iPad, Mac e Apple TV"; break;
							default: body += "For iPad, Mac and Apple TV"; break;
						}
					} else if((iphone != "true") && (ipad == "true") && (watch == "true") && (tv != "true")) {
						switch(language) {
							case "it": body += "Per iPad, Mac e Apple Watch"; break;
							default: body += "For iPad, Mac and Apple Watch"; break;
						}
					} else if((iphone != "true") && (ipad == "true") && (watch != "true") && (tv != "true")) {
						switch(language) {
							case "it": body += "Per iPad e Mac"; break;
							default: body += "For iPad and Mac"; break;
						}
					} else {
						switch(language) {
							case "it": body += "Per iOS e macOS"; break;
							default: body += "For iOS and macOS"; break;
						}
					}
					body += ' - ';
				} else if(ios!=undefined) {
					if((iphone == "true") && (ipad == "true") && (watch == "true") && (tv == "true")) {
						switch(language) {
							case "it": body += "Per iPhone, iPad, iPod touch, Apple Watch e Apple TV"; break;
							default: body += "For iPhone, iPad, iPod touch, Apple Watch and Apple TV"; break;
						}
					} else if((iphone == "true") && (ipad == "true") && (watch == "true") && (tv != "true")) {
						switch(language) {
							case "it": body += "Per iPhone, iPad, iPod touch e Apple Watch"; break;
							default: body += "For iPhone, iPad, iPod touch and Apple Watch"; break;
						}
					} else if((iphone == "true") && (ipad == "true") && (watch != "true") && (tv == "true")) {
						switch(language) {
							case "it": body += "Per iPhone, iPad, iPod touch e Apple TV"; break;
							default: body += "For iPhone, iPad, iPod touch and Apple TV"; break;
						}
					} else if((iphone == "true") && (ipad == "true") && (watch != "true") && (tv != "true")) {
						switch(language) {
							case "it": body += "Per iPhone, iPad e iPod touch"; break;
							default: body += "For iPhone, iPad and iPod touch"; break;
						}
					} else if((iphone == "true") && (ipad != "true") && (watch == "true") && (tv == "true")) {
						switch(language) {
							case "it": body += "Per iPhone, iPod touch, Apple Watch e Apple TV"; break;
							default: body += "For iPhone, iPod touch, Apple Watch and Apple TV"; break;
						}
					} else if((iphone == "true") && (ipad != "true") && (watch != "true") && (tv == "true")) {
						switch(language) {
							case "it": body += "Per iPhone, iPod touch e Apple TV"; break;
							default: body += "For iPhone, iPod touch and Apple TV"; break;
						}
					} else if((iphone == "true") && (ipad != "true") && (watch == "true") && (tv != "true")) {
						switch(language) {
							case "it": body += "Per iPhone, iPod touch e Apple Watch"; break;
							default: body += "For iPhone, iPod touch and Apple Watch"; break;
						}
					} else if((iphone == "true") && (ipad != "true") && (watch != "true") && (tv != "true")) {
						switch(language) {
							case "it": body += "Per iPhone e iPod touch"; break;
							default: body += "For iPhone and iPod touch"; break;
						}
					} else if((iphone != "true") && (ipad == "true") && (watch == "true") && (tv == "true")) {
						switch(language) {
							case "it": body += "Per iPad, Apple Watch e Apple TV"; break;
							default: body += "For iPad, Apple Watch and Apple TV"; break;
						}
					} else if((iphone != "true") && (ipad == "true") && (watch != "true") && (tv == "true")) {
						switch(language) {
							case "it": body += "Per iPad e Apple TV"; break;
							default: body += "For iPad and Apple TV"; break;
						}
					} else if((iphone != "true") && (ipad == "true") && (watch == "true") && (tv != "true")) {
						switch(language) {
							case "it": body += "Per iPad e Apple Watch"; break;
							default: body += "For iPad and Apple Watch"; break;
						}
					} else if((iphone != "true") && (ipad == "true") && (watch != "true") && (tv != "true")) {
						switch(language) {
							case "it": body += "Per iPad"; break;
							default: body += "For iPad"; break;
						}
					} else {
						switch(language) {
							case "it": body += "Per iOS"; break;
							default: body += "For iOS"; break;
						}
					}
					body += ' - ';
				} else if(mac!=undefined) {
					switch(language) {
						case "it": body += "Per Mac"; break;
						default: body += "For Mac"; break;
					}
					body += ' - ';
				}
				
				body += price;
				body += '</h4></div><div class="AGdowncon"><div class="AGrowmember"><div class="AGicon AGactivatehref" data-href="';
				body += link;
				body += '"><img src="';
				body += icon;
				body += '" class="AGimgicon" style="height: 100%;0%;"></div><div class="AGlabel">';
				body += title;
				body += '</div></div><div class="AGappstoreban">';
				let lang;
				switch(language) {
					case "it": lang = "it"; break;
					default: lang = "en"; break;
				}
				body += (mac!=undefined) ? '<img src="../assets/macappstore/light-' + lang + '.svg" class="AGlight AGactivatehref" data-href="' + mac + '"><img src="../assets/macappstore/dark-' + lang + '.svg" class="AGdark AGactivatehref" data-href="' + mac + '">' : "";
				body += (ios!=undefined) ? '<img src="../assets/appstore/light-' + lang + '.svg" class="AGlight AGactivatehref" data-href="' + ios + '"><img src="../assets/appstore/dark-' + lang + '.svg" class="AGdark AGactivatehref" data-href="' + ios + '">' : "";
				body += '</div></div>';
				
				section.innerHTML = body;
				
				document.getElementById("AGarticle").appendChild(section);
				
			}
			AGactivatehref();
		}
	}
	request.open("GET", feed, true);
	request.send();
}

function AGgethighlights() {
	var feed = "";
	var language = navigator.language || navigator.userLanguage;
	switch(language.substring(0,2)) {
		case "it": feed = "highlights/it.xml"; break;
		default: feed = "highlights/en.xml"; break;
	}
	var request = new XMLHttpRequest();
	request.onreadystatechange= function() {
		if(this.readyState == 4 && this.status == 200) {
			var highlight = request.responseXML.getElementsByTagName("item")[0];
				
			var title, description, link, large, small;
			var elements = highlight.childNodes;
				
			for (let i = 0; i < elements.length; i++) {
				switch(elements[i].tagName) {
					case "title": title = elements[i].textContent; break;
					case "description": description = elements[i].textContent; break;
					case "link": link = elements[i].textContent; break;
					case "large": large = 'highlights/' + elements[i].getAttribute('url'); break;
					case "small": small = 'highlights/' + elements[i].getAttribute('url'); break;
					default: break;
				}
			}
			
			var container = document.querySelector("#AGmiddlerow");
			container.dataset.title = title;
			container.dataset.description = description;
			container.dataset.href = link;
			
			container.innerHTML = '<img src="' + small + '" class="AGsmallhighlight" /><img src="' + large + '" class="AGlargehighlight" />';
			
			AGactivatehref();
		}
	}
	request.open("GET", feed, true);
	request.send();
}

function AGgetdock() {
	var feed = "";
	var language = navigator.language || navigator.userLanguage;
	switch(language.substring(0,2)) {
		case "it": feed = "products/it.xml"; break;
		default: feed = "products/en.xml"; break;
	}
	var request = new XMLHttpRequest();
	request.onreadystatechange= function() {
		if(this.readyState == 4 && this.status == 200) {
			var dom = request.responseXML;
			var products = dom.getElementsByTagName("item");
			var existing = document.querySelectorAll('section');
			for (let i = 0; i < existing.length; i++) {
				existing[i].parentNode.removeChild(existing[i]);
			}
			
			var max = (products.length < 3) ? products.length : 3;
			var dock = [
				document.querySelector("#AGfour"),
				document.querySelector("#AGfive"),
				document.querySelector("#AGsix")
			];
			
			for (let i = 0; i < max; i++) {
				
				var title, link, icon;
				var product = products[i].childNodes;
				
				for (let j = 0; j < product.length; j++) {
					switch(product[j].tagName) {
						case "title": title = product[j].textContent; break;
						case "link": link = product[j].textContent; break;
						case "icon": icon = 'products/' + product[j].getAttribute('url'); break;
						default: break;
					}
				}
				
				dock[i].dataset.title = title;
				dock[i].classList.remove("AGnotpopulated");
				dock[i].childNodes[1].classList.add("AGactivatehref");
				dock[i].childNodes[1].dataset.href = link;
				dock[i].childNodes[3].innerText = title;
				dock[i].childNodes[1].childNodes[0].src = icon;
				dock[i].childNodes[1].childNodes[0].classList.add("AGappicon");
				
			}
			
			AGactivatehref();
		}
	}
	request.open("GET", feed, true);
	request.send();
}

function AGfilter() {
	var keyword = new RegExp(document.querySelector("input[type='search']").value);
	if(document.querySelectorAll(".AGloader").length == 0) {
		var articles = document.querySelectorAll('section');
		for (let i = 0; i < articles.length; i++) {
			if((keyword.test(articles[i].dataset.title)) || (keyword.test(articles[i].dataset.description)) || (keyword.test(articles[i].dataset.date)) || (keyword.test(articles[i].dataset.category))) {
				articles[i].style.display = "flex";
			} else {
				articles[i].style.display = "none";
			}
		}
	}
}
