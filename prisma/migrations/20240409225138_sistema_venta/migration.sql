-- CreateTable
CREATE TABLE `Recibo` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `fecha_creacion` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `id_venta` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Recibo` ADD CONSTRAINT `Recibo_id_venta_fkey` FOREIGN KEY (`id_venta`) REFERENCES `Venta`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
