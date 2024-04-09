/*
  Warnings:

  - You are about to alter the column `tipoPago` on the `venta` table. The data in that column could be lost. The data in that column will be cast from `Enum(EnumId(3))` to `VarChar(191)`.
  - Added the required column `dineroRecibido` to the `Venta` table without a default value. This is not possible if the table is not empty.
  - Made the column `clienteId` on table `venta` required. This step will fail if there are existing NULL values in that column.
  - Made the column `usuarioId` on table `venta` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `venta` DROP FOREIGN KEY `venta_clienteId_fkey`;

-- DropForeignKey
ALTER TABLE `venta` DROP FOREIGN KEY `venta_descuentoId_fkey`;

-- DropForeignKey
ALTER TABLE `venta` DROP FOREIGN KEY `venta_impuestoId_fkey`;

-- DropForeignKey
ALTER TABLE `venta` DROP FOREIGN KEY `venta_usuarioId_fkey`;

-- AlterTable
ALTER TABLE `venta` ADD COLUMN `cambio` DOUBLE NULL,
    ADD COLUMN `dineroRecibido` DOUBLE NOT NULL,
    MODIFY `tipoPago` VARCHAR(191) NOT NULL,
    MODIFY `clienteId` INTEGER NOT NULL,
    MODIFY `usuarioId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `Venta` ADD CONSTRAINT `Venta_impuestoId_fkey` FOREIGN KEY (`impuestoId`) REFERENCES `Impuesto`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Venta` ADD CONSTRAINT `Venta_descuentoId_fkey` FOREIGN KEY (`descuentoId`) REFERENCES `descuento`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Venta` ADD CONSTRAINT `Venta_clienteId_fkey` FOREIGN KEY (`clienteId`) REFERENCES `cliente`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Venta` ADD CONSTRAINT `Venta_usuarioId_fkey` FOREIGN KEY (`usuarioId`) REFERENCES `usuario`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
