import express, {Application, Request, Response} from "express";
const app: Application = express()
const PORT: number = 3306;

app.use(express.json())

app.get("/", (req: Request, res: Response): Response => {
    return res.json({ mensagem: "Olá Mundo!" })
})

app.get("/:idade", (req: Request, res: Response): Response => {
    const idade: number = Number(req.params.idade)

    if (idade > 18) {
        return res.json({mensagem: "Parabéns, você é maior de idade"})
    } else {
        return res.json({ mensagem: "Parabens, Você é menor de idade"})
    }
})

app.listen(PORT, (): void => {
    console.log(`Servidor rodando em http//localhost:${PORT}`)
})