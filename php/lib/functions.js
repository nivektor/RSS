var id;

$("#delete").on(TouchMouseEvent.DOWN, deleteList);
$("#save").on(TouchMouseEvent.DOWN, saveList);
$("#delete-saved").on(TouchMouseEvent.DOWN, deleteListSaved);

function showModal(str) {
	id = str;
	// alert('SEND '+id);
}

function deleteList() {
	var chkArray = [];

	/* look for all checkboes that have a class 'chk' attached to it and check if it was checked */
	$(".article-checkbox:checked").each(function() {
		chkArray.push($(this).val());
	});
	
	
	for (var x in chkArray) {
		// alert(chkArray[x]);
		request();
		$(".panel-"+chkArray[x]).css("display","none");
		xmlhttp.open("GET","delete.php?id="+chkArray[x],true);
		xmlhttp.send();
	}
	
}

function deleteListSaved() {
	var chkArray = [];

	/* look for all checkboes that have a class 'chk' attached to it and check if it was checked */
	$(".article-checkbox:checked").each(function() {
		chkArray.push($(this).val());
	});
	
	
	for (var x in chkArray) {
		// alert(chkArray[x]);
		request();
		$(".panel-"+chkArray[x]).css("display","none");
		xmlhttp.open("GET","delete-saved.php?id="+chkArray[x],true);
		xmlhttp.send();
	}
	
}

function saveList() {
	var chkArray = [];

	/* look for all checkboes that have a class 'chk' attached to it and check if it was checked */
	$(".article-checkbox:checked").each(function() {
		chkArray.push($(this).val());
	});
	
	
	for (var x in chkArray) {
		// alert(chkArray[x]);
		request();
		$(".panel-"+chkArray[x]).css("display","none");
		xmlhttp.open("GET","save.php?id="+chkArray[x],true);
		xmlhttp.send();
	}
	
}
// 
// function deleteItem() {
// 	// alert('SEND '+id);
// 	request();
// 	xmlhttp.open("GET","delete.php?id="+id,true);
// 	xmlhttp.send();
// 	$(".panel-"+id).css("display","none");
// 	$('#myModal').modal('hide');
// }
// 
// function deleteSavedItem() {
// 	// alert('SEND '+id);
// 
// 	request();
// 	xmlhttp.open("GET","delete-saved.php?id="+id,true);
// 	xmlhttp.send();
// 	$(".panel-"+id).css("display","none");
// 	$('#myModal').modal('hide');
// }
// 
// function saveItem() {
// 	// alert('SEND '+id);
// 
// 	request();
// 	xmlhttp.open("GET","save.php?id="+id,true);
// 	xmlhttp.send();
// 	$(".panel-"+id).css("display","none");
// 	$('#myModal').modal('hide');
// }

function request() {
	if (id=="") {
	    document.getElementById("txtHint").innerHTML="";
	    return;
	} 
	if (window.XMLHttpRequest) {
	    // code for IE7+, Firefox, Chrome, Opera, Safari
	    xmlhttp=new XMLHttpRequest();
	} else { // code for IE6, IE5
	    xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
	}
	xmlhttp.onreadystatechange=function() {
		// if (xmlhttp.readyState==4 && xmlhttp.status==200) {
		// 	document.getElementById("txtHint").innerHTML=xmlhttp.responseText;
		// }
	}
}