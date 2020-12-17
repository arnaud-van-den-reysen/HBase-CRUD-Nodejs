# HBase-CRUD-Nodejs
## Installation
### HBase Standolone
#### Installation de java
1. ```sudo apt install openjdk-8-jdk```
2. Vérifier l'installation : ```java --version```
3. Si vous avez une autre version de java installée
4. ```sudo update-alternatives --config java```
5. Séléctionner la version 1.8, la version 11 ne fonctionne pas avec HBase
#### Installation HBase Standolone
1. ```wget https://apache.mediamirrors.org/hbase/2.3.3/hbase-2.3.3-bin.tar.gz```
2. ```tar -xvf hbase-2.3.3-bin.tar.gz```
3. Rentrer dans le dossier HBase-2.3.3
4. ```nano conf/hbase-env.sh```
5. decommenter la ligne **export JAVA_HOME** et mettre le bon PATH
6. Avec la commande ```readlink -f $(which java)```, trouver le bon PATH
7. ```/usr/lib/jvm/java-8-openjdk-amd64``` *prendre ça, pas plus*
8. Sauvegarder les modifications et quitter le fichier
##### Vérifier le fonctionnement
1. ```./bin/start-hbase.sh``` : lancer le BDD
2. ```./bin/hbase shell``` : lancer le shell
3. ```status``` : si aucune erreurs, tous fonctionne
4. ```exit```
5. ```./bin/stop-hbase.sh``` : stopper la BDD
#### Installer le CRUD Nodejs
1. Se mettre dans nouveau dossier : ```mkdir new_dir```
2. ```sudo apt install npm```
3. ```npm i express```
4. ```npm i python-shell```
5. ```npm i node-addon-api```
6. ```npm i bindings```
7. ```sudo apt-get install -y libkrb5-dev```
8. ```npm i krb5```
9. ```npm i hbase```
10. Télécharger les fichiers sur github et les mettre dans ce dossier
11. ```node test.js```
## Test de fonctionnement
### Lancer la BDD
1. Dans le dossier Hbase :
2. ```./bin/start-hbase.sh```
3. ```./bin/hbase-daemon.sh start rest```
### Lancer le CRUD
1. Dans le dossier Nodejs : 
2. ```node test.js```
3. lancer le fichier **index.html**
### Post
1. Rentrer un url dans le 1er formulaire : *http://example.com/*
2. Submit le formulaire
3. Pour vérifier la bonne création de la colonne
4. Dans le dossier HBase : 
5. ```./bin/hbase shell```
6. ```list``` : la table s'appelle **my_table**
7. ```count 'my_table', { INTERVAL => 1 }```
8. Il doit y avoir une row  : *['Example Domain']*
### View
1. Dans le 2nd formulaire rentrer le title : *['Example Domain']*
2. Submit le formulaire
3. Une nouvelle page doit apparaitre avec le html seulement
### Stopper la BDD
1. ```./bin/hbase-daemon.sh stop rest```
2. ```./bin/stop-hbase.sh```
