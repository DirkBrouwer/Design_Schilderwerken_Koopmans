"use strict";

const serviceNavItems = [];
const serviceContent = [];

$(document).ready(function () {
	loadStyleSheet('css/index.css');

	$(document).on('click', '#navList li', function () {
		populateserviceDesc($(this));
	});

	$('#mainMenu li a:contains("Home")').css('color', '#FFFFFF');

	getServiceContentData();
});

function loadStyleSheet(src) {
	if (document.createStyleSheet) {
		document.createStyleSheet(src);
	}
	else {
		$("head").append($("<link rel='stylesheet' href='" + src + "' type='text/css' media='screen' />"));
	}
};

function getServiceContentData() {
	$.getJSON("json/serviceNavData.json", function (data) {
		$.each(data.serviceNavItems, function (key, value) {
			if (key === 'serviceNavItem1') {
				serviceNavItems.push("<li class='selected' id='" + key + "'>" + value.header + "</li>");
			}
			else {
				serviceNavItems.push("<li id='" + key + "'>" + value.header + "</li>");
			}

			serviceContent.push({
				"serviceHeader": value.header,
				"serviceContent": value.content,
				"serviceImage": value.image
			});
		});

		$("<ul/>", {
			html: serviceNavItems.join(""),
			id: 'navList'
		}).appendTo("#serviceNav").css('padding-left', '0px');
	});
}

function populateserviceDesc(clickedNavItem) {
	$('#navList li').removeClass('selected');
	$(clickedNavItem).addClass('selected');

	let correctText = parseInt(clickedNavItem[0].id.substr(length - 1));

	$('#serviceDescHeader').html('<b>' + serviceContent[correctText].serviceHeader + '</b>');
	$('#serviceDescText').html(serviceContent[correctText].serviceContent);
	$('#serviceImg').css('background-image', 'url(' + serviceContent[correctText].serviceImage + ')');
}