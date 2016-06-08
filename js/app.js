

function processHandlebarsTemplate(templateId, data) {
	var templateSource = $('#' + templateId).html();
	var compiledTemplate = Handlebars.compile(templateSource);

	return compiledTemplate(data);
}

$.ajax({
	type: 'GET',
	url: 'https://accesscontrolalloworiginall.herokuapp.com/http://digg.com/api/news/popular.json',
	success: function(response) {
		response.data.feed.forEach (function(article){ 
			var articleHtml = processHandlebarsTemplate('newArticle', article);
			//$('#main').append(articleHtml);
			var $articleContainer = $(articleHtml).appendTo("#main");

			$articleContainer.on('click', 'a.showPopUp', function (event) {
				var popUpHtml = processHandlebarsTemplate('diggArticlePopUp', article);
				$("#popUp").html(popUpHtml);
				$("#popUp").removeClass("hidden").addClass("popUpAction");
				setTimeout(function () {
					$("#popUp").removeClass("loader");
				}, 1500);
			});
		}) 
	}
})

$.ajax({
	type: 'GET',
	url: 'https://accesscontrolalloworiginall.herokuapp.com/https://www.reddit.com/r/news.json',
	success: function(response) {
		response.data.children.forEach (function(article){ 
			var articleHtml = processHandlebarsTemplate('redditArticle', article);
			//$('#main').append(articleHtml);
			var $articleContainer = $(articleHtml).appendTo("#main");

			$articleContainer.on('click', 'a.showPopUp', function (event) {
				var popUpHtml = processHandlebarsTemplate('redditArticlePopUp', article);
				$("#popUp").html(popUpHtml);
				$("#popUp").removeClass("hidden").addClass("popUpAction");
				setTimeout(function () {
					$("#popUp").removeClass("loader");
				}, 1500);
			});
		}) 
	}
})

$(document).ready(function () {
	$("#popUp").on('click', 'a.closePopUp', function () {
		$("#popUp").removeClass("popUpAction").addClass("hidden").addClass("loader");	
	});
	$("#diggArticleList").click(function(){
    	$(".redditContainer").hide();
    	$(".diggContainer").show();
    	$("#error-message").addClass("hidden");
	});
	$("#redditArticleList").click(function(){
    	$(".diggContainer").hide();
    	$(".redditContainer").show();
    	$("#error-message").addClass("hidden");
	});
	$("#catArticleList").click(function(){
    	$(".diggContainer").hide();
    	$(".redditContainer").hide();
    	$("#error-message").removeClass("hidden").html("Error: No cats");
	});
	$("#allArticleList").click(function(){
    	$(".diggContainer").show();
    	$(".redditContainer").show();
    	$("#error-message").addClass("hidden");
	});


});




// Show Pop up -- NOT WORKING
// $("a.showPopUp").on('click', function(){
// 	$("div#popUp").removeClass("hidden").addClass("popUpAction");
// });

// // Hide Pop up
// $("a.closePopUp").on('click', function(){
// 	$("div#popUp").removeClass("popUpAction").addClass("hidden");
// });