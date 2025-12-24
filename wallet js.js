
let usuarios = [
    { username: "juan.perez", password: "clave123", nombre: "Juan Pérez" },
    { username: "maria.gonzalez", password: "chile2024", nombre: "María González" }
];

 let billetera = {
    saldo: 250000,
    movimientos: [
        { id: 3, tipo: "deposito", monto: 200000, descripcion: "Depósito desde cuenta corriente", fecha: "2024-01-15", contacto: null },
        { id: 2, tipo: "envio", monto: -50000, descripcion: "Transferencia a Pedro Sánchez", fecha: "2024-01-12", contacto: "Pedro Sánchez" },
        { id: 1, tipo: "deposito", monto: 100000, descripcion: "Depósito inicial", fecha: "2024-01-10", contacto: null }
    ],
    contactos: [
        { id: 1, nombre: "Pedro Sánchez", numeroCuenta: "123456789", alias: "pedro.sanchez", banco: "Banco de Chile" },
        { id: 2, nombre: "Ana López", numeroCuenta: "987654321", alias: "ana.lopez", banco: "Banco Estado" },
        { id: 3, nombre: "Carlos Rodríguez", numeroCuenta: "1122334455", alias: "carlos.rdz", banco: "Scotiabank Chile" }
    ]
};

let usuarioActual = null;

function formatearMoneda(monto) {
    return `$${Math.abs(monto).toLocaleString('es-CL')}`;
}

function obtenerFechaActual() {
    const ahora = new Date();
    return ahora.toISOString().split('T')[0];
}

function guardarEnStorage() {
    localStorage.setItem('billeteraChilena', JSON.stringify(billetera));
    localStorage.setItem('usuarioActual', JSON.stringify(usuarioActual));
}

function cargarDesdeStorage() {
    const datosGuardados = localStorage.getItem('billeteraChilena');
    const usuarioGuardado = localStorage.getItem('usuarioActual');
    
    if (datosGuardados) {
        try {
            const datosParsed = JSON.parse(datosGuardados);
            if (datosParsed) billetera = datosParsed;
        } catch (e) {
            console.error("Error al leer datos de la billetera, se usarán los datos por defecto.", e);
        }
    }
    
    if (usuarioGuardado) {
        try {
            const usuarioParsed = JSON.parse(usuarioGuardado);
            if (usuarioParsed) usuarioActual = usuarioParsed;
        } catch (e) {
            console.error("Error al leer usuario actual.", e);
        }
    }
}

function inicializarLogin() {
    const loginForm = document.getElementById('loginForm');
    const mensajeError = document.getElementById('mensajeError');
    
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;
            
            const usuarioValido = usuarios.find(u => 
                u.username === username && u.password === password
            );
            
            if (usuarioValido) {
                usuarioActual = usuarioValido;
                guardarEnStorage();
                
                mensajeError.innerHTML = `
                    <div class="alert alert-success alert-dismissible fade show" role="alert">
                        <strong>¡Inicio de sesión exitoso!</strong> Redirigiendo al menú principal...
                        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                    </div>
                `;
                
                setTimeout(() => {
                    window.location.href = '2.html';
                }, 2000);
            } else {
                mensajeError.innerHTML = `
                    <div class="alert alert-danger alert-dismissible fade show" role="alert">
                        <strong>Error:</strong> Usuario o contraseña incorrectos. 
                        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                    </div>
                `;
            }
        });
    }
}

