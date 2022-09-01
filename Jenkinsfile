pipeline {
    agent any

    parameters {
        string(name: 'SPEC', defaultValue: "cypress/e2e/**/**", description: "Enter the script path that you want to execute." )
        choice(name: 'BROWSER', choices:['chrome', 'edge', 'firefox', 'electron', 'chromium', 'chrome:canary'], description: "The browser Cypress will use to run tests.")
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
            parallel {
                stages{
                    stage('one'){
                        sh 'npm install'
                        sh "npx cypress run --record --key $CYPRESS_KEY --browser ${BROWSER} --spec ${SPEC} --ci-build-id $BUILD_URL"
                    }
                    stage('two'){
                        sh 'npm install'
                        sh "npx cypress run --record --key $CYPRESS_KEY --browser ${BROWSER} --spec ${SPEC} --ci-build-id $BUILD_URL"
                    }
                }
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
