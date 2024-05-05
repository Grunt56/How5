document.addEventListener("DOMContentLoaded", function(){
    const now = new Date()
    const year = now.getFullYear();
    const month = ('0' + (now.getMonth() + 1)).slice(-2); // Adiciona um zero à esquerda se necessário
    const day = ('0' + now.getDate()).slice(-2); // Adiciona um zero à esquerda se necessário
    const hours = ('0' + now.getHours()).slice(-2); // Adiciona um zero à esquerda se necessário
    const minutes = ('0' + now.getMinutes()).slice(-2); // Adiciona um zero à esquerda se necessário
    const formattedDateTime = year + '-' + month + '-' + day + 'T' + hours + ':' + minutes;

    // Define o valor mínimo do input datetime-local como a data e hora atual
    document.getElementById('horario').min = formattedDateTime;

    // Definição do elemento do formulário
    const form = document.getElementById("form")
    // Definição do elemento da lista de agendamento
    const scheduleList = document.getElementById("schedule-list")
    // Definição do botão de mostragem dos agendamentos
    const scheduleBtn = document.getElementById("btn-schedule")
    scheduleBtn.addEventListener("click", function(){
        const display = scheduleList.style.display

        if(display === "flex"){
            scheduleList.style.display = "none"
            scheduleBtn.textContent = "Mostrar Horários"
        } else {
            scheduleList.style.display = "flex"
            scheduleBtn.textContent = "Esconder Horários"
        }
    })
    

    form.addEventListener("submit", function(event){
        // Salvando os valores das variáveis
        event.preventDefault()
        const nome = event.target.elements.nome.value
        const telefone = event.target.elements.telefone.value
        const cpf = event.target.elements.cpf.value
        const horario = event.target.elements.horario.value
        
        
        // Chamando API de cadastro de agendamentos
        fetch("http://localhost:3000/agendamentos/cadastro", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                nome,
                telefone,
                cpf,
                horario,
                situacao: true
            })
        }).then(function(res){
            return res.json()
        }).then(function(data){
            // Mostrando mensagem de sucesso
            alert("Agendamanto Concluido")
            // Resetando o formulário
            event.target.elements.nome.value = ""
            event.target.elements.telefone.value = ""
            event.target.elements.cpf.value = ""
            event.target.elements.horario.value = ""

            //Adicionando novo elemento na lista de agendamentos
            const li = document.createElement("li")
            const date = new Date(horario)
            li.innerHTML = `
                <p>Nome: ${nome}</p>
                <p>Telefone: ${telefone}</p>
                <p>CPF: ${cpf}</p>
                <p>Horário: ${date.toLocaleDateString("pt-br", {
                    year: "numeric",
                    month: "2-digit",
                    day: "2-digit",
                    hour: "2-digit",
                    minute: "2-digit"
                })}</p>
                `
                scheduleList.insertBefore(li, scheduleList.firstChild)
        })

    }) 

    // Chamando API para mostrar os agendamentos já cadastrados
    fetch("http://localhost:3000/agendamentos").then(function(res){
        return res.json()
    }).then(function(data){
        // Checando se existe agendamentos
        if(data.length > 0){
            // Renderizando cada agendamento na lista
            data.reverse().forEach(function(value){
                const li = document.createElement("li")
                const date = new Date(value.horario)
                li.innerHTML = `
                <p>Nome: ${value.nome}</p>
                <p>Telefone: ${value.telefone}</p>
                <p>CPF: ${value.cpf}</p>
                <p>Horário: ${date.toLocaleDateString("pt-br", {
                    year: "numeric",
                    month: "2-digit",
                    day: "2-digit",
                    hour: "2-digit",
                    minute: "2-digit"
                })}</p>
                `
                scheduleList.appendChild(li)
            })
        } else {
            // Mensagem para quando não houver sessões marcadas
            const li = document.createElement("li")
            li.innerHTML = "<p>Não existe sessões marcadas</p>"
            scheduleList.appendChild(li)
        }
        
    })
})