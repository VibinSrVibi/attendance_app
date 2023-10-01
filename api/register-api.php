<?php
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Credentials:true");
    header("Access-Control-Allow-Methods:POST,GET,OPTIONS");
    header("Access-Control-Allow-Headers:Content-Type,Authorization,X-Requested-with");
    header("Content-Type:application/json;charset=utf-8");
    include "config/config.php";
    include 'config/functions.php';
  
    $postjson=json_decode(file_get_contents('php://input'),true);
    date_default_timezone_set('Asia/Calcutta');
    $datetime=date('Y-m-d H:i:s'); 
    $postjson['aksi']=isset($postjson['aksi']) ? $postjson['aksi'] : "";
    if($postjson['aksi']=='user_register')
    {
        //input -- {"aksi":"user_register","mobile":"9488771769","country_code":"91","user_type":"user","device_token":""}
        //to check if mobile number is already exist or not
        $check_email_id=mysqli_query($con,"select * from `user` where mobile='".$postjson['mobile']."'");
        if(mysqli_affected_rows($con)>0)
        {
            $get_user_details=mysqli_fetch_array($check_email_id);
            $user_id=$get_user_details['id'];
            $update=mysqli_query($con,"update `user` set  `device_token`='".$postjson['device_token']."',`updated_datetime`='".$datetime."' where mobile='".$postjson['mobile']."' and id='".$user_id."'");
             if(mysqli_affected_rows($con)>0)
             {
                $result=json_encode(array('status'=>true,'statuscode'=>200,'msg'=>'success','user_id'=>$user_id,'username'=>$get_user_details['username'],'login_status'=>$get_user_details['login_status']));
             }else{
                $result=json_encode(array('status'=>false,'statuscode'=>400,'msg'=>'not updated to db','user_id'=>$user_id,'username'=>$get_user_details['username'],'login_status'=>$get_user_details['login_status']));
            }

        }else{
            //save new record
            $save_data=mysqli_query($con,"insert into `user` (`created_datetime`,`country_code`,`mobile`,`user_type`,`updated_datetime`,`device_token`) values ('".$datetime."','".$postjson['country_code']."','".$postjson['mobile']."','".$postjson['user_type']."','".$datetime."','".$postjson['device_token']."')");
            if(mysqli_affected_rows($con)>0){
                $user_id=mysqli_insert_id($con);
                $result=json_encode(array('status'=>true,'statuscode'=>200,'msg'=>'success','user_id'=>(string)$user_id,'username'=>'','login_status'=>'0'));
            }else{
                $result=json_encode(array('status'=>false,'statuscode'=>400,'msg'=>'unable to save to db','user_id'=>'','username'=>'','login_status'=>0));
            }
        }
        echo $result;
    }
    elseif($postjson['aksi']=='fill_user_profile'){
        $save_data=mysqli_query($con, "update `user` set `username`='".$postjson['username']."',`profile_pic`='".$postjson['profile_pic']."',`dob`='".$postjson['dob']."',`login_status`='1',`email`='".$postjson['email']."',`updated_datetime`='".$datetime."' where id='".$postjson['user_id']."'");
        if(mysqli_affected_rows($con)>0){
            $result=json_encode(array('status'=>true,'statuscode'=>200,'msg'=>'success','login_status'=>'1'));
        }else{
            $result=json_encode(array('status'=>false,'statuscode'=>400,'msg'=>'not updated to db'));
        }
        echo $result;
    } elseif($postjson['aksi']=='save_attendance'){
        //check already user put login 
        $check=mysqli_query($con,"select * from `attendance` where user_id='".$postjson['user_id']."' and date='".date('Y-m-d')."'");
        //var_dump(mysqli_affected_rows($con));
        if(mysqli_affected_rows($con)>0){
            $result=json_encode(array('status'=>true,'statuscode'=>200,'msg'=>'already logged in')); 
        }else{
            $save_attendance=mysqli_query($con,"INSERT INTO `attendance`(`user_id`, `date`, `in_datetime`, `status`) VALUES ('".$postjson['user_id']."','".date('Y-m-d')."','".$datetime."','1')");
            if(mysqli_affected_rows($con)){
                $result=json_encode(array('status'=>true,'statuscode'=>200,'msg'=>'success')); 
            }else{
                $result=json_encode(array('status'=>false,'statuscode'=>400,'msg'=>'not saved to db')); 
            }
        }
        echo $result;
    }elseif($postjson['aksi']=='admin_login'){
        $admin_check=mysqli_query($con,"select * from `admin` where user_id='".$postjson['user_id']."' and password='".$postjson['password']."'");
        if(mysqli_affected_rows($con)>0){
            $result=json_encode(array('status'=>true,'statuscode'=>200,'msg'=>'success')); 
        }else{
            $result=json_encode(array('status'=>false,'statuscode'=>200,'msg'=>'wrong user id and password')); 
        }
        echo $result;
    }
    

?>