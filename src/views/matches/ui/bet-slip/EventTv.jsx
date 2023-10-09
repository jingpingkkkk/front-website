import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import UnrealWebRTCPlayer from '../../../../helper/unreal-webrtc-player';

function EventTv({ togglePlayback }) {
  const { videoStreamId = null } = useSelector(
    (state) => state.eventMarket.event,
  );

  useEffect(() => {
    if (!videoStreamId) return () => {};
    const webRtcPlayer = new UnrealWebRTCPlayer(
      `remoteVideo${videoStreamId}`,
      `cricket${videoStreamId}`,
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
  }, [togglePlayback, videoStreamId]);

  return (
    <div>
      {videoStreamId ? (
        <video
          style={{ backgroundColor: 'white' }}
          id={`remoteVideo${videoStreamId}`}
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
