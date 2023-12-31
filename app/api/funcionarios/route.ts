import { createClient } from "@vercel/postgres"
import { NextResponse } from "next/server"

export async function GET(request: Request) {
  const client = createClient()
  await client.connect()

  try {
    const sp = new URLSearchParams(request.url).entries()
    const id = sp.next().value[1]

    if (id) {
      const result =
        await client.sql`SELECT name, email, department FROM funcionarios WHERE id = ${id}`
      client.end()
      return new NextResponse(JSON.stringify(result.rows), { status: 200 })
    }

    const result =
      await client.sql`SELECT name, email, department FROM funcionarios`
    return new NextResponse(JSON.stringify(result.rows), { status: 200 })
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 })
  } finally {
    client.end()
  }
}

export async function POST(request: Request) {
  const client = createClient()
  await client.connect()
  try {
    const req = await request.json()
    const { name, email, department } = req

    if (!name || !email || !department) {
      return new NextResponse(
        JSON.stringify({ message: "Dados incompletos" }),
        { status: 400 }
      )
    }

    await client.sql`INSERT INTO funcionarios (name, email, department) VALUES (${name}, ${email}, ${department})`
    return new NextResponse(
      JSON.stringify({ message: "Funcionário criado com sucesso" }),
      { status: 200 }
    )
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 })
  } finally {
    client.end()
  }
}

export async function PUT(request: Request) {
  const client = createClient()
  await client.connect()

  try {
    const req = await request.json()
    const { name, email, department, id } = req

    if (!id || !name || !email || !department) {
      return new NextResponse(
        JSON.stringify({ message: "Dados incompletos" }),
        { status: 400 }
      )
    }

    await client.sql`UPDATE funcionarios SET name = ${name}, email = ${email}, department = ${department} WHERE id = ${id}`
    return new NextResponse(
      JSON.stringify({ message: "Funcionário atualizado com sucesso" }),
      { status: 200 }
    )
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 })
  } finally {
    client.end()
  }
}

export async function DELETE(req: Request) {
  const client = createClient()
  await client.connect()

  try {
    const sp = new URLSearchParams(req.url).entries()
    const id = sp.next().value[1]

    if (!id)
      return new NextResponse(JSON.stringify({ message: "ID não informado" }), {
        status: 400,
      })

    await client.sql`DELETE FROM funcionarios WHERE id = ${id}`
    return new NextResponse(
      JSON.stringify({ message: "Funcionário deletado com sucesso" }),
      { status: 200 }
    )
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 })
  } finally {
    client.end()
  }
}
