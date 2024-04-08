/*
  Warnings:

  - You are about to drop the column `empleadoId` on the `venta` table. All the data in the column will be lost.
  - You are about to drop the `empleado` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `venta` DROP FOREIGN KEY `venta_empleadoId_fkey`;

-- AlterTable
ALTER TABLE `venta` DROP COLUMN `empleadoId`,
    ADD COLUMN `usuarioId` INTEGER NULL;

-- DropTable
DROP TABLE `empleado`;

-- AddForeignKey
ALTER TABLE `venta` ADD CONSTRAINT `venta_usuarioId_fkey` FOREIGN KEY (`usuarioId`) REFERENCES `usuario`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
