/*
  Warnings:

  - You are about to drop the column `cantidadReembolsada` on the `detalleventa` table. All the data in the column will be lost.
  - You are about to drop the column `id_reembolso` on the `detalleventa` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `detalleventa` DROP FOREIGN KEY `detalleVenta_id_reembolso_fkey`;

-- AlterTable
ALTER TABLE `detalleventa` DROP COLUMN `cantidadReembolsada`,
    DROP COLUMN `id_reembolso`,
    ADD COLUMN `cantidadReembolsadaTotal` INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE `recibo` ADD COLUMN `cantidadReembolso` INTEGER NULL;
