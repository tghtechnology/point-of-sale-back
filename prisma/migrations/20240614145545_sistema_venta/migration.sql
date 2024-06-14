-- CreateTable
CREATE TABLE `puntoDeVenta` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(255) NOT NULL,
    `propietario` VARCHAR(255) NOT NULL,
    `fecha_creacion` DATETIME(3) NOT NULL,
    `estado` BOOLEAN NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `categoria` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(255) NOT NULL,
    `color` ENUM('Rojo', 'Verde_limon', 'Azul', 'Amarillo', 'Turquesa', 'Fucsia', 'Gris_claro', 'Gris_oscuro') NOT NULL,
    `estado` BOOLEAN NOT NULL,
    `id_puntoDeVenta` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `descuento` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(255) NOT NULL,
    `tipo_descuento` ENUM('PORCENTAJE', 'MONTO') NOT NULL,
    `valor` DECIMAL(10, 2) NOT NULL,
    `valor_calculado` DECIMAL(10, 2) NOT NULL,
    `estado` BOOLEAN NOT NULL,
    `id_puntoDeVenta` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Impuesto` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(255) NOT NULL,
    `tasa` DECIMAL(10, 2) NOT NULL,
    `tipo_impuesto` ENUM('Incluido_en_el_precio', 'Anadido_al_precio') NOT NULL,
    `estado` BOOLEAN NOT NULL,
    `id_puntoDeVenta` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `usuario` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(255) NULL,
    `email` VARCHAR(255) NOT NULL,
    `cargo` VARCHAR(255) NULL,
    `telefono` VARCHAR(255) NULL,
    `password` VARCHAR(255) NOT NULL,
    `nombreNegocio` VARCHAR(255) NULL,
    `pais` VARCHAR(255) NULL,
    `rol` ENUM('Admin', 'Propietario', 'Empleado') NOT NULL,
    `estado` BIT(1) NOT NULL,
    `eliminado_temporal_fecha` DATETIME(3) NULL,
    `fecha_creacion` DATETIME(3) NOT NULL,
    `fecha_modificacion` DATETIME(3) NULL,
    `id_puntoDeVenta` INTEGER NULL,

    UNIQUE INDEX `usuario_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `articulo` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(255) NOT NULL,
    `tipo_venta` ENUM('Peso', 'Unidad') NOT NULL,
    `precio` DECIMAL(10, 2) NULL,
    `ref` VARCHAR(255) NOT NULL,
    `representacion` VARCHAR(191) NOT NULL DEFAULT 'color',
    `color` ENUM('Rojo', 'Verde_limon', 'Azul', 'Amarillo', 'Turquesa', 'Fucsia', 'Gris_claro', 'Gris_oscuro') NULL,
    `imagen` VARCHAR(255) NULL,
    `id_categoria` INTEGER NULL,
    `estado` BOOLEAN NOT NULL,
    `id_puntoDeVenta` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `reset_tokens` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `token` VARCHAR(255) NOT NULL,
    `expiracion` DATETIME(3) NOT NULL,
    `usuario_id` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `sesion` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `usuario_id` INTEGER NOT NULL,
    `token` VARCHAR(255) NOT NULL,
    `expiracion` DATETIME(3) NOT NULL,
    `id_puntoDeVenta` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `cliente` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(255) NOT NULL,
    `email` VARCHAR(255) NOT NULL,
    `telefono` VARCHAR(255) NOT NULL,
    `direccion` VARCHAR(255) NULL,
    `ciudad` VARCHAR(255) NULL,
    `region` VARCHAR(255) NULL,
    `pais` VARCHAR(255) NULL,
    `fecha_creacion` DATETIME(3) NOT NULL,
    `fecha_modificacion` DATETIME(3) NULL,
    `estado` BOOLEAN NOT NULL,
    `id_puntoDeVenta` INTEGER NULL,

    UNIQUE INDEX `cliente_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Recibo` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `fecha_creacion` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `ref` VARCHAR(100) NOT NULL,
    `monto_reembolsado` DECIMAL(10, 2) NULL,
    `id_venta` INTEGER NOT NULL,
    `id_puntoDeVenta` INTEGER NULL,
    `valorDescuentoTotal` DECIMAL(10, 2) NULL,
    `valorImpuestoTotal` DECIMAL(10, 2) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `detalleVenta` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `cantidad` INTEGER NOT NULL,
    `subtotal` DECIMAL(10, 2) NOT NULL,
    `cantidadReembolsadaTotal` INTEGER NOT NULL DEFAULT 0,
    `articuloId` INTEGER NOT NULL,
    `ventaId` INTEGER NOT NULL,
    `id_puntoDeVenta` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Venta` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `subtotal` DECIMAL(10, 2) NOT NULL,
    `total` DECIMAL(10, 2) NOT NULL,
    `vDescuento` DECIMAL(10, 2) NULL,
    `VImpuesto` DECIMAL(10, 2) NULL,
    `tipoPago` ENUM('Efectivo', 'Tarjeta') NOT NULL,
    `dineroRecibido` DECIMAL(10, 2) NULL,
    `cambio` DECIMAL(10, 2) NULL,
    `impuestoId` INTEGER NULL,
    `descuentoId` INTEGER NULL,
    `clienteId` INTEGER NULL,
    `usuarioId` INTEGER NOT NULL,
    `id_puntoDeVenta` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `DetalleReembolso` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `articuloId` INTEGER NOT NULL,
    `reciboId` INTEGER NOT NULL,
    `cantidadDevuelta` INTEGER NOT NULL,
    `subtotal` DECIMAL(10, 2) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `categoria` ADD CONSTRAINT `categoria_id_puntoDeVenta_fkey` FOREIGN KEY (`id_puntoDeVenta`) REFERENCES `puntoDeVenta`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `descuento` ADD CONSTRAINT `descuento_id_puntoDeVenta_fkey` FOREIGN KEY (`id_puntoDeVenta`) REFERENCES `puntoDeVenta`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Impuesto` ADD CONSTRAINT `Impuesto_id_puntoDeVenta_fkey` FOREIGN KEY (`id_puntoDeVenta`) REFERENCES `puntoDeVenta`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `usuario` ADD CONSTRAINT `usuario_id_puntoDeVenta_fkey` FOREIGN KEY (`id_puntoDeVenta`) REFERENCES `puntoDeVenta`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `articulo` ADD CONSTRAINT `articulo_id_categoria_fkey` FOREIGN KEY (`id_categoria`) REFERENCES `categoria`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `articulo` ADD CONSTRAINT `articulo_id_puntoDeVenta_fkey` FOREIGN KEY (`id_puntoDeVenta`) REFERENCES `puntoDeVenta`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `reset_tokens` ADD CONSTRAINT `reset_tokens_usuario_id_fkey` FOREIGN KEY (`usuario_id`) REFERENCES `usuario`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `sesion` ADD CONSTRAINT `sesion_usuario_id_fkey` FOREIGN KEY (`usuario_id`) REFERENCES `usuario`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `sesion` ADD CONSTRAINT `sesion_id_puntoDeVenta_fkey` FOREIGN KEY (`id_puntoDeVenta`) REFERENCES `puntoDeVenta`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `cliente` ADD CONSTRAINT `cliente_id_puntoDeVenta_fkey` FOREIGN KEY (`id_puntoDeVenta`) REFERENCES `puntoDeVenta`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Recibo` ADD CONSTRAINT `Recibo_id_venta_fkey` FOREIGN KEY (`id_venta`) REFERENCES `Venta`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Recibo` ADD CONSTRAINT `Recibo_id_puntoDeVenta_fkey` FOREIGN KEY (`id_puntoDeVenta`) REFERENCES `puntoDeVenta`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `detalleVenta` ADD CONSTRAINT `detalleVenta_articuloId_fkey` FOREIGN KEY (`articuloId`) REFERENCES `articulo`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `detalleVenta` ADD CONSTRAINT `detalleVenta_ventaId_fkey` FOREIGN KEY (`ventaId`) REFERENCES `Venta`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `detalleVenta` ADD CONSTRAINT `detalleVenta_id_puntoDeVenta_fkey` FOREIGN KEY (`id_puntoDeVenta`) REFERENCES `puntoDeVenta`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Venta` ADD CONSTRAINT `Venta_impuestoId_fkey` FOREIGN KEY (`impuestoId`) REFERENCES `Impuesto`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Venta` ADD CONSTRAINT `Venta_descuentoId_fkey` FOREIGN KEY (`descuentoId`) REFERENCES `descuento`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Venta` ADD CONSTRAINT `Venta_clienteId_fkey` FOREIGN KEY (`clienteId`) REFERENCES `cliente`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Venta` ADD CONSTRAINT `Venta_usuarioId_fkey` FOREIGN KEY (`usuarioId`) REFERENCES `usuario`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Venta` ADD CONSTRAINT `Venta_id_puntoDeVenta_fkey` FOREIGN KEY (`id_puntoDeVenta`) REFERENCES `puntoDeVenta`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `DetalleReembolso` ADD CONSTRAINT `DetalleReembolso_articuloId_fkey` FOREIGN KEY (`articuloId`) REFERENCES `articulo`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `DetalleReembolso` ADD CONSTRAINT `DetalleReembolso_reciboId_fkey` FOREIGN KEY (`reciboId`) REFERENCES `Recibo`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
