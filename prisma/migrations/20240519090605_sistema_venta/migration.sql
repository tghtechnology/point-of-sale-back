-- AlterTable
ALTER TABLE `recibo` ADD COLUMN `id_detalle` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `Recibo` ADD CONSTRAINT `Recibo_id_detalle_fkey` FOREIGN KEY (`id_detalle`) REFERENCES `detalleVenta`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
