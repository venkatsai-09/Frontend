import { useState } from "react";
import { Camera, QrCode, CheckCircle2, User, Ticket } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { OrganizerLayout } from "@/components/layout/OrganizerLayout";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription,
  DialogFooter
} from "@/components/ui/dialog";

export default function Scanner() {
  const [isScanning, setIsScanning] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleScan = () => {
    setIsScanning(true);
    // Simulate a successful scan after 2 seconds
    setTimeout(() => {
      setIsScanning(false);
      setShowSuccess(true);
    }, 2000);
  };

  return (
    <OrganizerLayout title="Ticket Scanner">
      <div className="max-w-2xl mx-auto">
        <Card className="glass-panel border-white/10 overflow-hidden">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Scan QR Code</CardTitle>
            <CardDescription>Point your camera at the attendee's ticket QR code</CardDescription>
          </CardHeader>
          <CardContent className="space-y-8">
            {/* Camera Placeholder */}
            <div className="relative aspect-square max-w-sm mx-auto rounded-3xl overflow-hidden border-2 border-dashed border-primary/30 bg-white/5 flex items-center justify-center group">
              {isScanning ? (
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <div className="w-full h-1 bg-primary absolute top-0 animate-[scan_2s_linear_infinite]" />
                  <Camera className="w-16 h-16 text-primary/40 animate-pulse" />
                  <p className="mt-4 text-sm font-medium text-primary animate-pulse">Scanning...</p>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center text-muted-foreground">
                  <Camera className="w-20 h-20 mb-4 group-hover:text-primary transition-colors" />
                  <p className="text-sm">Camera preview will appear here</p>
                </div>
              )}
              
              {/* Corner markers */}
              <div className="absolute top-8 left-8 w-12 h-12 border-t-4 border-l-4 border-primary rounded-tl-xl" />
              <div className="absolute top-8 right-8 w-12 h-12 border-t-4 border-r-4 border-primary rounded-tr-xl" />
              <div className="absolute bottom-8 left-8 w-12 h-12 border-b-4 border-l-4 border-primary rounded-bl-xl" />
              <div className="absolute bottom-8 right-8 w-12 h-12 border-b-4 border-r-4 border-primary rounded-br-xl" />
            </div>

            <div className="flex flex-col gap-4">
              <Button 
                onClick={handleScan}
                disabled={isScanning}
                className="w-full h-14 text-lg font-bold bg-primary hover:bg-primary/90 shadow-lg shadow-primary/25 gap-2"
              >
                {isScanning ? (
                  <>Processing...</>
                ) : (
                  <>
                    <QrCode className="w-6 h-6" />
                    Start Camera & Scan
                  </>
                )}
              </Button>
              <p className="text-center text-xs text-muted-foreground">
                Supported formats: QR Code, Barcode, DataMatrix
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Success Popup */}
        <Dialog open={showSuccess} onOpenChange={setShowSuccess}>
          <DialogContent className="glass-panel border-white/10 text-foreground sm:max-w-md">
            <DialogHeader>
              <div className="mx-auto w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mb-4">
                <CheckCircle2 className="w-10 h-10 text-green-500" />
              </div>
              <DialogTitle className="text-2xl text-center">Ticket Validated!</DialogTitle>
              <DialogDescription className="text-center">
                Attendee has been successfully checked in.
              </DialogDescription>
            </DialogHeader>
            
            <div className="p-4 rounded-2xl bg-white/5 space-y-4 my-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                  <User className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground font-medium">Attendee Name</p>
                  <p className="font-bold">Rahul Mehta</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center">
                  <Ticket className="w-6 h-6 text-blue-500" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground font-medium">Ticket Type</p>
                  <p className="font-bold">VIP Early Access</p>
                </div>
              </div>
            </div>

            <DialogFooter>
              <Button 
                onClick={() => setShowSuccess(false)}
                className="w-full bg-primary"
              >
                Done
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </OrganizerLayout>
  );
}
