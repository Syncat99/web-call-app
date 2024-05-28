import { useState } from "react";

export function useUserMedia() {
  const [stream, setMediaStream] = useState<MediaStream | null>(null);
  async function enableStream() {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
      setMediaStream(stream);
    } catch (err) {
      console.error(err);
    }

    // if (!stream) {
    // } else {
    //   return function cleanup() {
    //     stream.getTracks().forEach((track) => {
    //       track.stop();
    //     });
    //   };
    // }
  }

  return { stream, enableStream };
}
