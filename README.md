# 💼 Wallet Chile - Billetera Digital

Una aplicación web de billetera digital moderna y responsiva, desarrollada para simular operaciones bancarias básicas como depósitos, transferencias y revisión de historial de movimientos.

## 📝 Descripción

Este proyecto es una simulación de una billetera virtual ("Wallet Chile") que permite a los usuarios gestionar su saldo y realizar transacciones. El sistema utiliza **LocalStorage** para persistir los datos (saldo y transacciones) entre las diferentes pantallas, ofreciendo una experiencia de usuario fluida y realista sin necesidad de un backend.

## 🚀 Características Principales

*   **Inicio de Sesión:** Validación de campos y redirección segura.
*   **Persistencia de Datos:** El saldo y el historial de transacciones se guardan en el navegador del usuario.
*   **Depósitos:**
    *   Simulación de diferentes orígenes (Cajero, Transferencia, Sucursal).
    *   **Verificación de Seguridad:** Simulación de código SMS para confirmar transacciones.
*   **Transferencias:**
    *   Gestión de agenda de contactos (Agregar/Buscar).
    *   Validación de saldo insuficiente.
    *   Selección de bancos chilenos reales.
*   **Historial de Movimientos:**
    *   Visualización de transacciones recientes.
    *   Filtros dinámicos por tipo de movimiento (Depósitos, Compras, Transferencias).
*   **Diseño Responsivo:** Interfaz adaptable a dispositivos móviles y escritorio utilizando **Bootstrap 5**.

## 🛠️ Tecnologías Utilizadas

*   **HTML5:** Estructura semántica de las pantallas.
*   **CSS3:** Estilos personalizados y variables CSS para la identidad de marca.
*   **Bootstrap 5.3:** Framework para el diseño responsivo, componentes (alertas, tarjetas, modales) y utilidades.
*   **JavaScript (ES6):** Lógica de negocio y manipulación del DOM.
*   **jQuery 3.6.0:** Simplificación de selectores, manejo de eventos y animaciones.

## 📂 Estructura del Proyecto

```text
wallet-chile/
│
├── login.html          # Pantalla de inicio de sesión
├── menu.html           # Menú principal (Dashboard)
├── deposit.html        # Pantalla de depósitos
├── sendmoney.html      # Pantalla de transferencias y contactos
├── transactions.html   # Historial de movimientos
├── css.css             # Estilos personalizados
└── README.md           # Documentación del proyecto
```

## 🔧 Instalación y Uso

1.  **Clonar el repositorio:**
    ```bash
    git clone https://github.com/tu-usuario/wallet-chile.git
    ```
2.  **Ejecutar:**
    *   Navega a la carpeta del proyecto.
    *   Abre el archivo `login.html` en tu navegador web favorito (Chrome, Firefox, Edge).

3.  **Credenciales de prueba:**
    *   Puedes ingresar cualquier correo y contraseña para acceder (validación simulada).

## 💡 Detalles de Implementación

*   **Manejo del DOM:** Se utiliza jQuery (`$`) para capturar eventos de formularios y botones, haciendo el código más conciso.
*   **Almacenamiento:** Se utiliza `localStorage.setItem` y `getItem` para mantener el estado de la billetera (saldo `walletBalance` y lista `walletTransactions`) a través de las recargas de página.
*   **Seguridad Simulada:** Implementación de lógica para generar códigos aleatorios y validarlos en el frontend para simular autenticación de dos factores (2FA).

## 👤 Autor

**Miguel Gonzalez Roblero**

---
*Desarrollado como parte de un desafío de desarrollo web frontend.*
