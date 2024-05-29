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
  }

  return { stream, enableStream };
}
