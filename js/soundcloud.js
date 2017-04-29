/**
 * Plugin to integrate HTML list with Soundcloud player widget
 * Version: 1.0
 * Author: André Nankran <andrenankran@gmail.com.br>
 */

playWidget = function(myTrackId,id){
	var widgetIframe = document.getElementById(id);
	var widget = SC.Widget(widgetIframe);
	var myTrackUri = '/tracks/'+myTrackId;
	var url = 'https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com'+myTrackUri+'&amp;auto_play=true&amp;hide_related=false&amp;show_comments=false&amp;show_user=false&amp;show_reposts=false&amp;visual=false';
	$('#'+id).attr('src',url);
}

$(document).ready(function(){
	if($('.playlists').length > 0){
		var id,myTrackId,widget,nextTrack;
		SC.initialize({
		    client_id: "ID",
		});
		$('.playlists_item').addClass('stopped');
		$('.playlists_item').on('click',function(){
			if(!$(this).hasClass('playing')){
				$('.playlists_item').css('font-weight','normal');
				if($(this).hasClass('stopped')){
					myTrackId = $(this).attr('id');
					id = $(this).parent().parent().find('iframe').attr('id');
					playWidget(myTrackId,id);
					$(this).css('font-weight','bold').removeClass('stopped').addClass('playing');
				}
			} else {
				$(this).removeClass('playing').addClass('stopped');
			}
		});
		setInterval(function(){		
			myTrackId = $('.playing').attr('id');
			id = $('.playing').parent().parent().find('iframe').attr('id');
			if(id !== undefined && id !== null && id !== ''){
				widget = SC.Widget(id);
				widget.bind(SC.Widget.Events.PLAY, function(){
					widget.getCurrentSound(function (currentSound) {
						$('#'+currentSound.id).css('font-weight','bold').removeClass('stopped').addClass('playing');
					});
				});
				widget.bind(SC.Widget.Events.PAUSE, function(){
					$('#'+myTrackId).removeClass('playing').addClass('stopped').css('font-weight','normal');
				});
				widget.bind(SC.Widget.Events.FINISH, function(){
					$('#'+myTrackId).removeClass('playing').addClass('stopped').css('font-weight','normal');
					nextTrack = $('#'+myTrackId).parent().next().find('span').attr('id');
					playWidget(nextTrack,id);
					$('#'+nextTrack).css('font-weight','bold').removeClass('stopped').addClass('playing');
				});	
			} else {
				widget1 = SC.Widget('widget_id');
				widget1.bind(SC.Widget.Events.PLAY, function(){
					widget1.getCurrentSound(function (currentSound) {
						$('#'+currentSound.id).css('font-weight','bold').removeClass('stopped').addClass('playing');
					});
				});
			}
		}, 100);
	}
});
