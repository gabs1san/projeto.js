import {db} from "../db.js";

export const getUsers = (_, res) => {
    const q = "SELECT * FROM usuarios";

    db.query(q, (err, data) => {
        if (err) return res.json(err);

        return res.status(200).json(data);
    });
};


export const addUser = (req, rest) => {
    const q =
    "INSERT INTO usuarios(`nome`, `e-mail`, `telefone`, `data_nasc`) VALUES(?)";


    const values = [
        req.body.nome,
        req.body.email,
        req.body.telefone,
        req.body.data_nasc,
    ];

    db.query(q, [values], (err) => {
        if(err) return res.json(err);

        return res.status(200).json("usuário foi criado com sucesso");
    })
};



export const updateUser= (req, rest) => {
    const q =
    "UPDATE usuarios SET `nome` = ?, ´e-mail` = ?, `telefone` = ?, `data_nasc` = ? WHERE `id` = ?";


    const values = [
        req.body.nome,
        req.body.email,
        req.body.telefone,
        req.body.data_nasc,
    ];

    db.query(q, [...values, rq.params.id], (err) => {
        if(err) return res.json(err);

        return res.status(200).json("usuário foi atualizado com sucesso");
    })
};

export const deleteUser = (req, res) => {
    const q = "DELETE FROM usuarios WHERE `id` = ?";


    db.query(q, [req.params.id], (err) =>{
        if(err) return res.json(err);

            return res.status(200).json("Usuário foi deletado com sucesso");
        
    });
};

