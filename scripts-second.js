
var data = [{
	"first_name":"John",
	"last_name":"Doe",
	"zip":"01234",
	"npi":12345
 },{
   "first_name":"Jane",
    "last_name":"Doe",
    "zip":"93110",
    "npi":23456
 },{
   "first_name":"Bran",
    "last_name":"Doe",
    "zip":"93110",
    "npi":54321
 },{
   "first_name":"Jack",
    "last_name":"Dob",
    "zip":"94101",
    "npi":35467
 },{
   "first_name":"John",
    "last_name":"Doe",
    "zip":"54312",
    "npi":99999
 },{
   "first_name":"Jack",
    "last_name":"Dob",
    "zip":"11002",
    "npi":23556
 },{
   "organization_name":"Johns Hopkins",
    "zip":"01234",
    "npi":22222
 },{
   "organization_name":"Mercy Hospital",
    "zip":"93110",
    "npi":33333
 },{
   "organization_name":"General Hospital",
    "zip":"11002",
    "npi":44533
 }];

var pageSize = 3;
var currentPage = 1;

$("#loading").hide();

$(".footerContainer").css("width",$(window).width());
$(".contentContainer").css("width",$(window).width()/2);

$(document).ready(function(){

});

function delaySearch(){
	$("#loading").show();
	$("#box").css("opacity", "0.3");
	setTimeout(searchAndDisplay, 1000);
}


function searchAndDisplay(){
	$("#list").empty();
	var input = document.getElementById("input").value;
	var results = {};
	$("#loading").hide();
	$("#box").css("opacity", "1");

	if(input.length>0){
		$.each(data, function(idx, obj) {
			filter(obj, input, results);
		});
		createPagination(results);
		// appendToPage(results);
		$("#list").empty();
		var i = 1;
		for(var key in results){
			if(i >= ((currentPage - 1) * pageSize + 1 ) && i < ((currentPage - 1) * pageSize + 1 ) + pageSize)
				appendNameToThePage(key, results[key]);
			i++;
			if (i >= ((currentPage - 1) * pageSize + 1 ) + pageSize)
				break;
		}
	}else{
		$("#list").empty();
	}

	setFooter();
}

function createPagination(results){
	var page  = 1;
	currentPage = 1;
	$('#pageButtons').empty();
	for(i = 0; i < Object.keys(results).length / pageSize; i++){
		$('#pageButtons').append('<li id="' + page + '" class="pageBtn"><a href="#">' + page + '</a></li>');
		page++;
	}
	$('.pageBtn').click(function(){
		currentPage = parseInt($(this).attr('id'));
		$("#list").empty();
		var i = 1;
		for(var key in results){
			if(i >= ((currentPage - 1) * pageSize + 1 ) && i < ((currentPage - 1) * pageSize + 1 ) + pageSize)
				appendNameToThePage(key, results[key]);
			i++;
			if (i >= ((currentPage - 1) * pageSize + 1 ) + pageSize)
				break;
		}
	});
}

function filter(row, input, results){
	var name = row.first_name + " " + row.last_name;
	var org = row.organization_name;

	// input = input.toLowerCase();
	if(name){
		// name = name.toLowerCase();
		var n = name.indexOf(input);
		if(n>=0){
// 			appendNameToThePage(row);
			appendToArray(name, results);
		}
	}
	if(org){
		// org = org.toLowerCase();
		var m = org.indexOf(input);
		if(m>=0){
			appendToArray(org, results);
		}
	}
}


function appendToArray(element, results){
	if(results[element] === undefined){
		results[element] = 1;
	}
	else{
		results[element] += 1;
	}
}


function appendToPage(results){

		for(var key in results){
			appendNameToThePage(key, results[key]);
		}

}


function appendNameToThePage(name, occurence) {
	var elem =
		"<li>"
			+ "<div class='circle'></div>"
			+ "<strong>" + name + "</strong>"
			+ "<span class='glyphicon glyphicon-menu-right'></span>"
			+ "<p class='entryPara'>We found " + occurence + " " + name + " nearby</p>" +
		"</li>";
	$("#list").append(elem);
}


$("#list").on('click', 'li', function(){
	var name = $(this).find('strong').text();
	$.each(data, function(idx, obj) {
		fullName = obj.first_name + " " + obj.last_name;
		orgName = obj.organization_name;
		if(name==fullName || name==orgName){
			console.log(JSON.stringify(obj));
		}
	});
});


function setFooter(){
	if($("body").height()>$(window).height()){
		$("footer").css("position", "relative");
	}else{
		$("footer").css("position", "absolute");
	}

}
