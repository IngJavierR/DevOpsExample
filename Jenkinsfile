pipeline {
    agent any
    environment {
        LOCAL_SERVER = '192.168.1.133'
    }
    tools {
        nodejs 'NodeJs12'
    }
    stages {
        stage('Compile Backend') {
            steps {
                echo 'Compile Backend'
            }
        }
        stage('Compile Frontend') {
            steps {
                echo 'Building Frontend'
                dir('frontend/'){
                    sh 'npm install'
                    sh 'npm run build'
                    sh 'docker stop frontend-one || true'
                    sh "docker build -t frontend-web ."
                    sh 'docker run -d --rm --name frontend-one -p 8010:80 frontend-web'
                }
            }
        }
        stage('Quality Code') {
            environment {
                scannerHome = tool 'SonarQubeScanner'
            }
            steps {
                withSonarQubeEnv('SonarServer') {
                    sh "${scannerHome}/bin/sonar-scanner \
                    -Dsonar.projectKey=Frontend \
                    -Dsonar.sourceEncoding=UTF-8 \
                    -Dsonar.sources=src/app \
                    -Dsonar.exclusions=**/node_modules/**,**/*.spec.ts,**/*.module.ts,**/app.child.imports.ts \
                    -Dsonar.tests=src \
                    -Dsonar.test.inclusions=**/*.spec.ts \
                    -Dsonar.typescript.lcov.reportPaths=coverage/lcov.info"
                }
                // timeout(time: 10, unit: 'MINUTES') {
                //     waitForQualityGate abortPipeline: true
                // }
            }
        }
        stage('Database Changes') {
			steps {
                echo 'Database changes'
            }
		}
        stage('Deploy') {
            steps {
                echo 'Deploy'
            }
        }
        /*stage('Testing') {
            steps {
				dir('cypress/') {
					sh 'docker run --rm --name Cypress -v /Users/javierrodriguez/Documents/Repositorios/EcosistemaJenkins/jenkins_home/workspace/Microservicio/DevOpsExample:/e2e -w /e2e -e Cypress cypress/included:3.4.0'
				}
            }
        }
        stage('tar videos') 
        {
            steps 
            {
                dir('cypress/cypress/videos/') {
                    sh 'tar -cvf videos.tar .'
                    archiveArtifacts artifacts: 'videos.tar',
                    allowEmptyArchive: true
                }
            }
        }*/
    }
}