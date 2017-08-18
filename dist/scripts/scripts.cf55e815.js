"use strict";var app=angular.module("app",["ngCookies","ngSanitize","ui.router","restmod","ui.bootstrap","wiz.validation","file-model","angularPromiseButtons","ngImgur"]);app.constant("Options",{baseUrl:"http://localhost:9000",apiUrl:"https://neivacomentapi.herokuapp.com/"}),app.config(["restmodProvider",function(a){a.rebase("AMSApi")}]),app.factory("Board",["restmod","Options",function(a,b){return a.model(b.apiUrl+"/boards")}]),app.factory("Topic",["restmod","Options",function(a,b){return a.model(b.apiUrl+"/topics")}]),app.factory("Post",["restmod","Options",function(a,b){return a.model(b.apiUrl+"/posts")}]),angular.module("ngLocale",[],["$provide",function(a){var b={ZERO:"zero",ONE:"one",TWO:"two",FEW:"few",MANY:"many",OTHER:"other"};a.value("$locale",{DATETIME_FORMATS:{AMPMS:["a. m.","p. m."],DAY:["domingo","lunes","martes","miércoles","jueves","viernes","sábado"],ERANAMES:["antes de Cristo","después de Cristo"],ERAS:["a. C.","d. C."],FIRSTDAYOFWEEK:6,MONTH:["enero","febrero","marzo","abril","mayo","junio","julio","agosto","septiembre","octubre","noviembre","diciembre"],SHORTDAY:["dom.","lun.","mar.","mié.","jue.","vie.","sáb."],SHORTMONTH:["ene.","feb.","mar.","abr.","may.","jun.","jul.","ago.","sept.","oct.","nov.","dic."],STANDALONEMONTH:["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"],WEEKENDRANGE:[5,6],fullDate:"EEEE, d 'de' MMMM 'de' y",longDate:"d 'de' MMMM 'de' y",medium:"d/MM/y h:mm:ss a",mediumDate:"d/MM/y",mediumTime:"h:mm:ss a",short:"d/MM/yy h:mm a",shortDate:"d/MM/yy",shortTime:"h:mm a"},NUMBER_FORMATS:{CURRENCY_SYM:"$",DECIMAL_SEP:",",GROUP_SEP:".",PATTERNS:[{gSize:3,lgSize:3,maxFrac:3,minFrac:0,minInt:1,negPre:"-",negSuf:"",posPre:"",posSuf:""},{gSize:3,lgSize:3,maxFrac:2,minFrac:2,minInt:1,negPre:"-¤",negSuf:"",posPre:"¤",posSuf:""}]},id:"es-co",localeID:"es_CO",pluralCat:function(a,c){return 1==a?b.ONE:b.OTHER}})}]),function(a){a.module("restmod").factory("AMSApi",["restmod","inflector",function(a,b){return a.mixin("DefaultPacker",{$config:{style:"AMS",primaryKey:"id",jsonMeta:"meta",jsonLinks:"links"},$extend:{Model:{decodeName:b.camelize,encodeName:function(a){return b.parameterize(a,"_")},encodeUrlName:b.parameterize}}})}])}(angular),app.config(["$stateProvider","$urlRouterProvider",function(a,b){a.state("indexBoards",{url:"/",views:{navegacion:{templateUrl:"views/navegacion.html",controller:["$scope","Board",function(a,b){a.esperando=!0,a.boards=[],b.$search().$asPromise().then(function(b){a.boards=b,a.esperando=!1})}]},contenido:{templateUrl:"views/boards/index.html",controller:["$scope","$window","Board",function(a,b,c){a.esperando=!0,a.boards=[],a.width=b.innerWidth,a.height=b.innerHeight,b.onresize=function(){a.updateWidth(),a.updateHeight(),a.$apply()},a.updateWidth=function(){a.width=b.innerWidth},a.updateHeight=function(){a.height=b.innerHeight},c.$search().$asPromise().then(function(b){a.boards=b,a.esperando=!1})}]}}}).state("showBoard",{url:"/boards/:boardId",views:{navegacion:{templateUrl:"views/navegacion.html",controller:["$scope","Board",function(a,b){a.esperando=!0,a.boards=[],b.$search().$asPromise().then(function(b){a.boards=b,a.esperando=!1})}]},contenido:{templateUrl:"views/boards/ver.html",controller:["$scope","$stateParams","$window","$uibModal","Board",function(a,b,c,d,e){a.esperando=!0,a.board={},a.width=c.innerWidth,a.height=c.innerHeight,c.onresize=function(){a.updateWidth(),a.updateHeight(),a.$apply()},a.updateWidth=function(){a.width=c.innerWidth},a.updateHeight=function(){a.height=c.innerHeight},e.$find(b.boardId).$asPromise().then(function(b){a.board=b,a.esperando=!1}),a.crearTopic=function(){d.open({animation:!0,templateUrl:"views/topics/nuevo.html",controller:["$scope","$uibModalInstance","$q","$http","$base64","Topic",function(a,b,c,d,e,f){a.nuevoTopic=f.$build(),a.submit=function(){console.log(a.nuevoTopic.image);var b={method:"POST",url:"https://api.imgur.com/3/image",headers:{Authorization:"Client-ID 54b31582e98cdfa"},data:{image:a.nuevoTopic.image}};d(b).then(function(a){console.log("ok"),console.log(a)},function(a){console.log("falló"),console.log(a)})},a.cancelar=function(){b.dismiss("cancel")}}]})}}]}}}),b.otherwise("/")}]),app.config(["$stateProvider","$urlRouterProvider",function(a,b){a.state("showTopic",{url:"/topics/:topicId",views:{navegacion:{templateUrl:"views/navegacion.html",controller:["$scope","Board",function(a,b){a.esperando=!0,a.boards=[],b.$search().$asPromise().then(function(b){a.boards=b,a.esperando=!1})}]},contenido:{templateUrl:"views/topics/ver.html",controller:["$scope","$stateParams","$window","Topic",function(a,b,c,d){a.esperando=!0,a.topic={},a.width=c.innerWidth,a.height=c.innerHeight,c.onresize=function(){a.updateWidth(),a.updateHeight(),a.$apply()},a.updateWidth=function(){a.width=c.innerWidth},a.updateHeight=function(){a.height=c.innerHeight},d.$find(b.topicId).$asPromise().then(function(b){a.topic=b,a.esperando=!1})}]}}}).state("newTopic",{url:"/nuevoTopic/:boardId",views:{navegacion:{templateUrl:"views/navegacion.html",controller:["$scope","Board",function(a,b){a.esperando=!0,a.boards=[],b.$search().$asPromise().then(function(b){a.boards=b,a.esperando=!1})}]},contenido:{templateUrl:"views/topics/nuevo.html",controller:["$scope","$stateParams","$http","$window","$q","$state","Topic","imgur",function(a,b,c,d,e,f,g,h){a.boardId=b.boardId,a.nuevoTopic=g.$build(),a.nuevoTopic.boardId=a.boardId,a.submit=function(){function b(){a.nuevoTopic.$save().$asPromise().then(function(b){c.resolve(b),console.log("topic creado"),swal({title:"¡Topic creado con éxito!",text:"Se creó el topic "+a.nuevoTopic.title,type:"success",showCancelButton:!1,confirmButtonText:"Aceptar",closeOnConfirm:!0,html:!1},function(){f.go("showBoard",{boardId:a.nuevoTopic.boardId})})},function(b){c.reject(b),console.log("topic NO creado"),swal("No se pudo crear el topic "+a.nuevoTopic.title,JSON.stringify(b.$response.data),"error")})}var c=e.defer();return h.setAPIKey("Client-ID 54b31582e98cdfa"),h.upload(a.nuevoTopic.image).then(function(c){a.nuevoTopic.image=c.link,b()}),c.promise}}]}}})}]),app.config(["$stateProvider","$urlRouterProvider",function(a,b){a.state("newPost",{url:"/nuevoPost/:topicId",views:{navegacion:{templateUrl:"views/navegacion.html",controller:["$scope","Board",function(a,b){a.esperando=!0,a.boards=[],b.$search().$asPromise().then(function(b){a.boards=b,a.esperando=!1})}]},contenido:{templateUrl:"views/posts/nuevo.html",controller:["$scope","$stateParams","$http","$window","$q","$state","Post","imgur",function(a,b,c,d,e,f,g,h){a.topicId=b.topicId,a.nuevoPost=g.$build(),a.nuevoPost.topicId=a.topicId,a.submit=function(){function b(){a.nuevoPost.$save().$asPromise().then(function(b){c.resolve(b),swal({title:"¡Post creado con éxito!",type:"success",showCancelButton:!1,confirmButtonText:"Aceptar",closeOnConfirm:!0,html:!1},function(){f.go("showTopic",{topicId:a.nuevoPost.topicId})})},function(a){c.reject(a),console.log("post NO creado"),swal("No se pudo crear el post ",JSON.stringify(a.$response.data),"error")})}var c=e.defer();return a.nuevoPost.image&&a.nuevoPost.image.size?(h.setAPIKey("Client-ID 54b31582e98cdfa"),h.upload(a.nuevoPost.image).then(function(c){a.nuevoPost.image=c.link,b()})):(a.nuevoPost.image="no-imagen",b()),c.promise}}]}}})}]),app.config(["$stateProvider","$urlRouterProvider",function(a,b){a.state("faq",{url:"/faq",views:{navegacion:{templateUrl:"views/navegacion.html",controller:["$scope","Board",function(a,b){a.esperando=!0,a.boards=[],b.$search().$asPromise().then(function(b){a.boards=b,a.esperando=!1})}]},contenido:{templateUrl:"views/estaticos/faq.html"}}}).state("reglas",{url:"/reglas",views:{navegacion:{templateUrl:"views/navegacion.html",controller:["$scope","Board",function(a,b){a.esperando=!0,a.boards=[],b.$search().$asPromise().then(function(b){a.boards=b,a.esperando=!1})}]},contenido:{templateUrl:"views/estaticos/reglas.html"}}}),b.otherwise("/")}]),angular.module("app").run(["$templateCache",function(a){a.put("views/boards/index.html",'<div ng-if="esperando"> esperando... </div> <div ng-if="!esperando" class="row"> <ul class="list-group col-md-4 col-sm-12" ng-if="width > 980"> <li class="list-group-item" ui-sref="showBoard({boardId: board.id})" ng-repeat="board in boards"> <a href="">{{ board.name }}</a> <p>{{ board.description }}</p> </li> </ul> <div class="btn-group btn-block" ng-if="width < 768"> <button type="button" class="btn btn-default btn-block dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"> Muros <span class="caret"></span> </button> <ul class="dropdown-menu"> <li class="list-group-item" ui-sref="showBoard({boardId: board.id})" ng-repeat="board in boards"> <a href="">{{ board.name }}</a> <p>{{ board.description }}</p> </li> </ul> </div> <div class="imagen-portada col-md-8"> <img class="img-responsive" src="images/imagen.f5608d5a.jpg" alt=""> </div> </div>'),a.put("views/boards/ver.html",'<div class="row" ng-if="!esperando"> <div class="text-center"> <h1>{{ board.name }}</h1> <p>{{ board.description }}</p> <p><a href="" ui-sref="indexBoards">[volver]</a> </p></div> <p class="crear-topic"><a href="#" ui-sref="newTopic({boardId: board.id})">[Crear Tema Nuevo]</a></p> <div ng-if="board.topics.length > 0"> <div ng-repeat="topic in board.topics"> <div class="panel panel-default panel-topic"> <div class="panel-heading"> <h3 class="panel-title"><strong>{{ topic.title }}</strong></h3> </div> <div class="panel-body"> <div class="row primera-fila"> <div class="col-sm-2"> <a href="{{ topic.image }}" target="_blank"><img class="img-responsive" src="{{ topic.image }}" alt=""></a> </div> <div class="col-sm-10"> <p ng-if="width < 768" class="fecha"><small>{{ topic.createdAt | date:\'dd MMM yyyy h:mm a\'}}</small></p> <ul class="opciones"> <li ng-if="width >= 768" class="fecha"><small>{{ topic.createdAt | date:\'dd MMM yyyy h:mm a\'}} - </small></li> <li><a href="" ui-sref="showTopic({topicId: topic.id})">[ver tema]</a></li> <li><a href="" ui-sref="newPost({topicId: topic.id})">[comentar]</a></li> <li><a href="mailto:adminneivacomenta@airmail.cc?subject=[Report] Topic {{ topic.id }}">[reportar]</a></li> </ul> <p>{{ topic.content }}</p> <br> <p><strong>Últimos comentarios</strong>:</p> </div> </div> <div class="row" ng-repeat="post in topic.lastPosts"> <div class="panel panel-default panel-post"> <div class="panel-body"> \x3c!-- cuando el post tiene imagen --\x3e <div class="row" ng-if="post.image != \'no-imagen\'"> <div class="col-sm-2"> <a href="{{ post.image }}" target="_blank"><img class="img-responsive" src="{{ post.image }}" alt=""></a> </div> <div class="col-sm-10"> <p ng-if="width < 768" class="fecha"><small>{{ post.createdAt | date:\'dd MMM yyyy h:mm a\'}}</small></p> <ul class="opciones"> <li ng-if="width >= 768" class="fecha"><small>{{ post.createdAt | date:\'dd MMM yyyy h:mm a\'}} - </small></li> <li><a href="mailto:adminneivacomenta@airmail.cc?subject=[Report] Post {{ post.id }}">[reportar]</a></li> </ul> <p>{{ post.content }}</p> </div> </div> \x3c!-- cuando el post no tiene imagen --\x3e <p ng-if="width < 768 && post.image == \'no-imagen\'" class="fecha"><small>Publicado el {{ post.createdAt | date:\'dd MMM yyyy h:mm a\'}}</small></p> <ul ng-if="post.image == \'no-imagen\'" class="opciones"> <li ng-if="width >= 768" class="fecha"><small>{{ post.createdAt | date:\'dd MMM yyyy h:mm a\'}} - </small></li> <li><a href="mailto:adminneivacomenta@airmail.cc?subject=[Report] Post {{ post.id }}">[reportar]</a></li> </ul> <p ng-if="post.image == \'no-imagen\'">{{ post.content }}</p> </div> </div> </div> <div class="row primera-fila"> <div class="col-sm-2"> <a href="" ui-sref="showTopic({topicId: topic.id})">[ver tema]</a> </div> </div> </div> </div> </div> </div> <p class="text-center" ng-if="board.topics.length == 0">No hay temas :(</p> <p style="text-align: center"><a href="" ui-sref="indexBoards">[volver]</a><a href="#" ui-sref="newTopic({boardId: board.id})"> [Crear Tema Nuevo]</a></p> </div>'),a.put("views/estaticos/faq.html",'<div class="container"> <div class="row"> <div class="col-sm-12"> <h1>Preguntas Frecuentes</h1> <br> <h3>1. ¿Qué es <strong>Neiva Comenta</strong>?</h3> <p>Es un lugar donde puedes conversar sobre diferentes temas y compartir imágenes libremente, de forma anónima y sin necesidad de registro. El sitio esta dividido en “muros”, cada cual aborda una temática distinta como humor, deportes, actualidad, etc.</p> <p>Este proyecto nace del deseo de crear un espacio para la libertad de expresión y de conectar personas que comparten intereses comunes. Creemos que una discusión puede ser más honesta y entretenida cuando no existen identidades de por medio.</p> <br> <h3>2. ¿Cómo puedo usar <strong>Neiva Comenta</strong>?</h3> <p>En <strong>Neiva Comenta</strong> no existen cuentas ni sistema de registro; por lo tanto, puedes entrar como sea y de donde sea y publicar mensajes de inmediato. Empieza entrando a cualquier muro, allí encontrarás los temas de conversación más recientes. Puedes unirte a discutir en cualquiera de ellos, o crear un tema nuevo. </p> <br> <h3>3. ¿Qué debería saber antes de usar <strong>Neiva Comenta</strong>?</h3> <p>Animamos a los usuarios a participar activamente en esta comunidad. Antes de participar, asegúrate de leer y comprender las <a ui-sref="reglas">recomendaciones</a>. La violación de estas recomendaciones resultará en la eliminación de temas y/o comentarios.</p> <br> <h3>4. ¿Debo publicar una imagen?</h3> <p>Para empezar un nuevo tema debes subir una imagen. Para comentar, la inclusión de imágenes es opcional.</p> <br> <h3>5. ¿Cómo reporto un tema/comentario?</h3> <p>Animamos a los usuarios a reportar los temas o comentarios que violen las recomendaciones o sean spam, esto nos ayuda a eliminarlo más rápido para hacer la experiencia en <strong>Neiva Comenta</strong> para todos los usuarios más agradable. Para llenar un reporte dale click al botón <strong>Reportar</strong> ubicado en la esquina superior derecha del recuadro del tema/comentario.</p> <br> <h3>6. ¿Cómo elimino mi tema/comentario?</h3> <p>Se cuidadoso con lo que compartes. Una vez publicado, el contenido no puede ser eliminado por parte de los usuarios.</p> <br> <h3>7. Mi tema desapareció, ¿que pasó?</h3> <p>Los temas expiran y son eliminados. Cuando un tema llega al límite de participación (500 comentarios) desciende en el listado y desaparece. Este sitio no tiene memoria.</p> <br> <h3>8. ¿Cómo me puedo poner en contacto con la administración del sitio?</h3> <p>Escríbenos a <a href="mailto:adminneivacomenta@airmail.cc">Admin NeivaComenta</a></p> <br> </div> </div> </div>'),a.put("views/estaticos/reglas.html",'<div class="container"> <div class="row"> <div class="col-sm-12"> <h1>Recomendaciones</h1> <p>Creemos que la comunidad debería ser capaz de autorregularse, por lo cual no existen reglas de comportamiento impuestas por Neiva Comenta; sin embargo, para proporcionar una mejor experiencia de uso del sitio y evitar problemas legales, ofrecemos las siguientes recomendaciones:</p> <br> <h3>1. Legalidad</h3> <p>Abstenerse de publicar, discutir, subir o requerir cualquier elemento que viole las leyes.</p> <br> <h3>2. Protege tu privacidad</h3> <p>No reveles tus datos personales ni cualquier otra información que prefieras mantener en secreto.</p> <br> <h3>3. No causes problemas a los demás</h3> <p>Siéntete libre de hablar de lo que desees como desees, pero también recuerda que hay alguien como tú al otro lado de la pantalla. Aquí y en muchos otros lugares se usa Internet como un lugar de relajo y escape de la vida diaria.</p> <br> <h3>4. Consistencia</h3> <p>Discute los temas en el muro correcto. Por ejemplo: si quieres hablar del partido del domingo, hazlo en el muro de Deportes.</p> <br> <h3>5. No spam</h3> <p>Cualquier forma de spam o marketing (fuera del muro de Clasificados) es prohibido.</p> <br> </div> </div> </div>'),a.put("views/navegacion.html",'<div ng-if="esperando"> <p>esperando...</p> </div> <li ui-sref-active="active" ng-if="!esperando" ui-sref="showBoard({boardId: board.id})" ng-repeat="board in boards"> <a href="#">{{ board.name }}</a> </li>'),a.put("views/posts/nuevo.html",'<div class="col-sm-12"> <h3 class="text-center">Comentar</h3> </div> <form name="form" class="form-horizontal"> \x3c!-- Contenido --\x3e <div class="form-group has-feedback" ng-class="{ \'has-error\' : form.content.$touched && form.content.$invalid, \'has-success\': form.content.$valid }"> <label for="content" class="col-sm-3 control-label">Comentario</label> <div class="col-sm-6"> <textarea rows="7" columns="50" type="text" class="form-control" name="content" id="content" ng-model="nuevoPost.content" placeholder="ingresa tu comentario" required ng-maxlength="1200"></textarea> \x3c!--<span ng-show="form.content.$valid" class="glyphicon glyphicon-ok form-control-feedback" aria-hidden="true"></span>--\x3e \x3c!--<span ng-show="form.content.$invalid && form.content.$touched" class="glyphicon glyphicon-remove form-control-feedback" aria-hidden="true"></span>--\x3e <div ng-show="form.content.$touched"> <p class="help-block" ng-show="form.content.$error.required">Debes ingresar un comentario.</p> <p class="help-block" ng-show="form.content.$error.maxlength">La longitud máxima son 1200 caracteres.</p> </div> </div> </div> \x3c!-- /Contenido --\x3e \x3c!-- Imagen --\x3e <div class="form-group has-feedback" ng-class="{ \'has-error\' : form.image.$touched && form.image.$invalid, \'has-success\': form.image.$touched && form.image.$valid }"> <label for="image" class="col-sm-3 control-label">Imagen</label> <div class="col-sm-6"> <input type="file" class="form-control" name="image" accept="image/*" ng-model="nuevoPost.image" file-model="nuevoPost.image" id="image" wiz-val-file wiz-val-file-types="[\'image/jpg\', \'image/png\', \'image/bmp\', \'image/jpeg\',\'image/gif\']" wiz-val-file-size="3000000"> \x3c!--<span ng-show="form.image.$valid" class="glyphicon glyphicon-ok form-control-feedback" aria-hidden="true"></span>--\x3e \x3c!--<span ng-show="form.image.$invalid && form.image.$touched" class="glyphicon glyphicon-remove form-control-feedback" aria-hidden="true"></span>--\x3e <div ng-show="form.image.$touched"> <p class="help-block" ng-show="form.image.$error.wizValFileTypes">Ingresa un archivo de imagen.</p> <p class="help-block" ng-show="form.image.$error.wizValFileSize">Ingresa un archivo de menos de 3MB.</p> </div> </div> </div> \x3c!-- /Imagen --\x3e <div class="form-group"> <div class="col-md-offset-3 disclaimer"> <p>*He leído y entendido las recomendaciones del sitio.</p> </div> </div> <div class="form-group"> <div class="col-md-offset-3 botones"> <button ng-show="form.$valid" class="btn btn-default" type="button" ng-click="submit()" promise-btn>Crear*</button> <button ng-show="form.$invalid" class="btn btn-default" type="button" disabled>Crear*</button> <button class="btn btn-info" type="button" ui-sref="showTopic({topicId: topicId})">Cancelar</button> </div> </div> </form>'),a.put("views/topics/nuevo.html",'<div class="col-sm-12"> <h3 class="text-center">Crear Tema</h3> </div> <form name="form" class="form-horizontal"> \x3c!-- Título --\x3e <div class="form-group has-feedback" ng-class="{ \'has-error\' : form.title.$touched && form.title.$invalid, \'has-success\': form.title.$valid }"> <label for="title" class="col-sm-3 control-label">Título</label> <div class="col-sm-6"> <input type="text" class="form-control" name="title" id="title" ng-model="nuevoTopic.title" placeholder="título del topic" required ng-maxlength="100"> \x3c!--<span ng-show="form.title.$valid" class="glyphicon glyphicon-ok form-control-feedback" aria-hidden="true"></span>--\x3e \x3c!--<span ng-show="form.title.$invalid && form.title.$touched" class="glyphicon glyphicon-remove form-control-feedback" aria-hidden="true"></span>--\x3e <div ng-show="form.title.$touched"> <p class="help-block" ng-show="form.title.$error.maxlength">La longitud máxima son 100 caracteres.</p> <p class="help-block" ng-show="form.title.$error.required">Debes ingresar un título.</p> </div> </div> </div> \x3c!-- /Título --\x3e \x3c!-- Contenido --\x3e <div class="form-group has-feedback" ng-class="{ \'has-error\' : form.content.$touched && form.content.$invalid, \'has-success\': form.content.$valid }"> <label for="content" class="col-sm-3 control-label">Comentario</label> <div class="col-sm-6"> <textarea rows="7" columns="50" type="text" class="form-control" name="content" id="content" ng-model="nuevoTopic.content" placeholder="ingresa tu comentario" required ng-maxlength="1200" ng-minlength="10"></textarea> \x3c!--<span ng-show="form.content.$valid" class="glyphicon glyphicon-ok form-control-feedback" aria-hidden="true"></span>--\x3e \x3c!--<span ng-show="form.content.$invalid && form.content.$touched" class="glyphicon glyphicon-remove form-control-feedback" aria-hidden="true"></span>--\x3e <div ng-show="form.content.$touched"> <p class="help-block" ng-show="form.content.$error.required">Debes ingresar un comentario.</p> <p class="help-block" ng-show="form.content.$error.maxlength">La longitud máxima son 1200 caracteres.</p> <p class="help-block" ng-show="form.content.$error.minlength">La longitud mínima son 10 caracteres.</p> </div> </div> </div> \x3c!-- /Contenido --\x3e \x3c!-- Imagen --\x3e <div class="form-group has-feedback" ng-class="{ \'has-error\' : form.image.$touched && form.image.$invalid, \'has-success\': form.image.$valid }"> <label for="image" class="col-sm-3 control-label">Imagen</label> <div class="col-sm-6"> <input type="file" class="form-control" name="image" accept="image/*" ng-model="nuevoTopic.image" file-model="nuevoTopic.image" id="image" wiz-val-file wiz-val-file-types="[\'image/jpg\', \'image/png\', \'image/bmp\', \'image/jpeg\',\'image/gif\']" wiz-val-file-size="3000000" required> \x3c!--<span ng-show="form.image.$valid" class="glyphicon glyphicon-ok form-control-feedback" aria-hidden="true"></span>--\x3e \x3c!--<span ng-show="form.image.$invalid && form.image.$touched" class="glyphicon glyphicon-remove form-control-feedback" aria-hidden="true"></span>--\x3e <div ng-show="form.image.$touched"> <p class="help-block" ng-show="form.image.$error.required">Debes ingresar una imagen.</p> <p class="help-block" ng-show="form.image.$error.wizValFileTypes">Ingresa un archivo de imagen.</p> <p class="help-block" ng-show="form.image.$error.wizValFileSize">Ingresa un archivo de menos de 3MB.</p> </div> </div> </div> \x3c!-- /Imagen --\x3e <div class="form-group"> <div class="col-md-offset-3 disclaimer"> <p>*He leído y entendido las recomendaciones del sitio.</p> </div> </div> <div class="form-group"> <div class="col-md-offset-3 botones"> <button ng-show="form.$valid" class="btn btn-default" type="button" ng-click="submit()" promise-btn>Crear*</button> <button ng-show="form.$invalid" class="btn btn-default" type="button" disabled>Crear*</button> <button class="btn btn-info" type="button" ui-sref="showBoard({boardId: boardId})">Cancelar</button> </div> </div> </form>'),a.put("views/topics/ver.html",'<div ng-if="esperando"> <md-progress-circular md-mode="indeterminate" md-diameter="96"></md-progress-circular> </div> <div class="row" ng-if="!esperando"> <div class="text-center"> <h1>{{ topic.boardName }}</h1> <p>{{ topic.boardDescription }}</p> <p><a href="" ui-sref="showBoard({boardId: topic.boardId})">[volver]</a> </p></div> <p class="crear-topic"><a href="" ui-sref="newPost({topicId: topic.id})">[Comentar]</a></p> <div class="panel panel-default panel-topic"> <div class="panel-heading"> <h3 class="panel-title"><strong>{{ topic.title }}</strong></h3> </div> <div class="panel-body"> <div class="row primera-fila"> <div class="col-sm-2"> <a href="{{ topic.image }}" target="_blank"><img class="img-responsive" src="{{ topic.image }}" alt="{{ topic.title }}"></a> </div> <div class="col-sm-10"> <p ng-if="width < 768" class="fecha"><small>{{ topic.createdAt | date:\'dd MMM yyyy h:mm a\'}}</small></p> <ul class="opciones"> <li ng-if="width >= 768" class="fecha"><small>{{ topic.createdAt | date:\'dd MMM yyyy h:mm a\'}} - </small></li> <li><a href="mailto:adminneivacomenta@airmail.cc?subject=[Report] Topic {{ topic.id }}">[reportar]</a></li> </ul> <p>{{ topic.content }}</p> </div> </div> <div class="row" ng-repeat="post in topic.posts"> <div class="panel panel-default panel-post"> <div class="panel-body"> \x3c!-- cuando el post tiene imagen --\x3e <div class="row" ng-if="post.image != \'no-imagen\'"> <div class="col-sm-2"> <a href="{{ post.image }}" target="_blank"><img class="img-responsive" src="{{ post.image }}" alt=""></a> </div> <div class="col-sm-10"> <p ng-if="width < 768" class="fecha"><small>{{ post.createdAt | date:\'dd MMM yyyy h:mm a\'}}</small></p> <ul class="opciones"> <li ng-if="width >= 768" class="fecha"><small>{{ post.createdAt | date:\'dd MMM yyyy h:mm a\'}} - </small></li> <li><a href="mailto:adminneivacomenta@airmail.cc?subject=[Report] Post {{ post.id }}">[reportar]</a></li> </ul> <p>{{ post.content }}</p> </div> </div> \x3c!-- cuando el post no tiene imagen --\x3e <p ng-if="width < 768 && post.image == \'no-imagen\'" class="fecha"><small>{{ post.createdAt | date:\'dd MMM yyyy h:mm a\'}}</small></p> <ul ng-if="post.image == \'no-imagen\'" class="opciones"> <li ng-if="width >= 768" class="fecha"><small>{{ post.createdAt | date:\'dd MMM yyyy h:mm a\'}} - </small></li> <li><a href="mailto:adminneivacomenta@airmail.cc?subject=[Report] Post {{ post.id }}">[reportar]</a></li> </ul> <p ng-if="post.image == \'no-imagen\'">{{ post.content }}</p> </div> </div> </div> </div> </div> <p style="text-align: center"><a href="" ui-sref="showBoard({boardId: topic.boardId})">[volver]</a><a href="" ui-sref="newPost({topicId: topic.id})"> [comentar]</a></p> </div>')}]);