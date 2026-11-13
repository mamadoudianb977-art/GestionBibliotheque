# 📚 GestionBibliotheque

<p align="center">
<strong>API REST de gestion de bibliothèque</strong>
</p>

<p align="center">
Application backend développée avec Node.js, Express et MongoDB
</p>

<p align="center">

\\

</p>

---

## 📖 À propos du projet

**GestionBibliotheque** est une API REST développée dans le cadre d'un projet d'apprentissage du développement backend.

L'application permet de gérer les principales ressources d'une bibliothèque :

* 📚 **Livres**
* ✍️ **Auteurs**
* 👥 **Membres**
* 🔄 **Emprunts**
* 👤 **Utilisateurs**

Le projet intègre également un système d'**authentification JWT**, une **gestion des rôles** et une **validation des données**.

---

## 🎯 Objectifs

Ce projet a pour objectif de mettre en pratique :

* la création d'une API REST avec Express.js ;
* la connexion à MongoDB avec Mongoose ;
* l'architecture **Routes → Controllers → Services → Repositories → Models** ;
* l'authentification avec JWT ;
* le hachage des mots de passe avec bcrypt ;
* la gestion des rôles et des permissions ;
* la validation des données avec Yup ;
* l'utilisation de Git et GitHub ;
* la conception du modèle de données.

---

## ✨ Fonctionnalités

### 📚 Livres

* Ajouter un livre
* Consulter tous les livres
* Consulter un livre par son ID
* Modifier un livre
* Supprimer un livre
* Associer un livre à un auteur
* Vérifier l'unicité de l'ISBN

### ✍️ Auteurs

* Ajouter un auteur
* Consulter les auteurs
* Consulter un auteur par son ID
* Modifier un auteur
* Supprimer un auteur

### 👥 Membres

* Ajouter un membre
* Consulter les membres
* Consulter un membre par son ID
* Modifier un membre
* Supprimer un membre
* Vérifier l'unicité de l'adresse email

### 🔄 Emprunts

* Créer un emprunt
* Consulter les emprunts
* Consulter un emprunt par son ID
* Vérifier qu'un livre n'est pas déjà emprunté
* Retourner un livre
* Enregistrer automatiquement la date de retour
* Supprimer un emprunt

### 🔐 Authentification

* Connexion utilisateur
* Génération d'un token JWT
* Vérification du token
* Gestion des rôles
* Protection des routes sensibles

---

# 🏗️ Architecture

Le projet utilise une architecture en couches permettant de séparer les responsabilités.

```text
                         CLIENT
                           │
                           ▼
                    ┌─────────────┐
                    │    ROUTES   │
                    └──────┬──────┘
                           │
                           ▼
                  ┌─────────────────┐
                  │   MIDDLEWARES   │
                  │ JWT / Rôles /   │
                  │   Validation    │
                  └────────┬────────┘
                           │
                           ▼
                  ┌─────────────────┐
                  │   CONTROLLERS   │
                  └────────┬────────┘
                           │
                           ▼
                  ┌─────────────────┐
                  │    SERVICES     │
                  │  Logique métier │
                  └────────┬────────┘
                           │
                           ▼
                  ┌─────────────────┐
                  │  REPOSITORIES   │
                  │ Accès aux données│
                  └────────┬────────┘
                           │
                           ▼
                  ┌─────────────────┐
                  │     MODELS      │
                  │    Mongoose     │
                  └────────┬────────┘
                           │
                           ▼
                    ┌─────────────┐
                    │   MongoDB   │
                    └─────────────┘
```

---

# 📁 Structure du projet

```text
GestionBibliotheque/
│
├── 📄 app.js
├── 📄 serveur.js
├── 📄 package.json
├── 📄 package-lock.json
├── 📄 README.md
├── 📄 .gitignore
├── 🔒 .env
│
├── 📁 doc/
│   └── 📐 analyse.drawio
│
├── 📁 config/
│   └── database.js
│
├── 📁 commun/
│   ├── auth.middleware.js
│   ├── role.middleware.js
│   └── validator.js
│
├── 📁 auteur/
│   ├── 📁 model/
│   │   └── auteur.model.js
│   ├── auteur.repository.js
│   ├── auteur.service.js
│   ├── auteur.controller.js
│   ├── auteur.route.js
│   └── auteur.validate.js
│
├── 📁 livre/
│   ├── 📁 model/
│   │   └── livre.model.js
│   ├── livre.repository.js
│   ├── livre.service.js
│   ├── livre.controller.js
│   ├── livre.route.js
│   └── livre.validate.js
│
├── 📁 membre/
│   ├── 📁 model/
│   │   └── membre.model.js
│   ├── membre.repository.js
│   ├── membre.service.js
│   ├── membre.controller.js
│   ├── membre.route.js
│   └── membre.validate.js
│
├── 📁 emprunt/
│   ├── 📁 model/
│   │   └── emprunt.model.js
│   ├── emprunt.repository.js
│   ├── emprunt.service.js
│   ├── emprunt.controller.js
│   ├── emprunt.route.js
│   └── emprunt.validate.js
│
└── 📁 user/
    ├── 📁 model/
    │   └── user.model.js
    ├── user.repository.js
    ├── user.service.js
    ├── user.controller.js
    ├── user.route.js
    └── user.validate.js
```

