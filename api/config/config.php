<?php
//$con = new mysqli('localhost', 'root','' ,'bingo');
//password  W4r9>S72^5#74y1@
//username  vb_bingo
//db  bingo
//    if ($con->connect_error) {
//    die("Connection failed: " . $con->connect_error);
//   
//}


//$con = mysqli_connect("localhost","id16964436_bingo","W4r9>S72^5#74y1@","id16964436_vb_bingo");
// $db_name ='id16964436_bingo';
// $dbusername = 'id16964436_vb_bingo';
// $dbpassword = 'W4r9>S72^5#74y1@';
// $server = 'localhost';

$host		= "localhost"; // Use Local Host Only       
$username	= "root"; 
$password	= "";  
$db_name	= "attendance_app";  
 
$con = mysqli_connect($host, "root", "", "attendance_app"); 

    if ($con->connect_error) {
    die("Connection failed: " . $con->connect_error);
   
}





?>