import { createUser } from "@/Utils/Request/createUser";
import { NextRequest } from "next/server";

// API route for User and Account creation

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { username, email, password } = body;
    if (username && email && password) {
      const response = await createUser({username, email, password})
      if (response.status === 200) {
        return new Response(null, { status: 200, statusText: response.message })
      } else {
        return new Response(null, { status: 500, statusText: response.message })
      }
    } else {
      return new Response(null, { status: 500, statusText: "Une erreur s'est produite, veuillez réessayer" })
    }
  } catch (error) {
    return new Response(null, { status: 500, statusText: "Une erreur s'est produite, veuillez réessayer" })
  }
}