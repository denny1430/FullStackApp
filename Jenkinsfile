pipeline {
    agent any

    tools {
        nodejs "NodeJS_18"        // ✅ This is allowed (after setting it in Global Tools)
    }

    environment {
        DOTNET_ROOT = "/usr/share/dotnet"
        PATH = "${DOTNET_ROOT}:${PATH}"
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
                    sh 'npm install'
                }
            }
        }

        stage('Build React App') {
            steps {
                dir('client') {
                    sh 'npm run build'
                }
            }
        }

        stage('Build .NET Web API') {
            steps {
                dir('server') {
                    sh 'dotnet build --configuration Release'
                }
            }
        }

        stage('Run Tests (Optional)') {
            steps {
                dir('server') {
                    sh 'dotnet test'
                }
            }
        }

        stage('Archive Build Artifacts') {
            steps {
                archiveArtifacts artifacts: 'client/build/**, server/bin/**', fingerprint: true
            }
        }
    }
}
