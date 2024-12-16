import React from "react";
import { Box, Container, Typography } from "@mui/material";
import logo from "../assets/images/logo.png";
import Navbar from "./Navbar";
import Footer from "./Footer";

const TermsAndConditions = () => {
  return (
    <Box sx={{ bgcolor: "#FEFEFE", minHeight: "100vh" }}>
      <Navbar />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          minHeight: "100vh",
          bgcolor: "#f9f9f9",
          py: 4,
        }}
      >
        <img
          src={logo}
          alt="Logo"
          style={{ marginBottom: 20, width: "125px", height: "125px" }}
        />
        <Container
          maxWidth="md"
          sx={{ bgcolor: "#FFFFFF", p: 4, borderRadius: 2, boxShadow: 3 }}
        >
          <Typography
            variant="h4"
            color="primary"
            sx={{ mb: 4, textAlign: "center" , color: "#0cc0df"}}
          >
            Términos y Condiciones
          </Typography>
          <Typography variant="body1" paragraph>
            1. <strong>Introducción:</strong> Bienvenido a Master Bikas. Estos
            términos y condiciones regulan el uso de nuestra plataforma, donde
            proporcionamos soluciones de ejercicios educativos en formato de
            imagen y ofrecemos a los usuarios la posibilidad de ganar premios al
            participar en nuestras actividades. Al acceder o utilizar nuestros
            servicios, aceptas cumplir con estos términos y condiciones en su
            totalidad.
          </Typography>
          <Typography variant="body1" paragraph>
            2. <strong>Descripción del Servicio:</strong> Master Bikas es una
            plataforma educativa que ofrece a los estudiantes soluciones
            detalladas de ejercicios de diversas materias, presentadas en
            formato de imagen. Además, Master Bikas organiza actividades
            periódicas donde los usuarios pueden acumular puntos y canjearlos
            por premios, como cuentas de streaming, entradas al cine u otros
            productos relacionados con el entretenimiento.
          </Typography>
          <Typography variant="body1" paragraph>
            3. <strong>Uso Aceptable del Servicio:</strong>
            <ul>
              <li>
                <strong>Acceso al Contenido:</strong> Los usuarios podrán
                visualizar las imágenes de los ejercicios dentro de la
                plataforma una vez hayan realizado el pago correspondiente. No
                está permitido:
                <ul>
                  <li>
                    Descargar, distribuir, revender o compartir las imágenes con
                    terceros sin el consentimiento previo de Master Bikas.
                  </li>
                  <li>
                    Usar las imágenes para fines comerciales o cualquier otro
                    uso que no sea educativo o personal.
                  </li>
                  <li>
                    Modificar, alterar o tergiversar el contenido de las
                    imágenes.
                  </li>
                </ul>
              </li>
            </ul>
          </Typography>
          <Typography variant="body1" paragraph>
            4. <strong>Inactividad:</strong> Master Bikas se reserva el derecho
            de desactivar una cuenta de usuario si la misma ha permanecido
            inactiva por más de 12 meses. La inactividad se define como la falta
            de inicio de sesión o participación en las actividades de la
            plataforma durante dicho periodo.
          </Typography>
          <Typography variant="body1" paragraph>
            5. <strong>Recompensas y Premios:</strong>
            <ul>
              <li>
                <strong>Participación:</strong> Los usuarios pueden participar
                en actividades organizadas por Master Bikas para acumular
                puntos. Estas actividades pueden incluir la resolución de
                ejercicios semanales, participación en desafíos educativos o
                cualquier otra dinámica que Master Bikas decida implementar.
              </li>
              <li>
                <strong>Acumulación de Puntos:</strong>Los puntos se acumulan al
                cumplir con los requisitos de las actividades indicadas. Cada
                actividad otorgará una cantidad específica de puntos según lo
                establecido por Master Bikas.
              </li>
              <li>
                <strong>Canje de Puntos:</strong>
                Los usuarios pueden canjear los puntos acumulados por premios
                como cuentas de streaming, entradas al cine u otros productos de
                entretenimiento. Los premios estarán sujetos a disponibilidad y
                pueden variar en cualquier momento sin previo aviso.
              </li>
              <li>
                <strong>Entrega de Premios:</strong>
                Los premios serán entregados a los usuarios a través de WhatsApp
                o correo electrónico, según lo prefiera el usuario y será
                entregado los fines de semana (sábado o domingo). Master Bikas
                no se responsabiliza por retrasos o problemas en la entrega de
                premios debido a errores en la información de contacto
                proporcionada por el usuario.
              </li>
              <li>
                <strong>Fraude o Abuso:</strong> Cualquier intento de fraude,
                manipulación de los puntos o uso indebido del sistema de
                recompensas resultará en la pérdida de los puntos acumulados y
                la cancelación de la cuenta del usuario.
              </li>
            </ul>
          </Typography>
          <Typography variant="body1" paragraph>
            6. <strong>Variaciones en el Tipo de Pago</strong> Master Bikas no
            se responsabiliza por las variaciones en el tipo de cambio,
            comisiones o demoras en el procesamiento de pagos aplicados por
            plataformas de terceros. Los usuarios podrán realizar sus pagos a
            través del código QR de Yape/Plin que proporcionará acceso a la
            visualización de los ejercicios resueltos. En caso de no contar con
            una billetera electrónica se podrá realizar el pago a través de un
            número de cuenta bancario como BCP, Interbank, BBVA, Scotiabank o
            PayPal. Además, en un apartado llamado "Pregunta Personalizada", los
            usuarios podrán agregar sus propias preguntas, y estas tendrán un
            costo específico, que será informado en la plataforma.
          </Typography>
          <Typography variant="body1" paragraph>
            7. <strong>Seguridad</strong>
            <ul>
              <li>
                <strong>Identificación:</strong> El usuario no podrá transferir
                su cuenta ni sus recompensas. Master Bikas se reserva el derecho
                de utilizar medios adicionales para verificar la identidad del
                usuario, como medida de seguridad al momento del registro y de
                la realización de pagos.
              </li>
            </ul>
          </Typography>
          <Typography variant="body1" paragraph>
            8. <strong>Compra de Servicios</strong> Para adquirir los servicios
            ofrecidos por Master Bikas, los usuarios deberán proporcionar
            información personal veraz. Master Bikas se reserva el derecho de
            cancelar transacciones si se detecta que la información
            proporcionada es falsa o incompleta.
          </Typography>
          <Typography variant="body1" paragraph>
            9. <strong>Reembolso</strong> Las solicitudes de reembolso
            procederán únicamente en caso de que la respuesta a una Pregunta
            Personalizada sea totalmente incorrecta. Las solicitudes deberán
            presentarse dentro de los 2 días naturales posteriores a la
            recepción de la respuesta.
          </Typography>
          <Typography variant="body1" paragraph>
            10. <strong>Protección de Datos Personales</strong>
            <ul>
              <li>
                <strong>Consentimiento:</strong> Al utilizar Master Bikas, el
                usuario otorga su consentimiento libre y expreso para que su
                información personal sea almacenada, recopilada y utilizada
                conforme a nuestras políticas.
              </li>
              <li>
                <strong>Finalidad:</strong>El tratamiento de los datos
                personales tiene como única finalidad cumplir con las relaciones
                contractuales entre Master Bikas y sus usuarios, garantizando la
                confidencialidad de los datos.
              </li>
              <li>
                <strong>Canje de Puntos:</strong>
                Los usuarios pueden canjear los puntos acumulados por premios
                como cuentas de streaming, entradas al cine u otros productos de
                entretenimiento. Los premios estarán sujetos a disponibilidad y
                pueden variar en cualquier momento sin previo aviso.
              </li>
              <li>
                <strong>Derechos del Usuario:</strong>
                Los usuarios tienen derecho a acceder, rectificar, cancelar u
                oponerse al tratamiento de sus datos personales, conforme a lo
                establecido por la Ley N° 29733, Ley de Protección de Datos
                Personales.
              </li>
            </ul>
          </Typography>
          <Typography variant="body1" paragraph>
            11. <strong>Limitación de Responsabilidad</strong>
            <ul>
              <li>
                <strong>Errores y Disponibilidad:</strong> Master Bikas no
                garantiza que el sitio web esté libre de errores ni que esté
                accesible sin interrupciones.
              </li>
              <li>
                <strong>Compatibilidad:</strong>No se garantiza que la
                plataforma sea compatible con todas las versiones de navegadores
                o dispositivos.
              </li>
              <li>
                <strong>Canje de Puntos:</strong>
                Los usuarios pueden canjear los puntos acumulados por premios
                como cuentas de streaming, entradas al cine u otros productos de
                entretenimiento. Los premios estarán sujetos a disponibilidad y
                pueden variar en cualquier momento sin previo aviso.
              </li>
              <li>
                <strong>Daños y Pérdidas: </strong>
                Master Bikas no será responsable de ningún daño directo o
                indirecto, incidental o consecuente que surja del uso de la
                plataforma.
              </li>
            </ul>
          </Typography>
          <Typography variant="body1" paragraph>
            12. <strong>Resolución de Incidencias</strong> En caso de que los
            usuarios encuentren cualquier inconsistencia, error técnico o
            problema relacionado con el funcionamiento de la página web o con
            los servicios ofrecidos, Master Bikas se compromete a resolver
            dichas incidencias en un plazo de 2 a 3 días hábiles desde la
            notificación del problema por parte del usuario. Para reportar una
            incidencia, los usuarios deberán enviar un correo detallando el
            problema a <strong><strong><u>soporte.masterbikas@gmail.com</u></strong>.</strong> o comunicarse a través de
            WhatsApp al número <strong>+51 921346549.</strong>
          </Typography>
          <Typography variant="body1" paragraph>
            13. <strong>Modificaciones del Servicio</strong> Master Bikas se
            reserva el derecho de modificar cualquier aspecto del servicio,
            incluyendo las fechas y horarios de las actividades y transmisiones,
            con previo aviso a los usuarios.
          </Typography>
          <Typography variant="body1" paragraph>
            14. <strong>Reclamos, Quejas o Sugerencias</strong> Los usuarios
            pueden presentar reclamos, quejas o sugerencias a través de nuestro
            correo de contacto <strong><strong><u>soporte.masterbikas@gmail.com</u></strong>.</strong>
          </Typography>
        </Container>
      </Box>
      <Footer />
    </Box>
  );
};

export default TermsAndConditions;
