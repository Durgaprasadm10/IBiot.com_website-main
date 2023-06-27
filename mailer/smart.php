<?php 

require "class.phpmailer.php";
require "class.smtp.php";

$name = filter_input(INPUT_POST, 'name',FILTER_SANITIZE_STRING);
$phone = filter_input(INPUT_POST, 'phone',FILTER_SANITIZE_SPECIAL_CHARS);
$email = filter_input(INPUT_POST, 'email',FILTER_SANITIZE_SPECIAL_CHARS);
$comment = filter_input(INPUT_POST, 'comment',FILTER_SANITIZE_STRING);

if(strlen(trim($name))==0){
	echo "1~~name should not be blank";
	die;
}

if(strlen(trim($phone))==0){
	echo "1~~phone should not be blank";
	die;
}

if(strlen(trim($email))==0){
	echo "1~~email should not be blank";
	die;
}

if(strlen(trim($comment))==0){
	echo "1~~comment should not be blank";
	die;
}

//require_once('phpmailer/PHPMailerAutoload.php');
$mail = new PHPMailer;
$mail->CharSet = 'utf-8';

 $mail->SMTPDebug = 0;                               // Enable verbose debug output

$mail->isSMTP();                                      // Set mailer to use SMTP
$mail->Host = 'smtp.office365.com';  // Specify main and backup SMTP servers
$mail->SMTPAuth = true;                               // Enable SMTP authentication
$mail->Username = 'support@dgtrak.com';                 // smtp email used to send for email
$mail->Password = '8RmKHle3';                           // smtp password used for sending password
$mail->SMTPSecure = 'tls';                            // Enable TLS encryption, `ssl` also accepted
$mail->Port = 587;                                    // TCP port to connect to
 
$mail->setFrom("sales@ideabytesiot.com");   // How name and email should appear in the mail sent
$mail->addAddress("sales@ideabytesiot.com");     // Email address to which email to be sent

//$mail->addAddress("kishore.putrevu@ideabytes.com"); 

//$mail->addAddress('ellen@example.com');               // Name is optional
//$mail->addReplyTo('info@example.com', 'Information');
//$mail->addCC('cc@example.com');
//$mail->addBCC('bcc@example.com');
//$mail->addAttachment('/var/tmp/file.tar.gz');         // Add attachments
//$mail->addAttachment('/tmp/image.jpg', 'new.jpg');    // Optional name
$mail->isHTML(true);                                  // Set email format to HTML

$mail->Subject = $name.' contacted from IdeabytesIoT';

$message = 'A user contacted from IdeabytesIoT <br> <br>
	Name: ' . $name . ' <br>
	Telephone number: ' . $phone . '<br>
	E-mail: ' . $email . '<br>
	Comments: '.$comment;

if(isset($_POST['newsletters'])){
  $message .= "<br>News Letters: User interested in newsletters.";
}

$mail->Body    = $message;
	

if(!$mail->send()) {
    //return false;
echo "2~~failed";
} else {
    //return true;
echo "3~~success";
}

?>
