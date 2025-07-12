-- CreateEnum
CREATE TYPE "SwapType" AS ENUM ('DIRECT', 'POINTS');

-- CreateEnum
CREATE TYPE "SwapStatus" AS ENUM ('PENDING', 'ACCEPTED', 'REJECTED', 'COMPLETED');

-- CreateTable
CREATE TABLE "Swap" (
    "id" SERIAL NOT NULL,
    "senderId" INTEGER NOT NULL,
    "receiverId" INTEGER NOT NULL,
    "offeredItemId" INTEGER NOT NULL,
    "requestedItemId" INTEGER,
    "swapType" "SwapType" NOT NULL,
    "status" "SwapStatus" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Swap_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Swap" ADD CONSTRAINT "Swap_senderId_fkey" FOREIGN KEY ("senderId") REFERENCES "User"("Id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Swap" ADD CONSTRAINT "Swap_receiverId_fkey" FOREIGN KEY ("receiverId") REFERENCES "User"("Id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Swap" ADD CONSTRAINT "Swap_offeredItemId_fkey" FOREIGN KEY ("offeredItemId") REFERENCES "Item"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Swap" ADD CONSTRAINT "Swap_requestedItemId_fkey" FOREIGN KEY ("requestedItemId") REFERENCES "Item"("id") ON DELETE SET NULL ON UPDATE CASCADE;