function inicializarMenu() {
    cargarDesdeStorage();
    
    if (!usuarioActual) {
        window.location.href = '1.html';
        return;
    }
    
    const usuarioNombre = document.getElementById('usuarioNombre');
    if (usuarioNombre) {
        usuarioNombre.textContent = usuarioActual.nombre;
    }
    
    actualizarSaldo();
    
    const botonesMenu = document.querySelectorAll('.btn-menu');
    const mensajeRedireccion = document.getElementById('mensajeRedireccion');
    
    botonesMenu.forEach(boton => {
        boton.addEventListener('click', function() {
            const destino = this.getAttribute('data-destino');
            
            let nombrePantalla = destino;
            if (destino === 'deposit') nombrePantalla = 'Depositar';
            if (destino === 'sendmoney') nombrePantalla = 'Enviar Dinero';
            if (destino === 'transactions') nombrePantalla = 'Últimos Movimientos';
            
            mensajeRedireccion.innerHTML = `
                <div class="alert alert-info alert-dismissible fade show" role="alert">
                    <strong>Redirigiendo a ${nombrePantalla}...</strong>
                    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                </div>
            `;
            
            setTimeout(() => {
                let pagina = `${destino}.html`;
                if (destino === 'deposit') pagina = '3.html';
                if (destino === 'sendmoney') pagina = '4.html';
                if (destino === 'transactions') pagina = '5.html';
                
                window.location.href = pagina;
            }, 1000);
        });
    });
    
    const btnLogout = document.getElementById('btnLogout');
    if (btnLogout) {
        btnLogout.addEventListener('click', function() {
            localStorage.removeItem('usuarioActual');
            window.location.href = '1.html';
        });
    }
}

function actualizarSaldo() {
    const saldoElement = document.getElementById('saldoActual');
    if (saldoElement) {
        saldoElement.textContent = formatearMoneda(billetera.saldo);
    }
}

function inicializarDeposito() {
    cargarDesdeStorage();
    
    if (!usuarioActual) {
        window.location.href = '1.html';
        return;
    }
    
    const depositoForm = document.getElementById('depositoForm');
    const mensajeConfirmacion = document.getElementById('mensajeConfirmacion');
    
    if (depositoForm) {
        depositoForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const monto = parseInt(document.getElementById('montoDeposito').value);
            const descripcion = document.getElementById('descripcionDeposito').value || "Depósito realizado";
            
            if (monto <= 0 || isNaN(monto)) {
                alert("Por favor ingrese un monto válido");
                return;
            }
            
            billetera.saldo += monto;
            
            const nuevoMovimiento = {
                id: Date.now(),
                tipo: "deposito",
                monto: monto,
                descripcion: descripcion,
                fecha: obtenerFechaActual(),
                contacto: null
            };
            
            billetera.movimientos.unshift(nuevoMovimiento);
            guardarEnStorage();
            
            mensajeConfirmacion.innerHTML = `
                <div class="alert alert-success alert-dismissible fade show" role="alert">
                    <strong>¡Depósito exitoso!</strong> Has depositado ${formatearMoneda(monto)} CLP. 
                    Tu nuevo saldo es ${formatearMoneda(billetera.saldo)} CLP.
                    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                </div>
            `;
            
            depositoForm.reset();
            
            actualizarSaldo();
            
            setTimeout(() => {
                window.location.href = '2.html';
            }, 3000);
        });
    }
}

function inicializarEnvioDinero() {
    cargarDesdeStorage();
    
    if (!usuarioActual) {
        window.location.href = '1.html';
        return;
    }
    
    cargarContactos();
    
    const btnAgregarContacto = document.getElementById('btnAgregarContacto');
    if (btnAgregarContacto) {
        btnAgregarContacto.addEventListener('click', mostrarFormularioContacto);
    }
    
    const envioForm = document.getElementById('envioForm');
    if (envioForm) {
        envioForm.addEventListener('submit', procesarEnvio);
    }
    
    const selectContacto = document.getElementById('selectContacto');
    if (selectContacto) {
        selectContacto.addEventListener('change', function() {
            const contactoId = this.value;
            if (contactoId) {
                const contacto = billetera.contactos.find(c => c.id == contactoId);
                if (contacto) {
                    document.getElementById('infoContacto').innerHTML = `
                        <div class="alert alert-info">
                            <strong>${contacto.nombre}</strong><br>
                            Banco: ${contacto.banco}<br>
                            Alias: ${contacto.alias}<br>
                            N° Cuenta: ${contacto.numeroCuenta}
                        </div>
                    `;
                }
            }
        });
    }
}

