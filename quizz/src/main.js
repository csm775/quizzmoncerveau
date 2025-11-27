// Questions organisées par rubriques
var categories = [
  {
    nom: "Anatomie du cerveau",
    questions: [
      { 
        q: "Quel est l'organe principal du système nerveux central ?", 
        options: ["Le cœur", "Le cerveau", "Le foie", "Les poumons"], 
        correct: 1 
      },
      { 
        q: "Quelle structure relie les deux hémisphères cérébraux ?", 
        options: ["Le cervelet", "Le tronc cérébral", "Le corps calleux", "L'amygdale"], 
        correct: 2 
      },
      { 
        q: "Combien de lobes possède chaque hémisphère cérébral ?", 
        options: ["2", "3", "4", "5"], 
        correct: 2 
      }
    ]
  },
  {
    nom: "Neurones et synapses",
    questions: [
      { 
        q: "Quel type de cellule transmet l'influx nerveux ?", 
        options: ["Les neurones", "Les ostéocytes", "Les hépatocytes", "Les adipocytes"], 
        correct: 0 
      },
      { 
        q: "Comment s'appelle l'espace entre deux neurones ?", 
        options: ["Axone", "Synapse", "Dendrite", "Myéline"], 
        correct: 1 
      },
      { 
        q: "Quelle est la fonction principale de la myéline ?", 
        options: ["Ralentir l'influx", "Accélérer l'influx", "Arrêter l'influx", "Diviser l'influx"], 
        correct: 1 
      }
    ]
  },
  {
    nom: "Mémoire et apprentissage",
    questions: [
      { 
        q: "Quelle zone du cerveau est principalement impliquée dans la mémoire ?", 
        options: ["L'hippocampe", "Le bulbe rachidien", "Le cortex moteur", "Le thalamus"], 
        correct: 0 
      },
      { 
        q: "Quel type de mémoire permet de retenir des informations pendant quelques secondes ?", 
        options: ["Mémoire à long terme", "Mémoire sensorielle", "Mémoire de travail", "Mémoire procédurale"], 
        correct: 2 
      },
      { 
        q: "Quelle région est cruciale pour la formation de nouveaux souvenirs ?", 
        options: ["Le cervelet", "L'hippocampe", "Le bulbe olfactif", "La moelle épinière"], 
        correct: 1 
      }
    ]
  },
  {
    nom: "Neurotransmetteurs",
    questions: [
      { 
        q: "Quelle substance chimique est un neurotransmetteur bien connu ?", 
        options: ["Insuline", "Dopamine", "Collagène", "Hémoglobine"], 
        correct: 1 
      },
      { 
        q: "Quel neurotransmetteur est associé au plaisir et à la récompense ?", 
        options: ["Sérotonine", "GABA", "Dopamine", "Acétylcholine"], 
        correct: 2 
      },
      { 
        q: "Quel neurotransmetteur régule l'humeur et le sommeil ?", 
        options: ["Dopamine", "Sérotonine", "Noradrénaline", "Glutamate"], 
        correct: 1 
      }
    ]
  },
  {
    nom: "Fonctions cognitives",
    questions: [
      { 
        q: "Quelle zone contrôle principalement le langage parlé ?", 
        options: ["Aire de Broca", "Aire de Wernicke", "Cortex visuel", "Cervelet"], 
        correct: 0 
      },
      { 
        q: "Quel hémisphère est généralement dominant pour le langage ?", 
        options: ["Le droit", "Le gauche", "Les deux également", "Aucun"], 
        correct: 1 
      },
      { 
        q: "Quelle partie du cerveau contrôle l'équilibre et la coordination ?", 
        options: ["Le cortex", "Le thalamus", "Le cervelet", "L'hypothalamus"], 
        correct: 2 
      }
    ]
  }
];

// Faits intéressants "Le saviez-vous ?"
var funFacts = [
  "Le cerveau humain contient environ 86 milliards de neurones !",
  "Le cerveau consomme environ 20% de l'énergie totale du corps.",
  "Les informations peuvent voyager dans le cerveau à plus de 400 km/h !",
  "Le cerveau adulte pèse environ 1,4 kg en moyenne.",
  "Chaque neurone peut être connecté à 10 000 autres neurones !"
];

// Variables globales
var currentCategory = 0;
var currentQuestion = 0;
var answers = [];
var totalQuestions = 0;

// Initialisation
function init() {
  updateCategoryButtons();
  updateCategoryTitle();
  updateFunFact();
  loadCategory(0);
}

// Changer de catégorie
function selectCategory(index) {
  currentCategory = index;
  currentQuestion = 0;
  updateCategoryButtons();
  updateCategoryTitle();
  loadCategory(index);
  showScreen('start');
}

