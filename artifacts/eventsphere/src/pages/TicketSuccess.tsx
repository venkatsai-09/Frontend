import { useLocation } from "wouter";
import { useEffect, useState } from "react";
import { Check, Download, Home, Calendar, MapPin, User, Ticket as TicketIcon } from "lucide-react";
import { safeText } from '@/utils/renderUtils';
import QRCode from 'react-qr-code';
import html2canvas from 'html2canvas';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function TicketSuccess() {
  const [, setLocation] = useLocation();

  // Try to load latest ticket from Firestore tickets collection, fallback to placeholders
  const [ticketData, setTicketData] = useState<any>({
    eventName: '',
    attendeeName: '',
    date: '',
    venue: '',
    ticketId: '',
    type: '',
    quantity: 1,
    unitPrice: 0,
    totalPrice: 0,
  });

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const { collection, query, orderBy, getDocs } = await import('firebase/firestore');
        const { db } = await import('@/firebase/config');
        const { COLLECTIONS } = await import('@/constants/collections');

        const q = query(collection(db, COLLECTIONS.TICKETS), orderBy('createdAt', 'desc'));
        const snap = await getDocs(q);
        const doc = snap.docs[0];
        if (doc && mounted) setTicketData({ ...(doc.data() as any), id: doc.id });
      } catch (e) {
        // ignore - use placeholders
      }
    })();
    return () => { mounted = false; };
  }, []);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4 py-12">
      <div className="max-w-2xl w-full text-center">
        {/* Animated Success Checkmark */}
        <div className="mb-8 relative inline-block">
          <div className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center shadow-[0_0_40px_rgba(34,197,94,0.3)] animate-in zoom-in duration-500">
            <Check className="w-12 h-12 text-white stroke-[3px]" />
          </div>
          <div className="absolute -inset-4 border-2 border-green-500/20 rounded-full animate-ping duration-1000" />
        </div>

        <h1 className="text-4xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60">
          Registration Successful!
        </h1>
        <p className="text-muted-foreground mb-12 text-lg">
          Your ticket has been sent to your email. You can also download it here.
        </p>

        {/* Ticket Card */}
        <Card className="mb-12 border-white/10 bg-white/5 backdrop-blur-2xl overflow-hidden text-left relative group">
          <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-primary to-blue-600" />
          
          <CardContent className="p-0">
            <div className="p-8 grid md:grid-cols-3 gap-8 items-center">
              <div className="md:col-span-2 space-y-6">
                <div>
                  <div className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-xs font-medium text-primary mb-3">
                    {safeText(ticketData?.type, '')}
                  </div>
                  <h2 className="text-2xl font-bold mb-1">{safeText(ticketData?.eventName, '')}</h2>
                  <p className="text-muted-foreground flex items-center gap-2">
                    <Calendar className="w-4 h-4" /> {safeText(ticketData?.date, '')}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-6 pt-4 border-t border-white/5">
                  <div className="space-y-1">
                    <span className="text-xs uppercase tracking-wider text-muted-foreground">Attendee</span>
                    <p className="font-medium flex items-center gap-2">
                      <User className="w-4 h-4 text-primary" /> {safeText(ticketData?.attendeeName, '')}
                    </p>
                  </div>
                  <div className="space-y-1">
                    <span className="text-xs uppercase tracking-wider text-muted-foreground">Ticket ID</span>
                    <p className="font-medium flex items-center gap-2 text-primary">
                      <TicketIcon className="w-4 h-4" /> {safeText(ticketData?.ticketId, '')}
                    </p>
                  </div>
                </div>

                <div className="space-y-1">
                  <span className="text-xs uppercase tracking-wider text-muted-foreground">Venue</span>
                  <p className="font-medium flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-primary" /> {safeText(ticketData?.venue, '')}
                  </p>
                </div>
              </div>

              {/* QR Code Placeholder */}
              <div className="flex flex-col items-center justify-center p-6 bg-white rounded-2xl group-hover:scale-105 transition-transform duration-500">
                <div className="w-32 h-32 relative bg-white flex items-center justify-center">
                  {/* Render a real, scannable QR code. Value is a safe string EVENTSPHERE:<id> */}
                  {(() => {
                    const id = ticketData?.id || ticketData?.ticketId || '';
                    const qrValue = id ? `EVENTSPHERE:${id}` : '';
                    return qrValue ? (
                      <div style={{ width: 128, height: 128 }} aria-hidden>
                        <QRCode value={qrValue} size={128} />
                      </div>
                    ) : (
                      <div className="text-xs text-muted-foreground">No QR available</div>
                    );
                  })()}
                </div>
                <p className="mt-4 text-[10px] text-black font-bold tracking-widest uppercase">Scan at Entrance</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button className="h-12 px-8 font-semibold bg-white text-black hover:bg-white/90 gap-2" onClick={async () => {
            // Click handler: render the ticket card and download as PNG
            try {
              const el = document.querySelector('.max-w-2xl > .mb-12') as HTMLElement | null;
              if (!el) return;
              const canvas = await html2canvas(el, { backgroundColor: null });
              const dataUrl = canvas.toDataURL('image/png');
              const a = document.createElement('a');
              a.href = dataUrl;
              a.download = `${safeText(ticketData?.ticketId, 'ticket')}.png`;
              document.body.appendChild(a);
              a.click();
              a.remove();
            } catch (e) {
              console.error('Download failed', e);
            }
          }}>
            <Download className="w-5 h-5" />
            Download Ticket (PNG)
          </Button>
          <Button 
            variant="outline" 
            className="h-12 px-8 font-semibold border-white/10 bg-white/5 hover:bg-white/10 gap-2"
            onClick={() => setLocation("/attendee")}
          >
            <Home className="w-5 h-5" />
            Back to Home
          </Button>
        </div>
      </div>
    </div>
  );
}
