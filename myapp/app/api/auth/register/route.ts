import { createUser } from "@/Utils/Request/createUser";
import { NextRequest } from "next/server";

// API route for User and Account creation

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { username, email, password, csrfToken} = body;
    if (username && email && password) {
      const response = await createUser({username, email, password})
      if (response.status === 200) {
        return new Response(response.message, { status: 200 })
      } else {
        return new Response(response.message, { status: 500 })
      }
    } else {
      return new Response("Une erreur s'est produite, veuillez réessayer", { status: 500})
    }
  } catch (error) {
    return new Response("Une erreur s'est produite, veuillez réessayer", { status: 500})
  }
}