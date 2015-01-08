<?php
class periodEntity{

  function createPeriod($startDate,$endDate,$username){
    try{

      $this->app = \Slim\Slim::getInstance();
      $userEntity = $this->app->entityFactory->getUserEntity();

      if(!is_null($startDate) && !is_null($endDate) && !is_null($username)) {

        $parsedStartDate = date('d/m/y',strtotime($startDate));
        $parsedEndDate = date('d/m/y',strtotime($endDate));

        if($parsedStartDate <= $parsedEndDate) {
          $userData = $userEntity->getUserDataByUsername($username);

          if(!is_null($userData)) {
            $samePeriodCount = R::count('period','startdate = ? and enddate = ? and user_id = ?',array($parsedStartDate,$parsedEndDate,$userData['id']));

            if($samePeriodCount == 0) {

              $period = R::dispense('period');
              $period->startdate = $parsedStartDate;
              $period->enddate = $parsedEndDate;
              $period->user_id = $userData['id'];

              $id = R::store($period);
              return true;
            }
          }
        }
      }

    }catch(Exception $e){
      return false;
    }
    return false;
  }

  function getAll($user_token) {

    $this->app = \Slim\Slim::getInstance();
    $userEntity = $this->app->entityFactory->getUserEntity();

    $userData = $userEntity->getUserDataByToken($user_token);

    if(!is_null($userData)) {
      $periods = R::findAll('period',' user_id = ? ',array($userData['id']));
      return R::exportAll($periods);
    } else {
      return false;
    }
  }

  function updatePeriod($id,$startdate,$enddate,$user_token) {
    try {
      $this->app = \Slim\Slim::getInstance();
      $userEntity = $this->app->entityFactory->getUserEntity();

      $userData = $userEntity->getUserDataByToken($user_token);

      if(!is_null($userData)) {
        
        $period = R::findOne('period',' id = ? AND user_id = ?',array($id,$userData['id']));

        if(!is_null($period)) {

          $parsedStartDate = date('d/m/y',strtotime($startdate));
          $parsedEndDate = date('d/m/y',strtotime($enddate));
          $period->startdate = $parsedStartDate;
          $period->enddate = $parsedEndDate;
          $result = R::store($period);

          return true;
        }
      }
    } catch (Exception $e) {
      return false;
    }
    return false;
  }

  function deletePeriod($id,$user_token) {
    try {
      $this->app = \Slim\Slim::getInstance();
      $userEntity = $this->app->entityFactory->getUserEntity();

      $userData = $userEntity->getUserDataByToken($token);

      if(!is_null($userData)) {
        $period = R::findOne('period','id = ? AND user_id = ?', array($id,$userData['id']));
        R::trash($period);

        return true;
      }
    } catch (Exception $e) {
      return false;
    }
    return false;
  }
}
?>
