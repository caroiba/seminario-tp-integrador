
const getProductos = async (req, res) => {
    try {
        const productos = await req.context.models.Producto.findAll();
        res.json(productos);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getProductoById = async (req, res) => {
    try {
        const producto = await req.context.models.Producto.findByPk(req.params.id);
        if (!producto) return res.status(404).json({ error: 'Producto no encontrado' });
        res.json(producto);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const createProducto = async (req, res) => {
    try {
        const { nombre, descripcion, precio, stock } = req.body;
        if (!nombre || precio === undefined) return res.status(400).json({ error: 'Nombre y precio son obligatorios' });

        const nuevoProducto = await req.context.models.Producto.create({ nombre, descripcion, precio, stock });
        res.status(201).json(nuevoProducto);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const updateProducto = async (req, res) => {
    try {
        const { nombre, descripcion, precio, stock } = req.body;
        if (!nombre || precio === undefined) return res.status(400).json({ error: 'Nombre y precio son obligatorios' });

        const producto = await req.context.models.Producto.findByPk(req.params.id);
        if (!producto) return res.status(404).json({ error: 'Producto no encontrado' });

        await producto.update({ nombre, descripcion, precio, stock });
        res.json(producto);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const deleteProducto = async (req, res) => {
    try {
        const producto = await req.context.models.Producto.findByPk(req.params.id);
        if (!producto) return res.status(404).json({ error: 'Producto no encontrado' });

        await producto.destroy();
        res.json({ mensaje: 'Producto eliminado' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    getProductos,
    getProductoById,
    createProducto,
    updateProducto,
    deleteProducto,
};
