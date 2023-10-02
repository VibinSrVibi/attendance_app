<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Credentials:true");
header("Access-Control-Allow-Methods:POST,GET,OPTIONS");
header("Access-Control-Allow-Headers:Content-Type,Authorization,X-Requested-with");
header("Content-Type:application/json;charset=utf-8");

$postjson=json_decode(file_get_contents('php://input'),true);
include 'config/config.php';
include 'config/functions.php';
$month=$_GET['month'];
$year=$_GET['year'];
if($month!='' && $year!=''){
    $start_date=$year.'-'.$month.'-01';
    $last_day = date('t',strtotime($start_date));
    $end_date=date("$year-$month-$last_day");
}else{
    $start_date=date('Y-m').'-01';
    $end_date=date('Y-m-t');
    $month=date('m');
    $year=date('Y');
}
//echo $start_date.' - '.$end_date;

$get_dates=getDatesFromRange($start_date,$end_date);
//var_dump($get_dates);

//get users created account between these days
$get_user=mysqli_query($con,"SELECT * FROM `user` WHERE created_datetime <= '".$end_date."'");
if(mysqli_affected_rows($con)>0){

    $data=array();
    $user_array=array();
    $user_id_string='';
    $monthly_fee_paid_users=array();
    while($resgetuser=mysqli_fetch_array($get_user)){
        array_push($user_array,array(
            'user_id'=>$resgetuser['id'],
            'username'=>$resgetuser['username'],
            'paid_status'=>0,
            'month'=>$month,
            'year'=>$year
        ));
        $user_id_string=$user_id_string."'".$resgetuser['id']."',";
    }
    $get_monthly_fee=mysqli_query($con,"select * from `monthly_fee` where month='".$month."' and year='".$year."'");
    if(mysqli_affected_rows($con)>0){
      while($resget_monthly_fee=mysqli_fetch_array($get_monthly_fee)){
        array_push($monthly_fee_paid_users,array(
          'id'=>$resget_monthly_fee['id'],
          'user_id'=>$resget_monthly_fee['user_id'],
          'datetime'=>$resget_monthly_fee['datetime'],
        ));
      }
      foreach($user_array as $user_key => $user_value){
        $check_user_paid_flag=false;
        foreach($monthly_fee_paid_users as $paid_key => $paid_value){
          if($user_array[$user_key]['user_id']==$monthly_fee_paid_users[$paid_key]['user_id']){
            $check_user_paid_flag=true;
          }
        }
        if($check_user_paid_flag){
          $user_array[$user_key]['paid_status']=1;
        }else{
          $user_array[$user_key]['paid_status']=0;
        }
      }
    }
      $result=json_encode(array('status'=>true,'statuscode'=>200,'msg'=>'Success','data'=>$user_array));
    
   
}else{
    $result=json_encode(array('status'=>true,'statuscode'=>200,'msg'=>'No user found','data'=>[]));
}
//echo json_encode($employee_id);

echo $result;
?>