// Визуализатор
var audio, context, analyser, src, array, logo;

logo = document.getElementById("logo");

audio = document.getElementById("audio");

window.onclick = function(){
    if(!context){
        preparation();
    }
    if(audio.paused){
        audio.play();
        loop();
    }else{
        audio.pause();
    }
}

function preparation(){
    context = new AudioContext();
    analyser = context.createAnalyser();
    src = context.createMediaElementSource(audio);
    src.connect(analyser);
    analyser.connect(context.destination);
    setInterval(loop, 1);
    //loop();
}
function loop(){
    //if(!audio.paused){
    //   window.requestAnimationFrame(loop);
    //}
    array = new Uint8Array(analyser.frequencyBinCount);
    analyser.getByteFrequencyData(array);

    logo.style.height = (array[0])+200+"px";
    logo.style.width = (array[0])+200+"px";

    var massPAL = document.querySelectorAll('#palc');
    for(var num = 0; num <= massPAL.length; num++) {
        //if(Number.isInteger(num/2)) {
        //    massPAL[num].style.height = (array[num+massPAL.length])*2+"px";
        //} else {
            massPAL[num].style.height = (array[num+massPAL.length])*4+"px";
        //}
    }
}
// Конец визуализатора
// Рандом случайных цветов
function color() {
	var colorB = document.getElementById('color_border');
	var palColor = document.getElementById('pal_color');
	
	var massColor = ['fc0303', 'fc9803', 'e8fc03', '07fc03', '03fcfc'];
	var number = massColor[4];

    if((array[0]) <= 45) {
        number = massColor[4];
    } else if((array[0]) <= 90) {
        number = massColor[3];
    } else if((array[0]) <= 135) {
        number = massColor[2];
    } else if((array[0]) <= 200) {
        number = massColor[1];
    } else {
        number = massColor[0];
    }

	colorB.style.border = '10px solid #' + number;
	colorB.style.boxShadow = '0px 0px 100px #' + number;

	palColor.style.backgroundColor = '#' + number;

    var massPAL = document.querySelectorAll('#palc_color');
    for(var num = 0; num <= massPAL.length; num++) {
        massPAL[num].style.backgroundColor = '#' + number;
        massPAL[num].style.boxShadow = '0px 0px 50px #' + number;
    }
};
setInterval(color, 200);



