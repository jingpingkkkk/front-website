import React, { useEffect } from 'react';
import UnrealWebRTCPlayer from '../../../../helper/unreal-webrtc-player';

function EventTv({ togglePlayback, liveVideoId, enableLiveVideo }) {
  useEffect(() => {
    if (!enableLiveVideo) return () => {};
    const webRtcPlayer = new UnrealWebRTCPlayer(
      `remoteVideo${liveVideoId}`,
      `cricket${liveVideoId}`,
      '',
      '93.115.26.41',
      '5119',
      false,
      true,
      'tcp',
    );
    webRtcPlayer.Play();
    return () => {
      webRtcPlayer.Stop();
    };
  }, [togglePlayback, enableLiveVideo, liveVideoId]);

  return (
    <div>
      {enableLiveVideo ? (
        <video
          style={{ backgroundColor: 'white' }}
          id={`remoteVideo${liveVideoId}`}
          width="100%"
          height="auto"
          controls
          autoPlay
          muted
        />
      ) : (
        <img
          src="images/screen-3.png"
          alt="img"
          width="100%"
          height="150px"
          style={{ objectFit: 'cover' }}
        />
      )}
    </div>
  );
}

export default EventTv;
