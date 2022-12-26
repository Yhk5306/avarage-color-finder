
function getImage(img,block) {
    imageToBase(img,block)
    var rgb = getAverageRGB(img,block)
    return rgb
}


function imageToBase(img){
    var xhr = new XMLHttpRequest();
    xhr.onload = function() {
        var reader = new FileReader();
        reader.onloadend = function() {
            img.src = reader.result
        }
        reader.readAsDataURL(xhr.response);
    };
    xhr.open('GET', img.src);
    xhr.responseType = 'blob';
    xhr.send();
}


function getAverageRGB(imgEl,block){
    var blockSize = block,
        defaultRGB = {r:0,g:0,b:0},
        canvas = document.createElement('canvas'),
        context = canvas.getContext && canvas.getContext('2d'),
        data, width, height,
        i = -4,
        length,
        rgb = {r:0,g:0,b:0},
        count = 0;
    if (!block) blockSize = 5;



    height = canvas.height = imgEl.naturalHeight || imgEl.offsetHeight || imgEl.height;
    width = canvas.width = imgEl.naturalWidth || imgEl.offsetWidth || imgEl.width;

    context.drawImage(imgEl, 0, 0);

    try {
        data = context.getImageData(0, 0, width, height);
    } catch(e) {
        return defaultRGB;
    }

    length = data.data.length;

    while ( (i += blockSize * 4) < length ) {
        ++count;
        rgb.r += data.data[i];
        rgb.g += data.data[i+1];
        rgb.b += data.data[i+2];
    }

    rgb.r = ~~(rgb.r/count);
    rgb.g = ~~(rgb.g/count);
    rgb.b = ~~(rgb.b/count);


    return 'rgb('+rgb.r+','+rgb.g+','+rgb.b+')';
}

Object.defineProperty(HTMLMediaElement.prototype, 'playing', {
    get: function(){
        return !!(this.currentTime > 0 && !this.paused && !this.ended && this.readyState > 2);
    }
})



async function getVideoRGB(videoId,callback){
    var video = videoId;
    var color = '';
    var defaultRGB = {r:0,g:0,b:0}

    if(video.playing === true || video.currentTime === 0){ // checks if element is playing right now
        video.addEventListener('play',  function getVid() {
                var canvas = document.createElement('canvas');
                canvas.width = window.innerWidth;
                canvas.height = window.innerHeight;
                var context = canvas.getContext('2d');
                context.drawImage(video, 0, 0, canvas.width, canvas.height);
                color = getAverageRGB(canvas,5)
                callback(color)
                setTimeout(getVid)
        }, false);
    }
}












