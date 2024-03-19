/*
  Warnings:

  - Made the column `nombre_categoria` on table `articulo` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `articulo` DROP FOREIGN KEY `articulo_nombre_categoria_fkey`;

-- AlterTable
ALTER TABLE `articulo` MODIFY `nombre_categoria` VARCHAR(255) NOT NULL DEFAULT 'Sin categoría';

-- AddForeignKey
ALTER TABLE `articulo` ADD CONSTRAINT `articulo_nombre_categoria_fkey` FOREIGN KEY (`nombre_categoria`) REFERENCES `categoria`(`nombre`) ON DELETE RESTRICT ON UPDATE CASCADE;
