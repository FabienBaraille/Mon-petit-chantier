import { createUser } from "@/Utils/Request/createUser";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    switch (req.method) {
      case "POST":
        const { username, email, password, csrfToken} = req.body;

        if (username && email && password) {
          const response = await createUser({username, email, password})
          if (response.status === 200) {
            res.status(200).json({
              id: response.user?.id,
              name: response.user?.name,
              email: response.user?.email
            })
          } else {
            res.status(500).json({
              statusText: response.message
            })
          }
        } else {
          res.status(500).json({
            statusText: "Missing datas"
          })
        }
        break;
      default:
        res.setHeader("Allow", ["POST"]);
        res.status(405).json({
          statusText: `Method ${req.method} Not Allowed`,
        })
    }
  } catch (error) {
    return res.status(500).json({
      error: "System error. Please contact support",
    });
  }
}