import React from "react";
import styled from "styled-components";
import { FaTrash, FaEdit } from "react-icons/fa";
import { toast } from "react-toastify";
import axios from "axios";

const Table = styled.table`  
    width: 100%;
    background-color: #fff;
    padding: 20px;
    box-shadow: 0px 0px 5px #ccc;
    border-radius: 5px;
    margin: 20px auto;
    word-break: break-all;
`;

export const Thead = styled.thead``;

export const Tbody = styled.tbody``;

export const Tr = styled.tr``;

export const Th = styled.th`
    text-align: start;
    border-bottom: inset;
    padding-bottom: 5px;

    @media (max-width: 500px) {
        ${(props) => props.onlyWeb && "display: none"}
    }
`;

export const Td = styled.td`
    padding-top: 15px;
    text-align: ${(props) => (props.alignCenter ? "center" : "start")};
    width: ${(props) => (props.width ? props.width : "auto")};

    @media (max-width: 500px) {
        ${(props) => props.onlyWeb && "display: none"}
    }
`;

const Grid = ({ users, setUsers, setOnEdit }) => {
    const handleEdit = (item) => {
        setOnEdit(item);
    };

    const handleDelete = async (id) => {
        try {
            const { data } = await axios.delete("http://localhost:8800/" + id);
            const newArray = users.filter((user) => user.id !== id);
            setUsers(newArray);
            toast.success(data);
        } catch (error) {
            toast.error("Erro ao deletar o usuário.");
        }

        setOnEdit(null);
    };

    return (
        <Table>
            <Thead>
                <Tr>
                    <Th>Nome</Th>
                    <Th>Email</Th>
                    <Th onlyWeb>Telefone</Th>
                    <Th></Th>
                    <Th></Th>
                </Tr>
            </Thead>
            <Tbody>
                {users && users.length > 0 ? (
                    users.map((item, i) => (
                        <Tr key={i}>
                            <Td width="30%">{item.nome}</Td>
                            <Td width="30%">{item.email}</Td>
                            <Td width="30%" onlyWeb>{item.telefone}</Td>

                            <Td alignCenter width="5%">
                                <FaEdit onClick={() => handleEdit(item)} style={{ cursor: "pointer", marginRight: "10px" }} />
                                <FaTrash onClick={() => handleDelete(item.id)} style={{ cursor: "pointer" }} />
                            </Td>
                        </Tr>
                    ))
                ) : (
                    <Tr>
                        <Td colSpan="4" alignCenter>Nenhum usuário encontrado</Td>
                    </Tr>
                )}
            </Tbody>
        </Table>
    );
};

export default Grid;
