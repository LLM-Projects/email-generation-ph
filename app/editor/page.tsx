"use client";

import { useState, useEffect } from "react";
import { useResizable } from "@/hooks/useResizable";
import { generateTemplate } from "@/utils/generateTemplate";
import { extractEmailsFromCSV } from "@/utils/extractEmails";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff, Loader2, MessageCircle, Send } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { usePromptContext } from "@/context/PromptContext";
import { regenerateTemplate } from "@/utils/regenerateTemplate";
import { useAppContext } from "@/context/AppContext";

export default function Editor() {
  const [html, setHtml] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { prompt, uploadedImages } = usePromptContext();
  const { size, startResizing } = useResizable();

  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatInput, setChatInput] = useState("");

  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [formData, setFormData] = useState({
    apiKey: "",
    sender_name: "",
    sender_email: "",
    subject: "",
    csvFile: null as File | null,
  });
  const [showApiKey, setShowApiKey] = useState(false);
  const { openAIApiKey } = useAppContext();

  // Prepare the image URLs to send to the server-side template generation function
  const imageURLs = uploadedImages.map((image) => image.secure_url);

  // Generate the HTML template once when the component mounts
  useEffect(() => {
    if (prompt) {
      setIsLoading(true);

      generateTemplate(prompt, imageURLs, openAIApiKey)
        .then((html) => {
          if (html !== null) {
            setHtml(html);
          }
        })
        .finally(() => setIsLoading(false));
    }
  }, []);

  // Handle changes to the HTML in the textarea
  const handleHtmlChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const updatedHTML = e.target.value;

    setHtml(updatedHTML);
  };

  // Handle downloading the generated HTML as a file
  const handleDownload = () => {
    if (html) {
      const blob = new Blob([html], { type: "text/html" });
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = "email.html";
      link.click();
    } else {
      alert("No content to download...");
    }
  };

  // Handle Form Input Change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  // Handle Regenerate Template
  const handleChatSubmit = () => {
    setIsLoading(true);

    regenerateTemplate(html, chatInput, openAIApiKey)
      .then((newHtml) => setHtml(newHtml ?? ""))
      .finally(() => setIsLoading(false));

    setChatInput("");
    setIsChatOpen(false);
  };

  // Handle Send Email Form submit
  const handleSendEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.apiKey || !formData.subject || !formData.csvFile) {
      alert("Please fill all the fields");
      return;
    }

    const extractedEmails = await extractEmailsFromCSV(
      formData.csvFile ? formData.csvFile : new File([""], "empty.csv")
      // Pass an empty file if no file is selected
    );

    // Call the function to send emails
    const response = await fetch("/api/sendEmail", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        apiKey: formData.apiKey,
        sender_name: formData.sender_name,
        sender_email: formData.sender_email,
        subject: formData.subject,
        emails: extractedEmails,
        html: html,
      }),
    });

    const data = await response.json();
    alert(data.message);
    setIsPopupOpen(false);
  };

  return (
    <main className="flex h-screen overflow-hidden">
      {/* HTML Editor Section */}
      <div className="overflow-auto p-4" style={{ width: `${size}%` }}>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">HTML Editor</h2>

          <div className="space-x-5">
            <Button onClick={handleDownload} disabled={isLoading}>
              Download HTML
            </Button>
            <Dialog open={isPopupOpen} onOpenChange={setIsPopupOpen}>
              <DialogTrigger asChild>
                <Button disabled={!html}>Send Email</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Send Email</DialogTitle>
                  <DialogClose asChild></DialogClose>
                </DialogHeader>
                <form onSubmit={handleSendEmailSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="apiKey">Resend API Key</Label>
                    <div className="flex space-x-2">
                      <div className="relative flex-grow">
                        <Input
                          id="apiKey"
                          name="apiKey"
                          type={showApiKey ? "text" : "password"}
                          value={formData.apiKey}
                          onChange={handleInputChange}
                          className="pr-10"
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="absolute inset-y-0 right-0 px-3 flex items-center"
                          onClick={() => setShowApiKey(!showApiKey)}
                        >
                          {showApiKey ? (
                            <EyeOff className="h-4 w-4" />
                          ) : (
                            <Eye className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="sender_name">Sender Name</Label>
                    <Input
                      id="sender_name"
                      name="sender_name"
                      value={formData.sender_name}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="sender_email">Sender Email</Label>
                    <Input
                      id="sender_email"
                      name="sender_email"
                      value={formData.sender_email}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject</Label>
                    <Input
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="csvFile">Upload CSV (max 100 emails)</Label>
                    <br />
                    <Label>Just a single column with list of emails</Label>
                    <Input
                      id="csvFile"
                      name="csvFile"
                      type="file"
                      accept=".csv"
                      onChange={handleInputChange}
                    />
                  </div>
                  <Button type="submit">Send</Button>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </div>
        {isLoading ? (
          <div className="flex items-center justify-center h-[calc(100vh-12rem)]">
            <Loader2 className="h-8 w-8 animate-spin" />
          </div>
        ) : (
          <Textarea
            value={html}
            onChange={handleHtmlChange}
            className="w-full h-[calc(100vh-12rem)] resize-none font-mono p-4 whitespace-pre-wrap"
            placeholder="Edit your HTML here..."
          />
        )}
      </div>

      {/* Resizing Divider */}
      <div
        className="w-1 bg-gray-300 cursor-col-resize"
        onMouseDown={startResizing}
      />

      {/* Rendered HTML Section */}
      <div className="overflow-auto p-4" style={{ width: `${100 - size}%` }}>
        {isLoading ? (
          <div className="flex items-center justify-center h-[calc(100vh-8rem)]">
            <Loader2 className="h-8 w-8 animate-spin" />
          </div>
        ) : (
          <div
            dangerouslySetInnerHTML={{
              __html: html, // Displaying the generated HTML
            }}
            className="prose max-w-none"
          />
        )}
      </div>

      {/* Regenerate HTML */}
      <TooltipProvider>
        <Tooltip open={!isChatOpen}>
          <TooltipTrigger asChild>
            <Button
              className="fixed bottom-4 right-4 rounded-full p-3"
              onClick={() => setIsChatOpen(!isChatOpen)}
              disabled={!html}
            >
              <MessageCircle size={24} />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="left">
            <p>Enter your message to improve the email</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      {isChatOpen && (
        <div className="fixed bottom-20 right-4 flex items-center bg-white rounded-lg shadow-lg p-2">
          <Textarea
            className="flex-grow mr-2"
            placeholder="Type your message..."
            value={chatInput}
            onChange={(e) => setChatInput(e.target.value)}
          />
          <Button
            size="icon"
            onClick={handleChatSubmit}
            disabled={chatInput.length === 0}
          >
            <Send size={15} />
          </Button>
        </div>
      )}
    </main>
  );
}
