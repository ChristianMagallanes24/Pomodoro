import React, { useState, useEffect } from "react";
import "./pomodoro.css";
const Pomodoro = () => {
    // Estado para los minutos del Pomodoro
    const [minutes, setMinutes] = useState(60);
    // Estado para los segundos del Pomodoro
    const [seconds, setSeconds] = useState(0);
    // Estado para controlar si el Pomodoro está activo o no
    const [isActive, setIsActive] = useState(false);

    // Efecto que se ejecuta cuando cambia el estado de isActive, minutes o seconds
    useEffect(() => {
        let interval;

        // Verifica si el Pomodoro está activo
        if (isActive) {
            // Configura un intervalo que se ejecuta cada segundo
            interval = setInterval(() => {
                // Verifica si los segundos han llegado a cero
                if (seconds === 0) {
                    // Si los minutos también son cero, el Pomodoro está completo
                    if (minutes === 0) {
                        // Detiene el intervalo y desactiva el Pomodoro
                        clearInterval(interval);
                        setIsActive(false);
                    } else {
                        // Si los minutos no son cero, decrementa los minutos en uno
                        // y establece los segundos en 59
                        setMinutes(minutes - 1);
                        setSeconds(59);
                    }
                } else {
                    // Si los segundos no son cero, simplemente decrementa los segundos en uno
                    setSeconds(seconds - 1);
                }
            }, 1000);
        } else {
            // Si el Pomodoro no está activo, detiene el intervalo
            clearInterval(interval);
        }

        // Función de limpieza para detener el intervalo cuando el componente se desmonta o el estado cambia
        return () => clearInterval(interval);
    }, [isActive, minutes, seconds]);

    // Función para alternar entre iniciar y pausar el Pomodoro
    const toggleTimer = () => {
        setIsActive(!isActive);

        // Si se inicia el Pomodoro, reinicia los minutos y segundos
        if (!isActive) {
            setMinutes(60);
            setSeconds(0);
        }
    };

    // Renderiza la interfaz del Pomodoro
    return (
        <div className="container">
          <h1>Este es mi pomodoros facherito</h1>
          <p className="number">
            {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
          </p>
          <div className="btn-container">
            {/* Botón para iniciar o pausar el Pomodoro */}
          <button onClick={toggleTimer}>{isActive ? 'Pause' : 'Start'}</button>
          {/* Botón para reiniciar el Pomodoro */}
          <button onClick={toggleTimer}>Reset</button>
          </div>
        </div>
      );
};

// Exporta el componente Pomodoro
export default Pomodoro;