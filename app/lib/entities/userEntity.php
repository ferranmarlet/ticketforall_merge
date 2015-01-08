<?php
class userEntity{
  function getUserDataByToken($token) {
    $user = R::findOne('user',' token = ? ', array($token));

    if(!is_null($user)) {
      return $user->export();
    }else{
      return NULL;
    }
  }

  function getUserDataByUsername($username) {
    $user = R::findOne('user',' username = ? ', array($username));

    if(!is_null($user)) {
      return $user->export();
    }else{
      return NULL;
    }
  }

  function verifyUser($username,$token){
    $user = R::findOne('user','username = ? and token = ?',array($username,$token));

    if(!is_null($user)) {
      return true;
    } else {
      return false;
    }
  }

  function login($username, $password, &$loginToken, &$role){
      $user = R::findOne('user',' username = ? and password = ? ', array($username, $password));

      if(!is_null($user)) {
        $loginToken = $user->token;
        $role = $user->role;
        return true;
      }else{
        return false;
      }
  }
}
?>
