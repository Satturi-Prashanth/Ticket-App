pipeline {
  agent any
  tools {
    maven = "maven"
    java = "java-17"

    environment {
      AWS_CREDENTIALS = credentials('aws-cred')
      github-creds = credentials('github-cred')

      stages {
        stage('checkout the code') {
          steps {
            git branch: 'main',credentialsId: 'github-cred', url: 'https://github.com/Satturi-Prashanth/Ticket-App.git'

             }
        }
        
        stage('Build the Code') {
            steps {
                sh 'mvn clean package'
            }
        }
    }
}
        
