import { getPocketBase } from "@/lib/pocketBase";
import { withSessionRoute } from "@/lib/withSession";
import { NextApiRequest, NextApiResponse } from "next";

export default withSessionRoute(handler);

export async function handler(req: NextApiRequest, res: NextApiResponse) {
  const pb = await getPocketBase();
  if (!req.session.user) return res.status(401).send("Unauthorized");

  switch (req.method) {
    case "GET":
      const records = await pb
        .collection("appoploo_projects")
        .getFullList(200 /* batch size */);
      return res.status(200).json(records);

    case "POST":
      const record = await pb
        .collection("appoploo_projects")
        .create({ ...req.body });
      return res.status(200).json(record);

    case "PUT":
      const updatedRecord = await pb

        .collection("appoploo_projects")
        .update(`${req.query.id}`, req.body);
      return res.status(200).json(updatedRecord);
    case "DELETE":
      const deletedRecord = await pb
        .collection("appoploo_projects")
        .delete(`${req.query.id}`);
      return res.status(200).json(deletedRecord);

    default:
      return res.status(405).send("No method allowed");
  }
}
