/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import express from "express";
import fs from "fs";
import path from "path";

const app = express();
const PORT = 3000;
const SIGNUPS_FILE = path.join(process.cwd(), "signups.json");

// Middleware
app.use(express.json());

// Initialize local JSON store if it doesn't exist
if (!fs.existsSync(SIGNUPS_FILE)) {
  fs.writeFileSync(SIGNUPS_FILE, JSON.stringify([], null, 2), "utf8");
}

// API: Handle Uplora Landing Page Signup
app.post("/api/signup", (req, res) => {
  const { username, email } = req.body;

  // Validation
  if (!username || typeof username !== "string" || username.trim().length === 0) {
    return res.status(400).json({ 
      success: false, 
      message: "Please enter a valid username." 
    });
  }

  if (!email || typeof email !== "string" || !email.includes("@")) {
    return res.status(400).json({ 
      success: false, 
      message: "Please enter a valid email address." 
    });
  }

  const cleanUsername = username.trim();
  const cleanEmail = email.trim().toLowerCase();

  try {
    // Read existing signups
    const fileData = fs.readFileSync(SIGNUPS_FILE, "utf8");
    const signups = JSON.parse(fileData);

    // Prevent perfect duplicates
    const alreadyExists = signups.some((item: any) => item.email === cleanEmail);
    
    const newSignup = {
      username: cleanUsername,
      email: cleanEmail,
      timestamp: new Date().toISOString(),
    };

    if (!alreadyExists) {
      signups.push(newSignup);
      fs.writeFileSync(SIGNUPS_FILE, JSON.stringify(signups, null, 2), "utf8");
    }

    // SIMULATED EMAIL NOTIFICATION DISPATCH TO uplora.io@gmail.com
    console.log("\n=======================================================");
    console.log(`🚨 [NEW LEAD REGISTRATION FROM UPLORA LANDING PAGE]`);
    console.log(`Username: ${cleanUsername}`);
    console.log(`Email: ${cleanEmail}`);
    console.log(`Timestamp: ${newSignup.timestamp}`);
    console.log(`-------------------------------------------------------`);
    console.log(`📩 Notification Mail Trigger:`);
    console.log(`FROM: noreply@uplora.io`);
    console.log(`TO: uplora.io@gmail.com`); // Sending to Uplora admin
    console.log(`SUBJECT: New Sign-Up Lead - ${cleanUsername}`);
    console.log(`BODY: Hi Uplora Team, you have a new sign-up!\n`);
    console.log(`User details:\n- Name: ${cleanUsername}\n- Email: ${cleanEmail}`);
    console.log(`=======================================================\n`);

    // Whop storefront url
    const whopStoreUrl = "https://whop.com/uplora"; 

    return res.json({
      success: true,
      message: `Welcome, ${cleanUsername}! Redirecting you to our Whop premium marketplace...`,
      redirectUrl: whopStoreUrl
    });

  } catch (error) {
    console.error("Signup processing error:", error);
    return res.status(500).json({ 
      success: false, 
      message: "An internal server error occurred. Please try again." 
    });
  }
});

// API: Retrieve signup counts (useful for an admin metric overlay)
app.get("/api/admin/metrics", (req, res) => {
  try {
    const fileData = fs.readFileSync(SIGNUPS_FILE, "utf8");
    const signups = JSON.parse(fileData);
    return res.json({ count: signups.length });
  } catch (err) {
    return res.json({ count: 0 });
  }
});

// Mount Vite middleware for asset serving & SPA client-side fallback
async function setupVite() {
  if (process.env.NODE_ENV !== "production") {
    const { createServer: createViteServer } = await import("vite");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Uplora Premium Landing Server running on http://localhost:${PORT}`);
  });
}

setupVite();
