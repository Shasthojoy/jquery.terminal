/*

 |       __ _____                     ________                              __
 |      / // _  /__ __ _____ ___ __ _/__  ___/__ ___ ______ __ __  __ ___  / /
 |  __ / // // // // // _  // _// // / / // _  // _//     // //  \/ // _ \/ /
 | /  / // // // // // ___// / / // / / // ___// / / / / // // /\  // // / /__
 | \___//____ \\___//____//_/ _\_  / /_//____//_/ /_/ /_//_//_/ /_/ \__\_\___/
 |           \/              /____/                              version 0.5
 http://terminal.jcubic.pl

 Licensed under GNU LGPL Version 3 license
 Copyright (c) 2011-2012 Jakub Jankiewicz <http://jcubic.pl>

 Includes:

 Storage plugin Distributed under the MIT License
 Copyright (c) 2010 Dave Schindler

 jQuery Timers licenced with the WTFPL
 <http://jquery.offput.ca/every/>

 Cross-Browser Split 1.1.1
 Copyright 2007-2012 Steven Levithan <stevenlevithan.com>
 Available under the MIT License

 Date: Sat, 09 Mar 2013 09:05:10 +0000
*/
(function(j,I){function ba(c,g){var f;if(typeof c==="string"&&typeof g==="string"){localStorage[c]=g;return true}else if(typeof c==="object"&&typeof g==="undefined"){for(f in c)if(c.hasOwnProperty(f))localStorage[f]=c[f];return true}return false}function X(c,g){var f,h;f=new Date;f.setTime(f.getTime()+31536E6);f="; expires="+f.toGMTString();if(typeof c==="string"&&typeof g==="string"){document.cookie=c+"="+g+f+"; path=/";return true}else if(typeof c==="object"&&typeof g==="undefined"){for(h in c)if(c.hasOwnProperty(h))document.cookie=
h+"="+c[h]+f+"; path=/";return true}return false}function ca(c){return localStorage[c]}function da(c){var g,f,h;c+="=";g=document.cookie.split(";");for(f=0;f<g.length;f++){for(h=g[f];h.charAt(0)===" ";)h=h.substring(1,h.length);if(h.indexOf(c)===0)return h.substring(c.length,h.length)}return null}function ea(c){return delete localStorage[c]}function fa(c){return X(c,"",-1)}function V(c,g){var f=[],h=c.length;if(h<g)return[c];for(var i=0;i<h;i+=g)f.push(c.substring(i,i+g));return f}function Y(c){return j("<div>"+
j.terminal.strip(c)+"</div>").text().length}function Z(c){var g=c instanceof Array?c:c?[c]:[],f=0;j.extend(this,{left:function(){if(f===0)f=g.length-1;else--f;return g[f]},right:function(){if(f===g.length-1)f=0;else++f;return g[f]},current:function(){return g[f]},data:function(){return g},length:function(){return g.length},reset:function(){f=0},append:function(h){g.push(h);this.reset()}})}function ga(c){var g=c?[c]:[];j.extend(this,{size:function(){return g.length},pop:function(){if(g.length===0)return null;
else{var f=g[g.length-1];g=g.slice(0,g.length-1);return f}},push:function(f){g=g.concat([f]);return f},top:function(){return g.length>0?g[g.length-1]:null}})}function ha(c){var g=true;if(typeof c==="string"&&c!=="")c+="_";var f=j.Storage.get(c+"commands"),h=new Z(f?eval("("+f+")"):[""]);j.extend(this,{append:function(i){if(g){h.append(i);j.Storage.set(c+"commands",j.json_stringify(h.data()))}},data:function(){return h.data()},next:function(){return h.right()},last:function(){h.reset()},previous:function(){return h.left()},
clear:function(){h=new Z;j.Storage.remove(c+"commands")},enable:function(){g=true},disable:function(){g=false}})}j.omap=function(c,g){var f={};j.each(c,function(h,i){f[h]=g.call(c,h,i)});return f};var T=typeof window.localStorage!=="undefined";j.extend({Storage:{set:T?ba:X,get:T?ca:da,remove:T?ea:fa}});jQuery.fn.extend({everyTime:function(c,g,f,h,i){return this.each(function(){jQuery.timer.add(this,c,g,f,h,i)})},oneTime:function(c,g,f){return this.each(function(){jQuery.timer.add(this,c,g,f,1)})},
stopTime:function(c,g){return this.each(function(){jQuery.timer.remove(this,c,g)})}});jQuery.extend({timer:{guid:1,global:{},regex:/^([0-9]+)\s*(.*s)?$/,powers:{ms:1,cs:10,ds:100,s:1E3,das:1E4,hs:1E5,ks:1E6},timeParse:function(c){if(c===I||c===null)return null;var g=this.regex.exec(jQuery.trim(c.toString()));return g[2]?parseInt(g[1],10)*(this.powers[g[2]]||1):c},add:function(c,g,f,h,i,o){var u=0;if(jQuery.isFunction(f)){i||(i=h);h=f;f=g}g=jQuery.timer.timeParse(g);if(!(typeof g!=="number"||isNaN(g)||
g<=0)){if(i&&i.constructor!==Number){o=!!i;i=0}i=i||0;o=o||false;if(!c.$timers)c.$timers={};c.$timers[f]||(c.$timers[f]={});h.$timerID=h.$timerID||this.guid++;var k=function(){if(!(o&&k.inProgress)){k.inProgress=true;if(++u>i&&i!==0||h.call(c,u)===false)jQuery.timer.remove(c,f,h);k.inProgress=false}};k.$timerID=h.$timerID;c.$timers[f][h.$timerID]||(c.$timers[f][h.$timerID]=window.setInterval(k,g));this.global[f]||(this.global[f]=[]);this.global[f].push(c)}},remove:function(c,g,f){var h=c.$timers,
i;if(h){if(g){if(h[g]){if(f){if(f.$timerID){window.clearInterval(h[g][f.$timerID]);delete h[g][f.$timerID]}}else for(var o in h[g])if(h[g].hasOwnProperty(o)){window.clearInterval(h[g][o]);delete h[g][o]}for(i in h[g])if(h[g].hasOwnProperty(i))break;if(!i){i=null;delete h[g]}}}else for(var u in h)h.hasOwnProperty(u)&&this.remove(c,u,f);for(i in h)if(h.hasOwnProperty(i))break;if(!i)c.$timers=null}}}});if(jQuery.browser.msie)jQuery(window).one("unload",function(){var c=jQuery.timer.global,g;for(g in c)if(c.hasOwnProperty(g))for(var f=
c[g],h=f.length;--h;)jQuery.timer.remove(f[h],g)});(function(c){if(String.prototype.split.toString().match(/\[native/)){var g=String.prototype.split,f=/()??/.exec("")[1]===c,h;h=function(i,o,u){if(Object.prototype.toString.call(o)!=="[object RegExp]")return g.call(i,o,u);var k=[],w=(o.ignoreCase?"i":"")+(o.multiline?"m":"")+(o.extended?"x":"")+(o.sticky?"y":""),y=0,B,z,C;o=RegExp(o.source,w+"g");i+="";f||(B=RegExp("^"+o.source+"$(?!\\s)",w));for(u=u===c?4294967295:u>>>0;z=o.exec(i);){w=z.index+z[0].length;
if(w>y){k.push(i.slice(y,z.index));!f&&z.length>1&&z[0].replace(B,function(){for(var F=1;F<arguments.length-2;F++)if(arguments[F]===c)z[F]=c});z.length>1&&z.index<i.length&&Array.prototype.push.apply(k,z.slice(1));C=z[0].length;y=w;if(k.length>=u)break}o.lastIndex===z.index&&o.lastIndex++}if(y===i.length){if(C||!o.test(""))k.push("")}else k.push(i.slice(y));return k.length>u?k.slice(0,u):k};String.prototype.split=function(i,o){return h(this,i,o)};return h}})();j.json_stringify=function(c,g){var f=
"",h;g=g===I?1:g;switch(typeof c){case "function":f+=c;break;case "boolean":f+=c?"true":"false";break;case "object":if(c===null)f+="null";else if(c instanceof Array){f+="[";var i=c.length;for(h=0;h<i-1;++h)f+=j.json_stringify(c[h],g+1);f+=j.json_stringify(c[i-1],g+1)+"]"}else{f+="{";for(i in c)if(c.hasOwnProperty(i))f+='"'+i+'":'+j.json_stringify(c[i],g+1);f+="}"}break;case "string":i=c;var o={"\\\\":"\\\\",'"':'\\"',"/":"\\/","\\n":"\\n","\\r":"\\r","\\t":"\\t"};for(h in o)if(o.hasOwnProperty(h))i=
i.replace(RegExp(h,"g"),o[h]);f+='"'+i+'"';break;case "number":f+=String(c)}f+=g>1?",":"";if(g===1)f=f.replace(/,([\]}])/g,"$1");return f.replace(/([\[{]),/g,"$1")};j.fn.cmd=function(c){function g(){E.toggleClass("inverted")}function f(){b="(reverse-i-search)`"+C+"': ";l()}function h(d){var t=K.data(),Q=RegExp("^"+C),L=t.length;if(d&&F>0)L-=F;for(d=L;d--;)if(Q.test(t[d])){F=t.length-d;p=0;k.set(t[d],true);D();break}}function i(d){var t=d.substring(0,y-B);d=d.substring(y-B);return[t].concat(V(d,y))}
function o(){w.focus();k.oneTime(1,function(){k.insert(w.val());w.blur().val("")})}function u(d){if(c.keydown){var t=c.keydown(d);if(t!==I)return t}if(J){if(z&&(d.which===35||d.which===36||d.which===37||d.which===38||d.which===39||d.which===40||d.which===66||d.which===13||d.which===27)){b=O;z=false;F=null;C="";l();if(d.which===27)q="";D();u.call(this,d)}else if(d.altKey){if(d.which===68){k.set(q.slice(0,p)+q.slice(p).replace(/[^ ]+ |[^ ]+$/,""),true);return false}return true}else if(d.keyCode===13){if(K&&
q&&(c.historyFilter&&c.historyFilter(q)||!c.historyFilter))K.data().slice(-1)[0]!==q&&K.append(q);K.last();d=q;k.set("");c.commands&&c.commands(d);typeof b==="function"&&l()}else if(d.which===32)if(z){C+=" ";f()}else k.insert(" ");else if(d.which===8)if(z){C=C.slice(0,-1);f()}else{if(q!==""&&p>0){q=q.slice(0,p-1)+q.slice(p,q.length);--p;D()}}else if(d.which===9&&!(d.ctrlKey||d.altKey))k.insert("\t");else if(d.which===46){if(q!==""&&p<q.length){q=q.slice(0,p)+q.slice(p+1,q.length);D()}return true}else if(K&&
d.which===38||d.which===80&&d.ctrlKey)k.set(K.previous());else if(K&&d.which===40||d.which===78&&d.ctrlKey)k.set(K.next());else if(d.which===37||d.which===66&&d.ctrlKey)if(d.ctrlKey&&d.which!==66){t=p-1;d=0;for(q[t]===" "&&--t;t>0;--t)if(q[t]===" "&&q[t+1]!==" "){d=t+1;break}else if(q[t]==="\n"&&q[t+1]!=="\n"){d=t;break}k.position(d)}else{if(p>0){--p;D()}}else if(d.which===82&&d.ctrlKey)if(z)h(true);else{O=b;f();q="";D();z=true}else if(d.which===39||d.which===70&&d.ctrlKey)if(d.ctrlKey&&d.which!==
70){q[p]===" "&&++p;d=q.slice(p).match(/\S[\n\s]{2,}|[\n\s]+\S?/);if(!d||d[0].match(/^\s+$/))p=q.length;else if(d[0][0]!==" ")p+=d.index+1;else{p+=d.index+d[0].length-1;d[0][d[0].length-1]!==" "&&--p}D()}else{if(p<q.length){++p;D()}}else if(d.which===123)return true;else if(d.which===36)k.position(0);else if(d.which===35)k.position(q.length);else if(d.shiftKey&&d.which==45){o();return true}else if(d.ctrlKey||d.metaKey)if(d.shiftKey){if(d.which===84)return true}else if(d.which===65)k.position(0);else if(d.which===
69)k.position(q.length);else if(d.which===88||d.which===67||d.which===87||d.which===84)return true;else if(d.which===86){o();return true}else if(d.which===75)if(p===0)k.set("");else p!==q.length&&k.set(q.slice(0,p));else if(d.which===85){k.set(q.slice(p,q.length));k.position(0)}else{if(d.which===17)return true}else return true;return false}}var k=this;k.addClass("cmd");k.append('<span class="prompt"></span><span></span><span class="cursor">&nbsp;</span><span></span>');var w=j("<textarea/>").addClass("clipboard").appendTo(k);
c.width&&k.width(c.width);var y,B,z=false,C="",F=null,O,G=c.mask||false,q="",p=0,b,J=c.enabled,R,K,E=k.find(".cursor"),D=function(d){function t(s,n){if(n===s.length){M.html(j.terminal.encode(s));E.html("&nbsp;");P.html("")}else if(n===0){M.html("");E.html(j.terminal.encode(s.slice(0,1)));P.html(j.terminal.encode(s.slice(1)))}else{var a=j.terminal.encode(s.slice(0,n));M.html(a);a=s.slice(n,n+1);E.html(a===" "?"&nbsp;":j.terminal.encode(a));n===s.length-1?P.html(""):P.html(j.terminal.encode(s.slice(n+
1)))}}function Q(s){return"<div>"+j.terminal.encode(s)+"</div>"}function L(s){var n=P;j.each(s,function(a,e){n=j(Q(e)).insertAfter(n).addClass("clear")})}function U(s){j.each(s,function(n,a){M.before(Q(a))})}var M=E.prev(),P=E.next();return function(){var s=G?q.replace(/./g,"*"):q,n,a;d.find("div").remove();M.html("");if(s.length>y-B-1||s.match(/\n/)){var e,m=s.match(/\t/g),v=m?m.length*3:0;if(m)s=s.replace(/\t/g,"\u0000\u0000\u0000\u0000");if(s.match(/\n/)){var r=s.split("\n");a=y-B-1;for(n=0;n<
r.length-1;++n)r[n]+=" ";if(r[0].length>a){e=[r[0].substring(0,a)];e=e.concat(V(r[0].substring(a),y))}else e=[r[0]];for(n=1;n<r.length;++n)if(r[n].length>y)e=e.concat(V(r[n],y));else e.push(r[n])}else e=i(s);if(m)e=j.map(e,function(x){return x.replace(/\x00\x00\x00\x00/g,"\t")});a=e[0].length;if(p<a){t(e[0],p);L(e.slice(1))}else if(p===a){M.before(Q(e[0]));t(e[1],0);L(e.slice(2))}else{n=e.length;if(p<a){t(e[0],p);L(e.slice(1))}else if(p===a){M.before(Q(e[0]));t(e[1],0);L(e.slice(2))}else{m=e.slice(-1)[0];
r=s.length-p;var A=m.length;s=0;if(r<=A){U(e.slice(0,-1));t(m,(A===r?0:A-r)+v)}else if(n===3){M.before("<div>"+j.terminal.encode(e[0])+"</div>");t(e[1],p-a-1);P.after('<div class="clear">'+j.terminal.encode(e[2])+"</div>")}else{s=p;for(n=0;n<e.length;++n){a=e[n].length;if(s>a)s-=a;else break}a=e[n];v=n;if(s===a.length){s=0;a=e[++v]}t(a,s);U(e.slice(0,v));L(e.slice(v+1))}}}}else if(s===""){M.html("");E.html("&nbsp;");P.html("")}else t(s,p)}}(k),l=function(){var d=k.find(".prompt");return function(){if(typeof b===
"string"){B=Y(b);d.html(j.terminal.format(b))}else b(function(t){B=Y(t);d.html(j.terminal.format(t))})}}();j.extend(k,{name:function(d){if(d!==I){R=d;K=new ha(d)}else return R},history:function(){return K},set:function(d,t){if(d!==I){q=d;if(!t)p=q.length;D();if(typeof c.onCommandChange==="function")c.onCommandChange(q)}},insert:function(d,t){if(p===q.length)q+=d;else q=p===0?d+q:q.slice(0,p)+d+q.slice(p);t||(p+=d.length);D();if(typeof c.onCommandChange==="function")c.onCommandChange(q)},get:function(){return q},
commands:function(d){if(d)c.commands=d;else return d},destroy:function(){j(document.documentElement).unbind(".commandline");k.find(".prompt").remove()},prompt:function(d){if(d===I)return b;else{if(typeof d==="string"||typeof d==="function")b=d;else throw"prompt must be a function or string";l();D()}},position:function(d){if(typeof d==="number"){p=d<0?0:d>q.length?q.length:d;D()}else return p},visible:function(){var d=k.visible;return function(){d.apply(k,[]);D();l()}}(),show:function(){var d=k.show;
return function(){d.apply(k,[]);D();l()}}(),resize:function(d){if(d)y=d;else{d=k.width();var t=E.innerWidth();y=Math.floor(d/t)}D()},enable:function(){if(!J){E.addClass("inverted");k.everyTime(500,"blink",g);J=true}},isenabled:function(){return J},disable:function(){if(J){k.stopTime("blink",g);E.removeClass("inverted");J=false}},mask:function(d){if(typeof d==="boolean"){G=d;D()}else return G}});k.name(c.name||"");b=c.prompt||"> ";l();if(c.enabled===I||c.enabled===true)k.enable();j(document.documentElement||
window).keypress(function(d){var t;if(d.ctrlKey&&d.which===99)return true;if(!z&&c.keypress)t=c.keypress(d);if(t===I||t){if(J)if(j.inArray(d.which,[38,32,13,0,8])>-1&&d.keyCode!==123&&!(d.which===38&&d.shiftKey))return false;else if(!d.ctrlKey&&!(d.altKey&&d.which===100)){if(z){C+=String.fromCharCode(d.which);f();h()}else k.insert(String.fromCharCode(d.which));return false}else if(d.altKey)if(z){C+=String.fromCharCode(d.which);f();h()}else k.insert(String.fromCharCode(d.which))}else return t}).keydown(u);
return k};var ia=/(\[\[[gbius]*;[^;]*;[^\]]*\](?:[^\]\[]*|\[*(?!\[)[^\]]*\][^\]]*)\])/g,$=/\[\[([gbius]*);([^;]*);([^;\]]*;|[^\]]*);?([^\]]*)\]([^\]\[]*|[^\[]*\[(?!\[)*[^\]]*\][^\]]*)\]/g,aa=/#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})/,ja=/(https?:((?!&[^;]+;)[^\s:"'<)])+)/g,ka=/((([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,})))/g;j.terminal={split_equal:function(c,g){for(var f=c.split(/\n/g),h=/(\[\[[gbius]*;[^;]*;[^\]]*\][^\]\[]*\]?)/g,
i=/(\[\[[gbius]*;[^;]*;[^\]]*\])/,o=/\[\[[gbius]*;?[^;]*;?[^\]]*\]?$/,u=false,k=false,w="",y=[],B=0,z=f.length;B<z;++B){if(w!=="")if(f[B]===""){y.push(w+"]");continue}else{f[B]=w+f[B];w=""}else if(f[B]===""){y.push("");continue}for(var C=f[B],F=0,O=0,G=0,q=C.length;G<q;++G){if(C[G]==="["&&C[G+1]==="[")u=true;else if(u&&C[G]==="]")if(k)k=u=false;else k=true;else if(u&&k||!u)++O;if(O===g||G===q-1){var p=C.substring(F,G+1);if(w){p=w+p;if(p.match("]"))w=""}F=G+1;O=0;var b=p.match(h);if(b){b=b[b.length-
1];if(b[b.length-1]!=="]"){w=b.match(i)[1];p+="]"}else if(p.match(o)){p=p.replace(o,"");w=b.match(i)[1]}}y.push(p)}}}return y},encode:function(c){return c.replace(/&(?!#[0-9]+;|[a-zA-Z]+;)/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/\n/g,"<br/>").replace(/ /g,"&nbsp;").replace(/\t/g,"&nbsp;&nbsp;&nbsp;&nbsp;")},format:function(c){if(typeof c==="string"){c=j.terminal.encode(j.terminal.from_ansi(c));var g=c.split(ia);if(g&&g.length>1)c=j.map(g,function(f){return f===""?f:f.substring(0,
1)==="["?f.replace($,function(h,i,o,u,k,w){if(w==="")return"<span>&nbsp;</span>";h="";if(i.indexOf("b")!==-1)h+="font-weight:bold;";var y="text-decoration:";if(i.indexOf("u")!==-1)y+="underline ";if(i.indexOf("s")!==-1)y+="line-through";if(i.indexOf("s")!==-1||i.indexOf("u")!==-1)h+=y+";";if(i.indexOf("i")!==-1)h+="font-style:italic;";if(o.match(aa)){h+="color:"+o+";";if(i.indexOf("g")!==-1)h+="text-shadow: 0 0 5px "+o+";"}if(u.match(aa))h+="background-color:"+u;return'<span style="'+h+'"'+(k!=""?
' class="'+k+'"':"")+">"+w+"</span>"}):"<span>"+f+"</span>"}).join("");return c.replace(ja,function(f){var h=f.match(/\.$/);f=f.replace(/\.$/,"");return'<a target="_blank" href="'+f+'">'+f+"</a>"+(h?".":"")}).replace(ka,'<a href="mailto:$1">$1</a>').replace(/<span><br\/?><\/span>/g,"<br/>")}else return""},strip:function(c){return c.replace($,"$5")},active:function(){return N.front()},ansi_colors:{normal:{black:"#000",red:"#AA0000",green:"#008400",yellow:"#AA5500",blue:"#0000AA",magenta:"#AA00AA",
cyan:"#00AAAA",white:"#fff"},bold:{white:"#fff",red:"#FF5555",green:"#44D544",yellow:"#FFFF55",blue:"#5555FF",magenta:"#FF55FF",cyan:"#55FFFF",black:"#000"}},from_ansi:function(){function c(h){var i=h.split(";"),o;h=[];var u="",k="",w;for(w in i){o=parseInt(i[w],10);o===1&&h.push("b");o===4&&h.push("u");if(f[o])k=f[o];if(g[o])u=g[o]}o=i=j.terminal.ansi_colors.normal;for(w=h.length;w--;)if(h[w]=="b"){if(u=="")u="white";o=j.terminal.ansi_colors.bold;break}return"[["+[h.join(""),o[u],i[k]].join(";")+
"]"}var g={30:"black",31:"red",32:"green",33:"yellow",34:"blue",35:"magenta",36:"cyan",37:"white"},f={40:"black",41:"red",42:"green",43:"yellow",44:"blue",45:"magenta",46:"cyan",47:"white"};return function(h){var i=h.split(/(\[[0-9;]*m)/g);if(i.length==1)return h;h=[];if(i.length>3&&i.slice(0,3).join("")=="[0m")i=i.slice(3);for(var o=false,u=0;u<i.length;++u){var k=i[u].match(/^\[([0-9;]*)m$/);if(k){if(k[1]!="")if(o){h.push("]");if(k[1]=="0")o=false;else h.push(c(k[1]))}else{o=true;h.push(c(k[1]))}}else h.push(i[u])}o&&
h.push("]");return h.join("")}}()};j.fn.visible=function(){return this.css("visibility","visible")};j.fn.hidden=function(){return this.css("visibility","hidden")};j.jrpc=function(c,g,f,h,i,o){g=j.json_stringify({jsonrpc:"2.0",method:f,params:h,id:g});return j.ajax({url:c,data:g,success:i,error:o,contentType:"application/json",dataType:"json",async:true,cache:false,type:"POST"})};T=/ {11}$/;var la=[["jQuery Terminal","(c) 2011-2012 jcubic"],["jQuery Terminal Emulator v. 0.5","Copyright (c) 2011-2012 Jakub Jankiewicz <http://jcubic.pl>".replace(/ *<.*>/,
"")],["jQuery Terminal Emulator version version 0.5","Copyright (c) 2011-2012 Jakub Jankiewicz <http://jcubic.pl>"],["      _______                 ________                        __","     / / _  /_ ____________ _/__  ___/______________  _____  / /"," __ / / // / // / _  / _/ // / / / _  / _/     / /  \\/ / _ \\/ /","/  / / // / // / ___/ // // / / / ___/ // / / / / /\\  / // / /__","\\___/____ \\\\__/____/_/ \\__ / /_/____/_//_/ /_/ /_/  \\/\\__\\_\\___/","         \\/          /____/                                   ".replace(T,
"")+"version 0.5","Copyright (c) 2011-2012 Jakub Jankiewicz <http://jcubic.pl>"],["      __ _____                     ________                              __","     / // _  /__ __ _____ ___ __ _/__  ___/__ ___ ______ __ __  __ ___  / /"," __ / // // // // // _  // _// // / / // _  // _//     // //  \\/ // _ \\/ /","/  / // // // // // ___// / / // / / // ___// / / / / // // /\\  // // / /__","\\___//____ \\\\___//____//_/ _\\_  / /_//____//_/ /_/ /_//_//_/ /_/ \\__\\_\\___/","          \\/              /____/                                          ".replace(T,
"")+"version 0.5","Copyright (c) 2011-2012 Jakub Jankiewicz <http://jcubic.pl>"]],W=[],N=new function(c){var g=c?[c]:[],f=0;j.extend(this,{rotate:function(){if(g.length===1)return g[0];else{if(f===g.length-1)f=0;else++f;return g[f]}},length:function(){return g.length},set:function(h){for(var i=g.length;i--;)if(g[i]===h){f=i;return}this.append(h)},front:function(){return g[f]},append:function(h){g.push(h)}})};j.fn.terminal=function(c,g){function f(){return b.get(0).scrollHeight>b.innerHeight()}function h(){var a=
b.find(".cursor").width(),e=Math.floor(b.width()/a);if(f()){var m=b.innerWidth()-b.width();e-=Math.ceil((20-m/2)/(a-1))}return e}function i(a,e){if(l.displayExceptions){b.error("&#91;"+e+"&#93;: "+(typeof a==="string"?a:typeof a.fileName==="string"?a.fileName+": "+a.message:a.message));if(typeof a.fileName==="string"){b.pause();j.get(a.fileName,function(m){b.resume();var v=a.lineNumber-1;(m=m.split("\n")[v])&&b.error("&#91;"+a.lineNumber+"&#93;: "+m)})}a.stack&&b.error(a.stack)}}function o(a,e){try{if(typeof e===
"function")e(function(){});else if(typeof e!=="string")throw a+" must be string or function";}catch(m){i(m,a.toUpperCase());return false}return true}function u(){var a=b.prop?b.prop("scrollHeight"):b.attr("scrollHeight");b.scrollTop(a)}function k(a){a=typeof a==="string"?a:String(a);var e,m;if(a.length>E){var v=j.terminal.split_equal(a,E);a=j("<div></div>");e=0;for(m=v.length;e<m;++e)v[e]===""||v[e]==="\r"?a.append("<div>&nbsp;</div>"):j("<div/>").html(j.terminal.format(v[e])).appendTo(a)}else a=
j("<div/>").html("<div>"+j.terminal.format(a)+"</div>");R.append(a);a.width("100%");u();return a}function w(){if(g.greetings===I)b.echo(b.signature);else g.greetings&&b.echo(g.greetings)}function y(a,e){var m=1,v=function(r,A){e.pause();j.jrpc(a,m++,r,A,function(x){if(x.error)e.error("&#91;RPC&#93; "+x.error.message);else if(typeof x.result==="string")e.echo(x.result);else if(x.result instanceof Array)e.echo(x.result.join(" "));else if(typeof x.result==="object"){var H="",S;for(S in x.result)if(x.result.hasOwnProperty(S))H+=
S+": "+x.result[S]+"\n";e.echo(H)}e.resume()},function(x,H){e.error("&#91;AJAX&#93; "+H+" - Server reponse is: \n"+x.responseText);e.resume()})};return function(r,A){if(r!==""){var x,H;if(r.match(/[^ ]* /)){r=r.split(/ +/);x=r[0];H=r.slice(1)}else{x=r;H=[]}if(!l.login||x==="help")v(x,H);else{var S=A.token();S?v(x,[S].concat(H)):A.error("&#91;AUTH&#93; Access denied (no token)")}}}}function B(a){a=a.replace(/\[/g,"&#91;").replace(/\]/g,"&#93;");var e=n.prompt();if(n.mask())a=a.replace(/./g,"*");typeof e===
"function"?e(function(m){b.echo(m+a)}):b.echo(e+a)}function z(a,e){try{var m=s.top();if(a==="exit"&&l.exit)if(s.size()===1)if(l.login)F();else{e||B(a);b.echo("You can exit from main interpeter")}else b.pop("exit");else{e||B(a);a==="clear"&&l.clear?b.clear():m.eval(a,b)}}catch(v){i(v,"USER");b.resume();throw v;}}function C(){var a=null;n.prompt("login: ");l.history&&n.history().disable();n.commands(function(e){try{B(e);if(a){n.mask(false);b.pause();if(typeof l.login!=="function")throw"Value of login property must be a function";
l.login(a,e,function(v){if(v){var r=l.name;r=r?"_"+r:"";j.Storage.set("token"+r,v);j.Storage.set("login"+r,a);n.commands(z);G()}else{b.error("Wrong password try again");n.prompt("login: ");a=null}b.resume();l.history&&n.history().enable()})}else{a=e;n.prompt("password: ");n.mask(true)}}catch(m){i(m,"LOGIN",b);throw m;}})}function F(){if(typeof l.onBeforelogout==="function")try{if(l.onBeforelogout(b)==false)return}catch(a){i(a,"onBeforelogout");throw a;}var e=l.name;e=e?"_"+e:"";j.Storage.remove("token"+
e,null);j.Storage.remove("login"+e,null);l.history&&n.history().disable();C();if(typeof l.onAfterlogout==="function")try{l.onAfterlogout(b)}catch(m){i(m,"onAfterlogout");throw m;}}function O(){var a=s.top(),e="";if(a.name!==I&&a.name!=="")e+=a.name+"_";e+=K;n.name(e);typeof a.prompt=="function"?n.prompt(function(m){a.prompt(m,b)}):n.prompt(a.prompt);l.history&&n.history().enable();n.set("");if(typeof a.onStart==="function")a.onStart(b)}function G(){O();w();if(typeof l.onInit==="function")try{l.onInit(b)}catch(a){i(a,
"OnInit");throw a;}}function q(a){var e;b.oneTime(5,function(){Q()});if(l.keydown){var m=l.keydown(a,b);if(m!==I)return m}if(b.paused()){if(a.which===68&&a.ctrlKey){for(e=W.length;e--;){a=W[e];if(4!==a.readyState)try{a.abort()}catch(v){b.error("error in aborting ajax")}}b.resume();return false}}else{if(a.which!==9)L=0;if(a.which===68&&a.ctrlKey){if(n.get()==="")if(s.size()>1||l.login!==I)b.pop("");else{b.resume();b.echo("")}else b.set_command("");return false}else if(l.tabcompletion&&a.which===9){++L;
var r=n.get().substring(0,n.position());a=r.split(" ");if(a.length==1)m=a[0];else{m=a[a.length-1];for(e=a.length-1;e>0;e--)if(a[e-1][a[e-1].length-1]=="\\")m=a[e-1]+" "+m;else break}var A=RegExp("^"+m);s.top().completion(b,m,function(x){var H=[];for(e=x.length;e--;)A.test(x[e])&&H.push(x[e]);if(H.length===1)b.insert(H[0].replace(A,""));else if(H.length>1)if(L>=2){B(r);b.echo(H.join("\t"));L=0}});return false}else if(a.which===86&&a.ctrlKey)b.oneTime(1,function(){u()});else if(a.which===9&&a.ctrlKey){N.length()>
1&&b.focus(false);return false}else if(a.which===34)b.scroll(b.height());else a.which===33?b.scroll(-b.height()):b.attr({scrollTop:b.attr("scrollHeight")})}}function p(a){return function(e){if(e!==""){e=e.split(/ +/);var m=e[0];e=e.slice(1);var v=a[m],r=j.type(v);if(r==="function")v.apply(b,e);else if(r==="object"||r==="string"){var A=[];if(r==="object"){for(var x in v)v.hasOwnProperty(x)&&A.push(x);v=p(v)}b.push(v,{prompt:m+"> ",name:m,completion:function(H,S,ma){ma(A)}})}else b.error("Command '"+
m+"' Not Found")}}}var b=this,J=[],R,K=N.length(),E,D=[],l=j.extend({name:"",prompt:"> ",history:true,exit:true,clear:true,enabled:true,displayExceptions:true,cancelableAjax:true,login:null,tabcompletion:null,historyFilter:null,onInit:j.noop,onClear:j.noop,onBlur:j.noop,onFocus:j.noop,onTerminalChange:j.noop,onExit:j.noop,keypress:j.noop,keydown:j.noop},g||{});l.width&&b.width(l.width);l.height&&b.height(l.height);var d=!l.enabled;if(b.length===0)throw'Sorry, but terminal said that "'+b.selector+
'" is not valid selector!';b.ajaxSend(function(a,e){W.push(e)});if(b.data("terminal"))return b.data("terminal");R=j("<div>").addClass("terminal-output").appendTo(b);b.addClass("terminal").append("<div/>");if("ontouchstart"in window||window.DocumentTouch&&document instanceof DocumentTouch){b.click(function(){b.find("textarea").focus()});b.find("textarea").focus()}var t=[];j.extend(b,j.omap({clear:function(){R.html("");n.set("");J=[];try{l.onClear(b)}catch(a){i(a,"onClear");throw a;}b.attr({scrollTop:0});
return b},exec:function(a,e){d?t.push([a,e]):z(a,e);return b},commands:function(){return s.top().eval},greetings:function(){w();return b},paused:function(){return d},pause:function(){if(n){d=true;b.disable();n.hidden()}return b},resume:function(){if(n){b.enable();var a=t;for(t=[];a.length;){var e=a.shift();b.exec.apply(b,e)}n.visible();u()}return b},cols:function(){return E},rows:function(){return J.length},history:function(){return n.history()},next:function(){if(N.length()===1)return b;else{var a=
b.offset().top;b.height();b.scrollTop();var e=b,m=j(window).scrollTop(),v=m+j(window).height(),r=j(e).offset().top;if(r+j(e).height()>=m&&r<=v){N.front().disable();a=N.rotate().enable();e=a.offset().top-50;j("html,body").animate({scrollTop:e},500);try{l.onTerminalChange(a)}catch(A){i(A,"onTerminalChange");throw A;}return a}else{b.enable();j("html,body").animate({scrollTop:a-50},500);return b}}},focus:function(a,e){b.oneTime(1,function(){if(N.length()===1)if(a===false)try{!e&&l.onBlur(b)!==false&&
b.disable()}catch(m){i(m,"onBlur");throw m;}else try{!e&&l.onFocus(b)!==false&&b.enable()}catch(v){i(v,"onFocus");throw v;}else if(a===false)b.next();else{var r=N.front();if(r!=b){r.disable();if(!e)try{l.onTerminalChange(b)}catch(A){i(A,"onTerminalChange");throw A;}}N.set(b);b.enable()}});return b},enable:function(){E===I&&b.resize();if(d)if(n){n.enable();d=false}return b},disable:function(){if(n){d=true;n.disable()}return b},enabled:function(){return d},signature:function(){var a=b.cols();a=a<15?
null:a<35?0:a<55?1:a<64?2:a<75?3:4;return a!==null?la[a].join("\n")+"\n":""},version:function(){return"0.5"},get_command:function(){return n.get()},insert:function(a){if(typeof a==="string"){n.insert(a);return b}else throw"insert function argument is not a string";},set_prompt:function(a){if(o("prompt",a)){typeof a=="function"?n.prompt(function(e){a(e,b)}):n.prompt(a);s.top().prompt=a}return b},get_prompt:function(){return s.top().prompt},set_command:function(a){n.set(a);return b},set_mask:function(a){n.mask(a);
return b},get_output:function(a){return a?J:j.map(J,function(e,m){return typeof m=="function"?m():m}).join("\n")},resize:function(a,e){if(a&&e){b.width(a);b.height(e)}E=h();n.resize(E);var m=R.detach();R.html("");j.each(J,function(v,r){k(r&&typeof r=="function"?r():r)});b.prepend(m);u();return b},echo:function(a){J.push(a);k(typeof a==="function"?a():a);Q();return b},error:function(a){return b.echo("[[;#f00;]"+a.replace(/\[/g,"&#91;").replace(/\]/g,"&#93;")+"]")},scroll:function(a){var e;a=Math.round(a);
if(b.prop){a>b.prop("scrollTop")&&a>0&&b.prop("scrollTop",0);e=b.prop("scrollTop");b.prop("scrollTop",e+a)}else{a>b.attr("scrollTop")&&a>0&&b.attr("scrollTop",0);e=b.attr("scrollTop");b.attr("scrollTop",e+a)}return b},logout:l.login?function(){for(;s.size()>1;)s.pop();F();return b}:function(){throw"You don't have login function";},token:l.login?function(){var a=l.name;return j.Storage.get("token"+(a?"_"+a:""))}:j.noop,login_name:l.login?function(){var a=l.name;return j.Storage.get("login"+(a?"_"+
a:""))}:j.noop,name:function(){return l.name},push:function(a,e){if(e&&(!e.prompt||o("prompt",e.prompt))||!e){if(j.type(a)==="string")a=y(a,b);else if(j.type(a)==="object"){var m=[],v;for(v in a)m.push(v);a=p(a);e=e||{};e.completion=function(r,A,x){x(m)}}else throw"Invalid value as eval in push command";s.push(j.extend({eval:a},e));O()}return b},reset:function(){for(b.clear();s.size()>1;)s.pop();G()},pop:function(a){a!==I&&B(a);if(s.top().name===l.name){if(l.login){F();if(typeof l.onExit==="function")try{l.onExit(b)}catch(e){i(e,
"onExit");throw e;}}}else{a=s.pop();O();if(typeof a.onExit==="function")try{a.onExit(b)}catch(m){i(m,"onExit");throw m;}}return b}},function(a,e){return function(){try{return e.apply(this,Array.prototype.slice.apply(arguments))}catch(m){i(m,"TERMINAL")}}}));var Q=function(){var a=f();return function(){if(a!==f()){b.resize();a=f()}}}(),L=0,U;if(l.login&&typeof l.onBeforeLogin==="function")try{l.onBeforeLogin(b)}catch(M){i(M,"onBeforeLogin");throw M;}if(typeof c=="string"){U=c;c=y(c,b)}else if(typeof c==
"object"&&c.constructor===Array)throw"You can't use array as eval";else if(typeof c==="object"){for(var P in c)c.hasOwnProperty(P)&&D.push(P);c=p(c)}else if(typeof c!=="function")throw'Unknow object "'+String(c)+'" passed as eval';if(U&&(typeof l.login==="string"||l.login))l.login=function(a){var e=1;return function(m,v,r){b.pause();j.jrpc(U,e++,a,[m,v],function(A){b.resume();!A.error&&A.result?r(A.result):r(null)},function(A,x){b.resume();b.error("&#91;AJAX&#92; Response: "+x+"\n"+A.responseText)})}}(typeof l.login===
"boolean"?"login":l.login);if(o("prompt",l.prompt)){var s=new ga({name:l.name,eval:c,prompt:l.prompt,completion:l.completion?l.completion:function(a,e,m){m(D)},greetings:l.greetings}),n=b.find(".terminal-output").next().cmd({prompt:l.prompt,history:l.history,historyFilter:l.historyFilter,width:"100%",keydown:q,keypress:l.keypress?function(a){return l.keypress(a,b)}:null,onCommandChange:function(a){if(typeof l.onCommandChange==="function")try{l.onCommandChange(a,b)}catch(e){i(e,"onCommandChange");
throw e;}u()},commands:z});N.append(b);l.enabled===true?b.focus(I,true):b.disable();j(window).resize(b.resize);b.click(function(){d&&N.length()>1&&b===j.terminal.active()||b.focus()});g.login&&b.token&&!b.token()&&b.login_name&&!b.login_name()?C():G();typeof j.fn.init.prototype.mousewheel==="function"&&b.mousewheel(function(a,e){e>0?b.scroll(-40):b.scroll(40);return false},true)}b.data("terminal",b);return b}})(jQuery);
