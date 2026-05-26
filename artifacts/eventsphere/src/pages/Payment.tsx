import { useLocation } from "wouter";
import { CreditCard, Smartphone, CheckCircle2, ChevronRight, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

export default function Payment() {
  const [, setLocation] = useLocation();

  // Mock data for display
  const orderDetails = {
    eventName: "Global Tech Summit 2024",
    date: "March 15, 2024",
    venue: "Grand Convention Center, Mumbai",
    ticketType: "Regular Entry",
    qty: 1,
    unitPrice: 999,
    totalAmount: 999,
  };

  const handlePayment = () => {
    // Simulate payment processing
    setLocation("/ticket-success");
  };

  return (
    <div className="min-h-screen bg-background py-12 px-4">
      <div className="container max-w-4xl">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold mb-2">Secure Checkout</h1>
          <p className="text-muted-foreground">Complete your payment to receive your ticket</p>
        </div>

        <div className="grid md:grid-cols-5 gap-8">
          <div className="md:col-span-3 space-y-6">
            <Card className="border-white/10 bg-white/5 backdrop-blur-xl">
              <CardHeader>
                <CardTitle>Payment Method</CardTitle>
                <CardDescription>Choose how you'd like to pay</CardDescription>
              </CardHeader>
              <CardContent>
                <RadioGroup defaultValue="upi" className="grid gap-4">
                  <div>
                    <RadioGroupItem value="upi" id="upi" className="peer sr-only" />
                    <Label
                      htmlFor="upi"
                      className="flex items-center justify-between p-4 rounded-xl border border-white/10 bg-white/5 peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/5 cursor-pointer hover:bg-white/10 transition-all"
                    >
                      <div className="flex items-center gap-3">
                        <Smartphone className="w-5 h-5 text-primary" />
                        <div>
                          <p className="font-medium">UPI (Google Pay, PhonePe, Paytm)</p>
                          <p className="text-xs text-muted-foreground">Pay using any UPI app</p>
                        </div>
                      </div>
                      <ChevronRight className="w-4 h-4 text-muted-foreground" />
                    </Label>
                  </div>

                  <div>
                    <RadioGroupItem value="card" id="card" className="peer sr-only" />
                    <Label
                      htmlFor="card"
                      className="flex items-center justify-between p-4 rounded-xl border border-white/10 bg-white/5 peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/5 cursor-pointer hover:bg-white/10 transition-all"
                    >
                      <div className="flex items-center gap-3">
                        <CreditCard className="w-5 h-5 text-primary" />
                        <div>
                          <p className="font-medium">Credit / Debit Card</p>
                          <p className="text-xs text-muted-foreground">Visa, Mastercard, Amex</p>
                        </div>
                      </div>
                      <ChevronRight className="w-4 h-4 text-muted-foreground" />
                    </Label>
                  </div>
                </RadioGroup>
              </CardContent>
            </Card>

            <Card className="border-white/10 bg-white/5 backdrop-blur-xl overflow-hidden">
              <CardContent className="p-0">
                <div className="p-6 bg-primary/5 border-b border-white/10">
                  <div className="flex items-center gap-2 text-primary font-medium mb-1">
                    <Lock className="w-4 h-4" />
                    Safe & Secure
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Your payment information is encrypted and processed securely.
                  </p>
                </div>
                <div className="p-6">
                  <Button 
                    onClick={handlePayment}
                    className="w-full h-14 text-xl font-bold bg-primary hover:bg-primary/90 shadow-lg shadow-primary/25"
                  >
                    Pay ₹{orderDetails.totalAmount}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="md:col-span-2">
            <Card className="border-white/10 bg-white/5 backdrop-blur-xl sticky top-8">
              <CardHeader className="border-b border-white/10">
                <CardTitle className="text-xl">Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="pt-6 space-y-6">
                <div>
                  <h3 className="font-bold text-lg mb-1">{orderDetails.eventName}</h3>
                  <p className="text-sm text-muted-foreground">{orderDetails.date}</p>
                  <p className="text-sm text-muted-foreground">{orderDetails.venue}</p>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">{orderDetails.ticketType} x {orderDetails.qty}</span>
                    <span className="text-foreground">₹{orderDetails.unitPrice * orderDetails.qty}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Platform Fee</span>
                    <span className="text-primary font-medium">FREE</span>
                  </div>
                  <div className="pt-4 border-t border-white/10 flex justify-between items-center">
                    <span className="text-lg font-bold">Total Amount</span>
                    <span className="text-2xl font-bold text-primary">₹{orderDetails.totalAmount}</span>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground bg-white/5 p-3 rounded-lg">
                    <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0" />
                    Instant ticket delivery after payment
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
