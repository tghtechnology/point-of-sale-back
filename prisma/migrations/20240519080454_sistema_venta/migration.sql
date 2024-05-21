-- AlterTable
ALTER TABLE `detalleventa` ADD COLUMN `id_reembolso` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `detalleVenta` ADD CONSTRAINT `detalleVenta_id_reembolso_fkey` FOREIGN KEY (`id_reembolso`) REFERENCES `Recibo`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
