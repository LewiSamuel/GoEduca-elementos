	

		var vid = document.getElementById("video_aula"); 

	var video = $('#video_aula').get(0); //or
	var video = $('#video_aula')[0];

	//return a jQuery object
	var video = $('#video_aula');

	var flag = 1;

	function toggleClassVideo(){
		if(flag == 1){
			playVid();
			flag = 0;
		}else{
			pauseVid();
			flag = 1;
		}
	}


	function nextAula(){
		$("#video_aula").attr("src","aula.mp4");
		$(".publ-controls").hide();
		$(".video-controls").removeClass("hide");
		vid.play();
	}


	$(".video-controls").delay(200).hide(500);

	$("#video_aula").focusin(function(){
		$(".video-controls").show().delay(5000).fadeOut(500).focusout();
	});

	$("#video_aula").mouseup(function(){
		$(".video-controls").show().delay(5000).fadeOut(500).focusout();
	});

	$("#video_aula").focusout(function(){
		$(".video-controls").delay(200).fadeOut(500);
	});




	function playVid() { 
		vid.play();
		$('.btn-play').hide();
		$('.btn-pause').show(); 
		$('.btn-replay').hide();
		$('.img-play').show().delay(500).fadeOut(400);
	} 

	function pauseVid() { 
		vid.pause(); 
		$('.btn-pause').hide();
		$('.btn-play').show(); 
	}

	function enableMute() { 
		vid.muted = true;
		$('.volume-up').hide();
		$('.volume-off').show(); 
	} 

	function disableMute() { 
		vid.muted = false;
		$('.volume-off').hide();
		$('.volume-up').show(); 
	} 

	function fullscreenAtivar(){

		if ((document.fullScreenElement && document.fullScreenElement !== null) ||    
			(!document.mozFullScreen && !document.webkitIsFullScreen)) {
			if (document.documentElement.requestFullScreen) {  
				document.documentElement.requestFullScreen();  
			} else if (document.documentElement.mozRequestFullScreen) {  
				document.documentElement.mozRequestFullScreen();  
			} else if (document.documentElement.webkitRequestFullScreen) {  
				document.documentElement.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT);  
			}  
		} else {  
			if (document.cancelFullScreen) {  
				document.cancelFullScreen();  
			} else if (document.mozCancelFullScreen) {  
				document.mozCancelFullScreen();  
			} else if (document.webkitCancelFullScreen) {  
				document.webkitCancelFullScreen();  
			}  
		}  

		$('.video_back').addClass('back-full-screen');
		$('.video').addClass('video-full-screen');
		$('body').css('position','fixed');
		$('.resize-full').toggle();
		$('.resize-exit').toggle();
	}



	function fullscreenDesativar(){

		if ((document.fullScreenElement && document.fullScreenElement !== null) ||    
			(!document.mozFullScreen && !document.webkitIsFullScreen)) {
			if (document.documentElement.requestFullScreen) {  
				document.documentElement.requestFullScreen();  
			} else if (document.documentElement.mozRequestFullScreen) {  
				document.documentElement.mozRequestFullScreen();  
			} else if (document.documentElement.webkitRequestFullScreen) {  
				document.documentElement.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT);  
			}  
		} else {  
			if (document.cancelFullScreen) {  
				document.cancelFullScreen();  
			} else if (document.mozCancelFullScreen) {  
				document.mozCancelFullScreen();  
			} else if (document.webkitCancelFullScreen) {  
				document.webkitCancelFullScreen();  
			}  
		}  

		$('.video_back').removeClass('back-full-screen');
		$('.video').removeClass('video-full-screen');

		$('body').css('position','initial');
		$('.resize-full').toggle();
		$('.resize-exit').toggle();
	}



	// Duração do video

	//Duração total do video
	
	
	function converteTimer(horas, minutos, segundos){
		if(horas<10 && horas>0){
			horas = '0' + String(horas) +":";
		}else{
			horas = '';
		}
		if(minutos<10){
			minutos = '0' + String(minutos);
		}else if(minutos > 59){
			minutos = minutos - (Math.floor(minutos / 60) * 60);
		}
		
		if(segundos<10){
			segundos = '0' + String(segundos);
		}
		return String(horas) + String(minutos) + ':' + String(segundos);
	}



	//get HTML5 video time duration
	video.on('loadedmetadata', function() {
		var duration_convertido = video[0].duration;

		hour = Math.floor(duration_convertido / 3600);
		min = Math.floor(duration_convertido / 60);
		seg = Math.floor(((duration_convertido / 60) % 1) * 60);

		duration_convertido = converteTimer(hour, min, seg);
		$('.duration').text(duration_convertido);




	});

	//update HTML5 video current play time
	video.on('timeupdate', function() {
		var current_convertido = video[0].currentTime;

		currenthour = Math.floor(current_convertido / 3600);
		currentmin = Math.floor(current_convertido / 60);
		currentseg = Math.floor(((current_convertido / 60) % 1) * 60);

		current_convertido = converteTimer(currenthour, currentmin, currentseg);

		$('.current').text(current_convertido);

		$('.currentpubl').text(5-currentseg);

		if((5-currentseg) <= 0){
			$('.contagem-regressiva').hide();
			$('.pular-anuncio').show();
		}

	});




	//update HTML5 video current play time
	video.on('timeupdate', function() {
	    var currentPos = video[0].currentTime; //Get currenttime
	    var maxduration = video[0].duration; //Get video duration
	    var percentage = 100 * currentPos / maxduration; //in %
	    $('.video-progress').css('width', percentage+'%');
	    
	    if(currentPos == maxduration){
	    	$('.btn-replay').show();
	    	$('.btn-pause').hide();
	    }


	});

	

	var timeDrag = false;   /* Drag status */
	$('.video-progress-bar').mousedown(function(e) {
		timeDrag = true;
		updatebar(e.pageX);
	});
	$(document).mouseup(function(e) {
		if(timeDrag) {
			timeDrag = false;
			updatebar(e.pageX);
		}
	});
	$(document).mousemove(function(e) {
		if(timeDrag) {
			updatebar(e.pageX);
		}
	});

//update Progress Bar control
var updatebar = function(x) {
	var progress = $('.video-progress-bar');
    var maxduration = video[0].duration; //Video duraiton
    var position = x - progress.offset().left; //Click pos
    var percentage = 100 * position / progress.width();

    //Check within range
    if(percentage > 100) {
    	percentage = 100;
    }
    if(percentage < 0) {
    	percentage = 0;
    }

    //Update progress bar and video currenttime
    $('.video-progress').css('width', percentage+'%');
    video[0].currentTime = maxduration * percentage / 100;
};


//loop to get HTML5 video buffered data
var startBuffer = function() {
	var maxduration = video[0].duration;
	var currentBuffer = video[0].buffered.end(0);
	var percentage = 100 * currentBuffer / maxduration;
	$('.video-loader').css('width', percentage+'%');

	if(currentBuffer < maxduration) {
		setTimeout(startBuffer, 500);
	}
};
setTimeout(startBuffer, 500);
