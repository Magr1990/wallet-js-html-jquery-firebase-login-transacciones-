# Wallet Chile 💰

Bienvenido a **Wallet Chile**, una aplicación web de billetera digital simulada que permite gestionar saldo, realizar transferencias, depósitos y pagos de servicios. Este proyecto utiliza tecnologías web estándar y se integra con **Firebase** para la autenticación de usuarios y el almacenamiento de transacciones en tiempo real.

## 🚀 Características Principales

*   **Autenticación Segura**: Registro e inicio de sesión de usuarios utilizando **Firebase Authentication** (Correo/Contraseña).
*   **Saldo en Tiempo Real**: Visualización del saldo de la cuenta corriente actualizado al instante.
*   **Transferencias**: Envío de dinero a contactos simulados, guardando el historial en la nube (Firestore).
*   **Depósitos**: Simulación de carga de saldo con verificación de seguridad (código SMS simulado).
*   **Historial de Movimientos**: Listado de transacciones (depósitos, compras, transferencias) filtrable y ordenado por fecha, leyendo directamente desde la base de datos.
*   **Productos Financieros**:
    *   **Línea de Crédito**: Visualización de cupo utilizado/disponible y funcionalidad de pago de deuda.
    *   **Tarjeta de Crédito**: Visualización de cupo nacional (CLP) e internacional (USD), con simulación de seguridad (CVV oculto tras clave) y pagos.
*   **Pago de Servicios**: Interfaz para pago de cuentas básicas (Luz, Agua, etc.) y recargas.

## 🛠️ Tecnologías Utilizadas

*   **Frontend**: HTML5, CSS3.
*   **Frameworks y Librerías**:
    *   [jQuery](https://jquery.com/) (Manipulación del DOM y lógica de eventos).
    *   [Bootstrap 5](https://getbootstrap.com/) (Diseño responsivo, modales y componentes UI).
*   **Backend as a Service (BaaS)**:
    *   **Firebase Authentication**: Gestión de identidad y sesiones.
    *   **Firebase Firestore**: Base de datos NoSQL para persistencia de transacciones y usuarios.

## 📋 Instalación y Configuración

Para ejecutar este proyecto localmente, sigue estos pasos:

1.  **Clonar el repositorio** (o descargar los archivos):
    ```bash
    git clone https://github.com/tu-usuario/wallet-chile.git
    ```

2.  **Configurar Firebase**:
    *   Crea un nuevo proyecto en [Firebase Console](https://console.firebase.google.com/).
    *   Habilita **Authentication** y activa el proveedor de "Correo electrónico/Contraseña".
    *   Crea una base de datos en **Firestore Database**.
    *   Obtén tus credenciales de configuración web (`apiKey`, `projectId`, etc.) desde la configuración del proyecto.

3.  **Actualizar Credenciales en el Código**:
    *   Abre los archivos `.html` principales (`login.html`, `menu.html`, `sendmoney.html`, etc.).
    *   Busca la constante `firebaseConfig` y reemplázala con tus propias credenciales:

    ```javascript
    const firebaseConfig = {
        apiKey: "TU_API_KEY",
        authDomain: "TU_PROYECTO.firebaseapp.com",
        projectId: "TU_PROYECTO",
        // ... resto de tus credenciales
    };
    ```

4.  **Ejecutar**:
    *   Abre el archivo `login.html` en tu navegador web.
    *   ¡Regístrate con un correo nuevo y comienza a usar la Wallet!

## 👤 Autor

Desarrollado por **Miguel Gonzalez Roblero**.

---
*Este proyecto es una aplicación de demostración con fines educativos.*
