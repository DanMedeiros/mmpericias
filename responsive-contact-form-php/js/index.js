$(document).ready(function() {
  $("#submit_btn").click(function() {

    var proceed = true;
    //simple validation at client's end
    //loop through each field and we simply change border color to red for invalid fields       
    $("#contact_form input[required=true], #contact_form textarea[required=true]").each(function() {
      $(this).css('border-color', '');
      if (!$.trim($(this).val())) { //if this field is empty 
        $(this).css('border-color', 'red'); //change border color to red   
        proceed = false; //set do not proceed flag
      }
      //check invalid email
      var email_reg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
      if ($(this).attr("type") == "email" && !email_reg.test($.trim($(this).val()))) {
        $(this).css('border-color', 'red'); //change border color to red   
        proceed = false; //set do not proceed flag              
      }
    });

    if (proceed) //everything looks good! proceed...
    {
      //get input field values data to be sent to server
      post_data = {
        'user_name': $('input[name=name]').val(),
        'user_email': $('input[name=email]').val(),
        'phone_number': $('input[name=phone2]').val(),
        'msg': $('textarea[name=message]').val()
      };

      //Ajax post data to server
      $.post('php/contact_me.php', post_data, function(response) {
        if (response.type == 'error') { //load json data from server and output message     
          output = '<div class="error">' + response.text + '</div>';
        } else {
          output = '<div class="success">' + response.text + '</div>';
          //reset values in all input fields
          $("#contact_form  input[required=true], #contact_form textarea[required=true]").val('');
          $("#contact_form #contact_body").slideUp(); //hide form after success
        }
        $("#contact_form #contact_results").hide().html(output).slideDown();
      }, 'json');
    }
  });

  //reset previously set border colors and hide all message on .keyup()
  $("#contact_form  input[required=true], #contact_form textarea[required=true]").keyup(function() {
    $(this).css('border-color', '');
    $("#result").slideUp();
  });
});
/* end of JS */





/*PHP: 

<?php
if($_POST)
{
	$to_email   	= "YOU@YOURWEBSITE.COM"; //Recipient email, Replace with own email here
	$subject="***Enquiry from YOURWEBSITE.COM***";
	
	//check if its an ajax request, exit if not
    if(!isset($_SERVER['HTTP_X_REQUESTED_WITH']) AND strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) != 'xmlhttprequest') {
		
		$output = json_encode(array( //create JSON data
			'type'=>'error', 
			'text' => 'Sorry Request must be Ajax POST'
		));
		die($output); //exit script outputting json data
    } 
	
	//Sanitize input data using PHP filter_var().
	$user_name		= filter_var($_POST["user_name"], FILTER_SANITIZE_STRING);
	$user_email		= filter_var($_POST["user_email"], FILTER_SANITIZE_EMAIL);
	$phone_number	= filter_var($_POST["phone_number"], FILTER_SANITIZE_NUMBER_INT);
	$message		= filter_var($_POST["msg"], FILTER_SANITIZE_STRING);
	
	//additional php validation
	if(strlen($user_name)<4){ // If length is less than 4 it will output JSON error.
		$output = json_encode(array('type'=>'error', 'text' => 'Name is too short or empty'));
		die($output);
	}
	if(!filter_var($user_email, FILTER_VALIDATE_EMAIL)){ //email validation
		$output = json_encode(array('type'=>'error', 'text' => 'Please enter a valid email'));
		die($output);
	}
	if(!filter_var($phone_number, FILTER_SANITIZE_NUMBER_FLOAT)){ //check for valid numbers in phone number field
		$output = json_encode(array('type'=>'error', 'text' => 'Enter only digits in phone number'));
		die($output);
	}
	if(strlen($message)<3){ //check emtpy message
		$output = json_encode(array('type'=>'error', 'text' => 'You forgot the most important part..'));
		die($output);
	}
	
	//email body
	$message_body = $message."\r\n\r\n-".$user_name."\r\nEmail : ".$user_email."\r\nPhone Number : (".$country_code.") ". $phone_number ;
	
	//proceed with PHP email.
	$headers = 'From: '.$user_name.'' . "\r\n" .
	'Callback: '.$phone_number.'' . "\r\n" .
	'Reply-To: '.$user_email.'' . "\r\n" .
	'X-Mailer: PHP/' . phpversion();
	
	$send_mail = mail($to_email, $subject, $message_body, $headers);
	
	if(!$send_mail)
	{
		//If mail couldn't be sent output error. Check your PHP email configuration (if it ever happens)
		$output = json_encode(array('type'=>'error', 'text' => 'Could not send mail! Please check your PHP mail configuration.'));
		die($output);
	}else{
		$output = json_encode(array('type'=>'message', 'text' => 'Hi '.$user_name .' We will reply as soon as possible!'));
		die($output);
	}
}
?>

     end of PHP*/