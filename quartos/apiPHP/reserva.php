<?php
//hotel.php

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if($_SERVER['REQUEST_METHOD'] === 'OPTIONS'){
    exit;   
}

include 'conexao.php';

if($_SERVER['REQUEST_METHOD'] === 'GET'){
    $stmt = $conn->prepare("SELECT * FROM reservas");
    $stmt->execute();
    $reserva = $stmt->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($reserva);
}

//Rota para criar filme
if ($_SERVER ['REQUEST_METHOD'] === 'POST'){
    $nome_cliente = $_POST['nome_cliente'];
    $numero = $_POST['numero'];
    $check_in = $_POST['check_in'];
    $check_out = $_POST['check_out'];


    $stmt = $conn->prepare("INSERT INTO reservas (nome_cliente, numero, check_in, check_out) VALUES (:nome_cliente, :numero, :check_in, :check_out)");

    $stmt->bindParam(":nome_cliente", $nome_cliente);
    $stmt->bindParam(":numero",$numero);
    $stmt->bindParam(":check_in", $check_in);
    $stmt->bindParam(":check_out",$check_out);

    //Outros bindParams ...

    if($stmt->execute()){
        echo "reserva criado com sucesso!!";
    }else{
        echo "error ao criar reserva!!";
    }
}

//rota para excluir um filme
if($_SERVER['REQUEST_METHOD'] === 'DELETE' && isset($_GET['id'])){
    $id = $_GET['id'];
    $stmt = $conn->prepare("DELETE FROM reservas WHERE id = :id");
    $stmt->bindParam(':id', $id);

    if($stmt->execute()){
        echo "reserva excluido com sucesso!!";
    } else {
        echo"erro ao excluir reserva";
    }
}

//Rota para atualizar um filme existente
if($_SERVER['REQUEST_METHOD'] === 'PUT' && isset($_GET['id'])){
    parse_str(file_get_contents("php://input"), $_PUT);

    $id = $_GET['id'];
    $nome_cliente = $_PUT['nome_cliente'];
    $numero = $_PUT['numero'];
    $check_in = $_PUT['check_in'];
    $check_out = $_PUT['check_out'];

    $stmt = $conn->prepare("UPDATE reservas SET nome_cliente = :nome_cliente, numero = :numero, check_in = :check_in, check_out = :check_out WHERE id = :id");
    $stmt->bindParam(":nome_cliente", $nome_cliente);
    $stmt->bindParam(":numero",$numero);
    $stmt->bindParam(":check_in", $check_in);
    $stmt->bindParam(":check_out", $check_out);
    $stmt->bindParam(':id', $id);

    if($stmt->execute()){
        echo "reserva atualizado com sucesso!";
    } else {
        echo"erro ao atualizar reserva";
    }

}



