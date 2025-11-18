import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransporter({
  host: process.env.SMTP_HOST || 'localhost',
  port: parseInt(process.env.SMTP_PORT || '1025'),
  secure: false, // true for 465, false for other ports
  auth: process.env.SMTP_USER
    ? {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      }
    : undefined,
})

export interface EmailOptions {
  to: string
  subject: string
  html: string
  text?: string
}

export const email = {
  /**
   * Send an email
   */
  async send({ to, subject, html, text }: EmailOptions): Promise<void> {
    await transporter.sendMail({
      from: process.env.SMTP_FROM || 'noreply@localhost',
      to,
      subject,
      html,
      text: text || html.replace(/<[^>]*>/g, ''), // Strip HTML tags for text version
    })
  },

  /**
   * Send welcome email to new client
   */
  async sendWelcome(name: string, email: string, password: string): Promise<void> {
    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #FF6B35;">¡Bienvenido a tu nuevo sitio web!</h1>
        <p>Hola ${name},</p>
        <p>Tu cuenta ha sido creada exitosamente. Aquí están tus credenciales de acceso:</p>
        <div style="background-color: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Contraseña temporal:</strong> ${password}</p>
          <p><strong>Panel de control:</strong> <a href="${process.env.NEXT_PUBLIC_CLIENT_URL}">${process.env.NEXT_PUBLIC_CLIENT_URL}</a></p>
        </div>
        <p>Por favor, cambia tu contraseña después de iniciar sesión por primera vez.</p>
        <p>Si tienes alguna pregunta, no dudes en contactarnos.</p>
        <p>Saludos,<br>El equipo de soporte</p>
      </div>
    `

    await this.send({
      to: email,
      subject: '¡Bienvenido! Tu cuenta ha sido creada',
      html,
    })
  },

  /**
   * Send site published notification
   */
  async sendSitePublished(name: string, email: string, siteUrl: string): Promise<void> {
    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #FF6B35;">¡Tu sitio web está en vivo! 🎉</h1>
        <p>Hola ${name},</p>
        <p>¡Excelentes noticias! Tu sitio web ha sido publicado y ya está disponible en línea.</p>
        <div style="background-color: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <p><strong>URL de tu sitio:</strong> <a href="${siteUrl}">${siteUrl}</a></p>
        </div>
        <p>Puedes continuar personalizando tu sitio desde tu panel de control.</p>
        <p>Saludos,<br>El equipo de soporte</p>
      </div>
    `

    await this.send({
      to: email,
      subject: '¡Tu sitio web está en vivo!',
      html,
    })
  },
}
