/*
  Warnings:

  - Made the column `cambio` on table `venta` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `detalleventa` MODIFY `subtotal` DECIMAL(10, 2) NOT NULL;

-- AlterTable
ALTER TABLE `venta` MODIFY `subtotal` DECIMAL(10, 2) NOT NULL,
    MODIFY `total` DECIMAL(10, 2) NOT NULL,
    MODIFY `cambio` DECIMAL(10, 2) NOT NULL,
    MODIFY `dineroRecibido` DECIMAL(10, 2) NOT NULL;
