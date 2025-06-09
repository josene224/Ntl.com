// script.js - ATUALIZADO PARA ENVIO AJAX COM ANIMAÇÃO E FORM SUBMIT JSON

document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contactForm');
    const formMessage = document.getElementById('formMessage');
    const loadingSpinner = document.getElementById('loadingSpinner');
    const submitButton = contactForm.querySelector('button[type="submit"]');

    const outroServicoCheckbox = document.getElementById('outroServico');
    const outroServicoText = document.getElementById('outroServicoText');

    const ramoAtividadeSelect = document.getElementById('ramoAtividade');
    const outroRamoGroup = document.getElementById('outroRamoGroup');
    const outroRamoInput = document.getElementById('outroRamo');

    // Lógica para o campo "Outro" no Ramo de Atividade
    ramoAtividadeSelect.addEventListener('change', () => {
        if (ramoAtividadeSelect.value === 'Outro') {
            outroRamoGroup.style.display = 'block';
            outroRamoInput.setAttribute('required', 'required');
        } else {
            outroRamoGroup.style.display = 'none';
            outroRamoInput.removeAttribute('required');
            outroRamoInput.value = '';
        }
    });

    // Lógica para o campo "Outro" nos Serviços de Interesse
    outroServicoText.style.display = 'none'; // Inicialmente esconde
    outroServicoCheckbox.addEventListener('change', () => {
        if (outroServicoCheckbox.checked) {
            outroServicoText.style.display = 'block';
            outroServicoText.setAttribute('required', 'required');
        } else {
            outroServicoText.style.display = 'none';
            outroServicoText.removeAttribute('required');
            outroServicoText.value = '';
        }
    });

    // Função para exibir mensagens
    function showMessage(message, type) {
        formMessage.textContent = message;
        formMessage.classList.remove('success', 'error'); // Limpa classes anteriores
        formMessage.classList.add(type);
        formMessage.style.display = 'block';
        formMessage.scrollIntoView({ behavior: 'smooth', block: 'start' }); // Rola para a mensagem
    }

    // Listener para o envio do formulário
    contactForm.addEventListener('submit', async (event) => {
        event.preventDefault(); // IMPEDE O ENVIO PADRÃO DO NAVEGADOR

        // Limpa mensagens anteriores
        formMessage.style.display = 'none';
        formMessage.classList.remove('success', 'error');

        // Mostra o spinner e desabilita o botão
        loadingSpinner.style.display = 'block';
        submitButton.disabled = true;
        submitButton.textContent = 'Enviando...'; // Muda o texto do botão

        try {
            // Coleta os dados do formulário
            const formData = new FormData(contactForm);
            
            // Tratamento especial para os checkboxes e o campo 'Outro Serviço'
            // O Formsubmit com formato JSON envia checkboxes como um array de strings.
            // Aqui estamos garantindo que a informação seja capturada corretamente.
            const servicosInteresseArray = [];
            contactForm.querySelectorAll('input[name="Servicos_Interesse[]"]:checked').forEach(checkbox => {
                if (checkbox.value === 'Outro_Servico') {
                    const outroText = document.getElementById('outroServicoText').value.trim();
                    if (outroText) {
                        servicosInteresseArray.push(`Outro: ${outroText}`);
                    } else {
                        servicosInteresseArray.push("Outro (não especificado)");
                    }
                } else {
                    servicosInteresseArray.push(checkbox.value);
                }
            });
            // O Formsubmit espera que servicosInteresse seja um array de strings.
            // formData.set() para array precisa ser com um nome único.
            // Para garantir que o Formsubmit processe bem, podemos enviar como string separada por vírgulas ou JSON stringificado
            // A API Fetch com FormData e Accept: application/json lida com isso de forma razoável.
            // Vamos tentar enviar diretamente o FormData. Append adiciona múltiplos valores para o mesmo nome se necessário.
            // Para garantir que os serviços cheguem como um único campo com múltiplos valores no email,
            // vamos removê-los do FormData original e adicioná-los como um único campo formatado
            formData.delete('Servicos_Interesse[]'); // Remove o que o FormData capturou automaticamente para este campo
            if (servicosInteresseArray.length > 0) {
                formData.append('Servicos_Interesse', servicosInteresseArray.join(', '));
            }


            // Também ajusta o valor do "ramoAtividade" se "Outro" for selecionado
            if (ramoAtividadeSelect.value === 'Outro' && outroRamoInput.value.trim()) {
                formData.set('ramoAtividade', `Outro: ${outroRamoInput.value.trim()}`);
            }


            // Envia os dados para o Formsubmit.co usando fetch
            const response = await fetch(contactForm.action, {
                method: 'POST',
                body: formData, // FormData lida com todos os campos do formulário
                headers: {
                    'Accept': 'application/json' // Solicita resposta em JSON
                }
            });

            const data = await response.json(); // Pega a resposta em JSON

            if (response.ok) { // Se a resposta for 2xx (sucesso)
                showMessage('Sua solicitação foi enviada com sucesso! Em breve entraremos em contato.', 'success');
                contactForm.reset(); // Limpa o formulário
                // Esconde campos "Outro" após reset
                outroServicoText.style.display = 'none';
                outroServicoText.removeAttribute('required');
                outroRamoGroup.style.display = 'none';
                outroRamoInput.removeAttribute('required');
            } else {
                // Se houver um erro no servidor ou validação do Formsubmit
                let errorMessage = 'Ocorreu um erro ao enviar sua solicitação. Por favor, tente novamente.';
                if (data && data.message) {
                    errorMessage = `Erro: ${data.message}`;
                }
                showMessage(errorMessage, 'error');
            }

        } catch (error) {
            console.error('Erro no envio do formulário:', error);
            showMessage('Não foi possível conectar ao servidor. Verifique sua conexão e tente novamente.', 'error');
        } finally {
            // Esconde o spinner e reabilita o botão, independentemente do sucesso ou falha
            loadingSpinner.style.display = 'none';
            submitButton.disabled = false;
            submitButton.textContent = 'Enviar Solicitação'; // Volta o texto original
        }

    });
// Exemplo: Redirecionar para

});
