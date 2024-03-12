/*
  Warnings:

  - You are about to drop the column `tipoVenta` on the `articulo` table. All the data in the column will be lost.
  - Added the required column `tipo_venta` to the `articulo` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `articulo` DROP COLUMN `tipoVenta`,
    ADD COLUMN `tipo_venta` ENUM('Peso', 'Unidad') NOT NULL;
