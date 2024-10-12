import { NextResponse } from "next/server";
import getCurrentUser from "@/app/action/getCurrentUser";
import { GoogleSpreadsheet } from "google-spreadsheet";
import { JWT } from "google-auth-library";
import prisma from "@/lib/prismadb";

const SECRET_KEY = process.env.CHATFUEL_API_SECRET_KEY; // Get the secret from .env

export async function POST(request: Request) {
  // Check for the secret key in the headers
  const apiKey = request.headers.get("x-api-key");

  // Verify if the key in the request matches the secret key
  if (!apiKey || apiKey !== SECRET_KEY) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const { docID, sheetID, currentUser: bodyUser, columnName } = body;

  // Check if the currentUser is passed from the body, otherwise fallback to getCurrentUser
  const currentUser = bodyUser || await getCurrentUser();

  if (currentUser) {
    // find userdata in google sheet
    try {
      const data = [];

      // Initialize auth for Google Sheets
      const serviceAccountAuth = new JWT({
        email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
        key: process.env.GOOGLE_PRIVATE_KEY,
        scopes: ["https://www.googleapis.com/auth/spreadsheets"],
      });

      const doc = new GoogleSpreadsheet(docID, serviceAccountAuth);
      await doc.loadInfo(); // loads document properties and worksheets

      const sheet = doc.sheetsById[sheetID];
      const rows = await sheet.getRows();

      // Extract specific data from the rows based on dynamic column name
      for (let row of rows) {
        const value = row.get(columnName); // Use dynamic column name from the request
        if (value) {
          data.push(value);
        }
      }

      const result = data.includes(currentUser.studentId)
          ? "完全✅"
          : "還沒❌";

      return NextResponse.json({ result: result, studentId: currentUser.studentId }, { status: 200 });
    } catch (error: any) {
      console.log(error);
      return NextResponse.json({ error: "Google Sheets Error", details: error.message });
    }
  } else {
    // Return error response if no user found
    return NextResponse.json({ error: "User not found" });
  }
}
