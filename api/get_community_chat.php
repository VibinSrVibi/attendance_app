<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Credentials:true");
header("Access-Control-Allow-Methods:POST,GET,OPTIONS");
header("Access-Control-Allow-Headers:Content-Type,Authorization,X-Requested-with");
header("Content-Type:application/json;charset=utf-8");

$postjson=json_decode(file_get_contents('php://input'),true);
include 'config/config.php';
include './config/bingo_functions.php';
//$id=$_GET['id'];
//$user_id=$_GET['user_id'];
$get_chats=array();

$get_chat_details=mysqli_query($con,"select * from `community_chat` where status='0'");
while($resget_chat_details=mysqli_fetch_array($get_chat_details)){
    $id=$resget_chat_details['id'];
    $user_id=$resget_chat_details['user_id'];
    $username=$resget_chat_details['username'];
    $date_time=$resget_chat_details['date_time'];
    $split_datetime=explode(" ",$date_time);
    //$date=$split_datetime[0];
    $date=date("d/m/Y", strtotime($split_datetime[0]));
    //$time=$split_datetime[1];
    $time=date("h:i:s A", strtotime($split_datetime[1]));
    $message=$resget_chat_details['message'];

    $has_link = stristr($message, 'http://') ?: stristr($message, 'https://');
      if($has_link!=""){
        $link_status=true;
      }else{
        $link_status=false;
      } 
       
             array_push($get_chats,array(
                  "id"=>$id,
                  "user_id"=>$user_id,
                  "username"=>$username,
                  "date"=>$date,
                 "time"=>$time,
                 "message"=>$message,
                 "link_status"=>$link_status,
                 "status"=>0
                            ));
   
      }
      
       
            
             


//echo json_encode($employee_id);
$result=json_encode(array('success'=>true,'results'=>$get_chats));
echo $result;
?>