/*
  Warnings:

  - You are about to drop the column `id_categoria` on the `articulo` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `articulo` DROP FOREIGN KEY `articulo_id_categoria_fkey`;

-- AlterTable
ALTER TABLE `articulo` DROP COLUMN `id_categoria`,
    ADD COLUMN `nombre_categoria` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `articulo` ADD CONSTRAINT `articulo_nombre_categoria_fkey` FOREIGN KEY (`nombre_categoria`) REFERENCES `categoria`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
