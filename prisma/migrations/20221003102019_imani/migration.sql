/*
  Warnings:

  - Made the column `image` on table `user` required. This step will fail if there are existing NULL values in that column.
  - Made the column `ainaYaNdoa` on table `user` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `user` MODIFY `image` VARCHAR(191) NOT NULL,
    MODIFY `ainaYaNdoa` VARCHAR(191) NOT NULL;
