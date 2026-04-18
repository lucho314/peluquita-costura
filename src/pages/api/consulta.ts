import type { APIRoute } from 'astro'
import { supabase } from '../../lib/supabase'

export const prerender = false

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json()

    // Validación básica
    if (!body.nombre || !body.email || !body.mensaje) {
      return new Response(
        JSON.stringify({ error: 'Los campos nombre, email y mensaje son requeridos' }), 
        { 
          status: 400,
          headers: {
            'Content-Type': 'application/json'
          }
        }
      )
    }

    // Validación de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(body.email)) {
      return new Response(
        JSON.stringify({ error: 'El email no es válido' }), 
        { 
          status: 400,
          headers: {
            'Content-Type': 'application/json'
          }
        }
      )
    }

    // Insertar la consulta en la base de datos
    const { error } = await supabase.from('consultas').insert({
      producto_id: body.producto_id || null,
      nombre_cliente: body.nombre,
      email: body.email,
      telefono: body.telefono || null,
      mensaje: body.mensaje,
    })

    if (error) {
      console.error('Error al insertar consulta:', error)
      return new Response(
        JSON.stringify({ error: 'Error al enviar la consulta. Por favor, intenta nuevamente.' }), 
        { 
          status: 500,
          headers: {
            'Content-Type': 'application/json'
          }
        }
      )
    }

    return new Response(
      JSON.stringify({ success: true, message: 'Consulta enviada correctamente' }), 
      { 
        status: 200,
        headers: {
          'Content-Type': 'application/json'
        }
      }
    )
  } catch (error) {
    console.error('Error en endpoint de consulta:', error)
    return new Response(
      JSON.stringify({ error: 'Error interno del servidor' }), 
      { 
        status: 500,
        headers: {
          'Content-Type': 'application/json'
        }
      }
    )
  }
}
