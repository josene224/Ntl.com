<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'vendor/autoload.php'; // Verifique o caminho correto para o autoload do Composer

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $respostas = "";
    for ($i = 1; $i <= 8; $i++) {
        $resposta = $_POST["q$i"] ?? "Não respondido";
        $respostas .= "Pergunta $i: $resposta\n";
    }

    $mail = new PHPMailer(true);

    try {
        // Configurações do servidor SMTP
        $mail->isSMTP();
        $mail->Host = 'smtp.gmail.com';
        $mail->SMTPAuth = true;
        $mail->Username = 'tatijosene@gmail.com';      // <-- seu Gmail
        $mail->Password = 'fczj xjca cfvk hytbP';            // <-- senha de app gerada no Google
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
        $mail->Port = 587;

        // Remetente e destinatário
        $mail->setFrom('tatijosene@gmail.com', 'NTL SA');
        $mail->addAddress('tatijosene@gmail.com');     // <-- e-mail do destino final
        $mail->addReplyTo('tatijosene@gmail.com', 'NTL SA');

        // Conteúdo do e-mail
        $mail->isHTML(false);
        $mail->Subject = 'Diagnóstico de Cibersegurança - NTL';
        $mail->Body    = $respostas;

        // Envia o e-mail
        $mail->send();
        echo 'success';
    } catch (Exception $e) {
        echo "Erro ao enviar: {$mail->ErrorInfo}";
    }
}
?>