import { withSessionRoute } from "@/lib/withSession";
import { NextApiRequest, NextApiResponse } from "next";

// @ts-ignore
export default withSessionRoute(handler);

async function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case "POST":
      await req.session.destroy();
      return res.status(301).redirect("/login");

    default:
      res.status(405).send("No method allowed");
      break;
  }
}
