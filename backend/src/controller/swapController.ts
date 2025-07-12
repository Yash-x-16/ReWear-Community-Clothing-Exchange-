import { Request, Response } from "express";
import { client } from "../db/db";


export const requestSwap = async (req: Request, res: Response) => {
  try {
    const { requestedItemId, offeredItemId } = req.body;
    const senderId = req.userId;

    const offeredItem = await client.item.findUnique({
      where: { id: offeredItemId },
      include: { user: true },
    });

    const requestedItem = await client.item.findUnique({
      where: { id: requestedItemId },
      include: { user: true },
    });

    if (!offeredItem || !requestedItem) {
      return res.status(404).json({ message: 'One or both items not found' });
    }

    const receiverId = requestedItem.userId;

    const swap = await client.swap.create({
      data: {
        requestedItemId,
        offeredItemId,
        senderId: Number(senderId),
        receiverId: receiverId,
        status: 'PENDING',
        swapType: 'DIRECT', 
      },
      include: {
        requestedItem: true,
        offeredItem: true,
      },
    });

    return res.status(201).json({ message: 'Swap requested successfully', swap });
  } catch (error) {
    return res.status(500).json({ message: 'Error requesting swap', error });
  }
};



export const getUserSwaps = async (req: Request, res: Response) => {
  try {
    const userId = req.userId;
    const swaps = await client.swap.findMany({
      where: {
        OR: [
          { senderId: Number(userId) },
          { receiverId:  Number(userId)  },
        ],
      },
      include: {
        requestedItem: true,
        offeredItem: true,
      },
    });

    return res.status(200).json(swaps);
  } catch (error) {
    return res.status(500).json({ message: 'Error fetching swaps', error });
  }
};

export const respondToSwap = async (req: Request, res: Response) => {
  try {
    const swapId = Number(req.params.id);
    const { action } = req.body; // 

    if (!['ACCEPTED', 'REJECTED'].includes(action)) {
      return res.status(400).json({ message: 'Invalid action' });
    }

    const updatedSwap = await client.swap.update({
      where: { id: swapId },
      data: { status: action },
    });

    return res.status(200).json({ message: `Swap ${action.toLowerCase()}`, updatedSwap });
  } catch (error) {
    return res.status(500).json({ message: 'Error updating swap status', error });
  }
};