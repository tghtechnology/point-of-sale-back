-- CreateTable
CREATE TABLE `detalleVenta` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `cantidad` INTEGER NOT NULL,
    `subtotal` DOUBLE NOT NULL,
    `articuloId` INTEGER NOT NULL,
    `ventaId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `venta` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `subtotal` DOUBLE NOT NULL,
    `total` DOUBLE NOT NULL,
    `impuestoId` INTEGER NULL,
    `descuentoId` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `detalleVenta` ADD CONSTRAINT `detalleVenta_articuloId_fkey` FOREIGN KEY (`articuloId`) REFERENCES `articulo`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `detalleVenta` ADD CONSTRAINT `detalleVenta_ventaId_fkey` FOREIGN KEY (`ventaId`) REFERENCES `venta`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `venta` ADD CONSTRAINT `venta_impuestoId_fkey` FOREIGN KEY (`impuestoId`) REFERENCES `Impuesto`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `venta` ADD CONSTRAINT `venta_descuentoId_fkey` FOREIGN KEY (`descuentoId`) REFERENCES `descuento`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
