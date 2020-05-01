// copy of the initial twilio video track, changed a few things and wanted to keep the
// code separate

import React from 'react';
import { LocalVideoTrack } from 'twilio-video';
import VideoTrack from '../../components/VideoTrack/VideoTrack';
import useVideoContext from '../../hooks/useVideoContext/useVideoContext';
import clsx from 'clsx';
import './index.css';

import camera from './images/camera.svg';

type LocalVideoPreviewProps = {
  classNames?: string;
};

const LocalVideoPreview = ({ classNames }: LocalVideoPreviewProps) => {
  const { localTracks } = useVideoContext();

  const videoTrack = localTracks.find(track => track.name === 'camera') as LocalVideoTrack;
  const placeHolderVideo = (
    <div className={clsx('LocalVideo-placeHolder u-height100Percent', classNames)}>
      <img src={camera} alt="camera_icon" />
    </div>
  );
  const video = videoTrack ? <VideoTrack track={videoTrack} isLocal classNames={classNames} /> : null;
  return (
    <div className="LocalVideo u-height100Percent">
      {placeHolderVideo}
      <div className="LocalVideo-video u-height100Percent">{video} </div>
    </div>
  );
};

export default LocalVideoPreview;
