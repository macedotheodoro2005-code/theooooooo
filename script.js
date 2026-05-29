 const formElement = document.querySelector("#form-inscricao");
const messageBox = document.querySelector("#mensagemRetorno");

const selectedSessions = [];

function initPage() {
    bindScheduleButtons();
    bindFormSubmit();
}

function bindScheduleButtons() {
    const sessionButtons = document.querySelectorAll("[data-track='agenda']");
    sessionButtons.forEach((button) => {
        button.addEventListener("click", () => {
            const sessionId = button.dataset.sessionId;

            if (selectedSessions.includes(sessionId)) {
                return;
            }

            selectedSessions.push(sessionId);
            button.innerText = "Sessão salva";
            button.classList.remove("btn-outline-dark");
            button.classList.add("btn-dark");

            localStorage.setItem("saved-sessions", JSON.stringify(selectedSessions));
        });
    });
}

function bindFormSubmit() {
    if (!formElement) return;

    formElement.addEventListener("submit", function (event) {
        event.preventDefault();

        const nomeInput = document.querySelector("#nome");
        const emailInput = document.querySelector("#email");
        const carreiraInput = document.querySelector("#momento-carreira");
        const ingressoInput = document.querySelector("#ingresso-select");
        const termsInput = document.querySelector("#terms");

        if (nomeInput.value.trim().length < 3) {
            showMessage("erro", "Nome precisa ter no mínimo 3 caracteres.");
            return;
        }

        if (emailInput.value.indexOf("@") === -1) {
            showMessage("erro", "Email inválido.");
            return;
        }

        if (carreiraInput.value === "" || ingressoInput.value === "") {
            showMessage("erro", "Selecione carreira e ingresso.");
            return;
        }

        if (termsInput.checked === false) {
            showMessage("erro", "Aceite os termos para prosseguir.");
            return;
        }

        const payload = {
            nome: nomeInput.value,
            email: emailInput.value,
            carreira: carreiraInput.value,
            ingresso: ingressoInput.value,
            sessoes: selectedSessions,
            createdAt: new Date().toISOString()
        };

        localStorage.setItem("last-signup", JSON.stringify(payload));

        showMessage("sucesso", `Inscrição de ${payload.nome} enviada com sucesso!`);
        formElement.reset();
    });
}

function showMessage(type, text) {
    if (!messageBox) return;
    messageBox.classList.remove("sucesso", "erro");
    messageBox.classList.add(type);
    messageBox.innerHTML = text;
}

initPage();