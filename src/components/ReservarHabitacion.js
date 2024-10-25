// src/ReservarHabitacion.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ReservarHabitacion = () => {
    const [habitaciones, setHabitaciones] = useState([]);
    const [clienteId, setClienteId] = useState('');
    const [habitacionId, setHabitacionId] = useState('');
    const [fechaEntrada, setFechaEntrada] = useState('');
    const [fechaSalida, setFechaSalida] = useState('');

    useEffect(() => {
        // Cargar habitaciones disponibles
        axios.get('http://localhost:3001/habitaciones')
            .then(response => {
                setHabitaciones(response.data.habitaciones);
            })
            .catch(error => {
                console.error('Hubo un error al cargar las habitaciones:', error);
            });
    }, []);

    const reservarHabitacion = () => {
        axios.post('http://localhost:3001/reservas', {
            cliente_id: clienteId,
            habitacion_id: habitacionId,
            fecha_entrada: fechaEntrada,
            fecha_salida: fechaSalida
        })
            .then(response => {
                alert('Reserva realizada con éxito');
            })
            .catch(error => {
                console.error('Hubo un error al crear la reserva:', error);
            });
    };

    return (
        <div>
            <h1>Reservar una Habitación</h1>
            <label>Cliente ID</label>
            <input type="text" value={clienteId} onChange={(e) => setClienteId(e.target.value)} />

            <label>Habitación</label>
            <select value={habitacionId} onChange={(e) => setHabitacionId(e.target.value)}>
                {habitaciones.map((habitacion) => (
                    <option key={habitacion.id} value={habitacion.id}>
                        {habitacion.numero_habitacion} - {habitacion.tipo_habitacion} - ${habitacion.precio_por_noche}
                    </option>
                ))}
            </select>

            <label>Fecha de Entrada</label>
            <input type="date" value={fechaEntrada} onChange={(e) => setFechaEntrada(e.target.value)} />

            <label>Fecha de Salida</label>
            <input type="date" value={fechaSalida} onChange={(e) => setFechaSalida(e.target.value)} />

            <button onClick={reservarHabitacion}>Reservar</button>
        </div>
    );
};

export default ReservarHabitacion;
