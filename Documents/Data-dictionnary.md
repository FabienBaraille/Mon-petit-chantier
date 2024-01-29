# Dictionnaire de données

## USER

|Champ|Type|Spécificités|Description|
|-|-|-|-|
|id|String|PRIMARY KEY, NOT NULL, UNSIGNED, AUTO_INCREMENT|L'identifiant de l'utilisateur|
|username|VARCHAR(255)|NOT NULL|Nom de l'utilisateur|
|password|VARCHAR(150)|NOT NULL|Mot de passe de l'utilisateur (crypté)|
|email|VARCHAR(150)|NOT NULL|Email de l'utilisateur|
|city|VARCHAR(150)|NULL|Ville de résidence de l'utilisateur|
|role|VARCHAR(20)|NOT NULL|Role de l'utilisateur : ADMIN / USER|
|status|SMALLINT|NOT NULL|0: actif, 1: inactif|
|created_at|TIMESTAMP|NOT NULL, DEFAULT CURRENT_TIMESTAMP|La date de création de l'utilisateur|
|updated_at|TIMESTAMP|NULL|La date de la dernière mise à jour de l'utilisateur|

## Project

|Champ|Type|Spécificités|Description|
|-|-|-|-|
|id|INT|PRIMARY KEY, NOT NULL, UNSIGNED, AUTO_INCREMENT|L'identifiant du projet|
|title|VARCHAR(255)|NOT NULL|Titre du projet|
|description|LONGTEXT|NULL|Description du projet|
|status|SMALLINT|NOT NULL|Etat du projet, 0: projet, 1:fabrication, 2:terminé|
|pictures|VARCHAR(255)|NULL|Image du projet|
|created_at|TIMESTAMP|NOT NULL, DEFAULT CURRENT_TIMESTAMP|La date de création du projet|
|updated_at|TIMESTAMP|NULL|La date de la dernière mise à jour du projet|

## STEP

|Champ|Type|Spécificités|Description|
|-|-|-|-|
|id|INT|PRIMARY KEY, NOT NULL, UNSIGNED, AUTO_INCREMENT|L'identifiant de l'étape|
|number|SMALLINT|NOT NULL|Numéro de l'étape|
|title|VARCHAR(255)|NOT NULL|Titre de l'étape|
|description|LONGTEXT|NULL|Description de l'étape|
|status|SMALLINT|NOT NULL|Etat de l'étape, 0: non réalisé, 1:réalisé|
|created_at|TIMESTAMP|NOT NULL, DEFAULT CURRENT_TIMESTAMP|La date de création de l'étape|
|updated_at|TIMESTAMP|NULL|La date de la dernière mise à jour de l'étape|

## Item

|Champ|Type|Spécificités|Description|
|-|-|-|-|
|id|INT|PRIMARY KEY, NOT NULL, UNSIGNED, AUTO_INCREMENT|L'identifiant de l'item|
|name|VARCHAR(255)|NOT NULL|Nom de l'item|
|unit|VARCHAR(10)|NULL|Unité de l'item|
|description|LONGTEXT|NULL|Description de l'item|
|order|SMALLINT|NULL|Ordre / rang de l'item|
|status|SMALLINT|NOT NULL|Etat de l'item, 0: actif, 1:inactif|
|created_at|TIMESTAMP|NOT NULL, DEFAULT CURRENT_TIMESTAMP|La date de création de l'item|
|updated_at|TIMESTAMP|NULL|La date de la dernière mise à jour de l'item|

## TIPS

|Champ|Type|Spécificités|Description|
|-|-|-|-|
|id|INT|PRIMARY KEY, NOT NULL, UNSIGNED, AUTO_INCREMENT|L'identifiant de l'astuce|
|title|VARCHAR(255)|NOT NULL|Titre de l'astuce|
|description|LONGTEXT|NULL|Description de l'astuce|
|link|VARCHAR(255)|NULL|Lien externe appuyant l'astuce|
|created_at|TIMESTAMP|NOT NULL, DEFAULT CURRENT_TIMESTAMP|La date de création de l'astuce|
|updated_at|TIMESTAMP|NULL|La date de la dernière mise à jour de l'astuce|

## QUESTION

|Champ|Type|Spécificités|Description|
|-|-|-|-|
|id|INT|PRIMARY KEY, NOT NULL, UNSIGNED, AUTO_INCREMENT|L'identifiant de la question|
|title|VARCHAR(255)|NOT NULL|Titre de la question|
|infos|LONGTEXT|NULL|Information sur la question|
|created_at|TIMESTAMP|NOT NULL, DEFAULT CURRENT_TIMESTAMP|La date de création de la question|
|updated_at|TIMESTAMP|NULL|La date de la dernière mise à jour de la question|

## GROUP

|Champ|Type|Spécificités|Description|
|-|-|-|-|
|id|INT|PRIMARY KEY, NOT NULL, UNSIGNED, AUTO_INCREMENT|L'identifiant du groupe|
|title|VARCHAR(255)|NOT NULL|Titre du groupe|
|infos|LONGTEXT|NULL|Information sur le groupe|
|rank|SMALLINT|NOT NULL|Rang du groupe, 0: principal / 1:secondaire|
|created_at|TIMESTAMP|NOT NULL, DEFAULT CURRENT_TIMESTAMP|La date de création du groupe|
|updated_at|TIMESTAMP|NULL|La date de la dernière mise à jour du groupe|

## SUGGESTION

|Champ|Type|Spécificités|Description|
|-|-|-|-|
|id|INT|PRIMARY KEY, NOT NULL, UNSIGNED, AUTO_INCREMENT|L'identifiant de la suggestion|
|title|VARCHAR(255)|NOT NULL|Titre de la suggestion|
|description|LONGTEXT|NOT NULL|Description de la suggestion|
|category|VARCHAR(100)|NOT NULL|Sujet de la suggestion|
|status|SMALLINT|NOT NULL|Status de la suggestion, 0: en cours / 1:traitée / 2:refusée|
|created_at|TIMESTAMP|NOT NULL, DEFAULT CURRENT_TIMESTAMP|La date de création de la suggestion|
|updated_at|TIMESTAMP|NULL|La date de la dernière mise à jour de la suggestion|
