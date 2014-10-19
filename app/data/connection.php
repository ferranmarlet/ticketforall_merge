<?php
require '../app/data/rb.php';
require '../app/data/config.php';

//For testing purposes we only need to create a temporary database on our /tmp folder.
//We do so by using this specific R method:
R::setup('mysql:host='.dbHost.';dbname='.dbname,dbUser,dbPassword); 
?>
