import express, { type Request, Response, NextFunction } from "express";
import { registerRoutes } from "./routes";
import { setupVite, serveStatic, log } from "./vite";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
  const start = Date.now();
  const path = req.path;
  let capturedJsonResponse: Record<string, any> | undefined;

  const originalResJson = res.json;
  res.json = function (bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };

  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path.startsWith("/api")) {
      let logLine = `${req.method} ${path} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }
      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "…";
      }
      log(logLine);
    }
  });

  next();
});

(async () => {
  const server = await registerRoutes(app);

  // Error handler middleware
  app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    res.status(status).json({ message });
    throw err;
  });

  if (app.get("env") === "development") {
    // Setup Vite for dev with hot reloading
    await setupVite(app, server);

    // Listen only in development on local machine
    const port = parseInt(process.env.PORT || "5000", 10);
    const isWindows = process.platform === "win32";

    server.listen(
      {
        port,
        host: isWindows ? "127.0.0.1" : "0.0.0.0",
        ...(isWindows ? {} : { reusePort: true }),
      },
      () => {
        log(`Serving on http://${isWindows ? "127.0.0.1" : "0.0.0.0"}:${port}`);
      }
    );
  } else {
    // In production (Vercel), serve static files from build folder
    serveStatic(app);
    // IMPORTANT: DO NOT call server.listen() here on Vercel
  }
})();

export default app;
