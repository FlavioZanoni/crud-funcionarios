import { Client } from "@vercel/postgres"
import { NextApiRequest, NextApiResponse } from "next"

const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
})

client.connect()

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method, body } = req

  switch (method) {
    case "GET":
      try {
        const result = await client.query("SELECT * FROM funcionarios")
        res.status(200).json(result.rows)
      } catch (error) {
        res.status(500).json({ message: "Internal server error" })
      }
      break
    case "POST":
      try {
        const { nome, email, department } = body
        await client.query(
          "INSERT INTO funcionarios (nome, email, department) VALUES ($1, $2, $3)",
          [nome, department, email]
        )
        res.status(201).json({ message: "Funcionário criado com sucesso" })
      } catch (error) {
        res.status(500).json({ message: "Internal server error" })
      }
      break
    case "PUT":
      try {
        const { id, nome, cargo, email } = body
        await client.query(
          "UPDATE funcionarios SET nome = $1, email = $2, department = $3, WHERE id = $4",
          [nome, cargo, email, id]
        )
        res.status(200).json({ message: "Funcionário atualizado com sucesso" })
      } catch (error) {
        res.status(500).json({ message: "Internal server error" })
      }
      break
    case "DELETE":
      try {
        const { id } = body
        await client.query("DELETE FROM funcionarios WHERE id = $1", [id])
        res.status(200).json({ message: "Funcionário deletado com sucesso" })
      } catch (error) {
        res.status(500).json({ message: "Internal server error" })
      }
      break
    default:
      res.setHeader("Allow", ["GET", "POST", "PUT", "DELETE"])
      res.status(405).json({ message: `Method ${method} Not Allowed` })
  }

  client.end()
}