---

# 🧩 Technologies


| Technologie      | Rôle                                        |
| ---------------- | -------------------------------------------- |
| 🟢**Node.js**    | Environnement d'exécution                   |
| ⚫**Express.js** | Framework backend                            |
| 🍃**MongoDB**    | Base de données                             |
| 🔴**Mongoose**   | ODM MongoDB                                  |
| 🔐**JWT**        | Authentification                             |
| 🔑**bcrypt**     | Hachage des mots de passe                    |
| ✅**Yup**        | Validation des données                      |
| 🌐**CORS**       | Gestion des requêtes cross-origin           |
| 📝**Morgan**     | Journalisation HTTP                          |
| 🎨**Chalk**      | Messages colorés dans le terminal           |
| 🔄**Nodemon**    | Développement avec redémarrage automatique |

---

# 📐 Documentation & MRD

Le dossier `doc/` contient les documents liés à la conception du projet.

### Modèle Relationnel de Données

Le fichier :

```text
doc/analyse.drawio
```

contient le **MRD du projet**.

Il représente les principales entités et leurs relations :

```text
Utilisateur
     │
     │
     ├──────────────► Authentification
     │
     ▼
   Membre
     │
     │
     │ emprunte
     ▼
  Emprunt
     │
     │ concerne
     ▼
   Livre
     │
     │ écrit par
     ▼
  Auteur
```

Le fichier peut être ouvert et modifié avec **draw.io / diagrams.net**.

---

# 🔐 Sécurité & authentification

L'application utilise **JWT (JSON Web Token)**.

Lorsqu'un utilisateur se connecte avec des identifiants valides, l'API génère un token.

Exemple :

```http
Authorization: Bearer VOTRE_TOKEN
```

Le middleware `auth.middleware.js` vérifie :

1. la présence du token ;
2. son format ;
3. sa validité ;
4. son expiration.

Le middleware `role.middleware.js` vérifie ensuite les permissions de l'utilisateur.

### 👮 Rôles

Les rôles utilisés dans l'application comprennent :

```text
admin
membre
```

Certaines opérations sont réservées à `admin`.

---

# 🌐 API

L'API utilise les préfixes suivants :

```text
/api/auteurs
/api/livres
/api/membres
/api/emprunts
/api/users
```

---

## 📚 Livres


| Méthode | Route             | Accès    |
| -------- | ----------------- | --------- |
| `POST`   | `/api/livres`     | 🔐 Admin  |
| `GET`    | `/api/livres`     | 🌐 Public |
| `GET`    | `/api/livres/:id` | 🌐 Public |
| `PUT`    | `/api/livres/:id` | 🔐 Admin  |
| `DELETE` | `/api/livres/:id` | 🔐 Admin  |

---

## ✍️ Auteurs


| Méthode | Route              | Fonction  |
| -------- | ------------------ | --------- |
| `POST`   | `/api/auteurs`     | Créer    |
| `GET`    | `/api/auteurs`     | Lister    |
| `GET`    | `/api/auteurs/:id` | Consulter |
| `PUT`    | `/api/auteurs/:id` | Modifier  |
| `DELETE` | `/api/auteurs/:id` | Supprimer |

---

## 👥 Membres


| Méthode | Route              | Accès   |
| -------- | ------------------ | -------- |
| `POST`   | `/api/membres`     | Public   |
| `GET`    | `/api/membres`     | Public   |
| `GET`    | `/api/membres/:id` | Public   |
| `PUT`    | `/api/membres/:id` | 🔐 Admin |
| `DELETE` | `/api/membres/:id` | 🔐 Admin |

---

## 🔄 Emprunts


| Méthode | Route                      | Accès          |
| -------- | -------------------------- | --------------- |
| `POST`   | `/api/emprunts`            | 🔐 Authentifié |
| `GET`    | `/api/emprunts`            | Public          |
| `GET`    | `/api/emprunts/:id`        | Public          |
| `PUT`    | `/api/emprunts/:id/retour` | 🔐 Authentifié |
| `DELETE` | `/api/emprunts/:id`        | 🔐 Admin        |

---

# 🔄 Règle de gestion des emprunts

Un même livre ne peut pas être emprunté par plusieurs personnes simultanément.

Avant de créer un emprunt, le service vérifie si le livre possède déjà un emprunt avec le statut :

```text
en cours
```

Si c'est le cas, l'opération est refusée.

