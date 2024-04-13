/*
  Warnings:

  - Added the required column `ref` to the `Recibo` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `recibo` ADD COLUMN `ref` VARCHAR(100) NOT NULL;
