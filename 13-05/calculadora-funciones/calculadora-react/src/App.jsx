import { useState } from "react";

function App() {
  const [numero1, setNumero1] = useState("");
  const [numero2, setNumero2] = useState("");
  const [resultado, setResultado] = useState("");

  // =====================================
  // FUNCIONES
  // =====================================

  function sumar(a, b) {
    return a + b;
  }

  function restar(a, b) {
    return a - b;
  }

  function multiplicar(a, b) {
    return a * b;
  }

  function dividir(a, b) {
    if (b === 0) {
      return "No se puede dividir entre 0";
    }

    return a / b;
  }

  // =====================================
  // EVENTOS
  // =====================================

  function handleSuma() {
    setResultado(sumar(Number(numero1), Number(numero2)));
  }

  function handleResta() {
    setResultado(restar(Number(numero1), Number(numero2)));
  }

  function handleMultiplicacion() {
    setResultado(multiplicar(Number(numero1), Number(numero2)));
  }

  function handleDivision() {
    setResultado(dividir(Number(numero1), Number(numero2)));
  }

  function handleLimpiar() {
    setNumero1("");
    setNumero2("");
    setResultado("");
  }

  // =====================================
  // ESTILOS
  // =====================================

  const estilos = {
    container: {
      padding: "40px",
      maxWidth: "400px",
      margin: "50px auto",
      backgroundColor: "#f4f4f4",
      borderRadius: "15px",
      border: "2px solid #ccc",
      textAlign: "center",
      fontFamily: "Arial",
      boxShadow: "0px 4px 10px rgba(0,0,0,0.2)",
    },

    input: {
      width: "90%",
      padding: "10px",
      margin: "10px 0",
      borderRadius: "8px",
      border: "1px solid #999",
      fontSize: "16px",
    },

    button: {
      padding: "10px 15px",
      margin: "5px",
      border: "none",
      borderRadius: "8px",
      backgroundColor: "#007bff",
      color: "white",
      cursor: "pointer",
      fontSize: "15px",
      transition: "0.3s",
    },

    resultado: {
      marginTop: "20px",
      color: "#333",
    },
  };

  return (
    <div style={estilos.container}>
      <h1>Calculadora React</h1>

      <input
        style={estilos.input}
        type="number"
        placeholder="Número 1"
        value={numero1}
        onChange={(e) => setNumero1(e.target.value)}
      />

      <input
        style={estilos.input}
        type="number"
        placeholder="Número 2"
        value={numero2}
        onChange={(e) => setNumero2(e.target.value)}
      />

      <div>
        <button
          style={estilos.button}
          onMouseOver={(e) =>
            (e.target.style.backgroundColor = "#0056b3")
          }
          onMouseOut={(e) =>
            (e.target.style.backgroundColor = "#007bff")
          }
          onClick={handleSuma}
        >
          Sumar
        </button>

        <button
          style={estilos.button}
          onMouseOver={(e) =>
            (e.target.style.backgroundColor = "#0056b3")
          }
          onMouseOut={(e) =>
            (e.target.style.backgroundColor = "#007bff")
          }
          onClick={handleResta}
        >
          Restar
        </button>

        <button
          style={estilos.button}
          onMouseOver={(e) =>
            (e.target.style.backgroundColor = "#0056b3")
          }
          onMouseOut={(e) =>
            (e.target.style.backgroundColor = "#007bff")
          }
          onClick={handleMultiplicacion}
        >
          Multiplicar
        </button>

        <button
          style={estilos.button}
          onMouseOver={(e) =>
            (e.target.style.backgroundColor = "#0056b3")
          }
          onMouseOut={(e) =>
            (e.target.style.backgroundColor = "#007bff")
          }
          onClick={handleDivision}
        >
          Dividir
        </button>

        <button
          style={{
            ...estilos.button,
            backgroundColor: "#dc3545",
          }}
          onMouseOver={(e) =>
            (e.target.style.backgroundColor = "#a71d2a")
          }
          onMouseOut={(e) =>
            (e.target.style.backgroundColor = "#dc3545")
          }
          onClick={handleLimpiar}
        >
          Limpiar
        </button>
      </div>

      <h2 style={estilos.resultado}>
        Resultado: {resultado}
      </h2>
    </div>
  );
}

export default App;