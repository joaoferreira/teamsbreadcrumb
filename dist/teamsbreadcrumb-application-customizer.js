define("d0b350e6-0bef-4577-8a6c-4200e3a7f7f0_0.0.1",["@microsoft/decorators","@microsoft/sp-loader","@microsoft/sp-application-base"],function(e,t,r){return function(e){function t(n){if(r[n])return r[n].exports;var o=r[n]={i:n,l:!1,exports:{}};return e[n].call(o.exports,o,o.exports,t),o.l=!0,o.exports}var r={};return t.m=e,t.c=r,t.d=function(e,r,n){t.o(e,r)||Object.defineProperty(e,r,{configurable:!1,enumerable:!0,get:n})},t.n=function(e){var r=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(r,"a",r),r},t.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},t.p="",t(t.s=0)}([function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=r(1),o=(r.n(n),r(2)),i=(r.n(o),r(3)),a=(r.n(i),r(4)),s=(r.n(a),this&&this.__extends||function(){var e=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var r in t)t.hasOwnProperty(r)&&(e[r]=t[r])};return function(t,r){function n(){this.constructor=t}e(t,r),t.prototype=null===r?Object.create(r):(n.prototype=r.prototype,new n)}}()),l=this&&this.__decorate||function(e,t,r,n){var o,i=arguments.length,a=i<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,r):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(e,t,r,n);else for(var s=e.length-1;s>=0;s--)(o=e[s])&&(a=(i<3?o(a):i>3?o(t,r,a):o(t,r))||a);return i>3&&a&&Object.defineProperty(t,r,a),a},c=!1,u=function(e){function t(){return null!==e&&e.apply(this,arguments)||this}return s(t,e),t.prototype.onInit=function(){var e=this;if(-1!=navigator.userAgent.indexOf("Teams"))return o.SPComponentLoader.loadScript("/_layouts/15/init.js",{globalExportsName:"$_global_init"}).then(function(){return o.SPComponentLoader.loadScript("/_layouts/15/MicrosoftAjax.js",{globalExportsName:"Sys"})}).then(function(){return o.SPComponentLoader.loadScript("/_layouts/15/SP.Runtime.js",{globalExportsName:"SP"})}).then(function(){return o.SPComponentLoader.loadScript("/_layouts/15/SP.js",{globalExportsName:"SP"})}).then(function(){return 0==c&&(c=!0,e._renderPlaceHolders()),Promise.resolve()})},t.prototype._renderPlaceHolders=function(){if(null===document.getElementById("breadcrumbWrapper")&&!this._topPlaceholder){if(this._topPlaceholder=this.context.placeholderProvider.tryCreateContent(i.PlaceholderName.Top,{onDispose:this._onDispose}),!this._topPlaceholder)return void console.error("The expected placeholder (Top) was not found.");this._topPlaceholder.domElement&&(this._topPlaceholder.domElement.innerHTML="",this._topPlaceholder.domElement.innerHTML='\n        <div id="breadcrumbWrapper" class="ms-FocusZone">\n          <ul id="breadcrumbSite" class="ms-Breadcrumb-list"></ul>\n        </div>\n        ',this.LoadSiteBreadcrumb(this))}},t.prototype.LoadSiteBreadcrumb=function(e){var t=new SP.ClientContext(this.context.pageContext.web.serverRelativeUrl),r=t.get_site(),n=t.get_web();t.load(n,"ServerRelativeUrl","Title","ParentWeb","Url"),t.load(r,"ServerRelativeUrl"),t.executeQueryAsync(function(){var t=document.createElement("div");t.className="ms-Breadcrumb",t.innerHTML='<div class="ms-FocusZone"><ul id="breadcrumbSite" class="ms-Breadcrumb-list"></ul></div>';var o=document.getElementById("breadcrumbSite"),i=document.getElementById("DeltaPlaceHolderMain"),o=document.getElementById("breadcrumbSite");if(-1!=document.location.pathname.indexOf("SitePages")||-1!=document.location.pathname.indexOf("Pages")){var a=document.createElement("li");a.className="ms-Breadcrumb-listItem",document.title.split("-").length>1?a.innerHTML='<span class="ms-Breadcrumb-itemLink">'+document.title.split("-")[1].trim()+'</span><i class="ms-Breadcrumb-chevron ms-Icon ms-Icon--ChevronRight"></i>':a.innerHTML='<span class="ms-Breadcrumb-itemLink">'+document.title.trim()+'</span><i class="ms-Breadcrumb-chevron ms-Icon ms-Icon--ChevronRight"></i>',o.insertBefore(a,o.childNodes[0])}else if(-1!=document.location.pathname.indexOf("_layouts/15/")){var a=document.createElement("li");a.className="ms-Breadcrumb-listItem",a.innerHTML='<span class="ms-Breadcrumb-itemLink">'+document.title+'</span><i class="ms-Breadcrumb-chevron ms-Icon ms-Icon--ChevronRight"></i>',o.insertBefore(a,o.childNodes[0])}var a=document.createElement("li");a.className="ms-Breadcrumb-listItem",a.innerHTML='<a class="ms-Breadcrumb-itemLink" href="'+n.get_url()+'">'+n.get_title()+'</a><i class="ms-Breadcrumb-chevron ms-Icon ms-Icon--ChevronRight"></i>',null!=i&&o.insertBefore(a,o.childNodes[0]),r.get_serverRelativeUrl()!==n.get_serverRelativeUrl()?e.RecursiveWebBreadcrumb(e,n.get_serverRelativeUrl()):(e.RecursiveWebBreadcrumb(e,n.get_serverRelativeUrl()),c=!1)},this.fail)},t.prototype.RecursiveWebBreadcrumb=function(e,t){var r=(document.getElementById("contentBox"),document.getElementById("breadcrumbSite")),n=new SP.ClientContext(t),o=n.get_site(),i=n.get_web();n.load(i,"ServerRelativeUrl","Title","ParentWeb","Url"),n.load(o,"ServerRelativeUrl"),n.executeQueryAsync(function(){if(o.get_serverRelativeUrl()!==i.get_serverRelativeUrl()){var t=document.createElement("li");t.className="ms-Breadcrumb-listItem",t.innerHTML='<a class="ms-Breadcrumb-itemLink" href="'+i.get_url()+'">'+i.get_title()+'</a><i class="ms-Breadcrumb-chevron ms-Icon ms-Icon--ChevronRight"></i>';document.getElementById("contentBox");r.insertBefore(t,r.childNodes[0]),e.RecursiveWebBreadcrumb(e,i.get_parentWeb().get_serverRelativeUrl())}else{var t=document.createElement("li");t.className="ms-Breadcrumb-listItem",t.innerHTML='<a class="ms-Breadcrumb-itemLink" href="'+i.get_url()+'">'+i.get_title()+'</a><i class="ms-Breadcrumb-chevron ms-Icon ms-Icon--ChevronRight"></i>',r.insertBefore(t,r.childNodes[0])}},this.fail)},t.prototype.fail=function(){console.log("Unable to load SharePoint BreadCrumb")},t.prototype._onDispose=function(){console.log("Disposed")},l([n.override],t.prototype,"onInit",null),t}(i.BaseApplicationCustomizer);t.default=u},function(t,r){t.exports=e},function(e,r){e.exports=t},function(e,t){e.exports=r},function(e,t,r){var n=r(5),o=r(7);"string"==typeof n&&(n=[[e.i,n]]);for(var i=0;i<n.length;i++)o.loadStyles(n[i][1],!0);n.locals&&(e.exports=n.locals)},function(e,t,r){t=e.exports=r(6)(!1),t.push([e.i,'.ms-dialog .ms-Breadcrumb{display:none}.ms-Breadcrumb{margin:0 0 10px}li.ms-Breadcrumb-listItem:first-child a{padding-left:0}.ms-Breadcrumb.is-overflow .ms-Breadcrumb-overflow{display:inline}.ms-Breadcrumb-chevron{font-size:17px;color:#666;vertical-align:top;margin:10px 0}.ms-Breadcrumb-list{display:inline;white-space:nowrap;padding:0;margin:0}.ms-Breadcrumb-list .ms-Breadcrumb-listItem{list-style-type:none;vertical-align:top;margin:0;padding:0;display:inline-block}.ms-Breadcrumb-list .ms-Breadcrumb-listItem:last-of-type .ms-Breadcrumb-chevron{display:none}.ms-Breadcrumb-overflow{display:none;position:relative;margin-right:-4px}.ms-Breadcrumb-overflow .ms-Breadcrumb-overflowButton{font-size:12px;display:inline-block;color:#0078d7;margin-right:-4px;padding:12px 8px 3px;cursor:pointer}.ms-Breadcrumb-overflowMenu{display:none;position:absolute}.ms-Breadcrumb-overflowMenu.is-open{display:block;top:36px;left:0;box-shadow:0 0 5px 0 rgba(0,0,0,.4);background-color:#fff;border:1px solid #c8c8c8;z-index:5}.ms-Breadcrumb-overflowMenu:before{position:absolute;box-shadow:0 0 5px 0 rgba(0,0,0,.4);top:-6px;left:6px;content:" ";width:16px;height:16px;-webkit-transform:rotate(45deg);transform:rotate(45deg);background-color:#fff}.ms-Breadcrumb-overflowMenu .ms-ContextualMenu{border:none;box-shadow:none;position:relative;width:190px}.ms-Breadcrumb-overflowMenu .ms-ContextualMenu.is-open{margin-bottom:0}.ms-Breadcrumb-itemLink,.ms-Breadcrumb-overflowButton{text-decoration:none;outline:transparent}.ms-Breadcrumb-itemLink:hover,.ms-Breadcrumb-overflowButton:hover{background-color:#f4f4f4;cursor:pointer}.ms-Breadcrumb-itemLink:focus,.ms-Breadcrumb-overflowButton:focus{outline:1px solid #767676;color:#000}.ms-Breadcrumb-itemLink:active,.ms-Breadcrumb-overflowButton:active{outline:transparent;background-color:#c8c8c8}.ms-Breadcrumb-itemLink{color:#333;font-family:Segoe UI Light WestEuropean,Segoe UI Light,Segoe UI,Tahoma,Arial,sans-serif;font-weight:400;display:inline-block;padding:0 4px;white-space:nowrap;text-overflow:ellipsis;overflow:hidden}.ms-Breadcrumb span:hover{cursor:default;background:none}.ms-Breadcrumb a:hover{text-decoration:none}.ms-Breadcrumb a,.ms-Breadcrumb a:visited{color:#23527c}.ms-Breadcrumb-itemLink{font-size:14px}li.ms-Breadcrumb-listItem i{font-size:14px;margin:4px 0}#breadcrumbWrapper{padding:5px 18px 2px;background-color:#f4f4f4}',""])},function(e,t){function r(e,t){var r=e[1]||"",o=e[3];if(!o)return r;if(t&&"function"==typeof btoa){var i=n(o);return[r].concat(o.sources.map(function(e){return"/*# sourceURL="+o.sourceRoot+e+" */"})).concat([i]).join("\n")}return[r].join("\n")}function n(e){return"/*# sourceMappingURL=data:application/json;charset=utf-8;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(e))))+" */"}e.exports=function(e){var t=[];return t.toString=function(){return this.map(function(t){var n=r(t,e);return t[2]?"@media "+t[2]+"{"+n+"}":n}).join("")},t.i=function(e,r){"string"==typeof e&&(e=[[null,e,""]]);for(var n={},o=0;o<this.length;o++){var i=this[o][0];"number"==typeof i&&(n[i]=!0)}for(o=0;o<e.length;o++){var a=e[o];"number"==typeof a[0]&&n[a[0]]||(r&&!a[2]?a[2]=r:r&&(a[2]="("+a[2]+") and ("+r+")"),t.push(a))}},t}},function(e,t,r){"use strict";(function(e){function r(e){var t=E();e();var r=E();x.perf.duration+=r-t}function n(e,t){void 0===t&&(t=!1),r(function(){var r=Array.isArray(e)?e:h(e);void 0===B&&(B=g());var n=x.runState,o=n.mode,i=n.buffer,a=n.flushTimer;t||1===o?(i.push(r),a||(x.runState.flushTimer=s())):l(r)})}function o(e){x.loadStyles=e}function i(e){x.runState.mode=e}function a(){r(function(){var e=x.runState.buffer.slice();x.runState.buffer=[];var t=[].concat.apply([],e);t.length>0&&l(t)})}function s(){return setTimeout(function(){x.runState.flushTimer=0,a()},0)}function l(e,t){x.loadStyles?x.loadStyles(f(e).styleString,e):B?v(e,t):b(e)}function c(e){x.theme=e,d()}function u(e){void 0===e&&(e=3),3!==e&&2!==e||(m(x.registeredStyles),x.registeredStyles=[]),3!==e&&1!==e||(m(x.registeredThemableStyles),x.registeredThemableStyles=[])}function m(e){e.forEach(function(e){var t=e&&e.styleElement;t&&t.parentElement&&t.parentElement.removeChild(t)})}function d(){if(x.theme){for(var e=[],t=0,r=x.registeredThemableStyles;t<r.length;t++){var n=r[t];e.push(n.themableStyle)}e.length>0&&(u(1),l([].concat.apply([],e)))}}function p(e){return e&&(e=f(h(e)).styleString),e}function f(e){var t=x.theme,r=!1;return{styleString:(e||[]).map(function(e){var n=e.theme;if(n){r=!0;var o=t?t[n]:void 0,i=e.defaultValue||"inherit";return t&&!o&&console,o||i}return e.rawString}).join(""),themable:r}}function h(e){var t=[];if(e){for(var r=0,n=void 0;n=_.exec(e);){var o=n.index;o>r&&t.push({rawString:e.substring(r,o)}),t.push({theme:n[1],defaultValue:n[2]}),r=_.lastIndex}t.push({rawString:e.substring(r)})}return t}function b(e){var t=document.getElementsByTagName("head")[0],r=document.createElement("style"),n=f(e),o=n.styleString,i=n.themable;r.type="text/css",r.appendChild(document.createTextNode(o)),x.perf.count++,t.appendChild(r);var a={styleElement:r,themableStyle:e};i?x.registeredThemableStyles.push(a):x.registeredStyles.push(a)}function v(e,t){var r=document.getElementsByTagName("head")[0],n=x.registeredStyles,o=x.lastStyleElement,i=o?o.styleSheet:void 0,a=i?i.cssText:"",s=n[n.length-1],l=f(e).styleString;(!o||a.length+l.length>w)&&(o=document.createElement("style"),o.type="text/css",t?(r.replaceChild(o,t.styleElement),t.styleElement=o):r.appendChild(o),t||(s={styleElement:o,themableStyle:e},n.push(s))),o.styleSheet.cssText+=p(l),Array.prototype.push.apply(s.themableStyle,e),x.lastStyleElement=o}function g(){var e=!1;if("undefined"!=typeof document){var t=document.createElement("style");t.type="text/css",e=!!t.styleSheet}return e}var y=this&&this.__assign||Object.assign||function(e){for(var t,r=1,n=arguments.length;r<n;r++){t=arguments[r];for(var o in t)Object.prototype.hasOwnProperty.call(t,o)&&(e[o]=t[o])}return e};Object.defineProperty(t,"__esModule",{value:!0});var B,S="undefined"==typeof window?e:window,x=function(){var e=S.__themeState__||{theme:void 0,lastStyleElement:void 0,registeredStyles:[]};return e.runState||(e=y({},e,{perf:{count:0,duration:0},runState:{flushTimer:0,mode:0,buffer:[]}})),e.registeredThemableStyles||(e=y({},e,{registeredThemableStyles:[]})),S.__themeState__=e,e}(),_=/[\'\"]\[theme:\s*(\w+)\s*(?:\,\s*default:\s*([\\"\']?[\.\,\(\)\#\-\s\w]*[\.\,\(\)\#\-\w][\"\']?))?\s*\][\'\"]/g,w=1e4,E=function(){return"undefined"!=typeof performance&&performance.now?performance.now():Date.now()};t.loadStyles=n,t.configureLoadStyles=o,t.configureRunMode=i,t.flush=a,t.loadTheme=c,t.clearStyles=u,t.detokenize=p,t.splitStyles=h}).call(t,r(8))},function(e,t){var r;r=function(){return this}();try{r=r||Function("return this")()||(0,eval)("this")}catch(e){"object"==typeof window&&(r=window)}e.exports=r}])});