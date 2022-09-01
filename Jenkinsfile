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
                echo "the build number is ${BUILD_NUMBER}"
            }
        }

        stage('Run Tests') {
            parallel {
                stage('one') {
                    agent {
                        label 'controller'
                    }
                    steps {
                        echo 'installing'
                        sh 'npm install'
                        echo 'starting'
                        sh 'npm start &'
                        echo 'testing'
                        sh 'npx cypress run --record --parallel --key $CYPRESS_KEY'+" --browser ${BROWSER} --spec ${SPEC} --ci-build-id ${BUILD_NUMBER}"
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
