-- DropForeignKey
ALTER TABLE `articulo` DROP FOREIGN KEY `articulo_nombre_categoria_fkey`;

-- AlterTable
ALTER TABLE `articulo` MODIFY `nombre_categoria` VARCHAR(255) NULL DEFAULT 'Sin categoría';

-- AddForeignKey
ALTER TABLE `articulo` ADD CONSTRAINT `articulo_nombre_categoria_fkey` FOREIGN KEY (`nombre_categoria`) REFERENCES `categoria`(`nombre`) ON DELETE SET NULL ON UPDATE CASCADE;
