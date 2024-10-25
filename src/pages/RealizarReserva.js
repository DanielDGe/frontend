// src/pages/RealizarReserva.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const RealizarReserva = () => {
    const [habitaciones, setHabitaciones] = useState([]);
    const [clientes, setClientes] = useState([]);
    const [reservas, setReservas] = useState([]);
    const [clienteId, setClienteId] = useState('');
    const [habitacionId, setHabitacionId] = useState('');
    const [fechaEntrada, setFechaEntrada] = useState('');
    const [fechaSalida, setFechaSalida] = useState('');

    useEffect(() => {
        // Cargar las habitaciones desde la base de datos
        axios.get('http://192.168.50.106:3001/habitaciones')
            .then(response => {
                setHabitaciones(response.data.habitaciones);
            })
            .catch(error => {
                console.error('Error al obtener las habitaciones:', error);
            });

        // Cargar los clientes desde la base de datos
        axios.get('http://192.168.50.106:3001/clientes')
            .then(response => {
                setClientes(response.data.clientes);
            })
            .catch(error => {
                console.error('Error al obtener los clientes:', error);
            });

        // Cargar las reservas desde la base de datos
        axios.get('http://192.168.50.106:3001/reservas')
            .then(response => {
                setReservas(response.data.reservas);
            })
            .catch(error => {
                console.error('Error al obtener las reservas:', error);
            });
    }, []);

    const handleReserva = () => {
        axios.post('http://192.168.50.106:3001/reservas', {
            cliente_id: clienteId,
            habitacion_id: habitacionId,
            fecha_entrada: fechaEntrada,
            fecha_salida: fechaSalida
        })
            .then(response => {
                alert('Reserva realizada con éxito');
                // Recargar las reservas después de hacer una nueva reserva
                axios.get('http://192.168.50.106:3001/reservas')
                    .then(response => {
                        setReservas(response.data.reservas);
                    });
                // Limpiar el formulario
                setClienteId('');
                setHabitacionId('');
                setFechaEntrada('');
                setFechaSalida('');
            })
            .catch(error => {
                console.error('Error al realizar la reserva:', error);
            });
    };

    return (
        <div className="container mt-4">
            <h1>Realizar Reserva</h1>
            <div className="card">
                <div className="card-body">
                    <form>
                        <div className="mb-3">
                            <label className="form-label">Seleccionar Cliente</label>
                            <select className="form-control" value={clienteId} onChange={e => setClienteId(e.target.value)}>
                                <option value="">Seleccione un cliente</option>
                                {clientes.map(cliente => (
                                    <option key={cliente.id} value={cliente.id}>
                                        {cliente.nombre} {cliente.apellido}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Seleccionar Habitación</label>
                            <select className="form-control" value={habitacionId} onChange={e => setHabitacionId(e.target.value)}>
                                <option value="">Seleccione una habitación</option>
                                {habitaciones.map(habitacion => (
                                    <option key={habitacion.id} value={habitacion.id}>
                                        {habitacion.numero_habitacion} - {habitacion.tipo_habitacion}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Fecha de Entrada</label>
                            <input type="date" className="form-control" value={fechaEntrada} onChange={e => setFechaEntrada(e.target.value)} />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Fecha de Salida</label>
                            <input type="date" className="form-control" value={fechaSalida} onChange={e => setFechaSalida(e.target.value)} />
                        </div>

                        <button type="button" className="btn btn-primary" onClick={handleReserva}>Reservar</button>
                    </form>
                </div>
            </div>

            {/* Mostrar las reservas realizadas */}
            <div className="mt-4">
                <h2>Reservas Realizadas</h2>
                <div className="row">
                    {reservas.map(reserva => (
                        <div className="col-md-4" key={reserva.id}>
                            <div className="card mb-4 shadow-sm">
                                <div className="card-body">
                                    <h5 className="card-title">Reserva {reserva.id}</h5>
                                    <p className="card-text">Cliente ID: {reserva.cliente_id}</p>
                                    <p className="card-text">Habitación ID: {reserva.habitacion_id}</p>
                                    <p className="card-text">Fecha de entrada: {reserva.fecha_entrada}</p>
                                    <p className="card-text">Fecha de salida: {reserva.fecha_salida}</p>
                                    <p className="card-text">Estado: {reserva.estado}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default RealizarReserva;
