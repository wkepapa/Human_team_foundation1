import React, { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { CreditCard, Heart } from "lucide-react";

interface DonationCardProps {
  serviceName: string;
}

export const DonationCard: React.FC<DonationCardProps> = ({ serviceName }) => {
  const { toast } = useToast();
  const [selectedMethod, setSelectedMethod] = useState("Card");
  const [amount, setAmount] = useState(50);
  const [customAmount, setCustomAmount] = useState<number | string>("");
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    cardNumber: "",
    expiryDate: "",
    cvc: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Simulated fundraising goal and progress
  const goalAmount = 10000;
  const raisedAmount = 7250;
  const progressPercentage = (raisedAmount / goalAmount) * 100;

  const predefinedAmounts = [25, 50, 100, 250];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAmountSelect = (amt: number) => {
    setAmount(amt);
    setCustomAmount("");
  };

  const handleCustomAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setCustomAmount(value);
    if (value) {
      setAmount(Number(value));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    setTimeout(() => {
      toast({
        title: "Donation Successful! 🎉",
        description: `Thank you for your generous donation of ₹${amount}!`,
      });
      setIsSubmitting(false);
      
      // Reset form
      setFormData({
        fullName: "",
        email: "",
        cardNumber: "",
        expiryDate: "",
        cvc: "",
      });
    }, 1500);
  };

  return (
    <Card className="w-full max-w-md mx-auto overflow-hidden border-0 shadow-lg">
      <div className="bg-gradient-to-r from-donation-highlight to-donation-primary p-6 text-white">
        <h2 className="text-2xl font-bold text-center">{`Support ${serviceName}`}</h2>
        <p className="text-center text-white/80 mt-1">Your generosity changes lives</p>
      </div>
      
      <div className="bg-donation-accent p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium">₹{raisedAmount} raised</span>
          <span className="text-sm font-medium">Goal: ₹{goalAmount}</span>
        </div>
        <Progress value={progressPercentage} className="h-2" />
        <div className="mt-2 flex items-center text-sm text-gray-600">
          <Heart size={16} className="mr-1 text-red-500" />
          <span>{Math.round(raisedAmount/50)} people have donated</span>
        </div>
      </div>

      <CardContent className="p-6">
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">Select Amount</label>
          <div className="grid grid-cols-4 gap-2 mb-3">
            {predefinedAmounts.map((amt) => (
              <button
                key={amt}
                type="button"
                className={`py-2 rounded-md transition-all text-sm ${
                  amount === amt && !customAmount
                    ? "bg-donation-highlight text-white font-semibold"
                    : "bg-gray-100 hover:bg-gray-200 text-gray-800"
                }`}
                onClick={() => handleAmountSelect(amt)}
              >
                ₹{amt}
              </button>
            ))}
          </div>
          <div className="relative">
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">₹</span>
            <Input
              type="number"
              value={customAmount}
              onChange={handleCustomAmountChange}
              className="pl-8"
              placeholder="Custom amount"
            />
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
            <Input
              name="fullName"
              value={formData.fullName}
              onChange={handleInputChange}
              placeholder="John Doe"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <Input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="john@example.com"
              required
            />
          </div>

          <div className="pt-2">
            <div className="flex items-center space-x-2 mb-4">
              <CreditCard className="text-donation-highlight" size={20} />
              <span className="font-medium">Payment Details</span>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Card Number</label>
              <Input
                type="text"
                name="cardNumber"
                value={formData.cardNumber}
                onChange={handleInputChange}
                placeholder="1234 5678 9012 3456"
                required
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4 mt-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Expiry Date</label>
                <Input
                  type="text"
                  name="expiryDate"
                  value={formData.expiryDate}
                  onChange={handleInputChange}
                  placeholder="MM/YY"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">CVC</label>
                <Input
                  type="text"
                  name="cvc"
                  value={formData.cvc}
                  onChange={handleInputChange}
                  placeholder="123"
                  required
                />
              </div>
            </div>
          </div>

          <Button 
            type="submit" 
            disabled={isSubmitting}
            className={`w-full ${isSubmitting ? "bg-gray-400" : "bg-donation-highlight hover:bg-blue-600"} text-white font-semibold py-3 mt-6`}
          >
            {isSubmitting ? (
              <div className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processing...
              </div>
            ) : (
              `Donate ₹${amount}`
            )}
          </Button>
        </form>
        
        <div className="mt-6 text-center text-sm text-gray-500">
          <p>Your donation is secure and encrypted</p>
          <p className="mt-1">Tax benefits available under section 80G</p>
        </div>
      </CardContent>
    </Card>
  );
};
