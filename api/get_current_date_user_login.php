<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Credentials:true");
header("Access-Control-Allow-Methods:POST,GET,OPTIONS");
header("Access-Control-Allow-Headers:Content-Type,Authorization,X-Requested-with");
header("Content-Type:application/json;charset=utf-8");

$postjson=json_decode(file_get_contents('php://input'),true);
include 'config/config.php';

$user_id=$_GET['user_id']; 
$date=date('Y-m-d');
$get_attendance=mysqli_query($con,"select * from `attendance` where user_id='".$user_id."' and date='".$date."'");

$resget_attendance=mysqli_fetch_assoc($get_attendance);

//echo json_encode($employee_id);
$result=json_encode(array('status'=>true,'statuscode'=>200,'data'=>$resget_attendance));
echo $result;
?>