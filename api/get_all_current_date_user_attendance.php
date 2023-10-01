<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Credentials:true");
header("Access-Control-Allow-Methods:POST,GET,OPTIONS");
header("Access-Control-Allow-Headers:Content-Type,Authorization,X-Requested-with");
header("Content-Type:application/json;charset=utf-8");

$postjson=json_decode(file_get_contents('php://input'),true);
include 'config/config.php';

//$user_id=$_GET['user_id']; 
$date=date('Y-m-d');
$total_active_user_count=mysqli_query($con,"select count(*) as count from `user` where status='0'");
if(mysqli_affected_rows($con)){
    $get_total_count=mysqli_fetch_array($total_active_user_count);
    $active_user_count=$get_total_count['count'];
}else{
    $active_user_count=0;
}
$get_attendance=mysqli_query($con,"select t1.*,t2.username from `attendance` t1 left join `user` t2 on t1.user_id=t2.id  where date='".$date."'");
$current_date_attendance=array();
while($resget_attendance=mysqli_fetch_array($get_attendance)){
    array_push($current_date_attendance,array(
        'id'=>$resget_attendance['id'],
        'user_id'=>$resget_attendance['user_id'],
        'date'=>$resget_attendance['date'],
        'in_datetime'=>$resget_attendance['in_datetime'],
        'username'=>$resget_attendance['username']
    ));
}

//echo json_encode($employee_id);
$result=json_encode(array('status'=>true,'statuscode'=>200,'total_users'=>$active_user_count,'data'=>$current_date_attendance));
echo $result;
?>