function getImage(e,t){return imageToBase(e,t),getAverageRGB(e,t)}function imageToBase(e){var t=new XMLHttpRequest;t.onload=function(){var a=new FileReader;a.onloadend=function(){e.src=a.result},a.readAsDataURL(t.response)},t.open("GET",e.src),t.responseType="blob",t.send()}function getAverageRGB(e,t){var a,n,r,i,g=t,d=document.createElement("canvas"),o=d.getContext&&d.getContext("2d"),h=-4,s={r:0,g:0,b:0},c=0;t||(g=5),r=d.height=e.naturalHeight||e.offsetHeight||e.height,n=d.width=e.naturalWidth||e.offsetWidth||e.width,o.drawImage(e,0,0);try{a=o.getImageData(0,0,n,r)}catch(u){return{r:0,g:0,b:0}}for(i=a.data.length;(h+=4*g)<i;)++c,s.r+=a.data[h],s.g+=a.data[h+1],s.b+=a.data[h+2];return s.r=~~(s.r/c),s.g=~~(s.g/c),s.b=~~(s.b/c),"rgb("+s.r+","+s.g+","+s.b+")"}async function getVideoRGB(e,t){var a=e,n="";(!0===a.playing||0===a.currentTime)&&a.addEventListener("play",function e(){var r=document.createElement("canvas");r.width=window.innerWidth,r.height=window.innerHeight,r.getContext("2d").drawImage(a,0,0,r.width,r.height),t(n=getAverageRGB(r,5)),setTimeout(e)},!1)}Object.defineProperty(HTMLMediaElement.prototype,"playing",{get:function(){return!!(this.currentTime>0&&!this.paused&&!this.ended&&this.readyState>2)}});