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
$user_id=$_GET['user_id'];
if($month!='' && $year!=''){
    $start_date=$year.'-'.$month.'-01';
    $last_day = date('t',strtotime($start_date));
    $end_date=date("$year-$month-$last_day");
}else{
    $start_date=date('Y-m').'-01';
    $end_date=date('Y-m-t');
    $month=date('m');
}
//echo $start_date.' - '.$end_date;

$get_dates=getDatesFromRange($start_date,$end_date);
//var_dump($get_dates);

//get users created account between these days
$get_user=mysqli_query($con,"SELECT * FROM `user` WHERE created_datetime <= '".$end_date."' and id='".$user_id."'");
if(mysqli_affected_rows($con)>0){

    $data=array();
    $date_string='';
    $user_array=array();
    $date_array=array();
    $user_id_string='';
    $attendance_array=array();
    while($resgetuser=mysqli_fetch_array($get_user)){
        array_push($user_array,array(
            'user_id'=>$resgetuser['id'],
            'username'=>$resgetuser['username']
        ));
        $user_id_string=$user_id_string."'".$resgetuser['id']."',";
    }
    $user_id_string=rtrim($user_id_string,',');
    foreach($get_dates as $value){
        $date_string=$date_string."'".$value."',";
    }
    $date_string=rtrim($date_string,',');
    //var_dump($month);
    $get_attendance=mysqli_query($con,"select * from `attendance` where month(date)='".$month."' and user_id='".$user_id."'");
    if(mysqli_affected_rows($con)>0){
        //var_dump('sss');
        while($resget_attendance=mysqli_fetch_array($get_attendance)){
            array_push($attendance_array,array(
                'date'=>$resget_attendance['date'],
                'user_id'=>$resget_attendance['user_id']
            ));
        }
        
        foreach($get_dates as $value){
            $insider_data=array();
            //var_dump($user_array);
            foreach($user_array as $user_key => $user_value){
                //check date and user_id exist in attendance_array
                $find_flag=false;
                foreach($attendance_array as $attendance_key => $attendance_value){
                    //var_dump('yes');
                    if($user_array[$user_key]['user_id']==$attendance_array[$attendance_key]['user_id'] && $value==$attendance_array[$attendance_key]['date']){
                        $find_flag=true;
                        //var_dump('----');
                        break;
                    }
                }
                //var_dump(--$find_flag);
                if($find_flag){
                    //var_dump('inner flag');
                    array_push($insider_data,array(
                        'date'=>$value,
                        'user_id'=>$user_array[$user_key]['user_id'],
                        'status'=>1
                    ));
                }else{
                    array_push($insider_data,array(
                        'date'=>$value,
                        'user_id'=>$user_array[$user_key]['user_id'],
                        'status'=>0
                    ));
                }
            }
            //var_dump($insider_data);
             array_push($date_array,array(
                'date'=>$value,
                'data'=>$insider_data
             ));
        }
        //var_dump($date_array);
        $result=json_encode(array('status'=>true,'statuscode'=>200,'msg'=>'success','attendance_data'=>$date_array,'user_data'=>$user_array));
    }else{
        $result=json_encode(array('status'=>true,'statuscode'=>200,'msg'=>'No attendance found','attendance_data'=>[],'user_data'=>$user_array));
    }
}else{
    $result=json_encode(array('status'=>true,'statuscode'=>200,'msg'=>'No user found','attendance_data'=>[],'user_data'=>[]));
}
//echo json_encode($employee_id);

echo $result;
?>