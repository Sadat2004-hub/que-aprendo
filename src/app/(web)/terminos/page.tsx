export default function TermsPage() {
    return (
        <div className="container" style={{ padding: '80px 20px', maxWidth: '800px' }}>
            <h1>Términos y Condiciones</h1>
            <div style={{ marginTop: '40px', lineHeight: '1.8', color: '#444' }}>
                <p>Al utilizar queaprendo.com, aceptas los siguientes términos de uso:</p>
                <h2 style={{ marginTop: '30px' }}>1. Uso del Marketplace</h2>
                <p>queaprendo.com funciona como un directorio y marketplace conectando a alumnos con instructores. No somos responsables de la calidad de los cursos impartidos por terceros.</p>
                <h2 style={{ marginTop: '30px' }}>2. Responsabilidad</h2>
                <p>Los instructores son los únicos responsables de la veracidad de la información publicada en sus perfiles y la realización de sus cursos.</p>
                <h2 style={{ marginTop: '30px' }}>3. Pagos</h2>
                <p>Los pagos se realizan directamente a los instructores o escuelas, salvo que se especifique lo contrario.</p>
            </div>
        </div>
    );
}
