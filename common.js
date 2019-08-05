$(function() {
	var days_of_the_week = ["РџРЅ", "Р’С‚", "РЎСЂ", "Р§С‚", "РџС‚", "РЎР±", "Р’СЃ"];
	var months_of_the_year = ["РЇРЅРІР°СЂСЊ", "Р¤РµРІСЂР°Р»СЊ", "РњР°СЂС‚", "РђРїСЂРµР»СЊ", "РњР°Р№", "РСЋРЅСЊ", "РСЋР»СЊ", "РђРІРіСѓСЃС‚", "РЎРµРЅС‚СЏР±СЂСЊ", "РћРєС‚СЏР±СЂСЊ", "РќРѕСЏР±СЂСЊ", "Р”РµРєР°Р±СЂСЊ"];
	var test = document.getElementById("test");
	var current_date = new Date();

	function get_month(_year, _month) {
		if (_month == 12) {
			_month = 0;
			_year++;
		}
    	
    	var next_month = new Date(_year, _month, 32);
    	var days_in_the_month = 32 - next_month.getDate();
    	var first_week = new Date(_year, _month);

    	var month = (_month) < 10 ? "0" + (_month + 1) : (_month + 1);
    	var year = _year; 
    	

    	var div_current_month_year = $("<div class='current-month-year'></div>");
    	var span_current_month = $("<span class='current-month'></span");
    	var span_current_year = $("<span class='current-year'></span");

    	span_current_month.text(months_of_the_year[_month]);
    	span_current_year.text(_year);
    	span_current_month.appendTo(div_current_month_year);
    	span_current_year.appendTo(div_current_month_year);
    	div_current_month_year.appendTo($(".months"));

    	var div_month = $("<div class='month'></div>");
    	div_month.insertAfter(span_current_year);
    	var div_dsofweek = $("<div class='dsofweek'></div>");
    	var div_days = $("<div class='days'></div>");

    	
    	for (var i = 0; i < 7; i++) {
    		var div = $("<div></div>");
    		div.text(days_of_the_week[i]);
    		div.appendTo(div_dsofweek);
    	}

    	div_dsofweek.appendTo(div_month);

    	var d = 1;
    	var n = 0;

    	for (var i = 0; i < 7; i++) {
    		var div = $("<div></div>");
    		div.text("");
    		div.appendTo(div_days);
    	}

    	switch (first_week.getDay()) {
    		case 0:
    		  div_days.children().eq(6).text(d).attr("data-date", check_date(d) + "-" + month + "-" + year);
    		  d++;
    		  n = 6;
    		  break;
    		case 1:
    		  div_days.children().eq(0).text(d).attr("data-date", check_date(d) + "-" + month + "-" + year);
    		  d++;
    		  n = 0;
    		  break;
    		case 2:
    		  div_days.children().eq(1).text(d).attr("data-date", check_date(d) + "-" + month + "-" + year);
    		  d++;
    		  n = 1;
    		  break;
    		case 3:
    		  div_days.children().eq(2).text(d).attr("data-date", check_date(d) + "-" + month + "-" + year);
    		  d++;
    		  n = 2;
    		  break;
    		case 4:
    		  div_days.children().eq(3).text(d).attr("data-date", check_date(d) + "-" + month + "-" + year);
    		  d++;
    		  n = 3;
    		  break;
    		case 5:
    		  div_days.children().eq(4).text(d).attr("data-date", check_date(d) + "-" + month + "-" + year);
    		  d++;
    		  n = 4;
    		  break;
    		case 6:
    		  div_days.children().eq(5).text(d).attr("data-date", check_date(d) + "-" + month + "-" + year);
    		  d++;
    		  n = 5;
    		  break;
    	}

		for (var i = n + 1; i < 7; i++) {
			div_days.children().eq(i).text(d).attr("data-date", check_date(d) + "-" + month + "-" + year);
			d++;
		}

    	div_days.appendTo(div_month);

    	for (var i = d; i <= days_in_the_month; i++) {
    		var div = $("<div></div>");
        	if (days_in_the_month >= d) {
				div.text(d).attr("data-date", check_date(d) + "-" + month + "-" + year);
        		div.appendTo(div_days);
        		d++;
        	 }
    	}

	    for (var i = 0; i < div_days.children().length; i++) {
	    	switch(i) {
	    		case 6:
	    		case 13:
	    		case 20:
	    		case 27:
	    		case 34:
	    		  if (div_days.children().eq(i).text() == "") {
	    		  	continue;
	    		  }
	    		  div_days.children().eq(i).addClass("weekend");
	    		  break;
	    	}

	    	var mnth = div_days.children().eq(i).attr("data-date");
	    	mnth = String(mnth)
	    	mnth = mnth.substr(3,2)

	    	if (mnth == check_month(1)) {
	    		if (div_days.children().eq(i).text() >= current_date.getDate()) {
	    			if (!div_days.children().eq(i).hasClass("weekend")) {
		    			div_days.children().eq(i).addClass("free");
		    		}
	    		}
	    	} 
	    	if (mnth == check_month(2)) {
    			if (!div_days.children().eq(i).hasClass("weekend")) {
	    			div_days.children().eq(i).addClass("free");
	    		}
		    		
	    	} else {
	    		if (div_days.children().eq(i).text() == "") {
	    			continue;
	    		}
	    		if (!div_days.children().eq(i).hasClass("free")) {
		    			div_days.children().eq(i).addClass("disabled");
		    		}
	    		// div_days.children().eq(i).addClass("disabled");
	    	}
	    }

	}

	get_month(current_date.getFullYear(), current_date.getMonth());
	get_month(current_date.getFullYear(), current_date.getMonth() + 1);

	var days = $(".days div");
	for (var i = 0; i < days.length; i++) {
		var mnth = days.eq(i).attr("data-date");
	    	mnth = String(mnth)
	    	mnth = mnth.substr(3,2)
		if (mnth == check_month(1)) {
			if (days.eq(i).text() == current_date.getDate() && current_date.getHours() >= 19) {
				days.eq(i).addClass("disabled").removeClass("free");
			}
		}
		
    }

    var times = $(".times div");
    for (var i = 0; i < times.length; i++) {
    	if (current_date.getHours() >= times.eq(i).text().substr(0, 2)) {
    		if (!times.eq(i).hasClass("busy")) {
    			times.eq(i).addClass("busy");
    		}
    	}
    }
		
    $(".days div").click(function() {
    	for (var i = 0; i <  $(".times div").length; i++) {
    		$(".times div").eq(i).attr("data-times", "0");
			if ($(".times div").eq(i).hasClass("busy") || $(".times div").eq(i).hasClass("time-selected")) {
				$(".times div").eq(i).removeClass("busy").removeClass("time-selected");
			}
		}

		// for (var i = 0; i <  $(".times div").length; i++) {
		// 	$(".times div").eq(i).attr("data-times", "");
		// }

	    for (var i = 0; i < times.length; i++) {
	    	var mnth = $(this).attr("data-date");
	    	mnth = String(mnth)
	    	mnth = mnth.substr(3,2)
	    	if (mnth == check_month(1)) {
	    		if (current_date.getHours() >= times.eq(i).text().substr(0, 2) && $(this).text() == current_date.getDate()) {
	    				if (!times.eq(i).hasClass("busy")) {
	    					times.eq(i).addClass("busy");
	    				}
	    		}	
	    	}
	    }

    	if ($(this).hasClass("free")) {
    		$(this).toggleClass("day-selected").siblings().removeClass("day-selected");
    	}
    	$(".step-1").removeClass("alert");
    	$("button[type='submit']").attr("disabled", false);

    	var xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                // document.getElementById("times").innerHTML = this.responseText;
                var data = this.responseText.toString().split(" ");

                data.pop();
                // console.log(data)
                if (data.length) {
                	for (var i = 0;  i < $(".times div").length; i++) {
                		for (var j = 0; j < data.length; j++) {
                			if ($(".times div").eq(i).text() == data[j]) { 
                				var tmp = $(".times div").eq(i).attr("data-times");
                				$(".times div").eq(i).attr("data-times", ++tmp);
                				if ($(".times div").eq(i).attr("data-times") == 2) {
                					$(".times div").eq(i).addClass("busy");
                				}
                				
                			}
                		}
                	}
                } 

            }
        };
        xmlhttp.open("GET", "assets/scripts/get.php?q=" + $(this).attr("data-date"), true);
        xmlhttp.send();
    });

    $(".times div").click(function() {
    	// console.log(count)
    	// count = 0;
    	$(".step-2").removeClass("alert");
    	$("button[type='submit']").attr("disabled", false);
    	if (!$(".days div").hasClass("day-selected")) {
    		$(".step-1").addClass("alert");
    	} else {
    		
    		if ($(this).hasClass("busy")) {
    			return false;
    		} else {
    			$(this).toggleClass("time-selected").siblings().removeClass("time-selected");
    		}
    	}
    });

    function check_date(d) {
    	return d < 10 ? "0" + d.toString().substr(-2) : d;
    }

    function check_month(m) {
    	return ((current_date.getMonth() + m) >= 13) ? 1 : current_date.getMonth() + m;
    }

    function remove_day_selected() {
    	for (var i = 0; i < $(".days div").length; i++) {
    		if ($(".days div").eq(i).hasClass("day-selected")) {
    			$(".days div").eq(i).removeClass("day-selected")
    		}
    	}
    }

    $(".schedule").submit(function() {
    	$(".hidden-date").val($(".day-selected").attr("data-date"));
    	$(".hidden-time").val($(".time-selected").attr("data-time"));
    	$(".notice-date").text($(".day-selected").attr("data-date"));
    	$(".notice-time").text($(".time-selected").attr("data-time").substr(0, 5));
		$.ajax({
			type: "POST",
			url: "assets/scripts/add.php",
			data: $("form").serialize()
		}).done(function() {
			$(".days div").removeClass("day-selected");
			// $(".times div").removeClass("time-selected");
			for (var i = 0; i <  $(".times div").length; i++) {
    			if ($(".times div").eq(i).hasClass("busy") || $(".times div").eq(i).hasClass("time-selected")) {
    				$(".times div").eq(i).removeClass("busy").removeClass("time-selected");
    			}
    		}
			$(".schedule input").val("");
			$(".schedule label").removeClass("hide");
			$(".schedule select").val("").change();
			$(".hidden-time").val("");
    		$(".hidden-date").val("");
    		$(".step-3-4").hide();
    		// $(".notice").show();
    		$(".notice").show(function() {
				setTimeout(function() {
					$(".notice").hide();
					$(".notice .progress").removeClass("progress-show");
				}, 5000);
			});
			$(".notice .progress").addClass("progress-show");
    		setTimeout(function() {
    			$(".step-3-4").show();
    			// $(".notice").hide();
    			$(".notice-date").text("");
    			$(".notice-time").text("");
    		},5000)
		});
		return false;
	});

	$(".user-input input").focus(function() {
		if (!$(".days div").hasClass("day-selected")) {
    		$(".step-1").addClass("alert");
    		$("button[type='submit']").attr("disabled", "disabled");
    	}
		if (!$(".times div").hasClass("time-selected")) {
			$(".step-2").addClass("alert");
			$("button[type='submit']").attr("disabled", "disabled");
		}
		if ($(".schedule select").val() === null) {
			$(".step-3").addClass("alert");
			$("button[type='submit']").attr("disabled", "disabled");
		}
		if($(this).parent().find("label").css("opacity") == 1) {
			$(this).parent().find("label").toggleClass("hide");
		}
	}).blur(function() {
		if ($(this).val() === "") {
			$(this).parent().find("label").toggleClass("hide");
		}
	});

	$(".schedule select").on("change", function() {
		$(".step-3").removeClass("alert");
		$("button[type='submit']").attr("disabled", false);
	})

	$(".current-month-year").eq(0).addClass("active");
	var k = 0
	$(".btn-next").click(function() {
		$(".current-month-year").eq(k).removeClass("active");
		k++;
		if (k > $(".current-month-year").length - 1) {
			k = 0;
		}
		$(".current-month-year").eq(k).addClass("active");
		remove_day_selected();
		return false;
	});

	$(".btn-prev").click(function() {
		$(".current-month-year").eq(k).removeClass("active");
		k--;
		if (k < 0) {
			k =  $(".current-month-year").length - 1;
		}
		$(".current-month-year").eq(k).addClass("active");
		remove_day_selected();
		return false;
	});

});
