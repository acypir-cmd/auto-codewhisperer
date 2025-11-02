import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Upload as UploadIcon, FileCode, X, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { BackgroundEffect } from "@/components/BackgroundEffect";
import { useToast } from "@/hooks/use-toast";

export default function Upload() {
  const [file, setFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [progress, setProgress] = useState(0);
  const [outputType, setOutputType] = useState<"full" | "backend">("full");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile && droppedFile.name.endsWith(".zip")) {
      setFile(droppedFile);
    } else {
      toast({
        title: "Invalid file",
        description: "Please upload a .zip file",
        variant: "destructive",
      });
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile && selectedFile.name.endsWith(".zip")) {
      setFile(selectedFile);
    } else {
      toast({
        title: "Invalid file",
        description: "Please upload a .zip file",
        variant: "destructive",
      });
    }
  };

  const handleGenerate = async () => {
    if (!file) return;

    setIsGenerating(true);
    setProgress(0);

    // Simulate progress
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 90) {
          clearInterval(progressInterval);
          return 90;
        }
        return prev + 10;
      });
    }, 500);

    // TODO: Implement actual backend generation
    setTimeout(() => {
      clearInterval(progressInterval);
      setProgress(100);
      setTimeout(() => {
        navigate("/result", { state: { outputType, fileName: file.name } });
      }, 500);
    }, 5000);
  };

  const removeFile = () => {
    setFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="relative min-h-screen">
      <BackgroundEffect />

      <div className="relative z-10 container mx-auto px-4 pt-32 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto"
        >
          <div className="text-center mb-10">
            <h1 className="text-5xl font-bold mb-4 text-gradient">
              Upload Your Frontend
            </h1>
            <p className="text-xl text-muted-foreground">
              Upload your project as a .zip file and let AI generate your backend
            </p>
          </div>

          <Card className="p-8 glass border-white/10">
            <div
              className={`border-2 border-dashed rounded-2xl p-12 text-center transition-all duration-300 ${
                isDragging
                  ? "border-primary bg-primary/5 scale-105"
                  : "border-white/20 hover:border-primary/50"
              }`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              {!file ? (
                <>
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center mx-auto mb-4 glow-primary">
                    <UploadIcon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">
                    Drop your .zip file here
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    or click to browse
                  </p>
                  <Button
                    onClick={() => fileInputRef.current?.click()}
                    className="bg-gradient-to-r from-primary to-secondary hover:opacity-90 text-white rounded-xl"
                  >
                    Select File
                  </Button>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept=".zip"
                    onChange={handleFileSelect}
                    className="hidden"
                  />
                </>
              ) : (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 200 }}
                  className="flex items-center justify-between bg-muted/50 rounded-xl p-4"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                      <FileCode className="w-5 h-5 text-primary" />
                    </div>
                    <div className="text-left">
                      <p className="font-medium">{file.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {(file.size / 1024 / 1024).toFixed(2)} MB
                      </p>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={removeFile}
                    className="hover:bg-destructive/20 hover:text-destructive"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </motion.div>
              )}
            </div>

            {file && !isGenerating && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-8 space-y-6"
              >
                <div>
                  <label className="text-sm font-medium mb-3 block">
                    Output Type
                  </label>
                  <div className="grid grid-cols-2 gap-4">
                    <Button
                      variant={outputType === "full" ? "default" : "outline"}
                      onClick={() => setOutputType("full")}
                      className={`h-auto py-4 ${
                        outputType === "full"
                          ? "bg-gradient-to-r from-primary to-secondary text-white glow-primary"
                          : "glass border-white/20"
                      }`}
                    >
                      <div>
                        <div className="font-semibold">Full Integrated Project</div>
                        <div className="text-xs opacity-80">Frontend + Backend</div>
                      </div>
                    </Button>
                    <Button
                      variant={outputType === "backend" ? "default" : "outline"}
                      onClick={() => setOutputType("backend")}
                      className={`h-auto py-4 ${
                        outputType === "backend"
                          ? "bg-gradient-to-r from-primary to-secondary text-white glow-primary"
                          : "glass border-white/20"
                      }`}
                    >
                      <div>
                        <div className="font-semibold">Backend Only</div>
                        <div className="text-xs opacity-80">Just the backend code</div>
                      </div>
                    </Button>
                  </div>
                </div>

                <Button
                  onClick={handleGenerate}
                  className="w-full bg-gradient-to-r from-primary to-secondary hover:opacity-90 text-white py-6 rounded-xl text-lg glow-primary hover-scale"
                >
                  Generate Backend
                </Button>
              </motion.div>
            )}

            {isGenerating && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-8 space-y-4"
              >
                <div className="flex items-center gap-3 justify-center mb-4">
                  <Loader2 className="w-6 h-6 animate-spin text-primary" />
                  <p className="text-lg font-medium">
                    AI is generating your backend...
                  </p>
                </div>
                <Progress value={progress} className="h-2" />
                <p className="text-center text-sm text-muted-foreground">
                  {progress}% complete
                </p>
              </motion.div>
            )}
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
