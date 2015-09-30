// Document Do Ready Function - Initiating
$(function() {
	// Variables for Ip address and Json data
	//Initializing a pseudo IP
	ip="10.10.10.10";
	deviceID = "";
  	// Function for Manage
  	
 	$('.loading_notifications').on("click",function(e){
    	//$(".backgroudPopUp").css("display","block");
        $(".backgroudPopUp").fadeIn("0400");
    	$(".stp-preferenceCenter-container").css("display","block");
    	getIP();
    	//cleardata();
    	//loaddata();
  	});
  	// Function for Save Button
	      	$('.save_preference_settings').on("click",function(e){
	        	save(result1);
	      	});
 	// Function for Getting Ip address and Calling Loaddata and Clear data
 	 function getIP(){
    	$.getJSON("http://jsonip.com?callback=?", function (data) {
	      	ip = data.ip;
	     	cleardata();
	      	loaddata();
    	});
  	}
  	//Function for Reset Button
	 function cleardata(){
	    $('#email_address_Container').html('');
	    $('.mobile_number').html('');
	    $('#all_data').html('');
	    $('#test').html('');
	 }
	// Function for Getting all Json
	function loaddata(){
		//Ajax call for the phone number and the email
	    $.get( "json/sampleajax.json", function(result) {
	      	email_addresses = result.eot_emails;
	      	mobile_numbers = result.eot_mobiles;
	      	$.each(email_addresses, function(i, email_data){
	        	//console.log(email_data);
	        	var html = '<span class="email_address_value">'+email_data.emailvalue+'</span><br>';
	        	$('#email_address_Container').append(html);
	      	});
	      	$.each(mobile_numbers, function(i, mobile_data){
	        	//console.log(mobile_data);
	        	var html = '<span class="mobile_number_digits">'+mobile_data.mobilenum+'</span><br>';
	        	$('.mobile_number').append(html);
	      	});
	    });

	   $.get( "json/oc-pc_updated.json", function(data) {
	      	result1 = data;
	      	test(data);
	      	// Function for Reset Button
	      	$('.cancel_preference_settings').on("click",function(e){
	        	$('#all_data').html('');
	        	$('#test').html('');
	        	test(result1);
	      	});
	      	
	    });
	}
	// Function for Creating table row and table content dynamically
	function test(result1){
		//console.log(result1);
    	alldata = result1.preferenceItemSelected;
    	preferenceMode = result1.preferenceMode;

        //var prefModeDispDevice = result1.prefModeDispDevice;
        //var test1 = result1.preferenceMode[2].prefModeDispDevice;

        //console.log(test1);
        $('#test').html('<th class="notfiyheadingfortable">Notify me when/if my order: </th>');
        // Each for Creating Heading part (email, Push, Sms)
        $.each(preferenceMode, function(i, obj){
      		var x = obj[1];
      		// console.log(x);
      		var prefModeDispDevice = obj.prefModeDispDevice;
        	$(".email_container_heading").text(obj.prefModeDesc)
        	var html = '<th class="'+obj.prefModeDesc+'_email_container_heading">'+obj.prefModeDesc+'</th>';
        	$('#test').append(html);      
        }); 
         // Each for Creating table with headings and checkboxes based on oc-pc  JSON 
        var counter1 = 0;
        var counter2 = 0;
        var mobile_check;
        var test_email;
      	var test_text ;
      	var test_push ;
      	var test_data ;
 
$.each(alldata, function(i, data){    
        	prefItemDetails = data.prefItemDetails;      
      		//console.log(prefItemDetails);
      		var html = '<td class="order_status">'+data.prefItemDesc+'</td>'; //<td><input type="checkbox" id="'+data.prefItemCd+'_email" name="order_confirmation_email" value=""></td><td><input type="checkbox" id="'+data.prefItemCd+'_push" name="order_confirmation_sms" value=""></td><td><input type="checkbox" id="'+data.prefItemCd+'_sms" class="order_confirmation_push" name="order_confirmation_push" value=""></td>';
      		$.each(preferenceMode, function(i, obj){
         		html += '<td id="'+data.prefItemCd+'_'+obj.prefModeDesc+'" class="notification_heading"></td>';
      		});
      		var tr = $('<tr id="'+data.prefItemCd+'_tr_Container"></tr>').html(html);
      		$('#all_data').append(tr);
      		//$.each(prefItemDetails, function(i, data1){
        	//	$('input[id="'+data.preferenceItem+'_email"]').prop("checked", data1.optionSelected == true);
      		//});


			// NULL -- NULL -- NULL
			if(prefItemDetails.length == 0){
				$('#'+data.prefItemCd+'_tr_Container').hide();
				
			}else{
				$('#'+data.prefItemCd+'_tr_Container').show();
			}
			

			$.each(preferenceMode, function(i, venkat){  
				if(venkat.prefModeCd == 3){
					if(venkat.prefModeDispDevice == "MOBILE"){
						mobile_check = venkat.prefModeDispDevice;
			      		$('.PUSH_email_container_heading').hide();
			      		$('#'+data.prefItemCd+'_PUSH').hide();


			      		
			      	}else{
			      		$('.PUSH_email_container_heading').show();
			      		$('#'+data.prefItemCd+'_PUSH').show();
			        }
			        
				}
			});
			

			

      		$.each(prefItemDetails, function(i, data1){  
      			//console.log(data1);
      			test_data = data1.prefModeCd;


        		if(data1.prefModeCd == 1)
        				//console.log(data1);
        				if(data1.optionDisplayType == "READONLY"){
        					var input = '<input type="checkbox" id="'+data.prefItemCd+'_EMAIL">';
        					$('#'+data.prefItemCd+'_EMAIL').append(input);
		      				$('input[id="'+data.prefItemCd+'_EMAIL"]').prop("checked", data1.optionSelected == true);
		      				$('input[id="'+data.prefItemCd+'_EMAIL"]').attr('disabled', 'disabled');
		      				$('input[id="'+data.prefItemCd+'_EMAIL"]').val(data1.optionDisplayType);
		      			}else{
		      				if(data1.optionDisplayType == "EDITABLE"){
		      					var input = '<input type="checkbox" id="'+data.prefItemCd+'_EMAIL">';
		      					$('#'+data.prefItemCd+'_EMAIL').append(input);
		      					$('input[id="'+data.prefItemCd+'_EMAIL"]').prop("checked", data1.optionSelected == true);
		      					$('input[id="'+data.prefItemCd+'_EMAIL"]').val(data1.optionDisplayType);
		      				}else{
		      					var input = '<input type="checkbox" id="'+data.prefItemCd+'_EMAIL">';
        						$('#'+data.prefItemCd+'_EMAIL').append(input);
		      					$('input[id="'+data.prefItemCd+'_EMAIL"]').hide();
		      					$('input[id="'+data.prefItemCd+'_EMAIL"]').val('HIDE');
		      				}
		      			}
		      	else if(data1.prefModeCd == 2 )
		      			if(data1.optionDisplayType == "READONLY"){
		      				var input = '<input type="checkbox" id="'+data.prefItemCd+'_TEXT">';
        					$('#'+data.prefItemCd+'_TEXT').append(input);
		      				$('input[id="'+data.prefItemCd+'_TEXT"]').prop("checked", data1.optionSelected == true);
		      				$('input[id="'+data.prefItemCd+'_TEXT"]').attr('disabled', 'disabled');
		      				$('input[id="'+data.prefItemCd+'_TEXT"]').val(data1.optionDisplayType);
		      			}else{
		      					if(data1.optionDisplayType == "EDITABLE"){
		      						var input = '<input type="checkbox" id="'+data.prefItemCd+'_TEXT">';
		      						$('#'+data.prefItemCd+'_TEXT').append(input);
		      						$('input[id="'+data.prefItemCd+'_TEXT"]').prop("checked", data1.optionSelected == true);
		      						$('input[id="'+data.prefItemCd+'_TEXT"]').val(data1.optionDisplayType);
		      					}else{
		      						var input = '<input type="checkbox" id="'+data.prefItemCd+'_TEXT">';
        							$('#'+data.prefItemCd+'_TEXT').append(input);
		      						$('input[id="'+data.prefItemCd+'_TEXT"]').hide();
		      						$('input[id="'+data.prefItemCd+'_TEXT"]').val('HIDE');
		      					}

		      			}

		      	else if(data1.prefModeCd == 3)
		      			if(data1.optionDisplayType == "READONLY"){
		      				var input = '<input type="checkbox" id="'+data.prefItemCd+'_PUSH">';
        					$('#'+data.prefItemCd+'_PUSH').append(input);
		      				$('input[id="'+data.prefItemCd+'_PUSH"]').prop("checked", data1.optionSelected == true);
		      				$('input[id="'+data.prefItemCd+'_PUSH"]').attr('disabled', 'disabled');
		      				$('input[id="'+data.prefItemCd+'_PUSH"]').val(data1.optionDisplayType);
		      					// if it is mobile device converting READONLY into HIDE
			      				if(mobile_check == "MOBILE"){
				      				$('input[id="'+data.prefItemCd+'_PUSH"]').val('HIDE');
				      				
				      			}
		      			}else{
		      					if(data1.optionDisplayType == "EDITABLE"){
		      						var input = '<input type="checkbox" id="'+data.prefItemCd+'_PUSH">';
		      						$('#'+data.prefItemCd+'_PUSH').append(input);
		      						$('input[id="'+data.prefItemCd+'_PUSH"]').prop("checked", data1.optionSelected == true);
		      						$('input[id="'+data.prefItemCd+'_PUSH"]').val(data1.optionDisplayType);
		      						    // if it is mobile device converting EDITABLE into HIDE
			      						if(mobile_check == "MOBILE"){
						      				$('input[id="'+data.prefItemCd+'_PUSH"]').val('HIDE');
						      				
						      			}
			      				}else{
			      					var input = '<input type="checkbox" id="'+data.prefItemCd+'_PUSH">';
        							$('#'+data.prefItemCd+'_PUSH').append(input);
			      					$('input[id="'+data.prefItemCd+'_PUSH"]').hide();
			      					$('input[id="'+data.prefItemCd+'_PUSH"]').val('HIDE');
			      				}
			      		}	
			    



		      	if(data1.prefModeCd == 2){
	      			counter1++;
	     			if(data1.optionDisplayType == "HIDE"){
	     				counter2++;
		      			//$('#'+data.prefItemCd+'_TEXT').hide();
		      		
		      		}
		      	}

		      
		      	test_email = $('input[id="'+data.prefItemCd+'_EMAIL"]').val();
		      	test_text = $('input[id="'+data.prefItemCd+'_TEXT"]').val();
		      	test_push = $('input[id="'+data.prefItemCd+'_PUSH"]').val();

		      	 

		      	//if($('#'+data.prefItemCd+'_PUSH').css("display", "none")){
		      	//	$('#'+data.prefItemCd+'_PUSH').val('HIDE');
		      	//}


		      	// HIDE -- HIDE -- HIDE
		      	if(data1.prefModeCd == 1 || data1.prefModeCd == 2 ||data1.prefModeCd == 3){
					if(test_email == 'HIDE' && test_text == 'HIDE' && test_push == "HIDE"){
						$('#'+data.prefItemCd+'_tr_Container').hide();
					}else{
						$('#'+data.prefItemCd+'_tr_Container').show();
					}
				}
				// HIDE -- HIDE -- null
		      	if(data1.prefModeCd == 1 || data1.prefModeCd == 2 ||data1.prefModeCd == null){
					if(test_email == 'HIDE' && test_text == 'HIDE'){
						$('#'+data.prefItemCd+'_tr_Container').hide();
					}else{
						$('#'+data.prefItemCd+'_tr_Container').show();
					}
				}
				// HIDE -- null -- null
		      	if(data1.prefModeCd == 1 || data1.prefModeCd == null ||data1.prefModeCd == null){
					if(test_email == 'HIDE'){
						$('#'+data.prefItemCd+'_tr_Container').hide();
						
					}else{
						$('#'+data.prefItemCd+'_tr_Container').show();
					}
				}
				// HIDE -- null -- HIDE
				if(data1.prefModeCd == 1 || data1.prefModeCd == null ||data1.prefModeCd == 3){
					if(test_email == 'HIDE' && test_push=="HIDE"){
						$('#'+data.prefItemCd+'_tr_Container').hide();
						
					}else{
						$('#'+data.prefItemCd+'_tr_Container').show();
					}
				}

				//null -- null - HIDE
				if(data1.prefModeCd == null || data1.prefModeCd == null ||data1.prefModeCd == 3){
					if(test_email == null && test_text == null && test_push == "HIDE"){
						$('#'+data.prefItemCd+'_tr_Container').hide();
						
					}else{
						$('#'+data.prefItemCd+'_tr_Container').show();
					}
				}

	      	});

			//console.log(mobile_check);
			//console.log(test_data);
        });

      	if(counter1 == counter2){
      		$('.TEXT_email_container_heading').css("display","none");
      		$('.order_status').css("width","69%");
      	}else{
      		$('.TEXT_email_container_heading').css("display","block");
      	}
	}
	// Function for Modifying JSON Data
	function save(result1){
		//console.log(result1);
	    var finalObj = {};
	     
	    $.extend(finalObj, result1, true);
	        //console.log(finalObj);
	        
        $.each(finalObj.preferenceItemSelected, function(i, data){  
        	//console.log(data);
        	if(data.prefItemDetails[2] != null){
          		data.prefItemDetails[0].deviceID = ip;
          	}
          	if(data.prefItemDetails[2] != null){
          		data.prefItemDetails[1].deviceID = ip;
          	}
          	if(data.prefItemDetails[2] != null){
          		data.prefItemDetails[2].deviceID = ip;
          	}

          	//Creating the right parameters to pass in the post. 
          	//This is the format that is requested
           finalObj.loginID = '0';
           finalObj.applicationID = '1';
           finalObj.customerNo = '0';
           finalObj.staplesID = '0';
           finalObj.updatedUserID = '0';

           delete finalObj.preferenceMode;
           delete finalObj.emailSelected;
           delete finalObj.errorCode;
           delete finalObj.errorMesg;
           delete finalObj.subResponse;
           delete finalObj.phoneSelected;
           delete finalObj.mainResponse;
           delete data.prefItemDesc;
           delete data.prefItemDispSeq;

	       $.each(data.prefItemDetails, function(i, test){ 
	          //console.log(test);
	          delete test.optionDisplayType;
	          delete test.optionSource;
	       });
 
          	//console.log(data.prefItemDetails[0].deviceID);
          	if($('input[id="'+data.prefItemCd+'_EMAIL"]')[0])
            	data.prefItemDetails[0].optionSelected = $('input[id="'+data.prefItemCd+'_EMAIL"]')[0].checked;
            	//console.log(data.prefItemDetails[0].optionSelected);
          	if($('input[id="'+data.prefItemCd+'_TEXT"]')[0])
            	data.prefItemDetails[1].optionSelected = $('input[id="'+data.prefItemCd+'_TEXT"]')[0].checked;
            	//console.log(data.prefItemDetails[1].optionSelected);
	        if($('input[id="'+data.prefItemCd+'_PUSH"]')[0]){
	            data.prefItemDetails[2].optionSelected = $('input[id="'+data.prefItemCd+'_PUSH"]')[0].checked;
	            data.prefItemDetails[0].deviceID = ip;
	           // console.log(data.prefItemDetails[0].optionSelected);
	        } 
        });
		 //alert("finalObj");
		//console.log(finalObj);
	    $.ajax({
	            url: '/test/PersonSubmit',
	            type: 'post',
	            data: finalObj,
	            dataType: 'json',
	            success: function (successMsg) {
	               alert("Successfully Submitted");
	               getIP();
	            },
	            error: function(){
	            	getIP();
	            	//$('.notification_error_state').text("Post failed - enter correct information");
	            	alert("Ajax Failed! This will change when we are hitting the right URL. You can remove this alert during integration.");
	            }
	    });
	}
});