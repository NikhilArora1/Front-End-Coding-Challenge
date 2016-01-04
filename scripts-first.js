	$(".contentContainer").css("min-height",$(window).height()/2);
  $(".contentContainer").css("width",$(window).width()/2);

	function submitFunction(){
  			var data = {
  				firstname : document.getElementById("firstname").value,
  				lastname : document.getElementById("lastname").value,
  				city : document.getElementById("city").value
  			};
  			console.log(JSON.stringify(data));
  		}



  		function changeText(){
  			var fname = document.getElementById("firstname").value;
  			var lname = document.getElementById("lastname").value;
  			var city = document.getElementById("city").value;
  			var check = document.getElementById("check").checked;

  			if(fname.length>0 && lname.length>0 && city.length>0 && check==true){
  				document.getElementById("submitButton").disabled = false;
  				document.getElementById("submitButton").innerHTML="I understand and wish to continue with the enrollment";
  			}else{
  				document.getElementById("submitButton").disabled = true;
  				document.getElementById("submitButton").innerHTML="Complete the form to continue enrollment";
  			}
  		}




//   	});
