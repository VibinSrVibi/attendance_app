<?php
include './config/config.php';
?>
<html>
    <head>
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <!-- Latest compiled and minified CSS -->
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css">

<!-- jQuery library -->
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>

<!-- Latest compiled JavaScript -->
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/js/bootstrap.min.js"></script>
    </head>
    <body>
        <div class="container">
            <div class="row">
                <div class="col-sm-12 ">
                    <div class="table-responsive">
        <table class="table">
            <tr>
                <th>Username</th>
                <th style="width:50px;">Message</th>
                <th>DateTime</th>
                <th>Delete</th>
            </tr>
            <?php 
            $get_messages= mysqli_query($con, "select * from `community_chat` where status='0' order by id desc");
            while($resget_messages= mysqli_fetch_array($get_messages)){
                $id=$resget_messages['id'];
                $username=$resget_messages['username'];
                $message=$resget_messages['message'];
                $date_time=$resget_messages['date_time'];
            
            ?>
            <tr>
                <td><?=$username?></td>
                <td style="width:50px;"><?=$message;?></td>
                <td><?=$date_time;?></td>
                <td><a href="delete_message.php?delete_id=<?=$id;?>">Delete</a></td>
            </tr>
            <?php
            }
            ?>
        </table>
    </div>
</div>
</div>
</div>
    </body>
</html>

<?php 
if(isset($_REQUEST['delete_id'])!=''){
    $id=$_GET['delete_id'];
    $delete=mysqli_query($con,"update `community_chat` set `status`='1' where id='".$id."'");
    if(mysqli_affected_rows($con)>0){
        echo "<script>alert('Deleted Successfully');window.location='delete_message.php'</script>";
    }else{
       echo "<script>alert('Error');</script>";  
    }
    
}
?>