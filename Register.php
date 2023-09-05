<?php
	$inData = getRequestInfo();
	
	//$color = $inData["color"];
	//$userId = $inData["userId"];
    $firstname = $inData["firstname"];
    $lastname = $inData["lastname"];
    $login = $inData["login"];
    $password = $inData["password"];


	$conn = new mysqli("localhost", "username", "password", "database");
	if ($conn->connect_error) 
	{
		returnWithError( $conn->connect_error );
	} 
	else
	{
        //$stmt = $conn->prepare("INSERT into Colors (UserId,Name) VALUES(?,?)");
		//$stmt->bind_param("ss", $userId, $color);
        $stmt = $conn->prepare("INSERT into Users (firstName, lastName, Login, Password) VALUES(?,?,?,?)");
        $stmt->bind_param("ss", $firstname, $lastname, $login, $password);
		$stmt->execute();
		$stmt->close();
		$conn->close();
		returnWithError("");
	}

	function getRequestInfo()
	{
		return json_decode(file_get_contents('php://input'), true);
	}

	function sendResultInfoAsJson( $obj )
	{
		header('Content-type: application/json');
		echo $obj;
	}
	
	function returnWithError( $err )
	{
		$retValue = '{"error":"' . $err . '"}';
		sendResultInfoAsJson( $retValue );
	}
	
?>