// src/pages/Habitaciones.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Habitaciones = () => {
    const [habitaciones, setHabitaciones] = useState([]);
    const [numeroHabitacion, setNumeroHabitacion] = useState('');
    const [tipoHabitacion, setTipoHabitacion] = useState('');
    const [precioPorNoche, setPrecioPorNoche] = useState('');

    useEffect(() => {
        // Cargar las habitaciones desde la base de datos
        axios.get('http://192.168.50.106:3001/habitaciones')
            .then(response => {
                setHabitaciones(response.data.habitaciones);
            })
            .catch(error => {
                console.error('Error al obtener las habitaciones:', error);
            });
    }, []);

    // Manejar la creación de nuevas habitaciones
    const handleCrearHabitacion = () => {
        axios.post('http://192.168.50.106:3001/habitaciones', {
            numero_habitacion: numeroHabitacion,
            tipo_habitacion: tipoHabitacion,
            precio_por_noche: precioPorNoche
        })
            .then(() => {
                // Recargar las habitaciones después de la creación
                axios.get('http://192.168.50.106:3001/habitaciones')
                    .then(response => {
                        setHabitaciones(response.data.habitaciones);
                    });
                // Limpiar el formulario
                setNumeroHabitacion('');
                setTipoHabitacion('');
                setPrecioPorNoche('');
            })
            .catch(error => {
                console.error('Error al crear la habitación:', error);
            });
    };

    return (
        <div className="container mt-4">
            <h1>Habitaciones</h1>

            {/* Formulario para crear nuevas habitaciones */}
            <div className="card mb-4">
                <div className="card-body">
                    <h5 className="card-title">Crear nueva habitación</h5>
                    <form>
                        <div className="mb-3">
                            <label className="form-label">Número de Habitación</label>
                            <input type="number" className="form-control" value={numeroHabitacion} onChange={(e) => setNumeroHabitacion(e.target.value)} />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Tipo de Habitación</label>
                            <input type="text" className="form-control" value={tipoHabitacion} onChange={(e) => setTipoHabitacion(e.target.value)} />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Precio por Noche</label>
                            <input type="number" className="form-control" value={precioPorNoche} onChange={(e) => setPrecioPorNoche(e.target.value)} />
                        </div>
                        <button type="button" className="btn btn-primary" onClick={handleCrearHabitacion}>Crear Habitación</button>
                    </form>
                </div>
            </div>

            {/* Mostrar habitaciones disponibles */}
            <div className="row">
                {habitaciones.map(habitacion => (
                    <div className="col-md-4" key={habitacion.id}>
                        <div className="card mb-4 shadow-sm">
                            <div className="card-body">
                                <h5 className="card-title">Habitación {habitacion.numero_habitacion}</h5>
                                <p className="card-text">Tipo: {habitacion.tipo_habitacion}</p>
                                <p className="card-text">Precio por noche: ${habitacion.precio_por_noche}</p>
                                <p className="card-text">Estado: {habitacion.estado}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Habitaciones;
