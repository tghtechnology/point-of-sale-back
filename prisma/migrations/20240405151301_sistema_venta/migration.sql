/*
  Warnings:

  - Added the required column `tipoPago` to the `venta` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `venta` ADD COLUMN `tipoPago` ENUM('EFECTIVO', 'TARJETA') NOT NULL;
