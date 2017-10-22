"use strict";

const serviceNavItems = [];
const serviceContent = [];

$(document).ready(function () {

	lazyLoadImg();

	$(document).on('click', '#navList li', function () {
		populateserviceDesc($(this));
	});

	$('#mainMenu li a:contains("Home")').css('color', '#FFFFFF');

	getServiceContentData();
});

function lazyLoadImg() {
	var bLazy = new Blazy({
		success: function (ele) {
			console.log('image loaded');
		}
		, error: function (ele, msg) {
			if (msg === 'missing') {
				console.log('data-src missing');
			}
			else if (msg === 'invalid') {
				console.log('data-src invalid');
			}
		}
	});
}

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