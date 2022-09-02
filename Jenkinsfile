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

        stage('build and Test') {
            parallel {
                stage('one') {
                    agent {
                        label 'linux'
                    }
                    steps {
                        sh 'npm install'
                        sh 'npm start &'
                        sh '''
                        firstHalf=`./node_modules/split-files/splitFiles.js "cypress/e2e" ".*\.cy\.js$" 2 0`
                        npx cypress run --spec $firstHalf
                        '''
                    }
                }
                stage('two') {
                    agent {
                        label 'linux'
                    }
                    steps {
                        sh 'npm install'
                        sh 'npm start &'
                        sh '''
                        firstHalf=`./node_modules/split-files/splitFiles.js "cypress/e2e" ".*\.cy\.js$" 2 1`
                        npx cypress run --spec $firstHalf
                        '''
                    }
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
