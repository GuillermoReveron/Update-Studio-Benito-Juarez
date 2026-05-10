// CONFIGURACIÓN: Aquí va el link de tu planilla (el que termina en /exec)
const urlAPI = 'PEGAR_AQUI_EL_LINK_DE_GOOGLE_APPS_SCRIPT';

async function cargarProductos() {
    const contenedor = document.getElementById('contenedor-productos');
    contenedor.innerHTML = '<p>Cargando productos...</p>';

    try {
        const respuesta = await fetch(urlAPI);
        const data = await respuesta.json();
        const productos = data.productos;

        contenedor.innerHTML = ''; // Limpiamos el mensaje de carga

        productos.forEach(prod => {
            const tarjeta = document.createElement('div');
            tarjeta.className = 'tarjeta-producto';
            tarjeta.innerHTML = `
                <img src="${prod.img}" alt="${prod.nombre}">
                <h3>${prod.nombre}</h3>
                <p>${prod.descripcion}</p>
                <p><strong>$${prod.precio}</strong></p>
                <a href="https://wa.me/5492281310771?text=Hola, quiero pedir: ${prod.nombre}" class="btn-pago">Pedir por WhatsApp</a>
            `;
            contenedor.appendChild(tarjeta);
        });
    } catch (error) {
        contenedor.innerHTML = '<p>Error al cargar los productos. Revisa la conexión.</p>';
        console.error("Error:", error);
    }
}

// Ejecutar la carga cuando abre la página
window.onload = cargarProductos;