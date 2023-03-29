import { withSessionRoute } from "@/lib/withSession";
import { NextApiRequest, NextApiResponse } from "next";

// @ts-ignore
export default withSessionRoute(handler);

async function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case "POST":
      const { email, password } = req.body;
      if (email && password) {
        email === process.env.ADMIN_EMAIL &&
          password === process.env.ADMIN_PASSWORD;
        req.session.user = {
          admin: true,
          userName: email ?? "-",
        };
        await req.session.save();
        return res.status(200).json({
          loggedIn: true,
        });
      } else return res.status(401).send("Unauthorized");

    default:
      res.status(405).send("No method allowed");
      break;
  }
}
