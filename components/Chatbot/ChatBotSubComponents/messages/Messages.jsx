import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, Download, FileText, ImageIcon, Loader2, AlertCircle } from 'lucide-react';
import CustomMarkdownMessage from './UserMessage';
import ProjectsList from '../projects/ProjectsList';
import Image from "next/image";
import logoIcon from '@/assets/logo-icon.svg';
import userIcon from '@/assets/user-icon.svg';

function Message({ message, isBotTypingMap, streamingMessages, isLastMessage, moreProperty, setMoreProperty, query, setQuery }) {
  const [playingAudio, setPlayingAudio] = useState(false);
  const [audioProgress, setAudioProgress] = useState(0);
  const [audioDuration, setAudioDuration] = useState(0);
  const [expandedImage, setExpandedImage] = useState(null);
  const [audioLoading, setAudioLoading] = useState(false);
  const [audioError, setAudioError] = useState(false);
  const audioRef = useRef(null);


  useEffect(() => {
    // Handle audio from S3 URL or base64
    const audioData = message.audioData || message.audioBase64;
    const isAudio = message.isAudio || audioData;
    
    if (isAudio && audioData) {
      // Clean up previous audio if exists
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = '';
      }
      
      // Create new audio element
      audioRef.current = new Audio();
      setAudioLoading(true);
      setAudioError(false);
      
      // Set up event listeners
      const handleLoadedMetadata = () => {
        setAudioDuration(audioRef.current.duration);
        setAudioLoading(false);
      };

      const handleTimeUpdate = () => {
        setAudioProgress(audioRef.current.currentTime);
      };

      const handleEnded = () => {
        setPlayingAudio(false);
        setAudioProgress(0);
      };

      const handleError = (e) => {
        console.error('Audio load error:', e);
        setAudioError(true);
        setAudioLoading(false);
        setPlayingAudio(false);
      };

      const handleCanPlay = () => {
        setAudioLoading(false);
      };

      // Add event listeners
      audioRef.current.addEventListener('loadedmetadata', handleLoadedMetadata);
      audioRef.current.addEventListener('timeupdate', handleTimeUpdate);
      audioRef.current.addEventListener('ended', handleEnded);
      audioRef.current.addEventListener('error', handleError);
      audioRef.current.addEventListener('canplay', handleCanPlay);

      // Set the audio source
      audioRef.current.src = audioData;
      audioRef.current.load();

      // Cleanup function
      return () => {
        if (audioRef.current) {
          audioRef.current.removeEventListener('loadedmetadata', handleLoadedMetadata);
          audioRef.current.removeEventListener('timeupdate', handleTimeUpdate);
          audioRef.current.removeEventListener('ended', handleEnded);
          audioRef.current.removeEventListener('error', handleError);
          audioRef.current.removeEventListener('canplay', handleCanPlay);
        }
      };
    }
  }, [message.isAudio, message.audioData, message.audioBase64]);

  const toggleAudioPlayback = () => {
    if (!audioRef.current || audioError) return;

    if (playingAudio) {
      audioRef.current.pause();
      setPlayingAudio(false);
    } else {
      audioRef.current.play()
        .then(() => {
          setPlayingAudio(true);
        })
        .catch(error => {
          console.error('Error playing audio:', error);
          setAudioError(true);
          setPlayingAudio(false);
        });
    }
  };

  const handleSeek = (e) => {
    if (!audioRef.current || audioError) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const newTime = (clickX / rect.width) * audioDuration;
    
    audioRef.current.currentTime = newTime;
    setAudioProgress(newTime);
  };

  const downloadAudio = () => {
    const audioData = message.audioData || message.audioBase64;
    if (!audioData) return;

    // If it's a URL, download from URL
    if (typeof audioData === 'string' && audioData.startsWith('http')) {
      const link = document.createElement('a');
      link.href = audioData;
      link.download = `audio-message-${new Date(message.timestamp).getTime()}.webm`;
      link.target = '_blank';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      // If it's base64, download as blob
      const link = document.createElement('a');
      link.href = audioData;
      link.download = `audio-message-${new Date(message.timestamp).getTime()}.webm`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const formatTime = (seconds) => {
    if (!seconds || isNaN(seconds)) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getFileIcon = (fileType) => {
    if (fileType?.startsWith('image/')) return <ImageIcon size={16} />;
    return <FileText size={16} />;
  };

  const renderFileAttachment = (file, index) => {
    const isImage = file.type?.startsWith('image/');

    return (
      <div key={index} className="mb-2 p-3 bg-gray-50 rounded-lg border">
        <div className="flex items-center justify-between ">
          <div className="flex items-center flex-col content-start space-x-2 text-[#171717]">
            {isImage && file.url && (
              <div className="my-2">
                <img
                  src={file.url}
                  alt={file.name}
                  className="max-w-full h-auto max-h-48 rounded border cursor-pointer hover:opacity-90"
                  onClick={() => setExpandedImage(file.url)}
                />
              </div>
            )}
            {file.isProcessing && (
              <div className="flex items-center space-x-1 text-primary">
                <Loader2 className="w-6 h-6 animate-spin" />
                <span className="text-md text-ellipsis" style={{ fontSize: '16px' }}>Analyzing {file.name}</span>
              </div>
            )}
            {!file.isProcessing && !file.hasError && <div className='flex text-primary gap-2 items-center'>
              {getFileIcon(file.type)}
              <span className=" font-medium" style={{ fontSize: '16px' }}>{file.name}</span>
              <span className=" text-gray-500" style={{ fontSize: '16px' }}>
                ({formatFileSize(file.size)})
              </span>
            </div>}
          </div>
        </div>

        {!isImage && file.url && (
          <div className=" flex justify-end">
            <a
              href={file.url}
              download={file.name}
              className="text-blue-600 underline text-sm hover:text-blue-800"
            >
              Download File
            </a>
          </div>
        )}
      </div>
    );
  };

  const renderAudioMessage = () => {
    // Check multiple possible audio indicators
    const audioData = message.audioData || message.audioBase64;
    const isAudio = message.isAudio || audioData;

  
    if (!isAudio) return null;

    return (
      <div className="mb-3 p-3 bg-white rounded-lg border border-blue-200">
        <div className="flex items-center space-x-3">
          <button
            onClick={toggleAudioPlayback}
            className="p-2 bg-[#931602] text-white rounded-full hover:opacity-80 transition-colors"
            disabled={audioLoading || audioError}
          >
            {audioLoading ? (
              <Loader2 className="animate-spin" size={16} />
            ) : audioError ? (
              <AlertCircle size={16} />
            ) : playingAudio ? (
              <Pause size={16} />
            ) : (
              <Play size={16} />
            )}
          </button>

          <div className="flex-1 space-y-1">
            <div className="flex justify-between items-center mb-1">
              <span className="text-sm font-medium text-[#931602]">
                Audio    
              </span>
              <span className="text-xs text-[#931602]">
                {formatTime(audioProgress)}
              </span>
            </div>

            <div 
              className="w-full bg-[#931602] rounded-full h-2 cursor-pointer"
              onClick={handleSeek}
            >
              <div
                className="bg-[#931602] h-2 rounded-full transition-all duration-100"
                style={{
                  width: `${audioDuration ? (audioProgress / audioDuration) * 100 : 0}%`
                }}
              />
            </div>
            
            {audioError && (
              <div className="text-xs text-red-500 mt-1">
                Error loading audio. Please try again.
              </div>
            )}
          </div>

          <button
            onClick={downloadAudio}
            className="p-2 text-[#931602] hover:opacity-80 rounded-full transition-colors"
            title="Download audio"
            disabled={audioError}
          >
            <Download size={16} />
          </button>
        </div>
      </div>
    );
  };

  const renderMessageContent = () => {
    const hasReferences = message.role === 'assistant' && Array.isArray(message.references) && message.references.length > 0;
    const hasFiles = Array.isArray(message.files) && message.files.length > 0;
    const audioData = message.audioData || message.audioBase64;
    const isAudio = message.isAudio || audioData;
    return (
      <div className="space-y-3">
        {isAudio && renderAudioMessage()}
      
        {hasFiles && (
          <div className="space-y-2">
            {message.files.map((file, index) => renderFileAttachment(file, index))}
          </div>
        )}

        {message.role === 'assistant' ? (
          <>
            <CustomMarkdownMessage content={message.content} isBotTypingMap={isBotTypingMap} />
            {message.projects && Array.isArray(message.projects) && (
              <ProjectsList projects={message.projects} moreProperty={moreProperty} setMoreProperty={setMoreProperty} />
            )}
          </>
        ) : (
          <span>{message.content}</span>
        )}

        {hasReferences && (
          <div className="mt-2 text-[16px] space-y-1">
            Reference:
            {message.references.map((ref, idx) => (
              <div key={idx}>
                <a
                  href={ref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline text-[16px] text-blue-600 hover:text-blue-800"
                >
                  {ref}
                </a>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  const containerClasses = `flex mb-4 items-start ${message.role === 'user' ? 'flex-row-reverse' : ''}`;
  const bubbleClasses = `
    max-w-[80%] px-4 py-3 rounded-[18px] relative 
    ${message.role === 'user'
      ? 'bg-[#931602] text-white rounded-br-[4px]'
      : 'bg-[#f1f3f5] text-[#343a40] rounded-bl-[4px]'
    }
  `;

  return (
    <div className={containerClasses}>
      <div
        className={`w-12 h-12 flex items-center justify-center rounded-full mx-2 text-[1.2rem] ${message.role === 'user' ? 'bg-[#931602]' : 'bg-white'}`}
      >
        {message.role === 'user' ? (
          <Image
            src={userIcon.src}
            alt="User"
            width={30}
            height={30}
            className="w-[30px] h-[30px] object-contain"
          />
        ) : (
          <Image
            src={logoIcon.src}
            alt="Assistant"
            width={30}
            height={30}
            className="w-[50px] h-[50px] object-contain"
          />
        )}
      </div>

      <div className={bubbleClasses}>
        <div className="whitespace-pre-wrap break-words leading-[1.5]">
          {renderMessageContent()}
        </div>
      </div>

      {expandedImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
          onClick={() => setExpandedImage(null)}
        >
          <div className="relative m-4">
            <Image
            width={1000}
                  height={600}
              src={expandedImage}
              alt="Expanded view"
              className="h-[600px] w-[1000px] object-contain"
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default Message;