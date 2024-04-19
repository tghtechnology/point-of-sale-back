/*
  Warnings:

  - You are about to drop the column `total` on the `recibo` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `recibo` DROP COLUMN `total`,
    ADD COLUMN `monto_reembolsado` DECIMAL(10, 2) NULL;
