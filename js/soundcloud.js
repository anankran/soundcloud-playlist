playWidget = function(myTrackId,id){
	var widgetIframe = document.getElementById(id);
	var widget = SC.Widget(widgetIframe);
	var newSoundUri = '/tracks/'+myTrackId;
	var url = 'https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com'+newSoundUri+'&amp;auto_play=true&amp;hide_related=false&amp;show_comments=false&amp;show_user=false&amp;show_reposts=false&amp;visual=false';
	jQuery('#'+id).attr('src',url);
}

jQuery(document).ready(function(){

	if(jQuery('.playlists').length > 0){
		var id,myTrackId,widget,nextTrack;
		SC.initialize({
		    client_id: "ID",
		});
		jQuery('.playlists_item').addClass('stopped');
		jQuery('.playlists_item').on('click',function(){
			if(!jQuery(this).hasClass('playing')){
				jQuery('.playlists_item').css('font-weight','normal');
				if(jQuery(this).hasClass('stopped')){
					myTrackId = jQuery(this).attr('id');
					id = jQuery(this).parent().parent().find('iframe').attr('id');
					playWidget(myTrackId,id);
					jQuery(this).css('font-weight','bold').removeClass('stopped').addClass('playing');
				}
			} else {
				jQuery(this).removeClass('playing').addClass('stopped');
			}
		});
		setInterval(function(){		
			myTrackId = jQuery('.playing').attr('id');
			id = jQuery('.playing').parent().parent().find('iframe').attr('id');
			if(id !== undefined && id !== null && id !== ''){
				widget = SC.Widget(id);
				widget.bind(SC.Widget.Events.PLAY, function(){
					widget.getCurrentSound(function (currentSound) {
						jQuery('#'+currentSound.id).css('font-weight','bold').removeClass('stopped').addClass('playing');
					});
				});
				widget.bind(SC.Widget.Events.PAUSE, function(){
					jQuery('#'+myTrackId).removeClass('playing').addClass('stopped').css('font-weight','normal');
				});
				widget.bind(SC.Widget.Events.FINISH, function(){
					jQuery('#'+myTrackId).removeClass('playing').addClass('stopped').css('font-weight','normal');
					nextTrack = jQuery('#'+myTrackId).parent().next().find('span').attr('id');
					playWidget(nextTrack,id);
					jQuery('#'+nextTrack).css('font-weight','bold').removeClass('stopped').addClass('playing');
				});	
			} else {
				widget1 = SC.Widget('widget_id');
				widget1.bind(SC.Widget.Events.PLAY, function(){
					widget1.getCurrentSound(function (currentSound) {
						jQuery('#'+currentSound.id).css('font-weight','bold').removeClass('stopped').addClass('playing');
					});
				});
			}
		}, 100);
	}

});
