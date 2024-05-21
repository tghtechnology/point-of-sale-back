/*
  Warnings:

  - You are about to drop the column `cantidadReembolso` on the `recibo` table. All the data in the column will be lost.
  - You are about to drop the column `id_detalle` on the `recibo` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `recibo` DROP FOREIGN KEY `Recibo_id_detalle_fkey`;

-- AlterTable
ALTER TABLE `recibo` DROP COLUMN `cantidadReembolso`,
    DROP COLUMN `id_detalle`;
