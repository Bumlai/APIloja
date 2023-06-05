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

//Rota para obter TODOS os hotel
if($_SERVER['REQUEST_METHOD'] === 'GET'){
    $stmt = $conn->prepare("SELECT * FROM quartos");
    $stmt->execute();
    $quartos = $stmt->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($quartos);
}

//Rota para criar filme
if ($_SERVER ['REQUEST_METHOD'] === 'POST'){
    $numero = $_POST['numero'];
    $tipo = $_POST['tipo'];
    $disponivel = $_POST['disponivel'];
    //inserir outros campos caso necessario

    $stmt = $conn->prepare("INSERT INTO quartos (numero, tipo, disponivel) VALUES (:numero, :tipo, :disponivel)");

    $stmt->bindParam(":numero", $numero);
    $stmt->bindParam(":tipo",$tipo);
    $stmt->bindParam(":disponivel", $disponivel);
    //Outros bindParams ...

    if($stmt->execute()){
        echo "quarto criado com sucesso!!";
    }else{
        echo "error ao criar quarto!!";
    }
}

//rota para excluir um filme
if($_SERVER['REQUEST_METHOD'] === 'DELETE' && isset($_GET['id'])){
    $id = $_GET['id'];
    $stmt = $conn->prepare("DELETE FROM quartos WHERE id = :id");
    $stmt->bindParam(':id', $id);

    if($stmt->execute()){
        echo "quarto excluido com sucesso!!";
    } else {
        echo"erro ao excluir quarto";
    }
}

//Rota para atualizar um filme existente
if($_SERVER['REQUEST_METHOD'] === 'PUT' && isset($_GET['id'])){
    parse_str(file_get_contents("php://input"), $_PUT);

    $id = $_GET['id'];
    $numero = $_PUT['numero'];
    $tipo = $_PUT['tipo'];
    $disponivel = $_PUT['disponivel'];

    $stmt = $conn->prepare("UPDATE quartos SET numero = :numero, tipo = :tipo, disponivel = :disponivel WHERE id = :id");
    $stmt->bindParam(":numero", $numero);
    $stmt->bindParam(":tipo",$tipo);
    $stmt->bindParam(":disponivel", $disponivel);
    $stmt->bindParam(':id', $id);

    if($stmt->execute()){
        echo "quarto atualizado com sucesso!";
    } else {
        echo"erro ao atualizar quarto";
    }

}



