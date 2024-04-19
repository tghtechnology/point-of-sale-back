-- DropForeignKey
ALTER TABLE `articulo` DROP FOREIGN KEY `articulo_imagen_fkey`;

-- AlterTable
ALTER TABLE `articulo` MODIFY `imagen` VARCHAR(255) NULL;
