import nodemailer from 'nodemailer';

export const emailRegistro = async (datos) => {
  const { email, nombre, token } = datos;

  const transport = nodemailer.createTransport({
    host: 'sandbox.smtp.mailtrap.io',
    port: 2525,
    auth: {
      user: '2400f35586cd3b',
      pass: '56857d29985e58',
    },
  });

  const info = await transport.sendMail({
    from: '"UpTask - MERN" <cuentas@uptask.com>',
    to: email,
    subject: 'Confirma tu cuenta',
    text: 'Confirma tu cuenta enUpTask',
    html: `
                <h1>Confirma tu cuenta</h1>
                <p>Hola: ${nombre}</p>
                <p>Para confirmar tu cuenta haz click en el siguiente enlace</p>
                <a href="${process.env.FRONTEND_URL}/confirmar-cuenta/${token}">Confirmar cuenta</a>


            
            `,
  });
};
