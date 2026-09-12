pipeline {
    agent any
    environment {
        SERVER_CREDENTIAL = credentials('server-credentials)
    }
    stages {
        stage("build") {
            steps {
                echo "Building the Application.."
            }
        }
        stage("test") {
            steps {
                echo "Testing the Application.."
            }
        }
        stage("deploy") {
            steps {
                echo "Deploying the Application.."
                echo "deploying with ${SERVER_CREDENTIAL}"
            }
        }
    }
}
