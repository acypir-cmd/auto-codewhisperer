import { motion } from "framer-motion";
import { useLocation, useNavigate } from "react-router-dom";
import { CheckCircle2, Download, RotateCcw, Package, FolderGit2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { BackgroundEffect } from "@/components/BackgroundEffect";

export default function Result() {
  const location = useLocation();
  const navigate = useNavigate();
  const { outputType, fileName } = location.state || {};

  if (!outputType || !fileName) {
    navigate("/upload");
    return null;
  }

  const handleDownload = (type: "full" | "backend") => {
    // TODO: Implement actual download
    console.log(`Downloading ${type} project...`);
  };

  return (
    <div className="relative min-h-screen">
      <BackgroundEffect />

      <div className="relative z-10 container mx-auto px-4 pt-32 pb-20">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto"
        >
          <div className="text-center mb-10">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="w-20 h-20 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center mx-auto mb-6 glow-primary"
            >
              <CheckCircle2 className="w-10 h-10 text-white" />
            </motion.div>
            <h1 className="text-5xl font-bold mb-4 text-gradient animate-fade-in-up">
              Backend Generated!
            </h1>
            <p className="text-xl text-muted-foreground">
              Your backend is ready to download
            </p>
          </div>

          <Card className="p-8 glass border-white/10 space-y-6">
            <div className="bg-muted/50 rounded-xl p-6 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Original File:</span>
                <span className="font-medium">{fileName}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Output Type:</span>
                <span className="font-medium capitalize">{outputType} Project</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Status:</span>
                <span className="text-primary font-medium">✓ Ready</span>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
              >
                <Button
                  onClick={() => handleDownload("full")}
                  className="w-full h-auto py-6 bg-gradient-to-r from-primary to-secondary hover:opacity-90 text-white rounded-xl glow-primary hover-scale flex flex-col items-center gap-3"
                >
                  <Package className="w-8 h-8" />
                  <div>
                    <div className="font-bold text-lg">Full Project</div>
                    <div className="text-xs opacity-90">Frontend + Backend</div>
                  </div>
                  <Download className="w-5 h-5 mt-2" />
                </Button>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
              >
                <Button
                  onClick={() => handleDownload("backend")}
                  className="w-full h-auto py-6 glass border-primary/30 hover:bg-white/10 rounded-xl hover-scale flex flex-col items-center gap-3"
                  variant="outline"
                >
                  <FolderGit2 className="w-8 h-8 text-primary" />
                  <div>
                    <div className="font-bold text-lg">Backend Only</div>
                    <div className="text-xs opacity-80">Just backend code</div>
                  </div>
                  <Download className="w-5 h-5 mt-2 text-primary" />
                </Button>
              </motion.div>
            </div>

            <div className="pt-4 border-t border-white/10">
              <Button
                onClick={() => navigate("/upload")}
                variant="ghost"
                className="w-full gap-2 text-muted-foreground hover:text-foreground"
              >
                <RotateCcw className="w-4 h-4" />
                Generate Another Backend
              </Button>
            </div>
          </Card>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mt-8 text-center"
          >
            <Card className="p-6 glass border-white/10">
              <h3 className="font-semibold mb-2">What's Next?</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Extract the downloaded files and follow the README.md for setup instructions.
              </p>
              <Button
                onClick={() => navigate("/docs")}
                variant="outline"
                className="glass border-white/20"
              >
                View Documentation
              </Button>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
