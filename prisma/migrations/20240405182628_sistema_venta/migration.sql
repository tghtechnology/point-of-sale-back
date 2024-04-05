-- AlterTable
ALTER TABLE `venta` ADD COLUMN `clienteId` INTEGER NULL,
    ADD COLUMN `empleadoId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `venta` ADD CONSTRAINT `venta_clienteId_fkey` FOREIGN KEY (`clienteId`) REFERENCES `cliente`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `venta` ADD CONSTRAINT `venta_empleadoId_fkey` FOREIGN KEY (`empleadoId`) REFERENCES `empleado`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
