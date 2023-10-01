<?php

define('API_ACCESS_KEY','AAAAobcfmFU:APA91bHZqDRibU1a7s_CJYMt9IC431BykcsN7wmmABZ91LSOW27WHPliSGZdXBzoJEHkjKq1lya48pClH8rdEgFDQjFWCATW4ldCiskJUsB2aiGSg8LIiL8zNzXUKcY8UCI7x-ZgaM0r');

include 'config.php';

function get_username($con,$user_id){
    $get_details=mysqli_query($con,"select * from `bingo_users` where user_id='".$user_id."'");
    $resget_details=mysqli_fetch_array($get_details);
    $username=$resget_details['username'];
    return $username;
}

function send_notification($con,$title,$message,$user_id,$username){
     $fcmUrl = 'https://fcm.googleapis.com/fcm/send';
     //get all the user tokens
     $get_user_tokens=mysqli_query($con,"select * from `bingo_users` where status='0' and user_id!='".$user_id."'");
     while($resget_user_tokens=mysqli_fetch_array($get_user_tokens)){
        $tokens=$resget_user_tokens['tokens'];
        if($tokens!=''){
 $token=$tokens;
 

     $notification = [
            'title' =>$title,
            'body' => $message,
            'icon' =>'myIcon', 
            'sound' => 'mySound',
             "click_action"=>"FCM_PLUGIN_ACTIVITY",
            'user_id'=>$user_id,
                    'username'=>$username,
                   // 'date'=>$date,
                  //  'time'=>$time,
                    'status'=>0
        ];
        
        $fcmNotification = [
            
            'to'        => $token, //single token
            "priority"=>"high",
            'notification' => $notification,
           // 'data' => $extraNotificationData
            'data'=>['title' =>$title,
                    'body' => $message,
                    'user_id'=>$user_id,
                    'username'=>$username,
                   // 'date'=>$date,
                   // 'time'=>$time,
                    'status'=>0
                ]
        ];

        $headers = [
            'Authorization: key=' . API_ACCESS_KEY,
            'Content-Type: application/json'
        ];


        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL,$fcmUrl);
        curl_setopt($ch, CURLOPT_POST, true);
        curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
        curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($fcmNotification));
        $result = curl_exec($ch);
        curl_close($ch);
    }
}
}

function getDatesFromRange($start, $end, $format = 'Y-m-d') {
      
    // Declare an empty array
    $array = array();
      
    // Variable that store the date interval
    // of period 1 day
    $interval = new DateInterval('P1D');
  
    $realEnd = new DateTime($end);
    $realEnd->add($interval);
  
    $period = new DatePeriod(new DateTime($start), $interval, $realEnd);
  
    // Use loop to store date into array
    foreach($period as $date) {                 
        $array[] = $date->format($format); 
    }
  
    // Return the array elements
    return $array;
}
  


//send_notification($con,'ss','sds','user','sdsd');

?>