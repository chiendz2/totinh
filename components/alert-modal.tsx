"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useOpenClose } from "@/hooks/use-open-close";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useState } from "react";

export default function AlertModal() {
  const onOpenClose = useOpenClose();
  const [inputValue, setInputValue] = useState("");

  const inputValueNew = "Em đồng ý!";

  const onInputValue = () => {
    setInputValue(inputValueNew);
  };

  const handleSubmit = () => {
    onOpenClose.onClose();
  };

  return (
    <Dialog open={onOpenClose.isOpen} onOpenChange={onOpenClose.onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="font-bold text-pink-500">
            Cậu làm người yêu tớ nhé 🥰
          </DialogTitle>
        </DialogHeader>
        <div>
          <Input onChange={onInputValue} value={inputValue} type="text" />
          <div className="flex justify-end">
            <Button
              onClick={handleSubmit}
              variant="pinkColor"
              type="button"
              className="mt-8"
            >
              Okiii!
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
