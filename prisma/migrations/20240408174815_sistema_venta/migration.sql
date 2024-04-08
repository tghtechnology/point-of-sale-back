-- CreateTable
CREATE TABLE `categoria` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(255) NOT NULL,
    `color` VARCHAR(255) NOT NULL,
    `estado` BOOLEAN NOT NULL,

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

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Impuesto` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(255) NOT NULL,
    `tasa` DECIMAL(10, 2) NOT NULL,
    `tipo_impuesto` ENUM('Incluido_en_el_precio', 'Anadido_al_precio') NOT NULL,
    `estado` BOOLEAN NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `empleado` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(255) NOT NULL,
    `correo` VARCHAR(255) NOT NULL,
    `telefono` VARCHAR(255) NOT NULL,
    `cargo` VARCHAR(255) NOT NULL,
    `estado` BOOLEAN NOT NULL,

    UNIQUE INDEX `empleado_correo_key`(`correo`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `usuario` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(255) NOT NULL,
    `email` VARCHAR(255) NOT NULL,
    `password` VARCHAR(255) NOT NULL,
    `pais` VARCHAR(255) NULL,
    `rol` ENUM('Propietario', 'Empleado') NOT NULL,
    `estado` BIT(1) NOT NULL,
    `eliminado_temporal_fecha` DATETIME(3) NULL,

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
    `color` VARCHAR(255) NOT NULL,
    `imagen` VARCHAR(191) NULL,
    `id_categoria` INTEGER NULL,
    `estado` BOOLEAN NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `imagen` (
    `public_id` VARCHAR(191) NOT NULL,
    `secure_url` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `imagen_secure_url_key`(`secure_url`),
    PRIMARY KEY (`public_id`)
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

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `cliente` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(255) NOT NULL,
    `email` VARCHAR(255) NOT NULL,
    `telefono` VARCHAR(255) NOT NULL,
    `direccion` VARCHAR(255) NOT NULL,
    `ciudad` VARCHAR(255) NOT NULL,
    `region` VARCHAR(255) NOT NULL,
    `codigo_postal` VARCHAR(255) NOT NULL,
    `pais` VARCHAR(255) NOT NULL,
    `estado` BOOLEAN NOT NULL,

    UNIQUE INDEX `cliente_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

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
    `tipoPago` ENUM('EFECTIVO', 'TARJETA') NOT NULL,
    `impuestoId` INTEGER NULL,
    `descuentoId` INTEGER NULL,
    `clienteId` INTEGER NULL,
    `empleadoId` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `articulo` ADD CONSTRAINT `articulo_id_categoria_fkey` FOREIGN KEY (`id_categoria`) REFERENCES `categoria`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `articulo` ADD CONSTRAINT `articulo_imagen_fkey` FOREIGN KEY (`imagen`) REFERENCES `imagen`(`public_id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `reset_tokens` ADD CONSTRAINT `reset_tokens_usuario_id_fkey` FOREIGN KEY (`usuario_id`) REFERENCES `usuario`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `sesion` ADD CONSTRAINT `sesion_usuario_id_fkey` FOREIGN KEY (`usuario_id`) REFERENCES `usuario`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `detalleVenta` ADD CONSTRAINT `detalleVenta_articuloId_fkey` FOREIGN KEY (`articuloId`) REFERENCES `articulo`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `detalleVenta` ADD CONSTRAINT `detalleVenta_ventaId_fkey` FOREIGN KEY (`ventaId`) REFERENCES `venta`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `venta` ADD CONSTRAINT `venta_impuestoId_fkey` FOREIGN KEY (`impuestoId`) REFERENCES `Impuesto`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `venta` ADD CONSTRAINT `venta_descuentoId_fkey` FOREIGN KEY (`descuentoId`) REFERENCES `descuento`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `venta` ADD CONSTRAINT `venta_clienteId_fkey` FOREIGN KEY (`clienteId`) REFERENCES `cliente`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `venta` ADD CONSTRAINT `venta_empleadoId_fkey` FOREIGN KEY (`empleadoId`) REFERENCES `empleado`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
