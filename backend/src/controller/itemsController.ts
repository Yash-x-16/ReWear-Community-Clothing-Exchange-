import { Request, Response } from "express";
import { client } from "../db/db";
export const createItem = async (req: Request, res: Response) => {
  try {
    const { title, description, category, type, size, condition, tags } = req.body;
    const userId = req.userId;

    const item = await client.item.create({
      data: {
        title,
        description,
        category,
        size,
        condition,
        tags: tags?.split(',') || [],
        userId: Number(userId),
      },
    });
    return res.status(201).json({ message: 'Item created successfully', item });
  } catch (error) {
    return res.status(500).json({ message: 'Error creating item', error });
  }
};



export const deleteItem = async (req: Request, res: Response) => {
  try {
    const itemId = Number(req.params.id);
    const userId = Number(req.userId);

    const item = await client.item.findUnique({ where: { id: itemId } });
    if (!item || item.userId !== userId) {
      return res.status(403).json({ message: 'Unauthorized or item not found' });
    }

    await client.itemImage.deleteMany({ where: { itemId } });
    await client.item.delete({ where: { id: itemId } });

    return res.status(200).json({ message: 'Item deleted successfully' });
  } catch (error) {
    return res.status(500).json({ message: 'Error deleting item', error });
  }
};


export const getAllItems = async (req: Request, res: Response) => {
  try {
    const userId = req.query.userId ? Number(req.query.userId) : undefined;
    const search = req.query.search?.toString().toLowerCase();

    const filters: any = {
      available: true,
      isApproved: true,
    };

    if (userId) filters.userId = userId;
    if (search) filters.tags = { some: { equals: search, mode: 'insensitive' } };

    const items = await client.item.findMany({
      where: filters,
      include: {
        images: true,
        user: {
          select: { username: true, Image: true },
        },
      },
    });

    return res.status(200).json(items);
  } catch (error) {
    return res.status(500).json({ message: 'Error fetching items', error });
  }
};



export const getItemById = async (req: Request, res: Response) => {
  try {
    const item = await client.item.findUnique({
      where: { id: Number(req.params.id) },
      include: { images: true, user: true },
    });
    if (!item) return res.status(404).json({ message: 'Item not found' });
    return res.status(200).json(item);
  } catch (error) {
    return res.status(500).json({ message: 'Error fetching item', error });
  }
};