function cargarContactos() {
    const selectContacto = document.getElementById('selectContacto');
    if (!selectContacto) return;
    
    selectContacto.innerHTML = '<option value="">Seleccione un contacto</option>';
    
    billetera.contactos.forEach(contacto => {
        const option = document.createElement('option');
        option.value = contacto.id;
        option.textContent = `${contacto.nombre} (${contacto.alias})`;
        selectContacto.appendChild(option);
    });
}

function mostrarFormularioContacto() {
    const modalHTML = `
        <div class="modal fade" id="modalContacto" tabindex="-1" aria-labelledby="modalContactoLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content modal-chile">
                    <div class="modal-header">
                        <h5 class="modal-title" id="modalContactoLabel">Agregar Nuevo Contacto</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <form id="formularioContacto">
                            <div class="mb-3">
                                <label for="nombreContacto" class="form-label">Nombre y Apellido *</label>
                                <input type="text" class="form-control" id="nombreContacto" required placeholder="Ej: Francisco Martínez">
                            </div>
                            <div class="mb-3">
                                <label for="numeroCuentaContacto" class="form-label">Número de Cuenta *</label>
                                <input type="text" class="form-control" id="numeroCuentaContacto" required placeholder="Ej: 123456789" pattern="[0-9]+" maxlength="20">
                                <small class="text-muted">Solo números, sin guiones</small>
                            </div>
                            <div class="mb-3">
                                <label for="aliasContacto" class="form-label">Alias *</label>
                                <input type="text" class="form-control" id="aliasContacto" required placeholder="Ej: fran.martinez">
                            </div>
                            <div class="mb-3">
                                <label for="bancoContacto" class="form-label">Banco *</label>
                                <select class="form-select" id="bancoContacto" required>
                                    <option value="">Seleccione un banco</option>
                                    <option value="Banco de Chile">Banco de Chile</option>
                                    <option value="Banco Estado">Banco Estado</option>
                                    <option value="Scotiabank Chile">Scotiabank Chile</option>
                                    <option value="Banco BCI">Banco BCI</option>
                                    <option value="Banco Santander">Banco Santander</option>
                                    <option value="Banco Itaú">Banco Itaú</option>
                                    <option value="Banco Security">Banco Security</option>
                                    <option value="Banco Falabella">Banco Falabella</option>
                                    <option value="Banco Ripley">Banco Ripley</option>
                                    <option value="Otro">Otro</option>
                                </select>
                            </div>
                            <div class="d-grid">
                                <button type="submit" class="btn btn-chile">Guardar Contacto</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    const modalContainer = document.createElement('div');
    modalContainer.innerHTML = modalHTML;
    document.body.appendChild(modalContainer);
    
    const modal = new bootstrap.Modal(document.getElementById('modalContacto'));
    modal.show();
    
    const formularioContacto = document.getElementById('formularioContacto');
    formularioContacto.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const cuentaIngresada = document.getElementById('numeroCuentaContacto').value;
        
        if (billetera.contactos.some(c => c.numeroCuenta === cuentaIngresada)) {
            alert('Error: El Número de Cuenta ingresado ya pertenece a otro contacto.');
            return;
        }
        
        const nuevoContacto = {
            id: Date.now(),
            nombre: document.getElementById('nombreContacto').value,
            numeroCuenta: cuentaIngresada,
            alias: document.getElementById('aliasContacto').value,
            banco: document.getElementById('bancoContacto').value
        };
        
        billetera.contactos.push(nuevoContacto);
        guardarEnStorage();
        
        cargarContactos();
        
        modal.hide();
        
        alert(`Contacto ${nuevoContacto.nombre} agregado exitosamente`);
    });
    
    document.getElementById('modalContacto').addEventListener('hidden.bs.modal', function() {
        document.body.removeChild(modalContainer);
    });
}

function procesarEnvio(e) {
    e.preventDefault();
    
    const contactoId = document.getElementById('selectContacto').value;
    const monto = parseInt(document.getElementById('montoEnvio').value);
    const descripcion = document.getElementById('descripcionEnvio').value || "Transferencia realizada";
    
    if (!contactoId) {
        alert("Por favor seleccione un contacto");
        return;
    }
    
    if (monto <= 0 || isNaN(monto)) {
        alert("Por favor ingrese un monto válido");
        return;
    }
    
    if (monto > billetera.saldo) {
        alert("Saldo insuficiente para realizar esta transferencia");
        return;
    }
    
    const contacto = billetera.contactos.find(c => c.id == contactoId);
    
    if (confirm(`¿Confirmas el envío de ${formatearMoneda(monto)} CLP a ${contacto.nombre}?`)) {
        billetera.saldo -= monto;
        
        const nuevoMovimiento = {
            id: Date.now(),
            tipo: "envio",
            monto: -monto,
            descripcion: descripcion,
            fecha: obtenerFechaActual(),
            contacto: contacto.nombre
        };
        
        billetera.movimientos.unshift(nuevoMovimiento);
        guardarEnStorage();
        
        document.getElementById('mensajeConfirmacion').innerHTML = `
            <div class="alert alert-success alert-dismissible fade show" role="alert">
                <strong>¡Transferencia exitosa!</strong> Has enviado ${formatearMoneda(monto)} CLP a ${contacto.nombre}. 
                Tu nuevo saldo es ${formatearMoneda(billetera.saldo)} CLP.
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>
        `;
        
        document.getElementById('envioForm').reset();
        document.getElementById('infoContacto').innerHTML = '';
        
        actualizarSaldo();
    }
}

function inicializarMovimientos() {
    cargarDesdeStorage();
    
    if (!usuarioActual) {
        window.location.href = '1.html';
        return;
    }
    
    mostrarMovimientos();
}

function mostrarMovimientos() {
    const contenedorMovimientos = document.getElementById('contenedorMovimientos');
    if (!contenedorMovimientos) return;
    
    if (billetera.movimientos.length === 0) {
        contenedorMovimientos.innerHTML = `
            <div class="alert alert-info text-center">
                No hay movimientos registrados aún.
            </div>
        `;
        return;
    }
    
    let html = '';
    
    billetera.movimientos.forEach(movimiento => {
        const esDeposito = movimiento.tipo === 'deposito';
        const icono = esDeposito ? 'arrow-down-circle' : 'arrow-up-circle';
        const color = esDeposito ? 'text-success' : 'text-danger';
        const signo = esDeposito ? '+' : '-';
        
        html += `
            <div class="transaction-item ${esDeposito ? 'transaction-deposit' : 'transaction-withdrawal'}">
                <div class="d-flex justify-content-between align-items-center">
                    <div>
                        <i class="bi bi-${icono} ${color} me-2"></i>
                        <strong>${movimiento.descripcion}</strong>
                        ${movimiento.contacto ? `<br><small class="text-muted">A: ${movimiento.contacto}</small>` : ''}
                    </div>
                    <div class="text-end">
                        <span class="d-block ${color} fw-bold">${signo}${formatearMoneda(movimiento.monto)} CLP</span>
                        <small class="text-muted">${movimiento.fecha}</small>
                    </div>
                </div>
            </div>
        `;
    });
    
    contenedorMovimientos.innerHTML = html;
}

cargarDesdeStorage();

document.addEventListener('DOMContentLoaded', function() {
    console.log("Iniciando Billetera Virtual...");
    const path = window.location.pathname;
    
    if (path.includes('login.html') || path.endsWith('/') || path.includes('index.html') || path.includes('1.html')) {
        inicializarLogin();
    } else if (path.includes('menu.html') || path.includes('2.html')) {
        inicializarMenu();
    } else if (path.includes('deposit.html') || path.includes('3.html')) {
        inicializarDeposito();
    } else if (path.includes('sendmoney.html') || path.includes('4.html')) {
        inicializarEnvioDinero();
    } else if (path.includes('transactions.html') || path.includes('5.html')) {
        inicializarMovimientos();
    }
});