// Mettre à jour les boutons de catégorie
function updateCategoryButtons() {
  var buttons = document.querySelectorAll('.category-btn');
  buttons.forEach(function(btn, index) {
    btn.textContent = categories[index].nom;
    if (index === currentCategory) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });
}

// Mettre à jour le titre de la catégorie
function updateCategoryTitle() {
  document.getElementById('currentCategory').textContent = categories[currentCategory].nom;
}

// Charger une catégorie
function loadCategory(index) {
  var category = categories[index];
  answers = new Array(category.questions.length).fill(null);
  totalQuestions = category.questions.length;
  updateProgress();
}

// Mettre à jour "Le saviez-vous ?"
function updateFunFact() {
  var randomIndex = Math.floor(Math.random() * funFacts.length);
  document.getElementById('funFact').textContent = funFacts[randomIndex];
}

// Afficher un écran
function showScreen(screenId) {
  document.querySelectorAll('.screen').forEach(function(screen) {
    screen.style.display = 'none';
  });
  document.getElementById(screenId).style.display = 'flex';
}

// Démarrer le quiz
function startQuiz() {
  currentQuestion = 0;
  showScreen('quiz');
  displayQuestion();
}

// Afficher la question
function displayQuestion() {
  var question = categories[currentCategory].questions[currentQuestion];
  
  document.getElementById('questionText').textContent = question.q;
  
  var container = document.getElementById('optionsContainer');
  container.innerHTML = '';
  
  for (var i = 0; i < question.options.length; i++) {
    var label = document.createElement('label');
    if (answers[currentQuestion] === i) {
      label.className = 'selected';
    }
    
    var radio = document.createElement('input');
    radio.type = 'radio';
    radio.name = 'option';
    if (answers[currentQuestion] === i) {
      radio.checked = true;
    }
    radio.onclick = (function(index) {
      return function() {
        selectOption(index);
      };
    })(i);
    
    label.appendChild(radio);
    label.appendChild(document.createTextNode(question.options[i]));
    container.appendChild(label);
  }
  
  // Mettre à jour les points de navigation
  updateNavDots();
  
  // Mettre à jour le bouton suivant
  var nextBtn = document.getElementById('nextBtn');
  if (currentQuestion === totalQuestions - 1) {
    nextBtn.textContent = 'Terminer';
  } else {
    nextBtn.textContent = 'Suivant';
  }
  
  updateProgress();
}

// Points de navigation
function updateNavDots() {
  var dotsContainer = document.getElementById('navDots');
  dotsContainer.innerHTML = '';
  
  for (var i = 0; i < totalQuestions; i++) {
    var dot = document.createElement('span');
    dot.className = 'dot';
    if (i === currentQuestion) {
      dot.className += ' active';
    }
    dot.onclick = (function(index) {
      return function() {
        currentQuestion = index;
        displayQuestion();
      };
    })(i);
    dotsContainer.appendChild(dot);
  }
}

// Sélectionner une réponse
function selectOption(index) {
  answers[currentQuestion] = index;
  // Mettre à jour l'affichage sans changer la progression
  var container = document.getElementById('optionsContainer');
  var labels = container.querySelectorAll('label');
  labels.forEach(function(label, i) {
    if (i === index) {
      label.classList.add('selected');
    } else {
      label.classList.remove('selected');
    }
  });
}

// Mettre à jour la barre de progression
function updateProgress() {
  // La progression se base sur la question actuelle visitée
  var progress = Math.round((currentQuestion / totalQuestions) * 100);
  document.getElementById('progressFill').style.width = progress + '%';
}

// Question suivante
function next() {
  if (currentQuestion < totalQuestions - 1) {
    currentQuestion++;
    updateProgress(); // Mise à jour de la progression ici
    displayQuestion();
  } else {
    // Progression à 100% à la fin
    document.getElementById('progressFill').style.width = '100%';
    showResult();
  }
}

// Question précédente
function prev() {
  if (currentQuestion > 0) {
    currentQuestion--;
    displayQuestion();
  } else {
    showScreen('start');
  }
}

// Afficher les résultats
function showResult() {
  var score = 0;
  for (var i = 0; i < answers.length; i++) {
    if (answers[i] === categories[currentCategory].questions[i].correct) {
      score++;
    }
  }
  
  document.getElementById('scoreText').textContent = 
    'Vous avez ' + score + ' bonnes réponses sur ' + totalQuestions + ' dans la catégorie "' + categories[currentCategory].nom + '".';
  
  showScreen('result');
  updateFunFact(); 
}

// Initialiser au chargement de la page
window.onload = init;