/*
  Warnings:

  - You are about to drop the column `cantidad` on the `detallereembolso` table. All the data in the column will be lost.
  - Added the required column `cantidadDevuelta` to the `DetalleReembolso` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `detallereembolso` DROP COLUMN `cantidad`,
    ADD COLUMN `cantidadDevuelta` INTEGER NOT NULL,
    MODIFY `subtotal` DECIMAL(10, 2) NOT NULL;
