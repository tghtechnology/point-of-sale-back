/*
  Warnings:

  - You are about to alter the column `tipoPago` on the `venta` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Enum(EnumId(4))`.

*/
-- AlterTable
ALTER TABLE `venta` MODIFY `tipoPago` ENUM('Efectivo', 'Tarjeta') NOT NULL;
