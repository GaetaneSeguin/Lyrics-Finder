let page = 1;

async function globalProg() {
    let chansons = await afficherChansons();
    document.getElementById("Tracklist").style.visibility = "visible";
    let tabCoverUrl = [];

    // boucle pour itérer dans le résultat
    for (let i = 0; i < 10; i++) {
        // créer des balises
        const div = document.createElement("div");
        const result = document.createElement("li");
        const header = document.createElement("h5");
        const title = document.createElement("h4");

        // ajouter des classes
        header.classList.add("headers");
        title.classList.add("headers");
        div.classList.add("carte");

        // stocker les noeuds de résultats dans des variables
        const titre = document.createTextNode(chansons.response.sections[0].hits[i].result.title + " - ");
        const artiste = document.createTextNode(chansons.response.sections[0].hits[i].result.artist_names);
        const paroles = document.createTextNode(' " ' + chansons.response.sections[0].hits[i].highlights[0].value + ' " ');

        const mybr = document.createElement("br"); // faire des sauts de ligne
        const carte = [titre, artiste, paroles];
        carte.forEach((element) => {// créer la div
            div.appendChild(element);
        });

        // donner un identifiant à la div
        div.id = "id" + i;

        // créer un tableau qui stocke les url des pochettes de disque en fonction de la boucle i
        tabCoverUrl[i] = chansons.response.sections[0].hits[i].result.song_art_image_url;

        // ajouter les résultats dans l'HTML
        title.appendChild(titre);
        header.appendChild(artiste);
        header.appendChild(mybr);
        result.appendChild(paroles);

        // intégrer le titre, l'artiste et les paroles dans les div
        document.getElementById("Tracklist").appendChild(div);
        div.insertBefore(title, null);
        div.insertBefore(header, null);
        div.insertBefore(result, null);
    }

    document.getElementById("btnSuivant").style.visibility = "visible";
    document.getElementById("cover").style.visibility = "hidden";

    //Gestion des pochettes
    document.getElementById("Tracklist").addEventListener("mouseover", (e) => {
        document.getElementById("cover").style.visibility = "visible";
        let identifiant = e.target.id;
        console.log(identifiant);
        let image = document.getElementById("photo");
        switch (identifiant) {
            case "id0":
                document.getElementById("cover").style.visibility = "visible";
                image.src = tabCoverUrl[0];
                break;
            case "id1":
                document.getElementById("cover").style.visibility = "visible";
                image.src = tabCoverUrl[1];
                break;
            case "id2":
                document.getElementById("cover").style.visibility = "visible";
                image.src = tabCoverUrl[2];
                break;
            case "id3":
                document.getElementById("cover").style.visibility = "visible";
                image.src = tabCoverUrl[3];
                break;
            case "id4":
                document.getElementById("cover").style.visibility = "visible";
                image.src = tabCoverUrl[4];
                break;
            case "id5":
                document.getElementById("cover").style.visibility = "visible";
                image.src = tabCoverUrl[5];
                break;
            case "id6":
                document.getElementById("cover").style.visibility = "visible";
                image.src = tabCoverUrl[6];
                break;
            case "id7":
                document.getElementById("cover").style.visibility = "visible";
                image.src = tabCoverUrl[7];
                break;
            case "id8":
                document.getElementById("cover").style.visibility = "visible";
                image.src = tabCoverUrl[8];
                break;
            case "id9":
                document.getElementById("cover").style.visibility = "visible";
                image.src = tabCoverUrl[9];
                break;
        }
    });
}

//Gestion page suivante
document.getElementById("btnSuivant").addEventListener("click", async () => {
    document.getElementById("btnPrecedent").style.visibility = "visible";
    document.getElementById("cover").style.visibility = "hidden";
    page++;
    await globalProg();
});

// Gestion page précédente
document.getElementById("btnPrecedent").addEventListener("click", async () => {
    document.getElementById("btnPrecedent").style.visibility = "visible";
    document.getElementById("cover").style.visibility = "hidden";
    page--;
    if (page === 1) {
        document.getElementById("btnPrecedent").style.visibility = "hidden";
    }
    await globalProg();
});

// récupérer le mot recherché
function getWord() {
    const motRecherche = document.getElementById("recherche").value;
    return motRecherche;
}

// faire appel à l'API de Genius pour récupérer les données
async function afficherChansons() {
    let word = getWord();
    document.getElementById("Tracklist").innerHTML = "";
    const reponse = await fetch("https://corsproxy.io/?" + encodeURIComponent(`https://genius.com/api/search/lyric?q="${word}"&&page=${page}`));
    const chansons = await reponse.json();
    return chansons;
}

// activer la fonction afficherChansons quand on clique sur le bouton rechercher
const btnRechercher = document.getElementById("btnsearch");
btnRechercher.addEventListener("click", globalProg);

//Appuyer sur entrée pour simuler le click sur le cd
document.getElementById("recherche").addEventListener("keydown", function (event) {
    if (event.keyCode === 13) {
        event.preventDefault();
        document.getElementById("btnsearch").click();
    }
});
