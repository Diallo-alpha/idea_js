document.addEventListener("DOMContentLoaded", () => {
    const ideaForm = document.getElementById("ideaForm");
    const ideasCards = document.getElementById("ideasCards");
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
        const ideas = JSON.parse(localStorage.getItem("ideas")) || [];
        if (ideas[index]) {
            ideas[index].approved = true;
            localStorage.setItem("ideas", JSON.stringify(ideas));
            renderIdeas();
        }
    }

    // Fonction pour désapprouver une idée
    window.disapproveIdea = function(index) {
        const ideas = JSON.parse(localStorage.getItem("ideas")) || [];
        if (ideas[index]) {
            ideas[index].approved = false;
            localStorage.setItem("ideas", JSON.stringify(ideas));
            renderIdeas();
        }
    }

    // Fonction pour rendre les idées dans le tableau
    function renderIdeas() {
        const ideas = JSON.parse(localStorage.getItem("ideas")) || [];
        ideasCards.innerHTML = "";
        ideas.forEach((idea, index) => {
            const card = document.createElement("div");
            card.className = `col-md-3 idee`;

            card.innerHTML = `
                <div class="card h-100 card ${idea.approved ? 'approved' : 'disapproved'}">
                    <div class="card-body">
                        <h5 class="card-title">${idea.title}</h5>
                        <h6 class="card-subtitle mb-2 text-muted">${idea.categorie}</h6>
                        <p class="card-text">${idea.description}</p>
                        <button class="btn btn-success btn-sm" onclick="approveIdea(${index})">Approuver</button>
                        <button class="btn btn-warning btn-sm" onclick="disapproveIdea(${index})">Désapprouver</button>
                        <button class="btn btn-danger btn-sm" onclick="deleteIdea(${index})">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                                <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
                                <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
                            </svg>
                        </button>
                    </div>
                </div>
            `;
            ideasCards.appendChild(card);
        });
    }

    // Validation et soumission du formulaire
    ideaForm.addEventListener("submit", (e) => {
        e.preventDefault();

        const title = document.getElementById("title").value.trim();
        const categorie = document.getElementById("categorie").value;
        const description = document.getElementById("description").value.trim();

        if (title.length < 5) {
            showMessage("Le libellé doit contenir au moins 5 caractères", "danger");
            return;
        }

        if (title === "" || description === "") {
            showMessage("Tous les champs sont requis", "danger");
            return;
        }

        const newIdea = {
            title,
            categorie,
            description,
            approved: false
        };

        addIdea(newIdea);
        ideaForm.reset();
        showMessage("Idée ajoutée avec succès", "success");
    });

    // Affichage initial des idées
    renderIdeas();
});
