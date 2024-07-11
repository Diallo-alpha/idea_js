document.addEventListener("DOMContentLoaded", () => {
    const ideaForm = document.getElementById("ideaForm");
    const ideasTableBody = document.getElementById("ideasTableBody");
    const messageDiv = document.getElementById("message");

    // Fonction pour afficher un message
    function showMessage(message, type) {
        messageDiv.textContent = message;
        messageDiv.className = `alert alert-${type}`;
        setTimeout(() => {
            messageDiv.textContent = "";
            messageDiv.className = "";
        }, 2000);
    }

    // Fonction pour ajouter une idée à la liste et au Local Storage
    function addIdea(idea) {
        const ideas = JSON.parse(localStorage.getItem("ideas")) || [];
        ideas.push(idea);
        localStorage.setItem("ideas", JSON.stringify(ideas));
        renderIdeas();
    }

    // Fonction pour supprimer une idée du Local Storage
    window.deleteIdea = function(index) {
        const ideas = JSON.parse(localStorage.getItem("ideas")) || [];
        ideas.splice(index, 1);
        localStorage.setItem("ideas", JSON.stringify(ideas));
        renderIdeas();
    }

    // Fonction pour approuver une idée
    window.approveIdea = function(index) {
        showMessage("Idée approuvée", "success");
    }

    // Fonction pour désapprouver une idée
    window.disapproveIdea = function(index) {
        showMessage("Idée désapprouvée", "warning");
    }

    // Fonction pour rendre les idées dans le tableau
    function renderIdeas() {
        const ideas = JSON.parse(localStorage.getItem("ideas")) || [];
        ideasTableBody.innerHTML = "";
        ideas.forEach((idea, index) => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${idea.title}</td>
                <td>${idea.description}</td>
                <td>${idea.categorie}</td>
                <td>
                    <button class="btn btn-success btn-sm" onclick="approveIdea(${index})">Approuver</button>
                    <button class="btn btn-warning btn-sm" onclick="disapproveIdea(${index})">Désapprouver</button>
                    <button class="btn btn-danger btn-sm" onclick="deleteIdea(${index})">Supprimer</button>
                </td>
            `;
            ideasTableBody.appendChild(row);
        });
    }

    // Validation et soumission du formulaire
    ideaForm.addEventListener("submit", (e) => {
        e.preventDefault();

        const title = document.getElementById("title").value.trim();
        const categorie = document.getElementById("categorie").value;
        const description = document.getElementById("description").value.trim();

        if (title === "" || description === "") {
            showMessage("Tous les champs sont requis", "danger");
            return;
        }

        const newIdea = {
            title,
            categorie,
            description
        };

        addIdea(newIdea);
        ideaForm.reset();
        showMessage("Idée ajoutée avec succès", "success");
    });

    // Affichage initial des idées
    renderIdeas();
});
