<!DOCTYPE html>
<html lang="es" ng-app='ticketforall'>
  <head>
	<meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Ticket For All!</title>

    <!-- Styles -->
    <link href="frontEnd/fonts/Lato.css" rel="stylesheet">
    <link rel="stylesheet" href="frontEnd/css/bootstrap.css" media="screen">
    <link href="frontEnd/css/bootswatch.min.css" rel="stylesheet">
	<link href="frontEnd/css/style.css" rel="stylesheet">
  </head>
  
  <body ng-controller = "mainController">
    <!-- Top navbar -->
    <div class="navbar navbar-default navbar-fixed-top" ng-show="currentUser.userId != null">
      <div class="container">
        <div class="navbar-header">
          <a href="#/inici" class="navbar-brand"><img src = "frontEnd/img/navbarLogo.png" ></a>
          <a href="#/inici" class="navbar-brand">Ticket For All!</a>
          <button class="navbar-toggle" type="button" data-toggle="collapse" data-target="#navbar-main">
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
          </button>
        </div>
        <div class="navbar-collapse collapse" id="navbar-main">
          <ul class="nav navbar-nav">
            <li>
              <a href="#/ticket">{{'OBT_TICKET'|translate}}</a>
            </li>
            <li><a href="#/periodesAbsencia">{{'GEST_PERIODES'|translate}}</a></li>
            <li class="dropdown">
              <a class="dropdown-toggle" data-toggle="dropdown" href="" id="A1">{{'CONSULTES'|translate}} <span class="caret"></span></a>
              <ul class="dropdown-menu" aria-labelledby="themes">
                <li><a href="">{{'DIARIS_BESCANV'|translate}}</a></li>
                <li><a href="">{{'QUIOSCS_PROPERS'|translate}}</a></li>
                <li><a href="">{{'TUTORIAL'|translate}}</a></li>
              </ul>
            </li>
          </ul>

          <ul class="nav navbar-nav navbar-right" >
            <li><a href="#/perfil"><img src = "frontEnd/img/usr.png" width ="25" height"25" > {{currentUser.userId}} </a></li>
            <li><a><img src = "frontEnd/img/logout.png" ng-click='logOut()' width ="15" height"15" style ="cursor: pointer"></a></li>
          </ul>

        </div>
      </div>
    </div>
    
    <!-- Content -->
    <div ng-view></div>
    
    <!-- Footer -->
    <div class="container" ng-show="currentUser.userId != null">
        <footer style="margin-bottom:10px">
            <div class="row">
                <div class="col-lg-12">
                    <ul class="list-unstyled">
                        <li><a href="#/avisLegal" >{{'AVIS_LEGAL'|translate}}</a></li>
                        <li><a href="#privacitat" >{{'POLITICA_P'|translate}}</a></li>
                        <li><a href="#/cookies" >{{'POLITICA_C'|translate}}</a></li>
                        <li><a href="#/contactar">{{'CONTACTAR'|translate}}</a></li>
                        <li><a href="#/faq">{{'FAQ'|translate}}</a></li>
                    </ul>
                </div>
            </div>
        </footer>
    </div>

    <!-- Libs -->
    <script src="frontEnd/js/libs/jquery-1.11.1.min.js"></script>
    <script src="frontEnd/js/libs/bootstrap.min.js"></script>
    <script src="frontEnd/js/libs/bootswatch.js"></script>
    <script src="frontEnd/js/libs/angular.min.js"></script>
    <script src="frontEnd/js/libs/angular-route.min.js"></script>
    <script src="frontEnd/js/libs/angular-translate.min.js"></script>
	<script src="frontEnd/js/libs/angular-translate-loader-static-files.min.js"></script>


    <!-- App scripts -->
    <script src="frontEnd/js/app.js"></script>
    <script src="frontEnd/js/controllers.js"></script>
    <script src="frontEnd/js/directives.js"></script>
    <script src="frontEnd/js/services.js"></script>

  </body>
</html>