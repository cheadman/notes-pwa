pipeline {
    agent any

    parameters {
        string(name: 'SPEC', defaultValue: "cypress/e2e/**/**", description: "Enter the script path that you want to execute." )
        choice(name: 'BROWSER', choices:['chrome', 'edge', 'firefox'], description: "The browser Cypress will use to run tests.")
    }

    options{
        ansiColor('xterm')
    }

    stages {
        stage('Build') {
            steps{
            echo "building the app"
            }
        }

        stage('Testing') {
            steps{
                sh 'npm install'
                sh 'npm start &'
                // sh "npx cypress run --headless --browser ${BROWSER} --spec ${SPEC}"
                sh "npx cypress run --spec ${SPEC}"
            }
            post {
                success {
                    echo 'done'
                }
                unsuccessful {
                    echo 'fail'
                }
            }
        }

        stage('Deploying') {
            steps{
                echo 'deploying'
            }
        }
    }
}
