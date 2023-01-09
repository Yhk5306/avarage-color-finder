
function getImage(img,block) {
    var rgb =  getAverageRGB(img,block)
    return  rgb
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



async function getVideoRGB(videoId,callback){
    var video = videoId;
    var color = '';
    var defaultRGB = {r:0,g:0,b:0}

        video.addEventListener('play',  function getVid() {
            if (!video.paused) {
                var canvas = document.createElement('canvas');
                canvas.width = window.innerWidth;
                canvas.height = window.innerHeight;
                var context = canvas.getContext('2d');
                context.drawImage(video, 0, 0, canvas.width, canvas.height);
                color = getAverageRGB(canvas,5)
                callback(color)
                setTimeout(getVid)
            }
        }, false);
}












