pipeline {
    agent any

    parameters {
        string(name: 'SPEC', defaultValue: 'cypress/e2e/**/**', description: 'Enter the script path that you want to execute.' )
        choice(name: 'BROWSER', choices:['chrome', 'edge', 'firefox', 'electron', 'chromium', 'chrome:canary'], description: 'The browser Cypress will use to run tests.')
    }

    options {
        ansiColor('xterm')
    }
    stages {
        stage('Build') {
            steps {
                echo 'building the app'
                echo "the build url is ${BUILD_URL}"
            }
        }

        stage('Run Tests') {
            parallel {
                stage('one') {
                    agent {
                        label 'controller'
                    }
                    steps {
                        sh 'npm install'
                        sh "npx cypress run --record parallel --key $CYPRESS_KEY --browser ${BROWSER} --spec ${SPEC}"
                    }
                }
                // stage('two') {
                //     agent {
                //         label 'linux'
                //     }
                //     steps {
                //         sh 'npm install'
                //         sh "npx cypress run --record parallel --key $CYPRESS_KEY --browser ${BROWSER} --spec ${SPEC}"
                //     }
                // }
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
            steps {
                echo 'deploying'
            }
        }
    }
}
