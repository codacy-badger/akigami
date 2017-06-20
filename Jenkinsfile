pipeline {
    agent {
        docker 'mhart/alpine-node:latest'
    }

    stages {
        stage('check tools') {
            steps {
                sh 'yarn --version'
            }
        }
        stage('install deps') {
            steps {
                sh 'sudo chmod 0777 *'
                sh 'NODE_ENV=development yarn install'
            }
        }
        stage('build client') {
            steps {
                sh 'NODE_ENV=production node_modules/.bin/webpack'
            }
        }
    }
}