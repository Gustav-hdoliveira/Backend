import express, { Application, NextFunction, Request, Response } from 'express';

const app: Application = express();
const PORT: number = 3000;

app.use(express.json());

const logMiddleware = (req: Request, res:Response, next: NextFunction) => {
  const data: Date = new Date();
  console.log(`Requisição feita em: ${data}`)
  next()
}

const expedienteMiddleware = (req: Request, res: Response, next: NextFunction): Response | void => {
  const data: Date = new Date();

  if(data.getHours() > 19 && data.getHours() < 22){
    return res.status(401).json({
      mensagem: "Excedido o horário de acesso (depois das 19 e antes das 22)."
    })
  }

  next()
}

app.use(logMiddleware);

app.use(expedienteMiddleware)

// 🔹 GET
app.get('/Sobre', (req: Request, res: Response): Response => {
  const { nome, idade, descricao } = req.body;
  if (!nome || !idade || !descricao) {
    return res.status(400).json({ mensagem: 'Nome, idade e descrição são obrigatórios!' });
  }  
  return res.status(200).json({ 
    nome: nome,
    idade: Number(idade),
    Descricao: descricao,
   });
});

// 🔹 POST
app.post('/comentarios', (req: Request, res: Response): Response => {
  const { texto } = req.body;
  
  if(!texto || texto == ""){
    return res.status(400).json({
      mensagem: "Texto é obrigatório"
    })
  }

  return res.status(201).json({
    mensagem: "Comentário criado com sucesso!",
    comentario: texto
  })
});

app.delete("/comentarios/:id", (req: Request, res: Response): void => {
  const id: number = Number(req.params.id)

  if(!id){
    res.status(400).json({
      mensagem: "id não existente!"
    })
  }

})
// // 🔹 PUT
// app.put('/Sobre/:idade', (req: Request, res: Response): Response => {
//   return res.status(200).json({ mensagem: 'Usuário atualizado completamente!' });
// });


// // 🔹 PATCH
// app.patch('/usuarios/:id', (req: Request, res: Response): Response => {
//   return res.status(200).json({ mensagem: 'Usuário atualizado parcialmente!' });
// });

// // 🔹 DELETE
// app.delete('/usuarios/:id', (req: Request, res: Response): Response => {
//   const { id } = req.params;
//   if (!id) return res.status(400).json({ mensagem: 'ID não enviado' });
//   return res.status(204).send(); // Sem conteúdo
// });

app.listen(PORT, () => {console.log(`Servidor rodando em http://localhost:${PORT}`)})