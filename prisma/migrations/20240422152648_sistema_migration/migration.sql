-- AlterTable
ALTER TABLE `articulo` ADD COLUMN `representacion` VARCHAR(191) NOT NULL DEFAULT 'color',
    MODIFY `color` VARCHAR(255) NULL;
