import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { Paperclip, Mic, Send, Square, Loader2, X, FileText, Image as ImageIcon, Globe } from 'lucide-react';
import superAreaLogo from './../../../../assets/chatbot/superAreaLogo.svg';
import { EllipsisVertical } from 'lucide-react';
import { COMPONENTS } from '@/textV2'

import { makeApiRequest } from '@/utils/utils';
import ConfirmLoginModal from '../chats/ConfirmLoginModal';
const { text } = COMPONENTS?.CHATBOT_COMPO;

function MessageForm({ socket, connected, userId, activeChat, setIsSearching, setShowProjects, messages, setStreamingMessages, userCurrentAddress, isMobile = false, isBotTypingMap }) {
  const inputRef = useRef();
  const inputRefMain = useRef();
  const [inputMessage, setInputMessage] = useState('');
  const [recording, setRecording] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [audioLevel, setAudioLevel] = useState(0);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [superSearch, setSuperSearch] = useState(false);
  const [isFileUploading, setIsFileUploading] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showMobileOptions, setShowMobileOptions] = useState(false);


  // New states for audio handling
  const [recordedAudio, setRecordedAudio] = useState(null);
  const [isTranscribing, setIsTranscribing] = useState(false);

  const mediaRecorderRef = useRef(null);
  const audioContextRef = useRef(null);
  const analyserRef = useRef(null);
  const streamRef = useRef(null);
  const animationRef = useRef(null);
  const chunksRef = useRef([]);
  const fileInputRef = useRef(null);

  const supportedFileTypes = {
    'application/pdf': 'PDF',
    'image/jpeg': 'Image',
    'image/png': 'Image',
    'image/gif': 'Image',
    'image/webp': 'Image',
    'text/plain': 'Text',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document': 'Word',
    'application/msword': 'Word'
  };

  const maxFileSize = 512 * 1024 * 1024;

  // Utility functions
  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getFileIcon = (fileType) => {
    if (fileType.startsWith('image/')) return <ImageIcon size={16} />;
    return <FileText size={16} />;
  };

  const renderRecordedAudio = () => {
    if (!recordedAudio) return null;

    return (
      <div className="mb-3 p-3 bg-gray-50 rounded-lg border">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2 text-[#171717]">
            <Mic size={16} />
            <span className="font-medium" style={{ fontSize: '16px' }}>
              {inputMessage.trim() || 'Audio Message'}
            </span>
            <span className="text-gray-500 min-w-[100px]" style={{ fontSize: '16px' }}>
              ({formatFileSize(recordedAudio.size)})
            </span>
          </div>
          <button
            onClick={removeRecordedAudio}
            className="text-[#931602] hover:text-primary"
          >
            <X size={16} />
          </button>
        </div>
      </div>
    );
  };

  useEffect(() => {
    if (recording && analyserRef.current) {
      const updateAudioLevel = () => {
        const dataArray = new Uint8Array(analyserRef.current.frequencyBinCount);
        analyserRef.current.getByteFrequencyData(dataArray);
        const average = dataArray.reduce((sum, val) => sum + val, 0) / dataArray.length;
        setAudioLevel(Math.min(average / 128, 1));
        animationRef.current = requestAnimationFrame(updateAudioLevel);
      };
      updateAudioLevel();
    }
    return () => cancelAnimationFrame(animationRef.current);
  }, [recording]);

  const adjustInputareaHeight = () => {
    if (inputRef.current) {
      const textarea = inputRef.current;
      textarea.style.height = 'auto';

      const lineHeight = 24;
      const maxLines = 3;
      const maxHeight = lineHeight * maxLines;

      const newHeight = Math.min(textarea.scrollHeight, maxHeight);
      textarea.style.height = `${newHeight}px`;

      const currentValue = textarea.value;

      if (newHeight > 60 && currentValue) {
        textarea.style.paddingTop = '4px';
        textarea.style.paddingBottom = '4px';
      }
    }
  };
  const adjustInputareaHeightMain = () => {
    if (inputRefMain.current) {
      const textarea = inputRefMain.current;
      textarea.style.height = 'auto';

      const lineHeight = 24;
      const maxLines = 5;
      const maxHeight = lineHeight * maxLines;

      const newHeight = Math.min(textarea.scrollHeight, maxHeight);
      textarea.style.height = `${newHeight}px`;

    }
  };


  useEffect(() => {
    adjustInputareaHeight();
    adjustInputareaHeightMain();
  }, [inputMessage])

  useEffect(() => {
    if (socket) {
      const handleTranscriptionResult = (data) => {
        setIsTranscribing(false);
        // Set the transcribed text in the input box
        setInputMessage(data.transcription || '');
      };

      const handleGuestTokenLimit = () => {
        setShowLoginModal(true);
      };

      const handleTranscriptionError = (error) => {
        console.error('Transcription error:', error);
        setIsTranscribing(false);
        setRecording(false);
        alert('Transcription failed. Please try again.');
      };

      const handleFileProcessingResult = (data) => {
        setIsFileUploading(false);
      };

      const handleFileProcessingError = (error) => {
        console.error('File processing error:', error);
        setIsFileUploading(false);
        alert(`File processing error: ${error.message}`);
      };

      socket.on('transcription_result', handleTranscriptionResult);
      socket.on('transcription_error', handleTranscriptionError);
      socket.on('file_processing_result', handleFileProcessingResult);
      socket.on('file_processing_error', handleFileProcessingError);
      socket.on('guest_token_limit', handleGuestTokenLimit);

      return () => {
        socket.off('transcription_result', handleTranscriptionResult);
        socket.off('transcription_error', handleTranscriptionError);
        socket.off('file_processing_result', handleFileProcessingResult);
        socket.off('file_processing_error', handleFileProcessingError);
        socket.off('guest_token_limit', handleGuestTokenLimit);
      };
    }
  }, [socket]);

  const handleFileSelect = (event) => {
    const files = Array.from(event.target.files);
    const validFiles = [];
    const errors = [];

    files.forEach(file => {
      if (!supportedFileTypes[file.type]) {
        errors.push(`${file.name}: Unsupported file type`);
        return;
      }

      if (file.size > maxFileSize) {
        errors.push(`${file.name}: File too large (max 512MB)`);
        return;
      }



      validFiles.push({
        file,
        name: file.name,
        type: file.type,
        size: file.size,
        id: Math.random().toString(36).substr(2, 9)
      });

    });

    if (errors.length > 0) {
      alert('Some files were rejected:\n' + errors.join('\n'));
    }

    setSelectedFiles(prev => [...prev, ...validFiles]);
    event.target.value = '';
  };

  const removeFile = (fileId) => {
    setSelectedFiles(prev => prev.filter(f => f.id !== fileId));
  };

  const removeRecordedAudio = () => {
    setRecordedAudio(null);
    setInputMessage('');
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    setStreamingMessages("");

    if ((!inputMessage.trim() && selectedFiles.length === 0 && !recordedAudio) || !socket || !connected) {
      return;
    }



    // Handle audio message
    if (recordedAudio) {

      try {
        setIsFileUploading(true);

        if (!recordedAudio.blob || recordedAudio.blob.size === 0) {
          throw new Error('Invalid audio data. Please try recording again.');
        }

        if (recordedAudio.blob.size > 25 * 1024 * 1024) {
          throw new Error('Audio file too large. Please record a shorter message.');
        }

        let audioUrl = null;
        let useBase64Fallback = false;

        try {
          audioUrl = await uploadAudioToS3(recordedAudio.blob, recordedAudio.fileName);
        } catch (uploadError) {
          console.warn('S3 upload failed, using base64 fallback:', uploadError);
          useBase64Fallback = true;
        }

        if (useBase64Fallback) {

          // Convert blob to base64 synchronously using Promise
          const base64Data = await new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(reader.result);
            reader.onerror = reject;
            reader.readAsDataURL(recordedAudio.blob);
          });


          const messageData = {
            chatId: activeChat,
            message: inputMessage.trim() || 'Audio Message',
            userId,
            audioData: base64Data,
            audioBase64: base64Data,
            isAudio: true,
            audioName: 'Audio Message',
            audioTitle: 'Audio Message',
            displayText: ` ${inputMessage.trim() || 'Audio Message'}`,
            superSearch,
          };

          messageData.userCurrentAddress = userCurrentAddress;
          socket.emit('send_message', messageData);

        } else {

          const messageData = {
            chatId: activeChat,
            message: inputMessage.trim() || 'Audio Message',
            userId,
            audioData: audioUrl,
            isAudio: true,
            audioName: 'Audio Message',
            audioTitle: 'Audio Message',
            displayText: ` ${inputMessage.trim() || 'Audio Message'}`,
            superSearch,
          };

          messageData.userCurrentAddress = userCurrentAddress;
          socket.emit('send_message', messageData);
        }

        // Clear the form
        setRecordedAudio(null);
        setInputMessage('');
        setIsFileUploading(false);

      } catch (error) {
        console.error('Audio message processing failed:', error);
        alert(`Failed to send audio message: ${error.message}`);
        setIsFileUploading(false);
        return;
      }
    }
    // Handle file messages
    else if (selectedFiles.length > 0) {
      setIsFileUploading(true);

      try {
        const uploadedFiles = await uploadFilesToS3(selectedFiles);
        socket.emit('file_message', {
          chatId: activeChat,
          message: inputMessage.trim(),
          userId,
          files: uploadedFiles
        });
        setSelectedFiles([]);
        setInputMessage('');
        setIsFileUploading(false);
      } catch (error) {
        console.error('Error uploading files:', error);
        alert(`Failed to upload files: ${error.message}`);
        setIsFileUploading(false);
        return;
      }
    }
    // Handle regular text messages
    else {
      socket.emit('send_message', {
        chatId: activeChat,
        message: inputMessage,
        userId,
        superSearch,
        userCurrentAddress
      });
      setInputMessage('');
    }

  };

  // Enhanced uploadAudioToS3 with detailed debugging
  const uploadAudioToS3 = async (audioBlob, fileName) => {

    try {
      // Create FormData
      const formData = new FormData();
      const audioFile = new File([audioBlob], fileName, {
        type: audioBlob.type || 'audio/webm',
        lastModified: Date.now()
      });


      formData.append('files', audioFile);

      const response = await fetch(`${process.env.NEXT_PUBLIC_API}user/aws-superai-media`, {
        method: 'POST',
        body: formData,
      });



      if (!response.ok) {
        const errorText = await response.text();
        console.error('6. ❌ Response not ok:', errorText);
        throw new Error(`Upload failed: ${response.status} ${response.statusText}`);
      }

      const result = await response.json();

      if (result.responseCode !== 200) {
        console.error('7. ❌ Response code not 200:', result);
        throw new Error(`Upload failed: ${result.message || 'Unknown error'}`);
      }

      if (!result.result || !result.result.mediaUrl) {
        console.error('8. ❌ Missing mediaUrl:', result);
        throw new Error('Invalid response: missing mediaUrl');
      }

      return result.result.mediaUrl;

    } catch (error) {
      console.error('❌ S3 Upload failed:', {
        message: error.message,
        stack: error.stack,
        name: error.name
      });
      throw error;
    }
  };

  const uploadFilesToS3 = async (files) => {
    try {
      const uploadPromises = files.map(async (fileObj) => {
        const formData = new FormData();
        formData.append('files', fileObj.file);

        const response = await makeApiRequest(
          'post',
          `${process.env.NEXT_PUBLIC_API}user/aws-superai-media`,
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          }
        );

        if (!(response.data.responseCode == 200)) {
          throw new Error(`Upload failed for ${fileObj.name}`);
        }

        return {
          name: fileObj.name,
          type: fileObj.type,
          size: fileObj.size,
          url: response.data.result.mediaUrl,
          originalFileId: fileObj.id
        };
      });

      const uploadedFiles = await Promise.all(uploadPromises);
      return uploadedFiles;
    } catch (error) {
      throw new Error(`File upload failed: ${error.message}`);
    }
  };

  const startRecording = async () => {
    try {
      if (!userId) {
        alert('User ID is required for audio recording');
        return;
      }

      if (!socket || !connected) {
        alert('Not connected to server. Please try again.');
        return;
      }

      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;
      audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
      analyserRef.current = audioContextRef.current.createAnalyser();
      const source = audioContextRef.current.createMediaStreamSource(stream);
      source.connect(analyserRef.current);
      analyserRef.current.fftSize = 256;

      mediaRecorderRef.current = new MediaRecorder(stream, {
        mimeType: MediaRecorder.isTypeSupported('audio/webm;codecs=opus')
          ? 'audio/webm;codecs=opus'
          : 'audio/webm'
      });

      chunksRef.current = [];

      mediaRecorderRef.current.ondataavailable = e => {
        if (e.data.size > 0) {
          chunksRef.current.push(e.data);
        }
      };

      mediaRecorderRef.current.onstop = async () => {
        setRecording(false);
        setIsTranscribing(true);

        try {
          const blob = new Blob(chunksRef.current, { type: 'audio/webm;codecs=opus' });


          if (blob.size === 0) {
            throw new Error('Empty audio recording');
          }

          if (blob.size > 25 * 1024 * 1024) { // 25MB limit
            throw new Error('Audio recording too long. Please record a shorter message.');
          }

          // Store recorded audio for later use
          const audioUrl = URL.createObjectURL(blob);
          const fileName = `audio_${Date.now()}.webm`;


          setRecordedAudio({
            blob,
            url: audioUrl,
            fileName,
            size: blob.size
          });

          // Send for transcription only
          const reader = new FileReader();
          reader.onloadend = () => {
            const base64 = reader.result;

            // Send only for transcription, not as a message
            socket.emit('transcribe_audio', {
              audioBase64: base64,
              userId: userId,
              chatId: activeChat
            });
          };

          reader.onerror = (error) => {
            console.error('FileReader error:', error);
            setIsTranscribing(false);
            alert('Failed to read audio data');
          };

          reader.readAsDataURL(blob);

        } catch (error) {
          console.error('Error processing recording:', error);
          setIsTranscribing(false);
          alert(`Error processing recording: ${error.message}`);
        }

        if (audioContextRef.current && audioContextRef.current.state !== 'closed') {
          try {
            await audioContextRef.current.close();
          } catch (closeError) {
            console.error('Error closing audio context:', closeError);
          }
        }
      };

      mediaRecorderRef.current.onerror = (event) => {
        console.error('MediaRecorder error:', event.error);
        setRecording(false);
        setIsTranscribing(false);
        alert(`Recording error: ${event.error?.message || 'Unknown error'}`);
      };

      mediaRecorderRef.current.start(100);
      setRecording(true);

    } catch (err) {
      console.error('Failed to start recording:', err);
      setRecording(false);
      setIsTranscribing(false);
      alert(`Failed to start recording: ${err.message}`);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
      mediaRecorderRef.current.stop();
    }
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
    }
  };

  const micButtonStyle = {
    transform: recording ? `scale(${1 + audioLevel * 0.3})` : 'scale(1)',
    transition: recording ? 'none' : 'transform 0.2s ease',
  };

  const suggestionChips = [
    "2 bhk apartments in Noida",
    "Plots in Sector 22, Noida",
    "Resale value in Noida",
    "Properties for sale in Delhi",
    "Real estate investment ideas"
  ];

  const handleChipClick = (chipText) => {
    setInputMessage(chipText);
  };

  if (!activeChat && messages.length == 0) {
    return (
      <div className='flex flex-col justify-center align-middle h-screen pb-5 relative'>
        <div className='flex flex-col justify-center items-center w-full'>
          <div>
            <Image src={superAreaLogo} className='m-auto h-16' />
            <div className='text-4xl text-primary font-bold mt-2'>
              {text.heading}
            </div>
          </div>
          <div className='mt-4'>
            {text.subHeading}
          </div>
        </div>

        {!isMobile && <div className='flex justify-center mt-2'>
          <div className="w-[700px] p-4">
            {selectedFiles.length > 0 && (
              <div className="mb-4 p-3 bg-gray-50 rounded-lg border">
                <div className="text-sm text-gray-600 mb-2">Selected Files:</div>
                <div className="space-y-2">
                  {selectedFiles.map((fileObj) => (
                    <div key={fileObj.id} className="flex items-center justify-between bg-white p-2 rounded border">
                      <div className="flex items-center space-x-2">
                        {getFileIcon(fileObj.type)}
                        <span className="text-sm font-medium">{fileObj.name}</span>
                        <span className="text-xs text-gray-500">({formatFileSize(fileObj.size)})</span>
                      </div>
                      <button
                        onClick={() => removeFile(fileObj.id)}
                        className="text-[#931602] hover:text-primary"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {renderRecordedAudio()}

            <div className="relative">
              <textarea
                placeholder="Ask anything you need to know about Real Estate..."
                ref={inputRef}
                value={inputMessage}
                onChange={(e) => {
                  setInputMessage(e.target.value);
                  adjustInputareaHeight(); // Call this on every change
                }}
                onKeyPress={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSendMessage(e);
                  }
                }}
                disabled={!connected || isFileUploading || isTranscribing}
                className="w-full px-4 py-4 pr-[32%] border border-[#d1d5db] rounded-[20px] outline-none text-base focus:border-primary focus:ring-2 focus:ring-secondary disabled:bg-[#e9ecef]  resize-none overflow-y-auto"
                rows={1}
                style={{ minHeight: '60px' }}
              />
              <div className="absolute right-2 top-[45%] transform -translate-y-1/2 flex items-center space-x-2">
                <input
                  ref={fileInputRef}
                  type="file"
                  multiple
                  accept=".pdf,.jpg,.jpeg,.png,.gif,.webp,.txt,.doc,.docx"
                  onChange={handleFileSelect}
                  className="hidden"
                />
                <button
                  type="button"
                  onClick={() => setSuperSearch(!superSearch)}
                  disabled={!connected}
                  className={`p-2  rounded-full disabled:opacity-50 ${superSearch ? 'bg-primary text-white' : 'text-primary'}`}
                >
                  <div className='flex items-center gap-2'>
                    {<Globe />}
                     <p className={`${superSearch ? 'bg-primary text-white ' : 'text-primary'}`}>{text.superSearch}</p>
                  </div>
                </button>
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={!connected || isFileUploading || isTranscribing}
                  className="p-2 text-primary hover:bg-gray-100 rounded-full disabled:opacity-50"
                >
                  {isFileUploading ? <Loader2 className="animate-spin" /> : <Paperclip />}
                </button>

                <button
                  type="button"
                  onClick={recording ? stopRecording : startRecording}
                  disabled={isTranscribing || !connected || isFileUploading}
                  className={`ml-2 w-10 h-10 rounded-full flex items-center  justify-center transition-all ${recording ? 'bg-primary text-white' : 'bg-white text-primary'} disabled:opacity-50 disabled:cursor-not-allowed`}
                  style={micButtonStyle}
                >
                  {isTranscribing ? <Loader2 className="animate-spin" /> : recording ? <Square /> : <Mic />}
                </button>
                <button
                  onClick={handleSendMessage}
                  disabled={!connected || (!inputMessage.trim() && selectedFiles.length === 0 && !recordedAudio) || isFileUploading || isTranscribing}
                  className="p-2 text-primary rounded-full disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isFileUploading ? <Loader2 className="animate-spin" /> : <Send />}
                </button>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 mt-4 justify-center">
              {suggestionChips.map((chip, index) => (
                <button
                  key={index}
                  onClick={() => handleChipClick(chip)}
                  className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-gray-200 transition-colors"
                >
                  {chip}
                </button>
              ))}
            </div>
          </div>
        </div>}
        {isMobile &&
          // Mobile view JSX
          <div className='flex justify-center mt-2'>
            <div className="w-full px-3 p-4">
              {selectedFiles.length > 0 && (
                <div className="mb-4 p-3 bg-gray-50 rounded-lg border">
                  <div className="text-sm text-gray-600 mb-2">Selected Files:</div>
                  <div className="space-y-2">
                    {selectedFiles.map((fileObj) => (
                      <div key={fileObj.id} className="flex items-center justify-between bg-white p-2 rounded border space-y-2">
                        <div className="flex items-center space-x-2 w-full justify-center">
                          {getFileIcon(fileObj.type)}
                          <span className="text-xs font-medium">{fileObj.name}</span>
                          <span className="text-xs text-gray-500">({formatFileSize(fileObj.size)})</span>
                        </div>
                        <button
                          onClick={() => removeFile(fileObj.id)}
                          className="text-[#931602] hover:text-primary"
                        >
                          <X size={14} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {renderRecordedAudio()}

              <div className="relative">
                <textarea
                  placeholder="Ask about Real Estate..."
                  ref={inputRef}
                  value={inputMessage}
                  onChange={(e) => {
                    setInputMessage(e.target.value);
                    adjustInputareaHeight();
                  }}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleSendMessage(e);
                    }
                  }}
                  disabled={!connected || isFileUploading || isTranscribing}
                  className="w-full px-4 py-4 pr-[120px] border border-[#d1d5db] rounded-[20px] outline-none text-sm focus:border-primary focus:ring-2 focus:ring-secondary disabled:bg-[#e9ecef] resize-none overflow-y-auto"
                  rows={1}
                  style={{ minHeight: '50px' }}
                />

                <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center space-x-1">
                  {/* Options Button */}
                  <button
                    type="button"
                    onClick={() => setShowMobileOptions(!showMobileOptions)}
                    disabled={!connected}
                    className="p-1.5 text-[#931602] hover:bg-gray-100 rounded-full disabled:opacity-50"
                  >
                    <EllipsisVertical size={20} />
                  </button>
                  {showMobileOptions && (
                    <div className=" bg-white border border-gray-200 w-[130px] z-10 bottom-[50px] right-0 rounded-xl   absolute shadow-lg">
                      <div className="flex flex-col ">
                     

                        <button
                          type="button"
                          onClick={() => {
                            setSuperSearch(!superSearch);
                            setShowMobileOptions(false);
                          }}
                          disabled={!connected}
                          className={`flex  items-center p-3 gap-2 rounded-lg disabled:opacity-50  ${superSearch ? 'bg-primary text-white ' : 'text-primary hover:bg-gray-50'
                            }`}
                        >
                          <Globe size={20} />
                          {/* <span className="text-xs mt-1">{text.superSearch}</span> */}
                           <p className={`${superSearch ? 'bg-primary text-white ' : 'text-primary'}`} style={{fontSize: '0.8rem'}}>{text.superSearch}</p>
                           
                        </button>

                        <button
                          type="button"
                          onClick={() => {
                            fileInputRef.current?.click();
                            setShowMobileOptions(false);
                          }}
                          disabled={!connected || isFileUploading || isTranscribing}
                          className="flex items-center p-3 gap-2 text-[#931602] hover:bg-gray-50 rounded-lg disabled:opacity-50"
                        >
                          {isFileUploading ?
                            <Loader2 className="animate-spin" size={20} /> :
                            <Paperclip size={20} />
                          }
                          <span className="text-xs mt-1">{text.attachFile}</span>
                        </button>
                      </div>
                    </div>
                  )}
                     <input
                          ref={fileInputRef}
                          type="file"
                          multiple
                          accept=".pdf,.jpg,.jpeg,.png,.gif,.webp,.txt,.doc,.docx"
                          onChange={(e) => {
                            handleFileSelect(e);
                          }}
                          className="hidden"
                  />


                  <button
                    type="button"
                    onClick={recording ? stopRecording : startRecording}
                    disabled={isTranscribing || !connected || isFileUploading}
                    className={`rounded-full flex items-center justify-center transition-all w-8 h-8 ml-1 ${recording ? 'bg-[#931602] text-white' : 'bg-white text-[#931602]'
                      } disabled:opacity-50 disabled:cursor-not-allowed`}
                    style={micButtonStyle}
                  >
                    {isTranscribing ?
                      <Loader2 className="animate-spin" size={14} /> :
                      recording ?
                        <Square size={20} /> :
                        <Mic size={20} />
                    }
                  </button>

                  <button
                    onClick={handleSendMessage}
                    disabled={!connected || (!inputMessage.trim() && selectedFiles.length === 0 && !recordedAudio) || isFileUploading || isTranscribing}
                    className="p-1.5 text-[#931602] rounded-full disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isFileUploading ?
                      <Loader2 className="animate-spin" size={20} /> :
                      <Send size={20} />
                    }
                  </button>
                </div>
              </div>

              <div className="flex flex-wrap gap-1.5 mt-3 justify-center">
                {suggestionChips.map((chip, index) => (
                  <button
                    key={index}
                    onClick={() => handleChipClick(chip)}
                    className="px-3 py-1.5 bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 transition-colors"
                  >
                    {chip}
                  </button>
                ))}
              </div>
            </div>
          </div>

        }
      </div>
    );
  }

  return (
    <div className='mb-4 mx-4 w-[85%] max-md:w-full max-md:mx-0'>
      {selectedFiles.length > 0 && (
        <div className="mb-3 p-2 bg-gray-50 rounded-lg border">
          <div className="text-xs text-gray-600 mb-2">Selected Files:</div>
          <div className="flex flex-wrap gap-2">
            {selectedFiles.map((fileObj) => (
              <div key={fileObj.id} className="flex items-center bg-white p-1 rounded border text-xs">
                {getFileIcon(fileObj.type)}
                <span className="mx-1 font-medium">{fileObj.name}</span>
                <span className="text-xs text-gray-500 mr-1">({formatFileSize(fileObj.size)})</span>
                <button
                  type="button"
                  onClick={() => removeFile(fileObj.id)}
                  className="text-red-500 hover:text-primary"
                >
                  <X size={12} />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {renderRecordedAudio()}

      <div className='relative flex flex-col max-md:mb-8'>
        <div className='border  border-[#d1d5db] rounded-xl focus-within:border-primary text-base  disabled:bg-[#e9ecef] pb-[40px] max-md:pb-[30px] shadow-lg'>
          <textarea type="text"
            placeholder={
              isMobile
                ? "Ask about Real Estate..."
                : "Ask anything you need to know about Real Estate..."
            }
            ref={inputRefMain}
            value={inputMessage}
            onChange={(e) => {
              setInputMessage(e.target.value);
              adjustInputareaHeightMain(); // Call this on every change
            }}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                handleSendMessage(e);

              }
            }}
            disabled={!connected || isFileUploading || isTranscribing}
            rows={1}
            style={{ minHeight: '50px' }}
            className="w-full px-4 pb-2 pt-2 pr-32 max-md:pr-0 outline-none rounded-xl resize-none" />
        </div>

        <div className=" -bottom-4 w-full pr-6  justify-between  left-3 absolute transform -translate-y-1/2 flex items-center space-x-1">
          <div className='flex gap-2'>
            <input
              ref={fileInputRef}
              type="file"
              multiple
              accept=".pdf,.jpg,.jpeg,.png,.gif,.webp,.txt,.doc,.docx"
              onChange={handleFileSelect}
              className="hidden"
            />
            <button type="button"
              onClick={() => fileInputRef.current?.click()}
              disabled={!connected || isFileUploading || isTranscribing}
              className="p-2 text-[#931602] hover:bg-gray-100 rounded-full disabled:opacity-50">
              <Paperclip />
            </button>
            <button
              type="button"
              onClick={() => setSuperSearch(!superSearch)}
              disabled={!connected}
              className={`p-2  flex items-center gap-2 rounded-full disabled:opacity-50 ${superSearch ? 'bg-primary text-white ' : 'text-primary'}`}
            >
              {<Globe />}
              <p className={`${superSearch ? 'bg-primary text-white max-md:hidden' : 'text-primary max-md:hidden'}`}>{text.superSearch}</p>
            </button>
          </div>
          <div className='flex'>
            <button
              type="button"
              onClick={recording ? stopRecording : startRecording}
              disabled={isTranscribing || !connected || isFileUploading}
              className={`ml-2 w-12 h-12 rounded-full flex items-center justify-center transition-all ${recording ? 'bg-[#931602] text-white' : 'bg-white text-[#931602]'} disabled:opacity-50 disabled:cursor-not-allowed`}
              style={micButtonStyle}
            >
              {isTranscribing ? <Loader2 className="animate-spin" /> : recording ? <Square /> : <Mic />}
            </button>
            <button
              onClick={handleSendMessage}
              disabled={!connected || (!inputMessage.trim() && selectedFiles.length === 0 && !recordedAudio) || isFileUploading || isTranscribing || isBotTypingMap[activeChat]}
              className="p-2 text-[#931602] hover:bg-gray-100 rounded-full disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send className='rotate-45 mr-1' />
            </button>
          </div>
        </div>
      </div>
      <ConfirmLoginModal
        // open={true}
        open={showLoginModal}
        message="That's all for now. Log in to continue exploring more with our assistant."
        onCancel={() => setShowLoginModal(false)}
      />
    </div>
  );
}

export default MessageForm;