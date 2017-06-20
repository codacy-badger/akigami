pipeline {
    agent {
        docker 'node:latest'
    }

    stages {
        stage('check tools') {
            steps {
                sh 'node --version'
                sh 'yarn --version'
            }
        }
        stage('install deps') {
            steps {
                sh 'NODE_ENV=development sudo yarn install'
            }
        }
        stage('build client') {
            steps {
                sh 'NODE_ENV=production sudo node_modules/.bin/webpack'
            }
        }
    }
}