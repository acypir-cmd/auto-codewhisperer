import { motion } from "framer-motion";
import { FileCode, Zap, Download, Settings, CheckCircle } from "lucide-react";
import { Card } from "@/components/ui/card";
import { BackgroundEffect } from "@/components/BackgroundEffect";

export default function Docs() {
  const steps = [
    {
      icon: FileCode,
      title: "Prepare Your Frontend",
      description: "Create a .zip file of your React, Next.js, or HTML project",
      details: [
        "Include all source files",
        "Make sure API calls are clearly defined",
        "Include package.json if applicable",
      ],
    },
    {
      icon: Zap,
      title: "Upload & Generate",
      description: "Upload your .zip file and let AI analyze your code",
      details: [
        "AI detects your frontend framework",
        "Identifies API endpoints and data models",
        "Generates matching backend structure",
      ],
    },
    {
      icon: Download,
      title: "Download & Deploy",
      description: "Get your backend code ready for deployment",
      details: [
        "Choose full project or backend only",
        "Follow README.md for setup",
        "Deploy to your favorite platform",
      ],
    },
  ];

  return (
    <div className="relative min-h-screen">
      <BackgroundEffect />

      <div className="relative z-10 container mx-auto px-4 pt-32 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-5xl mx-auto"
        >
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold mb-4 text-gradient">Documentation</h1>
            <p className="text-xl text-muted-foreground">
              Everything you need to know about AutoBackend.AI
            </p>
          </div>

          <div className="space-y-8">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={step.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.2, duration: 0.6 }}
                >
                  <Card className="p-8 glass border-white/10 hover:border-primary/30 transition-all">
                    <div className="flex gap-6">
                      <div className="flex-shrink-0">
                        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center glow-primary">
                          <Icon className="w-8 h-8 text-white" />
                        </div>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <span className="text-sm font-bold text-primary">
                            Step {index + 1}
                          </span>
                        </div>
                        <h3 className="text-2xl font-bold mb-2">{step.title}</h3>
                        <p className="text-muted-foreground mb-4">{step.description}</p>
                        <ul className="space-y-2">
                          {step.details.map((detail) => (
                            <li
                              key={detail}
                              className="flex items-center gap-2 text-sm"
                            >
                              <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />
                              <span>{detail}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              );
            })}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="mt-12"
          >
            <Card className="p-8 glass border-white/10">
              <div className="flex items-start gap-4">
                <Settings className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-xl font-bold mb-2">Backend Features</h3>
                  <p className="text-muted-foreground mb-4">
                    Your generated backend includes:
                  </p>
                  <ul className="grid md:grid-cols-2 gap-3 text-sm">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-primary" />
                      Express.js server setup
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-primary" />
                      MongoDB connection
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-primary" />
                      RESTful API routes
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-primary" />
                      Mongoose models
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-primary" />
                      JWT authentication
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-primary" />
                      Environment configuration
                    </li>
                  </ul>
                </div>
              </div>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
