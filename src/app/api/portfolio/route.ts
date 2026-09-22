import { NextRequest, NextResponse } from "next/server";
import initialData from "@/data/portfolio.json";
import fs from "fs";
import path from "path";

export async function GET() {
  return NextResponse.json(initialData);
}

export async function POST(req: NextRequest) {
  try {
    const updatedData = await req.json();

    // Check if we can write to filesystem (in local development)
    try {
      const filePath = path.join(process.cwd(), "src", "data", "portfolio.json");
      if (fs.existsSync(filePath)) {
        fs.writeFileSync(filePath, JSON.stringify(updatedData, null, 2), "utf-8");
        return NextResponse.json({
          success: true,
          message: "Data saved to filesystem and memory successfully.",
          persistedToFile: true,
        });
      }
    } catch (fsErr) {
      // In serverless / read-only environment like Vercel
      console.warn("Read-only filesystem detected (Vercel deployment):", fsErr);
    }

    return NextResponse.json({
      success: true,
      message: "Data received successfully. Note: In serverless environments, please use 'Export portfolio.json' to persist changes into your repository.",
      persistedToFile: false,
    });
  } catch (error) {
    console.error("API update error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to process data update." },
      { status: 500 }
    );
  }
}
