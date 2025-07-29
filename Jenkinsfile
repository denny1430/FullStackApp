pipeline {
    agent any

    environment {
        DOTNET_ROOT = "C:\\Program Files\\dotnet"
    }

    tools {
        nodejs "NodeJS_18"  // Make sure this matches what you configured in Jenkins > Global Tool Configuration
        // dotnet is removed here
    }

    stages {
        stage('Checkout Code') {
            steps {
                git url: 'https://github.com/denny1430/FullStackApp.git', branch: 'master'
            }
        }

        stage('Install React Dependencies') {
            steps {
                dir('client') {
                    bat 'npm install'
                }
            }
        }

        stage('Build React App') {
            steps {
                dir('client') {
                    bat 'npm run build'
                }
            }
        }

        stage('Build .NET Web API') {
            steps {
                dir('server') {
                    bat 'dotnet build --configuration Release'
                }
            }
        }

        stage('Run Tests (Optional)') {
            steps {
                dir('server') {
                    bat 'dotnet test'
                }
            }
        }

        stage('Archive Build Artifacts') {
            steps {
                archiveArtifacts artifacts: 'client\\build\\**/*, server\\bin\\**/*', fingerprint: true
            }
        }
    }
}
