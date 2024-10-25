// src/pages/Reservas.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import dayjs from 'dayjs';  // Vamos a usar dayjs para calcular la diferencia de días

const Reservas = () => {
    const [reservas, setReservas] = useState([]);

    useEffect(() => {
        // Cargar las reservas desde la base de datos
        axios.get('http://192.168.50.106:3001/reservas')
            .then(response => {
                setReservas(response.data.reservas);
            })
            .catch(error => {
                console.error('Error al obtener las reservas:', error);
            });
    }, []);

    const calcularPrecioTotal = (precioPorNoche, fechaEntrada, fechaSalida) => {
        const entrada = dayjs(fechaEntrada);
        const salida = dayjs(fechaSalida);
        const dias = salida.diff(entrada, 'day');  // Calcular la diferencia en días
        return dias * precioPorNoche;
    };

    return (
        <div className="container mt-4">
            <h1>Reservas Realizadas</h1>
            <div className="row">
                {reservas.map(reserva => (
                    <div className="col-md-4" key={reserva.id}>
                        <div className="card mb-4 shadow-sm">
                            <div className="card-body">
                                <h5 className="card-title">Reserva #{reserva.id}</h5>
                                <p className="card-text">Cliente: {reserva.nombre} {reserva.apellido}</p>
                                <p className="card-text">Habitación: {reserva.numero_habitacion} - {reserva.tipo_habitacion}</p>
                                <p className="card-text">Fecha de entrada: {reserva.fecha_entrada}</p>
                                <p className="card-text">Fecha de salida: {reserva.fecha_salida}</p>
                                <p className="card-text">Estado: {reserva.estado}</p>
                                <p className="card-text">
                                    Precio total: $
                                    {calcularPrecioTotal(reserva.precio_por_noche, reserva.fecha_entrada, reserva.fecha_salida)}
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Reservas;
