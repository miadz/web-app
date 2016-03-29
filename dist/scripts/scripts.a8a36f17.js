"use strict";angular.module("rac.directives",[]),angular.module("rac.controllers",[]),angular.module("rac.services",[]),angular.module("rac.filters",[]),angular.module("rac",["ngResource","ngRoute","uiGmapgoogle-maps","rac.directives","rac.filters"]).constant("API_URL",-1===window.location.href.indexOf("localhost")?"https://rac-dashboard.herokuapp.com/api":"http://localhost:3000/api").config(["$routeProvider",function(a){a.when("/",{templateUrl:"views/home.html",controller:"HomeCtrl"}).when("/about",{templateUrl:"views/about.html",controller:"AboutCtrl"}).when("/live",{templateUrl:"views/live.html",controller:"LiveCtrl"}).when("/contact",{templateUrl:"views/contact.html",controller:"ContactCtrl"}).when("/schedule",{templateUrl:"views/schedule.html",controller:"ScheduleCtrl"}).when("/blog",{templateUrl:"views/blog.html",controller:"BlogCtrl"}).when("/blog/:title",{templateUrl:"views/post.html",controller:"PostCtrl"}).when("/show/:title",{templateUrl:"views/show.html",controller:"ShowCtrl"}).otherwise({redirectTo:"/"})}]),angular.module("rac").controller("HomeCtrl",["$scope","$rootScope","$gallery","$page","$sce","$mixcloud",function(a,b,c,d,e,f){a.loadedImages=!1,a.images=[],a.mixcloud=[],a.interval=3e3,b.showHomeVideo=!0,d.get({name:"home"},function(b){a.content=e.trustAsHtml(b.content)}),c.get({name:"home-page-slider"},function(b){b&&b.length&&(a.images=b,a.loadedImages=!0)}),f.get({},function(b){a.mixcloud=b.data.slice(0,6)})}]),angular.module("rac").controller("AboutCtrl",["$scope","$rootScope","$sce","$page","$gallery",function(a,b,c,d,e){b.title="Nosotros",d.get({name:"about"},function(d){a.content=c.trustAsHtml(d.content),b.title=d.title,b.subTitle=d.subTitle}),e.get({name:"workspace"},function(b){a.workspace=b}),e.get({name:"clients"},function(b){a.clients=b})}]),angular.module("rac").controller("ScheduleCtrl",["$scope","$rootScope","$mixcloud","$page","$show",function(a,b,c,d,e){a.calendarView="month",a.currentDay=new Date,a.title="Programación",a.subTitle="",a.shows=[],a.goToShow=function(){},d.get({name:"schedule"},function(a){b.title=a.title,b.subTitle=a.subTitle}),e.get({},function(b){a.shows=b,a.loadedImages=!0})}]),angular.module("rac").controller("LiveCtrl",["$scope","$rootScope","$sce","$page",function(a,b,c,d){b.title="Radio En Vivo!",d.get({name:"live"},function(d){a.content=c.trustAsHtml(d.content),b.title=d.title,b.subtitle=d.subtitle})}]),angular.module("rac").controller("BlogCtrl",["$scope","$rootScope","$post","$page","$sce","$location","$current",function(a,b,c,d,e,f,g){var h=0,i=2,j=!1;a.endOfBlogs=!1,a.posts=[],b.title="Entrevistas",d.get({name:"blog"},function(c){b.title=c.title,b.subTitle=c.subTitle,a.content=e.trustAsHtml(c.content)}),a.goToPost=function(a){g.post=this.posts[a],f.path("/blog/"+g.post.title)},a.getPosts=function(){(!a.endOfBlogs||j)&&(j=!0,a.loadedImages=!1,c.get({skip:h},function(b){if(b&&b.length>0){for(var c=b.length-1;c>=0;c--)b[c].content.extended=e.trustAsHtml(b[c].content.extended);a.posts=a.posts.concat(b),a.loadedImages=!0,h+=i}else a.endOfBlogs=!0;j=!1},function(){j=!1}))},a.getPosts()}]),angular.module("rac").controller("ContactCtrl",["$scope","$rootScope","$page","$email","$sce",function(a,b,c,d,e){b.title="Contactanos",a.isSending=!1,a.email={},a.map={center:{latitude:-34.5776996,longitude:-58.46083050000004},zoom:16,options:{panControl:!1,rotateControl:!1,scaleControl:!1,streetViewControl:!1,zoomControl:!1,mapTypeControl:!1,scrollwheel:!1}},a.marker={key:"rac",location:{latitude:-34.5776996,longitude:-58.46083050000004}},c.get({name:"contact"},function(c){a.content=e.trustAsHtml(c.content),b.title=c.title,b.subTitle=c.subTitle}),a.sendEmail=function(){a.emailForm.$valid&&5===a.email.captcha&&(a.isSending=!0,d.save({from:a.email.from,message:a.email.message,name:a.email.name},function(){a.isSending=!1,a.alert={message:a.email.name+", gracias por escribirnos, nos pondremos en contacto a la brevedad.",type:"success"},a.email={}}))}}]),angular.module("rac").controller("PostCtrl",["$scope","$location","$current","$window",function(a,b,c,d){a.post=c.post,a.post?a.post.url=d.location.href:b.path("/blog")}]),angular.module("rac").controller("AsideCtrl",["$scope","$ad","$widget",function(a,b,c){a.ads=[],a.widgets=[],b.get({},function(b){a.ads=b}),c.get({},function(b){a.widgets=b})}]),angular.module("rac").controller("HeaderController",["$scope","$rootScope","$weather","$currentShow","$location",function(a,b,c,d,e){a.weather={},a.isPlaying=!1,c.get({},function(b){a.weather=b.currently}),a.play=function(){a.isPlaying=!a.isPlaying},d.get({},function(b){a.currentShow=b}),a.goTo=function(a){e.url(a),b.showHomeVideo=-1!==a.indexOf("home")?!0:!1,b.underConstruction=!1},a.isSelected=function(a){return a===e.path()}}]),angular.module("rac").controller("ShowCtrl",["$scope","$location","$current",function(a,b,c){a.show=c.show,a.show||b.path("/schedule")}]),angular.module("rac").factory("$page",["$resource","API_URL",function(a,b){return a(b+"/page/:name")}]),angular.module("rac").factory("$post",["$resource","API_URL",function(a,b){return a(b+"/post/?skip=:skip",{},{get:{method:"GET",isArray:!0}})}]),angular.module("rac").factory("$gallery",["$resource","API_URL",function(a,b){return a(b+"/gallery/:name",{},{get:{method:"GET",isArray:!0}})}]),angular.module("rac").factory("$email",["$resource","API_URL",function(a,b){return a(b+"/email/:from",{from:"@from"},{save:{method:"POST",isArray:!0}})}]),angular.module("rac").factory("$mixcloud",["$resource",function(a){return a("https://api.mixcloud.com/radioalacalle/cloudcasts?callback=callbackfn",{callback:"JSON_CALLBACK"},{get:{method:"JSONP"}})}]),angular.module("rac").factory("$current",function(){var a,b;return{post:a,show:b}}),angular.module("rac").factory("$ad",["$resource","API_URL",function(a,b){return a(b+"/ad",{},{get:{method:"GET",isArray:!0}})}]),angular.module("rac").factory("$widget",["$resource","API_URL",function(a,b){return a(b+"/widget",{},{get:{method:"GET",isArray:!0}})}]),angular.module("rac").factory("$weather",["$resource","API_URL",function(a,b){return a(b+"/weather",{},{get:{method:"GET"}})}]),angular.module("rac").factory("$show",["$resource","API_URL",function(a,b){return a(b+"/show",{},{get:{method:"GET",isArray:!0}})}]).factory("$currentShow",["$resource","API_URL",function(a,b){return a(b+"/show/current",{},{get:{method:"GET"}})}]),angular.module("rac.directives").directive("infiniteScroll",["$window",function(a){return function(b,c,d){angular.element(a).bind("scroll",function(){$(window).scrollTop()===$(document).height()-$(window).height()&&b.$apply(d.infiniteScroll)})}}]),angular.module("rac.directives").directive("script",function(){return{restrict:"A",link:function(a,b,c){b.html(c.script)}}}),angular.module("rac.directives").directive("currentTime",["dateFilter",function(a){return function(b,c,d){function e(){var b=a(new Date,g);c.text(b)}function f(){setTimeout(function(){e(),f()},1e3)}var g;b.$watch(d.currentTime,function(a){g=a,e()}),f()}}]),angular.module("rac.directives").directive("isFlash",function(){return{restrict:"A",link:function(a,b,c){var d="true"===c.isFlash,e="undefined"!=typeof navigator.plugins&&"object"==typeof navigator.plugins["Shockwave Flash"]||window.ActiveXObject&&new ActiveXObject("ShockwaveFlash.ShockwaveFlash")!==!1;e&&d?$(b).show():$(b).remove()}}}),angular.module("rac.directives").directive("isotope",function(){return{restrict:"A",link:function(a,b,c){a.$watch("loadedImages",function(){if(c.isotope="true"===c.isotope,c.isotope){var a=$(b);a.imagesLoaded().done(function(){setTimeout(function(){a.isotope(),setTimeout(function(){a.removeClass("no-transition")},500)},100)});var d=$(".portfolio");d.each(function(){var a=$(this);a.imagesLoaded().done(function(){a.find(".portfolio-item").css("display","block"),a.hasClass("portfolio-hex")&&(a.find("figure").append('<div class="hex-right"></div><div class="hex-left"></div>'),a.find(".more, .link").addClass("hex-alt")),a.hasClass("portfolio-round")&&a.find("img").addClass("img-circle"),a.hasClass("portfolio-shadows")&&a.hasClass("portfolio-hex")&&a.find("figure").wrap('<div class="flat-shadow">'),a.hasClass("portfolio-shadows")&&a.hasClass("portfolio-round")&&a.find("figure").wrap('<div class="flat-shadow">'),a.hasClass("portfolio-shadows")&&a.hasClass("portfolio-rect")&&a.find("figure").wrap('<div class="flat-shadow flat-rect">'),a.hasClass("portfolio-shadows")&&a.hasClass("portfolio-square")&&a.find("figure").wrap('<div class="flat-shadow flat-square">')})})}})}}}).directive("isotopeFilter",function(){return{restrict:"A",link:function(a,b){$(b).on("click","a",function(){var a=$(this),b=a.closest(".isotope-filters");return a.hasClass("selected")?!1:(b.find("a").removeClass("active"),a.addClass("active"),b.next().find(".isotope").addBack(".isotope").isotope({filter:a.attr("data-filter")}),!1)})}}}),angular.module("rac.directives").directive("mobileMenu",function(){return{restrict:"A",link:function(a,b){$(b).mmenu({slidingSubmenus:!1,counters:!1,classes:"mm-slide  mm-white",footer:{add:!0,title:"Matrix All Right Reserved 2015"},header:{title:"Main Menu",add:!0,update:!0},searchfield:!0})}}}),angular.module("rac.directives").directive("verticalTab",function(){return{restrict:"A",link:function(){$(".js-vertical-tab-content").hide(),$(".js-vertical-tab-content:first").show(),$(".js-vertical-tab").click(function(a){a.preventDefault(),$(".js-vertical-tab-content").hide();var b=$(this).attr("rel");$("#"+b).show(),$(".js-vertical-tab").removeClass("is-active"),$(this).addClass("is-active"),$(".js-vertical-tab-accordion-heading").removeClass("is-active"),$('.js-vertical-tab-accordion-heading[rel^="'+b+'"]').addClass("is-active")})}}}),angular.module("rac.directives").directive("slider",function(){return{restrict:"A",link:function(a,b,c){a.$watch("loadedImages",function(){if(c.slider="true"===c.slider,c.slider){var a=$(b),d=$(b).closest("div.isotope");a.imagesLoaded().done(function(){$(b).flexslider({slideshow:"false"===a.attr("data-flex-slideshow")?!1:!0,animation:a.attr("data-flex-animation")?a.attr("data-flex-animation"):"slide",direction:a.attr("data-flex-sliderdirection")?a.attr("data-flex-sliderdirection"):"horizontal",slideshowSpeed:parseInt(a.attr("data-flex-speed")?a.attr("data-flex-speed"):7e3),animationSpeed:parseInt(a.attr("data-flex-duration")?a.attr("data-flex-duration"):600),itemWidth:a.attr("data-flex-itemwidth")?parseInt(a.attr("data-flex-itemwidth"),10):0,minItems:a.attr("data-flex-itemmin")?parseInt(a.attr("data-flex-itemmin"),0):0,maxItems:a.attr("data-flex-itemmax")?parseInt(a.attr("data-flex-itemmax"),0):0,controlNav:"thumbnails"===a.attr("data-flex-controls")?"thumbnails":"hide"===a.attr("data-flex-controls")?!1:!0,directionNav:"hide"===a.attr("data-flex-directions")?!1:!0,prevText:"",nextText:"",smoothHeight:!0,animationLoop:"false"===a.attr("data-flex-animationloop")?!1:!0,reverse:"false"===a.attr("data-flex-reverse")?!1:!0,useCSS:!1,after:function(){d.length>0&&d.isotope("reLayout")}});var c="inside"===a.attr("data-flex-controlsposition")?"flex-controls-inside":"flex-controls-outside",e=a.attr("data-flex-controlsalign")?"flex-controls-"+a.attr("data-flex-controlsalign"):"flex-controls-center",f="fancy"===a.attr("data-flex-directions-type")?"flex-directions-fancy":"",g="outside"===a.attr("data-flex-directions-position")?"flex-directions-outside":"",h="alternate"===a.attr("data-flex-captionhorizontal")?"flex-caption-alternate":"flex-caption-"+a.attr("data-flex-captionhorizontal"),i="top"===a.attr("data-flex-captionvertical")?"flex-caption-top":"";a.addClass(c).addClass(e).addClass(f).addClass(g).addClass(h).addClass(i)})}})}}}),angular.module("rac.filters").filter("text",function(){return function(a){return a?a.replace(/<(.|\n)*?>/g,""):""}}),angular.module("rac.filters").filter("showDays",function(){return function(a){function b(a,b){return a=a.toString(),b=b.toString(),a="0"===a?"00:00":a.substring(0,2)+":"+a.substring(2,4),b="0"===b?"00:00":b.substring(0,2)+":"+b.substring(2,4),a+" - "+b}var c,d=[];return a.monday&&(c=b(a.mondayStartTime,a.mondayEndTime),d.push("LUN: "+c)),a.tuesday&&(c=b(a.tuesdayStartTime,a.tuesdayEndTime),d.push("MAR: "+c)),a.wednesday&&(c=b(a.wednesdayStartTime,a.wednesdayEndTime),d.push("MIE: "+c)),a.thursday&&(c=b(a.thursdayStartTime,a.thursdayEndTime),d.push("JUE: "+c)),a.friday&&(c=b(a.fridayStartTime,a.fridayEndTime),d.push("VIE: "+c)),a.saturday&&(c=b(a.saturdayStartTime,a.saturdayEndTime),d.push("SAB: "+c)),a.sunday&&(c=b(a.sundayStartTime,a.sundayEndTime),d.push("DOM:     "+c)),d.join(" - ")}}),angular.module("rac.filters").filter("ellipsis",function(){return function(a){return a?a.length>150?a.substring(0,148)+"...":a:""}});