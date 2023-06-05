<?php
//hotel.php

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
//GET recebe/pega informações]
//POST envia informaçoes
//PUT edita informações "update"
//DELETE deleta informações
//OPTIONS é a relação de methodos disponiveis para uso
header('Access-Control-Allow-Headers: Content-Type');

if($_SERVER['REQUEST_METHOD'] === 'OPTIONS'){
    exit;   
}

include 'conexao.php';

// idReserva
// numeroReserva
// tipoReserva
// checkIn 
// checkOut 

//Rota para obter TODOS os hotel
if($_SERVER['REQUEST_METHOD'] === 'GET'){
    $stmt = $conn->prepare("SELECT * FROM reserva");
    $stmt->execute();
    $reserva = $stmt->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($reserva);
}

//Rota para criar filme
if ($_SERVER ['REQUEST_METHOD'] === 'POST'){
    $numeroReserva = $_POST['numeroReserva'];
    $tipoReserva = $_POST['tipoReserva'];
    $checkIn = $_POST['checkIn'];
    $checkOut = $_POST['checkOut'];
    //inserir outros campos caso necessario

    $stmt = $conn->prepare("INSERT INTO reserva (numeroReserva, tipoReserva, checkIn, checkOut) VALUES (:numeroReserva, :tipoReserva, :checkIn, :checkOut)");

    $stmt->bindParam(":numeroReserva", $numero);
    $stmt->bindParam(":tipoReserva",$tipo);
    $stmt->bindParam(":checkIn", $checkIn);
    $stmt->bindParam(":checkOut",$checkOut);

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
    $stmt = $conn->prepare("DELETE FROM reserva WHERE id = :id");
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
    $numeroReserva = $_PUT['numeroReserva'];
    $tipoReserva = $_PUT['tipoReserva'];
    $checkIn = $_PUT['checkIn'];
    $checkOut = $_PUT['checkOut'];

    $stmt = $conn->prepare("UPDATE reserva SET numeroReserva = :numeroReserva, tipoReserva = :tipoReserva, checkIn = :checkIn, checkOut = :checkOut WHERE id = :id");
    $stmt->bindParam(":numeroReserva", $numeroReserva);
    $stmt->bindParam(":tipoReserva",$tipoReserva);
    $stmt->bindParam(":checkIn", $checkIn);
    $stmt->bindParam(":checkOut", $checkOut);
    $stmt->bindParam(':id', $id);

    if($stmt->execute()){
        echo "reserva atualizado com sucesso!";
    } else {
        echo"erro ao atualizar reserva";
    }

}



