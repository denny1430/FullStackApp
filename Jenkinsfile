pipeline {
    agent any

    environment {
        DOTNET_ROOT = "/usr/share/dotnet"
    }

    tools {
        nodejs "NodeJS_18"        // Must match the Jenkins NodeJS tool name
        dotnet "DotNet_6"         // Must match the Jenkins .NET tool name
    }

    stages {
        stage('Checkout Code') {
            steps {
                git url: 'https://github.com/denny1430/FullStackApp.git', branch: 'main'
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
