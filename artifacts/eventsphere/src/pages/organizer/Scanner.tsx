import React, { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, XCircle } from 'lucide-react';
import jsQR from 'jsqr';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/firebase/config';
import { COLLECTIONS } from '@/constants/collections';
import { safeText } from '@/utils/renderUtils';

type ScanResult =
  | { raw: string; status: 'checking'; info: null }
  | { raw: string; status: 'invalid'; info: null }
  | { raw: string; status: 'used'; info: any }
  | { raw: string; status: 'valid'; info: any };

export default function OrganizerScanner() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [scanning, setScanning] = useState(false);
  const [lastResult, setLastResult] = useState<ScanResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let raf = 0;
    let stream: MediaStream | null = null;

    async function startCamera() {
      setError(null);
      try {
        stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          await videoRef.current.play();
          setScanning(true);
          tick();
        }
      } catch (e: any) {
        setError('Camera access denied or not available');
      }
    }

    function stopCamera() {
      setScanning(false);
      if (stream) {
        stream.getTracks().forEach((t) => t.stop());
        stream = null;
      }
      cancelAnimationFrame(raf);
    }

    function tick() {
      if (!videoRef.current || !canvasRef.current) {
        raf = requestAnimationFrame(tick);
        return;
      }
      const video = videoRef.current;
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      if (!ctx) {
        raf = requestAnimationFrame(tick);
        return;
      }
      if (video.videoWidth === 0 || video.videoHeight === 0) {
        raf = requestAnimationFrame(tick);
        return;
      }
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      try {
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const code = jsQR(imageData.data, imageData.width, imageData.height);
        if (code) {
          handleCode(code.data);
        }
      } catch (e) {
        // ignore read errors
      }
      raf = requestAnimationFrame(tick);
    }

    startCamera();
    return () => {
      stopCamera();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function handleCode(data: string) {
    if (lastResult && lastResult.raw === data) return;
    setLastResult({ raw: data, status: 'checking', info: null });
    try {
      // Accept both raw IDs and prefixed format: EVENTSPHERE:<ticketId>
      let ticketId = data;
      if (typeof ticketId === 'string' && ticketId.startsWith('EVENTSPHERE:')) {
        ticketId = ticketId.replace(/^EVENTSPHERE:/, '');
      } else {
        // avoid accepting objects/stringified objects as the identifier — only accept simple strings
        try {
          const parsed = JSON.parse(data);
          if (parsed && typeof parsed === 'object' && typeof parsed.ticketId === 'string') {
            ticketId = parsed.ticketId;
          }
        } catch {}
      }

      const d = await getDoc(doc(db, COLLECTIONS.TICKETS, ticketId));
      if (!d.exists()) {
        setLastResult({ raw: data, status: 'invalid', info: null });
        return;
      }
      const ticket = d.data();
      if (ticket?.used) {
        setLastResult({ raw: data, status: 'used', info: ticket });
        return;
      }
      setLastResult({ raw: data, status: 'valid', info: ticket });
    } catch (e) {
      setLastResult({ raw: data, status: 'invalid', info: null });
    }
  }

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-4xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>Organizer — Ticket Scanner</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <video ref={videoRef} className="w-full rounded-lg bg-black" muted playsInline />
                <canvas ref={canvasRef} className="hidden" />
                {error && <p className="text-sm text-red-400">{error}</p>}
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">Scan result</h3>
                {!lastResult && <p className="text-sm text-muted-foreground">No ticket scanned yet. Point camera at QR code.</p>}
                {lastResult && lastResult.status === 'checking' && <p>Checking…</p>}
                {lastResult && lastResult.status === 'invalid' && (
                  <div className="flex items-center gap-2 text-red-500"><XCircle /> Invalid ticket</div>
                )}
                {lastResult && lastResult.status === 'used' && (
                  <div>
                    <div className="flex items-center gap-2 text-yellow-500"><XCircle /> Ticket already used</div>
                    <div className="mt-4">
                      <p><strong>Ticket ID:</strong> {safeText((lastResult.info as any)?.ticketId)}</p>
                      <p><strong>Attendee:</strong> {safeText((lastResult.info as any)?.attendeeName)}</p>
                    </div>
                  </div>
                )}
                {lastResult && lastResult.status === 'valid' && (
                  <div>
                    <div className="flex items-center gap-2 text-green-500"><CheckCircle /> Valid ticket</div>
                    <div className="mt-4">
                      <p><strong>Ticket ID:</strong> {safeText((lastResult.info as any)?.ticketId)}</p>
                      <p><strong>Attendee:</strong> {safeText((lastResult.info as any)?.attendeeName)}</p>
                      <p><strong>Event:</strong> {safeText((lastResult.info as any)?.eventTitle)}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
