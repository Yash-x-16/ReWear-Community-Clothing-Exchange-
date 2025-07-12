import { client } from "../db/db";
import { Request,Response } from "express";


export const getPendingItems = async (req: Request, res: Response) => {
  try {
    const items = await client.item.findMany({
      where: { isApproved: false },
      include: { user: true, images: true },
    });
    return res.status(200).json(items);
  } catch (error) {
    return res.status(500).json({ message: 'Error fetching pending items', error });
  }
};

export const approveItem = async (req: Request, res: Response) => {
  try {
    const itemId = Number(req.params.id);
    const item = await client.item.update({
      where: { id: itemId },
      data: { isApproved: true },
    });
    return res.status(200).json({ message: 'Item approved', item });
  } catch (error) {
    return res.status(500).json({ message: 'Error approving item', error });
  }
};

export const rejectItem = async (req: Request, res: Response) => {
  try {
    const itemId = Number(req.params.id);
    await client.item.delete({ where: { id: itemId } });
    return res.status(200).json({ message: 'Item rejected and deleted' });
  } catch (error) {
    return res.status(500).json({ message: 'Error rejecting item', error });
  }
};
