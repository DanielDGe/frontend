// src/pages/Clientes.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Clientes = () => {
    const [clientes, setClientes] = useState([]);
    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [email, setEmail] = useState('');
    const [telefono, setTelefono] = useState('');

    useEffect(() => {
        // Cargar los clientes desde la base de datos
        axios.get('http://192.168.50.106:3001/clientes')
            .then(response => {
                setClientes(response.data.clientes);
            })
            .catch(error => {
                console.error('Error al obtener los clientes:', error);
            });
    }, []);

    // Manejar la creación de nuevos clientes
    const handleCrearCliente = () => {
        axios.post('http://192.168.50.106:3001/clientes', {
            nombre,
            apellido,
            email,
            telefono
        })
            .then(() => {
                // Recargar los clientes después de la creación
                axios.get('http://192.168.50.106:3001/clientes')
                    .then(response => {
                        setClientes(response.data.clientes);
                    });
                // Limpiar el formulario
                setNombre('');
                setApellido('');
                setEmail('');
                setTelefono('');
            })
            .catch(error => {
                console.error('Error al crear el cliente:', error);
            });
    };

    return (
        <div className="container mt-4">
            <h1>Clientes</h1>

            {/* Formulario para crear nuevos clientes */}
            <div className="card mb-4">
                <div className="card-body">
                    <h5 className="card-title">Crear nuevo cliente</h5>
                    <form>
                        <div className="mb-3">
                            <label className="form-label">Nombre</label>
                            <input type="text" className="form-control" value={nombre} onChange={(e) => setNombre(e.target.value)} />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Apellido</label>
                            <input type="text" className="form-control" value={apellido} onChange={(e) => setApellido(e.target.value)} />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Email</label>
                            <input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Teléfono</label>
                            <input type="text" className="form-control" value={telefono} onChange={(e) => setTelefono(e.target.value)} />
                        </div>
                        <button type="button" className="btn btn-primary" onClick={handleCrearCliente}>Crear Cliente</button>
                    </form>
                </div>
            </div>

            {/* Mostrar clientes registrados */}
            <div className="row">
                {clientes.map(cliente => (
                    <div className="col-md-4" key={cliente.id}>
                        <div className="card mb-4 shadow-sm">
                            <div className="card-body">
                                <h5 className="card-title">{cliente.nombre} {cliente.apellido}</h5>
                                <p className="card-text">Email: {cliente.email}</p>
                                <p className="card-text">Teléfono: {cliente.telefono}</p>
                                <p className="card-text">Fecha de registro: {cliente.fecha_registro}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Clientes;
