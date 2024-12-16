import React from "react";
import { Box, Container, Typography } from "@mui/material";
import logo from "../assets/images/logo.png";
import Navbar from "./Navbar";
import Footer from "./Footer";

const PrivacyPolicy = () => {
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
            sx={{ mb: 4, textAlign: "center", color: "#0cc0df" }}
          >
            Política de Privacidad
          </Typography>
          <Typography variant="body1" paragraph>
            1. <strong>Introducción:</strong>{" "}
            <p>
              En Master Bikas, nos comprometemos a proteger la privacidad y los
              datos personales de nuestros usuarios. Esta política de privacidad
              describe cómo recopilamos, usamos, almacenamos y protegemos la
              información que proporcionan al utilizar nuestra plataforma. Al
              acceder a nuestro servicio, aceptas los términos de esta política
              de privacidad.
            </p>
          </Typography>
          <Typography variant="body1" paragraph>
            2. <strong>Información que Recopilamos:</strong>{" "}
            <p>
              Recopilamos la siguiente información personal cuando los usuarios
              interactúan con nuestra plataforma:
              <ul>
                <li>
                  <strong>Datos de Registro:</strong>Nombres, apellidos, correo
                  electrónico, contraseña encriptada, fecha de nacimiento y
                  número de teléfono.
                </li>
                <li>
                  <strong>Datos Adicionales(Opcionales):</strong>NLos usuarios
                  pueden optar por proporcionar información adicional, como su
                  universidad, instituto, departamento, provincia y distrito,
                  dentro de la sección "Mis datos". La información ingresada
                  será utilizada para personalizar la experiencia en la
                  plataforma y no será obligatoria.
                </li>
                <li>
                  <strong>Información de Uso: </strong>Datos sobre cómo los
                  usuarios navegan e interactúan con la plataforma, como las
                  páginas visitadas y el tiempo de uso.
                </li>
                <li>
                  <strong>Información de Pago: </strong>Procesada de manera
                  segura a través de terceros (como Yape o Plin), sin que
                  almacenemos información financiera como números de tarjetas.
                </li>
                <li>
                  <strong>Datos de Comunicación:</strong>Cualquier información
                  que el usuario proporcione al ponerse en contacto con nosotros
                  a través de correo{" "}
                  <strong>
                    <u>
                      <strong>
                        <u>soporte.masterbikas@gmail.com</u>
                      </strong>
                    </u>
                  </strong>{" "}
                  o WhatsApp al número +51 921346549, como preguntas o
                  solicitudes de soporte.
                </li>
              </ul>
            </p>
          </Typography>
          <Typography variant="body1" paragraph>
            3. <strong>Uso de la Información:</strong>
            <p>
              La información que recopilamos se utiliza para:
              <ul>
                <li>
                  Proveer los servicios contratados, como el acceso a preguntas
                  resueltas.
                </li>
                <li>Mejorar la experiencia del usuario en la plataforma.</li>
                <li>
                  Gestionar pagos y acceso a servicios adicionales, como
                  preguntas personalizadas.
                </li>
                <li>
                  Enviar notificaciones sobre actualizaciones, cambios en la
                  plataforma, respuestas a preguntas personalizadas, y premios.
                </li>
                <li>
                  Atender consultas o incidencias reportadas a través de
                  nuestros canales de comunicación (correo electrónico y
                  WhatsApp).
                </li>
              </ul>
            </p>
          </Typography>
          <Typography variant="body1" paragraph>
            4. <strong>Protección de los Datos Personales:</strong>
            <p>
              Master Bikas implementa medidas de seguridad técnicas y
              organizativas para garantizar la confidencialidad, integridad y
              disponibilidad de los datos personales de los usuarios. Estas
              medidas incluyen el cifrado de datos, control de acceso y
              protocolos para prevenir el acceso no autorizado a la información
              almacenada.
            </p>
          </Typography>
          <Typography variant="body1" paragraph>
            5. <strong>Derechos de los Usuarios:</strong>
            <p>
              Los usuarios de Master Bikas tienen los siguientes derechos, según
              la Ley N° 29733, Ley de Protección de Datos Personales, y su
              Reglamento:
              <ul>
                <li>
                  <strong>Acceso:</strong>Solicitar información sobre los datos
                  personales almacenados.
                </li>
                <li>
                  <strong>Rectificación:</strong>Solicitar la corrección de
                  datos inexactos o desactualizados.
                </li>
                <li>
                  <strong>Cancelación:</strong>
                  Solicitar la eliminación de los datos personales cuando ya no
                  sean necesarios para los fines para los que fueron
                  recopilados.
                </li>
                <li>
                  <strong>Oposición:</strong>
                  Oponerse al tratamiento de sus datos personales por razones
                  legítimas.
                </li>
              </ul>
              Los usuarios pueden ejercer estos derechos contactándonos a través
              de
              <strong>
                <u>soporte.masterbikas@gmail.com</u>
              </strong>
              Atenderemos todas las solicitudes dentro de los plazos
              establecidos por la normativa aplicable.
            </p>
          </Typography>
          <Typography variant="body1" paragraph>
            6. <strong>Retención de Datos:</strong>{" "}
            <p>
              Los datos personales se almacenarán por el tiempo necesario para
              cumplir con las finalidades descritas en esta política o según lo
              exija la ley. Si un usuario solicita la cancelación de sus datos,
              estos serán eliminados de manera segura, salvo que debamos
              conservarlos para cumplir con obligaciones legales.
            </p>
          </Typography>
          <Typography variant="body1" paragraph>
            7. <strong>Transferencia de Datos a Terceros:</strong>
            <p>
              Master Bikas no compartirá la información personal de los usuarios
              con terceros, salvo en los siguientes casos:
            </p>
            <ul>
              <li>
                Para procesar pagos a través de plataformas externas (como Yape
                o Plin).
              </li>
              <li>Cuando sea requerido por ley o autoridad competente.</li>
              <li>
                Con proveedores de servicios tecnológicos que nos asistan en el
                funcionamiento de la plataforma, siempre bajo estrictas medidas
                de confidencialidad.
              </li>
            </ul>
          </Typography>
          <Typography variant="body1" paragraph>
            8. <strong>Uso de Cookies:</strong>
            <p>
              La plataforma Master Bikas puede utilizar cookies y tecnologías
              similares para mejorar la experiencia del usuario. Las cookies
              permiten recordar preferencias y proporcionar contenido
              personalizado. Los usuarios pueden desactivar las cookies a través
              de las opciones de su navegador, aunque esto podría afectar el
              funcionamiento del sitio.
            </p>
          </Typography>
          <Typography variant="body1" paragraph>
            9. <strong>Uso de Información para Rankings:</strong>
            <p>
              Con el fin de incentivar la participación y premiar el esfuerzo de
              los usuarios, Master Bikas publicará los nombres y apellidos de
              las tres primeras personas con mayor cantidad de puntos en la
              plataforma. Esta información será visible en la landing page y
              podrá ser accesible para todos los visitantes del sitio.
            </p>
            <p>
              Al participar en la plataforma y acumular puntos, los usuarios
              consienten expresamente el uso de su nombre y apellido para fines
              de ranking público. Si algún usuario no desea que su nombre sea
              mostrado en el ranking, podrá comunicarse con nosotros a través de
              <strong>
                <u> soporte.masterbikas@gmail.com</u>
              </strong>
              para solicitar su exclusión.
            </p>
          </Typography>
          <Typography variant="body1" paragraph>
            10. <strong>Actualización de la Política de Privacidad:</strong>
            <p>
              Esta política puede ser modificada en cualquier momento para
              adaptarse a cambios en las normativas o en los servicios que
              ofrecemos. Cualquier cambio significativo será comunicado a los
              usuarios a través de un aviso en la plataforma o por correo
              electrónico.
            </p>
          </Typography>
          <Typography variant="body1" paragraph>
            11. <strong> Contacto:</strong>
            <p>
              Si tienes preguntas sobre esta Política de Privacidad o sobre cómo
              manejamos tus datos personales, puedes contactarnos a través de
              <strong><u> masterbikas1@gmail.com</u></strong> o mediante WhatsApp al número +51
              921346549.
            </p>
          </Typography>
        </Container>
      </Box>
      <Footer />
    </Box>
  );
};

export default PrivacyPolicy;