Lors du retour :

```text
statut = "retourne"
dateRetour = date actuelle
```

Le livre peut alors être emprunté à nouveau.

---

# 🧪 Tests avec Postman

L'API a été testée avec différentes opérations :

* création ;
* récupération ;
* modification ;
* suppression ;
* authentification ;
* contrôle des permissions ;
* retour d'un livre ;
* vérification des erreurs.

Exemple :

```http
GET http://localhost:3000/api/livres
```

Pour une route protégée :

```http
Authorization: Bearer VOTRE_TOKEN
```

---

# 🚀 Installation

## 1️⃣ Cloner le projet

```bash
git clone https://github.com/mamadoudianb977-art/GestionBibliotheque.git
```

## 2️⃣ Accéder au projet

```bash
cd GestionBibliotheque
```

## 3️⃣ Installer les dépendances

```bash
npm install
```

---

# ⚙️ Configuration

Créer un fichier `.env` à la racine du projet.

Exemple :

```env
PORT=3000
MONGODB_URI=mongodb://127.0.0.1:27017/gestionbibliotheque
JWT_SECRET=votre_secret
```

⚠️ **Ne jamais publier les vraies valeurs du fichier ****`.env`****.**

Le fichier `.gitignore` contient :

```text
node_modules/
.env
```

---

# ▶️ Démarrage

### Mode développement

```bash
npm run dev
```

### Mode production / normal

```bash
npm start
```

L'API est accessible à :

```text
http://localhost:3000
```

La route d'accueil :

```text
GET http://localhost:3000/
```

retourne un message confirmant que l'API fonctionne.

---

# 📦 Scripts disponibles


| Commande      | Description                |
| ------------- | -------------------------- |
| `npm install` | Installer les dépendances |
| `npm run dev` | Démarrer avec Nodemon     |
| `npm start`   | Démarrer normalement      |

---

# 🗄️ Base de données

La base de données utilisée est **MongoDB**.

Nom de la base :

```text
gestionbibliotheque
```

Les principales collections sont :

```text
users
auteurs
livres
membres
emprunts
```

La connexion à MongoDB est configurée dans :

```text
config/database.js
```

---

# 🔒 Fichiers protégés

Les fichiers sensibles ne doivent jamais être envoyés sur GitHub.

Le `.gitignore` contient :

```text
node_modules/
.env
```

### Pourquoi ?

`node_modules/`

→ contient les dépendances installées automatiquement avec `npm install`.

`.env`

→ contient les informations sensibles telles que :

* connexion MongoDB ;
* clé secrète JWT ;
* configuration du serveur.

---

# 📊 Exemple de données

### Livre

```json
{
  "titre": "L'Enfant Noir",
  "isbn": "978-2070360024",
  "anneePublication": 1942,
  "auteur": "ID_DE_L_AUTEUR"
}
```

### Membre

```json
{
  "nom": "Bah",
  "prenom": "Hawa",
  "email": "hawa.bah@gmail.com",
  "telephone": "621234567"
}
```

### Emprunt

```json
{
  "livre": "ID_DU_LIVRE",
  "membre": "ID_DU_MEMBRE",
  "dateRetourPrevue": "2026-09-05T00:00:00.000Z"
}
```

---

# 📈 État du projet


| Fonctionnalité                   | État |
| --------------------------------- | :---: |
| API Express                       |  ✅  |
| MongoDB / Mongoose                |  ✅  |
| Gestion des auteurs               |  ✅  |
| Gestion des livres                |  ✅  |
| Gestion des membres               |  ✅  |
| Gestion des emprunts              |  ✅  |
| Authentification JWT              |  ✅  |
| Gestion des rôles                |  ✅  |
| Validation Yup                    |  ✅  |
| Architecture Repository / Service |  ✅  |
| MRD                               |  ✅  |
| Tests Postman                     |  ✅  |
| Documentation README              |  ✅  |
| Nouvelles fonctionnalités        |  🚧  |

---

# 🔮 Améliorations possibles

Le projet pourra évoluer avec :

* 🧪 tests automatisés avec Jest ou Supertest ;
* 📖 documentation Swagger/OpenAPI ;
* 🔎 recherche de livres ;
* 📄 pagination ;
* 📊 statistiques sur les emprunts ;
* 🖥️ création d'une interface frontend ;
* 📧 notifications ;
* 📅 gestion avancée des retards.

---

# 👨‍💻 Auteur

**Thierno Mamadou Dian Balde**

Projet réalisé dans le cadre de l'apprentissage du développement backend.

### Technologies principales

**Node.js · Express · MongoDB · Mongoose · JWT**

---

# 📄 Licence

Projet réalisé dans un cadre pédagogique.

---

<p align="center">
<strong>📚 GestionBibliotheque</strong>
<br>
<sub>API REST de gestion de bibliothèque</sub>
</p>
